"""
BrandBase AI Services — Phase 2
Handles: Voice AI, Auto-follow-up, Pricing Intelligence, Lead Qualification
"""

from datetime import datetime, timedelta
from typing import Optional, Dict, List
from uuid import uuid4
import os

# ============ VOICE AI (Twilio + ElevenLabs) ============

class VoiceAIService:
    """
    Real-time voice AI for phone consultations.
    Uses Twilio for call handling + ElevenLabs for voice synthesis.
    """
    
    def __init__(self):
        self.twilio_account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        self.twilio_auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        self.twilio_phone = os.getenv("TWILIO_PHONE_NUMBER")
        self.elevenlabs_api_key = os.getenv("ELEVENLABS_API_KEY")
        self.voice_id = "21m00Tcm4Tlv4TqL02Yd"  # ElevenLabs default voice
    
    def initiate_call(self, lead_phone: str, lead_id: str, account_id: str) -> dict:
        """
        Initiate outbound call to lead.
        AI will greet and engage in conversation.
        """
        # TODO: Implement with Twilio API
        # 1. Create Twilio call
        # 2. Connect to voice AI
        # 3. Webhook for call status
        
        return {
            "call_sid": f"CA{uuid4().hex[:32]}",
            "status": "initiated",
            "lead_id": lead_id,
            "direction": "outbound",
            "created_at": datetime.utcnow().isoformat()
        }
    
    def generate_voice_response(self, text: str, voice_id: Optional[str] = None) -> str:
        """
        Generate audio response from text using ElevenLabs.
        Returns URL to audio file.
        """
        # TODO: Implement with ElevenLabs API
        # voice_id = voice_id or self.voice_id
        # return elevenlabs.generate(text, voice=voice_id)
        
        return f"https://api.brandbase.app/voice/{uuid4().hex[:16]}.mp3"
    
    def transcribe_call(self, audio_url: str) -> str:
        """
        Transcribe recorded call audio.
        Returns transcript text.
        """
        # TODO: Implement with Whisper
        return "Transcript placeholder - AI conversation logged"


class PhoneConsultationService:
    """
    Handles phone consultation workflow.
    AI answers FAQs, gathers info, schedules appointment.
    """
    
    # FAQ responses by service type
    SERVICE_FAQS = {
        "roofing": [
            "We offer free roof inspections.",
            "Our quotes typically range from $3,000 to $15,000 depending on size and materials.",
            "Most roofs take 2-3 days to complete.",
            "We offer a 10-year workmanship warranty."
        ],
        "plumbing": [
            "We charge $75/hour for labor plus parts.",
            "Emergency service available 24/7.",
            "We provide upfront pricing before any work begins.",
            "All work warranted for 1 year."
        ],
        "hvac": [
            "We service all major HVAC brands.",
            "AC repair starts at $99.",
            "Annual maintenance plans available.",
            "Same-day service often available."
        ],
        "default": [
            "We offer free estimates.",
            "We're locally owned and operated.",
            "All work is guaranteed.",
            "We serve the Baton Rouge area."
        ]
    }
    
    def generate_initial_greeting(self, business_name: str, service_type: str) -> str:
        """Generate AI greeting for incoming call."""
        return (
            f"Thank you for calling {business_name}. "
            f"I'm our AI assistant, here to help you. "
            f"I see you're interested in {service_type} services. "
            f"How can I help you today?"
        )
    
    def generate_faq_response(self, service_type: str, question: str) -> str:
        """Generate appropriate FAQ response based on service type."""
        faqs = self.SERVICE_FAQS.get(service_type.lower(), self.SERVICE_FAQS["default"])
        # Simple keyword matching
        question_lower = question.lower()
        
        if any(w in question_lower for w in ["price", "cost", "estimate", "quote", "how much"]):
            return faqs[1]  # Pricing info
        elif any(w in question_lower for w in ["time", "how long", "when", "days"]):
            return faqs[2]  # Timeline info
        elif any(w in question_lower for w in ["warranty", "guarantee", "warrant"]):
            return faqs[3]  # Warranty info
        elif any(w in question_lower for w in ["free", "inspection", "inspect"]):
            return faqs[0]  # Free inspection info
        else:
            return faqs[1]  # Default to pricing
    
    def generate_appointment_offer(self) -> str:
        """Offer to schedule an appointment."""
        return (
            "Would you like me to schedule a free on-site estimate? "
            "I can find a time that works for you this week."
        )
    
    def qualify_lead(self, transcript: str, service_type: str) -> dict:
        """
        Analyze transcript to qualify lead.
        Returns qualification score and key info.
        """
        # Simple keyword-based qualification
        transcript_lower = transcript.lower()
        
        # Urgency signals
        urgent_keywords = ["leaking", "emergency", "urgent", "asap", "broken", "flooding"]
        has_urgency = any(kw in transcript_lower for kw in urgent_keywords)
        
        # Budget signals
        budget_keywords = ["budget", "afford", "cheap", "expensive", "insurance"]
        has_budget = any(kw in transcript_lower for kw in budget_keywords)
        
        # Decision timeline
        timeline_keywords = ["soon", "this week", "asap", "ready to", "whenever"]
        has_timeline = any(kw in transcript_lower for kw in timeline_keywords)
        
        # Service need
        service_keywords = ["repair", "replace", "fix", "install", "check", "inspect"]
        has_service_defined = any(kw in transcript_lower for kw in service_keywords)
        
        # Calculate qualification score (0-100)
        score = 50
        if has_urgency: score += 20
        if has_budget: score += 10
        if has_timeline: score += 15
        if has_service_defined: score += 15
        
        return {
            "score": min(score, 100),
            "is_qualified": score >= 70,
            "urgency": has_urgency,
            "has_budget": has_budget,
            "timeline": "immediate" if has_urgency else ("soon" if has_timeline else "flexible"),
            "service_identified": service_type
        }


