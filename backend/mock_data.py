"""
BrandBase Mock Data — Phase 1 Demo
Working data for frontend development and demo purposes
"""

from datetime import datetime, timedelta
from uuid import uuid4

# ============ ACCOUNTS ============

DEMO_ACCOUNT = {
    "id": "acc-001",
    "business_name": "Bayou Roofing & Construction",
    "owner_id": "user-001",
    "plan": "pro",
    "stripe_customer_id": "cus_mock123",
    "logo_url": None,
    "address": "123 Main Street, Baton Rouge, LA 70801",
    "phone": "(225) 555-0123",
    "email": "info@bayouroofing.com",
    "website": "https://bayouroofing.com",
    "domain": "bayouroofing.com",
    "created_at": "2024-01-01T00:00:00Z"
}

# ============ USERS ============

DEMO_USERS = [
    {
        "id": "user-001",
        "account_id": "acc-001",
        "email": "marcus@bayouroofing.com",
        "name": "Marcus Thompson",
        "role": "owner",
        "is_active": True,
        "phone": "(225) 555-0101",
        "created_at": "2024-01-01T00:00:00Z"
    },
    {
        "id": "user-002",
        "account_id": "acc-001",
        "email": "jim@bayouroofing.com",
        "name": "Jim Butler",
        "role": "tradesperson",
        "is_active": True,
        "phone": "(225) 555-0102",
        "created_at": "2024-01-01T00:00:00Z"
    },
    {
        "id": "user-003",
        "account_id": "acc-001",
        "email": "bob@bayouroofing.com",
        "name": "Bob Landry",
        "role": "tradesperson",
        "is_active": True,
        "phone": "(225) 555-0103",
        "created_at": "2024-01-01T00:00:00Z"
    },
    {
        "id": "user-004",
        "account_id": "acc-001",
        "email": "april@bayouroofing.com",
        "name": "April Guidry",
        "role": "admin",
        "is_active": True,
        "phone": "(225) 555-0104",
        "created_at": "2024-01-01T00:00:00Z"
    }
]

# ============ LEADS ============

