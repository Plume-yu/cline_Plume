import { TFunction } from "i18next"
import { ActionMetadata } from "./types"

export const getActionMetadata = (t: TFunction): ActionMetadata[] => [
	{
		id: "readFiles",
		label: t("autoApprove.readFiles"),
		shortName: t("autoApprove.readFilesShort"),
		icon: "codicon-search",
		subAction: {
			id: "readFilesExternally",
			label: t("autoApprove.readAllFiles"),
			shortName: t("autoApprove.readAllFilesShort"),
			icon: "codicon-folder-opened",
			parentActionId: "readFiles",
		},
	},
	{
		id: "editFiles",
		label: t("autoApprove.editFiles"),
		shortName: t("autoApprove.editFilesShort"),
		icon: "codicon-edit",
		subAction: {
			id: "editFilesExternally",
			label: t("autoApprove.editAllFiles"),
			shortName: t("autoApprove.editAllFilesShort"),
			icon: "codicon-files",
			parentActionId: "editFiles",
		},
	},
	{
		id: "executeSafeCommands",
		label: t("autoApprove.executeSafeCommands"),
		shortName: t("autoApprove.executeSafeCommandsShort"),
		icon: "codicon-terminal",
		subAction: {
			id: "executeAllCommands",
			label: t("autoApprove.executeAllCommands"),
			shortName: t("autoApprove.executeAllCommandsShort"),
			icon: "codicon-terminal-bash",
			parentActionId: "executeSafeCommands",
		},
	},
	{
		id: "useBrowser",
		label: t("autoApprove.useBrowser"),
		shortName: t("autoApprove.useBrowserShort"),
		icon: "codicon-globe",
	},
	{
		id: "useMcp",
		label: t("autoApprove.useMcp"),
		shortName: t("autoApprove.useMcpShort"),
		icon: "codicon-server",
	},
]

export const getNotificationsSetting = (t: TFunction): ActionMetadata => ({
	id: "enableNotifications",
	label: t("autoApprove.enableNotifications"),
	shortName: t("autoApprove.enableNotifications"),
	icon: "codicon-bell",
})

export const ACTION_METADATA: ActionMetadata[] = [
	{
		id: "readFiles",
		label: "Read project files",
		shortName: "Read",
		icon: "codicon-search",
		subAction: {
			id: "readFilesExternally",
			label: "Read all files",
			shortName: "Read (all)",
			icon: "codicon-folder-opened",
			parentActionId: "readFiles",
		},
	},
	{
		id: "editFiles",
		label: "Edit project files",
		shortName: "Edit",
		icon: "codicon-edit",
		subAction: {
			id: "editFilesExternally",
			label: "Edit all files",
			shortName: "Edit (all)",
			icon: "codicon-files",
			parentActionId: "editFiles",
		},
	},
	{
		id: "executeSafeCommands",
		label: "Execute safe commands",
		shortName: "Safe Commands",
		icon: "codicon-terminal",
		subAction: {
			id: "executeAllCommands",
			label: "Execute all commands",
			shortName: "All Commands",
			icon: "codicon-terminal-bash",
			parentActionId: "executeSafeCommands",
		},
	},
	{
		id: "useBrowser",
		label: "Use the browser",
		shortName: "Browser",
		icon: "codicon-globe",
	},
	{
		id: "useMcp",
		label: "Use MCP servers",
		shortName: "MCP",
		icon: "codicon-server",
	},
]

export const NOTIFICATIONS_SETTING: ActionMetadata = {
	id: "enableNotifications",
	label: "Enable notifications",
	shortName: "Notifications",
	icon: "codicon-bell",
}
