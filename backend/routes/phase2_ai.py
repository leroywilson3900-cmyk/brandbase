"""
BrandBase Phase 2 AI Routes
Email AI, Sentiment Analysis, Revenue Forecast, Proposal Writer, Competitive Intel
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List

from routes.auth import get_current_user
from services.phase2_ai import (
    EmailAIPervice,
    SentimentAnalysisService,
    RevenueForecastService,
    ProposalWriterService,
    CompetitiveIntelService,
)
from routes.mock_data_fallback import get_leads, get_account, get_quotes, get_lead_by_id

router = APIRouter()

email_service = EmailAIPervice()
sentiment_service = SentimentAnalysisService()
forecast_service = RevenueForecastService()
proposal_service = ProposalWriterService()
competitive_service = CompetitiveIntelService()


# ============ EMAIL AI ============

class EmailRequest(BaseModel):
    type: str  # lead_intro, follow_up_1, follow_up_2, follow_up_3, quote, appointment_reminder, referral_request
    lead_id: Optional[str] = None


@router.post("/email/generate")
async def generate_email(
    req: EmailRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Generate a personalized email for a lead.
    Types: lead_intro, follow_up_1, follow_up_2, follow_up_3, quote, appointment_reminder, referral_request
    """
    business = get_account()

    if req.type == "lead_intro":
        if not req.lead_id:
            raise HTTPException(status_code=400, detail="lead_id required")
        lead = get_lead_by_id(req.lead_id)
        if not lead:
            raise HTTPException(status_code=404, detail="Lead not found")
        result = email_service.generate_lead_intro_email(lead, business)

    elif req.type.startswith("follow_up"):
        follow_num = int(req.type.split("_")[1])
        if not req.lead_id:
            raise HTTPException(status_code=400, detail="lead_id required")
        lead = get_lead_by_id(req.lead_id)
        if not lead:
            raise HTTPException(status_code=404, detail="Lead not found")
        result = email_service.generate_follow_up_email(lead, follow_num, business)

    elif req.type == "quote":
        if not req.lead_id:
            raise HTTPException(status_code=400, detail="lead_id required")
        lead = get_lead_by_id(req.lead_id)
        quotes = get_quotes()
        quote = next((q for q in quotes if q.get("lead_id") == req.lead_id), quotes[0] if quotes else {})
        if not lead:
            raise HTTPException(status_code=404, detail="Lead not found")
        result = email_service.generate_quote_email(quote, lead, business)

    elif req.type == "appointment_reminder":
        if not req.lead_id:
            raise HTTPException(status_code=400, detail="lead_id required")
        lead = get_lead_by_id(req.lead_id)
        appointment = {
            "type": "On-site Estimate",
            "date": "January 18, 2026",
            "time": "10:00 AM",
            "address": lead.get("address", "TBD") if lead else "TBD"
        }
        result = email_service.generate_appointment_reminder_email(appointment, lead or {}, business)

    elif req.type == "referral_request":
        result = email_service.generate_referral_request_email(
            {"customer_name": "Valued Customer"}, business
        )

    else:
        raise HTTPException(status_code=400, detail=f"Unknown email type: {req.type}")

    return result


# ============ SENTIMENT ANALYSIS ============

class SentimentRequest(BaseModel):
    text: str
    messages: Optional[List[dict]] = None  # For multi-message conversation


@router.post("/sentiment/analyze")
async def analyze_sentiment(
    req: SentimentRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Analyze text or conversation for sentiment, urgency, and risk signals.
    """
    if req.messages:
        result = sentiment_service.analyze_conversation(req.messages)
    else:
        result = sentiment_service.analyze_text(req.text)

    return result


@router.post("/sentiment/batch")
async def batch_analyze_leads(
    current_user: dict = Depends(get_current_user)
):
    """
    Analyze sentiment for all leads with recent notes or activity.
    """
    leads = get_leads()
    results = []

    for lead in leads:
        notes = lead.get("notes", "")
        if notes:
            analysis = sentiment_service.analyze_text(notes)
            results.append({
                "lead_id": lead["id"],
                "customer_name": lead["customer_name"],
                "service": lead["service"],
                "status": lead["status"],
                "sentiment": analysis["sentiment_label"],
                "sentiment_score": analysis["sentiment_score"],
                "risk_level": analysis["risk_level"],
                "flags": analysis["flags"],
                "recommendation": analysis["recommendation"]
            })

    # Sort by risk level
    risk_order = {"high": 0, "medium": 1, "low": 2}
    results.sort(key=lambda x: risk_order.get(x["risk_level"], 2))

    return {
        "total_analyzed": len(results),
        "high_risk": len([r for r in results if r["risk_level"] == "high"]),
        "medium_risk": len([r for r in results if r["risk_level"] == "medium"]),
        "low_risk": len([r for r in results if r["risk_level"] == "low"]),
        "results": results
    }


# ============ REVENUE FORECAST ============

@router.get("/forecast/revenue")
async def get_revenue_forecast(
    months: int = 3,
    current_user: dict = Depends(get_current_user)
):
    """
    Forecast revenue from current pipeline over N months.
    """
    leads = get_leads()
    forecast = forecast_service.forecast_pipeline(leads, months)

    return forecast


@router.get("/forecast/run-rate")
async def get_run_rate(
    current_user: dict = Depends(get_current_user)
):
    """
    Calculate current revenue run rate from closed deals.
    """
    quotes = get_quotes()
    closed = [q for q in quotes if q.get("status") in ["paid", "accepted", "job_done"]]
    run_rate = forecast_service.calculate_run_rate(closed)

    return run_rate


# ============ PROPOSAL WRITER ============

class ProposalRequest(BaseModel):
    lead_id: str
    quote_id: Optional[str] = None


@router.post("/proposal/generate")
async def generate_proposal(
    req: ProposalRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Generate a full project proposal for a lead.
    """
    lead = get_lead_by_id(req.lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    business = get_account()
    quotes = get_quotes()
    quote = None
    if req.quote_id:
        quote = next((q for q in quotes if q["id"] == req.quote_id), None)

    if not quote:
        # Use most recent quote for this lead
        quote = next((q for q in quotes if q.get("lead_id") == req.lead_id), {
            "id": "00000000",
            "labor_amount": 3500,
            "materials_amount": 4000,
            "permits_amount": 500,
            "total_amount": 8000,
            "estimated_days": "3–4"
        })

    proposal = proposal_service.generate_proposal(lead, quote, business)
    return proposal


# ============ COMPETITIVE INTELLIGENCE ============

@router.get("/competitive/overview")
async def get_market_overview(
    current_user: dict = Depends(get_current_user)
):
    """
    Get high-level market intelligence overview.
    """
    return competitive_service.get_market_overview()


@router.get("/competitive/alert/{alert_type}")
async def get_competitive_alert(
    alert_type: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get a competitive alert with recommended action.
    Types: price_war, review_spike, new_competitor, seasonal_shift
    """
    return competitive_service.generate_alert(alert_type, {})


@router.get("/competitive/analyze/{competitor_name}")
async def analyze_competitor(
    competitor_name: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get detailed intelligence on a specific competitor.
    """
    return competitive_service.analyze_competitor(competitor_name)
