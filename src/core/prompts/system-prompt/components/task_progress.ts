import { ModelFamily } from "@/shared/prompts"
import { PromptVariant, SystemPromptContext, SystemPromptSection, TemplateEngine } from ".."

const UPDATING_TASK_PROGRESS = `更新任务进度 (TASK PROGRESS)

你可以使用每个工具调用支持的task_progress参数来跟踪和传达整体任务的进度。使用task_progress可以确保你专注于任务，并专注于完成用户的目标。此参数可以在任何模式和任何工具调用中使用。

**重要：语言要求（强制执行）**
- 所有任务描述必须使用中文
- 禁止使用英文描述任务进度
- 任务列表中的每一项都应该是中文
- 这是强制要求，无论用户之前使用什么语言

**重要：避免重复**
- 如果已经存在task_progress列表，不要重新生成完整的列表
- 只更新已完成的任务状态（将[ ]改为[x]）
- 只有在任务范围发生变化时才添加或删除任务项
- 不要在每次工具调用时都重复输出整个任务列表
- 保持任务列表的稳定性，避免不必要的修改

- 从PLAN MODE切换到ACT MODE时，必须使用task_progress参数为任务创建全面的待办事项列表
- 使用task_progress参数静默更新待办事项列表 - 不要向用户宣布这些更新
- 使用标准Markdown复选框格式："- [ ]"表示未完成项目，"- [x]"表示已完成项目
- 将项目集中在有意义的进度里程碑上，而不是次要的技术细节。清单不应该过于详细，以免次要实现细节干扰进度跟踪。
- 对于简单任务，即使是单个项目的简短清单也可以接受。对于复杂任务，避免使清单过长或冗长。
- 如果你是第一次创建此清单，并且工具使用完成了清单中的第一步，请确保在你的task_progress参数中将其标记为已完成。
- 提供你打算在任务中完成的整个步骤清单，并在取得进展时保持复选框更新。如果由于范围更改或新信息导致清单无效，可以重写此清单。
- 如果使用清单，请务必在任何时候完成步骤时更新它。
- 系统将在适当时自动在提示中包含待办事项列表上下文 - 这些提醒很重要。

示例：
<execute_command>
<command>npm install react</command>
<requires_approval>false</requires_approval>
<task_progress>
- [x] 设置项目结构
- [x] 安装依赖
- [ ] 创建组件
- [ ] 测试应用
</task_progress>
</execute_command>

**中文任务描述示例**：
- [x] 分析需求和用户故事
- [x] 设计游戏机制和核心玩法
- [ ] 实现核心功能
- [ ] 编写测试用例`

const UPDATING_TASK_PROGRESS_NATIVE_NEXT_GEN = `更新任务进度 (TASK PROGRESS)

你可以使用每个工具调用支持的task_progress参数来跟踪和传达整体任务的进度。使用task_progress可以确保你专注于任务，并专注于完成用户的目标。此参数可以在任何模式和任何工具调用中使用。

**重要：语言要求（强制执行）**
- 所有任务描述必须使用中文
- 禁止使用英文描述任务进度
- 任务列表中的每一项都应该是中文
- 这是强制要求，无论用户之前使用什么语言

**重要：避免重复**
- 如果已经存在task_progress列表，不要重新生成完整的列表
- 只更新已完成的任务状态（将[ ]改为[x]）
- 只有在任务范围发生变化时才添加或删除任务项
- 不要在每次工具调用时都重复输出整个任务列表

- 从PLAN MODE切换到ACT MODE时，必须使用task_progress参数为任务创建全面的待办事项列表
- 使用task_progress参数静默更新待办事项列表 - 不要向用户宣布这些更新
- 将项目集中在有意义的进度里程碑上，而不是次要的技术细节。清单不应该过于详细，以免次要实现细节干扰进度跟踪。
- 对于简单任务，即使是单个项目的简短清单也可以接受。对于复杂任务，避免使清单过长或冗长。
- 如果你是第一次创建此清单，并且工具使用完成了清单中的第一步，请确保在你的task_progress参数中将其标记为已完成。
- 提供你打算在任务中完成的整个步骤清单，并在取得进展时保持复选框更新。如果由于范围更改或新信息导致清单无效，可以重写此清单。
- 如果使用清单，请务必在任何时候完成步骤时更新它。
- 系统将在适当时自动在提示中包含待办事项列表上下文 - 这些提醒很重要。

**如何使用task_progress：**
- 在工具调用中包含task_progress参数以提供更新的清单
- 使用标准Markdown复选框格式："- [ ]"表示未完成项目，"- [x]"表示已完成项目
- task_progress参数必须作为工具中的单独参数包含，不应包含在其他内容或参数块内。`

