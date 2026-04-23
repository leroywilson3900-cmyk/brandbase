'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const steps = [
  { 
    num: '1', 
    title: 'Create Your Website', 
    desc: 'Pick your industry. We build it for you. Live in 5 minutes.',
    icon: '🌐',
    color: '#1677ff'
  },
  { 
    num: '2', 
    title: 'Set Up Professional Email', 
    desc: 'you@yourbusiness.com — sounds legit, builds trust instantly.',
    icon: '📧',
    color: '#10b981'
  },
  { 
    num: '3', 
    title: 'Create Quotes on the Phone', 
    desc: 'AI voice assistant talks to customers. Build quotes while you drive.',
    icon: '📱',
    color: '#722ed1'
  },
  { 
    num: '4', 
    title: 'Get Paid Through Phone', 
    desc: 'Send invoice via text. Customer pays with one tap. Done.',
    icon: '💳',
    color: '#fa8c16'
  },
]

const features = [
  { title: 'Lead Management', desc: 'Track every lead from first call to signed contract with a visual pipeline.', icon: '📋' },
  { title: 'Smart Quotes', desc: 'Build professional quotes in minutes with AI-assisted pricing and templates.', icon: '📝' },
  { title: 'Appointment Scheduling', desc: 'Calendar sync, automated reminders, and zero double-bookings.', icon: '📅' },
  { title: 'Payments & Invoices', desc: 'Send invoices, collect deposits, and track revenue in real-time.', icon: '💳' },
  { title: 'Social Auto-Post', desc: 'AI generates a month of content and auto-posts to all platforms.', icon: '📱' },
  { title: 'AI Voice Assistant', desc: 'AI answers calls, qualifies leads, and books jobs 24/7.', icon: '🤖' },
]

const plans = [
  { name: 'Starter', price: '$49', desc: 'For individual contractors', popular: false,
    features: ['Website + Email', 'Lead Management', 'Quotes & Estimates', 'Email Support'] },
  { name: 'Pro', price: '$79', desc: 'For small teams (5 users)', popular: true,
    features: ['Everything in Starter', 'AI Voice Assistant', 'Social Auto-Post', 'Stripe Payments', 'Priority Support'] },
  { name: 'Scale', price: '$99', desc: 'For growing businesses', popular: false,
    features: ['Everything in Pro', 'Unlimited Users', 'Custom Domain', 'API Access', 'Dedicated Support'] },
]

