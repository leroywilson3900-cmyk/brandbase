'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface Message {
  role: 'user' | 'josh'
  text: string
  action?: { label: string; href: string }
}

const JOSH_INTRO = "Hey! I'm Josh, your BrandBase assistant 👋 Ask me anything about pricing, features, setup, or how to get the most out of your account!"

const QUICK_QUESTIONS = [
  "How much does it cost?",
  "How do I get started?",
  "Does it have a free trial?",
  "What can AI do for me?",
]

export default function JoshChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://brandbase-walf.onrender.com'

  useEffect(() => {
    if (open && !hasOpened) {
      setMessages([{ role: 'josh', text: JOSH_INTRO }])
      setHasOpened(true)
    }
  }, [open, hasOpened])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return

    const userMsg: Message = { role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${apiUrl}/chat/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      const joshMsg: Message = {
        role: 'josh',
        text: data.response,
        action: data.action === 'navigate' && data.action_label
          ? { label: data.action_label, href: data.action_label.includes('pricing') ? '/#pricing' : data.action_label.includes('signup') ? '/auth/signup' : '/' }
          : undefined,
      }
      setMessages(prev => [...prev, joshMsg])
    } catch {
      setMessages(prev => [...prev, {
        role: 'josh',
        text: "I'm having trouble connecting right now. Try again in a moment! 😅 You can also email us at help@brandbase.app",
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1677ff 0%, #4096ff 100%)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(22,119,255,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          transition: 'all 0.2s',
          transform: open ? 'scale(0)' : 'scale(1)',
        }}
        aria-label="Open Josh chat"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="white"/>
        </svg>
      </button>

      {/* Chat Panel */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 380,
          height: 560,
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.1)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.06)',
        }}>
          {/* Header */}
          <div style={{
            padding: '20px 20px 16px',
            background: 'linear-gradient(135deg, #1a1f36 0%, #141929 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1677ff 0%, #52c41a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 15,
                color: '#fff',
              }}>
                J
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>Josh</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#52c41a', display: 'inline-block' }} />
                  Online now
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: 8,
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                {msg.role === 'josh' && (
                  <div style={{ fontSize: 11, color: '#8c8c8c', marginBottom: 4, marginLeft: 4 }}>Josh</div>
                )}
                <div style={{
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user' ? '#1677ff' : '#f5f5f5',
                  color: msg.role === 'user' ? '#fff' : '#262626',
                  fontSize: 14,
                  lineHeight: 1.5,
                }}>
                  {msg.text}
                </div>
                {msg.action && (
                  <Link
                    href={msg.action.href}
                    style={{
                      display: 'inline-block',
                      marginTop: 6,
                      padding: '6px 14px',
                      background: '#e6f4ff',
                      color: '#1677ff',
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    {msg.action.label}
                  </Link>
                )}
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ fontSize: 11, color: '#8c8c8c', marginBottom: 4, marginLeft: 4 }}>Josh</div>
                <div style={{ padding: '10px 14px', borderRadius: 16, background: '#f5f5f5', color: '#8c8c8c', fontSize: 14 }}>
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions */}
          {messages.length === 1 && (
            <div style={{ padding: '0 20px 8px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    padding: '6px 12px',
                    background: '#f0f0f0',
                    border: 'none',
                    borderRadius: 20,
                    fontSize: 12,
                    color: '#595959',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid #f0f0f0', display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Josh anything..."
              style={{
                flex: 1,
                padding: '10px 14px',
                border: '1px solid #e8e8e8',
                borderRadius: 24,
                fontSize: 14,
                outline: 'none',
                background: '#fafafa',
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: input.trim() && !loading ? '#1677ff' : '#f0f0f0',
                border: 'none',
                cursor: input.trim() && !loading ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke={input.trim() && !loading ? '#fff' : '#bfbfbf'} strokeWidth="2" strokeLinecap="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={input.trim() && !loading ? '#fff' : '#bfbfbf'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
