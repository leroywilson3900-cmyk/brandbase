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

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
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
        zIndex: 60
      }}>
        {/* Hamburger */}
        <button 
          onClick={() => setSidebarOpen(true)}
          style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', padding: 8 }}
        >
          <span style={{ color: '#f8fafc' }}>☰</span>
        </button>
        
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>B</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#f8fafc' }}>BrandBase</span>
        </div>
        
        {/* Bell */}
        <button style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', padding: 8, position: 'relative' }}>
          <span style={{ color: '#94a3b8' }}>🔔</span>
          <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
        </button>
      </header>

      {/* Demo Banner */}
      {isDemo && (
        <div style={{ background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', padding: '8px 16px', textAlign: 'center' }}>
          <span style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>
            🎉 Demo Mode — You&apos;re exploring BrandBase!
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
            width: '75%', 
            maxWidth: 280,
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
                style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#94a3b8', padding: 4 }}
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
                      padding: '12px 16px',
                      borderRadius: 10,
                      marginBottom: 4,
                      color: active ? '#10b981' : '#94a3b8',
                      background: active ? 'rgba(16,185,129,0.1)' : 'transparent',
                      fontWeight: active ? 600 : 500,
                      fontSize: 15,
                      textDecoration: 'none',
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            
            {/* User at bottom */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: '#fff' }}>
                  MT
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: '#f8fafc' }}>Marcus Thompson</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>Owner</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar (hidden on mobile) */}
      <aside style={{ 
        display: 'none',
        '@media (minWidth: 1024px)': { display: 'flex' }
      }} className="desktop-sidebar">
        <style>{`
          @media (min-width: 1024px) {
            .desktop-sidebar {
              display: flex !important;
              position: fixed;
              top: 0;
              left: 0;
              height: 100vh;
              width: 240px;
              background: linear-gradient(180deg, #1a1f36 0%, #141929 100%);
              flex-direction: column;
            }
          }
        `}</style>
      </aside>

      {/* Main Content */}
      <main style={{ padding: '16px', maxWidth: 1400, margin: '0 auto' }}>
        {children}
      </main>
    </div>
  )
}
