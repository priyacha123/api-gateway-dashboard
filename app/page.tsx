// import Link from 'next/link'
// import { Shield, Zap, BarChart3, Key, ArrowRight, Check } from 'lucide-react'
// import { PLANS } from '@/lib/constants'

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-white">

//       {/* Navbar */}
//       <nav className="border-b border-gray-100 px-6 py-4">
//         <div className="max-w-6xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Key className="w-5 h-5 text-indigo-600" />
//             <span className="font-semibold text-gray-900 text-lg">GateKey</span>
//           </div>
//           <div className="flex items-center gap-6">
//             <Link href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</Link>
//             <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</Link>
//             <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Login</Link>
//             <Link href="/register" className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
//               Get Started
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Hero */}
//       <section className="max-w-6xl mx-auto px-6 py-24 text-center">
//         <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-sm px-3 py-1 rounded-full mb-6">
//           <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
//           API key management for developers
//         </div>
//         <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
//           Secure API keys.<br />Built-in rate limiting.<br />
//           <span className="text-indigo-600">Zero config.</span>
//         </h1>
//         <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
//           GateKey gives your APIs production-grade security in minutes.
//           Generate keys, set rate limits, monitor usage — all from one dashboard.
//         </p>
//         <div className="flex items-center justify-center gap-4">
//           <Link href="/register" className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
//             Start for free <ArrowRight className="w-4 h-4" />
//           </Link>
//           <Link href="/pricing" className="text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
//             View pricing
//           </Link>
//         </div>
//       </section>

//       {/* Features */}
//       <section id="features" className="bg-gray-50 py-24">
//         <div className="max-w-6xl mx-auto px-6">
//           <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Everything your API needs</h2>
//           <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">Stop building auth and rate limiting from scratch. GateKey handles it so you can focus on your product.</p>
//           <div className="grid grid-cols-3 gap-8">
//             {[
//               {
//                 icon: <Key className="w-6 h-6 text-indigo-600" />,
//                 title: 'API Key Management',
//                 desc: 'Generate, rotate, and revoke API keys with SHA-256 hashing. Keys are shown once and never stored in plain text.'
//               },
//               {
//                 icon: <Zap className="w-6 h-6 text-indigo-600" />,
//                 title: 'Rate Limiting',
//                 desc: 'Sliding window rate limiting via Redis. Set custom limits per key. Protect your services from abuse automatically.'
//               },
//               {
//                 icon: <Shield className="w-6 h-6 text-indigo-600" />,
//                 title: 'Circuit Breaker',
//                 desc: 'Auto-detect failing services and stop cascading failures. CLOSED → OPEN → HALF-OPEN recovery built in.'
//               },
//               {
//                 icon: <BarChart3 className="w-6 h-6 text-indigo-600" />,
//                 title: 'Usage Analytics',
//                 desc: 'See requests over time, error rates, and top keys by usage. All filtered by project.'
//               },
//               {
//                 icon: <Shield className="w-6 h-6 text-indigo-600" />,
//                 title: 'Request Logging',
//                 desc: 'Every request logged with trace ID, response time, and status code. Full audit trail out of the box.'
//               },
//               {
//                 icon: <Zap className="w-6 h-6 text-indigo-600" />,
//                 title: 'Multi-project Support',
//                 desc: 'Organize keys by project. Different apps, different limits, one dashboard.'
//               }
//             ].map(f => (
//               <div key={f.title} className="bg-white p-6 rounded-xl border border-gray-100">
//                 <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
//                   {f.icon}
//                 </div>
//                 <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
//                 <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Pricing preview */}
//       <section className="py-24">
//         <div className="max-w-6xl mx-auto px-6 text-center">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple pricing</h2>
//           <p className="text-gray-500 mb-10">Start free. Upgrade when you need more.</p>
//           <Link href="/pricing" className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:underline">
//             See full pricing <ArrowRight className="w-4 h-4" />
//           </Link>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-gray-100 py-8">
//         <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Key className="w-4 h-4 text-indigo-600" />
//             <span className="text-sm font-medium text-gray-900">GateKey</span>
//           </div>
//           <p className="text-sm text-gray-400">Built by Priya Kumari</p>
//         </div>
//       </footer>
//     </div>
//   )
// }

