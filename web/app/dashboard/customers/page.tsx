'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  Building2,
  ChevronRight,
  X,
  Clock,
  DollarSign,
  FileText,
  MessageSquare,
  MoreHorizontal,
  ChevronDown,
  User,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  Eye
} from 'lucide-react'

const mockCustomers = [
  {
    id: '1',
    name: 'Jennifer Mouton',
    email: 'jennifer.mouton@email.com',
    phone: '(337) 555-0147',
    address: '2847 W. Bishop Stringer Rd, Broussard, LA 70518',
    company: null,
    total_spent: 0,
    jobs_completed: 0,
    last_job: null,
    created_at: '2 hours ago',
    status: 'lead'
  },
  {
    id: '2',
    name: 'Robert Cormier',
    email: 'rcormier@bayoucowboy.net',
    phone: '(337) 555-0198',
    address: '1204 S. Market St, Lafayette, LA 70501',
    company: 'Cormier Properties LLC',
    total_spent: 0,
    jobs_completed: 0,
    last_job: null,
    created_at: '5 hours ago',
    status: 'lead'
  },
  {
    id: '3',
    name: 'Sarah Hebert',
    email: 'shebert@gmail.com',
    phone: '(337) 555-0234',
    address: '8923 Old Jeanerette Rd, Lafayette, LA 70506',
    company: null,
    total_spent: 4750,
    jobs_completed: 1,
    last_job: 'Jan 15, 2026',
    created_at: '1 day ago',
    status: 'customer'
  },
  {
    id: '4',
    name: 'Lisa Trahan',
    email: 'lisa.t@outlook.com',
    phone: '(337) 555-0312',
    address: '4455 Bonin Rd, Youngsville, LA 70592',
    company: null,
    total_spent: 12000,
    jobs_completed: 2,
    last_job: 'Jan 18, 2026',
    created_at: '3 days ago',
    status: 'customer'
  },
  {
    id: '5',
    name: 'David Babineaux',
    email: 'dbabineaux@gmail.com',
    phone: '(337) 555-0423',
    address: '7722 US-90, New Iberia, LA 70560',
    company: 'Babineaux Property Management',
    total_spent: 8400,
    jobs_completed: 3,
    last_job: 'Jan 10, 2026',
    created_at: '1 week ago',
    status: 'customer'
  },
  {
    id: '6',
    name: 'Michael Vincent',
    email: 'mvincent@la-law.com',
    phone: '(337) 555-0267',
    address: '100 St. Mary Blvd, Lafayette, LA 70506',
    company: 'Vincent Law Group',
    total_spent: 0,
    jobs_completed: 0,
    last_job: null,
    created_at: '2 days ago',
    status: 'lead'
  }
]

