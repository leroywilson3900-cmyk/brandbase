'use client'

import Link from 'next/link'

const features = [
  { title: 'Lead Management', desc: 'Track every lead from first call to signed contract.', icon: '📋', color: 'blue' },
  { title: 'Smart Quotes', desc: 'Build professional quotes in minutes, not hours.', icon: '📝', color: 'green' },
  { title: 'Appointments', desc: 'Schedule and manage all your jobs in one calendar.', icon: '📅', color: 'purple' },
  { title: 'Payments', desc: 'Send invoices, collect deposits, track revenue.', icon: '💳', color: 'orange' },
  { title: 'Social Media', desc: 'Auto-post to Instagram, Facebook, and Google.', icon: '📱', color: 'pink' },
  { title: 'AI Assistant', desc: 'AI answers calls, qualifies leads, books jobs.', icon: '🤖', color: 'cyan' },
]

const plans = [
  { name: 'Starter', price: '$49/mo', desc: 'For individual contractors', features: ['Lead Management', 'Quotes', 'Appointments', 'Email Support'] },
  { name: 'Pro', price: '$89/mo', desc: 'For small teams (3 users)', popular: true, features: ['Everything in Starter', 'Social Auto-Post', 'AI Voice Assistant', 'Stripe Payments', 'Priority Support'] },
  { name: 'Commercial', price: '$149/mo', desc: 'For growing businesses', features: ['Everything in Pro', 'Unlimited Users', 'Custom Domain', 'API Access', 'Dedicated Support'] },
]

export default function LandingPage() {
  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#1677ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>B</span>
            </div>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#262626' }}>BrandBase</span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <Link href="#features" style={{ color: '#595959', fontSize: 14, fontWeight: 500 }}>Features</Link>
            <Link href="#pricing" style={{ color: '#595959', fontSize: 14, fontWeight: 500 }}>Pricing</Link>
            <Link href="/auth/login" style={{ color: '#595959', fontSize: 14, fontWeight: 500 }}>Sign In</Link>
            <Link href="/auth/signup" className="btn-primary" style={{ fontSize: 14, height: 36, padding: '0 20px' }}>Get Started</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: '80px 24px', textAlign: 'center', background: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: '#e6f4ff', color: '#1677ff', fontSize: 14, fontWeight: 500, marginBottom: 24 }}>
            ⚡ Everything a service business needs. One platform.
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 700, color: '#262626', lineHeight: 1.2, marginBottom: 16 }}>
            Your Business.<br />
            <span style={{ color: '#1677ff' }}>One Platform.</span>
          </h1>
          <p style={{ fontSize: 18, color: '#8c8c8c', maxWidth: 600, margin: '0 auto 32px', lineHeight: 1.6 }}>
            Leads, quotes, appointments, payments, social media, and AI — all working together. No more juggling 10 different apps.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link href="/auth/signup" className="btn-primary" style={{ fontSize: 16, height: 48, padding: '0 32px' }}>
              Start Free Trial →
            </Link>
            <Link href="/auth/login" className="btn-secondary" style={{ fontSize: 16, height: 48, padding: '0 32px' }}>
              View Demo
            </Link>
          </div>
          <p style={{ fontSize: 13, color: '#bfbfbf', marginTop: 16 }}>No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '80px 24px', background: '#f5f5f5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: '#262626', marginBottom: 8 }}>Everything You Need to Grow</h2>
            <p style={{ color: '#8c8c8c', fontSize: 16 }}>One subscription. Complete business toolkit.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {features.map((f) => (
              <div key={f.title} className="stat-card" style={{ padding: 24 }}>
                <div style={{ fontSize: 28, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#262626', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#8c8c8c', lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: '#262626', marginBottom: 8 }}>How It Works</h2>
            <p style={{ color: '#8c8c8c', fontSize: 16 }}>Three steps to your complete business presence</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
            {[
              { n: '1', title: 'Create Your Profile', desc: 'Pick your industry, customize your template. Takes 5 minutes.' },
              { n: '2', title: 'AI Sets Everything Up', desc: 'Website, email, social content, and scheduling are configured automatically.' },
              { n: '3', title: 'Grow Your Business', desc: 'Leads pour in, quotes go out, payments come in. AI handles the busywork.' },
            ].map((step) => (
              <div key={step.n} style={{ textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#e6f4ff', color: '#1677ff', fontSize: 22, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  {step.n}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#262626', marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: '#8c8c8c', lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '80px 24px', background: '#f5f5f5' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: '#262626', marginBottom: 8 }}>Simple, Transparent Pricing</h2>
            <p style={{ color: '#8c8c8c', fontSize: 16 }}>Start free. Upgrade when you're ready.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {plans.map((plan) => (
              <div key={plan.name} className="stat-card" style={{ padding: 24, border: plan.popular ? '2px solid #1677ff' : '1px solid #f0f0f0', position: 'relative' }}>
                {plan.popular && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#1677ff', color: '#fff', fontSize: 12, padding: '4px 12px', borderRadius: 10, fontWeight: 500 }}>
                    Most Popular
                  </div>
                )}
                <div style={{ fontSize: 14, color: '#8c8c8c', marginBottom: 8 }}>{plan.name}</div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#262626', marginBottom: 4 }}>{plan.price}</div>
                <div style={{ fontSize: 13, color: '#bfbfbf', marginBottom: 20 }}>{plan.desc}</div>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 24 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ fontSize: 14, color: '#595959', padding: '6px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: '#52c41a' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signup" className={plan.popular ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%', justifyContent: 'center' }}>
                  {plan.popular ? 'Start Free Trial' : 'Get Started'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: '#262626', marginBottom: 16 }}>Ready to grow your business?</h2>
          <p style={{ fontSize: 16, color: '#8c8c8c', marginBottom: 32 }}>Join hundreds of service businesses using BrandBase to automate their operations and win more jobs.</p>
          <Link href="/auth/signup" className="btn-primary" style={{ fontSize: 16, height: 48, padding: '0 40px' }}>
            Get Started Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#fff', borderTop: '1px solid #f0f0f0', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: '#1677ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>B</span>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#262626' }}>BrandBase</span>
          </div>
          <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#8c8c8c' }}>
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