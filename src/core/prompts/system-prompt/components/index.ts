import { SystemPromptSection } from "../templates/placeholders"
import { getActVsPlanModeSection } from "./act_vs_plan_mode"
import { getAgentRoleSection } from "./agent_role"
import { getAgentRoleSectionZhCn } from "./agent_role.zh-cn"
import { getCapabilitiesSection } from "./capabilities"
import { getCapabilitiesSectionZhCn } from "./capabilities.zh-cn"
import { getChineseProgrammingBestPracticesSection } from "./chinese_programming_best_practices"
import { getChineseEnglishGlossarySection } from "./chinese_english_glossary"
import { getChineseProgrammingScenarioRecognitionSection } from "./chinese_programming_scenario_recognition"
import { getChineseRequirementAnalysisTemplateSection } from "./chinese_requirement_analysis_template"
import { getChineseCodeGenerationGuidanceSection } from "./chinese_code_generation_guidance"
import { getChineseInteractiveProgrammingSection } from "./chinese_interactive_programming"
import { getChineseCodeQualityAssessmentSection } from "./chinese_code_quality_assessment"
import { getChineseDocumentDrivenDevelopmentSection } from "./chinese_document_driven_development"
import { getChineseLanguageEnforcementSection } from "./chinese_language_enforcement"
import { getChineseNaturalLanguageInteractionSection } from "./chinese_natural_language_interaction"
import { getChineseIntentRecognitionSection } from "./chinese_intent_recognition"
import { getEditingFilesSection } from "./editing_files"
import { getEditingFilesSectionZhCn } from "./editing_files.zh-cn"
import { getFeedbackSection } from "./feedback"
import { getMcp } from "./mcp"
import { getObjectiveSection } from "./objective"
import { getObjectiveSectionZhCn } from "./objective.zh-cn"
import { getRulesSection } from "./rules"
import { getRulesSectionZhCn } from "./rules.zh-cn"
import { getSkillsSection } from "./skills"
import { getSystemInfo } from "./system_info"
import { getUpdatingTaskProgress } from "./task_progress"
import { getToolUseSection } from "./tool_use"
import { getToolUseGuidelinesSectionZhCn } from "./tool_use/guidelines.zh-cn"
import { getUserInstructions } from "./user_instructions"
import type { ComponentFunction, PromptVariant, SystemPromptContext } from "../types"

function isChineseLanguage(context: SystemPromptContext): boolean {
	const lang = context.preferredLanguageInstructions?.toLowerCase() || ""
	return lang.includes("zh") || lang.includes("chinese") || lang.includes("中文")
}

