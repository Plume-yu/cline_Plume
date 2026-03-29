import { StringRequest } from "@shared/proto/cline/common"
import { Mode } from "@shared/storage/types"
import { VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { useCallback, useEffect, useState } from "react"
import { useInterval } from "react-use"
import UseCustomPromptCheckbox from "@/components/settings/UseCustomPromptCheckbox"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { ModelsServiceClient } from "@/services/grpc-client"
import { useTranslation } from "@/utils/i18n"
import { ApiKeyField } from "../common/ApiKeyField"
import { BaseUrlField } from "../common/BaseUrlField"
import { DebouncedTextField } from "../common/DebouncedTextField"
import OllamaModelPicker from "../OllamaModelPicker"
import { getModeSpecificFields } from "../utils/providerUtils"
import { useApiConfigurationHandlers } from "../utils/useApiConfigurationHandlers"

/**
 * Props for the OllamaProvider component
 */
interface OllamaProviderProps {
	showModelOptions: boolean
	isPopup?: boolean
	currentMode: Mode
}

/**
 * The Ollama provider configuration component
 */
export const OllamaProvider = ({ showModelOptions, currentMode }: OllamaProviderProps) => {
	const { apiConfiguration } = useExtensionState()
	const { t } = useTranslation()
	const { handleFieldChange, handleModeFieldChange } = useApiConfigurationHandlers()

	const { ollamaModelId } = getModeSpecificFields(apiConfiguration, currentMode)

	const [ollamaModels, setOllamaModels] = useState<string[]>([])

	// Poll ollama models
	const requestOllamaModels = useCallback(async () => {
		try {
			const response = await ModelsServiceClient.getOllamaModels(
				StringRequest.create({
					value: apiConfiguration?.ollamaBaseUrl || "",
				}),
			)
			if (response && response.values) {
				setOllamaModels(response.values)
			}
		} catch (error) {
			console.error("Failed to fetch Ollama models:", error)
			setOllamaModels([])
		}
	}, [apiConfiguration?.ollamaBaseUrl])

	useEffect(() => {
		requestOllamaModels()
	}, [requestOllamaModels])

	useInterval(requestOllamaModels, 2000)

	return (
		<div className="flex flex-col gap-2">
			<BaseUrlField
				initialValue={apiConfiguration?.ollamaBaseUrl}
				label={t("ollama.useCustomBaseUrl")}
				onChange={(value) => handleFieldChange("ollamaBaseUrl", value)}
				placeholder={t("ollama.defaultBaseUrl")}
			/>

			{apiConfiguration?.ollamaBaseUrl && (
				<ApiKeyField
					helpText={t("ollama.apiKeyHelpText")}
					initialValue={apiConfiguration?.ollamaApiKey || ""}
					onChange={(value) => handleFieldChange("ollamaApiKey", value)}
					placeholder={t("ollama.apiKeyPlaceholder")}
					providerName="Ollama"
				/>
			)}

			{/* Model selection - use filterable picker */}
			<label htmlFor="ollama-model-selection">
				<span className="font-semibold">{t("ollama.model")}</span>
			</label>
			<OllamaModelPicker
				ollamaModels={ollamaModels}
				onModelChange={(modelId) => {
					handleModeFieldChange({ plan: "planModeOllamaModelId", act: "actModeOllamaModelId" }, modelId, currentMode)
				}}
				placeholder={ollamaModels.length > 0 ? t("ollama.searchModelPlaceholder") : t("ollama.modelExample")}
				selectedModelId={ollamaModelId || ""}
			/>

			{/* Show status message based on model availability */}
			{ollamaModels.length === 0 && <p className="text-sm mt-1 text-description italic">{t("ollama.noModelsFound")}</p>}

			<DebouncedTextField
				initialValue={apiConfiguration?.ollamaApiOptionsCtxNum || "32768"}
				onChange={(v) => handleFieldChange("ollamaApiOptionsCtxNum", v || undefined)}
				placeholder={t("ollama.contextWindowExample")}
				style={{ width: "100%" }}>
				<span className="font-semibold">{t("ollama.modelContextWindow")}</span>
			</DebouncedTextField>

			{showModelOptions && (
				<>
					<DebouncedTextField
						initialValue={apiConfiguration?.requestTimeoutMs ? apiConfiguration.requestTimeoutMs.toString() : "30000"}
						onChange={(value) => {
							// Convert to number, with validation
							const numValue = Number.parseInt(value, 10)
							if (!Number.isNaN(numValue) && numValue > 0) {
								handleFieldChange("requestTimeoutMs", numValue)
							}
						}}
						placeholder={t("ollama.requestTimeoutDefault")}
						style={{ width: "100%" }}>
						<span className="font-semibold">{t("ollama.requestTimeout")}</span>
					</DebouncedTextField>
					<p className="text-xs mt-0 text-description">{t("ollama.requestTimeoutDescription")}</p>
				</>
			)}

			<UseCustomPromptCheckbox providerId="ollama" />

			<p
				style={{
					fontSize: "12px",
					marginTop: "5px",
					color: "var(--vscode-descriptionForeground)",
				}}>
				{t("ollama.description")}{" "}
				<VSCodeLink
					href="https://github.com/ollama/ollama/blob/main/README.md"
					style={{ display: "inline", fontSize: "inherit" }}>
					{t("ollama.quickstartGuide")}.
				</VSCodeLink>{" "}
				<span style={{ color: "var(--vscode-errorForeground)" }}>
					({t("ollama.note")}: {t("ollama.modelRecommendation")})
				</span>
			</p>
		</div>
	)
}
