'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Leads', href: '/dashboard/leads', icon: '👥' },
  { name: 'Quotes', href: '/dashboard/quotes', icon: '📝' },
  { name: 'Appointments', href: '/dashboard/appointments', icon: '📅' },
  { name: 'Customers', href: '/dashboard/customers', icon: '👤' },
  { name: 'Payments', href: '/dashboard/payments', icon: '💳' },
  { name: 'Social', href: '/dashboard/social', icon: '📱' },
  { name: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isDemo, setIsDemo] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  useEffect(() => {
    const token = localStorage.getItem('brandbase_token')
    setIsDemo(token && token.startsWith('demo_'))
  }, [])

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f8fafc' }}>
      {/* Mobile Top Bar */}
      <header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '12px 16px',
        background: '#1e293b',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 60,
        gap: 12
      }}>
        {/* Hamburger Button */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ 
            background: 'none', 
            border: 'none', 
            fontSize: 22, 
            cursor: 'pointer', 
            padding: 8,
            color: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 44,
            minHeight: 44
          }}
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>
        
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>B</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#f8fafc' }}>BrandBase</span>
        </div>
        
        {/* Bell */}
        <button style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', padding: 8, position: 'relative', color: '#94a3b8' }}>
          🔔
          <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
        </button>
      </header>

      {/* Demo Banner */}
      {isDemo && (
        <div style={{ background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', padding: '8px 16px', textAlign: 'center' }}>
          <span style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>
            🎉 Demo Mode — You're exploring BrandBase!
          </span>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex' }}>
          {/* Backdrop */}
          <div 
            onClick={() => setSidebarOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }}
          />
          
          {/* Sidebar */}
          <aside style={{ 
            position: 'relative', 
            width: '80%', 
            maxWidth: 300,
            background: '#1e293b', 
            height: '100vh',
            overflowY: 'auto',
            boxShadow: '4px 0 20px rgba(0,0,0,0.3)'
          }}>
            {/* Header */}
            <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>B</span>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#f8fafc' }}>BrandBase</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>Bayou Roofing LLC</div>
                </div>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#94a3b8', padding: 4 }}
              >
                ✕
              </button>
            </div>
            
            {/* Nav */}
            <nav style={{ padding: '12px 8px' }}>
              {navItems.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '14px 16px',
                      borderRadius: 10,
                      marginBottom: 4,
                      color: active ? '#10b981' : '#94a3b8',
                      background: active ? 'rgba(16,185,129,0.1)' : 'transparent',
                      fontWeight: active ? 600 : 500,
                      fontSize: 15,
                      textDecoration: 'none',
                      minHeight: 48
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            
            {/* Settings at bottom */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <Link
                href="/dashboard/settings"
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 16px',
                  borderRadius: 10,
                  color: '#94a3b8',
                  fontWeight: 500,
                  fontSize: 15,
                  textDecoration: 'none',
                  minHeight: 48
                }}
              >
                <span style={{ fontSize: 20 }}>⚙️</span>
                Settings
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Page Content */}
      <main style={{ padding: 16, maxWidth: 1400, margin: '0 auto' }}>
        {children}
      </main>
    </div>
  )
}
