export const SOLVE_LANGUAGES = [
  { value: 'JAVA', label: 'Java', monacoLanguage: 'java' },
  { value: 'PYTHON', label: 'Python', monacoLanguage: 'python' },
  { value: 'CPP', label: 'C++', monacoLanguage: 'cpp' },
  { value: 'JAVASCRIPT', label: 'JavaScript', monacoLanguage: 'javascript' },
]

export const SOLVE_LANGUAGE_OPTIONS = SOLVE_LANGUAGES.map((language) => ({
  value: language.value,
  label: language.label,
}))

export const DEFAULT_TEMPLATES = {
  JAVA: `public class Solution {
    public String solve(String input) {
        // TODO
        return input;
    }
}`,
  PYTHON: `def solve(input_data):
    # TODO
    return input_data
`,
  CPP: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    string solve(const string& input) {
        // TODO
        return input;
    }
};`,
  JAVASCRIPT: `export default function solve(input) {
  // TODO
  return input
}`,
}

export function getMonacoLanguage(language) {
  return SOLVE_LANGUAGES.find((item) => item.value === language)?.monacoLanguage || 'javascript'
}

export function getStarterTemplate(problem, language) {
  const starterCode = problem?.starterCode || {}
  const lowerKey = language.toLowerCase()

  if (starterCode[lowerKey]) {
    return String(starterCode[lowerKey])
  }

  return DEFAULT_TEMPLATES[language] || ''
}

export function buildStarterCodeMap(problem) {
  return SOLVE_LANGUAGES.reduce((accumulator, language) => {
    accumulator[language.value] = getStarterTemplate(problem, language.value)
    return accumulator
  }, {})
}
