'use client'

import Link from 'next/link'
import { Plus, ArrowRight, TrendingUp, Users, FileText, DollarSign, Clock, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const metrics = [
  { label: 'Active Leads', value: '12', change: '+3 this week', up: true, icon: Users, color: '#1677ff', bg: '#e6f4ff' },
  { label: 'Quotes Sent', value: '8', change: '2 pending review', up: null, icon: FileText, color: '#faad14', bg: '#fffbe6' },
  { label: 'Revenue MTD', value: '$7,641', change: '+$2,150 this month', up: true, icon: DollarSign, color: '#52c41a', bg: '#f6ffed' },
  { label: 'Win Rate', value: '68%', change: '+12% vs last month', up: true, icon: TrendingUp, color: '#722ed1', bg: '#f9f0ff' },
]

const recentLeads = [
  { name: 'Jennifer Mouton', service: 'Roofing - Shingle Replacement', status: 'New Lead', statusColor: '#1677ff', time: '2h ago', avatar: 'JM' },
  { name: 'Robert Cormier', service: 'Roofing - Full Replacement', status: 'Appt Set', statusColor: '#52c41a', time: '5h ago', avatar: 'RC' },
  { name: 'Sarah Hebert', service: 'Roofing - Repair', status: 'Quote Sent', statusColor: '#faad14', time: '1d ago', avatar: 'SH' },
  { name: 'Michael Vincent', service: 'Roofing - Inspection', status: 'Follow-up', statusColor: '#722ed1', time: '2d ago', avatar: 'MV' },
]

const upcomingAppointments = [
  { customer: 'Robert Cormier', type: 'On-site Estimate', time: 'Tomorrow, 10:00 AM', user: 'Jim Butler', avatar: 'RC' },
  { customer: 'Michael Vincent', type: 'On-site Estimate', time: 'Jan 20, 8:00 AM', user: 'Jim Butler', avatar: 'MV' },
]

const pipelineData = [
  { stage: 'New Lead', count: 4, color: '#1677ff' },
  { stage: 'Follow-up', count: 3, color: '#faad14' },
  { stage: 'Appt Set', count: 2, color: '#52c41a' },
  { stage: 'Quote Sent', count: 2, color: '#1677ff' },
  { stage: 'Deposit', count: 1, color: '#52c41a' },
]

function CheckIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> }

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>Good morning, Marcus 👋</h1>
          <p style={{ fontSize: 14, color: '#8c8c8c' }}>Wednesday, January 15, 2026</p>
        </div>
        <Link href="/dashboard/leads" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#1677ff', color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: 'none', boxShadow: '0 4px 12px rgba(22,119,255,0.3)' }}>
          <Plus size={16} /> New Lead
        </Link>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
        {metrics.map((m) => (
          <div key={m.label} style={{ background: '#fff', borderRadius: 12, padding: 22, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <m.icon size={20} style={{ color: m.color }} />
              </div>
              {m.up === true && <ArrowUpRight size={18} style={{ color: '#52c41a' }} />}
              {m.up === false && <ArrowDownRight size={18} style={{ color: '#ff4d4f' }} />}
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-0.5px', marginBottom: 2 }}>{m.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#595959', marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 12, color: m.up === true ? '#52c41a' : m.up === false ? '#ff4d4f' : '#8c8c8c' }}>{m.change}</div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, marginBottom: 24 }}>
        {/* Recent Leads */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>Recent Leads</h2>
              <p style={{ fontSize: 13, color: '#8c8c8c' }}>Latest leads across all sources</p>
            </div>
            <Link href="/dashboard/leads" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#1677ff', fontWeight: 600, textDecoration: 'none' }}>
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recentLeads.map((lead) => (
              <div key={lead.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 14, border: '1px solid #f0f0f0', borderRadius: 10, cursor: 'pointer', transition: 'all 0.15s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${lead.statusColor}18`, color: lead.statusColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12 }}>
                    {lead.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#262626', marginBottom: 1 }}>{lead.name}</div>
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>{lead.service}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 6, background: `${lead.statusColor}15`, color: lead.statusColor, fontWeight: 600, border: `1px solid ${lead.statusColor}25` }}>
                    {lead.status}
                  </span>
                  <span style={{ fontSize: 12, color: '#bfbfbf', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={12} /> {lead.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Pipeline overview */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>Pipeline</h2>
              <p style={{ fontSize: 13, color: '#8c8c8c' }}>12 active leads</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pipelineData.map((p) => (
                <div key={p.stage} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 80, fontSize: 12, color: '#595959', fontWeight: 500 }}>{p.stage}</div>
                  <div style={{ flex: 1, height: 8, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${(p.count / 4) * 100}%`, height: '100%', background: p.color, borderRadius: 4, transition: 'width 0.5s' }} />
                  </div>
                  <div style={{ width: 24, fontSize: 13, fontWeight: 700, color: '#262626', textAlign: 'right' }}>{p.count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a' }}>Upcoming</h2>
              <Link href="/dashboard/appointments" style={{ fontSize: 12, color: '#1677ff', fontWeight: 600, textDecoration: 'none' }}>View all</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {upcomingAppointments.map((apt) => (
                <div key={apt.customer} style={{ padding: 14, background: '#f7f9ff', borderRadius: 10, display: 'flex', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#e6f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Calendar size={18} style={{ color: '#1677ff' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: '#262626', marginBottom: 1 }}>{apt.customer}</div>
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>{apt.type}</div>
                    <div style={{ fontSize: 12, color: '#52c41a', marginTop: 3, fontWeight: 600 }}>{apt.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginBottom: 16 }}>Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { label: 'Add Lead', href: '/dashboard/leads', color: '#1677ff', bg: '#e6f4ff' },
            { label: 'Create Quote', href: '/dashboard/quotes', color: '#faad14', bg: '#fffbe6' },
            { label: 'Schedule Job', href: '/dashboard/appointments', color: '#722ed1', bg: '#f9f0ff' },
            { label: 'View Reports', href: '/dashboard/analytics', color: '#52c41a', bg: '#f6ffed' },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '14px 12px',
                background: action.bg,
                border: `1px solid ${action.color}20`,
                borderRadius: 10,
                textDecoration: 'none',
                color: action.color,
                fontSize: 13,
                fontWeight: 600,
                transition: 'all 0.15s',
              }}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}