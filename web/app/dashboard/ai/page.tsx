'use client'

import { useState } from 'react'
import { Send, TrendingUp, AlertTriangle, FileText, Mail, MessageSquare, BarChart3, Search } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://brandbase-walf.onrender.com'

// ============ EMAIL TOOL ============
function EmailTool() {
  const [leadId, setLeadId] = useState('')
  const [emailType, setEmailType] = useState('lead_intro')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const send = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/ai-phase2/email/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: emailType, lead_id: leadId || undefined }),
      })
      setResult(await res.json())
    } catch { setResult({ error: 'Connection failed' }) }
    setLoading(false)
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <select value={emailType} onChange={e => setEmailType(e.target.value)} style={inputStyle}>
          <option value="lead_intro">Lead Introduction Email</option>
          <option value="follow_up_1">Follow-up Email #1</option>
          <option value="follow_up_2">Follow-up Email #2</option>
          <option value="follow_up_3">Final Follow-up Email</option>
          <option value="quote">Quote Delivery Email</option>
          <option value="appointment_reminder">Appointment Reminder</option>
          <option value="referral_request">Referral Request</option>
        </select>
        <input placeholder="Lead ID (optional)" value={leadId} onChange={e => setLeadId(e.target.value)} style={inputStyle} />
      </div>
      <button onClick={send} disabled={loading} style={{ ...btnStyle, marginBottom: 16 }}>
        <Mail size={15} /> {loading ? 'Generating...' : 'Generate Email'}
      </button>
      {result && (
        <div style={resultBox}>
          {result.error ? <p style={{ color: '#ff4d4f' }}>{result.error}</p> : (
            <>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontWeight: 600, color: '#8c8c8c', fontSize: 12 }}>SUBJECT: </span>
                <span style={{ fontWeight: 600, color: '#262626' }}>{result.subject}</span>
              </div>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13, color: '#595959', fontFamily: 'inherit', lineHeight: 1.7 }}>{result.body}</pre>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ============ SENTIMENT TOOL ============
