import type { ClineMessage, ClineSayTool } from "@shared/ExtensionMessage"
import type { Mode } from "@shared/storage/types"

/**
 * Button action types that determine the behavior
 */
export type ButtonActionType =
	| "approve" // Send yesButtonClicked
	| "reject" // Send noButtonClicked
	| "proceed" // Send messageResponse or yesButtonClicked
	| "new_task" // Start a new task
	| "cancel" // Cancel streaming
	| "utility" // Execute utility function (condense, report_bug)
	| "retry" // Retry the last action

/**
 * Button configuration for different message states
 */
export interface ButtonConfig {
	sendingDisabled: boolean
	enableButtons: boolean
	primaryText?: string
	secondaryText?: string
	primaryAction?: ButtonActionType
	secondaryAction?: ButtonActionType
}

/**
 * Centralized button state configurations based on task lifecycle
 * This is the single source of truth for both button display and actions
 */
export const BUTTON_CONFIGS: Record<string, ButtonConfig> = {
	// Error recovery states - user must take action
	api_req_failed: {
		sendingDisabled: true,
		enableButtons: true,
		primaryText: "重试",
		secondaryText: "开始新任务",
		primaryAction: "retry",
		secondaryAction: "new_task",
	},
	mistake_limit_reached: {
		sendingDisabled: false,
		enableButtons: true,
		primaryText: "继续执行",
		secondaryText: "开始新任务",
		primaryAction: "proceed",
		secondaryAction: "new_task",
	},

	// Tool approval states - most common during task execution
	tool_approve: {
		sendingDisabled: false,
		enableButtons: true,
		primaryText: "批准",
		secondaryText: "拒绝",
		primaryAction: "approve",
		secondaryAction: "reject",
	},
	tool_save: {
		sendingDisabled: false,
		enableButtons: true,
		primaryText: "保存",
		secondaryText: "拒绝",
		primaryAction: "approve",
		secondaryAction: "reject",
	},

	// Command execution states
	command: {
		sendingDisabled: false,
		enableButtons: true,
		primaryText: "运行命令",
		secondaryText: "拒绝",
		primaryAction: "approve",
		secondaryAction: "reject",
	},
	command_output: {
		sendingDisabled: false,
		enableButtons: true,
		primaryText: "继续执行",
		secondaryText: undefined,
		primaryAction: "proceed",
		secondaryAction: undefined,
	},

	// Browser and external tool states
	browser_action_launch: {
		sendingDisabled: false,
		enableButtons: true,
		primaryText: "批准",
		secondaryText: "拒绝",
		primaryAction: "approve",
		secondaryAction: "reject",
	},
	use_mcp_server: {
		sendingDisabled: false,
		enableButtons: true,
		primaryText: "批准",
		secondaryText: "拒绝",
		primaryAction: "approve",
		secondaryAction: "reject",
	},
	use_subagents: {
		sendingDisabled: false,
		enableButtons: true,
		primaryText: "批准",
		secondaryText: "拒绝",
		primaryAction: "approve",
		secondaryAction: "reject",
	},
	followup: {
		sendingDisabled: false,
		enableButtons: false,
		primaryText: undefined,
		secondaryText: undefined,
		primaryAction: undefined,
		secondaryAction: undefined,
	},
	plan_mode_respond: {
		sendingDisabled: false,
		enableButtons: false,
		primaryText: undefined,
		secondaryText: undefined,
		primaryAction: undefined,
		secondaryAction: undefined,
	},

	// Task lifecycle states
	completion_result: {
		sendingDisabled: false,
		enableButtons: true,
		primaryText: "开始新任务",
		secondaryText: undefined,
		primaryAction: "new_task",
		secondaryAction: undefined,
	},
	resume_task: {
		sendingDisabled: false,
		enableButtons: true,
		primaryText: "恢复任务",
		secondaryText: undefined,
		primaryAction: "proceed",
		secondaryAction: undefined,
	},
	resume_completed_task: {
		sendingDisabled: false,
		enableButtons: true,
		primaryText: "开始新任务",
		secondaryText: undefined,
		primaryAction: "new_task",
		secondaryAction: undefined,
	},
	new_task: {
		sendingDisabled: false,
		enableButtons: true,
		primaryText: "开始新任务（带上下文）",
		secondaryText: undefined,
		primaryAction: "new_task",
		secondaryAction: undefined,
	},

	// Utility states
	condense: {
		sendingDisabled: false,
		enableButtons: true,
		primaryText: "压缩对话",
		secondaryText: undefined,
		primaryAction: "utility",
		secondaryAction: undefined,
	},
	report_bug: {
		sendingDisabled: false,
		enableButtons: true,
		primaryText: "报告 GitHub 问题",
		secondaryText: undefined,
		primaryAction: "utility",
		secondaryAction: undefined,
	},

	// Streaming/partial states - disable interaction during streaming
	partial: {
		sendingDisabled: true,
		enableButtons: true,
		primaryText: undefined,
		secondaryText: "取消",
		primaryAction: undefined,
		secondaryAction: "cancel",
	},

	// Default states
	default: {
		sendingDisabled: false,
		enableButtons: false,
		primaryText: undefined,
		secondaryText: undefined,
		primaryAction: undefined,
		secondaryAction: undefined,
	},
	api_req_active: {
		sendingDisabled: true,
		enableButtons: false,
		primaryText: undefined,
		secondaryText: undefined,
		primaryAction: undefined,
		secondaryAction: undefined,
	},
}