export default function LandingPage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Nav */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(16,185,129,0.35)' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 17 }}>B</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 19, color: '#f8fafc', letterSpacing: '-0.4px' }}>BrandBase</span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <a href="#steps" style={{ fontSize: 14, fontWeight: 500, color: '#94a3b8', textDecoration: 'none', display: 'none' }}>How It Works</a>
            <a href="#features" style={{ fontSize: 14, fontWeight: 500, color: '#94a3b8', textDecoration: 'none' }}>Features</a>
            <a href="#pricing" style={{ fontSize: 14, fontWeight: 500, color: '#94a3b8', textDecoration: 'none' }}>Pricing</a>
            <Link href="/auth/login" style={{ fontSize: 14, fontWeight: 500, color: '#94a3b8', textDecoration: 'none' }}>Sign in</Link>
            <Link href="/auth/signup" style={{ padding: '9px 20px', background: '#10b981', color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 12px rgba(16,185,129,0.25)' }}>
              Start free trial
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero - Step by Step */}
      <section style={{ padding: '60px 20px 80px', background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Badge */}
          <div style={{ textAlign: 'center', marginBottom: 20, opacity: visible ? 1 : 0, transition: 'all 0.5s ease' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(16,185,129,0.1)', borderRadius: 20, border: '1px solid rgba(16,185,129,0.3)', fontSize: 13, fontWeight: 600, color: '#10b981' }}>
              🚀 Service businesses love BrandBase
            </span>
          </div>

          {/* Main Headline */}
          <div style={{ textAlign: 'center', marginBottom: 16, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.1s' }}>
            <h1 style={{ fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 800, color: '#f8fafc', lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 16 }}>
              Your Business.<br />
              <span style={{ background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>One Platform.</span>
            </h1>
          </div>

          {/* Subheadline */}
          <div style={{ textAlign: 'center', marginBottom: 40, opacity: visible ? 1 : 0, transition: 'all 0.6s ease 0.2s' }}>
            <p style={{ fontSize: 'clamp(15px, 3vw, 18px)', color: '#94a3b8', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
              Website, email, quotes, voice AI, and payments — all in one place. Setup takes 5 minutes.
            </p>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 50, flexWrap: 'wrap', opacity: visible ? 1 : 0, transition: 'all 0.6s ease 0.3s' }}>
            <Link href="/auth/signup" style={{ padding: '14px 32px', background: '#10b981', color: '#fff', borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 16px rgba(16,185,129,0.3)' }}>
              Start free trial →
            </Link>
            <Link href="/auth/login" style={{ padding: '14px 32px', background: 'rgba(30,41,59,0.8)', color: '#f8fafc', borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>
              Sign in
            </Link>
          </div>

          {/* 4-Step Process */}
          <div id="steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, maxWidth: 1000, margin: '0 auto' }}>
            {steps.map((step, i) => (
              <div 
                key={step.num}
                style={{ 
                  background: 'rgba(30,41,59,0.6)', 
                  border: '1px solid rgba(255,255,255,0.06)', 
                  borderRadius: 16, 
                  padding: 24, 
                  textAlign: 'center',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease ${0.4 + i * 0.1}s`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Step number */}
                <div style={{ 
                  position: 'absolute', 
                  top: -20, 
                  right: -20, 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  background: `${step.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 32,
                  opacity: 0.5
                }}>
                  {step.icon}
                </div>
                
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${step.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 24 }}>
                  {step.icon}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: step.color, marginBottom: 8, letterSpacing: '0.5px' }}>
                  STEP {step.num}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section style={{ padding: '32px 20px', background: 'rgba(30,41,59,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: '#475569', marginBottom: 16, letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>Trusted by service businesses across America</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            {['Bayou Roofing', 'Star HVAC', 'Gulf Plumbing', 'Delta Electric'].map(name => (
              <span key={name} style={{ fontSize: 14, fontWeight: 700, color: '#475569' }}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '80px 20px', background: '#0f172a' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(24px, 5vw, 34px)', fontWeight: 700, color: '#f8fafc', marginBottom: 12 }}>Everything you need to grow</h2>
            <p style={{ fontSize: 16, color: '#64748b' }}>One subscription. Complete business toolkit.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {features.map((f, i) => (
              <div key={f.title} style={{ 
                padding: 24, 
                background: 'rgba(30,41,59,0.5)', 
                border: '1px solid rgba(255,255,255,0.06)', 
                borderRadius: 16, 
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 14 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '80px 20px', background: 'rgba(30,41,59,0.3)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(24px, 5vw, 34px)', fontWeight: 700, color: '#f8fafc', marginBottom: 12 }}>Simple, transparent pricing</h2>
            <p style={{ fontSize: 16, color: '#64748b' }}>Start free. Upgrade when you&apos;re ready.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, alignItems: 'start' }}>
            {plans.map((plan) => (
              <div key={plan.name} style={{ 
                background: 'rgba(30,41,59,0.6)', 
                border: plan.popular ? '2px solid #10b981' : '1px solid rgba(255,255,255,0.08)', 
                borderRadius: 16, 
                padding: 28, 
                position: 'relative', 
                boxShadow: plan.popular ? '0 12px 40px rgba(16,185,129,0.15)' : 'none'
              }}>
                {plan.popular && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 20, whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}>
                    ★ Most Popular
                  </div>
                )}
                <div style={{ fontSize: 14, fontWeight: 600, color: '#64748b', marginBottom: 8 }}>{plan.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                  <span style={{ fontSize: 38, fontWeight: 800, color: '#f8fafc', letterSpacing: '-1px' }}>{plan.price}</span>
                  <span style={{ fontSize: 14, color: '#475569' }}>/mo</span>
                </div>
                <div style={{ fontSize: 13, color: '#475569', marginBottom: 20 }}>{plan.desc}</div>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 24 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ fontSize: 13, color: '#94a3b8', padding: '6px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signup" style={{ display: 'block', textAlign: 'center', padding: '12px', background: plan.popular ? '#10b981' : 'rgba(30,41,59,0.8)', color: '#fff', border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                  {plan.popular ? 'Start free trial' : 'Get started'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>Ready to grow your business?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', marginBottom: 32, lineHeight: 1.7 }}>
            Join hundreds of service businesses using BrandBase to automate operations and win more jobs.
          </p>
          <Link href="/auth/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 36px', background: '#fff', color: '#059669', borderRadius: 10, fontSize: 16, fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
            Get started free <span>→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '32px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 13 }}>B</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 15, color: '#94a3b8' }}>BrandBase</span>
          </div>
          <div style={{ display: 'flex', gap: 24, fontSize: 14, color: '#475569' }}>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
          <p style={{ fontSize: 13, color: '#475569' }}>© 2026 BrandBase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
