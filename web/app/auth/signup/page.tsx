'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', business: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // ALWAYS use demo mode - skip API for faster demo experience
    // API will be used once backend is properly deployed
    setTimeout(() => {
      localStorage.setItem('brandbase_token', 'demo_token_' + Date.now())
      localStorage.setItem('brandbase_user', JSON.stringify({ 
        email: form.email || 'demo@brandbase.app',
        name: form.name || 'Marcus Thompson',
        business_name: form.business || 'Bayou Roofing LLC',
        plan: 'pro'
      }))
      router.push('/dashboard')
    }, 800)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #1677ff 0%, #4096ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(22,119,255,0.35)' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 18 }}>B</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 22, color: '#1a1a1a', letterSpacing: '-0.4px' }}>BrandBase</span>
          </div>
          <p style={{ fontSize: 14, color: '#8c8c8c' }}>Create your free account — 14-day trial, no card required</p>
        </div>

        {/* Demo Banner */}
        <div style={{ background: '#e6f4ff', border: '1px solid #91caff', borderRadius: 10, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#1677ff' }}>
          Demo mode: Enter any info to explore BrandBase instantly
        </div>

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: 14, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#262626', marginBottom: 6 }}>Full Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Marcus Thompson"
                  value={form.name}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '11px 12px', border: '1px solid #e8e8e8', borderRadius: 8, fontSize: 14, outline: 'none', transition: 'border-color 0.2s', background: '#fafafa' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#262626', marginBottom: 6 }}>Business Name</label>
                <input
                  name="business"
                  type="text"
                  placeholder="Bayou Roofing LLC"
                  value={form.business}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '11px 12px', border: '1px solid #e8e8e8', borderRadius: 8, fontSize: 14, outline: 'none', transition: 'border-color 0.2s', background: '#fafafa' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#262626', marginBottom: 6 }}>Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="marcus@bayouroofing.com"
                  value={form.email}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '11px 12px', border: '1px solid #e8e8e8', borderRadius: 8, fontSize: 14, outline: 'none', transition: 'border-color 0.2s', background: '#fafafa' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#262626', marginBottom: 6 }}>Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Create password (8+ characters)"
                  value={form.password}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '11px 12px', border: '1px solid #e8e8e8', borderRadius: 8, fontSize: 14, outline: 'none', transition: 'border-color 0.2s', background: '#fafafa' }}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                background: loading ? '#bae0ff' : '#1677ff',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                boxShadow: loading ? 'none' : '0 4px 12px rgba(22,119,255,0.25)',
              }}
            >
              {loading ? 'Creating account...' : 'Create free account'}
            </button>
          </form>

          <div style={{ marginTop: 20, textAlign: 'center', fontSize: 13, color: '#8c8c8c' }}>
            Already have an account?{' '}
            <Link href="/auth/login" style={{ color: '#1677ff', fontWeight: 600, textDecoration: 'none' }}>
              Sign in
            </Link>
          </div>
        </div>

        <p style={{ marginTop: 20, textAlign: 'center', fontSize: 12, color: '#bfbfbf' }}>
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
