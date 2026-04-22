'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  MessageSquare,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronDown,
} from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Leads', href: '/dashboard/leads', icon: Users },
  { name: 'Quotes', href: '/dashboard/quotes', icon: FileText },
  { name: 'Appointments', href: '/dashboard/appointments', icon: Calendar },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
  { name: 'Social', href: '/dashboard/social', icon: MessageSquare },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: '#fff', borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
        {/* Logo */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 6, background: '#1677ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>B</span>
            </div>
            <div>
              <span style={{ fontWeight: 700, fontSize: 15, color: '#262626' }}>BrandBase</span>
              <div style={{ fontSize: 11, color: '#8c8c8c' }}>Bayou Roofing</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 16px',
                  borderRadius: 6,
                  marginBottom: 2,
                  color: active ? '#1677ff' : '#595959',
                  background: active ? '#e6f4ff' : 'transparent',
                  fontWeight: active ? 600 : 500,
                  fontSize: 14,
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                }}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid #f0f0f0' }}>
          <Link
            href="/dashboard/settings"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 16px',
              borderRadius: 6,
              color: pathname === '/dashboard/settings' ? '#1677ff' : '#595959',
              fontWeight: 500,
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            <Settings size={18} />
            Settings
          </Link>
          <div style={{ padding: '10px 16px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1677ff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 12 }}>MT</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: '#262626' }}>Marcus T.</div>
              <div style={{ fontSize: 11, color: '#8c8c8c' }}>Owner</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <header style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
            <div style={{ position: 'relative', maxWidth: 320 }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#bfbfbf' }} />
              <input
                type="text"
                placeholder="Search leads, quotes, customers..."
                style={{ width: '100%', padding: '8px 12px 8px 36px', border: '1px solid #d9d9d9', borderRadius: 6, fontSize: 14, outline: 'none', background: '#fff' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              <Bell size={20} style={{ color: '#595959' }} />
              <span style={{ position: 'absolute', top: 2, right: 2, width: 8, height: 8, borderRadius: '50%', background: '#1677ff' }} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: 24 }}>
          {children}
        </main>
      </div>
    </div>
  )
}