'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Plus, Key, Copy, Check, Trash2, AlertTriangle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { apiRequest } from '@/lib/auth'

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
        body: JSON.stringify({ name: keyName, rateLimit })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error)
        return
      }
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
    if (!confirm('Revoke this key? This cannot be undone.')) return
    await apiRequest(`/projects/${id}/keys/${keyId}`, { method: 'DELETE' })
    fetchProject()
  }

  const copyKey = () => {
    navigator.clipboard.writeText(newKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{project?.name}</h1>
          {project?.description && (
            <p className="text-sm text-gray-500 mt-1">{project.description}</p>
          )}
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Generate Key
        </button>
      </div>

      {/* How to use */}
      <div className="bg-gray-900 rounded-xl p-5 mb-6">
        <p className="text-gray-400 text-xs mb-3 font-medium uppercase tracking-wide">How to use your key</p>
        <code className="text-green-400 text-sm">
          curl -H &quot;X-API-Key: gk_live_xxxx...&quot; https://your-gateway-url/service-a/data
        </code>
      </div>

      {/* Keys list */}
      <div className="bg-white border border-gray-100 rounded-xl">
        <div className="px-5 py-4 border-b border-gray-50">
          <h2 className="font-medium text-gray-900">API Keys</h2>
        </div>

        {project?.apiKeys?.length === 0 ? (
          <div className="p-16 text-center">
            <Key className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No keys yet. Generate your first API key.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {project?.apiKeys?.map((key: any) => (
              <div key={key.id} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${key.isActive ? 'bg-green-400' : 'bg-gray-300'}`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{key.name}</p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{key.keyPrefix}••••••••</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Rate limit</p>
                    <p className="text-sm font-medium text-gray-700">{key.rateLimit}/min</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Last used</p>
                    <p className="text-sm text-gray-700">
                      {key.lastUsedAt ? new Date(key.lastUsedAt).toLocaleDateString() : 'Never'}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    key.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {key.isActive ? 'Active' : 'Revoked'}
                  </span>
                  {key.isActive && (
                    <button
                      onClick={() => revokeKey(key.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create key modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Generate API key</h2>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Key name</label>
                <input
                  type="text"
                  value={keyName}
                  onChange={e => setKeyName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Production Key"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rate limit (requests/min)
                </label>
                <input
                  type="number"
                  value={rateLimit}
                  onChange={e => setRateLimit(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  min={1}
                  max={1000}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setShowCreateModal(false); setError('') }}
                className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={createKey}
                disabled={creating}
                className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
              >
                {creating ? 'Generating...' : 'Generate key'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show key modal — one time only */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Save your API key</h2>
                <p className="text-sm text-red-600">This key will not be shown again.</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4 flex items-center gap-3">
              <code className="text-sm text-gray-800 flex-1 break-all font-mono">{newKey}</code>
              <button
                onClick={copyKey}
                className="flex-shrink-0 text-gray-400 hover:text-indigo-600 transition-colors"
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>

            <p className="text-xs text-gray-500 mb-6">
              Store this key in a secure location like an environment variable. Once you close this dialog, you will not be able to see it again.
            </p>

            <button
              onClick={() => setShowKeyModal(false)}
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700"
            >
              I&apos;ve saved my key
            </button>
          </div>
        </div>
      )}
    </div>
  )
}