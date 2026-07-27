import Link from 'next/link'
import { Key, Check, ArrowLeft } from 'lucide-react'
import { faqsPricing, featuresPricing, plansPricing } from '@/lib/constants'



export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-900 rounded-md flex items-center justify-center">
              <Key className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-gray-900">GateKey</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Sign in</Link>
            <Link href="/register" className="text-sm bg-gray-900 text-white px-3.5 py-1.5 rounded-md hover:bg-gray-700 transition-colors font-medium">
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-16 pb-12 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors mb-8">
            <ArrowLeft className="w-3 h-3" /> Back to home
          </Link>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">Simple, transparent pricing</h1>
          <p className="text-gray-500 text-lg">Start free. Upgrade when your project needs it. No hidden fees.</p>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 gap-6">
            {plansPricing.map(plan => (
              <div key={plan.name} className={`rounded-2xl p-7 ${plan.highlighted ? 'border-2 border-gray-900 relative' : 'border border-gray-200'}`}>
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-4 py-1 rounded-full font-medium">
                    Most popular
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-900 mb-1">{plan.name}</p>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-gray-900 tracking-tight">{plan.price}</span>
                    <span className="text-gray-500 text-sm">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>
                <Link href={plan.href} className={`block text-center text-sm font-medium py-2.5 rounded-lg mb-7 transition-colors ${plan.highlighted ? 'bg-gray-900 text-white hover:bg-gray-700' : 'border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                  {plan.cta}
                </Link>
                <div className="space-y-3">
                  {plan.features.map(f => (
                    <div key={f.text} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${f.included ? (plan.highlighted ? 'bg-gray-900' : 'bg-gray-100') : 'bg-gray-50'}`}>
                        {f.included && <Check className={`w-2.5 h-2.5 ${plan.highlighted ? 'text-white' : 'text-gray-600'}`} />}
                        {!f.included && <span className="w-1.5 h-px bg-gray-300 block" />}
                      </div>
                      <span className={`text-sm ${f.included ? 'text-gray-700' : 'text-gray-400'}`}>{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">Full comparison</h2>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 font-medium text-gray-500 w-1/2">Feature</th>
                  <th className="text-center px-6 py-4 font-medium text-gray-900">Free</th>
                  <th className="text-center px-6 py-4 font-medium text-gray-900">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {featuresPricing.map(row => (
                  <tr key={row.feature} className="hover:bg-gray-50/50">
                    <td className="px-6 py-3.5 text-gray-700 font-medium">{row.feature}</td>
                    <td className="px-6 py-3.5 text-center text-gray-500">{row.free}</td>
                    <td className="px-6 py-3.5 text-center text-gray-900 font-medium">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqsPricing.map(faq => (
              <div key={faq.q} className="border-b border-gray-100 pb-6 last:border-0">
                <p className="font-medium text-gray-900 mb-2">{faq.q}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Start building today</h2>
          <p className="text-gray-400 text-sm mb-7">Free plan available. No credit card required.</p>
          <Link href="/register" className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-md hover:bg-gray-100 transition-colors font-medium text-sm">
            Create free account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 px-6 py-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
              <Key className="w-3 h-3 text-gray-900" />
            </div>
            <span className="text-sm font-semibold text-white">GateKey</span>
          </div>
          <p className="text-xs text-gray-600">
            © 2026 GateKey · Built by{' '}
            <a href="https://github.com/priyacha123" className="text-gray-500 hover:text-white transition-colors">Priya Kumari</a>
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Home</Link>
            <Link href="/docs" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Docs</Link>
            <Link href="/login" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Sign in</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}