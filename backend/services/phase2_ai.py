"""
BrandBase Phase 2 AI Services
Email AI, Sentiment Analysis, Revenue Forecast, Proposal Writer, Competitive Intelligence
"""

from datetime import datetime, timedelta
from typing import Optional, Dict, List
from uuid import uuid4
import re


# ============ EMAIL AI ============

class EmailAIPervice:
    """
    Generate personalized follow-up emails for leads and customers.
    Creates contextually relevant, professional emails.
    """

    def __init__(self):
        self.business_name = "BrandBase"
        self.signature = "\nBest,\n{business_name} Team"

    def generate_lead_intro_email(self, lead: dict, business: dict) -> dict:
        """Generate personalized introduction email for new lead."""
        name = lead.get("customer_name", "there")
        first_name = name.split()[0] if name else "there"
        service = lead.get("service_type", "your project")
        source = lead.get("source", "your inquiry")

        subject = f"Great connecting with you, {first_name}!"
        body = f"""Hi {first_name},

Thanks for reaching out about {service}! We've received your request and wanted to personally introduce ourselves.

{business.get('business_name', 'Our team')} has been serving the community for years, and we'd love to help you get the job done right.

What happens next:
📋 We'll review your request and reach out within 2 hours
📞 One of our team members will call to discuss your project
📝 We'll send you a detailed, no-obligation quote within 24 hours

In the meantime, feel free to reply to this email with any questions.

Looking forward to working with you!

{self.signature.format(business_name=business.get('business_name', 'Our team'))}"""

        return {"subject": subject, "body": body, "type": "lead_intro"}

    def generate_follow_up_email(self, lead: dict, follow_up_number: int, business: dict) -> dict:
        """Generate follow-up email. Supports up to 3 follow-ups with different tones."""
        name = lead.get("customer_name", "there")
        first_name = name.split()[0] if name else "there"
        service = lead.get("service_type", "your project")

        templates = {
            1: {
                "subject": f"Just checking in, {first_name}",
                "body": f"""Hi {first_name},

I wanted to follow up on your {service} request. I know you've got a lot going on, so I'll keep this short.

We're still here and happy to answer any questions you might have about the project. Even a quick reply to let us know you're interested helps us prioritize.

No pressure — we just wanted to make sure you knew we have availability this week.

Reply here or give us a call!

{self.signature.format(business_name=business.get('business_name', 'Our team'))}"""
            },
            2: {
                "subject": f"{first_name} — one more thing",
                "body": f"""Hi {first_name},

I know my last email might've gotten buried — it happens to the best of us 😊

I just wanted to mention that we have an opening for estimates this week. If you're still interested in getting your {service} project looked at, now's a great time to book.

No cost, no obligation — just a quick look at what you're working with.

Let us know!

{self.signature.format(business_name=business.get('business_name', 'Our team'))}"""
            },
            3: {
                "subject": f"Final check-in from {business.get('business_name', 'us')}",
                "body": f"""Hi {first_name},

This is my last follow-up on your {service} inquiry — I promise I won't crowd your inbox after this!

If you're still in the research phase, bookmark our email and reach out whenever you're ready. If you've found someone else for the job, no hard feelings — best of luck with the project!

Either way, thanks for considering us.

{self.signature.format(business_name=business.get('business_name', 'Our team'))}"""
            }
        }

        template = templates.get(follow_up_number, templates[1])
        return {**template, "type": f"follow_up_{follow_up_number}"}

    def generate_quote_email(self, quote: dict, lead: dict, business: dict) -> dict:
        """Generate professional quote delivery email."""
        name = lead.get("customer_name", "there")
        first_name = name.split()[0] if name else "there"
        service = lead.get("service_type", "your project")
        quote_amount = f"${quote.get('total_amount', 0):,.2f}"

        subject = f"Your {service} Quote — {quote_amount}"
        body = f"""Hi {first_name},

Thank you for your patience! Please find your detailed quote for {service} below.

{self._render_quote_table(quote)}

📌 This quote is valid for 30 days.

If you have any questions about the scope, materials, or pricing, don't hesitate to reply — I'm happy to walk you through every line item.

Ready to move forward? Simply reply to this email or call us to schedule your work.

We appreciate your business!

{self.signature.format(business_name=business.get('business_name', 'Our team'))}"""

        return {"subject": subject, "body": body, "type": "quote"}

    def generate_appointment_reminder_email(self, appointment: dict, lead: dict, business: dict) -> dict:
        """Generate appointment reminder email."""
        name = lead.get("customer_name", "there")
        first_name = name.split()[0] if name else "there"
        apt_type = appointment.get("type", "appointment")
        apt_date = appointment.get("date", "scheduled")
        apt_time = appointment.get("time", "")
        address = appointment.get("address", "")

        subject = f"Reminder: {apt_type} tomorrow at {apt_time}"
        body = f"""Hi {first_name},

Just a friendly reminder about your {apt_type}:

📅 {apt_date} at {apt_time}
📍 {address}

What to expect:
• Our team member will arrive within the scheduled window
• Please ensure someone (18+) is present at the property
• Have any relevant documents (insurance info, previous contractor quotes) ready if applicable

Need to reschedule? Reply to this email and we'll find a new time that works.

See you tomorrow!

{self.signature.format(business_name=business.get('business_name', 'Our team'))}"""

        return {"subject": subject, "body": body, "type": "appointment_reminder"}

    def generate_referral_request_email(self, customer: dict, business: dict) -> dict:
        """Generate referral request email to happy customers."""
        name = customer.get("customer_name", "there")
        first_name = name.split()[0] if name else "there"

        subject = f"{first_name}, do you know anyone who might need our help?"
        body = f"""Hi {first_name},

I wanted to reach out because you were such a great customer to work with — and frankly, that's the kind of thing we love hearing.

If you know anyone in the area who might need our services, we'd be incredibly grateful for the referral. We offer $50 credits for successful referrals, and your friend gets a discount too.

No pressure at all — I just didn't want to miss the opportunity to ask.

Either way, thanks again for your business. We truly appreciate it!

{self.signature.format(business_name=business.get('business_name', 'Our team'))}"""

        return {"subject": subject, "body": body, "type": "referral_request"}

    def _render_quote_table(self, quote: dict) -> str:
        """Render a simple text quote breakdown."""
        lines = [
            f"Quote #{quote.get('id', 'N/A')[:8].upper()}",
            "-" * 40,
            f"Service: {quote.get('service_type', 'N/A')}",
            f"Labor: ${quote.get('labor_amount', 0):,.2f}",
            f"Materials: ${quote.get('materials_amount', 0):,.2f}",
            f"Permits: ${quote.get('permits_amount', 0):,.2f}",
            "-" * 40,
            f"TOTAL: ${quote.get('total_amount', 0):,.2f}",
        ]
        return "\n".join(lines)