/**
 * Gets the button configuration for a given message
 * This is the main entry point for determining button state
 */
export function getButtonConfig(message: ClineMessage | undefined, mode?: Mode): ButtonConfig {
	if (!message) {
		return BUTTON_CONFIGS.default
	}

	const isStreaming = message.partial === true
	const stateKey = determineButtonState(message, isStreaming, isStreaming, mode || "act")

	return BUTTON_CONFIGS[stateKey] || BUTTON_CONFIGS.default
}

/**
 * Determines the appropriate button state key based on the current message context
 */
export function determineButtonState(
	message: ClineMessage,
	isStreaming: boolean,
	isPartial: boolean,
	mode: Mode,
): string {
	// During streaming, show partial state
	if (isStreaming || isPartial) {
		return "partial"
	}

	// Check for ask messages that need button responses
	if (message.type === "ask") {
		// Handle different ask types
		switch (message.ask) {
			case "api_req_failed":
				return "api_req_failed"
			case "mistake_limit_reached":
				return "mistake_limit_reached"
			case "tool":
				return handleToolApproval(message)
			case "command":
				return handleCommandApproval(message)
			case "browser_action_launch":
				return "browser_action_launch"
			case "use_mcp_server":
				return "use_mcp_server"
			case "use_subagents":
				return "use_subagents"
			case "followup":
				return "followup"
			case "plan_mode_respond":
				return "plan_mode_respond"
			case "completion_result":
				return "completion_result"
			case "resume_task":
				return "resume_task"
			case "resume_completed_task":
				return "resume_completed_task"
			case "new_task":
				return "new_task"
			case "condense":
				return "condense"
			case "report_bug":
				return "report_bug"
			default:
				return "default"
		}
	}

	// Check for say messages that indicate active API requests
	if (message.type === "say" && message.say === "api_req_started") {
		return "api_req_active"
	}

	return "default"
}

/**
 * Handles tool approval button state based on tool type
 */
function handleToolApproval(message: ClineMessage): string {
	if (!message.text) {
		return "tool_approve"
	}

	try {
		const toolData = JSON.parse(message.text) as ClineSayTool
		// Save operations get a different primary button text
		if (toolData.tool === "editedExistingFile" || toolData.tool === "newFileCreated") {
			return "tool_save"
		}
	} catch {
		// If parsing fails, use default tool approval
	}

	return "tool_approve"
}

/**
 * Handles command approval button state
 */
function handleCommandApproval(message: ClineMessage): string {
	if (!message.text) {
		return "command"
	}

	try {
		const commandData = JSON.parse(message.text)
		// Commands that are already running show "Proceed While Running"
		if (commandData.request_status === "running") {
			return "command_output"
		}
	} catch {
		// If parsing fails, use default command approval
	}

	return "command"
}
