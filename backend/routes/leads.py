from fastapi import APIRouter, HTTPException
from typing import Optional
import os

router = APIRouter()

def get_supabase():
    """Get Supabase client from main module"""
    from main import supabase
    return supabase

# ============ HELPERS ============
def serialize_lead(lead: dict) -> dict:
    """Convert lead from Supabase to API format"""
    return {
        "id": lead.get("id", ""),
        "customer_name": lead.get("customer_name", ""),
        "customer_email": lead.get("customer_email", ""),
        "customer_phone": lead.get("customer_phone", ""),
        "service_type": lead.get("service_type", ""),
        "status": lead.get("status", "new_lead"),
        "source": lead.get("lead_source", ""),
        "assigned_to": lead.get("assigned_to_user_id", ""),
        "notes": lead.get("notes", ""),
        "priority": lead.get("priority", "medium"),
        "created_at": str(lead.get("created_at", "")),
    }

# ============ LEADS CRUD ============
@router.get("/")
async def list_leads(account_id: Optional[str] = None, status: Optional[str] = None, limit: int = 50):
    """List leads from Supabase or mock data"""
    supabase = get_supabase()
    
    if supabase:
        query = supabase.table("leads").select("*")
        if account_id:
            query = query.eq("account_id", account_id)
        if status:
            query = query.eq("status", status)
        query = query.limit(limit)
        response = query.execute()
        return {"leads": [serialize_lead(l) for l in response.data]}
    
    # Mock data fallback
    from routes.mock_data_fallback import get_mock_leads
    return {"leads": get_mock_leads(status)}

@router.get("/{lead_id}")
async def get_lead(lead_id: str):
    """Get single lead"""
    supabase = get_supabase()
    
    if supabase:
        response = supabase.table("leads").select("*").eq("id", lead_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Lead not found")
        return serialize_lead(response.data[0])
    
    from routes.mock_data_fallback import get_mock_lead
    lead = get_mock_lead(lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead

@router.post("/")
async def create_lead(lead: dict):
    """Create new lead in Supabase"""
    supabase = get_supabase()
    
    # Clean the data
    data = {
        "customer_name": lead.get("customer_name", ""),
        "customer_email": lead.get("customer_email", ""),
        "customer_phone": lead.get("customer_phone", ""),
        "service_type": lead.get("service_type", ""),
        "lead_source": lead.get("lead_source", "direct"),
        "status": "new_lead",
        "priority": lead.get("priority", "medium"),
        "notes": lead.get("notes", ""),
    }
    
    if supabase:
        response = supabase.table("leads").insert(data).execute()
        return serialize_lead(response.data[0])
    
    # Mock fallback
    from routes.mock_data_fallback import create_mock_lead
    return create_mock_lead(data)

@router.patch("/{lead_id}/status")
async def update_lead_status(lead_id: str, status: str):
    """Update lead status (pipeline progression)"""
    supabase = get_supabase()
    
    if supabase:
        response = supabase.table("leads").update({"status": status}).eq("id", lead_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Lead not found")
        return {"success": True, "status": status}
    
    return {"success": True, "status": status, "mock": True}