import Link from 'next/link'
import { Key, ArrowRight, Check, Shield, Zap, BarChart3, Lock, RefreshCw, Layers } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-900 rounded-md flex items-center justify-center">
              <Key className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-sm tracking-tight">GateKey</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Features</Link>
            <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Pricing</Link>
            <Link href="/docs" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Docs</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Sign in
            </Link>
            <Link
              href="/register"
              className="text-sm bg-gray-900 text-white px-3.5 py-1.5 rounded-md hover:bg-gray-700 transition-colors font-medium"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full mb-8 font-medium">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Now in public beta — free to start
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-5 leading-[1.1]">
            API keys that work<br />
            <span className="text-gray-400">the way you expect.</span>
          </h1>

          <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
            Generate secure API keys, enforce rate limits, and monitor usage — without building any of it yourself. Ship in minutes, not weeks.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Link
              href="/register"
              className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              Start for free <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/docs"
              className="flex items-center gap-2 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Read the docs
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-4">No credit card required · Free forever on the starter plan</p>
        </div>
      </section>

      {/* Code preview */}
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-950 rounded-xl overflow-hidden border border-gray-800">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
              <div className="w-3 h-3 rounded-full bg-gray-700" />
              <div className="w-3 h-3 rounded-full bg-gray-700" />
              <div className="w-3 h-3 rounded-full bg-gray-700" />
              <span className="text-gray-500 text-xs ml-2 font-mono">terminal</span>
            </div>
            <div className="p-6 font-mono text-sm space-y-2">
              <div>
                <span className="text-gray-500"># Generate your first API key</span>
              </div>
              <div>
                <span className="text-indigo-400">POST</span>
                <span className="text-gray-300"> /projects/my-app/keys</span>
              </div>
              <div className="pt-2">
                <span className="text-gray-500"># Make an authenticated request</span>
              </div>
              <div>
                <span className="text-green-400">curl</span>
                <span className="text-gray-300"> -H </span>
                <span className="text-yellow-300">"X-API-Key: gk_live_••••••••"</span>
                <span className="text-gray-300"> \</span>
              </div>
              <div className="pl-5">
                <span className="text-blue-300">https://your-api.com/data</span>
              </div>
              <div className="pt-2 text-gray-500"># Response headers automatically included</div>
              <div>
                <span className="text-gray-400">X-RateLimit-Remaining: </span>
                <span className="text-green-400">59</span>
              </div>
              <div>
                <span className="text-gray-400">X-Trace-Id: </span>
                <span className="text-gray-300">a3f8c2e1-d9b4...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: '< 20ms', label: 'Gateway latency' },
              { value: '99.9%', label: 'Uptime SLA' },
              { value: 'SHA-256', label: 'Key hashing standard' }
            ].map(stat => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-gray-900 tracking-tight mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Everything your API needs, nothing it doesn't
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[
              {
                icon: <Lock className="w-4 h-4" />,
                title: 'Secure by default',
                desc: 'Keys are hashed with SHA-256 and shown once. If it leaks, revoke it in one click. We never store the raw key.'
              },
              {
                icon: <Zap className="w-4 h-4" />,
                title: 'Rate limiting built in',
                desc: 'Sliding window algorithm via Redis. Set limits per key — 60 req/min on Free, 1000 on Pro. 429s returned automatically.'
              },
              {
                icon: <Shield className="w-4 h-4" />,
                title: 'Circuit breaker',
                desc: 'Detects failing services and stops forwarding requests automatically. Recovers when the service comes back.'
              },
              {
                icon: <BarChart3 className="w-4 h-4" />,
                title: 'Usage analytics',
                desc: 'See every request — status code, latency, route, key used. Filtered per project, per user. No cross-tenant leakage.'
              },
              {
                icon: <Layers className="w-4 h-4" />,
                title: 'Multi-project',
                desc: 'Organize keys by project. Different services, different limits, different teams — one dashboard.'
              },
              {
                icon: <RefreshCw className="w-4 h-4" />,
                title: 'Instant revocation',
                desc: 'Compromised key? Revoked immediately. All subsequent requests return 401 — no propagation delay.'
              }
            ].map(f => (
              <div key={f.title} className="p-5 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="w-8 h-8 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-gray-600 mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Up and running in 3 steps
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                step: '01',
                title: 'Create a project',
                desc: 'Group your API keys by service or team. Each project gets its own keys, rate limits, and analytics.'
              },
              {
                step: '02',
                title: 'Generate an API key',
                desc: 'We generate a cryptographically secure key prefixed with gk_live_. Copy it — you\'ll only see it once.'
              },
              {
                step: '03',
                title: 'Pass it with your request',
                desc: 'Add X-API-Key to your request headers. GateKey validates, rate limits, logs, and proxies — automatically.'
              }
            ].map(s => (
              <div key={s.step} className="flex gap-6 p-6 bg-white rounded-xl border border-gray-100">
                <span className="text-2xl font-bold text-gray-200 font-mono flex-shrink-0 leading-none pt-0.5">{s.step}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Start free. Pay when you scale.
            </h2>
            <p className="text-gray-500 mt-3">No hidden fees. Cancel anytime.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Free */}
            <div className="p-6 rounded-xl border border-gray-200">
              <p className="text-sm font-semibold text-gray-900 mb-1">Free</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold">₹0</span>
                <span className="text-gray-500 text-sm">/month</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {[
                  '10 projects',
                  '3 API keys per project',
                  '60 requests/min',
                  'Basic analytics'
                ].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Check className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="block text-center text-sm font-medium border border-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                Get started free
              </Link>
            </div>

            {/* Pro */}
            <div className="p-6 rounded-xl border-2 border-gray-900 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-full font-medium">
                Most popular
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-1">Pro</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold">₹999</span>
                <span className="text-gray-500 text-sm">/month</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {[
                  'Unlimited projects',
                  'Unlimited API keys',
                  '1000 requests/min',
                  'Advanced analytics',
                  'Priority support'
                ].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Check className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="block text-center text-sm font-medium bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Start Pro
              </Link>
            </div>
          </div>

          <p className="text-center mt-6">
            <Link href="/pricing" className="text-sm text-indigo-600 hover:underline">
              See full pricing comparison →
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
            Ready to secure your API?
          </h2>
          <p className="text-gray-400 mb-8">
            Join developers who ship faster with GateKey. Free to start, no card required.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors font-medium text-sm"
          >
            Get started free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                  <Key className="w-3.5 h-3.5 text-gray-900" />
                </div>
                <span className="font-semibold text-white text-sm">GateKey</span>
              </Link>
              <p className="text-xs leading-relaxed text-gray-500">
                API key management for developers. Secure, fast, and easy to integrate.
              </p>
            </div>

            {/* Product */}
            <div>
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4">Product</p>
              <ul className="space-y-3">
                {[
                  { label: 'Features', href: '#features' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'Changelog', href: '#' },
                  { label: 'Roadmap', href: '#' }
                ].map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Developers */}
            <div>
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4">Developers</p>
              <ul className="space-y-3">
                {[
                  { label: 'Documentation', href: '/docs' },
                  { label: 'API Reference', href: '/docs#endpoints' },
                  { label: 'Rate Limiting', href: '/docs#rate-limiting' },
                  { label: 'Authentication', href: '/docs#authentication' }
                ].map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4">Company</p>
              <ul className="space-y-3">
                {[
                  { label: 'About', href: '#' },
                  { label: 'Blog', href: '#' },
                  { label: 'GitHub', href: 'https://github.com/priyacha123' },
                  { label: 'Contact', href: 'mailto:chaudhary21priya@gmail.com' }
                ].map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-gray-800 flex items-center justify-between">
            <p className="text-xs text-gray-600">
              © 2026 GateKey. Built by{' '}
              <a href="https://github.com/priyacha123" className="text-gray-500 hover:text-white transition-colors">
                Priya Kumari
              </a>
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Privacy</Link>
              <Link href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}