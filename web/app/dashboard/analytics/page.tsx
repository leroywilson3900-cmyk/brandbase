'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  FileText,
  Calendar,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Target,
  ChevronDown,
  Download,
  Filter,
  Eye
} from 'lucide-react'

const monthlyData = [
  { month: 'Aug', leads: 8, quotes: 5, revenue: 4200 },
  { month: 'Sep', leads: 12, quotes: 8, revenue: 6800 },
  { month: 'Oct', leads: 15, quotes: 10, revenue: 9200 },
  { month: 'Nov', leads: 11, quotes: 7, revenue: 5400 },
  { month: 'Dec', leads: 9, quotes: 6, revenue: 8100 },
  { month: 'Jan', leads: 14, quotes: 9, revenue: 11200 },
]

const leadSources = [
  { name: 'Website Form', value: 35, color: 'bg-emerald-500' },
  { name: 'Google Ads', value: 28, color: 'bg-blue-500' },
  { name: 'Facebook', value: 18, color: 'bg-purple-500' },
  { name: 'Referral', value: 12, color: 'bg-amber-500' },
  { name: 'Other', value: 7, color: 'bg-slate-500' },
]

const serviceBreakdown = [
  { service: 'Roofing - Shingle Replacement', jobs: 12, revenue: 48600 },
  { service: 'Roofing - Metal Roof', jobs: 5, revenue: 37500 },
  { service: 'Roofing - Repair', jobs: 18, revenue: 23400 },
  { service: 'Gutter Installation', jobs: 8, revenue: 9600 },
  { service: 'Roofing - Inspection', jobs: 14, revenue: 4200 },
]

const winRates = [
  { month: 'Aug', rate: 52 },
  { month: 'Sep', rate: 58 },
  { month: 'Oct', rate: 65 },
  { month: 'Nov', rate: 61 },
  { month: 'Dec', rate: 68 },
  { month: 'Jan', rate: 72 },
]

