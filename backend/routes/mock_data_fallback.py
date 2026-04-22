"""
Mock data fallback for when Supabase is not configured
Used during development and when DATABASE_URL is not set
"""

MOCK_LEADS = [
    {
        "id": "00000000-0000-0000-0000-000000000101",
        "customer_name": "Jennifer Mouton",
        "customer_email": "jennifer.mouton@email.com",
        "customer_phone": "(337) 555-0147",
        "service": "Roofing - Shingle Replacement",
        "status": "new_lead",
        "source": "Website Form",
        "assigned_to": "Marcus Thompson",
        "created_at": "2 hours ago",
        "notes": "Homeowner in Broussard. Insurance claim approved.",
        "priority": "high"
    },
    {
        "id": "00000000-0000-0000-0000-000000000102",
        "customer_name": "Robert Cormier",
        "customer_email": "rcormier@bayoucowboy.net",
        "customer_phone": "(337) 555-0198",
        "service": "Roofing - Full Replacement",
        "status": "appointment_set",
        "source": "Google Ads",
        "assigned_to": "Jim Butler",
        "created_at": "5 hours ago",
        "notes": "Commercial property. 12,000 sq ft metal roof.",
        "priority": "high"
    },
    {
        "id": "00000000-0000-0000-0000-000000000103",
        "customer_name": "Sarah Hebert",
        "customer_email": "shebert@gmail.com",
        "customer_phone": "(337) 555-0234",
        "service": "Roofing - Repair",
        "status": "quote_sent",
        "source": "Facebook",
        "assigned_to": "Marcus Thompson",
        "created_at": "1 day ago",
        "notes": "Minor repair needed. Leak in garage.",
        "priority": "medium"
    },
    {
        "id": "00000000-0000-0000-0000-000000000104",
        "customer_name": "Michael Vincent",
        "customer_email": "mvincent@la-law.com",
        "customer_phone": "(337) 555-0267",
        "service": "Roofing - Inspection",
        "status": "followup_call",
        "source": "Referral",
        "assigned_to": "Jim Butler",
        "created_at": "2 days ago",
        "notes": "Annual inspection. Property management company.",
        "priority": "low"
    },
    {
        "id": "00000000-0000-0000-0000-000000000105",
        "customer_name": "Lisa Trahan",
        "customer_email": "lisa.t@outlook.com",
        "customer_phone": "(337) 555-0312",
        "service": "Roofing - Metal Roof",
        "status": "deposit_received",
        "source": "Website Form",
        "assigned_to": "Marcus Thompson",
        "created_at": "3 days ago",
        "notes": "Deposit received. Job scheduled.",
        "priority": "high"
    },
    {
        "id": "00000000-0000-0000-0000-000000000106",
        "customer_name": "David Babineaux",
        "customer_email": "dbabineaux@gmail.com",
        "customer_phone": "(337) 555-0423",
        "service": "Roofing - Gutter Install",
        "status": "job_done",
        "source": "Nextdoor",
        "assigned_to": "Jim Butler",
        "created_at": "1 week ago",
        "notes": "Completed. 5-star review.",
        "priority": "low"
    }
]

MOCK_QUOTES = [
    {
        "id": "QT-001",
        "customer_name": "Jennifer Mouton",
        "customer_email": "jennifer.mouton@email.com",
        "customer_phone": "(337) 555-0147",
        "service": "Roofing - Shingle Replacement",
        "status": "approved",
        "line_items": [
            {"name": "Remove old shingles", "quantity": 1, "unit_price": 1200, "total": 1200},
            {"name": "Install 30 squares of shingles", "quantity": 30, "unit_price": 85, "total": 2550},
            {"name": "New flashing", "quantity": 1, "unit_price": 350, "total": 350},
        ],
        "total_amount": 4100,
        "ai_suggested_price": 4200,
        "pricing_mode": "ai_assisted",
        "created_at": "1 day ago"
    },
    {
        "id": "QT-002",
        "customer_name": "Robert Cormier",
        "customer_email": "rcormier@bayoucowboy.net",
        "customer_phone": "(337) 555-0198",
        "service": "Roofing - Full Replacement",
        "status": "pending_approval",
        "line_items": [
            {"name": "Full roof replacement - metal", "quantity": 120, "unit_price": 12, "total": 14400},
            {"name": "Tear off old roof", "quantity": 1, "unit_price": 3500, "total": 3500},
            {"name": "Chimney flashing", "quantity": 1, "unit_price": 600, "total": 600},
        ],
        "total_amount": 18500,
        "ai_suggested_price": 18200,
        "pricing_mode": "manual",
        "created_at": "5 hours ago"
    },
    {
        "id": "QT-003",
        "customer_name": "Sarah Hebert",
        "customer_email": "shebert@gmail.com",
        "customer_phone": "(337) 555-0234",
        "service": "Roofing - Repair",
        "status": "sent",
        "line_items": [
            {"name": "Repair leak - tar and patch", "quantity": 1, "unit_price": 350, "total": 350},
            {"name": "Replace damaged shingles", "quantity": 8, "unit_price": 45, "total": 360},
        ],
        "total_amount": 710,
        "ai_suggested_price": 695,
        "pricing_mode": "ai_assisted",
        "created_at": "1 day ago"
    }
]

def get_mock_leads(status=None):
    if status:
        return [l for l in MOCK_LEADS if l["status"] == status]
    return MOCK_LEADS

def get_mock_lead(lead_id):
    for l in MOCK_LEADS:
        if l["id"] == lead_id:
            return l
    return None

def create_mock_lead(data):
    return {
        "id": f"lead-{len(MOCK_LEADS) + 1:03d}",
        **data,
        "status": "new_lead",
        "created_at": "Just now"
    }

def get_mock_quotes(status=None):
    if status:
        return [q for q in MOCK_QUOTES if q["status"] == status]
    return MOCK_QUOTES

def get_mock_quote(quote_id):
    for q in MOCK_QUOTES:
        if q["id"] == quote_id:
            return q
    return None

def create_mock_quote(data):
    return {
        "id": f"QT-{len(MOCK_QUOTES) + 1:03d}",
        **data,
        "status": "draft",
        "created_at": "Just now"
    }