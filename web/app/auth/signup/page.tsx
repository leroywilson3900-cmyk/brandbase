'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Building2, Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  
  // Step 1: Account info
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [businessName, setBusinessName] = useState('')
  const [industry, setIndustry] = useState('')
  
  // Step 2: Industry selection
  const industries = [
    { id: 'roofing', name: 'Roofing', icon: '🏠' },
    { id: 'plumbing', name: 'Plumbing', icon: '🔧' },
    { id: 'hvac', name: 'HVAC', icon: '❄️' },
    { id: 'electrical', name: 'Electrical', icon: '⚡' },
    { id: 'landscaping', name: 'Landscaping', icon: '🌳' },
    { id: 'cleaning', name: 'Cleaning', icon: '🧹' },
    { id: 'painting', name: 'Painting', icon: '🎨' },
    { id: 'general', name: 'General Contractor', icon: '🏗️' },
  ]

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Mock signup - would call API in production
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 to-slate-950 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">BrandBase</span>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            Your complete business.<br />
            <span className="gradient-text">5 minutes away.</span>
          </h1>
          <p className="text-xl text-slate-400">
            Everything you need to run and grow your service business — in one platform.
          </p>
        </div>
        
        <div className="relative space-y-4">
          {[
            'Professional website in minutes',
            'AI handles calls and scheduling',
            'Quotes and payments on-site',
            'Social media on autopilot',
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <span className="text-slate-300">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right side - Signup form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">BrandBase</span>
          </div>
          
          {step === 1 ? (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Create your account</h2>
                <p className="text-slate-400">Start your 14-day free trial. No credit card required.</p>
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Your name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    placeholder="John Smith"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email address</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    placeholder="you@yourbusiness.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-field pr-12"
                      placeholder="Create a password (8+ characters)"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                <button type="submit" className="btn-primary w-full">
                  Continue
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Tell us about your business</h2>
                <p className="text-slate-400">This helps us customize your experience.</p>
              </div>
              
              <form onSubmit={handleSignup} className="space-y-5">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-slate-300 mb-2">Business name</label>
                  <input
                    id="businessName"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="input-field"
                    placeholder="Bayou Roofing & Construction"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Industry</label>
                  <div className="grid grid-cols-2 gap-3">
                    {industries.map((ind) => (
                      <button
                        key={ind.id}
                        type="button"
                        onClick={() => setIndustry(ind.id)}
                        className={`p-4 rounded-xl border transition-all text-left ${
                          industry === ind.id
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                            : 'border-slate-700 hover:border-slate-600 text-slate-300'
                        }`}
                      >
                        <span className="text-xl mb-1 block">{ind.icon}</span>
                        <span className="text-sm font-medium">{ind.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-secondary flex-1"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !businessName || !industry}
                    className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
          
          <div className="mt-8 text-center">
            <p className="text-slate-400">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
