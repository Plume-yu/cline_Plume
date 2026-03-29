import { ModelFamily } from "@/shared/prompts"
import { ClineDefaultTool } from "@/shared/tools"
import type { ClineToolSpec } from "../../spec"
import { TASK_PROGRESS_PARAMETER } from "../../types"

/**
 * ## write_to_file
Description: 请求在指定路径写入文件内容。如果文件存在，将被覆盖；如果文件不存在，将创建新文件。此工具会自动创建写入文件所需的目录。
Parameters:
- path: (必需) 要写入的文件路径（相对于当前工作目录 ${cwd.toPosix()}）
- content: (必需) 要写入文件的内容。请提供文件的完整内容，不要截断或遗漏任何部分。即使文件部分内容未修改，也必须包含所有部分。
${focusChainSettings.enabled ? `- task_progress: (可选) 显示此工具使用完成后的任务进度清单。（详情请参阅'更新任务进度'部分）` : "" }
Usage:
<write_to_file>
<path>文件路径</path>
<content>
文件内容
</content>
${focusChainSettings.enabled ? `<task_progress>
清单（可选）
</task_progress>` : "" }
</write_to_file>
 */

const id = ClineDefaultTool.FILE_NEW

const GENERIC: ClineToolSpec = {
	variant: ModelFamily.GENERIC,
	id,
	name: "write_to_file",
	description:
		"请求在指定路径写入文件内容。如果文件存在，将被覆盖；如果文件不存在，将创建新文件。此工具会自动创建写入文件所需的目录。**重要：当用户用中文要求创建文档、编写文档或生成规格说明时，必须使用此工具创建文件，而不是直接回复文本。**",
	parameters: [
		{
			name: "path",
			required: true,
			instruction: `要写入的文件路径（相对于当前工作目录 {{CWD}}）{{MULTI_ROOT_HINT}}`,
			usage: "文件路径",
		},
		{
			name: "content",
			required: true,
			instruction:
				"要写入文件的内容。请提供文件的完整内容，不要截断或遗漏任何部分。即使文件部分内容未修改，也必须包含所有部分。",
			usage: "文件内容",
		},
		TASK_PROGRESS_PARAMETER,
	],
}

const NATIVE_NEXT_GEN: ClineToolSpec = {
	variant: ModelFamily.NATIVE_NEXT_GEN,
	id,
	name: "write_to_file",
	description:
		"[重要：请先输出 absolutePath] 请求在指定路径写入文件内容。如果文件存在，将被覆盖；如果文件不存在，将创建新文件。此工具会自动创建写入文件所需的目录。**重要：当用户用中文要求创建文档、编写文档或生成规格说明时，必须使用此工具创建文件，而不是直接回复文本。**",
	parameters: [
		{
			name: "absolutePath",
			required: true,
			instruction: "要写入的文件的绝对路径。",
		},
		{
			name: "content",
			required: true,
			instruction: "在提供路径以便创建文件后，使用此字段提供要写入文件的内容。",
		},
		TASK_PROGRESS_PARAMETER,
	],
}

const NATIVE_GPT_5: ClineToolSpec = {
	...NATIVE_NEXT_GEN,
	variant: ModelFamily.NATIVE_GPT_5,
}

export const write_to_file_variants = [GENERIC, NATIVE_NEXT_GEN, NATIVE_GPT_5]
