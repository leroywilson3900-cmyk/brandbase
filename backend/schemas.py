"""
BrandBase Pydantic Schemas — Phase 1
Request/Response models for API endpoints
"""

from datetime import datetime
from typing import Optional, List, Any
from pydantic import BaseModel, EmailStr, Field
from uuid import UUID


# ============ AUTH ============

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    name: str
    business_name: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: UUID
    email: str
    name: str
    account_id: UUID | None = None
    role: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


# ============ ACCOUNT ============

class AccountCreate(BaseModel):
    business_name: str
    phone: str | None = None
    email: str | None = None
    address: str | None = None


class AccountUpdate(BaseModel):
    business_name: str | None = None
    phone: str | None = None
    email: str | None = None
    address: str | None = None
    logo_url: str | None = None
    website: str | None = None
    domain: str | None = None


class AccountResponse(BaseModel):
    id: UUID
    business_name: str
    owner_id: UUID
    plan: str
    stripe_customer_id: str | None = None
    logo_url: str | None = None
    address: str | None = None
    phone: str | None = None
    email: str | None = None
    website: str | None = None
    domain: str | None = None
    created_at: datetime

    class Config:
        from_attributes = True


class UserInviteRequest(BaseModel):
    email: EmailStr
    name: str
    role: str = Field(default="tradesperson", pattern="^(owner|admin|tradesperson)$")


class UserInviteResponse(BaseModel):
    user_id: UUID
    email: str
    status: str
    message: str


# ============ LEAD ============

class LeadCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr | None = None
    customer_phone: str | None = None
    customer_address: str | None = None
    preferred_contact: str | None = Field(default="phone", pattern="^(text|email|phone)$")
    service_type: str
    job_details: str | None = None
    lead_source: str | None = Field(default="other", pattern="^(google_search|google_ads|facebook|instagram|tiktok|referral|yelp|walk_in|other)$")
    lead_source_detail: str | None = None


class LeadUpdate(BaseModel):
    customer_name: str | None = None
    customer_email: EmailStr | None = None
    customer_phone: str | None = None
    customer_address: str | None = None
    preferred_contact: str | None = None
    service_type: str | None = None
    job_details: str | None = None
    status: str | None = None


class LeadStatusUpdate(BaseModel):
    status: str
    notes: str | None = None


class LeadResponse(BaseModel):
    id: UUID
    account_id: UUID
    created_by_user_id: UUID | None = None
    customer_name: str
    customer_email: str | None = None
    customer_phone: str | None = None
    customer_address: str | None = None
    preferred_contact: str
    service_type: str
    job_details: str | None = None
    lead_source: str | None = None
    lead_source_detail: str | None = None
    status: str
    status_history: list | None = None
    ai_engaged: bool
    ai_takeover_requested: bool
    appointment_date: datetime | None = None
    appointment_type: str | None = None
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True


class LeadListResponse(BaseModel):
    leads: list[LeadResponse]
    total: int
    page: int
    page_size: int


# ============ QUOTE ============

class LineItem(BaseModel):
    description: str
    quantity: float = 1
    unit_price: float
    total: float | None = None


class QuoteCreate(BaseModel):
    lead_id: UUID
    line_items: list[LineItem]
    labor_items: list[LineItem] | None = None
    material_items: list[LineItem] | None = None
    tax_rate: float = 0.0
    internal_notes: str | None = None
    customer_notes: str | None = None
    photos: list[dict] | None = None


class QuoteUpdate(BaseModel):
    line_items: list[LineItem] | None = None
    labor_items: list[LineItem] | None = None
    material_items: list[LineItem] | None = None
    tax_rate: float | None = None
    internal_notes: str | None = None
    customer_notes: str | None = None
    photos: list[dict] | None = None


class QuoteApproveReject(BaseModel):
    approved: bool
    rejection_reason: str | None = None


class QuoteResponse(BaseModel):
    id: UUID
    lead_id: UUID
    account_id: UUID
    created_by_user_id: UUID
    approved_by_user_id: UUID | None = None
    quote_number: str | None = None
    status: str
    line_items: list[dict]
    subtotal: float | None = None
    tax_rate: float
    tax_amount: float | None = None
    total_amount: float
    pricing_mode: str
    ai_suggested_price: float | None = None
    photos: list[dict] | None = None
    internal_notes: str | None = None
    customer_notes: str | None = None
    signature_url: str | None = None
    signed_at: datetime | None = None
    change_orders: list[dict] | None = None
    submitted_at: datetime | None = None
    approved_at: datetime | None = None
    rejected_reason: str | None = None
    sent_at: datetime | None = None
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True


class QuoteListResponse(BaseModel):
    quotes: list[QuoteResponse]
    total: int


# ============ APPOINTMENT ============

class AppointmentCreate(BaseModel):
    lead_id: UUID
    appointment_type: str = Field(pattern="^(phone_consultation|on_site)$")
    scheduled_at: datetime
    duration_minutes: str = "30"
    assigned_user_id: UUID | None = None
    notes: str | None = None


class AppointmentUpdate(BaseModel):
    scheduled_at: datetime | None = None
    duration_minutes: str | None = None
    assigned_user_id: UUID | None = None
    status: str | None = None
    notes: str | None = None


class AppointmentResponse(BaseModel):
    id: UUID
    lead_id: UUID
    account_id: UUID
    scheduled_by_user_id: UUID
    assigned_user_id: UUID | None = None
    appointment_type: str
    scheduled_at: datetime
    duration_minutes: str
    status: str
    notes: str | None = None
    reminder_24h: bool
    reminder_1h: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ============ INVOICE ============

class InvoiceResponse(BaseModel):
    id: UUID
    quote_id: UUID
    account_id: UUID
    invoice_number: str | None = None
    subtotal: float
    tax_amount: float | None = None
    total_amount: float
    amount_paid: float
    amount_due: float
    status: str
    due_date: datetime | None = None
    stripe_invoice_id: str | None = None
    payments: list[dict] | None = None
    created_at: datetime

    class Config:
        from_attributes = True


# ============ SOCIAL MEDIA ============

class TemplateCreate(BaseModel):
    name: str
    description: str | None = None
    industry: str | None = None
    template_content: list[dict]


class TemplateResponse(BaseModel):
    id: UUID
    account_id: UUID
    name: str
    description: str | None = None
    industry: str | None = None
    template_content: list[dict]
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class ScheduledPostCreate(BaseModel):
    platform: str = Field(pattern="^(instagram|tiktok|facebook|linkedin|twitter)$")
    content: str
    media_urls: list[dict] | None = None
    hashtags: str | None = None
    scheduled_for: datetime


class ScheduledPostResponse(BaseModel):
    id: UUID
    account_id: UUID
    platform: str
    content: str
    media_urls: list[dict] | None = None
    hashtags: str | None = None
    scheduled_for: datetime
    posted_at: datetime | None = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# ============ ANALYTICS ============

class RevenueByUser(BaseModel):
    user_id: UUID
    user_name: str
    total_revenue: float
    jobs_count: int


class RevenueSummary(BaseModel):
    period_start: datetime
    period_end: datetime
    total_revenue: float
    total_jobs: int
    by_user: list[RevenueByUser]


# ============ AI PRICING (Phase 2) ============

class AIPricingRequest(BaseModel):
    service_type: str
    job_details: str | None = None
    location: str | None = None
    urgency: str | None = None  # "routine", "soon", "emergency"


class AIPricingResponse(BaseModel):
    suggested_price: float
    price_range_low: float
    price_range_high: float
    confidence: float
    based_on_jobs: int
    similar_services: list[str]
