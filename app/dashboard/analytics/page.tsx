'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { useAuth } from '@/hooks/useAuth'

export default function AnalyticsPage() {
  useAuth()
  const [metrics, setMetrics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMetrics = async () => {
      const res = await fetch('/api/metrics')
      const data = await res.json()
      setMetrics(data)
      setLoading(false)
    }
    fetchMetrics()
    const interval = setInterval(fetchMetrics, 10000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Analytics</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Requests today', value: metrics?.totalToday || 0 },
          { label: 'Avg response time', value: `${metrics?.avgResponseTime || 0}ms` },
          { label: '4xx errors', value: metrics?.errorRate4xx || 0 },
          { label: '5xx errors', value: metrics?.errorRate5xx || 0 }
        ].map(card => (
          <div key={card.label} className="bg-white border border-gray-100 rounded-xl p-5">
            <p className="text-sm text-gray-500 mb-1">{card.label}</p>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Request log table */}
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <h2 className="font-medium text-gray-900 mb-4">Recent requests</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-50">
              <th className="pb-3 font-medium">Method</th>
              <th className="pb-3 font-medium">Route</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Time</th>
              <th className="pb-3 font-medium">User</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {metrics?.recentLogs?.map((log: any) => (
              <tr key={log.id}>
                <td className="py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                    log.method === 'GET' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
                  }`}>
                    {log.method}
                  </span>
                </td>
                <td className="py-2.5 font-mono text-xs text-gray-600">{log.route}</td>
                <td className="py-2.5">
                  <span className={`text-xs font-medium ${
                    log.statusCode >= 500 ? 'text-red-600' :
                    log.statusCode >= 400 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {log.statusCode}
                  </span>
                </td>
                <td className="py-2.5 text-gray-400 text-xs">{log.responseTime}ms</td>
                <td className="py-2.5 text-gray-500 text-xs truncate max-w-32">
                  {log.user?.email || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}