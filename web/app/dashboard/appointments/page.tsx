'use client'

import { useState } from 'react'
import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Video,
  X,
  Check,
  AlertCircle
} from 'lucide-react'

const mockAppointments = [
  {
    id: '1',
    customer: 'Robert Cormier',
    phone: '(337) 555-0198',
    type: 'On-site Estimate',
    status: 'confirmed',
    date: 'Tomorrow',
    time: '10:00 AM',
    duration: '1 hour',
    location: '4450 Hwy 90, Broussard LA',
    assigned_to: 'Jim Butler',
    notes: 'Commercial property. 12,000 sq ft metal roof. Needs lift equipment.',
    calendar: 'google'
  },
  {
    id: '2',
    customer: 'Michael Vincent',
    phone: '(337) 555-0267',
    type: 'On-site Estimate',
    status: 'confirmed',
    date: 'Jan 20, 2024',
    time: '8:00 AM',
    duration: '45 min',
    location: '789 Commerce St, Lafayette LA',
    assigned_to: 'Jim Butler',
    notes: 'Annual inspection for property management company.',
    calendar: 'google'
  },
  {
    id: '3',
    customer: 'Jennifer Mouton',
    phone: '(337) 555-0147',
    type: 'Follow-up Call',
    status: 'scheduled',
    date: 'Jan 18, 2024',
    time: '2:00 PM',
    duration: '15 min',
    location: 'Phone Call',
    assigned_to: 'Marcus Thompson',
    notes: 'Follow up on quote sent. Check insurance status.',
    calendar: 'none'
  },
  {
    id: '4',
    customer: 'Sarah Hebert',
    phone: '(337) 555-0234',
    type: 'On-site Estimate',
    status: 'pending',
    date: 'Jan 19, 2024',
    time: '3:30 PM',
    duration: '1 hour',
    location: '123 Maple Dr, Broussard LA',
    assigned_to: 'Marcus Thompson',
    notes: 'Minor repair. Leak in garage.',
    calendar: 'google'
  },
  {
    id: '5',
    customer: 'Lisa Trahan',
    phone: '(337) 555-0312',
    type: 'Job Completion',
    status: 'confirmed',
    date: 'Jan 15, 2024',
    time: '9:00 AM',
    duration: '2 hours',
    location: '567 Oak Lane, Youngsville LA',
    assigned_to: 'Jim Butler',
    notes: 'Final walkthrough and payment collection.',
    calendar: 'google'
  }
]

const statusConfig: Record<string, { label: string; badge: string; color: string }> = {
  scheduled: { label: 'Scheduled', badge: 'badge-info', color: 'bg-blue-500' },
  confirmed: { label: 'Confirmed', badge: 'badge-success', color: 'bg-emerald-500' },
  pending: { label: 'Pending', badge: 'badge-warning', color: 'bg-amber-500' },
  completed: { label: 'Completed', badge: 'badge-success', color: 'bg-emerald-500' },
  cancelled: { label: 'Cancelled', badge: 'badge-error', color: 'bg-red-500' },
}

