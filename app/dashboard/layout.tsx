'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Key, LayoutDashboard, FolderOpen, BarChart3, CreditCard, LogOut, BookOpen, ChevronRight } from 'lucide-react'
import { getUser, logout, isAuthenticated } from '@/lib/auth'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (!isAuthenticated()) { router.push('/login'); return }
    setUser(getUser())
  }, [router])

  if (!user) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const navLinks = [
    { href: '/dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: '/dashboard/projects', label: 'Projects', icon: <FolderOpen className="w-4 h-4" /> },
    { href: '/dashboard/analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { href: '/dashboard/billing', label: 'Billing', icon: <CreditCard className="w-4 h-4" /> },
    { href: '/docs', label: 'Docs', icon: <BookOpen className="w-4 h-4" /> },
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Dark sidebar */}
      <aside className="w-56 bg-gray-950 flex flex-col fixed h-full z-10">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-800">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center shrink-0">
              <Key className="w-3.5 h-3.5 text-gray-900" />
            </div>
            <span className="font-semibold text-white text-sm tracking-tight">GateKey</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors group ${
                isActive(link.href)
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
              {isActive(link.href) && (
                <ChevronRight className="w-3 h-3 ml-auto opacity-60" />
              )}
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div className="px-3 py-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0">
              {user.email?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-300 truncate">{user.email}</p>
              <span className={`text-xs font-medium ${user.plan === 'PRO' ? 'text-indigo-400' : 'text-gray-500'}`}>
                {user.plan}
              </span>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-56 min-h-screen">
        {children}
      </main>
    </div>
  )
}