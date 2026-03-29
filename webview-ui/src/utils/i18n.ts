import { useExtensionState } from "@/context/ExtensionStateContext"

// 定义支持的语言类型
export type SupportedLanguage = "English" | "Simplified Chinese - 简体中文" | "Traditional Chinese - 繁體中文"

// 定义翻译键类型
export type TranslationKey =
	| "welcome.title"
	| "welcome.description"
	| "welcome.getStarted"
	| "welcome.useApiKey"
	| "welcome.letsGo"
	| "welcome.signUpDescription"
	| "account.welcome.description"
	| "account.welcome.signUp"
	| "account.welcome.termsAgreement"
	| "account.welcome.termsOfService"
	| "account.welcome.privacyPolicy"
	| "openai.codex.signInDescription"
	| "openai.codex.signInButton"
	| "openai.codex.signedIn"
	| "openai.codex.signOut"
	| "oca.signIn"
	| "oca.signInAgain"
	| "oca.oracleEmployee"
	| "oca.signInDescription"
	| "oca.signedIn"
	| "oca.unknownUser"
	| "oca.logOut"
	| "oca.customBaseUrl"
	| "oca.failedToRefresh"
	| "oca.retry"
	| "oca.ideaForOca"
	| "oca.provideFeedback"
	| "oca.quickstartGuide"
	| "cline.account.signUp"
	| "cline.account.viewBilling"
	| "preferredLanguage.label"
	| "preferredLanguage.description"
	| "settings.title"
	| "settings.apiConfig.name"
	| "settings.apiConfig.tooltip"
	| "settings.apiConfig.header"
	| "settings.features.name"
	| "settings.features.tooltip"
	| "settings.features.header"
	| "settings.browser.name"
	| "settings.browser.tooltip"
	| "settings.browser.header"
	| "settings.terminal.name"
	| "settings.terminal.tooltip"
	| "settings.terminal.header"
	| "settings.general.name"
	| "settings.general.tooltip"
	| "settings.general.header"
	| "settings.remoteConfig.name"
	| "settings.remoteConfig.tooltip"
	| "settings.remoteConfig.header"
	| "settings.about.name"
	| "settings.about.tooltip"
	| "settings.about.header"
	| "settings.debug.name"
	| "settings.debug.tooltip"
	| "settings.debug.header"
	| "general.telemetry.label"
	| "general.telemetry.description"
	| "general.telemetry.remoteConfig"
	| "general.telemetry.telemetryOverview"
	| "general.telemetry.privacyPolicy"
	| "worktrees.retry"
	| "remoteConfig.refresh"
	| "remoteConfig.retryIn"
	| "ollama.quickstartGuide"
	| "ollama.useCustomBaseUrl"
	| "ollama.defaultBaseUrl"
	| "ollama.apiKeyHelpText"
	| "ollama.apiKeyPlaceholder"
	| "ollama.model"
	| "ollama.searchModelPlaceholder"
	| "ollama.modelExample"
	| "ollama.noModelsFound"
	| "ollama.modelContextWindow"
	| "ollama.contextWindowExample"
	| "ollama.requestTimeout"
	| "ollama.requestTimeoutDefault"
	| "ollama.requestTimeoutDescription"
	| "ollama.description"
	| "ollama.note"
	| "ollama.modelRecommendation"
	| "sapAiCore.retry"
	| "liteLlm.quickstartGuide"
	| "lmStudio.quickstartGuide"
	| "mcp.retryConnection"
	| "mcp.retrying"
	| "mcpMarketplace.retry"
	| "chat.placeholder.task"
	| "chat.placeholder.message"
	| "chat.shellIntegrationUnavailable"
	| "chat.shellIntegrationWarning"
	| "chat.stillHavingTrouble"
	| "chat.shellIntegrationIssues"
	| "chat.shellIntegrationRecommendation"
	| "chat.backgroundTerminalEnabled"
	| "chat.enableBackgroundTerminal"
	| "navbar.chat"
	| "navbar.newTask"
	| "navbar.mcp"
	| "navbar.mcpServers"
	| "navbar.history"
	| "navbar.account"
	| "navbar.settings"
	| "history.title"
	| "history.searchPlaceholder"
	| "history.today"
	| "history.older"
	| "history.selectAll"
	| "history.selectNone"
	| "history.deleteSelected"
	| "history.deleteAll"
	| "mcp.title"
	| "mcp.marketplace"
	| "mcp.remoteServers"
	| "mcp.configure"
	| "account.title"
	| "account.personal"
	| "account.remoteConfigLocked"
	| "account.role"
	| "account.dashboard"
	| "account.logOut"
	| "account.environment"
	| "apiConfig.planMode"
	| "apiConfig.actMode"
	| "apiConfig.useDifferentModels"
	| "apiConfig.useDifferentModelsDescription"
	| "apiConfig.apiProvider"
	| "apiConfig.searchProviderPlaceholder"
	| "apiConfig.remoteConfiguredProvidersTooltip"
	| "features.agent"
	| "features.editor"
	| "features.experimental"
	| "features.advanced"
	| "features.subagents"
	| "features.subagentsDescription"
	| "features.nativeToolCall"
	| "features.nativeToolCallDescription"
	| "features.parallelToolCalling"
	| "features.parallelToolCallingDescription"
	| "features.strictPlanMode"
	| "features.strictPlanModeDescription"
	| "features.autoCompact"
	| "features.autoCompactDescription"
	| "features.focusChain"
	| "features.focusChainDescription"
	| "features.reminderInterval"
	| "features.featureTips"
	| "features.featureTipsDescription"
	| "features.backgroundEdit"
	| "features.backgroundEditDescription"
	| "features.checkpoints"
	| "features.checkpointsDescription"
	| "features.clineWebTools"
	| "features.clineWebToolsDescription"
	| "features.worktrees"
	| "features.worktreesDescription"
	| "features.yoloMode"
	| "features.yoloModeDescription"
	| "features.doubleCheckCompletion"
	| "features.doubleCheckCompletionDescription"
	| "features.hooks"
	| "features.hooksDescription"
	| "features.mcpDisplayMode"
	| "features.mcpDisplayModeDescription"
	| "features.plainText"
	| "features.richDisplay"
	| "features.markdown"
	| "features.remoteConfigLocked"
	| "features.remoteConfigTooltip"
	| "browser.disableToolUse"
	| "browser.disableToolUseDescription"
	| "browser.viewportSize"
	| "browser.viewportSizeDescription"
	| "browser.useRemoteBrowser"
	| "browser.useRemoteBrowserDescription"
	| "browser.isBundledDescription"
	| "browser.detectedChromePathDescription"
	| "browser.remoteEnabledDescription"
	| "browser.remoteBrowserHostPlaceholder"
	| "browser.launchBrowserWithDebugMode"
	| "browser.launchingBrowser"
	| "browser.chromeExecutablePath"
	| "browser.chromeExecutablePathPlaceholder"
	| "browser.chromeExecutablePathDescription"
	| "browser.customBrowserArguments"
	| "browser.customBrowserArgumentsPlaceholder"
	| "browser.customBrowserArgumentsDescription"
	| "browser.checkingConnection"
	| "browser.connected"
	| "browser.notConnected"
	| "terminal.defaultProfile"
	| "terminal.defaultProfileDescription"
	| "terminal.shellIntegrationTimeout"
	| "terminal.shellIntegrationTimeoutPlaceholder"
	| "terminal.shellIntegrationTimeoutDescription"
	| "terminal.enableAggressiveReuse"
	| "terminal.enableAggressiveReuseDescription"
	| "terminal.executionMode"
	| "terminal.executionModeVscode"
	| "terminal.executionModeBackground"
	| "terminal.executionModeDescription"
	| "terminal.terminalOutputLineLimit"
	| "terminal.terminalOutputLineLimitDescription"
	| "terminal.issues"
	| "terminal.quickFixes"
	| "terminal.troubleshootingGuide"
	| "terminal.error.positiveNumber"
	| "about.title"
	| "about.description"
	| "about.communitySupport"
	| "about.development"
	| "about.resources"
	| "about.x"
	| "about.discord"
	| "about.reddit"
	| "about.github"
	| "about.issues"
	| "about.featureRequests"
	| "about.documentation"
	| "about.website"
	| "modelInfo.advanced"
	| "modelInfo.images"
	| "modelInfo.browser"
	| "modelInfo.promptCaching"
	| "modelInfo.cacheReads"
	| "modelInfo.cacheWrites"
	| "modelInfo.tieredPricing"
	| "modelInfo.input"
	| "modelInfo.output"
	| "modelInfo.providerRouting"
	| "modelInfo.default"
	| "modelInfo.price"
	| "modelInfo.throughput"
	| "modelInfo.latency"
	| "modelInfo.defaultDescription"
	| "modelInfo.priceDescription"
	| "modelInfo.throughputDescription"
	| "modelInfo.latencyDescription"
	| "modelInfo.yes"
	| "modelInfo.no"
	| "hook.edit"
	| "hook.delete"
	| "hook.windowsToggleNotSupported"
	| "rule.view"
	| "rule.viewReadOnly"
	| "rule.edit"
	| "rule.delete"
	| "rule.required"
	| "rule.agentsTooltip"
	| "chat.error"
	| "chat.havingTrouble"
	| "chat.executeCommand"
	| "chat.useMcpTool"
	| "chat.accessMcpResource"
	| "chat.onMcpServer"
	| "chat.taskCompleted"
	| "chat.hasQuestion"
	| "chat.creatingPatches"
	| "chat.editFile"
	| "chat.deleteFile"
	| "chat.createFile"
	| "chat.readFile"
	| "chat.viewTopLevelFiles"
	| "chat.viewedTopLevelFiles"
	| "chat.viewAllFiles"
	| "chat.viewedAllFiles"
	| "chat.viewCodeDefinitions"
	| "chat.viewedCodeDefinitions"
	| "chat.searchDirectory"
	| "chat.condensingConversation"
	| "chat.fetchUrl"
	| "chat.fetchedUrl"
	| "chat.searchWeb"
	| "chat.searchedWeb"
	| "chat.loadedSkill"
	| "chat.mcpNotification"
	| "chat.thinking"
	| "chat.thinkingEllipsis"
	| "chat.loadingMcpDocumentation"
	| "chat.generatingExplanation"
	| "chat.failedToGenerateExplanation"
	| "chat.explanationCancelled"
	| "chat.generatedExplanation"
	| "chat.autoRetryFailed"
	| "chat.autoRetryInProgress"
	| "chat.autoRetryFailedMessage"
	| "chat.autoRetryProgressMessage"
	| "chat.startNewTask"
	| "chat.condenseConversation"
	| "chat.createGithubIssue"
	| "chat.conditionalRulesApplied"
	| "chat.fileOutsideWorkspace"
	| "chat.directoryOutsideWorkspace"
	| "chat.urlExternal"
	| "chat.searchExternal"

