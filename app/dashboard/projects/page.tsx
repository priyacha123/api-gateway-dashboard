'use client'

import { useEffect, useState } from 'react'
import { Plus, FolderOpen, Key, Trash2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { apiRequest } from '@/lib/auth'

export default function ProjectsPage() {
  useAuth()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')

  const fetchProjects = async () => {
    const res = await apiRequest('/projects')
    const data = await res.json()
    setProjects(data)
    setLoading(false)
  }

  useEffect(() => { fetchProjects() }, [])

  const createProject = async () => {
    if (!name.trim()) return
    setCreating(true)
    setError('')
    try {
      const res = await apiRequest('/projects', {
        method: 'POST',
        body: JSON.stringify({ name, description })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error)
        return
      }
      setShowModal(false)
      setName('')
      setDescription('')
      fetchProjects()
    } finally {
      setCreating(false)
    }
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
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your API projects and keys</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-16 text-center">
          <FolderOpen className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <h3 className="font-medium text-gray-900 mb-2">No projects yet</h3>
          <p className="text-gray-500 text-sm mb-6">Create your first project to start generating API keys.</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
          >
            Create your first project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {projects.map(project => (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className="bg-white border border-gray-100 rounded-xl p-5 hover:border-indigo-200 transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-indigo-600" />
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{project.name}</h3>
              {project.description && (
                <p className="text-sm text-gray-500 mb-3 truncate">{project.description}</p>
              )}
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Key className="w-3 h-3" />
                <span>{project._count?.apiKeys || 0} keys</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Create project modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Create project</h2>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="My App"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
                <input
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="What is this project for?"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setShowModal(false); setError('') }}
                className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={createProject}
                disabled={creating || !name.trim()}
                className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}