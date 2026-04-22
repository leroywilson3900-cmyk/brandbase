"""
Lead Routes — BrandBase Phase 1
Uses mock data for demo. Wire to Supabase in production.
"""

from fastapi import APIRouter, HTTPException, Depends, status, Query
from datetime import datetime
from uuid import UUID
from typing import Optional

from schemas import (
    LeadCreate, LeadUpdate, LeadStatusUpdate,
    LeadResponse, LeadListResponse
)
from routes.auth import get_current_user
from mock_data import (
    get_leads, get_lead_by_id, get_account, get_users, get_user_by_id,
    DEMO_LEADS, DEMO_USERS
)

router = APIRouter()


@router.post("/", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
async def create_lead(
    lead: LeadCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new lead.
    Auto-assigns to account, sets status to NEW.
    """
    account = get_account()
    new_lead = {
        "id": f"lead-{len(DEMO_LEADS) + 1:03d}",
        "account_id": account["id"],
        "created_by_user_id": current_user.get("user_id", "user-001"),
        "customer_name": lead.customer_name,
        "customer_email": lead.customer_email or "",
        "customer_phone": lead.customer_phone or "",
        "customer_address": lead.customer_address or "",
        "preferred_contact": lead.preferred_contact or "phone",
        "service_type": lead.service_type,
        "job_details": lead.job_details or "",
        "lead_source": lead.lead_source or "other",
        "lead_source_detail": lead.lead_source_detail or "",
        "status": "new_lead",
        "status_history": [
            {"status": "new_lead", "at": datetime.utcnow().isoformat(), "by": str(current_user.get("user_id", "user-001"))}
        ],
        "ai_engaged": False,
        "ai_takeover_requested": False,
        "appointment_date": None,
        "appointment_type": None,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    DEMO_LEADS.append(new_lead)
    
    return new_lead


@router.get("/", response_model=LeadListResponse)
async def list_leads(
    account_id: UUID,
    status_filter: Optional[str] = Query(None, alias="status"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user: dict = Depends(get_current_user)
):
    """
    List leads for account with optional status filter.
    Paginated.
    """
    leads = get_leads(status_filter)
    
    # Pagination
    start = (page - 1) * page_size
    end = start + page_size
    paginated = leads[start:end]
    
    return {
        "leads": paginated,
        "total": len(leads),
        "page": page,
        "page_size": page_size
    }


@router.get("/{lead_id}", response_model=LeadResponse)
async def get_lead(lead_id: UUID, current_user: dict = Depends(get_current_user)):
    """Get lead by ID."""
    lead = get_lead_by_id(str(lead_id))
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead


@router.put("/{lead_id}", response_model=LeadResponse)
async def update_lead(
    lead_id: UUID,
    lead: LeadUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update lead details."""
    lead_data = get_lead_by_id(str(lead_id))
    if not lead_data:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    # Update fields
    if lead.customer_name:
        lead_data["customer_name"] = lead.customer_name
    if lead.customer_email:
        lead_data["customer_email"] = lead.customer_email
    if lead.customer_phone:
        lead_data["customer_phone"] = lead.customer_phone
    if lead.service_type:
        lead_data["service_type"] = lead.service_type
    if lead.job_details is not None:
        lead_data["job_details"] = lead.job_details
    if lead.status:
        lead_data["status"] = lead.status
    
    lead_data["updated_at"] = datetime.utcnow()
    
    return lead_data


@router.patch("/{lead_id}/status", response_model=LeadResponse)
async def update_lead_status(
    lead_id: UUID,
    status_update: LeadStatusUpdate,
    current_user: dict = Depends(get_current_user)
):
    """
    Update lead status pipeline.
    Automatically logs to status_history.
    """
    lead_data = get_lead_by_id(str(lead_id))
    if not lead_data:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    # Update status
    old_status = lead_data["status"]
    new_status = status_update.status
    
    lead_data["status"] = new_status
    
    # Append to history
    history = lead_data.get("status_history", [])
    history.append({
        "status": new_status,
        "at": datetime.utcnow().isoformat(),
        "by": str(current_user.get("user_id", "user-001"))
    })
    lead_data["status_history"] = history
    
    lead_data["updated_at"] = datetime.utcnow()
    
    return lead_data


@router.post("/{lead_id}/ai-takeover")
async def request_ai_takeover(
    lead_id: UUID,
    current_user: dict = Depends(get_current_user)
):
    """
    Request AI to take over follow-up for this lead.
    """
    lead_data = get_lead_by_id(str(lead_id))
    if not lead_data:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    lead_data["ai_takeover_requested"] = True
    lead_data["ai_engaged"] = True
    
    return {
        "message": f"AI takeover requested for lead {lead_id}",
        "ai_engaged": True
    }


@router.post("/{lead_id}/ai-engage")
async def engage_ai(
    lead_id: UUID,
    current_user: dict = Depends(get_current_user)
):
    """
    Manually engage AI for a lead.
    """
    lead_data = get_lead_by_id(str(lead_id))
    if not lead_data:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    lead_data["ai_engaged"] = True
    
    return {
        "message": f"AI engaged for lead {lead_id}",
        "ai_engaged": True
    }


@router.get("/{lead_id}/timeline")
async def get_lead_timeline(
    lead_id: UUID,
    current_user: dict = Depends(get_current_user)
):
    """
    Get full timeline for a lead.
    Shows status history + quotes + appointments + invoices.
    """
    lead_data = get_lead_by_id(str(lead_id))
    if not lead_data:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    return {
        "lead": lead_data,
        "status_history": lead_data.get("status_history", []),
        "quotes": [],  # TODO: Join with quotes
        "appointments": [],  # TODO: Join with appointments
        "invoices": []  # TODO: Join with invoices
    }
