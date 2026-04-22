'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Mail,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  X,
  FileText,
  Send,
  CreditCard,
  Building2
} from 'lucide-react'

const mockInvoices = [
  {
    id: 'INV-001',
    customer: 'Sarah Hebert',
    email: 'shebert@gmail.com',
    phone: '(337) 555-0234',
    service: 'Roofing - Repair',
    amount: 4750,
    status: 'paid',
    due_date: 'Jan 20, 2026',
    paid_date: 'Jan 18, 2026',
    created_at: 'Jan 15, 2026'
  },
  {
    id: 'INV-002',
    customer: 'Lisa Trahan',
    email: 'lisa.t@outlook.com',
    phone: '(337) 555-0312',
    service: 'Roofing - Metal Roof',
    amount: 12000,
    status: 'paid',
    due_date: 'Jan 25, 2026',
    paid_date: 'Jan 22, 2026',
    created_at: 'Jan 18, 2026'
  },
  {
    id: 'INV-003',
    customer: 'David Babineaux',
    email: 'dbabineaux@gmail.com',
    phone: '(337) 555-0423',
    service: 'Gutter Installation',
    amount: 2800,
    status: 'pending',
    due_date: 'Feb 1, 2026',
    paid_date: null,
    created_at: 'Jan 10, 2026'
  },
  {
    id: 'INV-004',
    customer: 'Robert Cormier',
    email: 'rcormier@bayoucowboy.net',
    phone: '(337) 555-0198',
    service: 'Roofing - Full Replacement',
    amount: 18500,
    status: 'sent',
    due_date: 'Feb 10, 2026',
    paid_date: null,
    created_at: 'Jan 20, 2026'
  },
  {
    id: 'INV-005',
    customer: 'Michael Vincent',
    email: 'mvincent@la-law.com',
    phone: '(337) 555-0267',
    service: 'Roofing - Inspection',
    amount: 350,
    status: 'overdue',
    due_date: 'Jan 15, 2026',
    paid_date: null,
    created_at: 'Jan 12, 2026'
  }
]

const mockPayments = [
  {
    id: 'PAY-001',
    invoice_id: 'INV-001',
    customer: 'Sarah Hebert',
    amount: 4750,
    method: 'Credit Card',
    date: 'Jan 18, 2026',
    status: 'completed'
  },
  {
    id: 'PAY-002',
    invoice_id: 'INV-002',
    customer: 'Lisa Trahan',
    amount: 12000,
    method: 'Check',
    date: 'Jan 22, 2026',
    status: 'completed'
  }
]

const statusConfig: Record<string, { label: string; badge: string; color: string; icon: typeof CheckCircle }> = {
  paid: { label: 'Paid', badge: 'badge-success', color: 'text-emerald-400', icon: CheckCircle },
  pending: { label: 'Pending', badge: 'badge-warning', color: 'text-amber-400', icon: Clock },
  sent: { label: 'Sent', badge: 'badge-info', color: 'text-blue-400', icon: Send },
  overdue: { label: 'Overdue', badge: 'badge-error', color: 'text-red-400', icon: AlertCircle },
  draft: { label: 'Draft', badge: 'badge-neutral', color: 'text-slate-400', icon: FileText }
}

