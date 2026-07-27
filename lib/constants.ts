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

export const plansPricing = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    description: 'Perfect for side projects and personal APIs.',
    cta: 'Get started free',
    href: '/register',
    highlighted: false,
    features: [
      { text: '10 projects', included: true },
      { text: '3 API keys per project', included: true },
      { text: '60 requests/min rate limit', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Request logging', included: true },
      { text: 'Circuit breaker protection', included: true },
      { text: 'Unlimited API keys', included: false },
      { text: '1000 requests/min', included: false },
      { text: 'Advanced analytics', included: false },
      { text: 'Priority support', included: false },
    ]
  },
  {
    name: 'Pro',
    price: '₹999',
    period: 'per month',
    description: 'For teams and production APIs that need more.',
    cta: 'Start Pro',
    href: '/register',
    highlighted: true,
    features: [
      { text: 'Unlimited projects', included: true },
      { text: 'Unlimited API keys', included: true },
      { text: '1000 requests/min rate limit', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Request logging', included: true },
      { text: 'Circuit breaker protection', included: true },
      { text: 'Custom rate limits per key', included: true },
      { text: 'Priority support', included: true },
      { text: 'Usage alerts', included: true },
      { text: 'Billing portal', included: true },
    ]
  }
]

export const faqsPricing = [
  {
    q: 'Can I upgrade or downgrade anytime?',
    a: 'Yes. Upgrade to Pro instantly and your limits increase immediately. Downgrade anytime — no lock-in.'
  },
  {
    q: 'What happens when I hit the rate limit?',
    a: 'Requests over the limit receive a 429 response with a Retry-After header. Your service is never blocked — just throttled.'
  },
  {
    q: 'Is my API key stored securely?',
    a: 'We store only a SHA-256 hash of your key — never the raw value. Your key is shown once at generation and never again.'
  },
  {
    q: 'What is the circuit breaker?',
    a: 'If a downstream service returns 5+ consecutive errors, the circuit opens and requests are rejected immediately with 503. After a cooldown, one probe request is allowed through to check recovery.'
  },
  {
    q: 'Do I need a credit card to start?',
    a: 'No. The Free plan requires no payment details. Add a card only when you upgrade to Pro.'
  }
]

export const featuresPricing = [
  { feature: 'Projects', free: '10', pro: 'Unlimited' },
  { feature: 'API keys per project', free: '3', pro: 'Unlimited' },
  { feature: 'Rate limit', free: '60 req/min', pro: '1000 req/min' },
  { feature: 'Request logging', free: '✓', pro: '✓' },
  { feature: 'Circuit breaker', free: '✓', pro: '✓' },
  { feature: 'Analytics', free: 'Basic', pro: 'Advanced' },
  { feature: 'Custom rate limits', free: '—', pro: '✓' },
  { feature: 'Priority support', free: '—', pro: '✓' },
  { feature: 'Price', free: '₹0/mo', pro: '₹999/mo' },
]