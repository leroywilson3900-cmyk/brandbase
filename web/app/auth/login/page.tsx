'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Pure demo mode - no API call, instant redirect
    setTimeout(() => {
      localStorage.setItem('brandbase_token', 'demo_token_' + Date.now())
      localStorage.setItem('brandbase_user', JSON.stringify({ 
        email: 'demo@brandbase.app', 
        name: 'Marcus Thompson', 
        business_name: 'Bayou Roofing LLC',
        plan: 'pro'
      }))
      router.push('/dashboard')
    }, 400)
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0f172a', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: 20,
      color: '#f8fafc'
    }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(16,185,129,0.35)' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 20 }}>B</span>
            </div>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>BrandBase</h1>
          <p style={{ fontSize: 14, color: '#64748b' }}>Sign in to your account</p>
        </div>

        {/* Demo Banner */}
        <div style={{ 
          background: 'rgba(16,185,129,0.1)', 
          border: '1px solid rgba(16,185,129,0.3)', 
          borderRadius: 12, 
          padding: '10px 14px', 
          marginBottom: 20, 
          fontSize: 13, 
          color: '#10b981',
          textAlign: 'center'
        }}>
          ✅ Demo mode — click Sign In to explore instantly
        </div>

        {/* Card */}
        <div style={{ 
          background: 'rgba(30,41,59,0.6)', 
          borderRadius: 16, 
          padding: 28, 
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 8 }}>Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@yourbusiness.com"
                defaultValue="marcus@bayouroofing.com"
                style={{ 
                  width: '100%', 
                  padding: '12px 14px', 
                  background: 'rgba(15,23,42,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10, 
                  fontSize: 14, 
                  color: '#f8fafc',
                  outline: 'none'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8' }}>Password</label>
              </div>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                defaultValue="demo123"
                style={{ 
                  width: '100%', 
                  padding: '12px 14px', 
                  background: 'rgba(15,23,42,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10, 
                  fontSize: 14, 
                  color: '#f8fafc',
                  outline: 'none'
                }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: '#10b981',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(16,185,129,0.3)'
              }}
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: '#64748b' }}>
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" style={{ color: '#10b981', fontWeight: 600, textDecoration: 'none' }}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
