"""
AI Routes — BrandBase Phase 2
Voice AI, Auto-follow-up, Pricing Intelligence, Lead Qualification
"""

from fastapi import APIRouter, HTTPException, Depends, status, Query
from datetime import datetime
from uuid import UUID
from typing import Optional

from routes.auth import get_current_user
from services.ai_services import (
    voice_ai, consultation, follow_up, pricing_ai, lead_qualification,
    VoiceAIService, PhoneConsultationService, AutoFollowUpService,
    PricingAIService, LeadQualificationAI
)
from mock_data import get_leads, get_lead_by_id, get_quotes, get_account

router = APIRouter()


# ============ VOICE AI ============

@router.post("/voice/initiate-call")
async def initiate_voice_call(
    lead_id: UUID,
    current_user: dict = Depends(get_current_user)
):
    """
    Initiate outbound voice call to lead.
    AI will engage in real-time conversation.
    """
    lead = get_lead_by_id(str(lead_id))
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    if not lead.get("customer_phone"):
        raise HTTPException(status_code=400, detail="No phone number for lead")
    
    call = voice_ai.initiate_call(
        lead_phone=lead["customer_phone"],
        lead_id=str(lead_id),
        account_id=lead["account_id"]
    )
    
    return {
        "message": f"Call initiated to {lead['customer_name']}",
        "call_sid": call["call_sid"],
        "status": call["status"]
    }


@router.post("/voice/consultation/start")
async def start_consultation(
    lead_id: UUID,
    current_user: dict = Depends(get_current_user)
):
    """
    Start phone consultation with AI.
    Generates greeting and initial questions.
    """
    lead = get_lead_by_id(str(lead_id))
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    account = get_account()
    greeting = consultation.generate_initial_greeting(
        business_name=account["business_name"],
        service_type=lead["service_type"]
    )
    
    return {
        "consultation_id": str(lead_id),
        "greeting": greeting,
        "lead": {
            "id": lead["id"],
            "customer_name": lead["customer_name"],
            "service_type": lead["service_type"]
        }
    }