# ============ AUTO FOLLOW-UP SERVICE ============

class AutoFollowUpService:
    """
    AI-powered follow-up sequence.
    Handles text, email, and phone follow-ups.
    """
    
    FOLLOW_UP_TEMPLATES = {
        "new_lead": {
            "text": "Hi {customer_name}, this is {business_name}. Thanks for reaching out about {service_type}. We'd love to help! When would be a good time to chat?",
            "email": "Subject: Thanks for reaching out, {customer_name}!\n\nHi {customer_name},\n\nThanks for contacting {business_name} about your {service_type} needs. I'd love to learn more about your project.\n\nWould you have 10 minutes for a quick call this week?\n\nBest,\n{business_name} Team"
        },
        "appointment_reminder": {
            "text": "Hi {customer_name}, friendly reminder about your {appointment_type} tomorrow at {time}. See you then! Reply CANCEL to reschedule.",
            "email": "Subject: Appointment Reminder - {appointment_type}\n\nHi {customer_name},\n\nJust a reminder about your {appointment_type} scheduled for {date} at {time}.\n\nSee you soon!\n\n{business_name}"
        },
        "quote_followup": {
            "text": "Hi {customer_name}, just following up on the quote we sent for your {service_type}. Any questions? We're happy to explain the details.",
            "email": "Subject: Following up on your quote - {customer_name}\n\nHi {customer_name},\n\nI wanted to check in on the quote we sent over for your {service_type}. Have any questions about the scope or pricing?\n\nWe're here to help!\n\nBest,\n{business_name}"
        },
        "payment_reminder": {
            "text": "Hi {customer_name}, just a reminder that payment for your recent service is due. Tap here to pay: {payment_link}",
            "email": "Subject: Payment Reminder - {invoice_number}\n\nHi {customer_name},\n\nJust a friendly reminder that invoice {invoice_number} is due. You can pay easily here: {payment_link}\n\nLet us know if you have any questions!\n\n{business_name}"
        },
        "thank_you": {
            "text": "Hi {customer_name}, thank you for choosing {business_name}! We appreciate your business. Need anything else? Just reply to this message.",
            "email": "Subject: Thank you, {customer_name}!\n\nHi {customer_name},\n\nThank you for your business! We truly appreciate you choosing {business_name}.\n\nIf there's anything else we can help with, just reply to this email.\n\nBest,\n{business_name}"
        }
    }
    
    def send_follow_up(self, lead_id: str, follow_up_type: str, contact_method: str, template_data: dict) -> dict:
        """
        Send follow-up message via specified method.
        Returns delivery status.
        """
        template = self.FOLLOW_UP_TEMPLATES.get(follow_up_type, self.FOLLOW_UP_TEMPLATES["new_lead"])
        
        message = template.get(contact_method, "").format(**template_data)
        
        # TODO: Implement actual sending
        # if contact_method == "text": send via Twilio
        # if contact_method == "email": send via SendGrid/Postmark
        
        return {
            "message_id": str(uuid4()),
            "lead_id": lead_id,
            "follow_up_type": follow_up_type,
            "contact_method": contact_method,
            "message": message,
            "status": "sent",
            "sent_at": datetime.utcnow().isoformat()
        }
    
    def schedule_sequence(self, lead_id: str, sequence_type: str, contact_method: str) -> dict:
        """
        Schedule an automated follow-up sequence.
        Returns list of scheduled messages.
        """
        sequence = [
            {"delay_hours": 1, "type": "new_lead"},
            {"delay_hours": 24, "type": "new_lead"},
            {"delay_hours": 72, "type": "quote_followup"},
        ]
        
        scheduled = []
        for item in sequence:
            scheduled.append({
                "message_id": str(uuid4()),
                "lead_id": lead_id,
                "follow_up_type": item["type"],
                "contact_method": contact_method,
                "scheduled_for": (datetime.utcnow() + timedelta(hours=item["delay_hours"])).isoformat(),
                "status": "scheduled"
            })
        
        return {
            "sequence_id": str(uuid4()),
            "lead_id": lead_id,
            "total_messages": len(scheduled),
            "scheduled": scheduled
        }


