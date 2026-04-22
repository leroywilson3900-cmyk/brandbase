'use client'

import { useState } from 'react'
import Link from 'next/link'

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      { q: 'How long does it take to set up BrandBase?', a: 'Most businesses are fully set up in under 5 minutes. Simply create your account, choose your industry, and the AI will automatically configure your leads pipeline, quote templates, and scheduling system.' },
      { q: 'Do I need a credit card to start?', a: 'No. Start your 14-day free trial with no credit card required. You only get charged when you decide to upgrade after the trial.' },
      { q: 'Can I import my existing leads?', a: 'Yes. You can import leads via CSV upload or connect your Google Workspace to pull contacts automatically. We also integrate with most popular lead providers.' },
      { q: 'What industries does BrandBase support?', a: 'BrandBase is built for service businesses: roofing, HVAC, plumbing, electrical, landscaping, construction, cleaning, and more. If you send quotes and schedule jobs, BrandBase works for you.' },
    ]
  },
  {
    category: 'Pricing & Billing',
    questions: [
      { q: 'What happens after my 14-day trial?', a: 'After 14 days, your account moves to a read-only state. You can upgrade to a paid plan to continue using all features, or export your data at any time.' },
      { q: 'Can I change plans later?', a: 'Yes, upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.' },
      { q: 'Is there a discount for annual billing?', a: 'Yes — save 20% when you pay annually. That brings Pro from $89/mo to $71/mo.' },
      { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex), ACH bank transfers, and Stripe payments.' },
    ]
  },
  {
    category: 'Features',
    questions: [
      { q: 'How does the AI Voice Assistant work?', a: 'Our AI answers your business phone line 24/7. It greets callers, qualifies their needs, collects their information, and books appointments directly into your calendar. You get a summary after every call.' },
      { q: 'Does BrandBase integrate with QuickBooks?', a: 'Yes. Connect your QuickBooks account to automatically sync invoices, payments, and customer records. More integrations (Xero, FreshBooks) coming soon.' },
      { q: 'Can my team use BrandBase at the same time?', a: 'Absolutely. Pro and Commercial plans support multiple users simultaneously. Each team member has their own login and you control who sees what.' },
      { q: 'Does BrandBase work on mobile?', a: 'Yes — BrandBase is fully responsive and works great on phones and tablets. We also have native iOS and Android apps for your field crews.' },
      { q: 'Can I white-label BrandBase for my agency?', a: 'The Commercial plan includes white-label options — your clients see your branding, not ours. Contact us for custom pricing.' },
    ]
  },
  {
    category: 'Security',
    questions: [
      { q: 'Is my data secure?', a: 'Yes. We use bank-level 256-bit AES encryption, SOC 2 compliant infrastructure, and your data is backed up daily. We never sell or share your data.' },
      { q: 'Where is my data stored?', a: 'Your data is stored in AWS data centers in the United States with optional EU data residency on Enterprise plans.' },
    ]
  },
  {
    category: 'Integrations',
    questions: [
      { q: 'Does BrandBase work with Stripe?', a: 'Yes — send invoices and collect payments through Stripe directly within BrandBase. Customers can pay online with one click.' },
      { q: 'Can I connect my Google Calendar?', a: 'Yes. BrandBase syncs two-way with Google Calendar and Outlook. Appointments made in BrandBase appear in your calendar automatically.' },
      { q: 'Do you have an API?', a: 'Yes — Commercial plan includes full API access. Build custom integrations, connect your own tools, or extend BrandBase to fit your workflow.' },
    ]
  },
]

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

export default function FAQPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenFaq(prev => prev === id ? null : id)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '0 40px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #1677ff 0%, #4096ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>B</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 17, color: '#1a1a1a' }}>BrandBase</span>
          </Link>
        </div>
        <Link href="/auth/signup" style={{ padding: '8px 20px', background: '#1677ff', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
          Start free trial
        </Link>
      </header>

      {/* Hero */}
      <section style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '64px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: '#1a1a1a', marginBottom: 12, letterSpacing: '-0.5px' }}>Frequently Asked Questions</h1>
          <p style={{ fontSize: 16, color: '#8c8c8c' }}>Everything you need to know about BrandBase. Can't find your answer? Chat with Josh below.</p>
        </div>
      </section>

      {/* FAQ Content */}
      <section style={{ padding: '48px 40px' }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          {faqs.map((category) => (
            <div key={category.category} style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 13, fontWeight: 700, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>{category.category}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {category.questions.map((item, i) => {
                  const id = `${category.category}-${i}`
                  const open = openFaq === id
                  return (
                    <div key={id} style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 10, overflow: 'hidden' }}>
                      <button
                        onClick={() => toggle(id)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '18px 24px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          gap: 16,
                        }}
                      >
                        <span style={{ fontSize: 15, fontWeight: 600, color: '#262626' }}>{item.q}</span>
                        <ChevronIcon open={open} />
                      </button>
                      {open && (
                        <div style={{ padding: '0 24px 20px' }}>
                          <p style={{ fontSize: 14, color: '#595959', lineHeight: 1.75, margin: 0 }}>{item.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '64px 40px', background: '#fff', borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>Still have questions?</h2>
          <p style={{ fontSize: 15, color: '#8c8c8c', marginBottom: 28, lineHeight: 1.7 }}>
            Josh, our AI assistant, is available 24/7 to answer anything about BrandBase. Or reach out to our support team.
          </p>
          <Link href="/auth/signup" style={{ display: 'inline-flex', padding: '12px 32px', background: '#1677ff', color: '#fff', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 12px rgba(22,119,255,0.25)' }}>
            Start free trial →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#fff', borderTop: '1px solid #f0f0f0', padding: '32px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg, #1677ff 0%, #4096ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 13 }}>B</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 15, color: '#262626' }}>BrandBase</span>
          </div>
          <p style={{ fontSize: 13, color: '#bfbfbf' }}>© 2026 BrandBase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}