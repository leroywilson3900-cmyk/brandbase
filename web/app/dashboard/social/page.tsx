'use client'

import { useState } from 'react'
import {
  Plus,
  Search,
  Calendar,
  MessageSquare,
  Image,
  Video,
  ThumbsUp,
  MessageCircle,
  Share2,
  Eye,
  Clock,
  RefreshCw,
  Send,
  Check,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Sparkles,
  Copy,
  Edit,
  Trash2,
  MoreHorizontal,
  FileText,
  Wand2,
  Loader2
} from 'lucide-react'

const mockPosts = [
  {
    id: '1',
    content: "🏠 Your roof works hard every day — rain, sun, Louisiana heat. When was the last time you gave it a thorough inspection?\n\nAt Bayou Roofing, we offer FREE roof assessments. Let our experts spot potential issues before they become costly repairs.\n\n📞 Call today: (337) 555-0147",
    platform: 'instagram',
    status: 'published',
    scheduled_for: null,
    published_at: '2 days ago',
    likes: 47,
    comments: 5,
    shares: 3
  },
  {
    id: '2',
    content: "Did you know? The average roof lasts 20-25 years, but Louisiana weather can shorten that. ⛈️\n\nIf your roof is over 15 years old, it's time for an inspection.\n\n✅ Book your FREE assessment at BayouRoofingLA.com",
    platform: 'facebook',
    status: 'published',
    scheduled_for: null,
    published_at: '4 days ago',
    likes: 89,
    comments: 12,
    shares: 8
  },
  {
    id: '3',
    content: "New week, new roof goals! 🚀\n\nWe're excited to share that we've helped 50+ Louisiana families protect their homes this year alone.\n\nFrom Lafayette to Broussard, we're the LOCAL team you can trust. 🏡\n\n#Roofing #Louisiana #LocalBusiness",
    platform: 'instagram',
    status: 'scheduled',
    scheduled_for: 'Tomorrow, 10:00 AM',
    published_at: null,
    likes: null,
    comments: null,
    shares: null
  },
  {
    id: '4',
    content: "⏰ REMINDER: The weekend is the perfect time to check your roof for storm damage.\n\nLook for:\n• Missing shingles\n• Water stains on ceilings\n• Debris accumulation\n\nFound something? Don't wait — call us at (337) 555-0147",
    platform: 'twitter',
    status: 'scheduled',
    scheduled_for: 'Jan 21, 8:00 AM',
    published_at: null,
    likes: null,
    comments: null,
    shares: null
  },
  {
    id: '5',
    content: "We believe in doing the job RIGHT the first time. No shortcuts, no compromises.\n\nThat's why Bayou Roofing offers a 10-year workmanship warranty on every installation. 🏠\n\nYour home deserves the best. Contact us today!",
    platform: 'facebook',
    status: 'draft',
    scheduled_for: null,
    published_at: null,
    likes: null,
    comments: null,
    shares: null
  }
]

const platformIcons: Record<string, any> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
}

const platformColors: Record<string, string> = {
  instagram: 'bg-pink-500/20 text-pink-400',
  facebook: 'bg-blue-500/20 text-blue-400',
  twitter: 'bg-sky-500/20 text-sky-400',
  linkedin: 'bg-blue-500/20 text-blue-400',
}

const statusConfig: Record<string, { label: string; badge: string; color: string }> = {
  draft: { label: 'Draft', badge: 'badge-info', color: 'bg-blue-500' },
  scheduled: { label: 'Scheduled', badge: 'badge-warning', color: 'bg-amber-500' },
  published: { label: 'Published', badge: 'badge-success', color: 'bg-emerald-500' },
}

const contentTypes = [
  { id: 'educational', label: 'Educational', icon: FileText, color: 'blue' },
  { id: 'showcase', label: 'Showcase', icon: Image, color: 'purple' },
  { id: 'testimonial', label: 'Testimonial', icon: MessageSquare, color: 'emerald' },
  { id: 'promotional', label: 'Promotional', icon: Sparkles, color: 'amber' },
  { id: 'behind_scenes', label: 'Behind the Scenes', icon: Video, color: 'rose' },
]