@router.post("/voice/consultation/process")
async def process_consultation(
    lead_id: UUID,
    question: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Process lead question and generate AI response.
    """
    lead = get_lead_by_id(str(lead_id))
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    # Get AI response
    response = consultation.generate_faq_response(
        service_type=lead["service_type"],
        question=question
    )
    
    # Offer appointment
    appointment_offer = consultation.generate_appointment_offer()
    
    return {
        "response": response,
        "appointment_offer": appointment_offer,
        "follow_up_options": [
            "Schedule appointment",
            "More questions",
            "Leave voicemail"
        ]
    }


@router.post("/voice/consultation/qualify")
async def qualify_lead_from_consultation(
    lead_id: UUID,
    transcript: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Analyze consultation transcript to qualify lead.
    """
    lead = get_lead_by_id(str(lead_id))
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    qualification = consultation.qualify_lead(
        transcript=transcript,
        service_type=lead["service_type"]
    )
    
    return {
        "lead_id": str(lead_id),
        "qualification": qualification
    }


# ============ AUTO FOLLOW-UP ============

@router.post("/follow-up/send")
async def send_follow_up(
    lead_id: UUID,
    follow_up_type: str,
    contact_method: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Send single follow-up message to lead.
    Types: new_lead, appointment_reminder, quote_followup, payment_reminder, thank_you
    Methods: text, email
    """
    lead = get_lead_by_id(str(lead_id))
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    account = get_account()
    template_data = {
        "customer_name": lead["customer_name"],
        "business_name": account["business_name"],
        "service_type": lead["service_type"],
        "appointment_type": lead.get("appointment_type", "appointment"),
        "time": "10:00 AM",
        "date": "tomorrow"
    }
    
    result = follow_up.send_follow_up(
        lead_id=str(lead_id),
        follow_up_type=follow_up_type,
        contact_method=contact_method,
        template_data=template_data
    )
    
    return {
        "message": f"Follow-up sent via {contact_method}",
        "details": result
    }


@router.post("/follow-up/schedule-sequence")
async def schedule_follow_up_sequence(
    lead_id: UUID,
    sequence_type: str,
    contact_method: str = "text",
    current_user: dict = Depends(get_current_user)
):
    """
    Schedule automated follow-up sequence for lead.
    """
    lead = get_lead_by_id(str(lead_id))
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    sequence = follow_up.schedule_sequence(
        lead_id=str(lead_id),
        sequence_type=sequence_type,
        contact_method=contact_method
    )
    
    return {
        "message": f"Follow-up sequence scheduled ({sequence['total_messages']} messages)",
        "sequence": sequence
    }


@router.get("/follow-up/sequences/{lead_id}")
async def get_lead_sequences(
    lead_id: UUID,
    current_user: dict = Depends(get_current_user)
):
    """Get all scheduled follow-up sequences for a lead."""
    # TODO: Query scheduled sequences
    
    return {
        "lead_id": str(lead_id),
        "sequences": []
    }


# ============ AI PRICING ============

@router.post("/pricing/suggest")
async def suggest_price(
    service_type: str,
    job_details: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get AI-powered price suggestion based on service type and job details.
    """
    # Get historical quotes for this service type
    all_quotes = get_quotes()
    historical = [
        q for q in all_quotes
        if q.get("status") in ["paid", "accepted"]
    ]
    
    suggestion = pricing_ai.suggest_price(
        service_type=service_type,
        job_details={"description": job_details},
        historical_quotes=historical
    )
    
    return {
        "service_type": service_type,
        "suggestion": suggestion
    }


@router.post("/pricing/learn")
async def submit_quote_for_learning(
    quote_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Submit accepted quote data for AI pricing learning.
    """
    all_quotes = get_quotes()
    quote = next((q for q in all_quotes if q["id"] == quote_id), None)
    
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    
    pricing_ai.learn_from_quote(quote)
    
    return {
        "message": "Quote submitted for pricing learning",
        "quote_id": quote_id
    }


# ============ LEAD QUALIFICATION ============

@router.post("/qualify/lead")
async def qualify_lead(
    lead_id: UUID,
    transcript: str = "",
    current_user: dict = Depends(get_current_user)
):
    """
    Score and qualify a lead using AI.
    """
    lead = get_lead_by_id(str(lead_id))
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    score = lead_qualification.score_lead(lead, transcript)
    
    return {
        "lead_id": str(lead_id),
        "score": score
    }


@router.get("/qualify/batch")
async def batch_qualify_leads(
    status_filter: Optional[str] = None,
    current_user: dict = Depends(get_current_user)
):
    """
    Batch qualify all leads in a status or all leads.
    """
    leads = get_leads(status_filter)
    
    results = []
    for lead in leads:
        score = lead_qualification.score_lead(lead)
        results.append({
            "lead_id": lead["id"],
            "customer_name": lead["customer_name"],
            "service_type": lead["service_type"],
            "score": score
        })
    
    return {
        "total_leads": len(results),
        "results": results,
        "summary": {
            "hot": len([r for r in results if r["score"]["level"] == "hot"]),
            "warm": len([r for r in results if r["score"]["level"] == "warm"]),
            "cold": len([r for r in results if r["score"]["level"] == "cold"])
        }
    }


# ============ AI TEMPLATE GENERATION (Social Media) ============

@router.post("/social/generate-content")
async def generate_social_content(
    platform: str,
    topic: str,
    industry: str = "general",
    current_user: dict = Depends(get_current_user)
):
    """
    Generate AI social media content for a platform.
    """
    # TODO: Implement with MiniMax API
    
    # Mock generated content
    content_templates = {
        "instagram": "📸 {topic}\n\nHere's what you need to know about {topic} for your home:\n\n1. Regular maintenance saves money\n2. Early detection prevents major issues\n3. Professional help is worth it\n\nSave this post for later! 👆\n\n#HomeTips #{industry} #ServiceMatters",
        "facebook": "When it comes to {topic}, many homeowners have questions. We've put together this quick guide to help:\n\n✅ What to look for\n✅ When to call a professional\n✅ How to prevent future issues\n\nDrop a comment below if you have questions! 💬",
        "tiktok": "POV: You finally call a professional for your {topic} problem 👆\n\n#fyp #homereno #contractorlife"
    }
    
    content = content_templates.get(platform, content_templates["facebook"]).format(
        topic=topic,
        industry=industry.capitalize()
    )
    
    return {
        "platform": platform,
        "content": content,
        "hashtags": f"#{topic.replace(' ', '')} #{industry}",
        "suggested_posting_time": "10:00 AM local time"
    }
