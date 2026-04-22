'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Phone,
  Mail,
  Calendar,
  ChevronRight,
  X,
  User,
  Building2,
  Clock,
  Tag,
  FileText,
  MessageSquare,
  Send
} from 'lucide-react'

const mockLeads = [
  {
    id: '1',
    name: 'Jennifer Mouton',
    email: 'jennifer.mouton@email.com',
    phone: '(337) 555-0147',
    service: 'Roofing - Shingle Replacement',
    status: 'new_lead',
    source: 'Website Form',
    assigned_to: 'Marcus Thompson',
    created_at: '2 hours ago',
    notes: 'Homeowner in Broussard. Insurance claim approved. Looking for 2,400 sq ft shingle replacement.',
    priority: 'high'
  },
  {
    id: '2',
    name: 'Robert Cormier',
    email: 'rcormier@bayoucowboy.net',
    phone: '(337) 555-0198',
    service: 'Roofing - Full Replacement',
    status: 'appointment_set',
    source: 'Google Ads',
    assigned_to: 'Jim Butler',
    created_at: '5 hours ago',
    notes: 'Commercial property. 12,000 sq ft metal roof. Needs lift equipment.',
    priority: 'high'
  },
  {
    id: '3',
    name: 'Sarah Hebert',
    email: 'shebert@gmail.com',
    phone: '(337) 555-0234',
    service: 'Roofing - Repair',
    status: 'quote_sent',
    source: 'Facebook',
    assigned_to: 'Marcus Thompson',
    created_at: '1 day ago',
    notes: 'Minor repair needed after last storm. Leak in garage.',
    priority: 'medium'
  },
  {
    id: '4',
    name: 'Michael Vincent',
    email: 'mvincent@la-law.com',
    phone: '(337) 555-0267',
    service: 'Roofing - Inspection',
    status: 'followup_call',
    source: 'Referral',
    assigned_to: 'Jim Butler',
    created_at: '2 days ago',
    notes: 'Annual inspection for property management company. Potential recurring business.',
    priority: 'low'
  },
  {
    id: '5',
    name: 'Lisa Trahan',
    email: 'lisa.t@outlook.com',
    phone: '(337) 555-0312',
    service: 'Roofing - Metal Roof',
    status: 'deposit_received',
    source: 'Website Form',
    assigned_to: 'Marcus Thompson',
    created_at: '3 days ago',
    notes: 'Deposit received. Job scheduled for next week.',
    priority: 'high'
  },
  {
    id: '6',
    name: 'David Babineaux',
    email: 'dbabineaux@gmail.com',
    phone: '(337) 555-0423',
    service: 'Roofing - Gutter Install',
    status: 'job_done',
    source: 'Nextdoor',
    assigned_to: 'Jim Butler',
    created_at: '1 week ago',
    notes: 'Completed. Customer very satisfied. Left 5-star review.',
    priority: 'low'
  }
]

const statusConfig: Record<string, { label: string; badge: string; color: string }> = {
  new_lead: { label: 'New Lead', badge: 'badge-info', color: 'bg-blue-500' },
  followup_call: { label: 'Follow-up', badge: 'badge-warning', color: 'bg-amber-500' },
  appointment_set: { label: 'Appt Set', badge: 'badge-success', color: 'bg-emerald-500' },
  on_site_visit: { label: 'On-site', badge: 'badge-success', color: 'bg-emerald-500' },
  quote_sent: { label: 'Quote Sent', badge: 'badge-warning', color: 'bg-amber-500' },
  deposit_received: { label: 'Deposit', badge: 'badge-success', color: 'bg-emerald-500' },
  job_in_progress: { label: 'In Progress', badge: 'badge-info', color: 'bg-blue-500' },
  job_done: { label: 'Done', badge: 'badge-success', color: 'bg-emerald-500' },
  lost: { label: 'Lost', badge: 'badge-error', color: 'bg-red-500' },
}

const pipelineOrder = ['new_lead', 'followup_call', 'appointment_set', 'on_site_visit', 'quote_sent', 'deposit_received', 'job_in_progress', 'job_done']

