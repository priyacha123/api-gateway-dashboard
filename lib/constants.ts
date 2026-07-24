import { Key, LayoutDashboard, FolderOpen, BarChart3, CreditCard, LogOut } from 'lucide-react'

export const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:3001'

export const PLANS = {
  FREE: {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    features: [
      '10 projects',
      '3 API keys per project',
      '60 requests/min rate limit',
      'Basic analytics',
      'Community support'
    ],
    limits: {
      projects: 10,
      keysPerProject: 3,
      rateLimit: 60
    }
  },
  PRO: {
    name: 'Pro',
    price: '₹999',
    period: 'per month',
    features: [
      'Unlimited projects',
      'Unlimited API keys',
      '1000 requests/min rate limit',
      'Advanced analytics',
      'Priority support',
      'Custom rate limits per key'
    ],
    limits: {
      projects: 'Unlimited',
      keysPerProject: 'Unlimited',
      rateLimit: 1000
    }
  }
}