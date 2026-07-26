'use client'

import { useEffect, useState } from 'react'
import { Check, Zap } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { apiRequest } from '@/lib/auth'
import { PLANS } from '@/lib/constants'

export default function BillingPage() {
  useAuth()
  const [billing, setBilling] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [upgrading, setUpgrading] = useState(false)
  const [downgrading, setDowngrading] = useState(false)

  const fetchBilling = async () => {
    const res = await apiRequest('/billing/status')
    const data = await res.json()
    setBilling(data)
    setLoading(false)
  }

  useEffect(() => { fetchBilling() }, [])

  const upgrade = async () => {
    setUpgrading(true)
    await apiRequest('/billing/upgrade', { method: 'POST' })
    await fetchBilling()
    setUpgrading(false)
    window.location.reload()
  }

  const downgrade = async () => {
    if (!confirm('Downgrade to FREE? You will lose access to PRO features.')) return
    setDowngrading(true)
    await apiRequest('/billing/downgrade', { method: 'POST' })
    await fetchBilling()
    setDowngrading(false)
    window.location.reload()
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const currentPlan = billing?.plan || 'FREE'
  const plan = PLANS[currentPlan as keyof typeof PLANS]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Billing</h1>

      {/* Current plan */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Current plan</p>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                currentPlan === 'PRO' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {billing?.subscriptionStatus}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">{plan.price}/{plan.period}</p>
          </div>

          {currentPlan === 'FREE' ? (
            <button
              onClick={upgrade}
              disabled={upgrading}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              <Zap className="w-4 h-4" />
              {upgrading ? 'Upgrading...' : 'Upgrade to PRO'}
            </button>
          ) : (
            <button
              onClick={downgrade}
              disabled={downgrading}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              {downgrading ? 'Downgrading...' : 'Downgrade to FREE'}
            </button>
          )}
        </div>

        {/* Usage */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Projects</span>
              <span className="text-gray-900 font-medium">
                {billing?.usage?.projects} / {billing?.limits?.projects}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-indigo-500 transition-all"
                style={{
                  width: currentPlan === 'PRO' ? '0%' :
                    `${Math.min((billing?.usage?.projects / billing?.limits?.projects) * 100, 100)}%`
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Active keys</span>
              <span className="text-gray-900 font-medium">
                {billing?.usage?.activeKeys} keys
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Plan features */}
      <div className="bg-white border border-gray-100 rounded-xl p-6">
        <h3 className="font-medium text-gray-900 mb-4">Your plan includes</h3>
        <ul className="space-y-3">
          {plan.features.map(f => (
            <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
              <Check className="w-4 h-4 text-indigo-600 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}