const typeColors: Record<string, string> = {
  'On-site Estimate': 'bg-purple-500/20 text-purple-400',
  'Follow-up Call': 'bg-blue-500/20 text-blue-400',
  'Job Completion': 'bg-emerald-500/20 text-emerald-400',
  'Consultation': 'bg-amber-500/20 text-amber-400',
}

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState<'calendar' | 'list'>('list')
  const [selectedAppointment, setSelectedAppointment] = useState<typeof mockAppointments[0] | null>(null)
  const [showNewModal, setShowNewModal] = useState(false)

  // Get dates for the current week
  const getWeekDates = (date: Date) => {
    const week = []
    const start = new Date(date)
    start.setDate(start.getDate() - start.getDay())
    for (let i = 0; i < 7; i++) {
      const d = new Date(start)
      d.setDate(d.getDate() + i)
      week.push(d)
    }
    return week
  }

  const weekDates = getWeekDates(selectedDate)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const navigateWeek = (direction: number) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + (direction * 7))
    setSelectedDate(newDate)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Appointments</h1>
          <p className="text-slate-400 mt-1">{mockAppointments.length} scheduled</p>
        </div>
        <button 
          onClick={() => setShowNewModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Appointment
        </button>
      </div>

      {/* Week Navigation */}
      <div className="glass-card rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigateWeek(-1)}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-semibold text-white">
            {weekDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <button 
            onClick={() => navigateWeek(1)}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {weekDates.map((date, i) => (
            <button
              key={i}
              onClick={() => setSelectedDate(date)}
              className={`
                p-3 rounded-xl text-center transition-colors
                ${isToday(date) 
                  ? 'bg-emerald-500/20 border border-emerald-500/30' 
                  : 'hover:bg-slate-800'
                }
              `}
            >
              <div className={`text-xs ${isToday(date) ? 'text-emerald-400' : 'text-slate-500'} mb-1`}>
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className={`text-lg font-bold ${isToday(date) ? 'text-emerald-400' : 'text-white'}`}>
                {date.getDate()}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {mockAppointments.map((appointment) => (
          <button
            key={appointment.id}
            onClick={() => setSelectedAppointment(appointment)}
            className="w-full glass-card-hover rounded-2xl p-5 text-left group"
          >
            <div className="flex items-start gap-4">
              {/* Time block */}
              <div className={`
                w-20 flex-shrink-0 rounded-xl p-3 text-center
                ${appointment.status === 'confirmed' ? 'bg-emerald-500/20' : 'bg-slate-800/50'}
              `}>
                <div className={`text-xs font-medium ${appointment.status === 'confirmed' ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {appointment.date === 'Tomorrow' ? 'Tomorrow' : new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="text-xl font-bold text-white mt-1">{appointment.time}</div>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {appointment.customer}
                    </h3>
                    <p className="text-sm text-slate-400">{appointment.type}</p>
                  </div>
                  <span className={`badge ${statusConfig[appointment.status].badge}`}>
                    {statusConfig[appointment.status].label}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {appointment.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {appointment.assigned_to}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {appointment.location}
                  </span>
                </div>
              </div>

              {/* Calendar sync indicator */}
              {appointment.calendar === 'google' && (
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center" title="Synced to Google Calendar">
                  <Calendar className="w-4 h-4 text-blue-400" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedAppointment(null)} />
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedAppointment.customer}</h2>
                  <p className="text-slate-400">{selectedAppointment.type}</p>
                </div>
                <button 
                  onClick={() => setSelectedAppointment(null)}
                  className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Status</span>
                <span className={`badge ${statusConfig[selectedAppointment.status].badge}`}>
                  {statusConfig[selectedAppointment.status].label}
                </span>
              </div>

              {/* Date & Time */}
              <div className="glass-card rounded-xl p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">{selectedAppointment.date}</div>
                    <div className="text-slate-400">{selectedAppointment.time} • {selectedAppointment.duration}</div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="glass-card rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Location</div>
                    <div className="text-white font-medium">{selectedAppointment.location}</div>
                  </div>
                </div>
              </div>

              {/* Assigned to */}
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Assigned to</span>
                <span className="text-white font-medium">{selectedAppointment.assigned_to}</span>
              </div>

              {/* Notes */}
              <div className="glass-card rounded-xl p-4">
                <h4 className="text-sm font-semibold text-slate-400 mb-2">NOTES</h4>
                <p className="text-slate-300">{selectedAppointment.notes}</p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button className="btn-secondary flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Customer
                </button>
                <button className="btn-primary flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  Confirm Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Appointment Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowNewModal(false)} />
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Schedule Appointment</h2>
                <button 
                  onClick={() => setShowNewModal(false)}
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
                  <option>Robert Cormier</option>
                  <option>Jennifer Mouton</option>
                  <option>Sarah Hebert</option>
                  <option>Michael Vincent</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Appointment Type</label>
                <select className="input-field">
                  <option>On-site Estimate</option>
                  <option>Follow-up Call</option>
                  <option>Job Completion</option>
                  <option>Consultation</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Date</label>
                  <input type="date" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Time</label>
                  <select className="input-field">
                    <option>8:00 AM</option>
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>1:00 PM</option>
                    <option>2:00 PM</option>
                    <option>3:00 PM</option>
                    <option>4:00 PM</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                <input type="text" className="input-field" placeholder="Address or 'Phone Call'" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Assigned to</label>
                <select className="input-field">
                  <option>Marcus Thompson</option>
                  <option>Jim Butler</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Notes</label>
                <textarea className="input-field h-20" placeholder="Additional details..." />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowNewModal(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}