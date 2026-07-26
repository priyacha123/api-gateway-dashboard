'use client'

import { useEffect, useState } from 'react'
import { Check, Zap, AlertTriangle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { apiRequest } from '@/lib/auth'
import { PLANS } from '@/lib/constants'

declare global {
  interface Window {
    Razorpay: any
  }
}

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

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = resolve
      document.body.appendChild(script)
    })
  }

const handleUpgrade = async () => {
  setProcessing(true)
  setError('')
  try {
    await loadRazorpay()

    const res = await apiRequest('/billing/create-order', {
      method: 'POST'
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      return
    }

    const options = {
      key: data.keyId,
      amount: data.amount,
      currency: data.currency,
      order_id: data.orderId,
      name: 'GateKey',
      description: 'Upgrade to PRO Plan',
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

        if (verifyRes.ok) {
          await fetchBilling()
          window.location.reload()
        } else {
          setError(verifyData.error || 'Payment verification failed')
        }
      },
      prefill: {
        email: billing?.email
      },
      theme: {
        color: '#4F46E5'
      },
      modal: {
        ondismiss: () => setProcessing(false)
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  } catch {
    setError('Something went wrong. Please try again.')
  } finally {
    setProcessing(false)
  }
}

const handleCancel = async () => {
  if (!confirm('Downgrade to FREE plan?')) return
  setCancelling(true)
  try {
    const res = await apiRequest('/billing/downgrade', { method: 'POST' })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error)
      return
    }
    await fetchBilling()
    window.location.reload()
  } finally {
    setCancelling(false)
  }
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

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Current plan card */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Current plan</p>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                currentPlan === 'PRO'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {billing?.subscriptionStatus}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              {plan.price}/{plan.period}
            </p>
          </div>

          {currentPlan === 'FREE' ? (
            <button
              onClick={handleUpgrade}
              disabled={processing}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              <Zap className="w-4 h-4" />
              {processing ? 'Processing...' : 'Upgrade to PRO'}
            </button>
          ) : (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50"
            >
              {cancelling ? 'Cancelling...' : 'Cancel subscription'}
            </button>
          )}
        </div>

        {/* Usage bars */}
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
                    `${Math.min((billing?.usage?.projects / 10) * 100, 100)}%`
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
        <h3 className="font-medium text-gray-900 mb-4">
          {currentPlan === 'FREE' ? 'Upgrade to PRO to unlock' : 'Your PRO plan includes'}
        </h3>
        <ul className="space-y-3">
          {PLANS.PRO.features.map(f => (
            <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
              <Check className={`w-4 h-4 shrink-0 ${
                currentPlan === 'PRO' ? 'text-indigo-600' : 'text-gray-300'
              }`} />
              {f}
            </li>
          ))}
        </ul>

        {currentPlan === 'FREE' && (
          <button
            onClick={handleUpgrade}
            disabled={processing}
            className="mt-6 w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {processing ? 'Processing...' : 'Upgrade to PRO — ₹999/month'}
          </button>
        )}
      </div>
    </div>
  )
}