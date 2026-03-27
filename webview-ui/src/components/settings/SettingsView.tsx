import type { ExtensionMessage } from "@shared/ExtensionMessage"
import { ResetStateRequest } from "@shared/proto/cline/state"
import { UserOrganization } from "@shared/proto/index.cline"
import {
	CheckCheck,
	FlaskConical,
	HardDriveDownload,
	Info,
	type LucideIcon,
	SlidersHorizontal,
	SquareMousePointer,
	SquareTerminal,
	Wrench,
} from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { useEvent } from "react-use"
import { useTranslation } from "react-i18next"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useClineAuth } from "@/context/ClineAuthContext"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { cn } from "@/lib/utils"
import { StateServiceClient } from "@/services/grpc-client"
import { isAdminOrOwner } from "../account/helpers"
import { Tab, TabContent, TabList, TabTrigger } from "../common/Tab"
import ViewHeader from "../common/ViewHeader"
import SectionHeader from "./SectionHeader"
import AboutSection from "./sections/AboutSection"
import ApiConfigurationSection from "./sections/ApiConfigurationSection"
import BrowserSettingsSection from "./sections/BrowserSettingsSection"
import DebugSection from "./sections/DebugSection"
import FeatureSettingsSection from "./sections/FeatureSettingsSection"
import GeneralSettingsSection from "./sections/GeneralSettingsSection"
import { RemoteConfigSection } from "./sections/RemoteConfigSection"
import TerminalSettingsSection from "./sections/TerminalSettingsSection"

const IS_DEV = process.env.IS_DEV

type SettingsTabID = "api-config" | "features" | "browser" | "terminal" | "general" | "about" | "debug" | "remote-config"
interface SettingsTab {
	id: SettingsTabID
	nameKey: string
	tooltipKey: string
	headerKey: string
	icon: LucideIcon
	hidden?: (params?: { activeOrganization: UserOrganization | null }) => boolean
}

export const SETTINGS_TABS: SettingsTab[] = [
	{
		id: "api-config",
		nameKey: "settings.apiConfig",
		tooltipKey: "settings.apiConfig",
		headerKey: "settings.apiConfig",
		icon: SlidersHorizontal,
	},
	{
		id: "features",
		nameKey: "settings.features",
		tooltipKey: "settings.featureSettings",
		headerKey: "settings.featureSettings",
		icon: CheckCheck,
	},
	{
		id: "browser",
		nameKey: "settings.browser",
		tooltipKey: "settings.browserSettings",
		headerKey: "settings.browserSettings",
		icon: SquareMousePointer,
	},
	{
		id: "terminal",
		nameKey: "settings.terminal",
		tooltipKey: "settings.terminalSettings",
		headerKey: "settings.terminalSettings",
		icon: SquareTerminal,
	},
	{
		id: "general",
		nameKey: "settings.general",
		tooltipKey: "settings.generalSettings",
		headerKey: "settings.generalSettings",
		icon: Wrench,
	},
	{
		id: "remote-config",
		nameKey: "settings.remoteConfig",
		tooltipKey: "settings.remoteConfigDesc",
		headerKey: "settings.remoteConfig",
		icon: HardDriveDownload,
		hidden: ({ activeOrganization } = { activeOrganization: null }) =>
			!activeOrganization || !isAdminOrOwner(activeOrganization),
	},
	{
		id: "about",
		nameKey: "settings.about",
		tooltipKey: "settings.aboutCline",
		headerKey: "settings.about",
		icon: Info,
	},
	{
		id: "debug",
		nameKey: "settings.debug",
		tooltipKey: "settings.debugTools",
		headerKey: "settings.debug",
		icon: FlaskConical,
		hidden: () => !IS_DEV,
	},
]

type SettingsViewProps = {
	onDone: () => void
	targetSection?: string
}

const SettingsView = ({ onDone, targetSection }: SettingsViewProps) => {
	const { t } = useTranslation()

	const TAB_CONTENT_MAP: Record<SettingsTabID, React.FC<any>> = useMemo(
		() => ({
			"api-config": ApiConfigurationSection,
			general: GeneralSettingsSection,
			features: FeatureSettingsSection,
			browser: BrowserSettingsSection,
			terminal: TerminalSettingsSection,
			"remote-config": RemoteConfigSection,
			about: AboutSection,
			debug: DebugSection,
		}),
		[],
	)

	const { version, environment, settingsInitialModelTab } = useExtensionState()
	const { activeOrganization } = useClineAuth()

	const [activeTab, setActiveTab] = useState<string>(targetSection || SETTINGS_TABS[0].id)

	const handleMessage = useCallback((event: MessageEvent) => {
		const message: ExtensionMessage = event.data
		if (message.type !== "grpc_response") {
			return
		}

		const grpcMessage = message.grpc_response?.message
		if (grpcMessage?.stateUpdate?.resetState) {
			window.location.reload()
		}
	}, [])

	useEvent("message", handleMessage)

	const handleResetState = useCallback(async () => {
		await StateServiceClient.resetState(ResetStateRequest.create({}))
	}, [])

	const renderSectionHeader = useCallback(
		(tabId: string) => {
			const tab = SETTINGS_TABS.find((t) => t.id === tabId)
			if (!tab) {
				return null
			}

			return (
				<SectionHeader>
					<div className="flex items-center gap-2">
						<tab.icon className="w-4" />
						<div>{t(tab.headerKey)}</div>
					</div>
				</SectionHeader>
			)
		},
		[t],
	)

	const renderTabItem = useCallback(
		(tab: SettingsTab) => {
			return (
				<TabTrigger key={tab.id} value={tab.id}>
					<Tooltip>
						<TooltipTrigger>
							<div
								className={cn(
									"flex items-center gap-2 px-3 py-2 cursor-pointer opacity-80 hover:opacity-100 border-l-2 border-l-transparent",
									{
										"opacity-100 border-l-2 border-l-foreground border-t-0 border-r-0 border-b-0 bg-selection":
											activeTab === tab.id,
									},
								)}>
								<tab.icon className="w-4 h-4" />
								<span className="hidden sm:block">{t(tab.nameKey)}</span>
							</div>
						</TooltipTrigger>
						<TooltipContent side="right">{t(tab.tooltipKey)}</TooltipContent>
					</Tooltip>
				</TabTrigger>
			)
		},
		[activeTab, t],
	)

	const ActiveContent = useMemo(() => {
		const Component = TAB_CONTENT_MAP[activeTab as keyof typeof TAB_CONTENT_MAP]
		if (!Component) {
			return null
		}

		const props: any = { renderSectionHeader }
		if (activeTab === "debug") {
			props.onResetState = handleResetState
		} else if (activeTab === "about") {
			props.version = version
		} else if (activeTab === "api-config") {
			props.initialModelTab = settingsInitialModelTab
		}

		return <Component {...props} />
	}, [activeTab, handleResetState, settingsInitialModelTab, version, renderSectionHeader])

	return (
		<Tab>
			<ViewHeader environment={environment} onDone={onDone} title={t("settings.title")} />

			<div className="flex flex-1 overflow-hidden">
				<TabList
					className="shrink-0 flex flex-col overflow-y-auto border-r border-sidebar-background"
					onValueChange={setActiveTab}
					value={activeTab}>
					{SETTINGS_TABS.filter((tab) => !tab.hidden?.({ activeOrganization })).map(renderTabItem)}
				</TabList>

				<TabContent className="flex-1 overflow-auto">{ActiveContent}</TabContent>
			</div>
		</Tab>
	)
}

export default SettingsView
