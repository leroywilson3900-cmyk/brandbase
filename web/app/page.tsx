'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const features = [
  { title: 'Lead Management', desc: 'Track every lead from first call to signed contract with a visual pipeline.', icon: '📋', color: '#1677ff' },
  { title: 'Smart Quotes', desc: 'Build professional quotes in minutes with AI-assisted pricing and templates.', icon: '📝', color: '#52c41a' },
  { title: 'Appointment Scheduling', desc: 'Calendar sync, automated reminders, and zero double-bookings.', icon: '📅', color: '#722ed1' },
  { title: 'Payments & Invoices', desc: 'Send invoices, collect deposits, and track revenue in real-time.', icon: '💳', color: '#fa8c16' },
  { title: 'Social Auto-Post', desc: 'AI generates a month of content and auto-posts to all platforms.', icon: '📱', color: '#eb2f96' },
  { title: 'AI Voice Assistant', desc: 'AI answers calls, qualifies leads, and books jobs 24/7.', icon: '🤖', color: '#13c2c2' },
]

const plans = [
  { name: 'Starter', price: '$49', period: '/mo', desc: 'For individual contractors', popular: false,
    features: ['Lead Management', 'Quotes & Estimates', 'Appointment Scheduling', 'Email Support'] },
  { name: 'Pro', price: '$89', period: '/mo', desc: 'For small teams (3 users)', popular: true,
    features: ['Everything in Starter', 'Social Auto-Post', 'AI Voice Assistant', 'Stripe Payments', 'Priority Support'] },
  { name: 'Commercial', price: '$149', period: '/mo', desc: 'For growing businesses', popular: false,
    features: ['Everything in Pro', 'Unlimited Users', 'Custom Domain', 'API Access', 'Dedicated Support'] },
]