DEMO_LEADS = [
    {
        "id": "lead-001",
        "account_id": "acc-001",
        "created_by_user_id": "user-004",
        "customer_name": "Jennifer Mouton",
        "customer_email": "jennifer.mouton@gmail.com",
        "customer_phone": "(225) 555-2001",
        "customer_address": "456 Oak Lane, Baton Rouge, LA 70802",
        "preferred_contact": "phone",
        "service_type": "Roofing - Shingle Replacement",
        "job_details": "Leaking roof after recent storm. Missing shingles on back section. Approx 2000 sq ft.",
        "lead_source": "google_search",
        "lead_source_detail": "",
        "status": "new_lead",
        "status_history": [
            {"status": "new_lead", "at": "2024-01-15T08:30:00Z", "by": "user-004"}
        ],
        "ai_engaged": False,
        "ai_takeover_requested": False,
        "appointment_date": None,
        "appointment_type": None,
        "created_at": "2024-01-15T08:30:00Z",
        "updated_at": "2024-01-15T08:30:00Z"
    },
    {
        "id": "lead-002",
        "account_id": "acc-001",
        "created_by_user_id": "user-004",
        "customer_name": "Robert Cormier",
        "customer_email": "rcormier@outlook.com",
        "customer_phone": "(225) 555-2002",
        "customer_address": "789 Maple Dr, Zachary, LA 70791",
        "preferred_contact": "text",
        "service_type": "Roofing - Full Replacement",
        "job_details": "Old roof, 15 years old. Wanting full replacement with architectural shingles.",
        "lead_source": "referral",
        "lead_source_detail": "Referred by Jennifer Mouton",
        "status": "appointment_set",
        "status_history": [
            {"status": "new_lead", "at": "2024-01-14T10:00:00Z", "by": "user-004"},
            {"status": "followup_call", "at": "2024-01-14T14:00:00Z", "by": "user-004"},
            {"status": "appointment_set", "at": "2024-01-14T14:30:00Z", "by": "user-004"}
        ],
        "ai_engaged": True,
        "ai_takeover_requested": False,
        "appointment_date": "2024-01-18T10:00:00Z",
        "appointment_type": "on_site",
        "created_at": "2024-01-14T10:00:00Z",
        "updated_at": "2024-01-14T14:30:00Z"
    },
    {
        "id": "lead-003",
        "account_id": "acc-001",
        "created_by_user_id": "user-002",
        "customer_name": "Sarah Hebert",
        "customer_email": "shebert@yahoo.com",
        "customer_phone": "(225) 555-2003",
        "customer_address": "321 Pine St, Baton Rouge, LA 70803",
        "preferred_contact": "email",
        "service_type": "Roofing - Repair",
        "job_details": "Water stains on ceiling. Possible pipe boot leak.",
        "lead_source": "facebook",
        "lead_source_detail": "",
        "status": "quote_sent",
        "status_history": [
            {"status": "new_lead", "at": "2024-01-10T09:00:00Z", "by": "user-002"},
            {"status": "followup_call", "at": "2024-01-10T11:00:00Z", "by": "user-002"},
            {"status": "appointment_set", "at": "2024-01-10T15:00:00Z", "by": "user-002"},
            {"status": "on_site_visit", "at": "2024-01-12T10:00:00Z", "by": "user-002"},
            {"status": "quote_sent", "at": "2024-01-12T14:00:00Z", "by": "user-002"}
        ],
        "ai_engaged": False,
        "ai_takeover_requested": False,
        "appointment_date": "2024-01-12T10:00:00Z",
        "appointment_type": "on_site",
        "created_at": "2024-01-10T09:00:00Z",
        "updated_at": "2024-01-12T14:00:00Z"
    },
    {
        "id": "lead-004",
        "account_id": "acc-001",
        "created_by_user_id": "user-002",
        "customer_name": "Michael Vincent",
        "customer_email": "mvincent@gmail.com",
        "customer_phone": "(225) 555-2004",
        "customer_address": "654 Cypress Ave, Baton Rouge, LA 70804",
        "preferred_contact": "phone",
        "service_type": "Roofing - Storm Damage",
        "job_details": "Major storm damage. Multiple areas. Insurance claim filed.",
        "lead_source": "google_ads",
        "lead_source_detail": "Storm damage campaign - January",
        "status": "deposit_received",
        "status_history": [
            {"status": "new_lead", "at": "2024-01-08T07:00:00Z", "by": "user-004"},
            {"status": "followup_call", "at": "2024-01-08T09:00:00Z", "by": "user-004"},
            {"status": "appointment_set", "at": "2024-01-08T11:00:00Z", "by": "user-004"},
            {"status": "on_site_visit", "at": "2024-01-09T08:00:00Z", "by": "user-002"},
            {"status": "quote_sent", "at": "2024-01-09T12:00:00Z", "by": "user-002"},
            {"status": "deposit_received", "at": "2024-01-11T10:00:00Z", "by": "user-004"}
        ],
        "ai_engaged": True,
        "ai_takeover_requested": True,
        "appointment_date": "2024-01-09T08:00:00Z",
        "appointment_type": "on_site",
        "created_at": "2024-01-08T07:00:00Z",
        "updated_at": "2024-01-11T10:00:00Z"
    },
    {
        "id": "lead-005",
        "account_id": "acc-001",
        "created_by_user_id": "user-004",
        "customer_name": "Lisa Trahan",
        "customer_email": "lisa.trahan@work.com",
        "customer_phone": "(225) 555-2005",
        "customer_address": "987 Oak Ridge, Baton Rouge, LA 70805",
        "preferred_contact": "text",
        "service_type": "Roofing - Inspection",
        "job_details": "Annual roof inspection for home purchase. Needs detailed report.",
        "lead_source": "yelp",
        "lead_source_detail": "",
        "status": "job_done",
        "status_history": [
            {"status": "new_lead", "at": "2024-01-05T10:00:00Z", "by": "user-004"},
            {"status": "followup_call", "at": "2024-01-05T11:00:00Z", "by": "user-004"},
            {"status": "appointment_set", "at": "2024-01-05T14:00:00Z", "by": "user-004"},
            {"status": "on_site_visit", "at": "2024-01-07T09:00:00Z", "by": "user-003"},
            {"status": "quote_sent", "at": "2024-01-07T11:00:00Z", "by": "user-003"},
            {"status": "deposit_received", "at": "2024-01-08T09:00:00Z", "by": "user-004"},
            {"status": "job_in_progress", "at": "2024-01-10T08:00:00Z", "by": "user-003"},
            {"status": "payment_complete", "at": "2024-01-15T16:00:00Z", "by": "user-004"},
            {"status": "job_done", "at": "2024-01-15T16:00:00Z", "by": "user-004"}
        ],
        "ai_engaged": False,
        "ai_takeover_requested": False,
        "appointment_date": "2024-01-07T09:00:00Z",
        "appointment_type": "on_site",
        "created_at": "2024-01-05T10:00:00Z",
        "updated_at": "2024-01-15T16:00:00Z"
    }
]

