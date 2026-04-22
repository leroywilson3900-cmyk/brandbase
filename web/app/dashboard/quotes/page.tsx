'use client'

import { useState } from 'react'
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Download,
  Send,
  Check,
  X,
  FileText,
  Clock,
  DollarSign,
  User,
  Building2,
  Eye,
  Edit,
  Trash2,
  Copy,
  CheckCircle2,
  AlertCircle,
  Image
} from 'lucide-react'

const mockQuotes = [
  {
    id: 'Q-2024-001',
    customer: 'Robert Cormier',
    email: 'rcormier@bayoucowboy.net',
    phone: '(337) 555-0198',
    service: 'Roofing - Full Replacement',
    amount: 28500,
    status: 'approved',
    created: '2 days ago',
    valid_until: 'Jan 25, 2024',
    items: [
      { name: 'Metal Roof - 12,000 sq ft', qty: 1, unit_price: 18000, total: 18000 },
      { name: 'Removal of Old Roof', qty: 1, unit_price: 4500, total: 4500 },
      { name: 'Permit & Inspection', qty: 1, unit_price: 1200, total: 1200 },
      { name: 'Debris Removal', qty: 1, unit_price: 800, total: 800 },
      { name: 'Site Prep & Setup', qty: 1, unit_price: 1000, total: 1000 },
      { name: 'Insurance Claim Handling', qty: 1, unit_price: 3000, total: 3000 }
    ]
  },
  {
    id: 'Q-2024-002',
    customer: 'Sarah Hebert',
    email: 'shebert@gmail.com',
    phone: '(337) 555-0234',
    service: 'Roofing - Repair',
    amount: 1850,
    status: 'pending_approval',
    created: '1 day ago',
    valid_until: 'Jan 22, 2024',
    items: [
      { name: 'Shingle Replacement (20 sq)', qty: 20, unit_price: 65, total: 1300 },
      { name: 'Flashing Repair', qty: 1, unit_price: 350, total: 350 },
      { name: 'Sealant Application', qty: 1, unit_price: 200, total: 200 }
    ]
  },
  {
    id: 'Q-2024-003',
    customer: 'Jennifer Mouton',
    email: 'jennifer.mouton@email.com',
    phone: '(337) 555-0147',
    service: 'Roofing - Shingle Replacement',
    amount: 14200,
    status: 'sent',
    created: '5 hours ago',
    valid_until: 'Feb 1, 2024',
    items: [
      { name: 'Architectural Shingles - 2,400 sq ft', qty: 1, unit_price: 9600, total: 9600 },
      { name: 'Roof Removal', qty: 1, unit_price: 2400, total: 2400 },
      { name: 'Permit', qty: 1, unit_price: 500, total: 500 },
      { name: 'Gutter Adjustment', qty: 1, unit_price: 700, total: 700 },
      { name: 'Site Cleanup', qty: 1, unit_price: 400, total: 400 },
      { name: 'Roofing Underlayment', qty: 2, unit_price: 300, total: 600 }
    ]
  },
  {
    id: 'Q-2024-004',
    customer: 'Lisa Trahan',
    email: 'lisa.t@outlook.com',
    phone: '(337) 555-0312',
    service: 'Roofing - Metal Roof',
    amount: 18750,
    status: 'accepted',
    created: '1 week ago',
    valid_until: 'Jan 18, 2024',
    items: [
      { name: 'Standing Seam Metal Roof', qty: 2500, unit_price: 7, total: 17500 },
      { name: 'Permit & Prep', qty: 1, unit_price: 1250, total: 1250 }
    ]
  },
  {
    id: 'Q-2024-005',
    customer: 'David Babineaux',
    email: 'dbabineaux@gmail.com',
    phone: '(337) 555-0423',
    service: 'Gutter Installation',
    amount: 3200,
    status: 'paid',
    created: '2 weeks ago',
    valid_until: 'Jan 10, 2024',
    items: [
      { name: '6" Aluminum Gutters - 180 ft', qty: 180, unit_price: 14, total: 2520 },
      { name: 'Downspouts - 6', qty: 6, unit_price: 85, total: 510 },
      { name: 'Removal of Old Gutters', qty: 1, unit_price: 170, total: 170 }
    ]
  }
]