export default function PaymentsPage() {
  const [view, setView] = useState<'invoices' | 'payments'>('invoices')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedInvoice, setSelectedInvoice] = useState<typeof mockInvoices[0] | null>(null)
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false)

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalRevenue = mockInvoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0)
  
  const pendingRevenue = mockInvoices
    .filter(i => ['pending', 'sent'].includes(i.status))
    .reduce((sum, i) => sum + i.amount, 0)

  const overdueAmount = mockInvoices
    .filter(i => i.status === 'overdue')
    .reduce((sum, i) => sum + i.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Payments</h1>
          <p className="text-slate-400 mt-1">Manage invoices and track payments</p>
        </div>
        <button 
          onClick={() => setShowNewInvoiceModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Invoice
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Pending</p>
              <p className="text-2xl font-bold text-white">${pendingRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Overdue</p>
              <p className="text-2xl font-bold text-white">${overdueAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 p-1 bg-slate-800/50 rounded-xl">
          <button
            onClick={() => setView('invoices')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'invoices' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Invoices
          </button>
          <button
            onClick={() => setView('payments')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'payments' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Payments
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="input-field pl-10 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field w-40"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="sent">Sent</option>
            <option value="overdue">Overdue</option>
          </select>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Invoices View */}
      {view === 'invoices' && (
        <div className="glass-card rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Invoice</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Customer</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Service</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Due Date</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => {
                const status = statusConfig[invoice.status]
                return (
                  <tr key={invoice.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedInvoice(invoice)}
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                      >
                        {invoice.id}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{invoice.customer}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-400 text-sm">{invoice.service}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-semibold">${invoice.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${status.badge}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm ${invoice.status === 'overdue' ? 'text-red-400' : 'text-slate-400'}`}>
                        {invoice.due_date}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setSelectedInvoice(invoice)}
                          className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {invoice.status !== 'paid' && (
                          <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                            <Send className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                          <CreditCard className="w-4 h-4" />
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

      {/* Payments View */}
      {view === 'payments' && (
        <div className="glass-card rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Payment ID</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Invoice</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Customer</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Method</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-slate-400 font-mono">{payment.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-blue-400 hover:text-blue-300 cursor-pointer">{payment.invoice_id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white">{payment.customer}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-semibold">${payment.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-400 text-sm">{payment.method}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-400 text-sm">{payment.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="badge badge-success">Completed</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Invoice Detail Slide-over */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedInvoice(null)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-lg bg-slate-900 border-l border-slate-800 shadow-2xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Invoice Details</h2>
                <button 
                  onClick={() => setSelectedInvoice(null)}
                  className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Invoice header */}
              <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-slate-800/50">
                <div>
                  <p className="text-2xl font-bold text-white">{selectedInvoice.id}</p>
                  <p className="text-slate-400 text-sm">Created {selectedInvoice.created_at}</p>
                </div>
                <span className={`badge ${statusConfig[selectedInvoice.status].badge}`}>
                  {statusConfig[selectedInvoice.status].label}
                </span>
              </div>

              {/* Customer info */}
              <div className="glass-card rounded-xl p-4 mb-6">
                <h4 className="text-sm font-semibold text-slate-400 mb-3">BILL TO</h4>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold">
                    {selectedInvoice.customer.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-white">{selectedInvoice.customer}</p>
                    <p className="text-sm text-slate-400">{selectedInvoice.email}</p>
                  </div>
                </div>
              </div>

              {/* Invoice details */}
              <div className="glass-card rounded-xl p-4 mb-6">
                <h4 className="text-sm font-semibold text-slate-400 mb-3">SERVICES</h4>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">{selectedInvoice.service}</span>
                  <span className="text-white">${selectedInvoice.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-slate-800">
                  <span className="font-semibold text-white">Total</span>
                  <span className="text-xl font-bold text-emerald-400">${selectedInvoice.amount.toLocaleString()}</span>
                </div>
              </div>

              {/* Dates */}
              <div className="glass-card rounded-xl p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">Due Date</span>
                  <span className={`${selectedInvoice.status === 'overdue' ? 'text-red-400' : 'text-white'}`}>
                    {selectedInvoice.due_date}
                  </span>
                </div>
                {selectedInvoice.paid_date && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Paid Date</span>
                    <span className="text-emerald-400">{selectedInvoice.paid_date}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {selectedInvoice.status !== 'paid' && (
                  <>
                    <button className="btn-primary w-full flex items-center justify-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Record Payment
                    </button>
                    <button className="btn-secondary w-full flex items-center justify-center gap-2">
                      <Mail className="w-5 h-5" />
                      Resend Invoice
                    </button>
                  </>
                )}
                <button className="btn-secondary w-full flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Invoice Modal */}
      {showNewInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowNewInvoiceModal(false)} />
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Create Invoice</h2>
                <button 
                  onClick={() => setShowNewInvoiceModal(false)}
                  className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Customer</label>
                <select className="input-field">
                  <option>Select customer...</option>
                  <option>Jennifer Mouton</option>
                  <option>Robert Cormier</option>
                  <option>Michael Vincent</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Service</label>
                <input type="text" className="input-field" placeholder="Roofing - Repair" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Amount</label>
                <input type="text" className="input-field" placeholder="$4,750" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Due Date</label>
                <input type="date" className="input-field" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Notes (Optional)</label>
                <textarea className="input-field h-20" placeholder="Additional notes..." />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowNewInvoiceModal(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Create Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}