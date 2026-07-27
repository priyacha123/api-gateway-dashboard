'use client'

import { useEffect, useState } from 'react'
import { Check, Zap, AlertTriangle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { apiRequest } from '@/lib/auth'
import { PLANS } from '@/lib/constants'

declare global { interface Window { Razorpay: any } }

export default function BillingPage() {
  useAuth()
  const [billing, setBilling] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [error, setError] = useState('')

  const fetchBilling = async () => {
    const res = await apiRequest('/billing/status')
    const data = await res.json()
    setBilling(data)
    setLoading(false)
  }

  useEffect(() => { fetchBilling() }, [])

  const loadRazorpay = () => new Promise(resolve => {
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.onload = resolve
    document.body.appendChild(s)
  })

  const handleUpgrade = async () => {
    setProcessing(true)
    setError('')
    try {
      await loadRazorpay()
      const res = await apiRequest('/billing/create-order', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: 'GateKey',
        description: 'Upgrade to Pro Plan',
        handler: async (response: any) => {
          const verifyRes = await apiRequest('/billing/verify-payment', {
            method: 'POST',
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            })
          })
          const verifyData = await verifyRes.json()
          if (verifyRes.ok) { await fetchBilling(); window.location.reload() }
          else setError(verifyData.error || 'Payment verification failed')
        },
        prefill: { email: billing?.email },
        theme: { color: '#111827' },
        modal: { ondismiss: () => setProcessing(false) }
      }
      new window.Razorpay(options).open()
    } catch { setError('Something went wrong. Please try again.') }
    finally { setProcessing(false) }
  }

  const handleDowngrade = async () => {
    if (!confirm('Downgrade to Free plan? Your limits will be reduced immediately.')) return
    setCancelling(true)
    try {
      const res = await apiRequest('/billing/downgrade', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      await fetchBilling()
      window.location.reload()
    } finally { setCancelling(false) }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const currentPlan = billing?.plan || 'FREE'
  const plan = PLANS[currentPlan as keyof typeof PLANS]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-gray-900 tracking-tight">Billing</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your plan and usage</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {/* Current plan */}
        <div className="col-span-2 space-y-4">
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">Current plan</p>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{plan.name}</h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    currentPlan === 'PRO' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {billing?.subscriptionStatus}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">{plan.price}/{plan.period}</p>
              </div>

              {currentPlan === 'FREE' ? (
                <button
                  onClick={handleUpgrade}
                  disabled={processing}
                  className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 disabled:opacity-50 transition-colors"
                >
                  <Zap className="w-3.5 h-3.5" />
                  {processing ? 'Processing...' : 'Upgrade to Pro'}
                </button>
              ) : (
                <button
                  onClick={handleDowngrade}
                  disabled={cancelling}
                  className="text-sm text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                >
                  {cancelling ? 'Processing...' : 'Downgrade'}
                </button>
              )}
            </div>

            {/* Usage */}
            <div className="space-y-4 pt-4 border-t border-gray-50">
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Usage</p>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Projects</span>
                  <span className="text-gray-900 font-medium tabular-nums">
                    {billing?.usage?.projects} / {billing?.limits?.projects}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-gray-900 transition-all"
                    style={{
                      width: currentPlan === 'PRO' ? '10%' :
                        `${Math.min((billing?.usage?.projects / 10) * 100, 100)}%`
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Active keys</span>
                <span className="text-gray-900 font-medium">{billing?.usage?.activeKeys}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Plan features */}
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-4">
            {currentPlan === 'FREE' ? 'Pro includes' : 'Your plan includes'}
          </p>
          <ul className="space-y-3">
            {PLANS.PRO.features.map(f => (
              <li key={f} className="flex items-start gap-2.5 text-sm">
                <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                  currentPlan === 'PRO' ? 'text-gray-900' : 'text-gray-300'
                }`} />
                <span className={currentPlan === 'PRO' ? 'text-gray-700' : 'text-gray-400'}>{f}</span>
              </li>
            ))}
          </ul>

          {currentPlan === 'FREE' && (
            <button
              onClick={handleUpgrade}
              disabled={processing}
              className="mt-6 w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              {processing ? 'Processing...' : 'Upgrade — ₹999/mo'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}