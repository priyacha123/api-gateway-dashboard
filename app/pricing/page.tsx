import Link from 'next/link'
import { Shield, Zap, BarChart3, Key, ArrowRight, Check } from 'lucide-react'
import { PLANS } from '@/lib/constants'

export default function LandingPage() {
  const features = [
              {
                icon: <Key className="w-6 h-6 text-indigo-600" />,
                title: 'API Key Management',
                desc: 'Generate, rotate, and revoke API keys with SHA-256 hashing. Keys are shown once and never stored in plain text.'
              },
              {
                icon: <Zap className="w-6 h-6 text-indigo-600" />,
                title: 'Rate Limiting',
                desc: 'Sliding window rate limiting via Redis. Set custom limits per key. Protect your services from abuse automatically.'
              },
              {
                icon: <Shield className="w-6 h-6 text-indigo-600" />,
                title: 'Circuit Breaker',
                desc: 'Auto-detect failing services and stop cascading failures. CLOSED → OPEN → HALF-OPEN recovery built in.'
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-indigo-600" />,
                title: 'Usage Analytics',
                desc: 'See requests over time, error rates, and top keys by usage. All filtered by project.'
              },
              {
                icon: <Shield className="w-6 h-6 text-indigo-600" />,
                title: 'Request Logging',
                desc: 'Every request logged with trace ID, response time, and status code. Full audit trail out of the box.'
              },
              {
                icon: <Zap className="w-6 h-6 text-indigo-600" />,
                title: 'Multi-project Support',
                desc: 'Organize keys by project. Different apps, different limits, one dashboard.'
              }
            ]
            
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-indigo-600" />
            <span className="font-semibold text-gray-900 text-lg">GateKey</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Login</Link>
            <Link href="/register" className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-sm px-3 py-1 rounded-full mb-6">
          <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
          API key management for developers
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Secure API keys.<br />Built-in rate limiting.<br />
          <span className="text-indigo-600">Zero config.</span>
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
          GateKey gives your APIs production-grade security in minutes.
          Generate keys, set rate limits, monitor usage — all from one dashboard.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/register" className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
            Start for free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/pricing" className="text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            View pricing
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Everything your API needs</h2>
          <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">Stop building auth and rate limiting from scratch. GateKey handles it so you can focus on your product.</p>
          <div className="grid grid-cols-3 gap-8">
            {features.map(f => (
              <div key={f.title} className="bg-white p-6 rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple pricing</h2>
          <p className="text-gray-500 mb-10">Start free. Upgrade when you need more.</p>
          <Link href="/pricing" className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:underline">
            See full pricing <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-gray-900">GateKey</span>
          </div>
          <p className="text-sm text-gray-400">Built by Priya Kumari</p>
        </div>
      </footer>
    </div>
  )
}