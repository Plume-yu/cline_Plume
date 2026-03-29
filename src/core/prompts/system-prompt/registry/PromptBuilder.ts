import { Logger } from "@/shared/services/Logger"
import { ClineDefaultTool } from "@/shared/tools"
import { ClineToolSet } from "../registry/ClineToolSet"
import { type ClineToolSpec, resolveInstruction } from "../spec"
import { STANDARD_PLACEHOLDERS } from "../templates/placeholders"
import { TemplateEngine } from "../templates/TemplateEngine"
import type { ComponentRegistry, PromptVariant, SystemPromptContext } from "../types"

// Pre-defined mapping of standard placeholders to avoid runtime object creation
const STANDARD_PLACEHOLDER_KEYS = Object.values(STANDARD_PLACEHOLDERS)

export class PromptBuilder {
	private templateEngine: TemplateEngine

	constructor(
		private variant: PromptVariant,
		private context: SystemPromptContext,
		private components: ComponentRegistry,
	) {
		this.templateEngine = new TemplateEngine()
	}

	async build(): Promise<string> {
		const componentSections = await this.buildComponents()
		const placeholderValues = this.preparePlaceholders(componentSections)
		const prompt = this.templateEngine.resolve(this.variant.baseTemplate, this.context, placeholderValues)
		return this.postProcess(prompt)
	}

	private async buildComponents(): Promise<Record<string, string>> {
		const sections: Record<string, string> = {}
		const { componentOrder } = this.variant

		// Process components sequentially to maintain order
		for (const componentId of componentOrder) {
			const componentFn = this.components[componentId]
			if (!componentFn) {
				Logger.warn(`Warning: Component '${componentId}' not found`)
				continue
			}

			try {
				const result = await componentFn(this.variant, this.context)
				if (result?.trim()) {
					sections[componentId] = result
				}
			} catch (error) {
				Logger.warn(`Warning: Failed to build component '${componentId}':`, error)
			}
		}

		return sections
	}

	private preparePlaceholders(componentSections: Record<string, string>): Record<string, unknown> {
		// Create base placeholders object with optimal capacity
		const placeholders: Record<string, unknown> = {}

		// Add variant placeholders
		Object.assign(placeholders, this.variant.placeholders)

		// Add standard system placeholders
		placeholders[STANDARD_PLACEHOLDERS.CWD] = this.context.cwd || process.cwd()
		placeholders[STANDARD_PLACEHOLDERS.SUPPORTS_BROWSER] = this.context.supportsBrowserUse || false
		placeholders[STANDARD_PLACEHOLDERS.MODEL_FAMILY] = this.variant.family
		placeholders[STANDARD_PLACEHOLDERS.CURRENT_DATE] = new Date().toISOString().split("T")[0]

		// Add all component sections
		Object.assign(placeholders, componentSections)

		// Map component sections to standard placeholders in a single loop
		for (const key of STANDARD_PLACEHOLDER_KEYS) {
			if (!placeholders[key]) {
				placeholders[key] = componentSections[key] || ""
			}
		}

		// Add runtime placeholders with highest priority
		const runtimePlaceholders = (this.context as any).runtimePlaceholders
		if (runtimePlaceholders) {
			Object.assign(placeholders, runtimePlaceholders)
		}
		return placeholders
	}