const aiSuggestions = [
  "Share a customer success story with before/after photos",
  "Post about storm damage prevention before hurricane season",
  "Showcase your team working on a recent project",
  "Educational post: signs your roof needs replacement",
  "Promotional: limited time offer on inspections",
  "Customer testimonial about your service quality",
]

export default function SocialPage() {
  const [filterPlatform, setFilterPlatform] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [generating, setGenerating] = useState(false)
  const [showComposer, setShowComposer] = useState(false)
  const [selectedType, setSelectedType] = useState<string>('promotional')
  const [generatedContent, setGeneratedContent] = useState('')
  const [platforms, setPlatforms] = useState<string[]>(['instagram', 'facebook'])

  const filteredPosts = mockPosts.filter(post => {
    const platformMatch = filterPlatform === 'all' || post.platform === filterPlatform
    const statusMatch = filterStatus === 'all' || post.status === filterStatus
    return platformMatch && statusMatch
  })

  const generateContent = async () => {
    setGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      const templates: Record<string, string> = {
        promotional: "🔥 FREE Roof Inspections This Week!\n\nDon't wait for small problems to become big bills.\n\nBayou Roofing is offering COMPLETE roof assessments at no cost to you.\n\n✅ Written report\n✅ Photo documentation\n✅ Honest recommendations\n\nBook now — spots limited this week!\n\n📞 (337) 555-0147\n🔗 Link in bio",
        educational: "🏠 DIY Roof Maintenance Tips:\n\n1. Clean gutters monthly\n2. Check for missing shingles after storms\n3. Look for signs of water damage in your attic\n4. Trim overhanging branches\n\nRegular maintenance = longer roof life + fewer repairs 💪",
        showcase: "Just completed! 🎉\n\nThis beautiful new standing seam metal roof in Broussard is ready to handle whatever Louisiana weather throws at it.\n\n📍 Broussard, LA\n🏠 2,400 sq ft\n✅ 25-year warranty\n\nNeed a roof that lasts? Call Bayou Roofing!",
        testimonial: "⭐ \"Bayou Roofing exceeded every expectation. Professional, punctual, and the quality is outstanding. My roof has never looked better.\"\n\n— Sarah H., Lafayette\n\nReady for your own 5-star experience? Contact us today!",
        behind_scenes: "Meet the Bayou Roofing team! 👷‍♂️\n\nEvery member of our crew is trained, certified, and committed to excellence.\n\nSafety first. Quality always. 👌\n\nSwipe to see our team in action! ➡️",
      }
      setGeneratedContent(templates[selectedType] || templates.promotional)
      setGenerating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Social Media</h1>
          <p className="text-slate-400 mt-1">
            AI-powered content that posts for you
          </p>
        </div>
        <button 
          onClick={() => setShowComposer(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Wand2 className="w-5 h-5" />
          AI Content Generator
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="metric-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div className="metric-value">5</div>
          <div className="metric-label">Total Posts</div>
        </div>
        <div className="metric-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div className="metric-value">2</div>
          <div className="metric-label">Published</div>
        </div>
        <div className="metric-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div className="metric-value">2</div>
          <div className="metric-label">Scheduled</div>
        </div>
        <div className="metric-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <ThumbsUp className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div className="metric-value">136</div>
          <div className="metric-label">Total Engagements</div>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">AI Content Ideas</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {aiSuggestions.map((suggestion, i) => (
            <button
              key={i}
              onClick={() => {
                setShowComposer(true)
                setGeneratedContent(suggestion)
              }}
              className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-left transition-colors"
            >
              <span className="text-sm text-slate-300">{suggestion}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <select 
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="input-field w-40"
          >
            <option value="all">All Platforms</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
          </select>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field w-36"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const PlatformIcon = platformIcons[post.platform]
          const status = statusConfig[post.status]
          
          return (
            <div key={post.id} className="glass-card rounded-2xl p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${platformColors[post.platform]} flex items-center justify-center`}>
                    <PlatformIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-white capitalize">{post.platform}</div>
                    <div className="text-sm text-slate-400">
                      {post.status === 'published' ? `Published ${post.published_at}` : `Scheduled for ${post.scheduled_for}`}
                    </div>
                  </div>
                </div>
                <span className={`badge ${status.badge}`}>{status.label}</span>
              </div>

              {/* Content */}
              <p className="text-slate-300 whitespace-pre-line mb-4">{post.content}</p>

              {/* Engagement (if published) */}
              {post.status === 'published' && (
                <div className="flex items-center gap-6 pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{post.comments}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">{post.shares}</span>
                  </div>
                </div>
              )}

              {/* Actions (if scheduled/draft) */}
              {(post.status === 'scheduled' || post.status === 'draft') && (
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                  <button className="btn-secondary flex items-center gap-2 text-sm py-2 px-4">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  {post.status === 'scheduled' && (
                    <button className="btn-primary flex items-center gap-2 text-sm py-2 px-4">
                      <Send className="w-4 h-4" />
                      Post Now
                    </button>
                  )}
                  {post.status === 'draft' && (
                    <button className="btn-primary flex items-center gap-2 text-sm py-2 px-4">
                      <Calendar className="w-4 h-4" />
                      Schedule
                    </button>
                  )}
                  <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* AI Content Composer Modal */}
      {showComposer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowComposer(false)} />
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 p-6 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Wand2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">AI Content Generator</h2>
                  <p className="text-sm text-slate-400">Create engaging posts in seconds</p>
                </div>
              </div>
              <button 
                onClick={() => setShowComposer(false)}
                className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Content Type */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">What type of content?</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {contentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 rounded-xl border transition-all ${
                        selectedType === type.id
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <type.icon className={`w-6 h-6 mb-2 ${
                        selectedType === type.id ? 'text-emerald-400' : 'text-slate-400'
                      }`} />
                      <span className={`text-sm font-medium ${
                        selectedType === type.id ? 'text-emerald-400' : 'text-slate-300'
                      }`}>{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Post to platforms</label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: 'instagram', name: 'Instagram', icon: Instagram },
                    { id: 'facebook', name: 'Facebook', icon: Facebook },
                    { id: 'twitter', name: 'Twitter', icon: Twitter },
                  ].map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => {
                        setPlatforms(prev => 
                          prev.includes(platform.id)
                            ? prev.filter(p => p !== platform.id)
                            : [...prev, platform.id]
                        )
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                        platforms.includes(platform.id)
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                          : 'border-slate-700 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <platform.icon className="w-4 h-4" />
                      {platform.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateContent}
                disabled={generating}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Content
                  </>
                )}
              </button>

              {/* Generated Content */}
              {generatedContent && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-slate-300">Generated Content</label>
                    <button 
                      onClick={() => navigator.clipboard.writeText(generatedContent)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </button>
                  </div>
                  <textarea
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className="input-field h-48"
                    placeholder="Your generated content will appear here..."
                  />
                </div>
              )}

              {/* Schedule */}
              {generatedContent && (
                <div className="glass-card rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-slate-400 mb-3">SCHEDULE</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Date</label>
                      <input type="date" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Time</label>
                      <select className="input-field">
                        <option>8:00 AM</option>
                        <option>10:00 AM</option>
                        <option>12:00 PM</option>
                        <option>2:00 PM</option>
                        <option>4:00 PM</option>
                        <option>6:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              {generatedContent && (
                <div className="flex gap-3">
                  <button 
                    onClick={() => setGeneratedContent('')}
                    className="btn-secondary flex-1"
                  >
                    Regenerate
                  </button>
                  <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Schedule Posts
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}