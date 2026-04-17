import { CodeEditor } from './CodeEditor'
import { ActionToolbar } from './ActionToolbar'
import { OutputTabs } from './OutputTabs'

export function EditorPanel({
  language,
  languageOptions,
  sourceCode,
  onSourceCodeChange,
  onLanguageChange,
  theme,
  onThemeChange,
  customInput,
  onCustomInputChange,
  onRun,
  onSubmit,
  onSave,
  isRunning,
  isSubmitting,
  isSaving,
  activeTab,
  onTabChange,
  runResult,
  submitResult,
  saveResult,
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <ActionToolbar
        language={language}
        onLanguageChange={onLanguageChange}
        languageOptions={languageOptions}
        theme={theme}
        onThemeChange={onThemeChange}
        isRunning={isRunning}
        isSubmitting={isSubmitting}
        isSaving={isSaving}
        onRun={onRun}
        onSubmit={onSubmit}
        onSave={onSave}
      />

      <CodeEditor
        language={language.toLowerCase()}
        value={sourceCode}
        onChange={onSourceCodeChange}
        theme={theme}
      />

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-700">Custom Input</span>
        <textarea
          value={customInput}
          onChange={(event) => onCustomInputChange(event.target.value)}
          rows={4}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-inner outline-none focus:border-cyan-500"
          placeholder="Optional input for Run"
        />
      </label>

      <OutputTabs
        activeTab={activeTab}
        onTabChange={onTabChange}
        runResult={runResult}
        submitResult={submitResult}
        saveResult={saveResult}
      />
    </section>
  )
}