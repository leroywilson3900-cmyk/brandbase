"""
Quote Routes — BrandBase Phase 1
Handles: Quote CRUD, approval workflow, change orders, e-sign
"""

from fastapi import APIRouter, HTTPException, Depends, status
from datetime import datetime
from uuid import UUID
from typing import Optional

from schemas import (
    QuoteCreate, QuoteUpdate, QuoteApproveReject,
    QuoteResponse, QuoteListResponse
)
from routes.auth import get_current_user

router = APIRouter()


def calculate_totals(line_items: list, tax_rate: float = 0.0):
    """Calculate subtotal, tax, and total from line items."""
    subtotal = sum(item.get("total", item.get("unit_price", 0) * item.get("quantity", 1)) for item in line_items)
    tax_amount = subtotal * (tax_rate / 100)
    total = subtotal + tax_amount
    return subtotal, tax_amount, total


def generate_quote_number() -> str:
    """Generate unique quote number: QT-YYYY-NNNN"""
    return f"QT-{datetime.utcnow().year}-0001"


@router.post("/", response_model=QuoteResponse, status_code=status.HTTP_201_CREATED)
async def create_quote(
    quote: QuoteCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new quote (draft status).
    Called by tradesperson on-site.
    """
    # TODO: Implement with Supabase
    
    # Calculate totals
    all_items = []
    if quote.labor_items:
        all_items.extend(quote.labor_items)
    if quote.material_items:
        all_items.extend(quote.material_items)
    if quote.line_items:
        all_items = [item.model_dump() if hasattr(item, 'model_dump') else item for item in quote.line_items]
    
    subtotal, tax_amount, total = calculate_totals(all_items, quote.tax_rate)
    
    # Generate quote number
    quote_number = generate_quote_number()
    
    return {
        "id": "mock-quote-id",
        "lead_id": str(quote.lead_id),
        "account_id": current_user.get("account_id", "00000000-0000-0000-0000-000000000001"),
        "created_by_user_id": current_user["id"],
        "approved_by_user_id": None,
        "quote_number": quote_number,
        "status": "draft",
        "line_items": [item.model_dump() if hasattr(item, 'model_dump') else item for item in quote.line_items],
        "subtotal": float(subtotal),
        "tax_rate": quote.tax_rate,
        "tax_amount": float(tax_amount),
        "total_amount": float(total),
        "pricing_mode": "manual",
        "ai_suggested_price": None,
        "photos": quote.photos or [],
        "internal_notes": quote.internal_notes or "",
        "customer_notes": quote.customer_notes or "",
        "signature_url": None,
        "signed_at": None,
        "change_orders": [],
        "submitted_at": None,
        "approved_at": None,
        "rejected_reason": None,
        "sent_at": None,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }


@router.get("/", response_model=QuoteListResponse)
async def list_quotes(
    account_id: UUID,
    status_filter: Optional[str] = None,
    current_user: dict = Depends(get_current_user)
):
    """List quotes for account."""
    # TODO: Query quotes table
    
    return {
        "quotes": [],
        "total": 0
    }


@router.get("/{quote_id}", response_model=QuoteResponse)
async def get_quote(quote_id: UUID, current_user: dict = Depends(get_current_user)):
    """Get quote by ID."""
    # TODO: Fetch from quotes table
    
    return {
        "id": str(quote_id),
        "lead_id": "lead-1",
        "account_id": current_user.get("account_id", "00000000-0000-0000-0000-000000000001"),
        "created_by_user_id": current_user["id"],
        "approved_by_user_id": None,
        "quote_number": "QT-2024-0001",
        "status": "draft",
        "line_items": [
            {"description": "Labor", "quantity": 4, "unit_price": 75, "total": 300},
            {"description": "Materials", "quantity": 1, "unit_price": 150, "total": 150}
        ],
        "subtotal": 450.00,
        "tax_rate": 8.0,
        "tax_amount": 36.00,
        "total_amount": 486.00,
        "pricing_mode": "manual",
        "ai_suggested_price": None,
        "photos": [],
        "internal_notes": "",
        "customer_notes": "",
        "signature_url": None,
        "signed_at": None,
        "change_orders": [],
        "submitted_at": None,
        "approved_at": None,
        "rejected_reason": None,
        "sent_at": None,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }


@router.put("/{quote_id}", response_model=QuoteResponse)
async def update_quote(
    quote_id: UUID,
    quote: QuoteUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update quote (draft only)."""
    # TODO: Check status is draft, update fields
    
    return {
        "id": str(quote_id),
        "lead_id": "lead-1",
        "account_id": current_user.get("account_id", "00000000-0000-0000-0000-000000000001"),
        "created_by_user_id": current_user["id"],
        "approved_by_user_id": None,
        "quote_number": "QT-2024-0001",
        "status": "draft",
        "line_items": quote.line_items if quote.line_items else [],
        "subtotal": 450.00,
        "tax_rate": quote.tax_rate if quote.tax_rate else 8.0,
        "tax_amount": 36.00,
        "total_amount": 486.00,
        "pricing_mode": "manual",
        "ai_suggested_price": None,
        "photos": quote.photos or [],
        "internal_notes": quote.internal_notes or "",
        "customer_notes": quote.customer_notes or "",
        "signature_url": None,
        "signed_at": None,
        "change_orders": [],
        "submitted_at": None,
        "approved_at": None,
        "rejected_reason": None,
        "sent_at": None,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }


@router.post("/{quote_id}/submit", response_model=QuoteResponse)
async def submit_quote(quote_id: UUID, current_user: dict = Depends(get_current_user)):
    """
    Submit quote for approval.
    Changes status from draft → pending_approval.
    Notifies office/boss.
    """
    # TODO: Update status, send notification
    
    return {
        "id": str(quote_id),
        "lead_id": "lead-1",
        "account_id": current_user.get("account_id", "00000000-0000-0000-0000-000000000001"),
        "created_by_user_id": current_user["id"],
        "approved_by_user_id": None,
        "quote_number": "QT-2024-0001",
        "status": "pending_approval",
        "line_items": [],
        "subtotal": 450.00,
        "tax_rate": 8.0,
        "tax_amount": 36.00,
        "total_amount": 486.00,
        "pricing_mode": "manual",
        "ai_suggested_price": None,
        "photos": [],
        "internal_notes": "",
        "customer_notes": "",
        "signature_url": None,
        "signed_at": None,
        "change_orders": [],
        "submitted_at": datetime.utcnow(),
        "approved_at": None,
        "rejected_reason": None,
        "sent_at": None,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }


@router.post("/{quote_id}/approve", response_model=QuoteResponse)
async def approve_quote(quote_id: UUID, current_user: dict = Depends(get_current_user)):
    """
    Approve quote.
    Only owner/admin can approve.
    Status: pending_approval → approved.
    """
    # TODO: 
    # 1. Check current_user is owner/admin
    # 2. Update status to approved
    # 3. Set approved_by_user_id
    # 4. Record approved_at
    
    return {
        "id": str(quote_id),
        "lead_id": "lead-1",
        "account_id": current_user.get("account_id", "00000000-0000-0000-0000-000000000001"),
        "created_by_user_id": current_user["id"],
        "approved_by_user_id": current_user["id"],
        "quote_number": "QT-2024-0001",
        "status": "approved",
        "line_items": [],
        "subtotal": 450.00,
        "tax_rate": 8.0,
        "tax_amount": 36.00,
        "total_amount": 486.00,
        "pricing_mode": "manual",
        "ai_suggested_price": None,
        "photos": [],
        "internal_notes": "",
        "customer_notes": "",
        "signature_url": None,
        "signed_at": None,
        "change_orders": [],
        "submitted_at": datetime.utcnow(),
        "approved_at": datetime.utcnow(),
        "rejected_reason": None,
        "sent_at": None,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }


@router.post("/{quote_id}/reject", response_model=QuoteResponse)
async def reject_quote(
    quote_id: UUID,
    decision: QuoteApproveReject,
    current_user: dict = Depends(get_current_user)
):
    """
    Reject quote.
    Optional rejection reason stored.
    Tradie notified to revise.
    """
    # TODO: Update status to rejected, store reason
    
    return {
        "id": str(quote_id),
        "lead_id": "lead-1",
        "account_id": current_user.get("account_id", "00000000-0000-0000-0000-000000000001"),
        "created_by_user_id": current_user["id"],
        "approved_by_user_id": None,
        "quote_number": "QT-2024-0001",
        "status": "rejected",
        "line_items": [],
        "subtotal": 450.00,
        "tax_rate": 8.0,
        "tax_amount": 36.00,
        "total_amount": 486.00,
        "pricing_mode": "manual",
        "ai_suggested_price": None,
        "photos": [],
        "internal_notes": "",
        "customer_notes": "",
        "signature_url": None,
        "signed_at": None,
        "change_orders": [],
        "submitted_at": datetime.utcnow(),
        "approved_at": None,
        "rejected_reason": decision.rejection_reason or "",
        "sent_at": None,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }


@router.post("/{quote_id}/send", response_model=QuoteResponse)
async def send_quote(quote_id: UUID, current_user: dict = Depends(get_current_user)):
    """
    Send approved quote to customer.
    Status: approved → sent.
    Triggers email/SMS with payment link.
    """
    # TODO: 
    # 1. Generate DocuSign envelope
    # 2. Send via email/SMS
    # 3. Generate Stripe payment link
    # 4. Update status and sent_at
    
    return {
        "id": str(quote_id),
        "lead_id": "lead-1",
        "account_id": current_user.get("account_id", "00000000-0000-0000-0000-000000000001"),
        "created_by_user_id": current_user["id"],
        "approved_by_user_id": current_user["id"],
        "quote_number": "QT-2024-0001",
        "status": "sent",
        "line_items": [],
        "subtotal": 450.00,
        "tax_rate": 8.0,
        "tax_amount": 36.00,
        "total_amount": 486.00,
        "pricing_mode": "manual",
        "ai_suggested_price": None,
        "photos": [],
        "internal_notes": "",
        "customer_notes": "",
        "signature_url": None,
        "signed_at": None,
        "change_orders": [],
        "submitted_at": datetime.utcnow(),
        "approved_at": datetime.utcnow(),
        "rejected_reason": None,
        "sent_at": datetime.utcnow(),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }


@router.post("/{quote_id}/sign", response_model=QuoteResponse)
async def sign_quote(quote_id: UUID, signature_data: dict, current_user: dict = Depends(get_current_user)):
    """
    Record digital signature from DocuSign.
    Updates quote with signature_url and signed_at.
    """
    # TODO: Update from DocuSign webhook data
    
    return {
        "id": str(quote_id),
        "lead_id": "lead-1",
        "account_id": current_user.get("account_id", "00000000-0000-0000-0000-000000000001"),
        "created_by_user_id": current_user["id"],
        "approved_by_user_id": current_user["id"],
        "quote_number": "QT-2024-0001",
        "status": "accepted",
        "line_items": [],
        "subtotal": 450.00,
        "tax_rate": 8.0,
        "tax_amount": 36.00,
        "total_amount": 486.00,
        "pricing_mode": "manual",
        "ai_suggested_price": None,
        "photos": [],
        "internal_notes": "",
        "customer_notes": "",
        "signature_url": signature_data.get("signature_url"),
        "signed_at": datetime.utcnow(),
        "change_orders": [],
        "submitted_at": datetime.utcnow(),
        "approved_at": datetime.utcnow(),
        "rejected_reason": None,
        "sent_at": datetime.utcnow(),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }


@router.post("/{quote_id}/change-order", response_model=QuoteResponse)
async def add_change_order(
    quote_id: UUID,
    change_order: dict,
    current_user: dict = Depends(get_current_user)
):
    """
    Add change order to quote.
    Customer must approve new scope.
    Updates total amount.
    """
    # TODO: Append to change_orders array, recalculate total
    
    return {
        "id": str(quote_id),
        "lead_id": "lead-1",
        "account_id": current_user.get("account_id", "00000000-0000-0000-0000-000000000001"),
        "created_by_user_id": current_user["id"],
        "approved_by_user_id": current_user["id"],
        "quote_number": "QT-2024-0001",
        "status": "sent",
        "line_items": [],
        "subtotal": 450.00,
        "tax_rate": 8.0,
        "tax_amount": 36.00,
        "total_amount": 536.00,  # Increased
        "pricing_mode": "manual",
        "ai_suggested_price": None,
        "photos": [],
        "internal_notes": "",
        "customer_notes": "",
        "signature_url": None,
        "signed_at": None,
        "change_orders": [change_order],
        "submitted_at": datetime.utcnow(),
        "approved_at": datetime.utcnow(),
        "rejected_reason": None,
        "sent_at": datetime.utcnow(),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
