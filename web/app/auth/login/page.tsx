'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: '#1677ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>B</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 22, color: '#262626' }}>BrandBase</span>
          </div>
          <p style={{ fontSize: 14, color: '#8c8c8c' }}>Sign in to your account</p>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: 8, padding: 32, boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#262626', marginBottom: 6 }}>Email</label>
              <input
                type="email"
                placeholder="marcus@bayouroofing.com"
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #d9d9d9', borderRadius: 6, fontSize: 14, outline: 'none', transition: 'border-color 0.2s' }}
                required
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 14, fontWeight: 600, color: '#262626' }}>Password</label>
                <a href="#" style={{ fontSize: 13, color: '#1677ff', textDecoration: 'none' }}>Forgot password?</a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #d9d9d9', borderRadius: 6, fontSize: 14, outline: 'none', transition: 'border-color 0.2s' }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px',
                background: loading ? '#bae0ff' : '#1677ff',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                fontSize: 15,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: '#8c8c8c' }}>
            Don't have an account?{' '}
            <Link href="/auth/signup" style={{ color: '#1677ff', fontWeight: 600, textDecoration: 'none' }}>
              Sign up
            </Link>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 13, color: '#bfbfbf', marginTop: 24 }}>
          © 2026 BrandBase. All rights reserved.
        </p>
      </div>
    </div>
  )
}