# ============ QUOTES ============

DEMO_QUOTES = [
    {
        "id": "quote-001",
        "lead_id": "lead-003",
        "account_id": "acc-001",
        "created_by_user_id": "user-002",
        "approved_by_user_id": "user-004",
        "quote_number": "QT-2024-0001",
        "status": "sent",
        "line_items": [
            {"description": "Roof Inspection & Assessment", "quantity": 1, "unit_price": 150, "total": 150},
            {"description": "Pipe Boot Replacement", "quantity": 2, "unit_price": 75, "total": 150},
            {"description": "Labor - 2 hrs @ $65/hr", "quantity": 2, "unit_price": 65, "total": 130},
            {"description": " sealant", "quantity": 1, "unit_price": 45, "total": 45}
        ],
        "subtotal": 475.00,
        "tax_rate": 8.0,
        "tax_amount": 38.00,
        "total_amount": 513.00,
        "pricing_mode": "manual",
        "ai_suggested_price": 525.00,
        "photos": [
            {"url": "/photos/ceiling-stain-1.jpg", "caption": "Water stain on ceiling"},
            {"url": "/photos/roof-top-1.jpg", "caption": "Area of concern"}
        ],
        "internal_notes": "Customer mentioned insurance may cover. Do not mention this in quote.",
        "customer_notes": "Please complete work within 2 weeks if approved.",
        "signature_url": None,
        "signed_at": None,
        "change_orders": [],
        "submitted_at": "2024-01-12T14:00:00Z",
        "approved_at": "2024-01-12T14:15:00Z",
        "rejected_reason": None,
        "sent_at": "2024-01-12T14:30:00Z",
        "created_at": "2024-01-12T13:00:00Z",
        "updated_at": "2024-01-12T14:30:00Z"
    },
    {
        "id": "quote-002",
        "lead_id": "lead-004",
        "account_id": "acc-001",
        "created_by_user_id": "user-002",
        "approved_by_user_id": "user-001",
        "quote_number": "QT-2024-0002",
        "status": "paid",
        "line_items": [
            {"description": "Storm Damage Assessment", "quantity": 1, "unit_price": 200, "total": 200},
            {"description": " Architectural Shingles - 30 squares", "quantity": 30, "unit_price": 95, "total": 2850},
            {"description": "Felt Underlayment", "quantity": 30, "unit_price": 15, "total": 450},
            {"description": "Roofing Labor - 2 days", "quantity": 16, "unit_price": 65, "total": 1040},
            {"description": "Gutters - 120 linear ft", "quantity": 120, "unit_price": 8, "total": 960},
            {"description": "Dumpster & Debris Removal", "quantity": 1, "unit_price": 650, "total": 650},
            {"description": " permits & Inspection", "quantity": 1, "unit_price": 350, "total": 350}
        ],
        "subtotal": 6500.00,
        "tax_rate": 8.0,
        "tax_amount": 520.00,
        "total_amount": 7020.00,
        "pricing_mode": "ai_assisted",
        "ai_suggested_price": 7100.00,
        "photos": [
            {"url": "/photos/storm-damage-1.jpg", "caption": "Missing shingles - front"},
            {"url": "/photos/storm-damage-2.jpg", "caption": "Storm debris"},
            {"url": "/photos/storm-damage-3.jpg", "caption": "Side view damage"}
        ],
        "internal_notes": "Insurance claim approved for $8,200. Customer responsible for $7,020. Deductible $1,180.",
        "customer_notes": "Work to begin Jan 18 weather permitting.",
        "signature_url": "/signatures/signed-quote-002.pdf",
        "signed_at": "2024-01-11T10:30:00Z",
        "change_orders": [],
        "submitted_at": "2024-01-09T12:00:00Z",
        "approved_at": "2024-01-09T13:00:00Z",
        "rejected_reason": None,
        "sent_at": "2024-01-09T14:00:00Z",
        "created_at": "2024-01-09T11:00:00Z",
        "updated_at": "2024-01-15T16:00:00Z"
    },
    {
        "id": "quote-003",
        "lead_id": "lead-005",
        "account_id": "acc-001",
        "created_by_user_id": "user-003",
        "approved_by_user_id": "user-004",
        "quote_number": "QT-2024-0003",
        "status": "paid",
        "line_items": [
            {"description": "Full Roof Inspection Report", "quantity": 1, "unit_price": 350, "total": 350},
            {"description": "Detailed Photo Documentation", "quantity": 1, "unit_price": 150, "total": 150},
            {"description": "Gutter Inspection", "quantity": 1, "unit_price": 75, "total": 75}
        ],
        "subtotal": 575.00,
        "tax_rate": 8.0,
        "tax_amount": 46.00,
        "total_amount": 621.00,
        "pricing_mode": "manual",
        "ai_suggested_price": None,
        "photos": [
            {"url": "/photos/inspection-1.jpg", "caption": "Overall roof condition"},
            {"url": "/photos/inspection-2.jpg", "caption": "Gutter system"}
        ],
        "internal_notes": "Inspection only - no repair work. Customer getting home inspection contingency.",
        "customer_notes": "Need report by Jan 20 for home purchase closing.",
        "signature_url": "/signatures/signed-quote-003.pdf",
        "signed_at": "2024-01-08T09:30:00Z",
        "change_orders": [],
        "submitted_at": "2024-01-07T11:00:00Z",
        "approved_at": "2024-01-07T11:30:00Z",
        "rejected_reason": None,
        "sent_at": "2024-01-07T12:00:00Z",
        "created_at": "2024-01-07T10:00:00Z",
        "updated_at": "2024-01-15T16:00:00Z"
    },
    {
        "id": "quote-004",
        "lead_id": "lead-002",
        "account_id": "acc-001",
        "created_by_user_id": "user-002",
        "approved_by_user_id": None,
        "quote_number": "QT-2024-0004",
        "status": "pending_approval",
        "line_items": [
            {"description": "Full Roof Replacement - Architectural Shingles", "quantity": 35, "unit_price": 95, "total": 3325},
            {"description": "Complete Tear-Off & Disposal", "quantity": 1, "unit_price": 1800, "total": 1800},
            {"description": "Felt Underlayment & Ice Shield", "quantity": 35, "unit_price": 18, "total": 630},
            {"description": "Roofing Labor - 2 days", "quantity": 16, "unit_price": 65, "total": 1040},
            {"description": "New Flashing & Pipe Boots", "quantity": 1, "unit_price": 450, "total": 450},
            {"description": "Gutters - 140 linear ft", "quantity": 140, "unit_price": 8, "total": 1120},
            {"description": "Permits & Inspections", "quantity": 1, "unit_price": 425, "total": 425},
            {"description": "Dumpster", "quantity": 1, "unit_price": 750, "total": 750}
        ],
        "subtotal": 8540.00,
        "tax_rate": 8.0,
        "tax_amount": 683.20,
        "total_amount": 9223.20,
        "pricing_mode": "ai_assisted",
        "ai_suggested_price": 9100.00,
        "photos": [
            {"url": "/photos/cormier-roof-1.jpg", "caption": "Existing roof condition"},
            {"url": "/photos/cormier-roof-2.jpg", "caption": "Side elevation"}
        ],
        "internal_notes": "Large job. May need additional labor. Awaiting approval.",
        "customer_notes": "Wanting to start by end of January if possible.",
        "signature_url": None,
        "signed_at": None,
        "change_orders": [],
        "submitted_at": "2024-01-15T16:00:00Z",
        "approved_at": None,
        "rejected_reason": None,
        "sent_at": None,
        "created_at": "2024-01-15T15:00:00Z",
        "updated_at": "2024-01-15T16:00:00Z"
    }
]