const recentQuotes = [
  { id: 'QT-001', customer: 'Jennifer Mouton', service: 'Roofing - Shingle Replacement', amount: 8400, status: 'pending', created: '2h ago' },
  { id: 'QT-002', customer: 'Robert Cormier', service: 'Roofing - Full Replacement', amount: 18500, status: 'approved', created: '5h ago' },
  { id: 'QT-003', customer: 'Sarah Hebert', service: 'Roofing - Repair', amount: 3200, status: 'accepted', created: '1d ago' },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('last30')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-slate-400 mt-1">Track your business performance</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input-field w-40"
          >
            <option value="last7">Last 7 days</option>
            <option value="last30">Last 30 days</option>
            <option value="last90">Last 90 days</option>
            <option value="ytd">Year to date</option>
          </select>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <span className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4" /> +18%
            </span>
          </div>
          <p className="text-3xl font-bold text-white">14</p>
          <p className="text-slate-400 text-sm mt-1">New Leads</p>
          <p className="text-slate-500 text-xs mt-2">vs 12 last month</p>
        </div>
        
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4" /> +12%
            </span>
          </div>
          <p className="text-3xl font-bold text-white">9</p>
          <p className="text-slate-400 text-sm mt-1">Quotes Sent</p>
          <p className="text-slate-500 text-xs mt-2">vs 8 last month</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-amber-400" />
            </div>
            <span className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4" /> +28%
            </span>
          </div>
          <p className="text-3xl font-bold text-white">$11.2K</p>
          <p className="text-slate-400 text-sm mt-1">Revenue</p>
          <p className="text-slate-500 text-xs mt-2">vs $8.7K last month</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <span className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4" /> +7%
            </span>
          </div>
          <p className="text-3xl font-bold text-white">72%</p>
          <p className="text-slate-400 text-sm mt-1">Win Rate</p>
          <p className="text-slate-500 text-xs mt-2">vs 65% last month</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Revenue Trend</h2>
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              +38% growth
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 pb-4">
            {monthlyData.map((month, i) => (
              <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg transition-all hover:from-emerald-500 hover:to-emerald-300" style={{ height: `${(month.revenue / 12000) * 100}%` }} />
                <span className="text-slate-500 text-xs">{month.month}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-800">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">$44.3K</p>
              <p className="text-slate-400 text-sm">6-Month Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400">$7.4K</p>
              <p className="text-slate-400 text-sm">Monthly Avg</p>
            </div>
          </div>
        </div>

        {/* Lead Sources */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Lead Sources</h2>
            <span className="text-slate-400 text-sm">This month</span>
          </div>
          
          <div className="space-y-4 mb-6">
            {leadSources.map((source) => (
              <div key={source.name} className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${source.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-300 text-sm">{source.name}</span>
                    <span className="text-white text-sm font-medium">{source.value}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${source.color} rounded-full`} style={{ width: `${source.value}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">69</p>
                <p className="text-slate-400 text-sm">Total Leads</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">35%</p>
                <p className="text-slate-400 text-sm">Website Conversion</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Win Rate Trend */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Win Rate Trend</h2>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm">
              <ArrowUpRight className="w-4 h-4" /> +20%
            </div>
          </div>
          
          <div className="h-48 flex items-end justify-between gap-2 pb-4">
            {winRates.map((month, i) => (
              <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg" style={{ height: `${month.rate}%` }} />
                <span className="text-slate-500 text-xs">{month.month}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-800">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">72%</p>
              <p className="text-slate-400 text-sm">Current Win Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">+7%</p>
              <p className="text-slate-400 text-sm">Last Month</p>
            </div>
          </div>
        </div>

        {/* Service Breakdown */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Service Breakdown</h2>
          </div>
          
          <div className="space-y-4">
            {serviceBreakdown.map((service, i) => (
              <div key={service.service} className="flex items-center gap-4">
                <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 text-sm font-medium">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-300 text-sm">{service.service}</span>
                    <span className="text-white text-sm font-medium">${service.revenue.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" 
                      style={{ width: `${(service.jobs / 20) * 100}%` }} 
                    />
                  </div>
                </div>
                <span className="text-slate-500 text-sm w-20 text-right">{service.jobs} jobs</span>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t border-slate-800">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">57</p>
                <p className="text-slate-400 text-sm">Total Jobs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">$122K</p>
                <p className="text-slate-400 text-sm">Total Revenue</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Quotes */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Quotes</h2>
          <Link href="/dashboard/quotes" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-1">
            View all <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left py-3 text-sm font-semibold text-slate-400">Quote</th>
              <th className="text-left py-3 text-sm font-semibold text-slate-400">Customer</th>
              <th className="text-left py-3 text-sm font-semibold text-slate-400">Service</th>
              <th className="text-left py-3 text-sm font-semibold text-slate-400">Amount</th>
              <th className="text-left py-3 text-sm font-semibold text-slate-400">Status</th>
              <th className="text-left py-3 text-sm font-semibold text-slate-400">Created</th>
            </tr>
          </thead>
          <tbody>
            {recentQuotes.map((quote) => (
              <tr key={quote.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                <td className="py-4">
                  <span className="text-blue-400 font-mono">{quote.id}</span>
                </td>
                <td className="py-4">
                  <span className="text-white">{quote.customer}</span>
                </td>
                <td className="py-4">
                  <span className="text-slate-400 text-sm">{quote.service}</span>
                </td>
                <td className="py-4">
                  <span className="text-white font-semibold">${quote.amount.toLocaleString()}</span>
                </td>
                <td className="py-4">
                  <span className={`badge ${
                    quote.status === 'accepted' ? 'badge-success' :
                    quote.status === 'pending' ? 'badge-warning' : 'badge-info'
                  }`}>
                    {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                  </span>
                </td>
                <td className="py-4">
                  <span className="text-slate-500 text-sm">{quote.created}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}