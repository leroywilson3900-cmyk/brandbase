import Link from 'next/link'
import { 
  Zap, 
  BarChart3, 
  MessageSquare, 
  Calendar, 
  CreditCard, 
  Users,
  CheckCircle2,
  ArrowRight,
  Star,
  Building2,
  Shield,
  Clock,
  Globe,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronRight
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">BrandBase</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
              <a href="#demo" className="text-slate-300 hover:text-white transition-colors">Demo</a>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="btn-ghost text-sm">Sign In</Link>
              <Link href="/auth/signup" className="btn-primary text-sm py-2 px-4">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Everything a service business needs. One platform.
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Your Business.<br />
            <span className="gradient-text">One Platform.</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Website, professional email, social media, leads, quotes, payments, and AI — all working together. No more juggling 10 different apps.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#demo" className="btn-secondary text-lg px-8 py-4">
              See Demo
            </Link>
          </div>
          
          <p className="text-sm text-slate-500 mt-4">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Logos Section */}
      <section className="py-12 px-6 border-y border-slate-800/50 bg-slate-950/50">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm text-slate-500 mb-8">Trusted by service businesses across America</p>
          <div className="flex items-center justify-center gap-12 flex-wrap opacity-50">
            <div className="text-2xl font-bold text-slate-400">Bayou Roofing</div>
            <div className="text-2xl font-bold text-slate-400">Star HVAC</div>
            <div className="text-2xl font-bold text-slate-400">Gulf Plumbing</div>
            <div className="text-2xl font-bold text-slate-400">Delta Electric</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Everything You Need to Grow</h2>
            <p className="text-xl text-slate-400">One subscription. Complete business toolkit.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="glass-card-hover rounded-2xl p-8 group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                <Globe className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Professional Website</h3>
              <p className="text-slate-400">Beautiful, mobile-ready website with your domain and professional email. No coding needed.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="glass-card-hover rounded-2xl p-8 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                <MessageSquare className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI Voice Assistant</h3>
              <p className="text-slate-400">AI answers calls, schedules appointments, and qualifies leads 24/7. Never miss a lead.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="glass-card-hover rounded-2xl p-8 group">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                <Users className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Lead Management</h3>
              <p className="text-slate-400">Track every lead from first contact to signed contract. Full pipeline visibility.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="glass-card-hover rounded-2xl p-8 group">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors">
                <Calendar className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Smart Scheduling</h3>
              <p className="text-slate-400">Book appointments online. Calendar syncs with your team. No double bookings.</p>
            </div>
            
            {/* Feature 5 */}
            <div className="glass-card-hover rounded-2xl p-8 group">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-6 group-hover:bg-rose-500/20 transition-colors">
                <CreditCard className="w-7 h-7 text-rose-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Digital Quotes & Payments</h3>
              <p className="text-slate-400">Create quotes on-site, send instantly, collect signatures and payments digitally.</p>
            </div>
            
            {/* Feature 6 */}
            <div className="glass-card-hover rounded-2xl p-8 group">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
                <BarChart3 className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Social Auto-Post</h3>
              <p className="text-slate-400">AI generates a month's content in seconds. Auto-posts to all platforms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-slate-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-slate-400">Three steps to your complete business presence</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-emerald-400">1</div>
              <h3 className="text-xl font-semibold text-white mb-3">Create Your Profile</h3>
              <p className="text-slate-400">Pick your industry, customize your template, connect your domain. Takes 5 minutes.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-emerald-400">2</div>
              <h3 className="text-xl font-semibold text-white mb-3">AI Sets Everything Up</h3>
              <p className="text-slate-400">Your website, email, social content, and scheduling are all configured automatically.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-emerald-400">3</div>
              <h3 className="text-xl font-semibold text-white mb-3">Grow Your Business</h3>
              <p className="text-slate-400">Leads pour in, quotes go out, payments come in. AI handles the busywork.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple Pricing</h2>
            <p className="text-xl text-slate-400">Start free. Upgrade when you're ready.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="glass-card rounded-2xl p-8">
              <div className="text-sm font-medium text-slate-400 mb-2">Starter</div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-white">$49</span>
                <span className="text-slate-500">/month</span>
              </div>
              <p className="text-slate-400 mb-6">Perfect for solo entrepreneurs starting out.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Professional website
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Business email
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Lead capture forms
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  1 user
                </li>
              </ul>
              <Link href="/auth/signup" className="btn-secondary w-full text-center block">Get Started</Link>
            </div>
            
            {/* Pro - Featured */}
            <div className="glass-card rounded-2xl p-8 border-emerald-500/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 rounded-full text-xs font-semibold text-white">
                Most Popular
              </div>
              <div className="text-sm font-medium text-emerald-400 mb-2">Pro</div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-white">$79</span>
                <span className="text-slate-500">/month</span>
              </div>
              <p className="text-slate-400 mb-6">For growing businesses with a team.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Everything in Starter
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  AI voice assistant
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Auto social posting
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Up to 5 users
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Quote & payment tools
                </li>
              </ul>
              <Link href="/auth/signup" className="btn-primary w-full text-center block">Get Started</Link>
            </div>
            
            {/* Scale */}
            <div className="glass-card rounded-2xl p-8">
              <div className="text-sm font-medium text-slate-400 mb-2">Scale</div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-white">$99</span>
                <span className="text-slate-500">/month</span>
              </div>
              <p className="text-slate-400 mb-6">For established businesses with bigger teams.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Everything in Pro
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Unlimited users
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  API access
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  White-label options
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Priority support
                </li>
              </ul>
              <Link href="/auth/signup" className="btn-secondary w-full text-center block">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-slate-950/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Loved by Service Businesses</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 mb-6">"BrandBase cut our admin work in half. The AI assistant answers phones while we're on jobs. Best investment we've made."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold">JM</div>
                <div>
                  <div className="font-medium text-white">James Martinez</div>
                  <div className="text-sm text-slate-400">Martinez Roofing, Houston</div>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 mb-6">"We went from 3 different apps to 1. The auto social posting alone saves us 10 hours a week."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-semibold">ST</div>
                <div>
                  <div className="font-medium text-white">Sarah Thompson</div>
                  <div className="text-sm text-slate-400">Thompson Plumbing, Baton Rouge</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Simplify Your Business?</h2>
          <p className="text-xl text-slate-400 mb-10">Join thousands of service businesses already growing with BrandBase.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#demo" className="btn-ghost text-lg px-8 py-4">
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">BrandBase</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            
            <p className="text-sm text-slate-500">© 2024 BrandBase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
