'use client'

import Link from 'next/link'
import { Check, Key } from 'lucide-react'
import { PLANS } from '@/lib/constants'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Key className="w-5 h-5 text-indigo-600" />
            <span className="font-semibold text-gray-900">GateKey</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-gray-600">Login</Link>
            <Link href="/register" className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h1>
          <p className="text-gray-500 text-lg">Start free. Upgrade when your project grows.</p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {Object.entries(PLANS).map(([key, plan]) => (
            <div
              key={key}
              className={`rounded-2xl border-2 p-8 ${key === 'PRO' ? 'border-indigo-600 relative' : 'border-gray-200'}`}
            >
              {key === 'PRO' && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs px-4 py-1 rounded-full font-medium">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h2>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                    <Check className={`w-4 h-4 flex-shrink-0 ${key === 'PRO' ? 'text-indigo-600' : 'text-green-500'}`} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={`block text-center py-3 rounded-lg font-medium transition-colors ${
                  key === 'PRO'
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {key === 'FREE' ? 'Get started free' : 'Start Pro'}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Need a custom plan? <a href="mailto:priyacha123@gmail.com" className="text-indigo-600 hover:underline">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  )
}