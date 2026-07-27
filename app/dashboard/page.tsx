'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FolderOpen, Key, Activity, ArrowRight, Plus, TrendingUp } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { apiRequest, internalApiRequest } from '@/lib/auth'

export default function DashboardOverview() {
  const { user } = useAuth()
  const [billing, setBilling] = useState<any>(null)
  const [metrics, setMetrics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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
      <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const stats = [
    {
      label: 'Projects',
      value: `${billing?.usage?.projects ?? 0}`,
      sub: `of ${billing?.limits?.projects ?? 10}`,
      icon: <FolderOpen className="w-4 h-4 text-gray-600" />,
      href: '/dashboard/projects'
    },
    {
      label: 'Active Keys',
      value: `${billing?.usage?.activeKeys ?? 0}`,
      sub: 'total keys',
      icon: <Key className="w-4 h-4 text-gray-600" />,
      href: '/dashboard/projects'
    },
    {
      label: 'Requests Today',
      value: `${metrics?.totalToday ?? 0}`,
      sub: `avg ${metrics?.avgResponseTime ?? 0}ms`,
      icon: <Activity className="w-4 h-4 text-gray-600" />,
      href: '/dashboard/analytics'
    },
    {
      label: 'Error Rate',
      value: `${metrics?.errorRate4xx + metrics?.errorRate5xx ?? 0}`,
      sub: '4xx + 5xx today',
      icon: <TrendingUp className="w-4 h-4 text-gray-600" />,
      href: '/dashboard/analytics'
    }
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">Overview</h1>
          <p className="text-sm text-gray-500 mt-0.5">{user?.email}</p>
        </div>
        <Link
          href="/dashboard/projects"
          className="flex items-center gap-2 bg-gray-900 text-white px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> New Project
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white border border-gray-100 rounded-xl p-5 hover:border-gray-200 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center">
                {stat.icon}
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
            </div>
            <p className="text-2xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
          </Link>
        ))}
      </div>

      {/* Upgrade banner */}
      {billing?.plan === 'FREE' && (
        <div className="bg-gray-900 rounded-xl p-5 flex items-center justify-between mb-8">
          <div>
            <p className="font-medium text-white text-sm">You&apos;re on the Free plan</p>
            <p className="text-gray-400 text-xs mt-1">
              Upgrade to Pro for unlimited projects, keys, and 1000 req/min.
            </p>
          </div>
          <Link
            href="/dashboard/billing"
            className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors whitespace-nowrap shrink-0"
          >
            Upgrade to Pro →
          </Link>
        </div>
      )}

      {/* Recent requests */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900">Recent requests</h2>
          <Link href="/dashboard/analytics" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
            View all →
          </Link>
        </div>

        {!metrics?.recentLogs?.length ? (
          <div className="px-6 py-12 text-center">
            <Activity className="w-8 h-8 text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No requests yet. Use your API key to get started.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-50">
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Method</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Route</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {metrics.recentLogs.slice(0, 8).map((log: any) => (
                <tr key={log.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded font-mono font-medium ${
                      log.method === 'GET' ? 'bg-blue-50 text-blue-700' :
                      log.method === 'POST' ? 'bg-green-50 text-green-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {log.method}
                    </span>
                  </td>
                  <td className="px-6 py-3 font-mono text-xs text-gray-600">{log.route}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs font-semibold ${
                      log.statusCode >= 500 ? 'text-red-600' :
                      log.statusCode >= 400 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {log.statusCode}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-xs text-gray-400">{log.responseTime}ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}