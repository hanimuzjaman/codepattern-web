import { ResultBanner } from './ResultBanner'

const TABS = [
  { id: 'output', label: 'Output' },
  { id: 'tests', label: 'Test Results' },
  { id: 'history', label: 'Submission History' },
  { id: 'saved', label: 'Saved Status' },
]

export function OutputTabs({ activeTab, onTabChange, runResult, submitResult, saveResult }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap border-b border-slate-200 bg-slate-50">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-3 text-sm font-medium ${activeTab === tab.id ? 'border-b-2 border-cyan-600 text-cyan-700' : 'text-slate-600 hover:text-slate-900'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-3 p-4">
        {activeTab === 'output' ? (
          runResult ? (
            <ResultBanner
              tone={runResult.status === 'COMPLETED' ? 'success' : 'warning'}
              title={`Run Result - ${runResult.status}`}
              message={runResult.output || runResult.feedback || 'No output returned.'}
              meta={`Runtime: ${runResult.runtimeMs} ms${runResult.memoryKb ? ` | Memory: ${runResult.memoryKb} KB` : ''}`}
            />
          ) : (
            <p className="text-sm text-slate-600">Run your code to see output here.</p>
          )
        ) : null}

        {activeTab === 'tests' ? (
          submitResult ? (
            <div className="space-y-3">
              <ResultBanner
                tone={submitResult.status === 'ACCEPTED' ? 'success' : submitResult.status === 'WRONG_ANSWER' ? 'warning' : 'error'}
                title={`Submission - ${submitResult.status}`}
                message={submitResult.feedback || 'No feedback returned.'}
                meta={`Passed ${submitResult.passedCount}/${submitResult.totalCount} | Runtime: ${submitResult.runtimeMs} ms`}
              />
              <div className="space-y-2">
                {submitResult.testResults?.map((testResult) => (
                  <div key={testResult.name} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <strong className="text-slate-900">{testResult.name}</strong>
                      <span className={testResult.passed ? 'text-emerald-700' : 'text-rose-700'}>
                        {testResult.passed ? 'Passed' : 'Failed'}
                      </span>
                    </div>
                    <p className="mt-2 text-slate-700">Expected: {testResult.expected}</p>
                    <p className="mt-1 text-slate-700">Actual: {testResult.actual}</p>
                    <p className="mt-1 text-slate-500">{testResult.message}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-600">Submit your code to see hidden test results.</p>
          )
        ) : null}

        {activeTab === 'history' ? (
          <p className="text-sm text-slate-600">Submission history is reserved for Phase 6 and beyond.</p>
        ) : null}

        {activeTab === 'saved' ? (
          saveResult ? (
            <ResultBanner
              tone="success"
              title="Draft Saved"
              message="Your latest draft is stored locally and in the backend draft store."
              meta={`Updated ${new Date(saveResult.updatedAt).toLocaleString()}`}
            />
          ) : (
            <p className="text-sm text-slate-600">Save a draft to persist code for this problem and language.</p>
          )
        ) : null}
      </div>
    </section>
  )
}