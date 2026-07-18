'use client'

import { useEffect, useState } from 'react'

type Log = {
  id: string
  method: string
  route: string
  statusCode: number
  responseTime: number
  createdAt: string
  user: { email: string; plan: string }
}

type Metrics = {
  totalToday: number
  avgResponseTime: number
  errorRate4xx: number
  errorRate5xx: number
  recentLogs: Log[]
}

type CBStatus = {
  service: string
  state: string
  failures: number
}

type RateLimit = {
  email: string
  plan: string
  used: number
  limit: number
  remaining: number
  percent: number
}

const STATE_COLORS: Record<string, string> = {
  CLOSED:            'bg-green-100 text-green-800',
  OPEN:              'bg-red-100 text-red-800',
  'HALF-OPEN':       'bg-yellow-100 text-yellow-800',
  'HALF-OPEN-PROBING': 'bg-yellow-100 text-yellow-800'
}

const METHOD_COLORS: Record<string, string> = {
  GET:    'bg-blue-100 text-blue-800',
  POST:   'bg-green-100 text-green-800',
  PUT:    'bg-yellow-100 text-yellow-800',
  DELETE: 'bg-red-100 text-red-800'
}

export default function Dashboard() {
  const [metrics, setMetrics]     = useState<Metrics | null>(null)
  const [cbStatus, setCbStatus]   = useState<CBStatus[]>([])
  const [rateLimits, setRateLimits] = useState<RateLimit[]>([])

  const fetchAll = async () => {
    const [m, cb, rl] = await Promise.all([
      fetch('/api/metrics').then(r => r.json()),
      fetch('/api/circuit-breaker').then(r => r.json()),
      fetch('/api/rate-limits').then(r => r.json())
    ])
    setMetrics(m)
    setCbStatus(cb.statuses)
    setRateLimits(rl.usage)
  }

  useEffect(() => {
    fetchAll()
    const interval = setInterval(fetchAll, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!metrics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-medium text-gray-900 mb-8">
        API Gateway Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Requests today',    value: metrics.totalToday },
          { label: 'Avg response time', value: `${metrics.avgResponseTime}ms` },
          { label: '4xx errors',        value: metrics.errorRate4xx },
          { label: '5xx errors',        value: metrics.errorRate5xx }
        ].map(card => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">{card.label}</p>
            <p className="text-2xl font-medium text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-medium text-gray-700 mb-4">
            Circuit breaker status
          </h2>
          <div className="space-y-3">
            {cbStatus.map(cb => (
              <div key={cb.service} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{cb.service}</p>
                  <p className="text-xs text-gray-500">{cb.failures} failures</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${STATE_COLORS[cb.state] || 'bg-gray-100 text-gray-800'}`}>
                  {cb.state}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-medium text-gray-700 mb-4">
            Rate limit usage
          </h2>
          <div className="space-y-4">
            {rateLimits.map(u => (
              <div key={u.email}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 truncate max-w-[180px]">{u.email}</span>
                  <span className="text-gray-500">{u.used}/{u.limit} · {u.plan}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${u.percent >= 90 ? 'bg-red-500' : u.percent >= 60 ? 'bg-yellow-400' : 'bg-green-500'}`}
                    style={{ width: `${Math.min(u.percent, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-medium text-gray-700 mb-4">
          Recent requests
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100">
              <th className="pb-3 font-medium">method</th>
              <th className="pb-3 font-medium">route</th>
              <th className="pb-3 font-medium">status</th>
              <th className="pb-3 font-medium">time</th>
              <th className="pb-3 font-medium">user</th>
              <th className="pb-3 font-medium">plan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {metrics.recentLogs.map(log => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${METHOD_COLORS[log.method] || 'bg-gray-100 text-gray-800'}`}>
                    {log.method}
                  </span>
                </td>
                <td className="py-2.5 text-gray-700 font-mono text-xs">{log.route}</td>
                <td className="py-2.5">
                  <span className={`text-xs font-medium ${log.statusCode >= 500 ? 'text-red-600' : log.statusCode >= 400 ? 'text-yellow-600' : 'text-green-600'}`}>
                    {log.statusCode}
                  </span>
                </td>
                <td className="py-2.5 text-gray-500">{log.responseTime}ms</td>
                <td className="py-2.5 text-gray-600 truncate max-w-[160px]">{log.user.email}</td>
                <td className="py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${log.user.plan === 'PRO' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700'}`}>
                    {log.user.plan}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}