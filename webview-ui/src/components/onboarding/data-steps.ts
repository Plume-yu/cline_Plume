import i18n from "@/i18n"

export enum NEW_USER_TYPE {
	FREE = "free",
	POWER = "power",
	BYOK = "byok",
}

type UserTypeSelection = {
	titleKey: string
	descriptionKey: string
	type: NEW_USER_TYPE
}

type ButtonAction = "done" | "next" | "signin" | "signup" | "back"
type ButtonVariant = "default" | "secondary"

type StepButton = {
	text: string
	action: ButtonAction
	variant: ButtonVariant
}

type StepConfig = {
	title: string
	description?: string
	buttons: StepButton[]
}

export const getStepConfig = (): Record<string, StepConfig> => ({
	0: {
		title: i18n.t("onboarding.howWillYouUse"),
		description: i18n.t("onboarding.selectOptionToStart"),
		buttons: [
			{ text: i18n.t("common.continue"), action: "next" as ButtonAction, variant: "default" as ButtonVariant },
			{ text: i18n.t("onboarding.loginToCline"), action: "signin" as ButtonAction, variant: "secondary" as ButtonVariant },
		],
	},
	[NEW_USER_TYPE.FREE]: {
		title: i18n.t("onboarding.selectFreeModel"),
		buttons: [
			{ text: i18n.t("onboarding.createAccount"), action: "signup" as ButtonAction, variant: "default" as ButtonVariant },
			{ text: i18n.t("common.back"), action: "back" as ButtonAction, variant: "secondary" as ButtonVariant },
		],
	},
	[NEW_USER_TYPE.POWER]: {
		title: i18n.t("onboarding.selectModel"),
		buttons: [
			{ text: i18n.t("onboarding.createAccount"), action: "signup" as ButtonAction, variant: "default" as ButtonVariant },
			{ text: i18n.t("common.back"), action: "back" as ButtonAction, variant: "secondary" as ButtonVariant },
		],
	},
	[NEW_USER_TYPE.BYOK]: {
		title: i18n.t("onboarding.configureProvider"),
		buttons: [
			{ text: i18n.t("common.continue"), action: "done" as ButtonAction, variant: "default" as ButtonVariant },
			{ text: i18n.t("common.back"), action: "back" as ButtonAction, variant: "secondary" as ButtonVariant },
		],
	},
	2: {
		title: i18n.t("onboarding.almostThere"),
		description: i18n.t("onboarding.completeAccountCreation"),
		buttons: [{ text: i18n.t("common.back"), action: "back" as ButtonAction, variant: "secondary" as ButtonVariant }],
	},
})

export const USER_TYPE_SELECTIONS: UserTypeSelection[] = [
	{ titleKey: "onboarding.absolutelyFree", descriptionKey: "onboarding.getStartedNoCost", type: NEW_USER_TYPE.FREE },
	{ titleKey: "onboarding.frontierModel", descriptionKey: "onboarding.frontierModelDesc", type: NEW_USER_TYPE.POWER },
	{ titleKey: "onboarding.bringOwnKey", descriptionKey: "onboarding.bringOwnKeyDesc", type: NEW_USER_TYPE.BYOK },
]