const statusConfig: Record<string, { label: string; badge: string; icon: any; color: string }> = {
  draft: { label: 'Draft', badge: 'badge-info', icon: FileText, color: 'text-blue-400' },
  pending_approval: { label: 'Pending Approval', badge: 'badge-warning', icon: Clock, color: 'text-amber-400' },
  approved: { label: 'Approved', badge: 'badge-success', icon: CheckCircle2, color: 'text-emerald-400' },
  sent: { label: 'Sent', badge: 'badge-info', icon: Send, color: 'text-blue-400' },
  accepted: { label: 'Accepted', badge: 'badge-success', icon: Check, color: 'text-emerald-400' },
  rejected: { label: 'Rejected', badge: 'badge-error', icon: X, color: 'text-red-400' },
  invoiced: { label: 'Invoiced', badge: 'badge-warning', icon: DollarSign, color: 'text-amber-400' },
  paid: { label: 'Paid', badge: 'badge-success', icon: CheckCircle2, color: 'text-emerald-400' },
}

export default function QuotesPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedQuote, setSelectedQuote] = useState<typeof mockQuotes[0] | null>(null)

  const filteredQuotes = filterStatus === 'all'
    ? mockQuotes
    : mockQuotes.filter(q => q.status === filterStatus)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Quotes</h1>
          <p className="text-slate-400 mt-1">
            {filteredQuotes.length} quotes • ${filteredQuotes.reduce((sum, q) => sum + q.amount, 0).toLocaleString()} total value
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Quote
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search quotes..." 
              className="input-field pl-10"
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field w-44"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="pending_approval">Pending Approval</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 p-1 bg-slate-800/50 rounded-xl">
            <button
              onClick={() => setView('grid')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === 'grid' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Grid
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
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuotes.map((quote) => {
            const config = statusConfig[quote.status]
            
            return (
              <button
                key={quote.id}
                onClick={() => setSelectedQuote(quote)}
                className="glass-card-hover rounded-2xl p-6 text-left group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">{quote.id}</div>
                    <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {quote.customer}
                    </h3>
                    <p className="text-sm text-slate-400">{quote.service}</p>
                  </div>
                  <span className={`badge ${config.badge}`}>{config.label}</span>
                </div>
                
                <div className="mb-4">
                  <div className="text-2xl font-bold text-white">
                    ${quote.amount.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Created {quote.created}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <div className="text-xs text-slate-500">
                    Valid until {quote.valid_until}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`badge ${config.badge}`}>{config.label}</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="glass-card rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Quote ID</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Customer</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Service</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Created</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((quote) => {
                const config = statusConfig[quote.status]
                return (
                  <tr key={quote.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-emerald-400">{quote.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-white">{quote.customer}</div>
                        <div className="text-sm text-slate-400">{quote.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-300">{quote.service}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-white">${quote.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${config.badge}`}>{config.label}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-400 text-sm">{quote.created}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedQuote(null)} />
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 p-6 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-emerald-400">{selectedQuote.id}</span>
                  <span className={`badge ${statusConfig[selectedQuote.status].badge}`}>
                    {statusConfig[selectedQuote.status].label}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">{selectedQuote.customer}</h2>
              </div>
              <button 
                onClick={() => setSelectedQuote(null)}
                className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Service & Amount */}
              <div className="glass-card rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-400">Service</span>
                  <span className="text-white font-medium">{selectedQuote.service}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Amount</span>
                  <span className="text-2xl font-bold text-emerald-400">
                    ${selectedQuote.amount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Line Items */}
              <h4 className="text-sm font-semibold text-slate-400 mb-3">LINE ITEMS</h4>
              <div className="glass-card rounded-xl overflow-hidden mb-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400">Item</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-slate-400">Qty</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400">Unit Price</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedQuote.items.map((item, i) => (
                      <tr key={i} className="border-b border-slate-800/50">
                        <td className="px-4 py-3 text-white">{item.name}</td>
                        <td className="px-4 py-3 text-center text-slate-300">{item.qty}</td>
                        <td className="px-4 py-3 text-right text-slate-300">${item.unit_price.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right font-medium text-white">${item.total.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-800/50">
                      <td colSpan={3} className="px-4 py-3 text-right font-semibold text-white">Total</td>
                      <td className="px-4 py-3 text-right font-bold text-emerald-400">
                        ${selectedQuote.amount.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Valid until */}
              <div className="text-center text-sm text-slate-500 mb-6">
                Quote valid until {selectedQuote.valid_until}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors flex flex-col items-center gap-2">
                  <Eye className="w-5 h-5 text-slate-400" />
                  <span className="text-xs text-slate-300">Preview</span>
                </button>
                <button className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors flex flex-col items-center gap-2">
                  <Edit className="w-5 h-5 text-slate-400" />
                  <span className="text-xs text-slate-300">Edit</span>
                </button>
                <button className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors flex flex-col items-center gap-2">
                  <Download className="w-5 h-5 text-slate-400" />
                  <span className="text-xs text-slate-300">PDF</span>
                </button>
                <button className="p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors flex flex-col items-center gap-2">
                  <Send className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs text-emerald-400">Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}