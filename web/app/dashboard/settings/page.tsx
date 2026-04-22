'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Building2,
  User,
  Users,
  Bell,
  Lock,
  CreditCard,
  Globe,
  Mail,
  Phone,
  ChevronRight,
  Check,
  Save,
  Upload,
  X,
  Plus,
  Trash2,
  Shield,
  Key,
  Palette,
  Database,
  AlertTriangle
} from 'lucide-react'

const tabs = [
  { id: 'business', label: 'Business', icon: Building2 },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'integrations', label: 'Integrations', icon: Globe },
]

const teamMembers = [
  { id: '1', name: 'Marcus Thompson', email: 'marcus@bayouroofing.com', role: 'Owner', avatar: 'MT', status: 'active' },
  { id: '2', name: 'Jim Butler', email: 'jim@bayouroofing.com', role: 'Tradesperson', avatar: 'JB', status: 'active' },
  { id: '3', name: 'Ashley Viator', email: 'ashley@bayouroofing.com', role: 'Admin', avatar: 'AV', status: 'active' },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('business')
  const [showAddUserModal, setShowAddUserModal] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-1">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-800/50 rounded-xl overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Business Tab */}
      {activeTab === 'business' && (
        <div className="space-y-6">
          {/* Business Info */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Business Information</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Business Name</label>
                <input type="text" className="input-field" defaultValue="Bayou Roofing LLC" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Industry</label>
                <select className="input-field" defaultValue="roofing">
                  <option value="roofing">Roofing</option>
                  <option value="hvac">HVAC</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="landscaping">Landscaping</option>
                  <option value="cleaning">Cleaning</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                <input type="text" className="input-field" defaultValue="(337) 555-0100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input type="email" className="input-field" defaultValue="info@bayouroofing.com" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Address</label>
                <input type="text" className="input-field" defaultValue="1204 S. Market St, Suite 201, Lafayette, LA 70501" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <button className="btn-secondary flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Logo
                  </button>
                </div>
              </div>
            </div>
            <button className="btn-primary mt-6 flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>

          {/* Brand Settings */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Brand Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Primary Color</label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500" />
                  <input type="text" className="input-field w-32" defaultValue="#10B981" />
                  <input type="color" className="w-12 h-12 rounded-lg cursor-pointer" defaultValue="#10B981" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Quote Footer Text</label>
                <textarea className="input-field h-20" defaultValue="Thank you for choosing Bayou Roofing. We look forward to working with you!" />
              </div>
            </div>
            <button className="btn-primary mt-6 flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Team Tab */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Team Members</h2>
              <button 
                onClick={() => setShowAddUserModal(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Member
              </button>
            </div>
            
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold">
                      {member.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{member.name}</span>
                        {member.role === 'Owner' && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs">Owner</span>
                        )}
                      </div>
                      <span className="text-slate-400 text-sm">{member.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-400 text-sm">{member.role}</span>
                    <span className="flex items-center gap-1 text-emerald-400 text-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Active
                    </span>
                    <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          {/* Current Plan */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Current Plan</h2>
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-white">Pro</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">Active</span>
                </div>
                <p className="text-slate-400 text-sm mt-1">$79/month • Renews Feb 22, 2026</p>
              </div>
              <button className="btn-secondary">Upgrade Plan</button>
            </div>
          </div>

          {/* Features */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Plan Features</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                <Check className="w-5 h-5 text-emerald-400" />
                <span className="text-slate-300">Unlimited Leads</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                <Check className="w-5 h-5 text-emerald-400" />
                <span className="text-slate-300">Unlimited Quotes</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                <Check className="w-5 h-5 text-emerald-400" />
                <span className="text-slate-300">AI Lead Scoring</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                <Check className="w-5 h-5 text-emerald-400" />
                <span className="text-slate-300">E-Signatures</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                <Check className="w-5 h-5 text-emerald-400" />
                <span className="text-slate-300">Social Automation</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                <Check className="w-5 h-5 text-emerald-400" />
                <span className="text-slate-300">5 Team Members</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Payment Method</h2>
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-slate-300" />
                </div>
                <div>
                  <p className="font-medium text-white">Visa ending in 4242</p>
                  <p className="text-slate-400 text-sm">Expires 12/2027</p>
                </div>
              </div>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">Update</button>
            </div>
          </div>

          {/* Billing History */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Billing History</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 text-sm font-semibold text-slate-400">Date</th>
                  <th className="text-left py-3 text-sm font-semibold text-slate-400">Description</th>
                  <th className="text-left py-3 text-sm font-semibold text-slate-400">Amount</th>
                  <th className="text-right py-3 text-sm font-semibold text-slate-400">Invoice</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-800/50">
                  <td className="py-3 text-slate-400">Jan 22, 2026</td>
                  <td className="py-3 text-white">Pro Plan - Monthly</td>
                  <td className="py-3 text-white">$79.00</td>
                  <td className="py-3 text-right"><button className="text-blue-400 hover:text-blue-300 text-sm">Download</button></td>
                </tr>
                <tr className="border-b border-slate-800/50">
                  <td className="py-3 text-slate-400">Dec 22, 2025</td>
                  <td className="py-3 text-white">Pro Plan - Monthly</td>
                  <td className="py-3 text-white">$79.00</td>
                  <td className="py-3 text-right"><button className="text-blue-400 hover:text-blue-300 text-sm">Download</button></td>
                </tr>
                <tr>
                  <td className="py-3 text-slate-400">Nov 22, 2025</td>
                  <td className="py-3 text-white">Pro Plan - Monthly</td>
                  <td className="py-3 text-white">$79.00</td>
                  <td className="py-3 text-right"><button className="text-blue-400 hover:text-blue-300 text-sm">Download</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Email Notifications</h2>
            <div className="space-y-4">
              {[
                { label: 'New lead assigned', description: 'Get notified when a lead is assigned to you', enabled: true },
                { label: 'Quote status changes', description: 'Get notified when a quote status changes', enabled: true },
                { label: 'Customer responses', description: 'Get notified when a customer responds to a quote', enabled: true },
                { label: 'Daily summary', description: 'Receive a daily summary of your pipeline activity', enabled: false },
                { label: 'Payment received', description: 'Get notified when an invoice is paid', enabled: true },
                { label: 'Weekly performance', description: 'Receive a weekly performance report', enabled: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50">
                  <div>
                    <p className="font-medium text-white">{item.label}</p>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                  <button className={`relative w-12 h-6 rounded-full transition-colors ${item.enabled ? 'bg-emerald-500' : 'bg-slate-600'}`}>
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${item.enabled ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Mobile Notifications</h2>
            <div className="space-y-4">
              {[
                { label: 'Push notifications', description: 'Receive push notifications on your mobile device', enabled: true },
                { label: 'SMS alerts', description: 'Get SMS for urgent items like overdue payments', enabled: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50">
                  <div>
                    <p className="font-medium text-white">{item.label}</p>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                  <button className={`relative w-12 h-6 rounded-full transition-colors ${item.enabled ? 'bg-emerald-500' : 'bg-slate-600'}`}>
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${item.enabled ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Password</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
                <input type="password" className="input-field" placeholder="••••••••" />
              </div>
              <div />
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                <input type="password" className="input-field" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
                <input type="password" className="input-field" placeholder="••••••••" />
              </div>
            </div>
            <button className="btn-primary mt-6 flex items-center gap-2">
              <Key className="w-4 h-4" />
              Update Password
            </button>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Two-Factor Authentication</h2>
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="font-medium text-white">2FA is not enabled</p>
                  <p className="text-slate-400 text-sm">Add an extra layer of security to your account</p>
                </div>
              </div>
              <button className="btn-secondary">Enable 2FA</button>
            </div>
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
                <p className="text-sm text-slate-300">We recommend enabling two-factor authentication to protect your account from unauthorized access.</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Active Sessions</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">MacBook Pro — Lafayette, LA</p>
                    <p className="text-slate-400 text-sm">Chrome • Last active 2 hours ago</p>
                  </div>
                </div>
                <span className="badge badge-success">Current</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">iPhone 15 — Lafayette, LA</p>
                    <p className="text-slate-400 text-sm">Safari • Last active 3 days ago</p>
                  </div>
                </div>
                <button className="text-red-400 hover:text-red-300 text-sm">Revoke</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Connected Services</h2>
            <div className="space-y-4">
              {[
                { name: 'QuickBooks', description: 'Accounting and invoicing', icon: '💼', connected: true },
                { name: 'Google Calendar', description: 'Sync appointments', icon: '📅', connected: true },
                { name: 'Stripe', description: 'Payment processing', icon: '💳', connected: true },
                { name: 'DocuSign', description: 'E-signatures', icon: '✍️', connected: false },
                { name: 'Google Ads', description: 'Lead tracking', icon: '📊', connected: false },
              ].map((service, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                      <p className="font-medium text-white">{service.name}</p>
                      <p className="text-slate-400 text-sm">{service.description}</p>
                    </div>
                  </div>
                  <button className={service.connected ? 'text-red-400 hover:text-red-300 text-sm' : 'btn-secondary text-sm'}>
                    {service.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6">API Access</h2>
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 mb-4">
              <div>
                <p className="font-medium text-white">API Key</p>
                <p className="text-slate-400 text-sm">Use this key to connect with third-party apps</p>
              </div>
              <button className="btn-secondary">Generate Key</button>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50">
              <p className="text-slate-400 text-sm mb-2">Webhook URL</p>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  className="input-field flex-1" 
                  placeholder="https://your-app.com/webhook"
                  readOnly 
                />
                <button className="btn-secondary">Test</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Team Member Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddUserModal(false)} />
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Add Team Member</h2>
                <button 
                  onClick={() => setShowAddUserModal(false)}
                  className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <input type="text" className="input-field" placeholder="John Smith" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input type="email" className="input-field" placeholder="john@company.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
                <select className="input-field">
                  <option>Tradesperson</option>
                  <option>Admin</option>
                  <option>Viewer</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddUserModal(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function Monitor(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="14" x="2" y="3" rx="2"/>
      <line x1="8" x2="16" y1="21" y2="21"/>
      <line x1="12" x2="12" y1="17" y2="21"/>
    </svg>
  )
}

function Smartphone(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
      <path d="M12 18h.01"/>
    </svg>
  )
}