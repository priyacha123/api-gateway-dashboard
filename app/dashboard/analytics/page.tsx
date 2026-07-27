'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { internalApiRequest } from '@/lib/auth'

export default function AnalyticsPage() {
  useAuth()
  const [metrics, setMetrics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const res = await internalApiRequest('/api/metrics')
      const data = await res.json()
      setMetrics(data)
      setLoading(false)
    }
    fetch()
    const interval = setInterval(fetch, 10000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-gray-900 tracking-tight">Analytics</h1>
        <p className="text-sm text-gray-500 mt-0.5">Updates every 10 seconds</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Requests today', value: metrics?.totalToday ?? 0, color: 'text-gray-900' },
          { label: 'Avg response time', value: `${metrics?.avgResponseTime ?? 0}ms`, color: 'text-gray-900' },
          { label: '4xx errors', value: metrics?.errorRate4xx ?? 0, color: metrics?.errorRate4xx > 0 ? 'text-yellow-600' : 'text-gray-900' },
          { label: '5xx errors', value: metrics?.errorRate5xx ?? 0, color: metrics?.errorRate5xx > 0 ? 'text-red-600' : 'text-gray-900' }
        ].map(card => (
          <div key={card.label} className="bg-white border border-gray-100 rounded-xl p-5">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">{card.label}</p>
            <p className={`text-2xl font-bold tracking-tight ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Request log */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50">
          <h2 className="text-sm font-medium text-gray-900">Request log</h2>
        </div>

        {!metrics?.recentLogs?.length ? (
          <div className="px-6 py-16 text-center text-sm text-gray-400">
            No requests yet. Make your first API call to see data here.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Response time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {metrics.recentLogs.map((log: any) => (
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
                  <td className="px-6 py-3 text-xs text-gray-500">{log.responseTime}ms</td>
                  <td className="px-6 py-3 text-xs text-gray-400">
                    {new Date(log.createdAt).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}