# ============ SENTIMENT ANALYSIS ============

class SentimentAnalysisService:
    """
    Analyze text (call transcripts, emails, chat messages) for sentiment.
    Detects customer mood, urgency, satisfaction signals.
    """

    POSITIVE_SIGNALS = [
        "thank", "thanks", "appreciate", "great", "excellent", "perfect",
        "love", "amazing", "awesome", "fantastic", "wonderful", "happy",
        "excited", "looking forward", "can't wait", "definitely", "absolutely",
        "sounds good", "please", "yes", "yeah", "sure", "glad"
    ]

    NEGATIVE_SIGNALS = [
        "frustrated", "angry", "upset", "disappointed", "terrible", "awful",
        "horrible", "worst", "never", "cancel", "refund", "lawsuit", "sue",
        "complaint", "unhappy", "unacceptable", "ridiculous", "outraged",
        "disgusted", "furious", "annoyed", "irritated", "poor", "bad"
    ]

    URGENT_SIGNALS = [
        "asap", "emergency", "urgent", "immediately", "right now", "now",
        "today", "this week", "critical", "severe", "broken", "leaking",
        "flooding", "danger", "safety", "hazard", "exposed", "collapsed"
    ]

    BUDGET_SIGNALS = [
        "budget", "afford", "expensive", "cheap", "cost", "price",
        "insurance", "deductible", "coverage", "claim", "worth", "value",
        "negotiate", "discount", "deal", "save", "reduce"
    ]

    DECISION_SIGNALS = [
        "ready to", "decided", "hired", "sign", "contract", "deposit",
        "schedule", "book", "proceed", "go ahead", "want to move",
        "move forward", "approved", "authorized", "commit"
    ]

    def analyze_text(self, text: str) -> dict:
        """Analyze text and return sentiment score + signals."""
        text_lower = text.lower()

        pos_count = sum(1 for s in self.POSITIVE_SIGNALS if s in text_lower)
        neg_count = sum(1 for s in self.NEGATIVE_SIGNALS if s in text_lower)
        urgent_count = sum(1 for s in self.URGENT_SIGNALS if s in text_lower)
        budget_count = sum(1 for s in self.BUDGET_SIGNALS if s in text_lower)
        decision_count = sum(1 for s in self.DECISION_SIGNALS if s in text_lower)

        # Calculate sentiment score (-100 to +100)
        total_signals = pos_count + neg_count
        if total_signals > 0:
            sentiment_score = ((pos_count - neg_count) / total_signals) * 100
        else:
            sentiment_score = 0

        # Determine sentiment label
        if sentiment_score >= 30:
            sentiment_label = "positive"
        elif sentiment_score <= -30:
            sentiment_label = "negative"
        else:
            sentiment_label = "neutral"

        # Detect flags
        flags = []
        if urgent_count >= 2:
            flags.append("urgent")
        if neg_count >= 2:
            flags.append("at_risk")
        if budget_count >= 2:
            flags.append("price_sensitive")
        if decision_count >= 1:
            flags.append("ready_to_decide")

        # Risk assessment
        if sentiment_label == "negative" and urgent_count >= 1:
            risk_level = "high"
        elif sentiment_label == "negative":
            risk_level = "medium"
        elif urgent_count >= 2:
            risk_level = "medium"
        else:
            risk_level = "low"

        return {
            "sentiment_score": round(sentiment_score, 1),
            "sentiment_label": sentiment_label,
            "signals": {
                "positive": pos_count,
                "negative": neg_count,
                "urgent": urgent_count,
                "budget": budget_count,
                "decision": decision_count
            },
            "flags": flags,
            "risk_level": risk_level,
            "summary": self._generate_summary(sentiment_label, flags, urgent_count, budget_count, decision_count),
            "recommendation": self._get_recommendation(sentiment_label, flags, risk_level)
        }

    def analyze_conversation(self, messages: List[dict]) -> dict:
        """Analyze a full conversation (multiple messages)."""
        if not messages:
            return self.analyze_text("")

        all_text = " ".join(m.get("text", "") or "" for m in messages)
        overall = self.analyze_text(all_text)

        # Per-message breakdown
        message_analysis = []
        for i, msg in enumerate(messages):
            analysis = self.analyze_text(msg.get("text", ""))
            message_analysis.append({
                "message_index": i,
                "sentiment_label": analysis["sentiment_label"],
                "sentiment_score": analysis["sentiment_score"],
                "flags": analysis["flags"]
            })

        # Track sentiment trajectory
        if len(message_analysis) >= 2:
            first_sentiment = message_analysis[0]["sentiment_score"]
            last_sentiment = message_analysis[-1]["sentiment_score"]
            trajectory = "improving" if last_sentiment > first_sentiment + 10 else ("declining" if last_sentiment < first_sentiment - 10 else "stable")
        else:
            trajectory = "stable"

        return {
            **overall,
            "message_count": len(messages),
            "trajectory": trajectory,
            "message_analysis": message_analysis
        }

    def _generate_summary(self, sentiment: str, flags: list, urgent: int, budget: int, decision: int) -> str:
        parts = []
        if sentiment == "positive":
            parts.append("Customer appears satisfied and engaged")
        elif sentiment == "negative":
            parts.append("Customer appears frustrated or upset")
        else:
            parts.append("Customer tone is neutral")

        if "urgent" in flags:
            parts.append("High urgency detected")
        if "at_risk" in flags:
            parts.append("Customer retention at risk — requires immediate attention")
        if "price_sensitive" in flags:
            parts.append("Budget/price concerns detected")
        if "ready_to_decide" in flags:
            parts.append("Customer showing buying signals")

        return ". ".join(parts) + "."

    def _get_recommendation(self, sentiment: str, flags: list, risk: str) -> str:
        if risk == "high":
            return "IMMEDIATE ACTION: Customer may churn or escalate. Contact within 2 hours. Consider offering goodwill gesture."
        elif "at_risk" in flags:
            return "Priority follow-up: Send empathetic message acknowledging their frustration. Offer solution or escalation path."
        elif "ready_to_decide" in flags:
            return "Strong buying signal: Reach out immediately with next step (quote, contract, or deposit request)."
        elif "price_sensitive" in flags:
            return "Discuss pricing options or payment plans. Highlight value and warranties to justify investment."
        elif sentiment == "positive":
            return "Positive engagement: Send referral request and schedule next steps to maintain momentum."
        else:
            return "Continue standard follow-up sequence. Monitor for sentiment changes."


