'use client'

import Link from 'next/link'
import { Plus, ArrowUpRight, ArrowDownRight, Clock, FileText, Users, DollarSign, TrendingUp, Calendar, ChevronRight, ArrowRight } from 'lucide-react'

const metrics = [
  { label: 'Active Leads', value: '12', change: '+3 this week', up: true, icon: Users, color: '#1677ff' },
  { label: 'Quotes Sent', value: '8', change: '2 pending', up: null, icon: FileText, color: '#faad14' },
  { label: 'Revenue', value: '$7,641', change: '+$2,150 this month', up: true, icon: DollarSign, color: '#52c41a' },
  { label: 'Win Rate', value: '68%', change: '+12% vs last month', up: true, icon: TrendingUp, color: '#722ed1' },
]

const recentLeads = [
  { name: 'Jennifer Mouton', service: 'Roofing - Shingle Replacement', status: 'New Lead', statusColor: '#1677ff', time: '2h ago' },
  { name: 'Robert Cormier', service: 'Roofing - Full Replacement', status: 'Appt Set', statusColor: '#52c41a', time: '5h ago' },
  { name: 'Sarah Hebert', service: 'Roofing - Repair', status: 'Quote Sent', statusColor: '#faad14', time: '1d ago' },
]

const upcomingAppointments = [
  { customer: 'Robert Cormier', type: 'On-site Estimate', time: 'Tomorrow, 10:00 AM', user: 'Jim Butler' },
  { customer: 'Michael Vincent', type: 'On-site Estimate', time: 'Jan 20, 8:00 AM', user: 'Jim Butler' },
]

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#262626', marginBottom: 4 }}>Dashboard</h1>
          <p style={{ fontSize: 14, color: '#8c8c8c' }}>Welcome back, Marcus</p>
        </div>
        <Link href="/dashboard/leads" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', background: '#1677ff', color: '#fff', borderRadius: 6, fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
          <Plus size={16} /> New Lead
        </Link>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        {metrics.map((m) => (
          <div key={m.label} className="stat-card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: `${m.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <m.icon size={20} style={{ color: m.color }} />
              </div>
              {m.up === true && <ArrowUpRight size={18} style={{ color: '#52c41a' }} />}
              {m.up === false && <ArrowDownRight size={18} style={{ color: '#ff4d4f' }} />}
            </div>
            <div className="stat-value" style={{ fontSize: 24 }}>{m.value}</div>
            <div className="stat-label">{m.label}</div>
            <div style={{ fontSize: 12, color: m.up === true ? '#52c41a' : m.up === false ? '#ff4d4f' : '#8c8c8c', marginTop: 8 }}>{m.change}</div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Recent Leads */}
        <div className="stat-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: '#262626' }}>Recent Leads</h2>
            <Link href="/dashboard/leads" style={{ fontSize: 13, color: '#1677ff', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {recentLeads.map((lead) => (
              <div key={lead.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, border: '1px solid #f0f0f0', borderRadius: 8, cursor: 'pointer', transition: 'all 0.15s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e6f4ff', color: '#1677ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 13 }}>
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#262626' }}>{lead.name}</div>
                    <div style={{ fontSize: 13, color: '#8c8c8c' }}>{lead.service}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: 12, padding: '2px 10px', borderRadius: 4, background: `${lead.statusColor}15`, color: lead.statusColor, fontWeight: 500, border: `1px solid ${lead.statusColor}30` }}>
                    {lead.status}
                  </span>
                  <div style={{ fontSize: 12, color: '#bfbfbf', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                    <Clock size={12} /> {lead.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div className="stat-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: '#262626' }}>Upcoming</h2>
            <Link href="/dashboard/appointments" style={{ fontSize: 13, color: '#1677ff', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {upcomingAppointments.map((apt) => (
              <div key={apt.customer} style={{ padding: 16, border: '1px solid #f0f0f0', borderRadius: 8 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: '#e6f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Calendar size={18} style={{ color: '#1677ff' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#262626' }}>{apt.customer}</div>
                    <div style={{ fontSize: 13, color: '#8c8c8c' }}>{apt.type}</div>
                    <div style={{ fontSize: 13, color: '#52c41a', marginTop: 4 }}>{apt.time}</div>
                    <div style={{ fontSize: 12, color: '#bfbfbf', marginTop: 2 }}>{apt.user}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/dashboard/appointments" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 16, padding: '10px', border: '1px solid #d9d9d9', borderRadius: 6, fontSize: 14, fontWeight: 500, color: '#595959', textDecoration: 'none' }}>
            Schedule Appointment
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 24 }}>
        {[
          { label: 'Add Lead', href: '/dashboard/leads', icon: Plus, color: '#1677ff' },
          { label: 'Create Quote', href: '/dashboard/quotes', icon: FileText, color: '#faad14' },
          { label: 'Schedule Job', href: '/dashboard/appointments', icon: Calendar, color: '#722ed1' },
          { label: 'View Analytics', href: '/dashboard/analytics', icon: TrendingUp, color: '#52c41a' },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: 16,
              background: '#fff',
              border: '1px solid #f0f0f0',
              borderRadius: 8,
              textDecoration: 'none',
              color: '#595959',
              fontSize: 14,
              fontWeight: 500,
              transition: 'all 0.15s',
            }}
          >
            <action.icon size={18} style={{ color: action.color }} />
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  )
}