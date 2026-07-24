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

export const endpoints = [
  { method: 'POST', path: '/auth/register', desc: 'Create a new account' },
  { method: 'POST', path: '/auth/login', desc: 'Get a JWT token' },
  { method: 'GET', path: '/projects', desc: 'List all projects' },
  { method: 'POST', path: '/projects', desc: 'Create a project' },
  { method: 'GET', path: '/projects/:id', desc: 'Get project with keys' },
  { method: 'POST', path: '/projects/:id/keys', desc: 'Generate an API key' },
  { method: 'DELETE', path: '/projects/:id/keys/:keyId', desc: 'Revoke a key' },
  { method: 'GET', path: '/billing/status', desc: 'Get plan and usage' },
  { method: 'POST', path: '/billing/upgrade', desc: 'Upgrade to PRO' },
  { method: 'GET', path: '/service-a/data', desc: 'Proxied service A (requires API key)' },
  { method: 'GET', path: '/service-b/data', desc: 'Proxied service B (requires API key)' }
]

export const header = [
  { header: 'X-RateLimit-Limit', desc: 'Maximum requests allowed per minute' },
  { header: 'X-RateLimit-Remaining', desc: 'Requests remaining in current window' },
  { header: 'X-RateLimit-Reset', desc: 'Unix timestamp when the window resets' }
]

export const quickLinks = [
  { href: '#quickstart', label: 'Quick Start' },
  { href: '#authentication', label: 'Authentication' },
  { href: '#rate-limiting', label: 'Rate Limiting' },
  { href: '#errors', label: 'Error Codes' },
  { href: '#endpoints', label: 'Endpoints' }
]

export const quickStart = [
  { step: '1', title: 'Sign up and create a project', desc: 'Create a free account and set up your first project from the dashboard.' },
  { step: '2', title: 'Generate an API key', desc: 'Generate a key from your project page. Copy it — it\'s shown only once.' },
  { step: '3', title: 'Make your first request', desc: 'Pass your key via the X-API-Key header on every request.' }
]

export const status = [
  { status: '200', meaning: 'Request successful' },
  { status: '401', meaning: 'Missing or invalid API key' },
  { status: '403', meaning: 'Plan limit exceeded — upgrade required' },
  { status: '429', meaning: 'Rate limit exceeded — slow down' },
  { status: '503', meaning: 'Downstream service unavailable — circuit open' }
]