export function getSystemPromptComponents() {
	return [
		{ 
			id: SystemPromptSection.AGENT_ROLE, 
			fn: ((variant: PromptVariant, context: SystemPromptContext) => isChineseLanguage(context) ? getAgentRoleSectionZhCn(variant, context) : getAgentRoleSection(variant, context)) as ComponentFunction 
		},
		{ id: SystemPromptSection.SYSTEM_INFO, fn: getSystemInfo },
		{ id: SystemPromptSection.MCP, fn: getMcp },
		{
			id: SystemPromptSection.USER_INSTRUCTIONS,
			fn: getUserInstructions,
		},
		{ 
			id: SystemPromptSection.TOOL_USE, 
			fn: ((variant: PromptVariant, context: SystemPromptContext) => isChineseLanguage(context) ? getToolUseGuidelinesSectionZhCn(variant, context) : getToolUseSection(variant, context)) as ComponentFunction 
		},
		{
			id: SystemPromptSection.EDITING_FILES,
			fn: ((variant: PromptVariant, context: SystemPromptContext) => isChineseLanguage(context) ? getEditingFilesSectionZhCn(variant, context) : getEditingFilesSection(variant, context)) as ComponentFunction,
		},
		{
			id: SystemPromptSection.CAPABILITIES,
			fn: ((variant: PromptVariant, context: SystemPromptContext) => isChineseLanguage(context) ? getCapabilitiesSectionZhCn(variant, context) : getCapabilitiesSection(variant, context)) as ComponentFunction,
		},
		{ id: SystemPromptSection.SKILLS, fn: getSkillsSection },
		{ 
			id: SystemPromptSection.RULES, 
			fn: ((variant: PromptVariant, context: SystemPromptContext) => isChineseLanguage(context) ? getRulesSectionZhCn(variant, context) : getRulesSection(variant, context)) as ComponentFunction 
		},
		{ 
			id: SystemPromptSection.OBJECTIVE, 
			fn: ((variant: PromptVariant, context: SystemPromptContext) => isChineseLanguage(context) ? getObjectiveSectionZhCn(variant, context) : getObjectiveSection(variant, context)) as ComponentFunction 
		},
		{
			id: SystemPromptSection.ACT_VS_PLAN,
			fn: getActVsPlanModeSection,
		},
		{
			id: SystemPromptSection.FEEDBACK,
			fn: getFeedbackSection,
		},
		{ id: SystemPromptSection.TASK_PROGRESS, fn: getUpdatingTaskProgress },
		{
			id: "CHINESE_PROGRAMMING_BEST_PRACTICES",
			fn: ((variant: PromptVariant, context: SystemPromptContext) => isChineseLanguage(context) ? getChineseProgrammingBestPracticesSection(variant, context) : Promise.resolve("")) as ComponentFunction,
		},
		{
			id: "CHINESE_ENGLISH_GLOSSARY",
			fn: ((variant: PromptVariant, context: SystemPromptContext) => isChineseLanguage(context) ? getChineseEnglishGlossarySection(variant, context) : Promise.resolve("")) as ComponentFunction,
		},
		{
			id: "CHINESE_PROGRAMMING_SCENARIO_RECOGNITION",
			fn: ((variant: PromptVariant, context: SystemPromptContext) => isChineseLanguage(context) ? getChineseProgrammingScenarioRecognitionSection(variant, context) : Promise.resolve("")) as ComponentFunction,
		},
		{
			id: "CHINESE_REQUIREMENT_ANALYSIS_TEMPLATE",
			fn: ((variant: PromptVariant, context: SystemPromptContext) => isChineseLanguage(context) ? getChineseRequirementAnalysisTemplateSection(variant, context) : Promise.resolve("")) as ComponentFunction,
		},
		{
			id: "CHINESE_CODE_GENERATION_GUIDANCE",
			fn: ((variant: PromptVariant, context: SystemPromptContext) => isChineseLanguage(context) ? getChineseCodeGenerationGuidanceSection(variant, context) : Promise.resolve("")) as ComponentFunction,
		},
		{
			id: "CHINESE_INTERACTIVE_PROGRAMMING",
			fn: ((variant: PromptVariant, context: SystemPromptContext) => isChineseLanguage(context) ? getChineseInteractiveProgrammingSection(variant, context) : Promise.resolve("")) as ComponentFunction,
		},
		{
			id: "CHINESE_CODE_QUALITY_ASSESSMENT",
			fn: ((variant: PromptVariant, context: SystemPromptContext) => isChineseLanguage(context) ? getChineseCodeQualityAssessmentSection(variant, context) : Promise.resolve("")) as ComponentFunction,
		},
		{
			id: "CHINESE_DOCUMENT_DRIVEN_DEVELOPMENT",
			fn: ((variant: PromptVariant, context: SystemPromptContext) => isChineseLanguage(context) ? getChineseDocumentDrivenDevelopmentSection(variant, context) : Promise.resolve("")) as ComponentFunction,
		},
		{
			id: "CHINESE_LANGUAGE_ENFORCEMENT",
			fn: ((variant: PromptVariant, context: SystemPromptContext) => isChineseLanguage(context) ? getChineseLanguageEnforcementSection(variant, context) : Promise.resolve("")) as ComponentFunction,
		},
		{
			id: "CHINESE_NATURAL_LANGUAGE_INTERACTION",
			fn: ((variant: PromptVariant, context: SystemPromptContext) => isChineseLanguage(context) ? getChineseNaturalLanguageInteractionSection(variant, context) : Promise.resolve("")) as ComponentFunction,
		},
		{
			id: "CHINESE_INTENT_RECOGNITION",
			fn: ((variant: PromptVariant, context: SystemPromptContext) => isChineseLanguage(context) ? getChineseIntentRecognitionSection(variant, context) : Promise.resolve("")) as ComponentFunction,
		},
	]
}