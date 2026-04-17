import { Suspense, lazy } from 'react'

const MonacoEditor = lazy(() => import('@monaco-editor/react'))

export function CodeEditor({ language, value, onChange, theme }) {
  return (
    <div className="min-h-[420px] overflow-hidden rounded-xl border border-slate-200 bg-white">
      <Suspense
        fallback={(
          <div className="flex h-[420px] items-center justify-center text-sm text-slate-500">
            Loading editor...
          </div>
        )}
      >
        <MonacoEditor
          height="420px"
          defaultLanguage={language}
          language={language}
          theme={theme}
          value={value}
          onChange={(nextValue) => onChange(nextValue || '')}
          options={{
            automaticLayout: true,
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            tabSize: 2,
          }}
        />
      </Suspense>
    </div>
  )
}