export default function CustomersPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null)
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false)

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (customer.company?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Customers</h1>
          <p className="text-slate-400 mt-1">{mockCustomers.length} total contacts</p>
        </div>
        <button 
          onClick={() => setShowNewCustomerModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Customer
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="input-field pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field w-40"
          >
            <option value="all">All</option>
            <option value="lead">Leads</option>
            <option value="customer">Customers</option>
          </select>
        </div>
        
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

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((customer) => (
            <button
              key={customer.id}
              onClick={() => setSelectedCustomer(customer)}
              className="glass-card rounded-2xl p-6 text-left hover:bg-slate-800/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl font-bold">
                    {customer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{customer.name}</h3>
                    {customer.company && (
                      <p className="text-sm text-slate-400">{customer.company}</p>
                    )}
                  </div>
                </div>
                <span className={`badge ${customer.status === 'customer' ? 'badge-success' : 'badge-info'}`}>
                  {customer.status === 'customer' ? 'Customer' : 'Lead'}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <Mail className="w-4 h-4 text-slate-500" />
                  {customer.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <Phone className="w-4 h-4 text-slate-500" />
                  {customer.phone}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span className="truncate">{customer.address}</span>
                </div>
              </div>

              {customer.status === 'customer' && (
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-white">${customer.total_spent.toLocaleString()}</p>
                      <p className="text-sm text-slate-400">{customer.jobs_completed} jobs completed</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-400">Last job</p>
                      <p className="text-white">{customer.last_job}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                View details <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="glass-card rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Customer</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Contact</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Total Spent</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-400">Last Job</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setSelectedCustomer(customer)}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-white">{customer.name}</div>
                        {customer.company && (
                          <div className="text-sm text-slate-400">{customer.company}</div>
                        )}
                      </div>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-400 text-sm">{customer.email}</div>
                    <div className="text-slate-500 text-sm">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge ${customer.status === 'customer' ? 'badge-success' : 'badge-info'}`}>
                      {customer.status === 'customer' ? 'Customer' : 'Lead'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {customer.status === 'customer' ? (
                      <span className="text-white font-semibold">${customer.total_spent.toLocaleString()}</span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {customer.last_job ? (
                      <span className="text-slate-400 text-sm">{customer.last_job}</span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setSelectedCustomer(customer)}
                        className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Customer Detail Slide-over */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedCustomer(null)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-lg bg-slate-900 border-l border-slate-800 shadow-2xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Customer Details</h2>
                <button 
                  onClick={() => setSelectedCustomer(null)}
                  className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Customer header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl font-bold">
                  {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedCustomer.name}</h3>
                  {selectedCustomer.company && (
                    <p className="text-slate-400">{selectedCustomer.company}</p>
                  )}
                  <span className={`badge ${selectedCustomer.status === 'customer' ? 'badge-success' : 'badge-info'} mt-2`}>
                    {selectedCustomer.status === 'customer' ? 'Customer' : 'Lead'}
                  </span>
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                <button className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors flex flex-col items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-slate-300">Call</span>
                </button>
                <button className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors flex flex-col items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-slate-300">Email</span>
                </button>
                <button className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors flex flex-col items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-slate-300">Schedule</span>
                </button>
                <button className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors flex flex-col items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-slate-300">Quote</span>
                </button>
              </div>

              {/* Contact info */}
              <div className="glass-card rounded-xl p-4 mb-6">
                <h4 className="text-sm font-semibold text-slate-400 mb-3">CONTACT INFO</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span className="text-white">{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <span className="text-white">{selectedCustomer.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span className="text-white">{selectedCustomer.address}</span>
                  </div>
                </div>
              </div>

              {/* Stats (if customer) */}
              {selectedCustomer.status === 'customer' && (
                <div className="glass-card rounded-xl p-4 mb-6">
                  <h4 className="text-sm font-semibold text-slate-400 mb-3">ACCOUNT STATS</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-slate-800/50">
                      <p className="text-2xl font-bold text-emerald-400">${selectedCustomer.total_spent.toLocaleString()}</p>
                      <p className="text-sm text-slate-400">Total Spent</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/50">
                      <p className="text-2xl font-bold text-white">{selectedCustomer.jobs_completed}</p>
                      <p className="text-sm text-slate-400">Jobs Completed</p>
                    </div>
                  </div>
                  {selectedCustomer.last_job && (
                    <div className="mt-3 text-sm text-slate-400">
                      Last job: <span className="text-white">{selectedCustomer.last_job}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                {selectedCustomer.status === 'lead' ? (
                  <>
                    <button className="btn-primary w-full flex items-center justify-center gap-2">
                      <FileText className="w-5 h-5" />
                      Create Quote
                    </button>
                    <button className="btn-secondary w-full flex items-center justify-center gap-2">
                      <User className="w-5 h-5" />
                      Convert to Customer
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn-primary w-full flex items-center justify-center gap-2">
                      <FileText className="w-5 h-5" />
                      Create New Quote
                    </button>
                    <button className="btn-secondary w-full flex items-center justify-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Schedule Follow-up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Customer Modal */}
      {showNewCustomerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowNewCustomerModal(false)} />
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Add New Customer</h2>
                <button 
                  onClick={() => setShowNewCustomerModal(false)}
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
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Company (Optional)</label>
                <input type="text" className="input-field" placeholder="Company name" />
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
                <label className="block text-sm font-medium text-slate-300 mb-2">Address</label>
                <input type="text" className="input-field" placeholder="2847 W. Bishop Stringer Rd, Broussard, LA 70518" />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowNewCustomerModal(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}