"""
BrandBase Database Models — Phase 1
Supports: User accounts, Lead pipeline, Quote flow, Approval workflow
"""

from datetime import datetime
from enum import Enum as PyEnum
from typing import Optional, List
from sqlalchemy import (
    Column, String, Text, Boolean, DateTime, ForeignKey, 
    Numeric, Enum, JSON, Index
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, DeclarativeBase
from sqlalchemy.sql import func
import uuid


class Base(DeclarativeBase):
    pass


# ============ ENUMS ============

class PlanType(PyEnum):
    STARTER = "starter"      # 1 user, $49/mo
    PRO = "pro"             # up to 5 users, $79/mo
    SCALE = "scale"         # unlimited users, $99/mo + $10/user


class UserRole(PyEnum):
    OWNER = "owner"         # Master account holder
    ADMIN = "admin"         # Office staff / secretary
    TRADESPERSON = "tradesperson"  # Field workers


class PreferredContact(PyEnum):
    TEXT = "text"
    EMAIL = "email"
    PHONE = "phone"


class LeadStatus(PyEnum):
    NEW = "new_lead"
    FOLLOWUP_CALL = "followup_call"
    APPOINTMENT_SET = "appointment_set"
    ON_SITE_VISIT = "on_site_visit"
    QUOTE_SENT = "quote_sent"
    DEPOSIT_RECEIVED = "deposit_received"
    JOB_IN_PROGRESS = "job_in_progress"
    PAYMENT_COMPLETE = "payment_complete"
    JOB_DONE = "job_done"
    LOST = "lost"


class QuoteStatus(PyEnum):
    DRAFT = "draft"
    PENDING_APPROVAL = "pending_approval"
    APPROVED = "approved"
    SENT = "sent"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    INVOICED = "invoiced"
    PAID = "paid"


class PricingMode(PyEnum):
    MANUAL = "manual"
    AI_ASSISTED = "ai_assisted"
    AI_AUTO = "ai_auto"


class LeadSource(PyEnum):
    GOOGLE_SEARCH = "google_search"
    GOOGLE_ADS = "google_ads"
    FACEBOOK = "facebook"
    INSTAGRAM = "instagram"
    TIKTOK = "tiktok"
    REFERRAL = "referral"
    YELP = "yelp"
    WALK_IN = "walk_in"
    OTHER = "other"


# ============ MODELS ============

class Account(Base):
    """Master account — one per business"""
    __tablename__ = "accounts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    business_name = Column(String(255), nullable=False)
    owner_id = Column(UUID(as_uuid=True), nullable=False)  # Supabase Auth UID
    plan = Column(Enum(PlanType), default=PlanType.PRO)
    stripe_customer_id = Column(String(255), nullable=True)
    logo_url = Column(String(500), nullable=True)
    address = Column(Text, nullable=True)
    phone = Column(String(50), nullable=True)
    email = Column(String(255), nullable=True)
    website = Column(String(500), nullable=True)
    domain = Column(String(255), nullable=True)  # custom domain
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    users = relationship("User", back_populates="account", cascade="all, delete-orphan")
    leads = relationship("Lead", back_populates="account", cascade="all, delete-orphan")
    templates = relationship("SocialTemplate", back_populates="account", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Account {self.business_name}>"


class User(Base):
    """Sub-users under an account"""
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    account_id = Column(UUID(as_uuid=True), ForeignKey("accounts.id"), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.TRADESPERSON)
    is_active = Column(Boolean, default=True)
    avatar_url = Column(String(500), nullable=True)
    phone = Column(String(50), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    account = relationship("Account", back_populates="users")
    created_leads = relationship("Lead", back_populates="created_by_user", foreign_keys="Lead.created_by_user_id")
    created_quotes = relationship("Quote", back_populates="created_by_user", foreign_keys="Quote.created_by_user_id")
    approved_quotes = relationship("Quote", back_populates="approved_by_user", foreign_keys="Quote.approved_by_user_id")

    def __repr__(self):
        return f"<User {self.name} ({self.role.value})>"


class Lead(Base):
    """Lead captured from landing page or manually entered"""
    __tablename__ = "leads"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    account_id = Column(UUID(as_uuid=True), ForeignKey("accounts.id"), nullable=False)
    created_by_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    
    # Customer info
    customer_name = Column(String(255), nullable=False)
    customer_email = Column(String(255), nullable=True)
    customer_phone = Column(String(50), nullable=True)
    customer_address = Column(Text, nullable=True)
    preferred_contact = Column(Enum(PreferredContact), default=PreferredContact.PHONE)
    
    # Job details
    service_type = Column(String(255), nullable=False)
    job_details = Column(Text, nullable=True)
    lead_source = Column(Enum(LeadSource), nullable=True)
    lead_source_detail = Column(String(255), nullable=True)  # "friend's name" or "Google ad campaign X"
    
    # Status tracking
    status = Column(Enum(LeadStatus), default=LeadStatus.NEW)
    status_history = Column(JSON, default=list)  # [{"status": "new_lead", "at": "2024-01-15T10:30:00Z", "by": "user_id"}]
    
    # AI engagement
    ai_engaged = Column(Boolean, default=False)
    ai_takeover_requested = Column(Boolean, default=False)
    
    # Appointment
    appointment_date = Column(DateTime(timezone=True), nullable=True)
    appointment_type = Column(String(50), nullable=True)  # "phone_consultation" or "on_site"
    appointment_notes = Column(Text, nullable=True)
    
    # Voice AI transcript (Phase 2)
    consultation_transcript = Column(Text, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    account = relationship("Account", back_populates="leads")
    created_by_user = relationship("User", back_populates="created_leads", foreign_keys=[created_by_user_id])
    quotes = relationship("Quote", back_populates="lead", cascade="all, delete-orphan")
    appointments = relationship("Appointment", back_populates="lead", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Lead {self.customer_name} - {self.service_type}>"


class Quote(Base):
    """Quote created on-site or generated by AI"""
    __tablename__ = "quotes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    lead_id = Column(UUID(as_uuid=True), ForeignKey("leads.id"), nullable=False)
    account_id = Column(UUID(as_uuid=True), ForeignKey("accounts.id"), nullable=False)
    created_by_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    approved_by_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)

    # Quote details
    quote_number = Column(String(50), nullable=True)  # auto-generated "QT-2024-001"
    status = Column(Enum(QuoteStatus), default=QuoteStatus.DRAFT)
    
    # Line items stored as JSON
    # [{"description": "Labor", "quantity": 4, "unit_price": 75, "total": 300}, ...]
    line_items = Column(JSON, nullable=False)
    labor_items = Column(JSON, nullable=True)  # separate for AI analysis
    material_items = Column(JSON, nullable=True)
    
    # Pricing
    subtotal = Column(Numeric(10, 2), nullable=True)
    tax_rate = Column(Numeric(5, 2), default=0.00)
    tax_amount = Column(Numeric(10, 2), nullable=True)
    total_amount = Column(Numeric(10, 2), nullable=False)
    
    # AI pricing assistance
    pricing_mode = Column(Enum(PricingMode), default=PricingMode.MANUAL)
    ai_suggested_price = Column(Numeric(10, 2), nullable=True)
    ai_pricing_confidence = Column(Numeric(3, 2), nullable=True)  # 0.00 to 1.00
    
    # Job site photos
    photos = Column(JSON, default=list)  # [{"url": "...", "caption": "..."}]
    
    # Notes
    internal_notes = Column(Text, nullable=True)
    customer_notes = Column(Text, nullable=True)
    
    # Digital signature
    signature_url = Column(String(500), nullable=True)
    signed_at = Column(DateTime(timezone=True), nullable=True)
    signed_ip = Column(String(50), nullable=True)
    
    # Change orders
    change_orders = Column(JSON, default=list)  # [{"id": "...", "description": "...", "amount": 500, "approved": true}]
    
    # Approval workflow
    submitted_at = Column(DateTime(timezone=True), nullable=True)
    approved_at = Column(DateTime(timezone=True), nullable=True)
    rejected_reason = Column(Text, nullable=True)
    
    # Sent to customer
    sent_at = Column(DateTime(timezone=True), nullable=True)
    sent_via = Column(String(50), nullable=True)  # "email" or "text" or "in_person"
    
    # Payment link
    payment_link_id = Column(String(255), nullable=True)
    payment_link_expires = Column(DateTime(timezone=True), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    lead = relationship("Lead", back_populates="quotes")
    account = relationship("Account")  # back-populated if needed
    created_by_user = relationship("User", foreign_keys=[created_by_user_id], back_populates="created_quotes")
    approved_by_user = relationship("User", foreign_keys=[approved_by_user_id], back_populates="approved_quotes")
    invoices = relationship("Invoice", back_populates="quote", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Quote {self.quote_number} - ${self.total_amount}>"


class Appointment(Base):
    """Appointment for phone consultation or on-site visit"""
    __tablename__ = "appointments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    lead_id = Column(UUID(as_uuid=True), ForeignKey("leads.id"), nullable=False)
    account_id = Column(UUID(as_uuid=True), ForeignKey("accounts.id"), nullable=False)
    scheduled_by_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    assigned_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)  # who will do the visit
    
    appointment_type = Column(String(50), nullable=False)  # "phone_consultation" or "on_site"
    scheduled_at = Column(DateTime(timezone=True), nullable=False)
    duration_minutes = Column(String(10), default="30")  # "30" or "60" or "90"
    
    status = Column(String(50), default="scheduled")  # "scheduled", "completed", "cancelled", "no_show"
    notes = Column(Text, nullable=True)
    
    # Phone consultation (Phase 2)
    consultation_started_at = Column(DateTime(timezone=True), nullable=True)
    consultation_ended_at = Column(DateTime(timezone=True), nullable=True)
    transcript_url = Column(String(500), nullable=True)
    
    # Reminders sent
    reminder_24h = Column(Boolean, default=False)
    reminder_1h = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    lead = relationship("Lead", back_populates="appointments")


class Invoice(Base):
    """Invoice generated from accepted quote"""
    __tablename__ = "invoices"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    quote_id = Column(UUID(as_uuid=True), ForeignKey("quotes.id"), nullable=False)
    account_id = Column(UUID(as_uuid=True), ForeignKey("accounts.id"), nullable=False)
    
    invoice_number = Column(String(50), nullable=True)  # "INV-2024-001"
    
    # Payment breakdown
    subtotal = Column(Numeric(10, 2), nullable=False)
    tax_amount = Column(Numeric(10, 2), nullable=True)
    total_amount = Column(Numeric(10, 2), nullable=False)
    amount_paid = Column(Numeric(10, 2), default=0)
    amount_due = Column(Numeric(10, 2), nullable=False)
    
    # Payment status
    status = Column(String(50), default="pending")  # "pending", "partial", "paid", "overdue", "cancelled"
    due_date = Column(DateTime(timezone=True), nullable=True)
    
    # Stripe
    stripe_invoice_id = Column(String(255), nullable=True)
    stripe_payment_intent_id = Column(String(255), nullable=True)
    
    # Payment methods used
    payments = Column(JSON, default=list)  # [{"method": "card", "amount": 500, "at": "...", "stripe_id": "..."}]
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    quote = relationship("Quote", back_populates="invoices")


class SocialTemplate(Base):
    """Pre-built social media posting templates"""
    __tablename__ = "social_templates"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    account_id = Column(UUID(as_uuid=True), ForeignKey("accounts.id"), nullable=False)
    
    name = Column(String(255), nullable=False)  # "Educational", "Showcase", "Testimonial", etc.
    description = Column(Text, nullable=True)
    industry = Column(String(100), nullable=True)  # "hvac", "plumbing", "roofing", etc.
    
    # Template structure
    template_content = Column(JSON, nullable=False)  
    # [{"day": 1, "platform": "instagram", "caption_template": "...", "hashtags": ["#..."]}, ...]
    
    # AI customization
    ai_customized = Column(Boolean, default=False)
    
    is_active = Column(Boolean, default=True)
    generated_posts_count = Column(String(10), default="0")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    account = relationship("Account", back_populates="templates")


class ScheduledPost(Base):
    """Scheduled social media posts"""
    __tablename__ = "scheduled_posts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    account_id = Column(UUID(as_uuid=True), ForeignKey("accounts.id"), nullable=False)
    created_by_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    platform = Column(String(50), nullable=False)  # "instagram", "tiktok", "facebook", "linkedin"
    content = Column(Text, nullable=False)
    media_urls = Column(JSON, default=list)  # [{"url": "...", "type": "image"}]
    hashtags = Column(String(500), nullable=True)
    
    scheduled_for = Column(DateTime(timezone=True), nullable=False)
    posted_at = Column(DateTime(timezone=True), nullable=True)
    status = Column(String(50), default="scheduled")  # "scheduled", "posted", "failed"
    
    # Platform-specific
    platform_post_id = Column(String(255), nullable=True)  # stored after successful post
    
    error_message = Column(Text, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class MaintenanceContract(Base):
    """Recurring maintenance contracts for customers"""
    __tablename__ = "maintenance_contracts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    account_id = Column(UUID(as_uuid=True), ForeignKey("accounts.id"), nullable=False)
    customer_id = Column(UUID(as_uuid=True), ForeignKey("leads.id"), nullable=False)
    
    plan_name = Column(String(255), nullable=False)  # "Annual HVAC Maintenance"
    description = Column(Text, nullable=True)
    annual_price = Column(Numeric(10, 2), nullable=False)
    
    renewal_date = Column(DateTime(timezone=True), nullable=False)
    status = Column(String(50), default="active")  # "active", "expiring_soon", "expired", "cancelled"
    
    stripe_subscription_id = Column(String(255), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


# ============ INDEXES ============

Index("ix_accounts_owner_id", Account.owner_id)
Index("ix_users_account_id", User.account_id)
Index("ix_users_email", User.email, unique=True)
Index("ix_leads_account_id", Lead.account_id)
Index("ix_leads_status", Lead.status)
Index("ix_quotes_lead_id", Quote.lead_id)
Index("ix_quotes_status", Quote.status)
Index("ix_invoices_quote_id", Invoice.quote_id)
