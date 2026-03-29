import { ModelFamily } from "@/shared/prompts"
import { ClineDefaultTool } from "@/shared/tools"
import type { ClineToolSpec } from "../../spec"
import { TASK_PROGRESS_PARAMETER } from "../../types"

const id = ClineDefaultTool.FILE_READ

const READ_FILE_DESCRIPTION =
	"请求读取指定路径文件的内容。当您需要检查一个您不知道内容的现有文件时使用此工具，例如分析代码、查看文本文件或从配置文件中提取信息。返回的文本行前面会带有行标签（例如 `1 |`、`2 |`）。这些标签是元数据，不是文件内容的一部分。对于大文件，输出会自动限制为 1000 行。使用 start_line 和 end_line 来读取特定部分。自动从 PDF 和 DOCX 文件中提取原始文本。可能不适合其他类型的二进制文件，因为它会将原始内容作为字符串返回。请勿使用此工具列出目录内容。只能在文件上使用此工具。"

const READ_FILE_PARAMETERS: ClineToolSpec["parameters"] = [
	{
		name: "path",
		required: true,
		instruction: `要读取的文件路径（相对于当前工作目录 {{CWD}}）{{MULTI_ROOT_HINT}}`,
		usage: "文件路径",
	},
	{
		name: "start_line",
		required: false,
		type: "integer",
		instruction: "开始读取的行号（从 1 开始，包含）。默认为 1。",
		usage: "1",
	},
	{
		name: "end_line",
		required: false,
		type: "integer",
		instruction:
			"停止读取的行号（从 1 开始，包含）。默认为 start_line + 1000。与 start_line 一起使用以读取大文件的特定部分。",
		usage: "1000",
	},
	TASK_PROGRESS_PARAMETER,
]

const generic: ClineToolSpec = {
	variant: ModelFamily.GENERIC,
	id,
	name: "read_file",
	description: READ_FILE_DESCRIPTION,
	parameters: READ_FILE_PARAMETERS,
}

const NATIVE_GPT_5: ClineToolSpec = {
	variant: ModelFamily.NATIVE_GPT_5,
	id,
	name: "read_file",
	description: READ_FILE_DESCRIPTION,
	parameters: READ_FILE_PARAMETERS,
}

const NATIVE_NEXT_GEN: ClineToolSpec = {
	...NATIVE_GPT_5,
	variant: ModelFamily.NATIVE_NEXT_GEN,
}

export const read_file_variants = [generic, NATIVE_NEXT_GEN, NATIVE_GPT_5]