// 翻译映射
const translations: Record<SupportedLanguage, Record<TranslationKey, string>> = {
	English: {
		"welcome.title": "Hi, I'm Cline",
		"welcome.description":
			"I can do all kinds of tasks thanks to breakthroughs in Claude 4.6 Sonnet's agentic coding capabilities and access to tools that let me create & edit files, explore complex projects, use a browser, and execute terminal commands (with your permission, of course). I can even use MCP to create new tools and extend my own capabilities.",
		"welcome.getStarted": "Get Started for Free",
		"welcome.useApiKey": "Use your own API key",
		"welcome.letsGo": "Let's go!",
		"welcome.signUpDescription":
			"Sign up for an account to get started for free, or use an API key that provides access to models like Claude Sonnet.",
		"account.welcome.description":
			"Sign up for an account to get access to the latest models, billing dashboard to view usage and credits, and more upcoming features.",
		"account.welcome.signUp": "Sign up with Cline",
		"account.welcome.termsAgreement": "By continuing, you agree to the",
		"account.welcome.termsOfService": "Terms of Service",
		"account.welcome.privacyPolicy": "Privacy Policy",
		"openai.codex.signInDescription":
			"Sign in with your ChatGPT Plus or Pro subscription to use GPT-5 models without an API key.",
		"openai.codex.signInButton": "Sign in to OpenAI Codex",
		"openai.codex.signedIn": "Signed in to OpenAI Codex",
		"openai.codex.signOut": "Sign Out",
		"oca.signIn": "Sign in with Oracle Code Assist",
		"oca.signInAgain": "Sign in again",
		"oca.oracleEmployee": "I'm an Oracle Employee",
		"oca.signInDescription":
			"Please ask your IT administrator to set up Oracle Code Assist as a model provider. Oracle Employees, please see the",
		"oca.signedIn": "Signed in",
		"oca.unknownUser": "Unknown User",
		"oca.logOut": "Log out",
		"oca.customBaseUrl": "Custom Base URL (optional)",
		"oca.failedToRefresh": "Failed to refresh models. Check your session or network.",
		"oca.retry": "Retry",
		"oca.ideaForOca": "Have an idea for Oracle Code Assist?",
		"oca.provideFeedback": "Provide feedback",
		"oca.quickstartGuide": "quickstart guide",
		"cline.account.signUp": "Sign Up with Cline",
		"cline.account.viewBilling": "View Billing & Usage",
		"preferredLanguage.label": "Preferred Language",
		"preferredLanguage.description": "The language that Cline should use for communication.",
		"settings.title": "Settings",
		"settings.apiConfig.name": "API Configuration",
		"settings.apiConfig.tooltip": "API Configuration",
		"settings.apiConfig.header": "API Configuration",
		"settings.features.name": "Features",
		"settings.features.tooltip": "Feature Settings",
		"settings.features.header": "Feature Settings",
		"settings.browser.name": "Browser",
		"settings.browser.tooltip": "Browser Settings",
		"settings.browser.header": "Browser Settings",
		"settings.terminal.name": "Terminal",
		"settings.terminal.tooltip": "Terminal Settings",
		"settings.terminal.header": "Terminal Settings",
		"features.agent": "Agent",
		"features.editor": "Editor",
		"features.experimental": "Experimental",
		"features.advanced": "Advanced",
		"features.subagents": "Subagents",
		"features.subagentsDescription": "Let Cline run focused subagents in parallel to explore the codebase for you.",
		"features.nativeToolCall": "Native Tool Call",
		"features.nativeToolCallDescription": "Use native function calling when available",
		"features.parallelToolCalling": "Parallel Tool Calling",
		"features.parallelToolCallingDescription": "Execute multiple tool calls simultaneously",
		"features.strictPlanMode": "Strict Plan Mode",
		"features.strictPlanModeDescription": "Prevents file edits while in Plan mode",
		"features.autoCompact": "Auto Compact",
		"features.autoCompactDescription": "Automatically compress conversation history.",
		"features.focusChain": "Focus Chain",
		"features.focusChainDescription": "Maintain context focus across interactions",
		"features.reminderInterval": "Reminder Interval (1-10)",
		"features.featureTips": "Feature Tips",
		"features.featureTipsDescription": "Show rotating tips during the thinking phase to help you discover Cline features.",
		"features.backgroundEdit": "Background Edit",
		"features.backgroundEditDescription": "Allow edits without stealing editor focus",
		"features.checkpoints": "Checkpoints",
		"features.checkpointsDescription": "Save progress at key points for easy rollback",
		"features.clineWebTools": "Cline Web Tools",
		"features.clineWebToolsDescription": "Access web browsing and search capabilities",
		"features.worktrees": "Worktrees",
		"features.worktreesDescription": "Enables git worktree management for running parallel Cline tasks.",
		"features.yoloMode": "Yolo Mode",
		"features.yoloModeDescription":
			"Execute tasks without user's confirmation. Auto-switches from Plan to Act mode and disables the ask question tool. Use with extreme caution.",
		"features.doubleCheckCompletion": "Double-Check Completion",
		"features.doubleCheckCompletionDescription":
			"Rejects the first completion attempt and asks the model to re-verify its work against the original task requirements before accepting.",
		"features.hooks": "Hooks",
		"features.hooksDescription": "Enable lifecycle and tool hooks during task execution.",
		"features.mcpDisplayMode": "MCP Display Mode",
		"features.mcpDisplayModeDescription": "Controls how MCP responses are displayed",
		"features.plainText": "Plain Text",
		"features.richDisplay": "Rich Display",
		"features.markdown": "Markdown",
		"features.remoteConfigTooltip": "This setting is managed by your organization's remote configuration",
		"ollama.useCustomBaseUrl": "Use custom base URL",
		"ollama.defaultBaseUrl": "Default: http://localhost:11434",
		"ollama.apiKeyHelpText":
			"Optional API key for authenticated Ollama instances or cloud services. Leave empty for local installations.",
		"ollama.apiKeyPlaceholder": "Enter API Key (optional)...",
		"ollama.model": "Model",
		"ollama.searchModelPlaceholder": "Search and select a model...",
		"ollama.modelExample": "e.g. llama3.1",
		"ollama.noModelsFound":
			"Unable to fetch models from Ollama server. Please ensure Ollama is running and accessible, or enter the model ID manually above.",
		"ollama.modelContextWindow": "Model Context Window",
		"ollama.contextWindowExample": "e.g. 32768",
		"ollama.requestTimeout": "Request Timeout (ms)",
		"ollama.requestTimeoutDefault": "Default: 30000 (30 seconds)",
		"ollama.requestTimeoutDescription": "Maximum time in milliseconds to wait for API responses before timing out.",
		"ollama.description":
			"Ollama allows you to run models locally on your computer. For instructions on how to get started, see their",
		"ollama.note": "Note",
		"ollama.modelRecommendation":
			"Cline uses complex prompts and works best with Claude models. Less capable models may not work as expected.",
		"chat.shellIntegrationUnavailable": "Shell Integration Unavailable",
		"chat.shellIntegrationWarning":
			'Cline may have trouble viewing the command\'s output. Please update VSCode (CMD/CTRL + Shift + P "Update") and make sure you\'re using a supported shell: zsh, bash, fish, or PowerShell (CMD/CTRL + Shift + P "Terminal: Select Default Profile").',
		"chat.stillHavingTrouble": "Still having trouble?",
		"chat.shellIntegrationIssues": "Shell integration issues",
		"chat.shellIntegrationRecommendation":
			"Since you're experiencing repeated shell integration issues, we recommend switching to Background Terminal mode for better reliability.",
		"chat.backgroundTerminalEnabled": "Background Terminal Enabled",
		"chat.enableBackgroundTerminal": "Enable Background Terminal (Recommended)",
		"settings.general.name": "General",
		"settings.general.tooltip": "General Settings",
		"settings.general.header": "General Settings",
		"settings.remoteConfig.name": "Remote Config",
		"settings.remoteConfig.tooltip": "Remotely configured fields",
		"settings.remoteConfig.header": "Remote Config",
		"settings.about.name": "About",
		"settings.about.tooltip": "About Cline",
		"settings.about.header": "About",
		"settings.debug.name": "Debug",
		"settings.debug.tooltip": "Debug Tools",
		"settings.debug.header": "Debug",
		"general.telemetry.label": "Allow error and usage reporting",
		"general.telemetry.description":
			"Help improve Cline by sending usage data and error reports. No code, prompts, or personal information are ever sent. See our telemetry overview and privacy policy for more details.",
		"general.telemetry.remoteConfig": "This setting is managed by your organization's remote configuration",
		"general.telemetry.telemetryOverview": "telemetry overview",
		"general.telemetry.privacyPolicy": "privacy policy",
		"worktrees.retry": "Retry",
		"remoteConfig.refresh": "Refresh",
		"remoteConfig.retryIn": "(Retry in: {seconds} seconds)",
		"ollama.quickstartGuide": "quickstart guide",
		"sapAiCore.retry": "Retry",
		"liteLlm.quickstartGuide": "quickstart guide",
		"lmStudio.quickstartGuide": "quickstart guide",
		"mcp.retryConnection": "Retry Connection",
		"mcp.retrying": "Retrying...",
		"mcpMarketplace.retry": "Retry",
		"chat.placeholder.task": "Type your task here...",
		"chat.placeholder.message": "Type a message...",
		"navbar.chat": "Chat",
		"navbar.newTask": "New Task",
		"navbar.mcp": "MCP",
		"navbar.mcpServers": "MCP Servers",
		"navbar.history": "History",
		"navbar.account": "Account",
		"navbar.settings": "Settings",
		"history.title": "History",
		"history.searchPlaceholder": "Fuzzy search history...",
		"history.today": "Today",
		"history.older": "Older",
		"history.selectAll": "Select All",
		"history.selectNone": "Select None",
		"history.deleteSelected": "Delete {count} Selected",
		"history.deleteAll": "Delete All History",
		"mcp.title": "MCP Servers",
		"mcp.marketplace": "Marketplace",
		"mcp.remoteServers": "Remote Servers",
		"mcp.configure": "Configure",
		"account.title": "Account",
		"account.personal": "Personal",
		"account.remoteConfigLocked": "This cannot be changed while your organization has remote configuration enabled.",
		"account.role": "Role",
		"account.dashboard": "Dashboard",
		"account.logOut": "Log out",
		"account.environment": "Cline Environment",
		"apiConfig.planMode": "Plan Mode",
		"apiConfig.actMode": "Act Mode",
		"apiConfig.useDifferentModels": "Use different models for Plan and Act modes",
		"apiConfig.useDifferentModelsDescription":
			"Switching between Plan and Act mode will persist the API and model used in the previous mode. This may be helpful e.g. when using a strong reasoning model to architect a plan for a cheaper coding model to act on.",
		"apiConfig.apiProvider": "API Provider",
		"apiConfig.searchProviderPlaceholder": "Search and select provider...",
		"apiConfig.remoteConfiguredProvidersTooltip": "Provider options are managed by your organization's remote configuration",
		"features.remoteConfigLocked": "This setting is managed by your organization's remote configuration",
		"browser.disableToolUse": "Disable browser tool usage",
		"browser.disableToolUseDescription": "Prevent Cline from using browser actions (e.g. launch, click, type).",
		"browser.viewportSize": "Viewport size",
		"browser.viewportSizeDescription": "Set the size of the browser viewport for screenshots and interactions.",
		"browser.useRemoteBrowser": "Use remote browser connection",
		"browser.useRemoteBrowserDescription":
			"Enable Cline to use your Chrome{isBundled}{detectedChromePath}. You can specify a custom path below. Using a remote browser connection requires starting Chrome{remoteEnabledDescription}.",
		"browser.isBundledDescription": "(not detected on your machine)",
		"browser.detectedChromePathDescription": " ({detectedPath})",
		"browser.remoteEnabledDescription":
			" manually (<code>--remote-debugging-port=9222</code>) or using the button below. Enter the host address or leave it blank for automatic discovery.",
		"browser.remoteBrowserHostPlaceholder": "http://localhost:9222",
		"browser.launchBrowserWithDebugMode": "Launch Browser with Debug Mode",
		"browser.launchingBrowser": "Launching Browser...",
		"browser.chromeExecutablePath": "Chrome Executable Path (Optional)",
		"browser.chromeExecutablePathPlaceholder":
			"e.g., /usr/bin/google-chrome or C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
		"browser.chromeExecutablePathDescription": "Leave blank to auto-detect.",
		"browser.customBrowserArguments": "Custom Browser Arguments (Optional)",
		"browser.customBrowserArgumentsPlaceholder":
			"e.g., --no-sandbox --disable-setuid-sandbox --disable-dev-shm-usage --disable-gpu --no-first-run --no-zygote",
		"browser.customBrowserArgumentsDescription": "Space-separated arguments to pass to the browser executable.",
		"browser.checkingConnection": "Checking connection...",
		"browser.connected": "Connected",
		"browser.notConnected": "Not connected",
		"terminal.defaultProfile": "Default Terminal Profile",
		"terminal.defaultProfileDescription":
			"Select the default terminal Cline will use. 'Default' uses your VSCode global setting.",
		"terminal.shellIntegrationTimeout": "Shell integration timeout (seconds)",
		"terminal.shellIntegrationTimeoutPlaceholder": "Enter timeout in seconds",
		"terminal.shellIntegrationTimeoutDescription":
			"Set how long Cline waits for shell integration to activate before executing commands. Increase this value if you experience terminal connection timeouts.",
		"terminal.enableAggressiveReuse": "Enable aggressive terminal reuse",
		"terminal.enableAggressiveReuseDescription":
			"When enabled, Cline will reuse existing terminal windows that aren't in the current working directory. Disable this if you experience issues with task lockout after a terminal command.",
		"terminal.executionMode": "Terminal Execution Mode",
		"terminal.executionModeVscode": "VS Code Terminal",
		"terminal.executionModeBackground": "Background Exec",
		"terminal.executionModeDescription":
			"Choose whether Cline runs commands in the VS Code terminal or a background process.",
		"terminal.terminalOutputLineLimit": "Terminal Output Line Limit",
		"terminal.terminalOutputLineLimitDescription": "Set the maximum number of lines to display in the terminal output.",
		"terminal.issues": "Having terminal issues?",
		"terminal.quickFixes": "Terminal Quick Fixes",
		"terminal.troubleshootingGuide": "Complete Troubleshooting Guide",
		"terminal.error.positiveNumber": "Please enter a positive number",
		"about.title": "Cline v{version}",
		"about.description":
			"An AI assistant that can use your CLI and Editor. Cline can handle complex software development tasks step-by-step with tools that let him create & edit files, explore large projects, use the browser, and execute terminal commands (after you grant permission).",
		"about.communitySupport": "Community & Support",
		"about.development": "Development",
		"about.resources": "Resources",
		"about.x": "X",
		"about.discord": "Discord",
		"about.reddit": " r/cline",
		"about.github": "GitHub",
		"about.issues": " Issues",
		"about.featureRequests": " Feature Requests",
		"about.documentation": "Documentation",
		"about.website": "https://cline.bot/",
		"modelInfo.advanced": "Advanced",
		"modelInfo.images": "Images",
		"modelInfo.browser": "Browser",
		"modelInfo.promptCaching": "Prompt Caching",
		"modelInfo.cacheReads": "Cache Reads",
		"modelInfo.cacheWrites": "Cache Writes",
		"modelInfo.tieredPricing": "Tiered Pricing:",
		"modelInfo.input": "Input:",
		"modelInfo.output": "Output:",
		"modelInfo.providerRouting": "Provider Routing",
		"modelInfo.default": "Default",
		"modelInfo.price": "Price",
		"modelInfo.throughput": "Throughput",
		"modelInfo.latency": "Latency",
		"modelInfo.defaultDescription":
			"Load balance across providers (AWS, Google Vertex, etc.), prioritizing price while considering uptime",
		"modelInfo.priceDescription": "Sort by price, prioritizing the lowest cost provider",
		"modelInfo.throughputDescription": "Sort by throughput, prioritizing highest throughput (may increase cost)",
		"modelInfo.latencyDescription": "Sort by response time, prioritizing lowest latency",
		"modelInfo.yes": "Yes",
		"modelInfo.no": "No",
		"hook.edit": "Edit hook file",
		"hook.delete": "Delete hook file",
		"hook.windowsToggleNotSupported":
			"Hook toggling is not yet supported on Windows in this foundation PR. Hooks execute when the hook file exists.",
		"rule.view": "View rule file",
		"rule.viewReadOnly": "View rule file (read-only)",
		"rule.edit": "Edit rule file",
		"rule.delete": "Delete rule file",
		"rule.required": "This rule is required and cannot be disabled",
		"rule.agentsTooltip": "Searches recursively for all AGENTS.md files in the workspace when a top-level AGENTS.md exists",
		"chat.error": "Error",
		"chat.havingTrouble": "Cline is having trouble...",
		"chat.executeCommand": "Cline wants to execute this command:",
		"chat.useMcpTool": "use a tool",
		"chat.accessMcpResource": "access a resource",
		"chat.onMcpServer": "on the",
		"chat.taskCompleted": "Task Completed",
		"chat.hasQuestion": "Cline has a question:",
		"chat.creatingPatches": "Cline is creating patches to edit this file:",
		"chat.editFile": "Cline wants to edit this file:",
		"chat.deleteFile": "Cline wants to delete this file:",
		"chat.createFile": "Cline wants to create a new file:",
		"chat.readFile": "Cline wants to read this file:",
		"chat.viewTopLevelFiles": "Cline wants to view the top level files in this directory:",
		"chat.viewedTopLevelFiles": "Cline viewed the top level files in this directory:",
		"chat.viewAllFiles": "Cline wants to recursively view all files in this directory:",
		"chat.viewedAllFiles": "Cline recursively viewed all files in this directory:",
		"chat.viewCodeDefinitions": "Cline wants to view source code definition names used in this directory:",
		"chat.viewedCodeDefinitions": "Cline viewed source code definition names used in this directory:",
		"chat.searchDirectory": "Cline wants to search this directory for",
		"chat.condensingConversation": "Cline is condensing the conversation:",
		"chat.fetchUrl": "Cline wants to fetch content from this URL:",
		"chat.fetchedUrl": "Cline fetched content from this URL:",
		"chat.searchWeb": "Cline wants to search the web for:",
		"chat.searchedWeb": "Cline searched the web for:",
		"chat.loadedSkill": "Cline loaded the skill:",
		"chat.mcpNotification": "MCP Notification: ",
		"chat.thinking": "Thinking",
		"chat.thinkingEllipsis": "Thinking...",
		"chat.loadingMcpDocumentation": "Loading MCP documentation",
		"chat.generatingExplanation": "Generating explanation",
		"chat.failedToGenerateExplanation": "Failed to generate explanation",
		"chat.explanationCancelled": "Explanation cancelled",
		"chat.generatedExplanation": "Generated explanation",
		"chat.autoRetryFailed": "Auto-Retry Failed",
		"chat.autoRetryInProgress": "Auto-Retry in Progress",
		"chat.autoRetryFailedMessage": "Auto-retry failed after {maxAttempts} attempts. Manual intervention required.",
		"chat.autoRetryProgressMessage": "Attempt {attempt} of {maxAttempts} - Retrying in {delaySeconds} seconds...",
		"chat.startNewTask": "Cline wants to start a new task:",
		"chat.condenseConversation": "Cline wants to condense your conversation:",
		"chat.createGithubIssue": "Cline wants to create a Github issue:",
		"chat.conditionalRulesApplied": "Conditional rules applied:",
		"chat.fileOutsideWorkspace": "This file is outside of your workspace",
		"chat.directoryOutsideWorkspace": "This is outside of your workspace",
		"chat.urlExternal": "This URL is external",
		"chat.searchExternal": "This search is external",
	},
	"Simplified Chinese - 简体中文": {
		"welcome.title": "你好，我是 Cline",
		"welcome.description":
			"借助 Claude 4.6 Sonnet 的代理式编码能力和各种工具，我可以完成各种任务，包括创建和编辑文件、探索复杂项目、使用浏览器以及执行终端命令（当然需要你的许可）。我甚至可以使用 MCP 创建新工具并扩展自身能力。",
		"welcome.getStarted": "免费开始使用",
		"welcome.useApiKey": "使用你自己的 API 密钥",
		"welcome.letsGo": "开始吧！",
		"welcome.signUpDescription": "注册一个账户免费开始使用，或使用提供访问 Claude Sonnet 等模型的 API 密钥。",
		"account.welcome.description":
			"注册一个账户以访问最新模型、查看使用情况和 credits 的账单仪表板，以及更多即将推出的功能。",
		"account.welcome.signUp": "使用 Cline 注册",
		"account.welcome.termsAgreement": "继续操作，即表示您同意",
		"account.welcome.termsOfService": "服务条款",
		"account.welcome.privacyPolicy": "隐私政策",
		"openai.codex.signInDescription": "使用您的 ChatGPT Plus 或 Pro 订阅登录，无需 API 密钥即可使用 GPT-5 模型。",
		"openai.codex.signInButton": "登录 OpenAI Codex",
		"openai.codex.signedIn": "已登录 OpenAI Codex",
		"openai.codex.signOut": "退出登录",
		"oca.signIn": "使用 Oracle Code Assist 登录",
		"oca.signInAgain": "再次登录",
		"oca.oracleEmployee": "我是 Oracle 员工",
		"oca.signInDescription": "请联系您的 IT 管理员设置 Oracle Code Assist 作为模型提供商。Oracle 员工，请查看",
		"oca.signedIn": "已登录",
		"oca.unknownUser": "未知用户",
		"oca.logOut": "退出登录",
		"oca.customBaseUrl": "自定义基础 URL（可选）",
		"oca.failedToRefresh": "刷新模型失败。请检查您的会话或网络。",
		"oca.retry": "重试",
		"oca.ideaForOca": "对 Oracle Code Assist 有想法？",
		"oca.provideFeedback": "提供反馈",
		"oca.quickstartGuide": "快速入门指南",
		"cline.account.signUp": "使用 Cline 注册",
		"cline.account.viewBilling": "查看账单和使用情况",
		"preferredLanguage.label": "首选语言",
		"preferredLanguage.description": "Cline 应该使用的通信语言。",
		"settings.title": "设置",
		"settings.apiConfig.name": "API 配置",
		"settings.apiConfig.tooltip": "API 配置",
		"settings.apiConfig.header": "API 配置",
		"settings.features.name": "功能",
		"settings.features.tooltip": "功能设置",
		"settings.features.header": "功能设置",
		"settings.browser.name": "浏览器",
		"settings.browser.tooltip": "浏览器设置",
		"settings.browser.header": "浏览器设置",
		"settings.terminal.name": "终端",
		"settings.terminal.tooltip": "终端设置",
		"settings.terminal.header": "终端设置",
		"features.agent": "智能体",
		"features.editor": "编辑器",
		"features.experimental": "实验性功能",
		"features.advanced": "高级",
		"features.subagents": "子智能体",
		"features.subagentsDescription": "让 Cline 并行运行专注的子智能体来为您探索代码库。",
		"features.nativeToolCall": "原生工具调用",
		"features.nativeToolCallDescription": "在可用时使用原生函数调用",
		"features.parallelToolCalling": "并行工具调用",
		"features.parallelToolCallingDescription": "同时执行多个工具调用",
		"features.strictPlanMode": "严格计划模式",
		"features.strictPlanModeDescription": "防止在计划模式下编辑文件",
		"features.autoCompact": "自动压缩",
		"features.autoCompactDescription": "自动压缩对话历史。",
		"features.focusChain": "焦点链",
		"features.focusChainDescription": "在交互过程中保持上下文焦点",
		"features.reminderInterval": "提醒间隔 (1-10)",
		"features.featureTips": "功能提示",
		"features.featureTipsDescription": "在思考阶段显示轮换提示，帮助您发现 Cline 功能。",
		"features.backgroundEdit": "后台编辑",
		"features.backgroundEditDescription": "允许编辑而不抢占编辑器焦点",
		"features.checkpoints": "检查点",
		"features.checkpointsDescription": "在关键点保存进度以便轻松回滚",
		"features.clineWebTools": "Cline 网络工具",
		"features.clineWebToolsDescription": "访问网页浏览和搜索功能",
		"features.worktrees": "工作树",
		"features.worktreesDescription": "启用 git 工作树管理，用于运行并行 Cline 任务。",
		"features.yoloMode": "Yolo 模式",
		"features.yoloModeDescription": "无需用户确认执行任务。自动从计划模式切换到执行模式，并禁用提问工具。请谨慎使用。",
		"features.doubleCheckCompletion": "双重检查完成",
		"features.doubleCheckCompletionDescription": "拒绝第一次完成尝试，并要求模型在接受之前根据原始任务要求重新验证其工作。",
		"features.hooks": "钩子",
		"features.hooksDescription": "在任务执行期间启用生命周期和工具钩子。",
		"features.mcpDisplayMode": "MCP 显示模式",
		"features.mcpDisplayModeDescription": "控制 MCP 响应的显示方式",
		"features.plainText": "纯文本",
		"features.richDisplay": "富文本显示",
		"features.markdown": "Markdown",
		"features.remoteConfigTooltip": "此设置由您组织的远程配置管理",
		"ollama.useCustomBaseUrl": "使用自定义基础 URL",
		"ollama.defaultBaseUrl": "默认: http://localhost:11434",
		"ollama.apiKeyHelpText": "用于已认证 Ollama 实例或云服务的可选 API 密钥。本地安装请留空。",
		"ollama.apiKeyPlaceholder": "输入 API 密钥（可选）...",
		"ollama.model": "模型",
		"ollama.searchModelPlaceholder": "搜索并选择模型...",
		"ollama.modelExample": "例如: llama3.1",
		"ollama.noModelsFound": "无法从 Ollama 服务器获取模型。请确保 Ollama 正在运行且可访问，或在上方手动输入模型 ID。",
		"ollama.modelContextWindow": "模型上下文窗口",
		"ollama.contextWindowExample": "例如: 32768",
		"ollama.requestTimeout": "请求超时 (毫秒)",
		"ollama.requestTimeoutDefault": "默认: 30000 (30 秒)",
		"ollama.requestTimeoutDescription": "等待 API 响应超时前的最大时间（毫秒）。",
		"ollama.description": "Ollama 允许您在计算机上本地运行模型。有关如何开始的说明，请参阅他们的",
		"ollama.note": "注意",
		"ollama.modelRecommendation": "Cline 使用复杂提示，最适合 Claude 模型。能力较弱的模型可能无法按预期工作。",
		"chat.shellIntegrationUnavailable": "Shell 集成不可用",
		"chat.shellIntegrationWarning":
			'Cline 可能无法查看命令的输出。请更新 VSCode（CMD/CTRL + Shift + P "更新"）并确保您使用的是支持的 shell：zsh、bash、fish 或 PowerShell（CMD/CTRL + Shift + P "终端：选择默认配置文件"）。',
		"chat.stillHavingTrouble": "仍然遇到问题？",
		"chat.shellIntegrationIssues": "Shell 集成问题",
		"chat.shellIntegrationRecommendation":
			"由于您遇到了重复的 Shell 集成问题，我们建议切换到后台终端模式以获得更好的可靠性。",
		"chat.backgroundTerminalEnabled": "后台终端已启用",
		"chat.enableBackgroundTerminal": "启用后台终端（推荐）",
		"settings.general.name": "通用",
		"settings.general.tooltip": "通用设置",
		"settings.general.header": "通用设置",
		"settings.remoteConfig.name": "远程配置",
		"settings.remoteConfig.tooltip": "远程配置字段",
		"settings.remoteConfig.header": "远程配置",
		"settings.about.name": "关于",
		"settings.about.tooltip": "关于 Cline",
		"settings.about.header": "关于",
		"settings.debug.name": "调试",
		"settings.debug.tooltip": "调试工具",
		"settings.debug.header": "调试",
		"general.telemetry.label": "允许错误和使用情况报告",
		"general.telemetry.description":
			"通过发送使用数据和错误报告来帮助改进 Cline。我们绝不会发送任何代码、提示或个人信息。有关更多详细信息，请查看我们的遥测概述和隐私政策。",
		"general.telemetry.remoteConfig": "此设置由您组织的远程配置管理",
		"general.telemetry.telemetryOverview": "遥测概述",
		"general.telemetry.privacyPolicy": "隐私政策",
		"worktrees.retry": "重试",
		"remoteConfig.refresh": "刷新",
		"remoteConfig.retryIn": "（{seconds}秒后重试）",
		"ollama.quickstartGuide": "快速入门指南",
		"sapAiCore.retry": "重试",
		"liteLlm.quickstartGuide": "快速入门指南",
		"lmStudio.quickstartGuide": "快速入门指南",
		"mcp.retryConnection": "重试连接",
		"mcp.retrying": "正在重试...",
		"mcpMarketplace.retry": "重试",
		"chat.placeholder.task": "在这里输入你的任务...",
		"chat.placeholder.message": "输入消息...",
		"navbar.chat": "聊天",
		"navbar.newTask": "新任务",
		"navbar.mcp": "MCP",
		"navbar.mcpServers": "MCP 服务器",
		"navbar.history": "历史",
		"navbar.account": "账户",
		"navbar.settings": "设置",
		"history.title": "历史",
		"history.searchPlaceholder": "模糊搜索历史...",
		"history.today": "今天",
		"history.older": "更早",
		"history.selectAll": "全选",
		"history.selectNone": "取消全选",
		"history.deleteSelected": "删除 {count} 个选中项",
		"history.deleteAll": "删除所有历史",
		"mcp.title": "MCP 服务器",
		"mcp.marketplace": "市场",
		"mcp.remoteServers": "远程服务器",
		"mcp.configure": "配置",
		"account.title": "账户",
		"account.personal": "个人",
		"account.remoteConfigLocked": "当您的组织启用了远程配置时，无法更改此设置。",
		"account.role": "角色",
		"account.dashboard": "仪表板",
		"account.logOut": "退出登录",
		"account.environment": "Cline 环境",
		"apiConfig.planMode": "计划模式",
		"apiConfig.actMode": "执行模式",
		"apiConfig.useDifferentModels": "为计划和执行模式使用不同的模型",
		"apiConfig.useDifferentModelsDescription":
			"在计划和执行模式之间切换时，会保留上一个模式中使用的 API 和模型。这可能很有帮助，例如当使用强大的推理模型为更便宜的编码模型制定计划时。",
		"apiConfig.apiProvider": "API 提供商",
		"apiConfig.searchProviderPlaceholder": "搜索并选择提供商...",
		"apiConfig.remoteConfiguredProvidersTooltip": "提供商选项由您组织的远程配置管理",
		"features.remoteConfigLocked": "此设置由您组织的远程配置管理",
		"browser.disableToolUse": "禁用浏览器工具使用",
		"browser.disableToolUseDescription": "阻止 Cline 使用浏览器操作（例如启动、点击、输入）。",
		"browser.viewportSize": "视口大小",
		"browser.viewportSizeDescription": "设置用于截图和交互的浏览器视口大小。",
		"browser.useRemoteBrowser": "使用远程浏览器连接",
		"browser.useRemoteBrowserDescription":
			"启用 Cline 使用您的 Chrome{isBundled}{detectedChromePath}。您可以在下面指定自定义路径。使用远程浏览器连接需要以调试模式启动 Chrome{remoteEnabledDescription}。",
		"browser.isBundledDescription": "(未在您的机器上检测到)",
		"browser.detectedChromePathDescription": " ({detectedPath})",
		"browser.remoteEnabledDescription":
			" 手动（<code>--remote-debugging-port=9222</code>）或使用下面的按钮。输入主机地址或留空以自动发现。",
		"browser.remoteBrowserHostPlaceholder": "http://localhost:9222",
		"browser.launchBrowserWithDebugMode": "以调试模式启动浏览器",
		"browser.launchingBrowser": "正在启动浏览器...",
		"browser.chromeExecutablePath": "Chrome 可执行文件路径（可选）",
		"browser.chromeExecutablePathPlaceholder":
			"例如，/usr/bin/google-chrome 或 C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
		"browser.chromeExecutablePathDescription": "留空以自动检测。",
		"browser.customBrowserArguments": "自定义浏览器参数（可选）",
		"browser.customBrowserArgumentsPlaceholder":
			"例如，--no-sandbox --disable-setuid-sandbox --disable-dev-shm-usage --disable-gpu --no-first-run --no-zygote",
		"browser.customBrowserArgumentsDescription": "传递给浏览器可执行文件的空格分隔参数。",
		"browser.checkingConnection": "正在检查连接...",
		"browser.connected": "已连接",
		"browser.notConnected": "未连接",
		"terminal.defaultProfile": "默认终端配置文件",
		"terminal.defaultProfileDescription": "选择 Cline 将使用的默认终端。'默认'使用您的 VSCode 全局设置。",
		"terminal.shellIntegrationTimeout": "Shell 集成超时（秒）",
		"terminal.shellIntegrationTimeoutPlaceholder": "输入超时（秒）",
		"terminal.shellIntegrationTimeoutDescription":
			"设置 Cline 在执行命令前等待 shell 集成激活的时间。如果您遇到终端连接超时，请增加此值。",
		"terminal.enableAggressiveReuse": "启用激进的终端重用",
		"terminal.enableAggressiveReuseDescription":
			"启用后，Cline 将重用不在当前工作目录中的现有终端窗口。如果您在终端命令后遇到任务锁定问题，请禁用此选项。",
		"terminal.executionMode": "终端执行模式",
		"terminal.executionModeVscode": "VS Code 终端",
		"terminal.executionModeBackground": "后台执行",
		"terminal.executionModeDescription": "选择 Cline 是在 VS Code 终端中还是在后台进程中运行命令。",
		"terminal.terminalOutputLineLimit": "终端输出行数限制",
		"terminal.terminalOutputLineLimitDescription": "设置终端输出中显示的最大行数。",
		"terminal.issues": "遇到终端问题？",
		"terminal.quickFixes": "终端快速修复",
		"terminal.troubleshootingGuide": "完整故障排除指南",
		"terminal.error.positiveNumber": "请输入正数",
		"about.title": "Cline v{version}",
		"about.description":
			"一个可以使用您的命令行和编辑器的 AI 助手。Cline 可以通过工具逐步处理复杂的软件开发任务，包括创建和编辑文件、探索大型项目、使用浏览器以及执行终端命令（在您授予权限后）。",
		"about.communitySupport": "社区与支持",
		"about.development": "开发",
		"about.resources": "资源",
		"about.x": "X",
		"about.discord": "Discord",
		"about.reddit": " r/cline",
		"about.github": "GitHub",
		"about.issues": " Issues",
		"about.featureRequests": " Feature Requests",
		"about.documentation": "Documentation",
		"about.website": "https://cline.bot/",
		"modelInfo.advanced": "高级",
		"modelInfo.images": "图像",
		"modelInfo.browser": "浏览器",
		"modelInfo.promptCaching": "提示缓存",
		"modelInfo.cacheReads": "缓存读取",
		"modelInfo.cacheWrites": "缓存写入",
		"modelInfo.tieredPricing": "分层定价:",
		"modelInfo.input": "输入:",
		"modelInfo.output": "输出:",
		"modelInfo.providerRouting": "提供商路由",
		"modelInfo.default": "默认",
		"modelInfo.price": "价格",
		"modelInfo.throughput": "吞吐量",
		"modelInfo.latency": "延迟",
		"modelInfo.defaultDescription": "在提供商（AWS、Google Vertex 等）之间负载均衡，优先考虑价格同时考虑正常运行时间",
		"modelInfo.priceDescription": "按价格排序，优先考虑成本最低的提供商",
		"modelInfo.throughputDescription": "按吞吐量排序，优先考虑最高吞吐量（可能增加成本）",
		"modelInfo.latencyDescription": "按响应时间排序，优先考虑最低延迟",
		"modelInfo.yes": "是",
		"modelInfo.no": "否",
		"hook.edit": "编辑钩子文件",
		"hook.delete": "删除钩子文件",
		"hook.windowsToggleNotSupported": "在此基础 PR 中，Windows 尚不支持钩子切换。当钩子文件存在时，钩子会执行。",
		"rule.view": "查看规则文件",
		"rule.viewReadOnly": "查看规则文件（只读）",
		"rule.edit": "编辑规则文件",
		"rule.delete": "删除规则文件",
		"rule.required": "此规则为必需，不能禁用",
		"rule.agentsTooltip": "当存在顶级 AGENTS.md 文件时，递归搜索工作区中的所有 AGENTS.md 文件",
		"chat.error": "错误",
		"chat.havingTrouble": "Cline 遇到了问题...",
		"chat.executeCommand": "Cline 想要执行此命令：",
		"chat.useMcpTool": "使用工具",
		"chat.accessMcpResource": "访问资源",
		"chat.onMcpServer": "在",
		"chat.taskCompleted": "任务完成",
		"chat.hasQuestion": "Cline 有一个问题：",
		"chat.creatingPatches": "Cline 正在创建补丁来编辑此文件：",
		"chat.editFile": "Cline 想要编辑此文件：",
		"chat.deleteFile": "Cline 想要删除此文件：",
		"chat.createFile": "Cline 想要创建一个新文件：",
		"chat.readFile": "Cline 想要读取此文件：",
		"chat.viewTopLevelFiles": "Cline 想要查看此目录中的顶级文件：",
		"chat.viewedTopLevelFiles": "Cline 查看了此目录中的顶级文件：",
		"chat.viewAllFiles": "Cline 想要递归查看此目录中的所有文件：",
		"chat.viewedAllFiles": "Cline 递归查看了此目录中的所有文件：",
		"chat.viewCodeDefinitions": "Cline 想要查看此目录中使用的源代码定义名称：",
		"chat.viewedCodeDefinitions": "Cline 查看了此目录中使用的源代码定义名称：",
		"chat.searchDirectory": "Cline 想要在此目录中搜索",
		"chat.condensingConversation": "Cline 正在压缩对话：",
		"chat.fetchUrl": "Cline 想要从此 URL 获取内容：",
		"chat.fetchedUrl": "Cline 从此 URL 获取了内容：",
		"chat.searchWeb": "Cline 想要在网上搜索：",
		"chat.searchedWeb": "Cline 在网上搜索了：",
		"chat.loadedSkill": "Cline 加载了技能：",
		"chat.mcpNotification": "MCP 通知：",
		"chat.thinking": "思考中",
		"chat.thinkingEllipsis": "思考中...",
		"chat.loadingMcpDocumentation": "正在加载 MCP 文档",
		"chat.generatingExplanation": "正在生成解释",
		"chat.failedToGenerateExplanation": "生成解释失败",
		"chat.explanationCancelled": "解释已取消",
		"chat.generatedExplanation": "已生成解释",
		"chat.autoRetryFailed": "自动重试失败",
		"chat.autoRetryInProgress": "自动重试进行中",
		"chat.autoRetryFailedMessage": "自动重试在 {maxAttempts} 次尝试后失败。需要手动干预。",
		"chat.autoRetryProgressMessage": "第 {attempt} 次尝试，共 {maxAttempts} 次 - {delaySeconds} 秒后重试...",
		"chat.startNewTask": "Cline 想要开始一个新任务：",
		"chat.condenseConversation": "Cline 想要压缩您的对话：",
		"chat.createGithubIssue": "Cline 想要创建一个 Github issue：",
		"chat.conditionalRulesApplied": "应用了条件规则：",
		"chat.fileOutsideWorkspace": "此文件在您的工作区之外",
		"chat.directoryOutsideWorkspace": "此目录在您的工作区之外",
		"chat.urlExternal": "此 URL 是外部链接",
		"chat.searchExternal": "此搜索是外部搜索",
	},
	"Traditional Chinese - 繁體中文": {
		"welcome.title": "你好，我是 Cline",
		"welcome.description":
			"藉助 Claude 4.6 Sonnet 的代理式編碼能力和各種工具，我可以完成各種任務，包括建立和編輯檔案、探索複雜專案、使用瀏覽器以及執行終端命令（當然需要你的許可）。我甚至可以使用 MCP 建立新工具並擴展自身能力。",
		"welcome.getStarted": "免費開始使用",
		"welcome.useApiKey": "使用你自己的 API 金鑰",
		"welcome.letsGo": "開始吧！",
		"welcome.signUpDescription": "註冊一個帳戶免費開始使用，或使用提供存取 Claude Sonnet 等模型的 API 金鑰。",
		"account.welcome.description":
			"註冊一個帳戶以存取最新模型、查看使用情況和 credits 的帳單儀表板，以及更多即將推出的功能。",
		"account.welcome.signUp": "使用 Cline 註冊",
		"account.welcome.termsAgreement": "繼續操作，即表示您同意",
		"account.welcome.termsOfService": "服務條款",
		"account.welcome.privacyPolicy": "隱私政策",
		"openai.codex.signInDescription": "使用您的 ChatGPT Plus 或 Pro 訂閱登入，無需 API 金鑰即可使用 GPT-5 模型。",
		"openai.codex.signInButton": "登入 OpenAI Codex",
		"openai.codex.signedIn": "已登入 OpenAI Codex",
		"openai.codex.signOut": "登出",
		"oca.signIn": "使用 Oracle Code Assist 登入",
		"oca.signInAgain": "再次登入",
		"oca.oracleEmployee": "我是 Oracle 員工",
		"oca.signInDescription": "請聯繫您的 IT 管理員設定 Oracle Code Assist 作為模型提供商。Oracle 員工，請查看",
		"oca.signedIn": "已登入",
		"oca.unknownUser": "未知使用者",
		"oca.logOut": "登出",
		"oca.customBaseUrl": "自訂基礎 URL（可選）",
		"oca.failedToRefresh": "刷新模型失敗。請檢查您的會話或網絡。",
		"oca.retry": "重試",
		"oca.ideaForOca": "對 Oracle Code Assist 有想法？",
		"oca.provideFeedback": "提供回饋",
		"oca.quickstartGuide": "快速入門指南",
		"cline.account.signUp": "使用 Cline 註冊",
		"cline.account.viewBilling": "查看帳單和使用情況",
		"preferredLanguage.label": "首選語言",
		"preferredLanguage.description": "Cline 應該使用的通訊語言。",
		"settings.title": "設定",
		"settings.apiConfig.name": "API 設定",
		"settings.apiConfig.tooltip": "API 設定",
		"settings.apiConfig.header": "API 設定",
		"settings.features.name": "功能",
		"settings.features.tooltip": "功能設定",
		"settings.features.header": "功能設定",
		"settings.browser.name": "瀏覽器",
		"settings.browser.tooltip": "瀏覽器設定",
		"settings.browser.header": "瀏覽器設定",
		"settings.terminal.name": "終端",
		"settings.terminal.tooltip": "終端設定",
		"settings.terminal.header": "終端設定",
		"settings.general.name": "一般",
		"settings.general.tooltip": "一般設定",
		"settings.general.header": "一般設定",
		"settings.remoteConfig.name": "遠端設定",
		"settings.remoteConfig.tooltip": "遠端設定欄位",
		"settings.remoteConfig.header": "遠端設定",
		"settings.about.name": "關於",
		"settings.about.tooltip": "關於 Cline",
		"settings.about.header": "關於",
		"settings.debug.name": "偵錯",
		"settings.debug.tooltip": "偵錯工具",
		"settings.debug.header": "偵錯",
		"general.telemetry.label": "允許錯誤和使用情況報告",
		"general.telemetry.description":
			"透過發送使用數據和錯誤報告來幫助改進 Cline。我們絕不會發送任何程式碼、提示或個人資訊。有關更多詳細資訊，請查看我們的遙測概述和隱私政策。",
		"general.telemetry.remoteConfig": "此設定由您組織的遠端設定管理",
		"general.telemetry.telemetryOverview": "遙測概述",
		"general.telemetry.privacyPolicy": "隱私政策",
		"worktrees.retry": "重試",
		"remoteConfig.refresh": "刷新",
		"remoteConfig.retryIn": "（{seconds}秒後重試）",
		"ollama.useCustomBaseUrl": "使用自訂基礎 URL",
		"ollama.defaultBaseUrl": "預設: http://localhost:11434",
		"ollama.apiKeyHelpText": "用於已認證 Ollama 執行個體或雲端服務的可選 API 金鑰。本機安裝請留空。",
		"ollama.apiKeyPlaceholder": "輸入 API 金鑰（可選）...",
		"ollama.model": "模型",
		"ollama.searchModelPlaceholder": "搜索並選擇模型...",
		"ollama.modelExample": "例如: llama3.1",
		"ollama.noModelsFound": "無法從 Ollama 伺服器取得模型。請確保 Ollama 正在執行且可存取，或在上方手動輸入模型 ID。",
		"ollama.modelContextWindow": "模型上下文視窗",
		"ollama.contextWindowExample": "例如: 32768",
		"ollama.requestTimeout": "請求逾時 (毫秒)",
		"ollama.requestTimeoutDefault": "預設: 30000 (30 秒)",
		"ollama.requestTimeoutDescription": "等待 API 回應逾時前的最大時間（毫秒）。",
		"ollama.description": "Ollama 允許您在電腦上本機執行模型。有關如何開始的說明，請參閱他們的",
		"ollama.note": "注意",
		"ollama.modelRecommendation": "Cline 使用複雜提示，最適合 Claude 模型。能力較弱的模型可能無法按預期工作。",
		"ollama.quickstartGuide": "快速入門指南",
		"sapAiCore.retry": "重試",
		"liteLlm.quickstartGuide": "快速入門指南",
		"lmStudio.quickstartGuide": "快速入門指南",
		"mcp.retryConnection": "重試連接",
		"mcp.retrying": "正在重試...",
		"mcpMarketplace.retry": "重試",
		"chat.placeholder.task": "在這裡輸入你的任務...",
		"chat.placeholder.message": "輸入訊息...",
		"chat.shellIntegrationUnavailable": "Shell 集成不可用",
		"chat.shellIntegrationWarning":
			'Cline 可能無法查看命令的輸出。請更新 VSCode（CMD/CTRL + Shift + P "更新"）並確保您使用的是支援的 shell：zsh、bash、fish 或 PowerShell（CMD/CTRL + Shift + P "終端：選擇預設設定檔"）。',
		"chat.stillHavingTrouble": "仍然遇到問題？",
		"chat.shellIntegrationIssues": "Shell 集成問題",
		"chat.shellIntegrationRecommendation":
			"由於您遇到了重複的 Shell 集成問題，我們建議切換到後台終端模式以獲得更好的可靠性。",
		"chat.backgroundTerminalEnabled": "後台終端已啟用",
		"chat.enableBackgroundTerminal": "啟用後台終端（推薦）",
		"navbar.chat": "聊天",
		"navbar.newTask": "新任務",
		"navbar.mcp": "MCP",
		"navbar.mcpServers": "MCP 伺服器",
		"navbar.history": "歷史",
		"navbar.account": "帳戶",
		"navbar.settings": "設定",
		"history.title": "歷史",
		"history.searchPlaceholder": "模糊搜索歷史...",
		"history.today": "今天",
		"history.older": "更早",
		"history.selectAll": "全選",
		"history.selectNone": "取消全選",
		"history.deleteSelected": "刪除 {count} 個選中項",
		"history.deleteAll": "刪除所有歷史",
		"mcp.title": "MCP 伺服器",
		"mcp.marketplace": "市場",
		"mcp.remoteServers": "遠端伺服器",
		"mcp.configure": "設定",
		"account.title": "帳戶",
		"account.personal": "個人",
		"account.remoteConfigLocked": "當您的組織啟用了遠端設定時，無法更改此設定。",
		"account.role": "角色",
		"account.dashboard": "儀表板",
		"account.logOut": "登出",
		"account.environment": "Cline 環境",
		"apiConfig.planMode": "計畫模式",
		"apiConfig.actMode": "執行模式",
		"apiConfig.useDifferentModels": "為計畫和執行模式使用不同的模型",
		"apiConfig.useDifferentModelsDescription":
			"在計畫和執行模式之間切換時，會保留上一個模式中使用的 API 和模型。這可能很有幫助，例如當使用強大的推理模型為更便宜的編碼模型制定計畫時。",
		"apiConfig.apiProvider": "API 提供商",
		"apiConfig.searchProviderPlaceholder": "搜索並選擇提供商...",
		"apiConfig.remoteConfiguredProvidersTooltip": "提供商選項由您組織的遠端設定管理",
		"features.agent": "代理",
		"features.editor": "編輯器",
		"features.experimental": "實驗性",
		"features.advanced": "高級",
		"features.subagents": "子代理",
		"features.subagentsDescription": "讓 Cline 並行運行專注的子代理來為您探索程式碼庫。",
		"features.nativeToolCall": "原生工具調用",
		"features.nativeToolCallDescription": "在可用時使用原生函數調用",
		"features.parallelToolCalling": "並行工具調用",
		"features.parallelToolCallingDescription": "同時執行多個工具調用",
		"features.strictPlanMode": "嚴格計畫模式",
		"features.strictPlanModeDescription": "在計畫模式下防止檔案編輯",
		"features.autoCompact": "自動壓縮",
		"features.autoCompactDescription": "自動壓縮對話歷史。",
		"features.focusChain": "焦點鏈",
		"features.focusChainDescription": "在互動過程中保持上下文焦點",
		"features.reminderInterval": "提醒間隔 (1-10)",
		"features.featureTips": "功能提示",
		"features.featureTipsDescription": "在思考階段顯示輪換提示，幫助您發現 Cline 功能。",
		"features.backgroundEdit": "後台編輯",
		"features.backgroundEditDescription": "允許編輯而不佔用編輯器焦點",
		"features.checkpoints": "檢查點",
		"features.checkpointsDescription": "在關鍵點儲存進度以便輕鬆回滾",
		"features.clineWebTools": "Cline 網路工具",
		"features.clineWebToolsDescription": "存取網路瀏覽和搜索功能",
		"features.worktrees": "工作樹",
		"features.worktreesDescription": "啟用 git 工作樹管理，用於執行並行 Cline 任務。",
		"features.yoloMode": "Yolo 模式",
		"features.yoloModeDescription":
			"在沒有使用者確認的情況下執行任務。自動從計畫模式切換到執行模式並禁用提問工具。請謹慎使用。",
		"features.doubleCheckCompletion": "雙重檢查完成",
		"features.doubleCheckCompletionDescription": "拒絕第一次完成嘗試，並要求模型在接受之前根據原始任務要求重新驗證其工作。",
		"features.hooks": "鉤子",
		"features.hooksDescription": "在任務執行期間啟用生命週期和工具鉤子。",
		"features.mcpDisplayMode": "MCP 顯示模式",
		"features.mcpDisplayModeDescription": "控制 MCP 回應的顯示方式",
		"features.plainText": "純文字",
		"features.richDisplay": "富顯示",
		"features.markdown": "Markdown",
		"features.remoteConfigLocked": "此設定由您組織的遠端設定管理",
		"features.remoteConfigTooltip": "此設定由您組織的遠端設定管理",
		"browser.disableToolUse": "禁用瀏覽器工具使用",
		"browser.disableToolUseDescription": "阻止 Cline 使用瀏覽器操作（例如啟動、點擊、輸入）。",
		"browser.viewportSize": "視口大小",
		"browser.viewportSizeDescription": "設定用於截圖和互動的瀏覽器視口大小。",
		"browser.useRemoteBrowser": "使用遠端瀏覽器連接",
		"browser.useRemoteBrowserDescription":
			"啟用 Cline 使用您的 Chrome{isBundled}{detectedChromePath}。您可以在下面指定自訂路徑。使用遠端瀏覽器連接需要以偵錯模式啟動 Chrome{remoteEnabledDescription}。",
		"browser.isBundledDescription": "(未在您的機器上檢測到)",
		"browser.detectedChromePathDescription": " ({detectedPath})",
		"browser.remoteEnabledDescription":
			" 手動（<code>--remote-debugging-port=9222</code>）或使用下面的按鈕。輸入主機地址或留空以自動發現。",
		"browser.remoteBrowserHostPlaceholder": "http://localhost:9222",
		"browser.launchBrowserWithDebugMode": "以偵錯模式啟動瀏覽器",
		"browser.launchingBrowser": "正在啟動瀏覽器...",
		"browser.chromeExecutablePath": "Chrome 可執行檔案路徑（可選）",
		"browser.chromeExecutablePathPlaceholder":
			"例如，/usr/bin/google-chrome 或 C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
		"browser.chromeExecutablePathDescription": "留空以自動檢測。",
		"browser.customBrowserArguments": "自訂瀏覽器參數（可選）",
		"browser.customBrowserArgumentsPlaceholder":
			"例如，--no-sandbox --disable-setuid-sandbox --disable-dev-shm-usage --disable-gpu --no-first-run --no-zygote",
		"browser.customBrowserArgumentsDescription": "傳遞給瀏覽器可執行檔案的空格分隔參數。",
		"browser.checkingConnection": "正在檢查連接...",
		"browser.connected": "已連接",
		"browser.notConnected": "未連接",
		"terminal.defaultProfile": "預設終端設定檔",
		"terminal.defaultProfileDescription": "選擇 Cline 將使用的預設終端。'預設'使用您的 VSCode 全域設定。",
		"terminal.shellIntegrationTimeout": "Shell 集成逾時（秒）",
		"terminal.shellIntegrationTimeoutPlaceholder": "輸入逾時（秒）",
		"terminal.shellIntegrationTimeoutDescription":
			"設定 Cline 在執行命令前等待 shell 集成啟動的時間。如果您遇到終端連接逾時，請增加此值。",
		"terminal.enableAggressiveReuse": "啟用激進的終端重用",
		"terminal.enableAggressiveReuseDescription":
			"啟用後，Cline 將重用不在目前工作目錄中的現有終端視窗。如果您在終端命令後遇到任務鎖定問題，請停用此選項。",
		"terminal.executionMode": "終端執行模式",
		"terminal.executionModeVscode": "VS Code 終端",
		"terminal.executionModeBackground": "後台執行",
		"terminal.executionModeDescription": "選擇 Cline 是在 VS Code 終端中還是在後台程序中執行命令。",
		"terminal.terminalOutputLineLimit": "終端輸出行數限制",
		"terminal.terminalOutputLineLimitDescription": "設定終端輸出中顯示的最大行數。",
		"terminal.issues": "遇到終端問題？",
		"terminal.quickFixes": "終端快速修復",
		"terminal.troubleshootingGuide": "完整故障排除指南",
		"terminal.error.positiveNumber": "請輸入正數",
		"about.title": "Cline v{version}",
		"about.description":
			"一個可以使用您的命令行和編輯器的 AI 助手。Cline 可以透過工具逐步處理複雜的軟體開發任務，包括建立和編輯檔案、探索大型專案、使用瀏覽器以及執行終端命令（在您授予權限後）。",
		"about.communitySupport": "社群與支援",
		"about.development": "開發",
		"about.resources": "資源",
		"about.x": "X",
		"about.discord": "Discord",
		"about.reddit": " r/cline",
		"about.github": "GitHub",
		"about.issues": " Issues",
		"about.featureRequests": " Feature Requests",
		"about.documentation": "Documentation",
		"about.website": "https://cline.bot/",
		"modelInfo.advanced": "高級",
		"modelInfo.images": "圖像",
		"modelInfo.browser": "瀏覽器",
		"modelInfo.promptCaching": "提示快取",
		"modelInfo.cacheReads": "快取讀取",
		"modelInfo.cacheWrites": "快取寫入",
		"modelInfo.tieredPricing": "分層定價:",
		"modelInfo.input": "輸入:",
		"modelInfo.output": "輸出:",
		"modelInfo.providerRouting": "提供商路由",
		"modelInfo.default": "預設",
		"modelInfo.price": "價格",
		"modelInfo.throughput": "吞吐量",
		"modelInfo.latency": "延遲",
		"modelInfo.defaultDescription": "在提供商（AWS、Google Vertex 等）之間負載平衡，優先考慮價格同時考慮正常執行時間",
		"modelInfo.priceDescription": "按價格排序，優先考慮成本最低的提供商",
		"modelInfo.throughputDescription": "按吞吐量排序，優先考慮最高吞吐量（可能增加成本）",
		"modelInfo.latencyDescription": "按回應時間排序，優先考慮最低延遲",
		"modelInfo.yes": "是",
		"modelInfo.no": "否",
		"hook.edit": "編輯鉤子檔案",
		"hook.delete": "刪除鉤子檔案",
		"hook.windowsToggleNotSupported": "在此基礎 PR 中，Windows 尚不支援鉤子切換。當鉤子檔案存在時，鉤子會執行。",
		"rule.view": "檢視規則檔案",
		"rule.viewReadOnly": "檢視規則檔案（唯讀）",
		"rule.edit": "編輯規則檔案",
		"rule.delete": "刪除規則檔案",
		"rule.required": "此規則為必需，不能禁用",
		"rule.agentsTooltip": "當存在頂級 AGENTS.md 檔案時，遞迴搜索工作區中的所有 AGENTS.md 檔案",
		"chat.error": "錯誤",
		"chat.havingTrouble": "Cline 遇到了問題...",
		"chat.executeCommand": "Cline 想要執行此命令：",
		"chat.useMcpTool": "使用工具",
		"chat.accessMcpResource": "存取資源",
		"chat.onMcpServer": "在",
		"chat.taskCompleted": "任務完成",
		"chat.hasQuestion": "Cline 有一個問題：",
		"chat.creatingPatches": "Cline 正在建立補丁來編輯此檔案：",
		"chat.editFile": "Cline 想要編輯此檔案：",
		"chat.deleteFile": "Cline 想要刪除此檔案：",
		"chat.createFile": "Cline 想要建立一個新檔案：",
		"chat.readFile": "Cline 想要讀取此檔案：",
		"chat.viewTopLevelFiles": "Cline 想要檢視此目錄中的頂級檔案：",
		"chat.viewedTopLevelFiles": "Cline 檢視了此目錄中的頂級檔案：",
		"chat.viewAllFiles": "Cline 想要遞迴檢視此目錄中的所有檔案：",
		"chat.viewedAllFiles": "Cline 遞迴檢視了此目錄中的所有檔案：",
		"chat.viewCodeDefinitions": "Cline 想要檢視此目錄中使用的原始碼定義名稱：",
		"chat.viewedCodeDefinitions": "Cline 檢視了此目錄中使用的原始碼定義名稱：",
		"chat.searchDirectory": "Cline 想要在此目錄中搜索",
		"chat.condensingConversation": "Cline 正在壓縮對話：",
		"chat.fetchUrl": "Cline 想要從此 URL 取得內容：",
		"chat.fetchedUrl": "Cline 從此 URL 取得了內容：",
		"chat.searchWeb": "Cline 想要在網上搜索：",
		"chat.searchedWeb": "Cline 在網上搜索了：",
		"chat.loadedSkill": "Cline 載入了技能：",
		"chat.mcpNotification": "MCP 通知：",
		"chat.thinking": "思考中",
		"chat.thinkingEllipsis": "思考中...",
		"chat.loadingMcpDocumentation": "正在載入 MCP 文件",
		"chat.generatingExplanation": "正在生成解釋",
		"chat.failedToGenerateExplanation": "生成解釋失敗",
		"chat.explanationCancelled": "解釋已取消",
		"chat.generatedExplanation": "已生成解釋",
		"chat.autoRetryFailed": "自動重試失敗",
		"chat.autoRetryInProgress": "自動重試進行中",
		"chat.autoRetryFailedMessage": "自動重試在 {maxAttempts} 次嘗試後失敗。需要手動干預。",
		"chat.autoRetryProgressMessage": "第 {attempt} 次嘗試，共 {maxAttempts} 次 - {delaySeconds} 秒後重試...",
		"chat.startNewTask": "Cline 想要開始一個新任務：",
		"chat.condenseConversation": "Cline 想要壓縮您的對話：",
		"chat.createGithubIssue": "Cline 想要建立一個 Github issue：",
		"chat.conditionalRulesApplied": "應用了條件規則：",
		"chat.fileOutsideWorkspace": "此檔案在您的工作區之外",
		"chat.directoryOutsideWorkspace": "此目錄在您的工作區之外",
		"chat.urlExternal": "此 URL 是外部連結",
		"chat.searchExternal": "此搜索是外部搜索",
	},
}

// 翻译函数
export const t = (key: TranslationKey, language?: SupportedLanguage, params?: Record<string, string | number>): string => {
	const lang = language || "English"
	let translation = translations[lang][key] || translations["English"][key]

	// 替换参数
	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			translation = translation.replace(new RegExp(`\\{${key}\\}`), String(value))
		})
	}

	return translation
}

// 翻译钩子
export const useTranslation = () => {
	const { preferredLanguage } = useExtensionState()

	return {
		t: (key: TranslationKey, params?: Record<string, string | number>) => {
			return t(key, preferredLanguage as SupportedLanguage, params)
		},
	}
}
