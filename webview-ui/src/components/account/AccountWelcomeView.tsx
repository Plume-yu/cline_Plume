import { VSCodeButton, VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { useClineSignIn } from "@/context/ClineAuthContext"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { useTranslation } from "@/utils/i18n"
import ClineLogoVariable from "../../assets/ClineLogoVariable"

// export const AccountWelcomeView = () => (
// 	<div className="flex flex-col items-center pr-3 gap-2.5">
// 		<ClineLogoWhite className="size-16 mb-4" />
export const AccountWelcomeView = () => {
	const { environment } = useExtensionState()
	const { isLoginLoading, handleSignIn } = useClineSignIn()
	const { t } = useTranslation()

	return (
		<div className="flex flex-col items-center gap-2.5">
			<ClineLogoVariable className="size-16 mb-4" environment={environment} />

			<p>{t("account.welcome.description")}</p>

			<VSCodeButton className="w-full mb-4" disabled={isLoginLoading} onClick={handleSignIn}>
				{t("account.welcome.signUp")}
				{isLoginLoading && (
					<span className="ml-1 animate-spin">
						<span className="codicon codicon-refresh" />
					</span>
				)}
			</VSCodeButton>

			<p className="text-(--vscode-descriptionForeground) text-xs text-center m-0">
				{t("account.welcome.termsAgreement")}{" "}
				<VSCodeLink href="https://cline.bot/tos">{t("account.welcome.termsOfService")}</VSCodeLink> 和
				<VSCodeLink href="https://cline.bot/privacy">{t("account.welcome.privacyPolicy")}</VSCodeLink>
			</p>
		</div>
	)
}