# ============ REVENUE FORECAST ============

class RevenueForecastService:
    """
    Forecast revenue based on current pipeline, historical win rates,
    average deal sizes, and seasonal trends.
    """

    def __init__(self):
        # Industry average close rates by stage
        self.stage_probabilities = {
            "new_lead": 0.10,
            "followup_call": 0.25,
            "appointment_set": 0.45,
            "on_site_visit": 0.60,
            "quote_sent": 0.70,
            "deposit_received": 0.90,
            "job_in_progress": 0.95,
            "job_done": 1.00,
        }

    def forecast_pipeline(self, leads: List[dict], months: int = 3) -> dict:
        """Forecast revenue from current pipeline over N months."""
        pipeline_value = 0.0
        weighted_value = 0.0
        stage_breakdown = {}

        for lead in leads:
            amount = float(lead.get("estimated_amount", lead.get("quote_amount", 0)))
            status = lead.get("status", "new_lead")
            probability = self.stage_probabilities.get(status, 0.10)

            pipeline_value += amount
            weighted_value += amount * probability

            if status not in stage_breakdown:
                stage_breakdown[status] = {"count": 0, "value": 0, "weighted": 0}
            stage_breakdown[status]["count"] += 1
            stage_breakdown[status]["value"] += amount
            stage_breakdown[status]["weighted"] += amount * probability

        # Monthly breakdown
        monthly_forecast = []
        for month in range(1, months + 1):
            if month == 1:
                mtd_probability = 0.35  # 35% of weighted value closes in month 1
            elif month == 2:
                mtd_probability = 0.30
            else:
                mtd_probability = 0.25

            monthly_forecast.append({
                "month": month,
                "projected": round(weighted_value * mtd_probability, 2),
                "conservative": round(pipeline_value * 0.10 * mtd_probability, 2),
                "optimistic": round(pipeline_value * 0.20 * mtd_probability, 2),
            })

        # Win rate analysis
        total_leads = len(leads)
        hot_leads = sum(1 for l in leads if l.get("status") in ["quote_sent", "deposit_received", "appointment_set"])
        avg_deal_size = pipeline_value / total_leads if total_leads > 0 else 0

        return {
            "total_pipeline_value": round(pipeline_value, 2),
            "weighted_pipeline_value": round(weighted_value, 2),
            "avg_deal_size": round(avg_deal_size, 2),
            "total_leads": total_leads,
            "hot_leads": hot_leads,
            "stage_breakdown": {k: {**v, "probability": self.stage_probabilities.get(k, 0.1)} for k, v in stage_breakdown.items()},
            "monthly_forecast": monthly_forecast,
            "confidence": "medium" if total_leads >= 5 else "low",
            "generated_at": datetime.utcnow().isoformat()
        }

    def calculate_run_rate(self, closed_deals: List[dict], period_days: int = 30) -> dict:
        """Calculate current revenue run rate from recently closed deals."""
        if not closed_deals:
            return {"monthly_run_rate": 0, "avg_deal_size": 0, "deals_per_month": 0}

        total_revenue = sum(float(d.get("amount", 0)) for d in closed_deals)
        deal_count = len(closed_deals)

        return {
            "total_revenue": round(total_revenue, 2),
            "deals_closed": deal_count,
            "period_days": period_days,
            "monthly_run_rate": round((total_revenue / period_days) * 30, 2),
            "avg_deal_size": round(total_revenue / deal_count, 2) if deal_count > 0 else 0,
            "deals_per_month": round((deal_count / period_days) * 30, 1),
        }