const testimonials = [
  { name: 'Marcus T.', business: 'Bayou Roofing, LA', quote: 'I was using 5 different apps to run my business. BrandBase replaced all of them in one day.', avatar: 'MT' },
  { name: 'Karen L.', business: 'Star HVAC, TX', quote: 'The AI voice assistant booked 3 jobs while I was sleeping. That alone paid for the subscription.', avatar: 'KL' },
  { name: 'Derek R.', business: 'Gulf Plumbing, FL', quote: 'Our win rate went from 40% to 71% in 60 days. The follow-up automation is a game changer.', avatar: 'DR' },
]

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');`}</style>

      {/* Nav */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #1677ff 0%, #4096ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(22,119,255,0.35)' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 17 }}>B</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 19, color: '#1a1a1a', letterSpacing: '-0.4px' }}>BrandBase</span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            <Link href="#features" style={{ fontSize: 14, fontWeight: 500, color: '#595959', textDecoration: 'none' }}>Features</Link>
            <Link href="#pricing" style={{ fontSize: 14, fontWeight: 500, color: '#595959', textDecoration: 'none' }}>Pricing</Link>
            <Link href="/auth/login" style={{ fontSize: 14, fontWeight: 500, color: '#595959', textDecoration: 'none' }}>Sign in</Link>
            <Link href="/auth/signup" style={{ padding: '9px 22px', background: '#1677ff', color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 12px rgba(22,119,255,0.25)', transition: 'all 0.2s' }}>
              Start free trial
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: '72px 40px 96px', background: 'linear-gradient(180deg, #f7f9ff 0%, #fff 60%)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 72, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px', background: '#e6f4ff', borderRadius: 20, marginBottom: 24, border: '1px solid #91caff' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1677ff' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1677ff' }}>All-in-one CRM for service businesses</span>
            </div>
            <h1 style={{ fontSize: 54, fontWeight: 800, color: '#1a1a1a', lineHeight: 1.12, letterSpacing: '-1.5px', marginBottom: 20 }}>
              Your complete<br />
              <span style={{ background: 'linear-gradient(135deg, #1677ff 0%, #4096ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>business toolkit</span>
            </h1>
            <p style={{ fontSize: 17, color: '#595959', lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
              Leads, quotes, appointments, payments, social media, and AI — all in one place. No more juggling 10 different apps. Setup takes 5 minutes.
            </p>
            <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
              <Link href="/auth/signup" style={{ padding: '14px 32px', background: '#1677ff', color: '#fff', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 16px rgba(22,119,255,0.3)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Start free trial
                <span style={{ fontSize: 16 }}>→</span>
              </Link>
              <Link href="/auth/login" style={{ padding: '14px 32px', background: '#fff', color: '#262626', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1px solid #d9d9d9', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                View demo
              </Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {['No credit card required', '14-day free trial', '5-min setup'].map(t => (
                <span key={t} style={{ fontSize: 12, color: '#8c8c8c', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#52c41a', display: 'inline-block' }} />{t}
                </span>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.06)' }}>
              <img src="/brandbase-screenshot.png" alt="BrandBase Dashboard" style={{ width: '100%', height: 'auto', display: 'block' }} onError={(e) => { e.currentTarget.style.display = 'none' }} />
            </div>
            {/* Floating stat cards */}
            <div style={{ position: 'absolute', bottom: -16, left: -20, background: '#fff', borderRadius: 12, padding: '14px 20px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#e6f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 18 }}>📈</span>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#262626' }}>+28%</div>
                <div style={{ fontSize: 11, color: '#8c8c8c' }}>Revenue this month</div>
              </div>
            </div>
            <div style={{ position: 'absolute', top: 24, right: -16, background: '#fff', borderRadius: 12, padding: '12px 16px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f6ffed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 16 }}>✅</span>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#262626' }}>Lead won!</div>
                <div style={{ fontSize: 11, color: '#8c8c8c' }}>$4,200 deal</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section style={{ padding: '40px 32px', background: '#fafafa', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: '#bfbfbf', marginBottom: 24, letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>Trusted by service businesses across America</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 56, flexWrap: 'wrap' }}>
            {['Bayou Roofing', 'Star HVAC', 'Gulf Plumbing', 'Delta Electric', 'Coastal Landscaping'].map(name => (
              <span key={name} style={{ fontSize: 16, fontWeight: 700, color: '#262626', letterSpacing: '-0.3px', opacity: 0.45 }}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '88px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 34, fontWeight: 700, color: '#1a1a1a', marginBottom: 12, letterSpacing: '-0.4px' }}>Everything you need to grow</h2>
            <p style={{ fontSize: 16, color: '#8c8c8c' }}>One subscription. Complete business toolkit.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {features.map((f) => (
              <div key={f.title} style={{ padding: 28, background: '#fff', border: '1px solid #f0f0f0', borderRadius: 12, transition: 'all 0.2s', cursor: 'pointer' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${f.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#262626', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#8c8c8c', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 40px', background: '#f7f9ff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 34, fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>Loved by service businesses</h2>
            <p style={{ fontSize: 16, color: '#8c8c8c' }}>Real results from real businesses</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {testimonials.map((t) => (
              <div key={t.name} style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 14, padding: 28 }}>
                <div style={{ fontSize: 28, marginBottom: 16, color: '#1677ff' }}>"</div>
                <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.7, marginBottom: 20 }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1677ff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#262626' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>{t.business}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '88px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 34, fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>Get started in minutes</h2>
            <p style={{ fontSize: 16, color: '#8c8c8c' }}>Three steps to your complete business presence</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
            {[
              { n: '1', title: 'Create your profile', desc: 'Pick your industry, customize your template. Takes 5 minutes.' },
              { n: '2', title: 'AI sets everything up', desc: 'Your website, email, social content, and scheduling are configured automatically.' },
              { n: '3', title: 'Grow your business', desc: 'Leads pour in, quotes go out, payments come in. AI handles the busywork.' },
            ].map((step) => (
              <div key={step.n} style={{ textAlign: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #1677ff 0%, #4096ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 22, fontWeight: 800, color: '#fff', boxShadow: '0 8px 24px rgba(22,119,255,0.3)' }}>
                  {step.n}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#262626', marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: '#8c8c8c', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '88px 40px', background: '#fafafa' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 34, fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>Simple, transparent pricing</h2>
            <p style={{ fontSize: 16, color: '#8c8c8c' }}>Start free. Upgrade when you&apos;re ready.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'start' }}>
            {plans.map((plan) => (
              <div key={plan.name} style={{ background: '#fff', border: plan.popular ? '2px solid #1677ff' : '1px solid #f0f0f0', borderRadius: 16, padding: 32, position: 'relative', boxShadow: plan.popular ? '0 12px 40px rgba(22,119,255,0.12)' : '0 2px 8px rgba(0,0,0,0.04)' }}>
                {plan.popular && (
                  <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #1677ff 0%, #4096ff 100%)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 20, whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(22,119,255,0.3)' }}>
                    ★ Most Popular
                  </div>
                )}
                <div style={{ fontSize: 14, fontWeight: 600, color: '#8c8c8c', marginBottom: 8 }}>{plan.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                  <span style={{ fontSize: 42, fontWeight: 800, color: '#1a1a1a', letterSpacing: '-1px' }}>{plan.price}</span>
                  <span style={{ fontSize: 14, color: '#bfbfbf' }}>{plan.period}</span>
                </div>
                <div style={{ fontSize: 13, color: '#bfbfbf', marginBottom: 24 }}>{plan.desc}</div>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 28 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ fontSize: 14, color: '#595959', padding: '5px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: '#52c41a', fontWeight: 700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signup" style={{ display: 'block', textAlign: 'center', padding: '12px', background: plan.popular ? '#1677ff' : '#fff', color: plan.popular ? '#fff' : '#262626', border: plan.popular ? 'none' : '1px solid #d9d9d9', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s', boxShadow: plan.popular ? '0 4px 12px rgba(22,119,255,0.25)' : 'none' }}>
                  {plan.popular ? 'Start free trial' : 'Get started'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '88px 40px', background: 'linear-gradient(135deg, #1677ff 0%, #4096ff 100%)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: '#fff', marginBottom: 16, letterSpacing: '-0.5px' }}>Ready to grow your business?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', marginBottom: 36, lineHeight: 1.7 }}>
            Join hundreds of service businesses using BrandBase to automate operations and win more jobs.
          </p>
          <Link href="/auth/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 40px', background: '#fff', color: '#1677ff', borderRadius: 8, fontSize: 16, fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
            Get started free <span>→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#fff', borderTop: '1px solid #f0f0f0', padding: '36px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg, #1677ff 0%, #4096ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 13 }}>B</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 15, color: '#262626' }}>BrandBase</span>
          </div>
          <div style={{ display: 'flex', gap: 32, fontSize: 14, color: '#8c8c8c' }}>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
          <p style={{ fontSize: 13, color: '#bfbfbf' }}>© 2026 BrandBase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}