const UPDATING_TASK_PROGRESS_NATIVE_GPT5 = `更新任务进度 (TASK PROGRESS)

你可以使用每个工具调用支持的task_progress参数来跟踪和传达整体任务的进度。使用task_progress可以确保你专注于任务，并专注于完成用户的目标。此参数可以在任何模式和任何工具调用中使用。

**重要：语言要求（强制执行）**
- 所有任务描述必须使用中文
- 禁止使用英文描述任务进度
- 任务列表中的每一项都应该是中文
- 这是强制要求，无论用户之前使用什么语言

**重要：避免重复**
- 如果已经存在task_progress列表，不要重新生成完整的列表
- 只更新已完成的任务状态（将[ ]改为[x]）
- 只有在任务范围发生变化时才添加或删除任务项
- 不要在每次工具调用时都重复输出整个任务列表

- 从PLAN MODE切换到ACT MODE时，必须使用task_progress参数为任务创建全面的待办事项列表
- 使用task_progress参数静默更新待办事项列表，不要通过content参数向用户宣布这些更新
- 将项目集中在有意义的进度里程碑上，而不是次要的技术细节。清单应该避免过于详细，以免次要实现细节干扰进度跟踪。
- 对于简单任务，即使是单个项目的简短清单也可以接受。
- 如果你是第一次创建此清单，并且工具使用完成了清单中的第一步，请确保在你的task_progress参数中将其标记为已完成。
- 提供你打算在任务中完成的整个步骤清单，并在取得进展时保持复选框更新。如果由于范围更改或新信息导致清单无效，可以重写此清单。
- 请务必在任何时候完成步骤时更新清单。
- 系统可能在适当时在提示中包含待办事项列表上下文 - 这些提醒很重要，并作为你成功执行任务的验证。

**如何使用task_progress：**
- 在工具调用中包含task_progress参数以提供更新的清单
- 使用标准Markdown复选框格式："- [ ]"表示未完成项目，"- [x]"表示已完成项目
- task_progress参数必须作为工具中的单独参数包含，不应包含在其他内容或参数块内。`

export async function getUpdatingTaskProgress(variant: PromptVariant, context: SystemPromptContext): Promise<string | undefined> {
	if (!context.focusChainSettings?.enabled) {
		return undefined
	}

	// 检查是否为中文环境（使用更宽松的匹配）
	const lang = context.preferredLanguageInstructions?.toLowerCase() || ""
	const isChinese = lang.includes("zh") || lang.includes("chinese") || lang.includes("中文")

	// Check for component override first
	if (variant.componentOverrides?.[SystemPromptSection.TASK_PROGRESS]?.template) {
		const template = variant.componentOverrides[SystemPromptSection.TASK_PROGRESS].template
		return new TemplateEngine().resolve(template, context, {})
	}

	// 所有模型都使用中文版本的task_progress提示词
	let template = UPDATING_TASK_PROGRESS
	if (variant.id === ModelFamily.NATIVE_NEXT_GEN) {
		template = UPDATING_TASK_PROGRESS_NATIVE_NEXT_GEN
	}
	if (variant.id === ModelFamily.NATIVE_GPT_5) {
		template = UPDATING_TASK_PROGRESS_NATIVE_GPT5
	}

	return new TemplateEngine().resolve(template, context, {})
}