# ============ PROPOSAL WRITER ============

class ProposalWriterService:
    """
    Generate full project proposals from lead information.
    Creates professional, detailed proposals with scope, timeline, pricing.
    """

    def generate_proposal(self, lead: dict, quote: dict, business: dict) -> dict:
        """Generate a complete project proposal document."""
        name = lead.get("customer_name", "there")
        first_name = name.split()[0] if name else "there"
        service = lead.get("service_type", "the project")
        address = lead.get("address", "")
        amount = float(quote.get("total_amount", 0))

        proposal_id = f"PROP-{uuid4().hex[:8].upper()}"

        sections = []

        # 1. Cover
        sections.append({
            "type": "cover",
            "title": f"Project Proposal — {service}",
            "content": f"Prepared for: {name}\nProperty: {address}\nDate: {datetime.now().strftime('%B %d, %Y')}\nProposal #: {proposal_id}"
        })

        # 2. Executive Summary
        sections.append({
            "type": "section",
            "title": "Executive Summary",
            "content": (
                f"{business.get('business_name', 'We')} are pleased to submit this proposal for your {service} project. "
                f"Our team brings years of professional experience, licensed craftsmanship, and a commitment to on-time, "
                f"on-budget delivery. We service the {address.split(',')[-1].strip() if address else 'local area'} and "
                f"are fully licensed, bonded, and insured.\n\n"
                f"Total Project Investment: ${amount:,.2f}\n"
                f"Estimated Duration: {quote.get('estimated_days', 'TBD')} business days"
            )
        })

        # 3. Scope of Work
        scope_items = [
            f"Demolition and removal of existing {service.split(' - ')[0].lower() if service else 'materials'} as needed",
            "Site preparation and ground protection",
            "Professional installation per manufacturer specifications",
            "Use of premium-grade materials (manufacturer-backed warranties)",
            "Daily jobsite cleanup",
            "Final inspection and quality assurance walkthrough",
            "Post-project debris removal and disposal"
        ]
        sections.append({
            "type": "list",
            "title": "Scope of Work",
            "items": scope_items
        })

        # 4. Project Timeline
        sections.append({
            "type": "timeline",
            "title": "Project Timeline",
            "items": [
                {"step": "Day 1", "activity": "Mobilization, permits, and site preparation"},
                {"step": "Days 2–3", "activity": "Active construction/installation"},
                {"step": "Day 4", "activity": "Final inspection and cleanup"},
                {"step": "Day 5", "activity": "Client walkthrough and project handoff"},
            ]
        })

        # 5. Investment Breakdown
        sections.append({
            "type": "table",
            "title": "Investment Breakdown",
            "rows": [
                {"item": "Labor", "amount": f"${quote.get('labor_amount', 0):,.2f}"},
                {"item": "Materials", "amount": f"${quote.get('materials_amount', 0):,.2f}"},
                {"item": "Permits & Fees", "amount": f"${quote.get('permits_amount', 0):,.2f}"},
                {"item": "Contingency (5%)", "amount": f"${amount * 0.05:,.2f}"},
                {"item": "TOTAL", "amount": f"${amount:,.2f}", "bold": True},
            ]
        })

        # 6. Payment Terms
        deposit = amount * 0.25
        sections.append({
            "type": "section",
            "title": "Payment Terms",
            "content": (
                f"• Deposit: ${deposit:,.2f} (25%) — due at contract signing\n"
                f"• Progress Payment: ${amount * 0.50:,.2f} (50%) — due at 50% project completion\n"
                f"• Final Payment: ${amount * 0.25:,.2f} (25%) — due at project completion\n\n"
                f"All payments are due within 5 business days of invoice. Late payments subject to 1.5% monthly finance charge."
            )
        })

        # 7. Warranties
        sections.append({
            "type": "section",
            "title": "Warranties & Guarantees",
            "content": (
                "• Workmanship Warranty: 5 years on all labor\n"
                "• Manufacturer Warranty: Varies by product (typically 20–50 years)\n"
                "• Satisfaction Guarantee: If you're not 100% satisfied, we make it right\n\n"
                f"Warranty details provided in full contract. Valid only on work performed by {business.get('business_name', 'our team')}."
            )
        })

        # 8. Next Steps
        sections.append({
            "type": "section",
            "title": "Next Steps",
            "content": (
                "1. Review this proposal at your convenience\n"
                "2. Contact us with any questions — we're happy to walk you through every detail\n"
                "3. Sign and return the attached contract along with your deposit to reserve your spot\n"
                "4. We'll schedule your project within 2 weeks of deposit receipt\n\n"
                f"This proposal is valid for 30 days from the date above. We appreciate your consideration and look forward to working with you!"
            )
        })

        return {
            "proposal_id": proposal_id,
            "lead_name": name,
            "lead_email": lead.get("customer_email", ""),
            "service": service,
            "total_amount": amount,
            "prepared_by": business.get("business_name", "BrandBase"),
            "prepared_by_phone": business.get("phone", ""),
            "prepared_by_email": business.get("email", ""),
            "date": datetime.now().strftime("%B %d, %Y"),
            "valid_until": (datetime.now() + timedelta(days=30)).strftime("%B %d, %Y"),
            "sections": sections
        }


