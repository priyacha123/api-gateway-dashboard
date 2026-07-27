'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Key, FolderOpen, Terminal, Check, Copy } from 'lucide-react'
import { apiRequest } from '@/lib/auth'
import { GATEWAY_URL } from '@/lib/constants'

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [projectName, setProjectName] = useState('')
  const [project, setProject] = useState<any>(null)
  const [apiKey, setApiKey] = useState('')
  const [creating, setCreating] = useState(false)
  const [copied, setCopied] = useState('')
  const [error, setError] = useState('')

  const createProject = async () => {
    if (!projectName.trim()) return
    setCreating(true)
    setError('')
    try {
      const res = await apiRequest('/projects', {
        method: 'POST',
        body: JSON.stringify({ name: projectName })
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      setProject(data)
      setStep(2)
    } finally { setCreating(false) }
  }

  const generateKey = async () => {
    setCreating(true)
    try {
      const res = await apiRequest(`/projects/${project.id}/keys`, {
        method: 'POST',
        body: JSON.stringify({ name: 'My first key', rateLimit: 60 })
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      setApiKey(data.key)
      setStep(3)
    } finally { setCreating(false) }
  }

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  const steps = [
    { num: 1, label: 'Create project', icon: <FolderOpen className="w-3.5 h-3.5" /> },
    { num: 2, label: 'Generate key', icon: <Key className="w-3.5 h-3.5" /> },
    { num: 3, label: 'Make a request', icon: <Terminal className="w-3.5 h-3.5" /> }
  ]

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-10">
          <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center">
            <Key className="w-4 h-4 border-gray-500 text-gray-900" />
          </div>
          <span className="font-semibold text-gray-900">GateKey</span>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-medium transition-colors ${
                step === s.num ? 'bg-white text-gray-900' :
                step > s.num ? 'bg-green-500/20 text-emerald-600' :
                'bg-white/10 text-gray-500'
              }`}>
                {step > s.num ? <Check className="w-3 h-3" /> : s.icon}
                {s.label}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-6 h-px ${step > s.num ? 'bg-green-500/40' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-7 shadow-2xl">

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center mb-5">
                <FolderOpen className="w-5 h-5 text-gray-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1 tracking-tight">Create your first project</h2>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                Projects group your API keys. Give it a name that reflects your app or service.
              </p>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Project name</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && createProject()}
                  autoFocus
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-black"
                  placeholder="My App"
                />
              </div>

              <button
                onClick={createProject}
                disabled={creating || !projectName.trim()}
                className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 disabled:opacity-50 transition-colors"
              >
                {creating ? 'Creating...' : 'Create project →'}
              </button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center mb-5">
                <Key className="w-5 h-5 text-gray-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1 tracking-tight">Generate your first API key</h2>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                We&apos;ll create a secure key for your project. Copy it when it appears — it&apos;s shown only once.
              </p>

              <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 mb-6 flex items-center gap-3">
                <FolderOpen className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{project?.name}</p>
                  <p className="text-xs text-green-600 mt-0.5">Project created successfully</p>
                </div>
              </div>

              <button
                onClick={generateKey}
                disabled={creating}
                className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 disabled:opacity-50 transition-colors"
              >
                {creating ? 'Generating...' : 'Generate API key →'}
              </button>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <div className="w-10 h-10 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center mb-5">
                <Terminal className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1 tracking-tight">Your key is ready</h2>
              <p className="text-xs text-red-600 font-medium mb-4">⚠ Save this key now — it won&apos;t be shown again.</p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center gap-3 mb-5">
                <code className="text-xs text-gray-800 flex-1 break-all font-mono leading-relaxed">{apiKey}</code>
                <button onClick={() => copy(apiKey, 'key')} className="shrink-0 text-gray-400 hover:text-gray-700">
                  {copied === 'key' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-3">Make your first request</p>

              <div className="bg-gray-950 rounded-lg p-4 mb-2 flex items-start gap-3">
                <code className="text-green-400 text-xs font-mono flex-1 break-all leading-relaxed">
                  {`curl -H "X-API-Key: ${apiKey}" ${GATEWAY_URL}/service-a/data`}
                </code>
                <button onClick={() => copy(`curl -H "X-API-Key: ${apiKey}" ${GATEWAY_URL}/service-a/data`, 'curl')} className="shrink-0 text-gray-500 hover:text-white">
                  {copied === 'curl' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <button
                onClick={() => router.push('/dashboard')}
                className="w-full mt-4 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Go to dashboard →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}