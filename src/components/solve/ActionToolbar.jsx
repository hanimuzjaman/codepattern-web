import { LanguageSelector } from './LanguageSelector'

export function ActionToolbar({
  language,
  onLanguageChange,
  languageOptions,
  theme,
  onThemeChange,
  isRunning,
  isSubmitting,
  isSaving,
  onRun,
  onSubmit,
  onSave,
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 lg:flex-row lg:items-center lg:justify-between">
      <LanguageSelector value={language} onChange={onLanguageChange} options={languageOptions} />

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onThemeChange(theme === 'vs' ? 'vs-dark' : 'vs')}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white"
        >
          {theme === 'vs' ? 'Dark Theme' : 'Light Theme'}
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="rounded-md border border-cyan-300 px-3 py-2 text-sm font-medium text-cyan-700 hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? 'Saving...' : 'Save Draft'}
        </button>
        <button
          type="button"
          onClick={onRun}
          disabled={isRunning || isSubmitting}
          className="rounded-md bg-slate-700 px-3 py-2 text-sm font-medium text-white hover:bg-slate-600 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isRunning ? 'Running...' : 'Run'}
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isRunning || isSubmitting}
          className="rounded-md bg-cyan-600 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-500 disabled:cursor-not-allowed disabled:bg-cyan-300"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  )
}