# ============ ANALYTICS ============

DEMO_REVENUE_SUMMARY = {
    "period_start": "2024-01-01T00:00:00Z",
    "period_end": "2024-01-31T23:59:59Z",
    "total_revenue": 7641.00,
    "total_jobs": 3,
    "by_user": [
        {
            "user_id": "user-002",
            "user_name": "Jim Butler",
            "total_revenue": 7520.00,
            "jobs_count": 2,
            "avg_quote": 3760.00
        },
        {
            "user_id": "user-003",
            "user_name": "Bob Landry",
            "total_revenue": 621.00,
            "jobs_count": 1,
            "avg_quote": 621.00
        }
    ],
    "by_status": [
        {"status": "paid", "count": 2, "amount": 7641.00},
        {"status": "sent", "count": 1, "amount": 513.00},
        {"status": "pending_approval", "count": 1, "amount": 9223.20}
    ],
    "leads_by_source": [
        {"source": "google_search", "count": 1},
        {"source": "referral", "count": 1},
        {"source": "facebook", "count": 1},
        {"source": "google_ads", "count": 1},
        {"source": "yelp", "count": 1}
    ]
}

# ============ SERVICES / TEMPLATES ============

DEMO_SERVICE_TEMPLATES = [
    {
        "id": "svc-001",
        "name": "Roofing - Repair",
        "description": "Minor repairs, leak fixes, shingle replacement",
        "typical_price_range": "$150 - $800",
        "base_labor_rate": 65,
        "common_materials": ["Shingles", "Underlayment", "Sealant", "Pipe Boots"]
    },
    {
        "id": "svc-002",
        "name": "Roofing - Replacement",
        "description": "Complete tear-off and re-roof",
        "typical_price_range": "$6,000 - $15,000",
        "base_labor_rate": 65,
        "common_materials": ["Shingles", "Underlayment", "Flashing", "Gutters", "Dumpster"]
    },
    {
        "id": "svc-003",
        "name": "Roofing - Inspection",
        "description": "Detailed inspection with documentation",
        "typical_price_range": "$250 - $500",
        "base_labor_rate": 65,
        "common_materials": []
    },
    {
        "id": "svc-004",
        "name": "Gutters - Installation",
        "description": "New gutter system installation",
        "typical_price_range": "$800 - $2,500",
        "base_labor_rate": 55,
        "common_materials": ["Gutters", "Downspouts", "Mounting hardware"]
    }
]

# ============ HELPERS ============

def get_account():
    return DEMO_ACCOUNT

def get_users():
    return DEMO_USERS

def get_leads(status=None):
    if status:
        return [l for l in DEMO_LEADS if l["status"] == status]
    return DEMO_LEADS

def get_lead_by_id(lead_id):
    for lead in DEMO_LEADS:
        if lead["id"] == lead_id:
            return lead
    return None

def get_quotes(status=None):
    if status:
        return [q for q in DEMO_QUOTES if q["status"] == status]
    return DEMO_QUOTES

def get_quote_by_id(quote_id):
    for quote in DEMO_QUOTES:
        if quote["id"] == quote_id:
            return quote
    return None

def get_user_by_id(user_id):
    for user in DEMO_USERS:
        if user["id"] == user_id:
            return user
    return None

def get_revenue_summary():
    return DEMO_REVENUE_SUMMARY

def get_service_templates():
    return DEMO_SERVICE_TEMPLATES
