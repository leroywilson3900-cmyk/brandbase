'use client'

import Link from 'next/link'

const metrics = [
  { label: 'Active Leads', value: '12', change: '+3 this week', icon: '👥', color: '#1677ff' },
  { label: 'Quotes Sent', value: '8', change: '2 pending review', icon: '📝' },
  { label: 'Revenue MTD', value: '$7,641', change: '+$2,150', icon: '💰' },
  { label: 'Win Rate', value: '68%', change: '+12% vs last month', icon: '📈' },
]

const recentLeads = [
  { name: 'Jennifer Mouton', service: 'Roofing - Shingle Replacement', status: 'New Lead', statusColor: '#10b981', time: '2h ago' },
  { name: 'Robert Cormier', service: 'Roofing - Full Replacement', status: 'Appt Set', statusColor: '#10b981', time: '5h ago' },
  { name: 'Sarah Hebert', service: 'Roofing - Repair', status: 'Quote Sent', statusColor: '#fbbf24', time: '1d ago' },
  { name: 'Michael Vincent', service: 'Roofing - Inspection', status: 'Follow-up', statusColor: '#94a3b8', time: '2d ago' },
]

const upcomingAppointments = [
  { customer: 'Robert Cormier', type: 'On-site Estimate', time: 'Tomorrow, 10:00 AM', user: 'Jim Butler' },
  { customer: 'Michael Vincent', type: 'On-site Estimate', time: 'Jan 20, 8:00 AM', user: 'Jim Butler' },
]

export default function DashboardPage() {
  return (
    <div style={{ color: '#f8fafc' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 'clamp(20px, 5vw, 26px)', fontWeight: 700, color: '#f8fafc', marginBottom: 4 }}>
          Good morning, Marcus 👋
        </h1>
        <p style={{ fontSize: 14, color: '#64748b' }}>Wednesday, January 15, 2026</p>
      </div>

      {/* Quick Add Button - Mobile */}
      <div style={{ marginBottom: 20 }}>
        <Link 
          href="/dashboard/leads" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 8, 
            padding: '12px 20px', 
            background: '#10b981', 
            color: '#fff', 
            borderRadius: 10, 
            fontWeight: 600, 
            fontSize: 14, 
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(16,185,129,0.3)'
          }}
        >
          <span style={{ fontSize: 16 }}>➕</span> New Lead
        </Link>
      </div>

      {/* Metrics Grid - Mobile First */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: 12, 
        marginBottom: 24 
      }}>
        {metrics.map((m) => (
          <div key={m.label} style={{ 
            background: 'rgba(30,41,59,0.8)', 
            borderRadius: 14, 
            padding: '16px',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 22 }}>{m.icon}</span>
            </div>
            <div style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 700, color: '#f8fafc', marginBottom: 2 }}>{m.value}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 2 }}>{m.label}</div>
            <div style={{ fontSize: 11, color: '#10b981' }}>{m.change}</div>
          </div>
        ))}
      </div>

      {/* Recent Leads - Mobile First */}
      <div style={{ 
        background: 'rgba(30,41,59,0.6)', 
        borderRadius: 14, 
        padding: 20, 
        marginBottom: 16,
        border: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#f8fafc', marginBottom: 2 }}>Recent Leads</h2>
            <p style={{ fontSize: 12, color: '#64748b' }}>Latest leads across all sources</p>
          </div>
          <Link href="/dashboard/leads" style={{ fontSize: 12, color: '#10b981', fontWeight: 600, textDecoration: 'none' }}>
            View all →
          </Link>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {recentLeads.map((lead, i) => (
            <div key={i} style={{ 
              background: 'rgba(15,23,42,0.5)', 
              borderRadius: 10, 
              padding: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ 
                  width: 36, height: 36, borderRadius: '50%', 
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 11, color: '#fff',
                  flexShrink: 0
                }}>
                  {lead.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#f8fafc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.name}</div>
                  <div style={{ fontSize: 11, color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.service}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <span style={{ 
                  fontSize: 10, 
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: 10,
                  background: `${lead.statusColor}20`,
                  color: lead.statusColor
                }}>
                  {lead.status}
                </span>
                <div style={{ fontSize: 10, color: '#475569', marginTop: 4 }}>{lead.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Appointments - Mobile First */}
      <div style={{ 
        background: 'rgba(30,41,59,0.6)', 
        borderRadius: 14, 
        padding: 20, 
        marginBottom: 16,
        border: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#f8fafc', marginBottom: 2 }}>Upcoming</h2>
            <p style={{ fontSize: 12, color: '#64748b' }}>Scheduled appointments</p>
          </div>
          <Link href="/dashboard/appointments" style={{ fontSize: 12, color: '#10b981', fontWeight: 600, textDecoration: 'none' }}>
            View all →
          </Link>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {upcomingAppointments.map((apt, i) => (
            <div key={i} style={{ 
              background: 'rgba(15,23,42,0.5)', 
              borderRadius: 10, 
              padding: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}>
              <div style={{ 
                width: 40, height: 40, borderRadius: 10,
                background: 'rgba(22,119,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
                flexShrink: 0
              }}>
                📅
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f8fafc', marginBottom: 2 }}>{apt.customer}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>{apt.type}</div>
                <div style={{ fontSize: 11, color: '#10b981', marginTop: 2 }}>{apt.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Overview - Mobile First */}
      <div style={{ 
        background: 'rgba(30,41,59,0.6)', 
        borderRadius: 14, 
        padding: 20, 
        marginBottom: 16,
        border: '1px solid rgba(255,255,255,0.06)'
      }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#f8fafc', marginBottom: 16 }}>Pipeline</h2>
        
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8 }}>
          {[
            { stage: 'New', count: 4, color: '#1677ff' },
            { stage: 'Follow-up', count: 3, color: '#fbbf24' },
            { stage: 'Appt Set', count: 2, color: '#10b981' },
            { stage: 'Quote', count: 2, color: '#722ed1' },
            { stage: 'Deposit', count: 1, color: '#10b981' },
          ].map((stage) => (
            <div key={stage.stage} style={{ 
              background: 'rgba(15,23,42,0.5)', 
              borderRadius: 10, 
              padding: '12px 14px',
              textAlign: 'center',
              flexShrink: 0,
              minWidth: 70
            }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: stage.color, marginBottom: 4 }}>{stage.count}</div>
              <div style={{ fontSize: 10, color: '#64748b' }}>{stage.stage}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions - Mobile Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: 10 
      }}>
        {[
          { label: 'Add Lead', icon: '👥', href: '/dashboard/leads' },
          { label: 'Create Quote', icon: '📝', href: '/dashboard/quotes' },
          { label: 'Schedule', icon: '📅', href: '/dashboard/appointments' },
          { label: 'View Analytics', icon: '📊', href: '/dashboard/analytics' },
        ].map((action) => (
          <Link key={action.label} href={action.href} style={{ 
            background: 'rgba(30,41,59,0.8)', 
            borderRadius: 12, 
            padding: '16px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.06)',
            textDecoration: 'none'
          }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{action.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8' }}>{action.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
