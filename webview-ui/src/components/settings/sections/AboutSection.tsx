import { VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { useTranslation } from "../../../utils/i18n"
import Section from "../Section"

interface AboutSectionProps {
	version: string
	renderSectionHeader: (tabId: string) => JSX.Element | null
}
const AboutSection = ({ version, renderSectionHeader }: AboutSectionProps) => {
	const { t } = useTranslation()
	return (
		<div>
			{renderSectionHeader("about")}
			<Section>
				<div className="flex px-4 flex-col gap-2">
					<h2 className="text-lg font-semibold">{t("about.title", { version })}</h2>
					<p>{t("about.description")}</p>

					<h3 className="text-md font-semibold">{t("about.communitySupport")}</h3>
					<p>
						<VSCodeLink href="https://x.com/cline">{t("about.x")}</VSCodeLink>
						{" • "}
						<VSCodeLink href="https://discord.gg/cline">{t("about.discord")}</VSCodeLink>
						{" • "}
						<VSCodeLink href="https://www.reddit.com/r/cline/">{t("about.reddit")}</VSCodeLink>
					</p>

					<h3 className="text-md font-semibold">{t("about.development")}</h3>
					<p>
						<VSCodeLink href="https://github.com/cline/cline">{t("about.github")}</VSCodeLink>
						{" • "}
						<VSCodeLink href="https://github.com/cline/cline/issues">{t("about.issues")}</VSCodeLink>
						{" • "}
						<VSCodeLink href="https://github.com/cline/cline/discussions/categories/feature-requests?discussions_q=is%3Aopen+category%3A%22Feature+Requests%22+sort%3Atop">
							{t("about.featureRequests")}
						</VSCodeLink>
					</p>

					<h3 className="text-md font-semibold">{t("about.resources")}</h3>
					<p>
						<VSCodeLink href="https://docs.cline.bot/">{t("about.documentation")}</VSCodeLink>
						{" • "}
						<VSCodeLink href="https://cline.bot/">{t("about.website")}</VSCodeLink>
					</p>
				</div>
			</Section>
		</div>
	)
}

export default AboutSection
