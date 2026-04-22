from fastapi import APIRouter, HTTPException
from typing import Optional

router = APIRouter()

def get_supabase():
    from main import supabase
    return supabase

def serialize_quote(q: dict) -> dict:
    return {
        "id": q.get("id", ""),
        "lead_id": q.get("lead_id", ""),
        "customer_name": q.get("customer_name", ""),
        "customer_email": q.get("customer_email", ""),
        "customer_phone": q.get("customer_phone", ""),
        "service_type": q.get("service_type", ""),
        "status": q.get("status", "draft"),
        "line_items": q.get("line_items", []),
        "total_amount": float(q.get("total_amount", 0)),
        "ai_suggested_price": float(q.get("ai_suggested_price", 0)) if q.get("ai_suggested_price") else None,
        "pricing_mode": q.get("pricing_mode", "manual"),
        "notes": q.get("notes", ""),
        "created_at": str(q.get("created_at", "")),
    }

@router.get("/")
async def list_quotes(account_id: Optional[str] = None, status: Optional[str] = None, limit: int = 50):
    supabase = get_supabase()
    
    if supabase:
        query = supabase.table("quotes").select("*")
        if account_id:
            query = query.eq("account_id", account_id)
        if status:
            query = query.eq("status", status)
        response = query.limit(limit).execute()
        return {"quotes": [serialize_quote(q) for q in response.data]}
    
    from routes.mock_data_fallback import get_mock_quotes
    return {"quotes": get_mock_quotes(status)}

@router.get("/{quote_id}")
async def get_quote(quote_id: str):
    supabase = get_supabase()
    
    if supabase:
        response = supabase.table("quotes").select("*").eq("id", quote_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Quote not found")
        return serialize_quote(response.data[0])
    
    from routes.mock_data_fallback import get_mock_quote
    quote = get_mock_quote(quote_id)
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    return quote

@router.post("/")
async def create_quote(quote: dict):
    supabase = get_supabase()
    
    data = {
        "customer_name": quote.get("customer_name", ""),
        "customer_email": quote.get("customer_email", ""),
        "customer_phone": quote.get("customer_phone", ""),
        "service_type": quote.get("service_type", ""),
        "line_items": quote.get("line_items", []),
        "total_amount": quote.get("total_amount", 0),
        "ai_suggested_price": quote.get("ai_suggested_price"),
        "pricing_mode": quote.get("pricing_mode", "manual"),
        "status": "draft",
        "notes": quote.get("notes", ""),
    }
    
    if supabase:
        response = supabase.table("quotes").insert(data).execute()
        return serialize_quote(response.data[0])
    
    from routes.mock_data_fallback import create_mock_quote
    return create_mock_quote(data)

@router.post("/{quote_id}/send")
async def send_quote(quote_id: str):
    supabase = get_supabase()
    
    if supabase:
        response = supabase.table("quotes").update({"status": "sent", "sent_at": "now()"}).eq("id", quote_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Quote not found")
        return {"success": True, "message": "Quote sent via SMS"}
    
    return {"success": True, "message": "Quote sent (mock)", "mock": True}

@router.post("/{quote_id}/approve")
async def approve_quote(quote_id: str, user_id: str):
    supabase = get_supabase()
    
    if supabase:
        response = supabase.table("quotes").update({
            "status": "approved",
            "approved_by_user_id": user_id
        }).eq("id", quote_id).execute()
        return {"success": True}
    
    return {"success": True, "mock": True}