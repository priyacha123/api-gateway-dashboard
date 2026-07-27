import Link from 'next/link'
import { Key } from 'lucide-react'
import { endpoints, header, quickLinks, quickStart, status } from '@/lib/constants'

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Key className="w-5 h-5 text-indigo-600" />
            <span className="font-semibold text-gray-900">GateKey</span>
          </Link>
          <Link href="/dashboard" className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Dashboard
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12 flex gap-12">
        {/* Sidebar nav */}
        <aside className="w-48 shrink-0">
          <nav className="sticky top-8 space-y-1">
            {quickLinks.map(link => (
                <a
                key={link.href}
                href={link.href}
                className="block text-sm text-gray-600 hover:text-indigo-600 py-1.5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 max-w-2xl">

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Documentation</h1>
          <p className="text-gray-500 mb-10">Everything you need to integrate GateKey into your application.</p>

          {/* Quick Start */}
          <section id="quickstart" className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Start</h2>
            <div className="space-y-4">
              {quickStart.map(s => (
                <div key={s.step} className="flex gap-4">
                  <div className="w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{s.title}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Authentication */}
          <section id="authentication" className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Authentication</h2>
            <p className="text-gray-600 text-sm mb-4">
              All API requests require authentication via an API key. Pass your key using one of these methods:
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">X-API-Key header (recommended)</p>
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-gray-500 text-xs font-medium tracking-wide mb-3">bash</p>
                  <code className="text-green-400 text-sm">
                    {`curl -H "X-API-Key: gk_live_xxx" https://your-gateway/service-a/data`}
                  </code>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Authorization header</p>
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-gray-500 text-xs font-medium tracking-wide mb-3">bash</p>
                  <code className="text-green-400 text-sm">
                    {`curl -H "Authorization: Bearer gk_live_xxx" https://your-gateway/service-a/data`}
                  </code>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mt-4">
              <p className="text-sm text-yellow-800">
                <strong>Security note:</strong> Never expose your API key in client-side code or public repositories. Use environment variables.
              </p>
            </div>
          </section>

          {/* Rate Limiting */}
          <section id="rate-limiting" className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Rate Limiting</h2>
            <p className="text-gray-600 text-sm mb-4">
              GateKey uses a sliding window algorithm to enforce rate limits per API key. Limits are set when you create a key.
            </p>

            <p className="text-sm font-medium text-gray-700 mb-2">Rate limit headers</p>
            <div className="bg-white border border-gray-100 rounded-lg overflow-hidden mb-4">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2.5 font-medium text-gray-600">Header</th>
                    <th className="text-left px-4 py-2.5 font-medium text-gray-600">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {header.map(row => (
                    <tr key={row.header}>
                      <td className="px-4 py-3 font-mono text-xs text-indigo-600">{row.header}</td>
                      <td className="px-4 py-3 text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm font-medium text-gray-700 mb-2">When rate limited</p>
            <div className="bg-gray-900 rounded-lg p-4">
              <code className="text-red-400 text-sm whitespace-pre">{`HTTP 429 Too Many Requests

{
  "error": "rate limit exceeded",
  "retryAfter": 60,
  "limit": 60
}`}</code>
            </div>
          </section>

          {/* Error codes */}
          <section id="errors" className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Error Codes</h2>
            <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2.5 font-medium text-gray-600">Status</th>
                    <th className="text-left px-4 py-2.5 font-medium text-gray-600">Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {status.map(row => (
                    <tr key={row.status}>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-mono font-bold ${
                          row.status.startsWith('2') ? 'text-green-600' :
                          row.status.startsWith('4') ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{row.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Endpoints */}
          <section id="endpoints" className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Endpoints</h2>
            <div className="space-y-3">
              {endpoints.map(ep => (
                <div key={`${ep.method}-${ep.path}`} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded font-mono w-17 text-center ${
                    ep.method === 'GET' ? 'bg-blue-50 text-blue-700' :
                    ep.method === 'POST' ? 'bg-green-50 text-green-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {ep.method}
                  </span>
                  <code className="text-sm text-gray-700 font-mono flex-1">{ep.path}</code>
                  <span className="text-sm text-gray-400">{ep.desc}</span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}