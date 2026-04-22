from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

# Josh AI - FAQ-aware chatbot responses
JOSH_KNOWLEDGE = {
    "pricing": {
        "keywords": ["price", "cost", "pricing", "cost", "expensive", "cheap", "plan", "subscription", "pay", "fee", "charge"],
        "response": "BrandBase starts at $49/month for the Starter plan. Pro is $89/month (recommended for teams), and Commercial is $149/month. All plans come with a 14-day free trial — no credit card required! 💳",
        "link": "/#pricing"
    },
    "trial": {
        "keywords": ["trial", "free", "try", "demo", "test"],
        "response": "You get a full 14-day trial with access to all Pro features. No credit card needed to start. Just sign up and you're live in 5 minutes! 🚀",
        "link": "/auth/signup"
    },
    "setup": {
        "keywords": ["setup", "set up", "install", "install", "start", "begin", "get started", "onboard", "configure"],
        "response": "Setup takes about 5 minutes! Create your account, pick your industry, and the AI automatically configures your leads pipeline, quote templates, and scheduling. You'll be sending quotes the same day. ⚡",
        "link": "/auth/signup"
    },
    "leads": {
        "keywords": ["lead", "leads", "pipeline", "prospect", "customer acquisition", "new customer"],
        "response": "BrandBase gives you a visual lead pipeline so you can track every customer from first touch to signed contract. You can import existing leads via CSV, and our AI helps qualify them automatically. 📋",
        "link": "/dashboard/leads"
    },
    "ai": {
        "keywords": ["ai", "artificial intelligence", "chatbot", "assistant", "voice", "phone", "call", "automation", "automated"],
        "response": "Josh here! 👋 Our AI Voice Assistant answers your phone 24/7, qualifies leads, and books appointments directly into your calendar. Your leads get a professional experience while you sleep. 🤖",
        "link": None
    },
    "quotes": {
        "keywords": ["quote", "quotes", "estimate", "bid", "pricing", "send quote", "create quote"],
        "response": "Create professional quotes in minutes using our templates. Add your pricing, terms, and photos — then send with one click. Your customers can accept and pay online. Built-in e-signature too! 📝",
        "link": "/dashboard/quotes"
    },
    "payments": {
        "keywords": ["payment", "payments", "pay", "invoice", "invoicing", "stripe", "collect money", "billing"],
        "response": "Send invoices from within BrandBase and collect payments via Stripe. Customers can pay online with one click. Track which invoices are paid, pending, or overdue automatically. 💳",
        "link": "/dashboard/payments"
    },
    "calendar": {
        "keywords": ["calendar", "schedule", "scheduling", "appointment", "appointments", "book", "booking", "jobs"],
        "response": "BrandBase has a built-in scheduler with two-way Google Calendar and Outlook sync. Get automated reminders, avoid double-booking, and let customers book online 24/7. 📅",
        "link": "/dashboard/appointments"
    },
    "social": {
        "keywords": ["social", "social media", "instagram", "facebook", "post", "posting", "content", "marketing"],
        "response": "Our AI generates a month of social media content for you and auto-posts to Instagram, Facebook, and Google Business. You just approve before it goes live. 📱",
        "link": "/dashboard/social"
    },
    "integrations": {
        "keywords": ["integration", "integrate", "connect", "quickbooks", "stripe", "google", "calendar", "outlook", "slack", "zapier"],
        "response": "BrandBase connects with Stripe, QuickBooks, Google Calendar, Outlook, and Slack. More integrations (Xero, FreshBooks, etc.) coming soon. Commercial plan includes full API access for custom integrations. 🔌",
        "link": None
    },
    "security": {
        "keywords": ["security", "secure", "safe", "data", "privacy", "encryption", "backup", "protect"],
        "response": "Your data is protected with 256-bit AES encryption, SOC 2 compliant infrastructure, and daily backups. We never sell or share your data. 🇺🇸 Stored in AWS US data centers.",
        "link": None
    },
    "cancel": {
        "keywords": ["cancel", "cancellation", "stop", "end subscription", "pause"],
        "response": "You can cancel anytime from Settings — no penalties, no cancellation fees. Your data is always exportable. We also offer plan pauses if you need a break. 😔",
        "link": "/dashboard/settings"
    },
    "support": {
        "keywords": ["support", "help", "contact", "talk to", "speak to", "email", "phone number", "help center"],
        "response": "Pro users get priority email support. Commercial users get dedicated support. All users can reach us at help@brandbase.app — we typically respond within a few hours! 💬",
        "link": None
    },
    "mobile": {
        "keywords": ["mobile", "phone", "app", "iphone", "android", "ios", "tablet", "download"],
        "response": "BrandBase works great on mobile browsers. Native iOS and Android apps for field crews are coming very soon! 📱",
        "link": None
    },
    "team": {
        "keywords": ["team", "teams", "users", "employees", "staff", "collaborate", "collaboration", "multi-user"],
        "response": "Starter is for 1 user. Pro supports up to 3 team members. Commercial has unlimited users. Each person has their own login and you control who sees what. 👥",
        "link": "/#pricing"
    },
}

INTRO = "Hey! I'm Josh, your BrandBase assistant 👋 Ask me anything about pricing, features, setup, or how to get the most out of your account!"


def match_topic(message: str) -> tuple[str, Optional[str]]:
    msg_lower = message.lower()
    best_topic = "general"
    best_match_count = 0

    for topic, data in JOSH_KNOWLEDGE.items():
        matches = sum(1 for kw in data["keywords"] if kw in msg_lower)
        if matches > best_match_count:
            best_match_count = matches
            best_topic = topic

    if best_match_count > 0:
        topic_data = JOSH_KNOWLEDGE[best_topic]
        return topic_data["response"], topic_data["link"]
    return None, None


class ChatRequest(BaseModel):
    message: str
    context: Optional[str] = None  # e.g. "pricing", "leads", etc.


class ChatResponse(BaseModel):
    response: str
    action: Optional[str] = None
    action_label: Optional[str] = None


@router.post("/chat", response_model=ChatResponse)
async def josh_chat(req: ChatRequest):
    """
    Josh AI - Website assistant chatbot.
    Matches user questions to FAQ knowledge base.
    """
    response_text, link = match_topic(req.message)

    if response_text:
        return ChatResponse(
            response=response_text,
            action="navigate" if link else None,
            action_label="Learn more →" if link else None
        )

    # Fallback responses by context
    fallbacks = {
        "pricing": "For detailed pricing, visit our pricing page — Starter at $49/mo, Pro at $89/mo, Commercial at $149/mo. All with 14-day trials! 💳",
        "leads": "Want to learn more about managing leads in BrandBase? Create a free account and I'll show you around! 🚀",
        "trial": "The best way to see BrandBase in action is our 14-day free trial — no card required. Ready to start? 🎯",
    }

    if req.context and req.context in fallbacks:
        return ChatResponse(response=fallbacks[req.context])

    return ChatResponse(
        response="I'm Josh, BrandBase's assistant! I can help with pricing, features, setup, AI tools, integrations, and more. What would you like to know? 😊",
    )


@router.get("/intro")
async def josh_intro():
    """Get Josh's introductory message."""
    return {"message": INTRO}
