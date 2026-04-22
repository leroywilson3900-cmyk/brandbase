'use client'

import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  MessageSquare,
  Star,
  ChevronRight,
  Plus
} from 'lucide-react'
import Link from 'next/link'

const metrics = [
  {
    name: 'Active Leads',
    value: '12',
    change: '+3 this week',
    changeType: 'up',
    icon: Users,
    color: 'blue'
  },
  {
    name: 'Quotes Sent',
    value: '8',
    change: '2 pending approval',
    changeType: 'neutral',
    icon: FileText,
    color: 'amber'
  },
  {
    name: 'Revenue',
    value: '$7,641',
    change: '+$2,150 this month',
    changeType: 'up',
    icon: DollarSign,
    color: 'emerald'
  },
  {
    name: 'Win Rate',
    value: '68%',
    change: '+12% vs last month',
    changeType: 'up',
    icon: TrendingUp,
    color: 'purple'
  }
]

const recentLeads = [
  { name: 'Jennifer Mouton', service: 'Roofing - Shingle Replacement', status: 'new_lead', time: '2h ago' },
  { name: 'Robert Cormier', service: 'Roofing - Full Replacement', status: 'appointment_set', time: '5h ago' },
  { name: 'Sarah Hebert', service: 'Roofing - Repair', status: 'quote_sent', time: '1d ago' },
]

const upcomingAppointments = [
  { customer: 'Robert Cormier', type: 'On-site Estimate', time: 'Tomorrow, 10:00 AM', user: 'Jim Butler' },
  { customer: 'Michael Vincent', type: 'On-site Estimate', time: 'Jan 20, 8:00 AM', user: 'Jim Butler' },
]

const statusColors: Record<string, string> = {
  new_lead: 'badge-info',
  followup_call: 'badge-warning',
  appointment_set: 'badge-success',
  on_site_visit: 'badge-success',
  quote_sent: 'badge-warning',
  deposit_received: 'badge-success',
  job_in_progress: 'badge-success',
  payment_complete: 'badge-success',
  job_done: 'badge-success',
  lost: 'badge-error'
}

const statusLabels: Record<string, string> = {
  new_lead: 'New',
  followup_call: 'Follow-up',
  appointment_set: 'Appt Set',
  on_site_visit: 'On-site',
  quote_sent: 'Quote Sent',
  deposit_received: 'Deposit',
  job_in_progress: 'In Progress',
  payment_complete: 'Paid',
  job_done: 'Complete',
  lost: 'Lost'
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Welcome back, Marcus</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/leads/new" className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Lead
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="metric-card">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-${metric.color}-500/10 flex items-center justify-center`}>
                <metric.icon className={`w-6 h-6 text-${metric.color}-400`} />
              </div>
              {metric.changeType === 'up' && (
                <ArrowUpRight className="w-5 h-5 text-emerald-400" />
              )}
              {metric.changeType === 'down' && (
                <ArrowDownRight className="w-5 h-5 text-red-400" />
              )}
            </div>
            <div className="metric-value">{metric.value}</div>
            <div className="metric-label">{metric.name}</div>
            <div className={`metric-change ${metric.changeType}`}>{metric.change}</div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Leads</h2>
            <Link href="/dashboard/leads" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentLeads.map((lead, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold">
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-white">{lead.name}</div>
                    <div className="text-sm text-slate-400">{lead.service}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`badge ${statusColors[lead.status]}`}>
                    {statusLabels[lead.status]}
                  </span>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" />
                    {lead.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Upcoming</h2>
            <Link href="/dashboard/appointments" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {upcomingAppointments.map((apt, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-800/50">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white">{apt.customer}</div>
                    <div className="text-sm text-slate-400">{apt.type}</div>
                    <div className="text-sm text-emerald-400 mt-1">{apt.time}</div>
                    <div className="text-xs text-slate-500 mt-1">Assigned to {apt.user}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Link href="/dashboard/appointments/new" className="mt-4 btn-secondary w-full flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Schedule Appointment
          </Link>
        </div>
      </div>

      {/* Quick Actions + AI Insights */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/dashboard/leads/new" className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-slate-300">Add Lead</span>
            </Link>
            <Link href="/dashboard/quotes/new" className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors flex items-center gap-3">
              <FileText className="w-5 h-5 text-amber-400" />
              <span className="text-slate-300">Create Quote</span>
            </Link>
            <Link href="/dashboard/social/compose" className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-purple-400" />
              <span className="text-slate-300">Compose Post</span>
            </Link>
            <Link href="/dashboard/analytics" className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span className="text-slate-300">View Analytics</span>
            </Link>
          </div>
        </div>

        {/* AI Insights */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold text-white">AI Insights</h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">Beta</span>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <div className="font-medium text-white">Hot Lead Detected</div>
                  <div className="text-sm text-slate-400 mt-1">
                    Robert Cormier has responded 3 times this week. Consider calling today.
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <div className="font-medium text-white">Best Time to Post</div>
                  <div className="text-sm text-slate-400 mt-1">
                    Thursday 10 AM on Instagram got 40% more engagement last month.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
