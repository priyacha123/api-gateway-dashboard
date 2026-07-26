'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FolderOpen, Key, Activity, ArrowRight, Plus } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { apiRequest, internalApiRequest } from '@/lib/auth'

export default function DashboardOverview() {
  const { user } = useAuth()
  const [billing, setBilling] = useState<any>(null)
  const [metrics, setMetrics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const stats = [
  {
    label: 'Projects',
    value: `${billing?.usage?.projects || 0} / ${billing?.limits?.projects || 10}`,
    icon: <FolderOpen className="w-5 h-5 text-indigo-600" />,
            href: '/dashboard/projects'
  },
  {
    label: 'Active Keys',
    value: billing?.usage?.activeKeys || 0,
    icon: <Key className="w-5 h-5 text-indigo-600" />,
            href: '/dashboard/projects'
  },
  {
    label: 'Requests Today',
    value: metrics?.totalToday || 0,
    icon: <Activity className="w-5 h-5 text-indigo-600" />,
            href: '/dashboard/analytics'
  }
]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [billingRes, metricsRes] = await Promise.all([
          apiRequest('/billing/status'),
          internalApiRequest('/api/metrics')
        ])
        const [billingData, metricsData] = await Promise.all([
          billingRes.json(),
          metricsRes.json()
        ])
        setBilling(billingData)
        setMetrics(metricsData)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, {user?.email}</p>
        </div>
        <Link
          href="/dashboard/projects"
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> New Project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map(stat => (
          <Link key={stat.label} href={stat.href}
            className="bg-white border border-gray-100 rounded-xl p-5 hover:border-indigo-200 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center">
                {stat.icon}
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Plan banner */}
      {billing?.plan === 'FREE' && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="font-medium text-indigo-900">You&apos;re on the Free plan</p>
            <p className="text-sm text-indigo-600 mt-0.5">
              Upgrade to PRO for unlimited projects, keys, and higher rate limits.
            </p>
          </div>
          <Link
            href="/dashboard/billing"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap"
          >
            Upgrade to PRO
          </Link>
        </div>
      )}

      {/* Recent requests */}
      {metrics?.recentLogs?.length > 0 && (
        <div className="mt-8 bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-gray-900">Recent Requests</h2>
            <Link href="/dashboard/analytics" className="text-sm text-indigo-600 hover:underline">
              View all
            </Link>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-50">
                <th className="pb-3 font-medium">Method</th>
                <th className="pb-3 font-medium">Route</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {metrics.recentLogs.slice(0, 5).map((log: any) => (
                <tr key={log.id}>
                  <td className="py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      log.method === 'GET' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
                    }`}>
                      {log.method}
                    </span>
                  </td>
                  <td className="py-2.5 text-gray-600 font-mono text-xs">{log.route}</td>
                  <td className="py-2.5">
                    <span className={`text-xs font-medium ${
                      log.statusCode >= 500 ? 'text-red-600' :
                      log.statusCode >= 400 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {log.statusCode}
                    </span>
                  </td>
                  <td className="py-2.5 text-gray-400 text-xs">{log.responseTime}ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}