	private postProcess(prompt: string): string {
		if (!prompt) {
			return ""
		}

		// Combine multiple regex operations for better performance
		return prompt
			.replace(/\n\s*\n\s*\n/g, "\n\n") // Remove multiple consecutive empty lines
			.trim() // Remove leading/trailing whitespace
			.replace(/====+\s*$/, "") // Remove trailing ==== after trim
			.replace(/\n====+\s*\n+\s*====+\n/g, "\n====\n") // Remove empty sections between separators
			.replace(/====\s*\n\s*====\s*\n/g, "====\n") // Remove consecutive empty sections
			.replace(/^##\s*$[\r\n]*/gm, "") // Remove empty section headers (## with no content)
			.replace(/\n##\s*$[\r\n]*/gm, "") // Remove empty section headers that appear mid-document
			.replace(/====+\n(?!\n)([^\n])/g, (match, _nextChar, offset, string) => {
				// Add extra newline after ====+ if not already followed by a newline
				// Exception: preserve single newlines when ====+ appears to be part of diff-like content
				// Look for patterns like "SEARCH\n=======\n" or ";\n=======\n" (diff markers)
				const beforeContext = string.substring(Math.max(0, offset - 50), offset)
				const afterContext = string.substring(offset, Math.min(string.length, offset + 50))
				const isDiffLike = /SEARCH|REPLACE|\+\+\+\+\+\+\+|-------/.test(beforeContext + afterContext)
				return isDiffLike ? match : match.replace(/\n/, "\n\n")
			})
			.replace(/([^\n])\n(?!\n)====+/g, (match, prevChar, offset, string) => {
				// Add extra newline before ====+ if not already preceded by a newline
				// Exception: preserve single newlines when ====+ appears to be part of diff-like content
				const beforeContext = string.substring(Math.max(0, offset - 50), offset)
				const afterContext = string.substring(offset, Math.min(string.length, offset + 50))
				const isDiffLike = /SEARCH|REPLACE|\+\+\+\+\+\+\+|-------/.test(beforeContext + afterContext)
				return isDiffLike ? match : prevChar + "\n\n" + match.substring(1).replace(/\n/, "")
			})
			.replace(/\n\s*\n\s*\n/g, "\n\n") // Clean up any multiple empty lines created by header removal
			.trim() // Final trim to remove any whitespace added by regex operations
	}

	getBuildMetadata(): {
		variantId: string
		version: number
		componentsUsed: string[]
		placeholdersResolved: string[]
	} {
		return {
			variantId: this.variant.id,
			version: this.variant.version,
			componentsUsed: [...this.variant.componentOrder],
			placeholdersResolved: this.templateEngine.extractPlaceholders(this.variant.baseTemplate),
		}
	}

	private static getEnabledTools(variant: PromptVariant, context: SystemPromptContext): ClineToolSpec[] {
		return ClineToolSet.getEnabledToolSpecs(variant, context)
	}

	public static async getToolsPrompts(variant: PromptVariant, context: SystemPromptContext) {
		const enabledTools = PromptBuilder.getEnabledTools(variant, context)

		const ids = enabledTools.map((tool) => tool.id)
		return Promise.all(enabledTools.map((tool) => PromptBuilder.tool(tool, ids, context)))
	}

	public static tool(config: ClineToolSpec, registry: ClineDefaultTool[], context: SystemPromptContext): string {
		// Skip tools without parameters or description - those are placeholder tools
		if (!config.parameters?.length && !config.description?.length) {
			return ""
		}

		// Check if user prefers Chinese
		const isChinese =
			context.preferredLanguageInstructions?.includes("Chinese") ||
			context.preferredLanguageInstructions?.includes("中文") ||
			false

		// Clone config to avoid mutating original
		const toolConfig = { ...config }

		// Use Chinese descriptions for write_to_file tool if user prefers Chinese
		if (isChinese && toolConfig.id === ClineDefaultTool.FILE_NEW) {
			toolConfig.description =
				"请求在指定路径写入文件内容。如果文件存在，将被覆盖；如果文件不存在，将创建新文件。此工具会自动创建写入文件所需的目录。**重要：当用户用中文要求创建文档、编写文档或生成规格说明时，必须使用此工具创建文件，而不是直接回复文本。**"
			// Update parameters for Chinese
			if (toolConfig.parameters) {
				toolConfig.parameters = toolConfig.parameters.map((param) => {
					if (param.name === "path") {
						return {
							...param,
							instruction: `要写入的文件路径（相对于当前工作目录 {{CWD}}）{{MULTI_ROOT_HINT}}`,
							usage: "文件路径",
						}
					}
					if (param.name === "content") {
						return {
							...param,
							instruction:
								"要写入文件的内容。请提供文件的完整内容，不要截断或遗漏任何部分。即使文件部分内容未修改，也必须包含所有部分。",
							usage: "文件内容",
						}
					}
					return param
				})
			}
		} else if (isChinese && toolConfig.id === ClineDefaultTool.FILE_READ) {
			toolConfig.description =
				"请求读取指定路径文件的内容。当您需要检查一个您不知道内容的现有文件时使用此工具，例如分析代码、查看文本文件或从配置文件中提取信息。返回的文本行前面会带有行标签（例如 `1 |`、`2 |`）。这些标签是元数据，不是文件内容的一部分。对于大文件，输出会自动限制为 1000 行。使用 start_line 和 end_line 来读取特定部分。自动从 PDF 和 DOCX 文件中提取原始文本。可能不适合其他类型的二进制文件，因为它会将原始内容作为字符串返回。请勿使用此工具列出目录内容。只能在文件上使用此工具。"
			// Update parameters for Chinese
			if (toolConfig.parameters) {
				toolConfig.parameters = toolConfig.parameters.map((param) => {
					if (param.name === "path") {
						return {
							...param,
							instruction: `要读取的文件路径（相对于当前工作目录 {{CWD}}）{{MULTI_ROOT_HINT}}`,
							usage: "文件路径",
						}
					}
					if (param.name === "start_line") {
						return { ...param, instruction: "开始读取的行号（从 1 开始，包含）。默认为 1。", usage: "1" }
					}
					if (param.name === "end_line") {
						return {
							...param,
							instruction:
								"停止读取的行号（从 1 开始，包含）。默认为 start_line + 1000。与 start_line 一起使用以读取大文件的特定部分。",
							usage: "1000",
						}
					}
					return param
				})
			}
		}

		const displayName = toolConfig.name || toolConfig.id
		const title = `## ${displayName}`
		const description = [`Description: ${toolConfig.description}`]

		if (!toolConfig.parameters?.length) {
			toolConfig.parameters = []
		}

		// Clone parameters to avoid mutating original
		const params = [...toolConfig.parameters]

		// Filter parameters based on dependencies and contextRequirements
		const filteredParams = params.filter((p) => {
			// Check dependencies first (existing behavior)
			if (p.dependencies?.length) {
				if (!p.dependencies.every((d) => registry.includes(d))) {
					return false
				}
			}

			// Check contextRequirements (new behavior)
			if (p.contextRequirements) {
				return p.contextRequirements(context)
			}

			return true
		})

		// Collect additional descriptions only from filtered parameters
		const additionalDesc = filteredParams.map((p) => p.description).filter((desc): desc is string => Boolean(desc))
		if (additionalDesc.length) {
			description.push(...additionalDesc)
		}

		// Build prompt sections efficiently
		const sections = [
			title,
			description.join("\n"),
			PromptBuilder.buildParametersSection(filteredParams, context),
			PromptBuilder.buildUsageSection(displayName, filteredParams),
		]

		return sections.filter(Boolean).join("\n")
	}

	private static buildParametersSection(params: any[], context: SystemPromptContext): string {
		if (!params.length) {
			return "Parameters: None"
		}

		const paramList = params.map((p) => {
			const requiredText = p.required ? "required" : "optional"
			const instruction = resolveInstruction(p.instruction, context)
			return `- ${p.name}: (${requiredText}) ${instruction}`
		})

		return ["Parameters:", ...paramList].join("\n")
	}

	private static buildUsageSection(toolId: string, params: any[]): string {
		const usageSection = ["Usage:"]
		const usageTag = `<${toolId}>`
		const usageEndTag = `</${toolId}>`

		usageSection.push(usageTag)

		// Add parameter usage tags
		for (const param of params) {
			const usage = param.usage || ""
			usageSection.push(`<${param.name}>${usage}</${param.name}>`)
		}

		usageSection.push(usageEndTag)
		return usageSection.join("\n")
	}
}