# ============ COMPETITIVE INTELLIGENCE ============

class CompetitiveIntelService:
    """
    Monitor and analyze competitor mentions, pricing trends,
    and market positioning. (Note: requires real web scraping / social API)
    """

    def __init__(self):
        self.mock_competitors = [
            {"name": "A-1 Roofing", "avg_rating": 4.2, "common_mentions": ["fast", "professional", "priced high"]},
            {"name": "Gulf Coast Contractors", "avg_rating": 4.5, "common_mentions": ["reliable", "clean", "great communication"]},
            {"name": "Bayou Build & Roof", "avg_rating": 3.9, "common_mentions": ["cheap", "slow", "mixed reviews"]},
        ]

    def get_market_overview(self) -> dict:
        """Get a high-level market overview for the user's service area."""
        return {
            "market_rating_avg": round(sum(c["avg_rating"] for c in self.mock_competitors) / len(self.mock_competitors), 1),
            "competitor_count": len(self.mock_competitors),
            "pricing_tier": "mid-to-premium",
            "differentiation_opportunities": [
                "Response time (respond to leads in under 5 min vs industry avg 47 min)",
                "Warranty depth (offer 10yr workmanship vs typical 2yr)",
                "AI-powered communication (24/7 availability vs competitors' business hours)",
                "Transparent pricing (itemized quotes vs lump-sum bids)",
            ],
            "generated_at": datetime.utcnow().isoformat()
        }

    def analyze_competitor(self, competitor_name: str) -> dict:
        """Get detailed intel on a specific competitor."""
        competitor = next((c for c in self.mock_competitors if competitor_name.lower() in c["name"].lower()), None)

        if not competitor:
            return {"error": f"No data found for competitor: {competitor_name}"}

        strengths = []
        weaknesses = []

        for mention in competitor["common_mentions"]:
            if mention in ["fast", "professional", "reliable", "great communication", "clean"]:
                strengths.append(mention)
            else:
                weaknesses.append(mention)

        return {
            "name": competitor["name"],
            "avg_rating": competitor["avg_rating"],
            "rating_count": "~127 reviews (Google, Yelp, Houzz avg)",
            "strengths": strengths,
            "weaknesses": weaknesses,
            "pricing_position": "above average" if competitor["avg_rating"] >= 4.2 else "below average",
            "recommendation": f"Position against {competitor['name']} by emphasizing: {', '.join(weaknesses[:2]).title()} — areas where they fall short."
        }

    def generate_alert(self, alert_type: str, context: dict) -> dict:
        """Generate a competitive alert with recommended action."""
        alerts = {
            "price_war": {
                "severity": "high",
                "title": "Competitor price drop detected",
                "body": "A nearby competitor has reduced pricing by 15%. Consider emphasizing value, warranties, and service quality over price. Our AI recommends highlighting your 5-year workmanship warranty vs their industry-standard 1-year.",
                "action": "Review quote pricing strategy"
            },
            "review_spike": {
                "severity": "medium",
                "title": "Competitor receiving positive reviews",
                "body": "A competitor has received 12 5-star reviews this week. This may indicate increased market activity. Ensure your Google Business profile is active and encourage recent customers to leave reviews.",
                "action": "Review your review acquisition strategy"
            },
            "new_competitor": {
                "severity": "medium",
                "title": "New competitor entering your area",
                "body": "A new contractor has started advertising in your service area. Early positioning is critical. Consider a special promotion to lock in existing relationships.",
                "action": "Boost follow-up outreach to current pipeline"
            },
            "seasonal_shift": {
                "severity": "low",
                "title": "Seasonal demand shift incoming",
                "body": "Historical data shows Q1 is typically 20% slower for roofing. Use this period for system improvements, proposal follow-up, and relationship building. AI suggests focusing on interior projects (HVAC, plumbing) this quarter.",
                "action": "Diversify service offerings in Q1"
            }
        }

        template = alerts.get(alert_type, alerts["seasonal_shift"])
        return {
            **template,
            "context": context,
            "generated_at": datetime.utcnow().isoformat()
        }
