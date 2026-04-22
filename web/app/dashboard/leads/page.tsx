'use client'

import { useState } from 'react'
import { Plus, Search, X, Clock, ChevronRight } from 'lucide-react'

const pipelineOrder = ['new_lead', 'followup_call', 'appointment_set', 'on_site_visit', 'quote_sent', 'deposit_received', 'job_in_progress', 'job_done']
const pipelineLabels: Record<string, string> = {
  new_lead: 'New Lead', followup_call: 'Follow-up', appointment_set: 'Appt Set',
  on_site_visit: 'On-site', quote_sent: 'Quote Sent', deposit_received: 'Deposit',
  job_in_progress: 'In Progress', job_done: 'Done',
}
const pipelineColors: Record<string, string> = {
  new_lead: '#1677ff', followup_call: '#faad14', appointment_set: '#52c41a',
  on_site_visit: '#52c41a', quote_sent: '#faad14', deposit_received: '#52c41a',
  job_in_progress: '#1677ff', job_done: '#52c41a',
}

const mockLeads = [
  { id: '1', name: 'Jennifer Mouton', phone: '(337) 555-0147', service: 'Roofing - Shingle Replacement', status: 'new_lead', source: 'Website', created: '2h ago', priority: 'high' },
  { id: '2', name: 'Robert Cormier', phone: '(337) 555-0198', service: 'Roofing - Full Replacement', status: 'appointment_set', source: 'Google Ads', created: '5h ago', priority: 'high' },
  { id: '3', name: 'Sarah Hebert', phone: '(337) 555-0234', service: 'Roofing - Repair', status: 'quote_sent', source: 'Facebook', created: '1d ago', priority: 'medium' },
  { id: '4', name: 'Michael Vincent', phone: '(337) 555-0267', service: 'Roofing - Inspection', status: 'followup_call', source: 'Referral', created: '2d ago', priority: 'low' },
  { id: '5', name: 'Lisa Trahan', phone: '(337) 555-0312', service: 'Roofing - Metal Roof', status: 'deposit_received', source: 'Website', created: '3d ago', priority: 'high' },
  { id: '6', name: 'David Babineaux', phone: '(337) 555-0423', service: 'Gutter Installation', status: 'job_done', source: 'Nextdoor', created: '1w ago', priority: 'low' },
]

export default function LeadsPage() {
  const [view, setView] = useState<'pipeline' | 'list'>('pipeline')
  const [filter, setFilter] = useState('all')

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#262626', marginBottom: 4 }}>Leads</h1>
          <p style={{ fontSize: 14, color: '#8c8c8c' }}>{mockLeads.length} total leads</p>
        </div>
        <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', background: '#1677ff', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 500, fontSize: 14, cursor: 'pointer' }}>
          <Plus size={16} /> New Lead
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#bfbfbf' }} />
            <input type="text" placeholder="Search leads..." style={{ padding: '8px 12px 8px 36px', border: '1px solid #d9d9d9', borderRadius: 6, fontSize: 14, outline: 'none', width: 240, background: '#fff' }} />
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: 6, fontSize: 14, outline: 'none', background: '#fff', cursor: 'pointer' }}>
            <option value="all">All Status</option>
            {pipelineOrder.map(s => <option key={s} value={s}>{pipelineLabels[s]}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', background: '#f5f5f5', borderRadius: 6, padding: 2 }}>
          {[['pipeline', 'Pipeline'], ['list', 'List']].map(([v, label]) => (
            <button key={v} onClick={() => setView(v as any)} style={{ padding: '6px 16px', borderRadius: 4, border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer', background: view === v ? '#fff' : 'transparent', color: view === v ? '#262626' : '#8c8c8c', boxShadow: view === v ? '0 1px 2px rgba(0,0,0,0.06)' : 'none' }}>{label}</button>
          ))}
        </div>
      </div>

      {/* Pipeline */}
      {view === 'pipeline' && (
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16 }}>
          {pipelineOrder.map((status) => {
            const leads = mockLeads.filter(l => l.status === status)
            const color = pipelineColors[status]
            return (
              <div key={status} style={{ minWidth: 240, background: '#fafafa', borderRadius: 8, padding: 16, flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                    <span style={{ fontWeight: 600, fontSize: 13, color: '#262626' }}>{pipelineLabels[status]}</span>
                  </div>
                  <span style={{ fontSize: 12, color: '#8c8c8c', background: '#f0f0f0', padding: '2px 8px', borderRadius: 10 }}>{leads.length}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {leads.map((lead) => (
                    <div key={lead.id} style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 8, padding: 14, cursor: 'pointer', transition: 'all 0.15s' }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#262626', marginBottom: 2 }}>{lead.name}</div>
                      <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 8 }}>{lead.service}</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 11, color: '#bfbfbf', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} /> {lead.created}</span>
                        {lead.priority === 'high' && <span style={{ fontSize: 10, color: '#ff4d4f', background: '#fff2f0', padding: '2px 6px', borderRadius: 4, fontWeight: 500 }}>High</span>}
                      </div>
                    </div>
                  ))}
                  {leads.length === 0 && <p style={{ textAlign: 'center', color: '#d9d9d9', fontSize: 13, padding: 20 }}>No leads</p>}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* List */}
      {view === 'list' && (
        <div className="stat-card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                {['Lead', 'Service', 'Status', 'Source', 'Created'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '14px 20px', fontSize: 13, fontWeight: 600, color: '#262626', borderBottom: '1px solid #f0f0f0' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockLeads.map((lead, i) => (
                <tr key={lead.id} style={{ cursor: 'pointer' }}>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid #f0f0f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#e6f4ff', color: '#1677ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 12 }}>
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, color: '#262626' }}>{lead.name}</div>
                        <div style={{ fontSize: 13, color: '#8c8c8c' }}>{lead.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 14, color: '#595959', borderBottom: '1px solid #f0f0f0' }}>{lead.service}</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid #f0f0f0' }}>
                    <span style={{ fontSize: 12, padding: '2px 10px', borderRadius: 4, background: `${pipelineColors[lead.status]}15`, color: pipelineColors[lead.status], fontWeight: 500, border: `1px solid ${pipelineColors[lead.status]}30` }}>
                      {pipelineLabels[lead.status]}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: '#8c8c8c', borderBottom: '1px solid #f0f0f0' }}>{lead.source}</td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: '#bfbfbf', borderBottom: '1px solid #f0f0f0' }}>{lead.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}