# ============ AI PRICING ENGINE ============

class PricingAIService:
    """
    AI-powered pricing suggestions.
    Learns from historical quote data.
    """
    
    def __init__(self):
        # Pricing patterns learned from historical data
        self.service_base_prices = {
            "roofing_repair": {"low": 150, "high": 800, "typical": 450},
            "roofing_replacement": {"low": 6000, "high": 15000, "typical": 9000},
            "roofing_inspection": {"low": 150, "high": 500, "typical": 300},
            "gutter_installation": {"low": 800, "high": 2500, "typical": 1500},
        }
    
    def suggest_price(self, service_type: str, job_details: dict, historical_quotes: List[dict]) -> dict:
        """
        Suggest price based on service type, job details, and historical data.
        Returns price suggestion with confidence score.
        """
        # Find historical matches
        similar_quotes = [
            q for q in historical_quotes
            if q.get("service_type", "").lower() == service_type.lower()
        ]
        
        if similar_quotes:
            # Use historical data
            prices = [float(q.get("total_amount", 0)) for q in similar_quotes]
            avg_price = sum(prices) / len(prices)
            min_price = min(prices)
            max_price = max(prices)
            
            confidence = min(len(similar_quotes) / 10, 0.9)  # Max 90% confidence
        else:
            # Use base prices from service_base_prices
            base = self.service_base_prices.get(service_type.lower().replace(" ", "_"), {})
            if base:
                avg_price = base["typical"]
                min_price = base["low"]
                max_price = base["high"]
                confidence = 0.5  # Lower confidence without historical data
            else:
                avg_price = 500
                min_price = 250
                max_price = 1000
                confidence = 0.3
        
        return {
            "suggested_price": round(avg_price, 2),
            "price_range_low": round(min_price, 2),
            "price_range_high": round(max_price, 2),
            "confidence": confidence,
            "based_on_quotes": len(similar_quotes) if similar_quotes else 0,
            "similar_services": [q.get("quote_number") for q in similar_quotes[:5]]
        }
    
    def learn_from_quote(self, quote_data: dict):
        """
        Store quote data for future pricing learning.
        Called after each quote is accepted/signed.
        """
        # TODO: Store in vector DB or use for model training
        pass


# ============ LEAD QUALIFICATION AI ============

class LeadQualificationAI:
    """
    AI-powered lead qualification.
    Scores leads based on intent, budget, timeline.
    """
    
    URGENCY_KEYWORDS = [
        "leaking", "flooding", "broken", "emergency", "urgent", "asap",
        "right now", "immediately", "not working", "fallen", "collapsed"
    ]
    
    BUDGET_KEYWORDS = [
        "budget", "afford", "expensive", "cheap", "inexpensive",
        "cost", "price", "pricing", "reasonable", "negotiate"
    ]
    
    TIMELINE_KEYWORDS = [
        "ready to start", "asap", "this week", "soon", "whenever",
        "flexible", "waiting", "not in a hurry", "planning"
    ]
    
    SERVICE_KEYWORDS = [
        "repair", "replace", "fix", "install", "maintenance",
        "inspect", "check", "estimate", "look at", "assess"
    ]
    
    def score_lead(self, lead_data: dict, transcript: str = "") -> dict:
        """
        Score a lead's qualification.
        Returns score and breakdown.
        """
        text = (lead_data.get("job_details", "") + " " + transcript).lower()
        
        # Count keyword matches
        urgency_score = sum(1 for kw in self.URGENCY_KEYWORDS if kw in text)
        budget_score = sum(1 for kw in self.BUDGET_KEYWORDS if kw in text)
        timeline_score = sum(1 for kw in self.TIMELINE_KEYWORDS if kw in text)
        service_score = sum(1 for kw in self.SERVICE_KEYWORDS if kw in text)
        
        # Weighted scoring
        total = (
            (urgency_score * 20) +
            (budget_score * 10) +
            (timeline_score * 15) +
            (service_score * 15)
        )
        
        score = min(total, 100)
        
        # Determine qualification level
        if score >= 70:
            level = "hot"
        elif score >= 40:
            level = "warm"
        else:
            level = "cold"
        
        return {
            "lead_id": lead_data.get("id"),
            "score": score,
            "level": level,
            "urgency_detected": urgency_score > 0,
            "budget_mentioned": budget_score > 0,
            "timeline_identified": timeline_score > 0,
            "service_clearly_defined": service_score > 0,
            "recommended_action": self._get_action(level)
        }
    
    def _get_action(self, level: str) -> str:
        """Get recommended action based on qualification level."""
        actions = {
            "hot": "Immediate callback - high intent",
            "warm": "Schedule consultation within 24h",
            "cold": "Add to nurture sequence"
        }
        return actions.get(level, "standard follow-up")


# ============ SERVICE INSTANCES ============

voice_ai = VoiceAIService()
consultation = PhoneConsultationService()
follow_up = AutoFollowUpService()
pricing_ai = PricingAIService()
lead_qualification = LeadQualificationAI()