function SentimentTool() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const analyze = async () => {
    if (!text.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`${API}/ai-phase2/sentiment/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      setResult(await res.json())
    } catch { setResult({ error: 'Connection failed' }) }
    setLoading(false)
  }

  const sentimentColor = (label: string) => ({
    'positive': '#52c41a', 'negative': '#ff4d4f', 'neutral': '#faad14'
  }[label] || '#8c8c8c')

  return (
    <div>
      <textarea
        placeholder="Paste call notes, email thread, or customer message here..."
        value={text}
        onChange={e => setText(e.target.value)}
        style={{ ...inputStyle, height: 100, resize: 'vertical', marginBottom: 12 }}
      />
      <button onClick={analyze} disabled={loading} style={{ ...btnStyle, marginBottom: 16 }}>
        <MessageSquare size={15} /> {loading ? 'Analyzing...' : 'Analyze Sentiment'}
      </button>
      {result && !result.error && (
        <div style={resultBox}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: sentimentColor(result.sentiment_label) }}>
                {result.sentiment_score > 0 ? '+' : ''}{result.sentiment_score}
              </div>
              <div style={{ fontSize: 12, color: '#8c8c8c' }}>Sentiment Score</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: sentimentColor(result.sentiment_label), textTransform: 'uppercase' }}>
                {result.sentiment_label}
              </div>
              <div style={{ fontSize: 12, color: '#8c8c8c' }}>Tone</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: result.risk_level === 'high' ? '#ff4d4f' : result.risk_level === 'medium' ? '#faad14' : '#52c41a', textTransform: 'uppercase' }}>
                {result.risk_level}
              </div>
              <div style={{ fontSize: 12, color: '#8c8c8c' }}>Risk Level</div>
            </div>
          </div>
          {result.flags && result.flags.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              {result.flags.map((f: string) => (
                <span key={f} style={{ display: 'inline-block', padding: '3px 10px', background: '#fff2f0', color: '#ff4d4f', borderRadius: 6, fontSize: 12, fontWeight: 600, marginRight: 6 }}>
                  ⚠ {f.replace('_', ' ')}
                </span>
              ))}
            </div>
          )}
          <p style={{ fontSize: 13, color: '#595959', marginBottom: 8, fontStyle: 'italic' }}>{result.summary}</p>
          <div style={{ padding: '10px 14px', background: '#e6f4ff', borderRadius: 8, fontSize: 13, color: '#1677ff', fontWeight: 500 }}>
            💡 {result.recommendation}
          </div>
        </div>
      )}
    </div>
  )
}

// ============ FORECAST TOOL ============
function ForecastTool() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const fetchForecast = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/ai-phase2/forecast/revenue?months=3`)
      setResult(await res.json())
    } catch { setResult({ error: 'Connection failed' }) }
    setLoading(false)
  }

  return (
    <div>
      <button onClick={fetchForecast} disabled={loading} style={{ ...btnStyle, marginBottom: 16 }}>
        <BarChart3 size={15} /> {loading ? 'Calculating...' : 'Run Revenue Forecast'}
      </button>
      {result && !result.error && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'Pipeline Value', value: `$${result.total_pipeline_value?.toLocaleString()}` },
              { label: 'Weighted Forecast', value: `$${result.weighted_pipeline_value?.toLocaleString()}` },
              { label: 'Avg Deal Size', value: `$${result.avg_deal_size?.toLocaleString()}` },
            ].map(s => (
              <div key={s.label} style={{ background: '#f7f9ff', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#1677ff' }}>{s.value}</div>
                <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#f6ffed', borderRadius: 10, padding: 16, border: '1px solid #b7eb8f' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#52c41a', marginBottom: 8 }}>📊 Monthly Projections</div>
            {result.monthly_forecast?.map((m: any) => (
              <div key={m.month} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #d9f7be', fontSize: 13 }}>
                <span style={{ color: '#595959' }}>Month {m.month}</span>
                <span style={{ fontWeight: 700, color: '#52c41a' }}>${m.projected?.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ============ PROPOSAL TOOL ============
function ProposalTool() {
  const [leadId, setLeadId] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    if (!leadId.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`${API}/ai-phase2/proposal/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead_id: leadId }),
      })
      setResult(await res.json())
    } catch { setResult({ error: 'Connection failed' }) }
    setLoading(false)
  }

  return (
    <div>
      <input
        placeholder="Enter Lead ID"
        value={leadId}
        onChange={e => setLeadId(e.target.value)}
        style={{ ...inputStyle, marginBottom: 12, width: '100%' }}
      />
      <button onClick={generate} disabled={loading || !leadId} style={{ ...btnStyle, marginBottom: 16 }}>
        <FileText size={15} /> {loading ? 'Writing Proposal...' : 'Generate Proposal'}
      </button>
      {result && !result.error && (
        <div style={resultBox}>
          <div style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ fontSize: 11, color: '#8c8c8c', marginBottom: 4 }}>PROPOSAL #{result.proposal_id}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#262626' }}>{result.service}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1677ff', marginTop: 8 }}>${result.total_amount?.toLocaleString()}</div>
          </div>
          {result.sections?.map((s: any, i: number) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, color: '#8c8c8c', marginBottom: 6, textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.5px' }}>{s.title}</div>
              {s.type === 'table' ? (
                <div style={{ background: '#fafafa', borderRadius: 8, overflow: 'hidden' }}>
                  {s.rows?.map((r: any, j: number) => (
                    <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderBottom: j < s.rows.length - 1 ? '1px solid #f0f0f0' : 'none', fontWeight: r.bold ? 700 : 400, color: r.bold ? '#262626' : '#595959', fontSize: 13 }}>
                      <span>{r.item}</span><span>{r.amount}</span>
                    </div>
                  ))}
                </div>
              ) : s.type === 'list' ? (
                <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#595959' }}>
                  {s.items?.map((item: string, j: number) => <li key={j} style={{ marginBottom: 4 }}>{item}</li>)}
                </ul>
              ) : (
                <pre style={{ fontSize: 13, color: '#595959', whiteSpace: 'pre-wrap', lineHeight: 1.7, fontFamily: 'inherit', margin: 0 }}>{s.content}</pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ============ COMPETITIVE TOOL ============
function CompetitiveTool() {
  const [competitor, setCompetitor] = useState('')
  const [overview, setOverview] = useState<any>(null)
  const [alertResult, setAlertResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const fetchOverview = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/ai-phase2/competitive/overview`)
      setOverview(await res.json())
    } catch { setOverview({ error: 'Failed' }) }
    setLoading(false)
  }

  const getAlert = async (type: string) => {
    const res = await fetch(`${API}/ai-phase2/competitive/alert/${type}`)
    setAlertResult(await res.json())
  }

  return (
    <div>
      <button onClick={fetchOverview} disabled={loading} style={{ ...btnStyle, marginBottom: 16 }}>
        <Search size={15} /> {loading ? 'Analyzing market...' : 'Get Market Overview'}
      </button>

      {overview && !overview.error && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div style={{ background: '#f6ffed', borderRadius: 10, padding: 16, textAlign: 'center', border: '1px solid #b7eb8f' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#52c41a' }}>{overview.competitor_count}</div>
              <div style={{ fontSize: 12, color: '#8c8c8c' }}>Known Competitors</div>
            </div>
            <div style={{ background: '#fffbe6', borderRadius: 10, padding: 16, textAlign: 'center', border: '1px solid #ffe58f' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#faad14' }}>{overview.market_rating_avg}★</div>
              <div style={{ fontSize: 12, color: '#8c8c8c' }}>Market Avg Rating</div>
            </div>
          </div>
          <div style={{ marginBottom: 12, fontSize: 13, fontWeight: 600, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Differentiation Opportunities</div>
          {overview.differentiation_opportunities?.map((opp: string, i: number) => (
            <div key={i} style={{ padding: '10px 14px', background: '#f7f9ff', borderRadius: 8, marginBottom: 8, fontSize: 13, color: '#595959', display: 'flex', gap: 8 }}>
              <span style={{ color: '#1677ff', fontWeight: 700 }}>✓</span> {opp}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#8c8c8c', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Get Competitive Alerts</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[['price_war', '💰 Price War'], ['review_spike', '⭐ Review Spike'], ['new_competitor', '🏢 New Competitor'], ['seasonal_shift', '📅 Seasonal Shift']].map(([type, label]) => (
            <button key={type} onClick={() => getAlert(type)} style={{ padding: '8px 14px', background: '#fff', border: '1px solid #d9d9d9', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', color: '#595959' }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {alertResult && (
        <div style={{ ...resultBox, borderLeft: `4px solid ${alertResult.severity === 'high' ? '#ff4d4f' : alertResult.severity === 'medium' ? '#faad14' : '#1677ff'}` }}>
          <div style={{ fontSize: 11, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>{alertResult.severity} severity</div>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#262626', marginBottom: 8 }}>{alertResult.title}</div>
          <p style={{ fontSize: 13, color: '#595959', marginBottom: 12, lineHeight: 1.6 }}>{alertResult.body}</p>
          <div style={{ padding: '8px 12px', background: '#e6f4ff', borderRadius: 8, fontSize: 13, color: '#1677ff', fontWeight: 500 }}>
            → {alertResult.action}
          </div>
        </div>
      )}
    </div>
  )
}

// ============ STYLES ============
const inputStyle: React.CSSProperties = {
  padding: '10px 12px', border: '1px solid #d9d9d9', borderRadius: 8, fontSize: 14, outline: 'none',
  background: '#fafafa', width: '100%', fontFamily: 'inherit',
}

const btnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px',
  background: '#1677ff', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14,
  fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
}

const resultBox: React.CSSProperties = {
  background: '#fff', border: '1px solid #f0f0f0', borderRadius: 10, padding: 20,
  fontSize: 14,
}

// ============ MAIN PAGE ============
const tools = [
  { id: 'email', label: 'Email AI', desc: 'Generate personalized emails for any lead scenario', icon: Mail, color: '#1677ff', bg: '#e6f4ff' },
  { id: 'sentiment', label: 'Sentiment Analysis', desc: 'Detect customer mood, urgency, and risk from any text', icon: MessageSquare, color: '#722ed1', bg: '#f9f0ff' },
  { id: 'forecast', label: 'Revenue Forecast', desc: 'Predict revenue from your current pipeline', icon: BarChart3, color: '#52c41a', bg: '#f6ffed' },
  { id: 'proposal', label: 'Proposal Writer', desc: 'Generate full project proposals in seconds', icon: FileText, color: '#fa8c16', bg: '#fff7e6' },
  { id: 'competitive', label: 'Competitive Intel', desc: 'Market intelligence and competitor analysis', icon: AlertTriangle, color: '#eb2f96', bg: '#fff0f3' },
]

export default function AICenterPage() {
  const [activeTool, setActiveTool] = useState('email')

  const activeToolData = tools.find(t => t.id === activeTool)!

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>AI Center 🤖</h1>
        <p style={{ fontSize: 14, color: '#8c8c8c' }}>Powerful AI tools to automate, predict, and personalize your business.</p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'AI Tools Active', val: '5', icon: '🧠', color: '#1677ff' },
          { label: 'Emails Generated', val: '127', icon: '✉️', color: '#722ed1' },
          { label: 'Leads Analyzed', val: '48', icon: '📊', color: '#52c41a' },
          { label: 'Proposals Written', val: '23', icon: '📝', color: '#fa8c16' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>{s.val}</div>
            <div style={{ fontSize: 12, color: '#8c8c8c' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
        {/* Tool selector */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Select Tool</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {tools.map(tool => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 16px',
                  background: activeTool === tool.id ? `${tool.color}12` : '#fff',
                  border: `1px solid ${activeTool === tool.id ? tool.color + '40' : '#f0f0f0'}`,
                  borderRadius: 10,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 10, background: tool.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <tool.icon size={18} style={{ color: tool.color }} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: '#262626' }}>{tool.label}</div>
                  <div style={{ fontSize: 11, color: '#8c8c8c', marginTop: 2 }}>{tool.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tool panel */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: activeToolData.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <activeToolData.icon size={22} style={{ color: activeToolData.color }} />
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>{activeToolData.label}</h2>
              <p style={{ fontSize: 13, color: '#8c8c8c' }}>{activeToolData.desc}</p>
            </div>
          </div>

          {activeTool === 'email' ? <EmailTool /> : null}
          {activeTool === 'sentiment' ? <SentimentTool /> : null}
          {activeTool === 'forecast' ? <ForecastTool /> : null}
          {activeTool === 'proposal' ? <ProposalTool /> : null}
          {activeTool === 'competitive' ? <CompetitiveTool /> : null}
        </div>
      </div>
    </div>
  )
}