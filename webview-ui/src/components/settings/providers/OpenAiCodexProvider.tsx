import { openAiCodexModels } from "@shared/api"
import { Mode } from "@shared/storage/types"
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { AccountServiceClient } from "@/services/grpc-client"
import { useTranslation } from "@/utils/i18n"
import { ModelInfoView } from "../common/ModelInfoView"
import { ModelSelector } from "../common/ModelSelector"
import ReasoningEffortSelector from "../ReasoningEffortSelector"
import { normalizeApiConfiguration, supportsReasoningEffortForModelId } from "../utils/providerUtils"
import { useApiConfigurationHandlers } from "../utils/useApiConfigurationHandlers"

interface OpenAiCodexProviderProps {
	showModelOptions: boolean
	isPopup?: boolean
	currentMode: Mode
}

/**
 * OpenAI Codex (ChatGPT Plus/Pro) provider configuration component.
 * Uses OAuth authentication instead of API keys.
 */
export const OpenAiCodexProvider = ({ showModelOptions, isPopup, currentMode }: OpenAiCodexProviderProps) => {
	const { apiConfiguration, openAiCodexIsAuthenticated } = useExtensionState()
	const { handleModeFieldChange } = useApiConfigurationHandlers()
	const { t } = useTranslation()

	const { selectedModelId, selectedModelInfo } = normalizeApiConfiguration(apiConfiguration, currentMode)
	const showReasoningEffort = supportsReasoningEffortForModelId(selectedModelId, true)

	const handleSignIn = async () => {
		try {
			await AccountServiceClient.openAiCodexSignIn({})
		} catch (error) {
			console.error("Failed to sign in to OpenAI Codex:", error)
		}
	}

	const handleSignOut = async () => {
		try {
			await AccountServiceClient.openAiCodexSignOut({})
		} catch (error) {
			console.error("Failed to sign out of OpenAI Codex:", error)
		}
	}

	return (
		<div>
			<div style={{ marginBottom: "15px" }}>
				{openAiCodexIsAuthenticated ? (
					<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
						<span style={{ color: "var(--vscode-descriptionForeground)" }}>{t("openai.codex.signedIn")}</span>
						<VSCodeButton appearance="secondary" onClick={handleSignOut}>
							{t("openai.codex.signOut")}
						</VSCodeButton>
					</div>
				) : (
					<div>
						<p
							style={{
								fontSize: "12px",
								color: "var(--vscode-descriptionForeground)",
								marginBottom: "10px",
							}}>
							{t("openai.codex.signInDescription")}
						</p>
						<VSCodeButton onClick={handleSignIn}>{t("openai.codex.signInButton")}</VSCodeButton>
					</div>
				)}
			</div>

			{showModelOptions && (
				<>
					<ModelSelector
						label="Model"
						models={openAiCodexModels}
						onChange={(e: any) =>
							handleModeFieldChange(
								{ plan: "planModeApiModelId", act: "actModeApiModelId" },
								e.target.value,
								currentMode,
							)
						}
						selectedModelId={selectedModelId}
					/>
					{showReasoningEffort && <ReasoningEffortSelector currentMode={currentMode} />}

					<ModelInfoView isPopup={isPopup} modelInfo={selectedModelInfo} selectedModelId={selectedModelId} />
				</>
			)}
		</div>
	)
}