export default function LeadsPage() {
  const [view, setView] = useState<'pipeline' | 'list'>('pipeline')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showNewLeadModal, setShowNewLeadModal] = useState(false)
  const [selectedLead, setSelectedLead] = useState<typeof mockLeads[0] | null>(null)

  const filteredLeads = filterStatus === 'all' 
    ? mockLeads 
    : mockLeads.filter(l => l.status === filterStatus)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Leads</h1>
          <p className="text-slate-400 mt-1">{mockLeads.length} total leads</p>
        </div>
        <button 
          onClick={() => setShowNewLeadModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Lead
        </button>
      </div>

      {/* Filters & View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="input-field pl-10"
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field w-40"
          >
            <option value="all">All Status</option>
            <option value="new_lead">New Lead</option>
            <option value="followup_call">Follow-up</option>
            <option value="appointment_set">Appointment Set</option>
            <option value="quote_sent">Quote Sent</option>
            <option value="deposit_received">Deposit Received</option>
            <option value="job_done">Completed</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2 p-1 bg-slate-800/50 rounded-xl">
          <button
            onClick={() => setView('pipeline')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'pipeline' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Pipeline
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'list' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Pipeline View */}
      {view === 'pipeline' && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {pipelineOrder.map((status) => {
              const config = statusConfig[status]
              const statusLeads = filteredLeads.filter(l => l.status === status)
              
              return (
                <div key={status} className="w-72 flex-shrink-0">
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${config.color}`} />
                        <h3 className="font-semibold text-white">{config.label}</h3>
                      </div>
                      <span className="text-sm text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {statusLeads.length}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      {statusLeads.map((lead) => (
                        <button
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className="w-full text-left p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors group"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <span className="font-medium text-white">{lead.name}</span>
                            {lead.priority === 'high' && (
                              <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded">High</span>
                            )}
                          </div>
                          <p className="text-sm text-slate-400 mb-2">{lead.service}</p>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {lead.created_at}
                            </span>
                          </div>
                        </button>
                      ))}
                      
                      {statusLeads.length === 0 && (
                        <div className="text-center py-6 text-slate-500 text-sm">
                          No leads
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="glass-card rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Lead</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Service</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Source</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Created</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setSelectedLead(lead)}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-white">{lead.name}</div>
                        <div className="text-sm text-slate-400">{lead.phone}</div>
                      </div>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-300">{lead.service}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge ${statusConfig[lead.status].badge}`}>
                      {statusConfig[lead.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-400 text-sm">{lead.source}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-400 text-sm">{lead.created_at}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Lead Detail Slide-over */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedLead(null)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-lg bg-slate-900 border-l border-slate-800 shadow-2xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Lead Details</h2>
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Lead header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl font-bold">
                  {selectedLead.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedLead.name}</h3>
                  <p className="text-slate-400">{selectedLead.service}</p>
                  <span className={`badge ${statusConfig[selectedLead.status].badge} mt-2`}>
                    {statusConfig[selectedLead.status].label}
                  </span>
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors flex flex-col items-center gap-2">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-slate-300">Call</span>
                </button>
                <button className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors flex flex-col items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-slate-300">Email</span>
                </button>
                <button className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors flex flex-col items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-slate-300">Schedule</span>
                </button>
              </div>

              {/* Contact info */}
              <div className="glass-card rounded-xl p-4 mb-6">
                <h4 className="text-sm font-semibold text-slate-400 mb-3">CONTACT INFO</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span className="text-white">{selectedLead.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <span className="text-white">{selectedLead.phone}</span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="glass-card rounded-xl p-4 mb-6">
                <h4 className="text-sm font-semibold text-slate-400 mb-3">DETAILS</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Source</span>
                    <span className="text-white">{selectedLead.source}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Assigned to</span>
                    <span className="text-white">{selectedLead.assigned_to}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Created</span>
                    <span className="text-white">{selectedLead.created_at}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Priority</span>
                    <span className={selectedLead.priority === 'high' ? 'text-red-400' : 'text-white'}>
                      {selectedLead.priority.charAt(0).toUpperCase() + selectedLead.priority.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="glass-card rounded-xl p-4 mb-6">
                <h4 className="text-sm font-semibold text-slate-400 mb-3">NOTES</h4>
                <p className="text-slate-300">{selectedLead.notes}</p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="btn-primary w-full flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" />
                  Create Quote
                </button>
                <button className="btn-secondary w-full flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Send Follow-up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Lead Modal */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowNewLeadModal(false)} />
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Add New Lead</h2>
                <button 
                  onClick={() => setShowNewLeadModal(false)}
                  className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <form className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                  <input type="text" className="input-field" placeholder="Jennifer" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                  <input type="text" className="input-field" placeholder="Mouton" />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input type="email" className="input-field" placeholder="jennifer@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                  <input type="tel" className="input-field" placeholder="(337) 555-0147" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Service Type</label>
                <select className="input-field">
                  <option>Roofing - Shingle Replacement</option>
                  <option>Roofing - Metal Roof</option>
                  <option>Roofing - Repair</option>
                  <option>Roofing - Full Replacement</option>
                  <option>Gutter Installation</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Lead Source</label>
                <select className="input-field">
                  <option>Website Form</option>
                  <option>Google Ads</option>
                  <option>Facebook</option>
                  <option>Referral</option>
                  <option>Nextdoor</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Notes</label>
                <textarea className="input-field h-24" placeholder="Additional details about this lead..." />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowNewLeadModal(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Add Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}