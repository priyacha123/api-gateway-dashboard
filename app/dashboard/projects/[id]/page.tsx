'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Plus, Key, Copy, Check, Trash2, AlertTriangle, X, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { apiRequest } from '@/lib/auth'
import { GATEWAY_URL } from '@/lib/constants'

export default function ProjectDetailPage() {
  useAuth()
  const { id } = useParams()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [newKey, setNewKey] = useState('')
  const [keyName, setKeyName] = useState('')
  const [rateLimit, setRateLimit] = useState(60)
  const [creating, setCreating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copiedSnippet, setCopiedSnippet] = useState('')
  const [error, setError] = useState('')

  const fetchProject = async () => {
    const res = await apiRequest(`/projects/${id}`)
    const data = await res.json()
    setProject(data)
    setLoading(false)
  }

  useEffect(() => { fetchProject() }, [id])

  const createKey = async () => {
    setCreating(true)
    setError('')
    try {
      const res = await apiRequest(`/projects/${id}/keys`, {
        method: 'POST',
        body: JSON.stringify({ name: keyName || 'My API Key', rateLimit })
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      setShowCreateModal(false)
      setNewKey(data.key)
      setShowKeyModal(true)
      setKeyName('')
      setRateLimit(60)
      fetchProject()
    } finally {
      setCreating(false)
    }
  }

  const revokeKey = async (keyId: string) => {
    if (!confirm('Revoke this key? All requests using it will return 401 immediately.')) return
    await apiRequest(`/projects/${id}/keys/${keyId}`, { method: 'DELETE' })
    fetchProject()
  }

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSnippet(label)
    setTimeout(() => setCopiedSnippet(''), 2000)
  }

  const copyKey = () => {
    navigator.clipboard.writeText(newKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const activeKeys = project?.apiKeys?.filter((k: any) => k.isActive) ?? []
  const revokedKeys = project?.apiKeys?.filter((k: any) => !k.isActive) ?? []

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard/projects" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors mb-4">
          <ArrowLeft className="w-3 h-3" /> Projects
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight">{project?.name}</h1>
            {project?.description && <p className="text-sm text-gray-500 mt-0.5">{project.description}</p>}
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-gray-900 text-white px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Generate Key
          </button>
        </div>
      </div>

      {/* Code snippet */}
      <div className="bg-gray-950 rounded-xl p-5 mb-6">
        <p className="text-gray-500 text-xs font-medium tracking-wide mb-3">bash</p>
        <code className="text-green-400 text-sm font-mono">
          curl -H &quot;X-API-Key: gk_live_••••••••&quot; {GATEWAY_URL}/service-a/data
        </code>
      </div>

      {/* Active keys */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden mb-4">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900">Active keys <span className="text-gray-400 ml-1">({activeKeys.length})</span></h2>
        </div>

        {activeKeys.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <Key className="w-8 h-8 text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No active keys. Generate your first API key.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {activeKeys.map((key: any) => (
              <div key={key.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{key.name}</p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{key.keyPrefix}••••••••••••••••</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Rate limit</p>
                    <p className="text-sm font-medium text-gray-700">{key.rateLimit}/min</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Last used</p>
                    <p className="text-sm text-gray-600">
                      {key.lastUsedAt ? new Date(key.lastUsedAt).toLocaleDateString() : 'Never'}
                    </p>
                  </div>
                  <button
                    onClick={() => revokeKey(key.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                    title="Revoke key"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Revoked keys */}
      {revokedKeys.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="text-sm font-medium text-gray-400">Revoked keys <span className="ml-1">({revokedKeys.length})</span></h2>
          </div>
          <div className="divide-y divide-gray-50">
            {revokedKeys.map((key: any) => (
              <div key={key.id} className="flex items-center justify-between px-6 py-4 opacity-50">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-gray-300 rounded-full shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{key.name}</p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{key.keyPrefix}••••••••••••••••</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 px-2 py-1 bg-gray-50 rounded">Revoked</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create key modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-gray-900">Generate API key</h2>
              <button onClick={() => { setShowCreateModal(false); setError('') }} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Key name</label>
                <input
                  type="text"
                  value={keyName}
                  onChange={e => setKeyName(e.target.value)}
                  autoFocus
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-black"
                  placeholder="Production Key"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Rate limit <span className="text-gray-400 font-normal">(requests/min)</span>
                </label>
                <input
                  type="number"
                  value={rateLimit}
                  onChange={e => setRateLimit(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-black"
                  min={1} max={1000}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setShowCreateModal(false); setError('') }}
                className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={createKey}
                disabled={creating}
                className="flex-1 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 disabled:opacity-50"
              >
                {creating ? 'Generating...' : 'Generate key'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show key modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-yellow-50 rounded-full flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Save your API key</h2>
                <p className="text-xs text-red-600 mt-0.5">This key will not be shown again.</p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex items-center gap-3 mb-5">
              <code className="text-sm text-gray-800 flex-1 break-all font-mono leading-relaxed">{newKey}</code>
              <button onClick={copyKey} className="shrink-0 text-gray-400 hover:text-gray-700 transition-colors">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="space-y-3 mb-5">
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Usage</p>
              {[
                { label: 'curl', code: `curl -H "X-API-Key: ${newKey}" ${GATEWAY_URL}/service-a/data` },
                { label: 'fetch', code: `fetch("${GATEWAY_URL}/service-a/data", {\n  headers: { "X-API-Key": "${newKey}" }\n})` }
              ].map(s => (
                <div key={s.label} className="bg-gray-950 rounded-lg p-3 flex items-start gap-3">
                  <code className="text-green-400 text-xs font-mono flex-1 break-all whitespace-pre-wrap leading-relaxed">{s.code}</code>
                  <button
                    onClick={() => copy(s.code, s.label)}
                    className="shrink-0 text-gray-500 hover:text-white transition-colors"
                  >
                    {copiedSnippet === s.label ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowKeyModal(false)}
              className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              I&apos;ve saved my key
            </button>
          </div>
        </div>
      )}
    </div>
  )
}