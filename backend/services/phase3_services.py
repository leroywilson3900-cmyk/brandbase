"""
BrandBase Phase 3 — Customer Portal & Maintenance Contracts
Customer-facing app, job progress tracker, recurring revenue
"""

from datetime import datetime, timedelta
from uuid import uuid4
from typing import Optional, List, Dict

# ============ CUSTOMER PORTAL ============

class CustomerPortalService:
    """
    Customer-facing portal for job progress tracking.
    Read-only access for clients to view their job status.
    """
    
    def get_customer_dashboard(self, customer_id: str) -> dict:
        """
        Get dashboard for customer.
        Shows all their jobs, statuses, and next steps.
        """
        # TODO: Query by customer email/phone
        return {
            "customer_id": customer_id,
            "name": "Jennifer Mouton",
            "email": "jennifer.mouton@gmail.com",
            "jobs": [
                {
                    "job_id": "job-001",
                    "service_type": "Roofing - Shingle Replacement",
                    "address": "456 Oak Lane, Baton Rouge",
                    "status": "in_progress",
                    "status_display": "Work In Progress",
                    "progress_percent": 35,
                    "next_step": "Materials arriving tomorrow",
                    "scheduled_date": "2024-01-18T08:00:00Z",
                    "quote_amount": 9223.20,
                    "amount_paid": 1846.64,
                    "amount_due": 7376.56
                }
            ],
            "upcoming_appointments": [
                {
                    "date": "2024-01-18T08:00:00Z",
                    "type": "on_site",
                    "description": "Work begins - Roof replacement",
                    "team_member": "Jim Butler"
                }
            ],
            "recent_messages": [
                {
                    "from": "April (Bayou Roofing)",
                    "message": "Materials are scheduled to arrive tomorrow morning. Crew will start at 8 AM.",
                    "sent_at": "2024-01-15T14:00:00Z"
                }
            ]
        }
    
    def get_job_progress(self, job_id: str) -> dict:
        """
        Get detailed progress for a specific job.
        Timeline with updates at each step.
        """
        # TODO: Query actual job data
        return {
            "job_id": job_id,
            "service_type": "Roofing - Full Replacement",
            "address": "456 Oak Lane, Baton Rouge, LA 70802",
            "status": "in_progress",
            "progress_percent": 35,
            "timeline": [
                {
                    "step": "quote_sent",
                    "label": "Quote Sent",
                    "completed_at": "2024-01-09T14:00:00Z",
                    "details": "Quote #QT-2024-0002 sent for $9,223.20"
                },
                {
                    "step": "quote_accepted",
                    "label": "Quote Accepted",
                    "completed_at": "2024-01-11T10:30:00Z",
                    "details": "Signed digitally via DocuSign"
                },
                {
                    "step": "deposit_paid",
                    "label": "Deposit Received",
                    "completed_at": "2024-01-11T10:30:00Z",
                    "details": "$1,846.64 deposit paid (20%)"
                },
                {
                    "step": "materials_ordered",
                    "label": "Materials Ordered",
                    "completed_at": "2024-01-12T09:00:00Z",
                    "details": "Shingles and supplies ordered"
                },
                {
                    "step": "in_progress",
                    "label": "Work In Progress",
                    "completed_at": "2024-01-16T08:00:00Z",
                    "details": "Work begins January 18th"
                },
                {
                    "step": "job_complete",
                    "label": "Job Complete",
                    "completed_at": None,
                    "details": "Estimated completion: January 20th"
                }
            ],
            "current_update": {
                "message": "Materials arriving tomorrow morning. Crew will start at 8 AM. Please ensure access to the property.",
                "updated_at": "2024-01-15T14:00:00Z",
                "updated_by": "April (Office)"
            },
            "team_contacts": [
                {"name": "Jim Butler", "role": "Field Supervisor", "phone": "(225) 555-0102"},
                {"name": "April Guidry", "role": "Office Coordinator", "phone": "(225) 555-0104"}
            ]
        }
    
    def submit_customer_feedback(self, job_id: str, rating: int, feedback: str) -> dict:
        """
        Submit customer feedback after job completion.
        """
        if rating < 1 or rating > 5:
            raise ValueError("Rating must be 1-5")
        
        return {
            "feedback_id": str(uuid4()),
            "job_id": job_id,
            "rating": rating,
            "feedback": feedback,
            "submitted_at": datetime.utcnow().isoformat(),
            "status": "submitted"
        }


# ============ MAINTENANCE CONTRACTS ============

class MaintenanceContractService:
    """
    Handles recurring maintenance contracts.
    Annual plans, auto-renewal, reminders.
    """
    
    CONTRACT_TEMPLATES = {
        "hvac_annual": {
            "name": "Annual HVAC Maintenance Plan",
            "description": "Two annual inspections, filter replacements, priority service",
            "price": 299.00,
            "frequency": "annual",
            "services": [
                "Spring AC check-up",
                "Fall heating check-up",
                "Quarterly filter replacements",
                "Priority scheduling",
                "10% discount on repairs"
            ]
        },
        "roofing_annual": {
            "name": "Annual Roof Maintenance Plan",
            "description": "Annual inspection, gutter cleaning, minor repairs",
            "price": 199.00,
            "frequency": "annual",
            "services": [
                "Annual roof inspection",
                "Gutter cleaning",
                "Minor leak repairs (up to $100 value)",
                "Priority emergency service"
            ]
        },
        "plumbing_annual": {
            "name": "Annual Plumbing Maintenance",
            "description": "Drain cleaning, water heater check, leak inspection",
            "price": 249.00,
            "frequency": "annual",
            "services": [
                "Semi-annual drain cleaning",
                "Water heater flush",
                "Leak inspection",
                "Fixture check",
                "10% off any repairs"
            ]
        }
    }
    
    def get_contract_templates(self) -> List[dict]:
        """Get available maintenance contract templates."""
        return list(self.CONTRACT_TEMPLATES.values())
    
    def create_contract(self, contract_data: dict) -> dict:
        """
        Create a new maintenance contract.
        Sets up recurring billing via Stripe.
        """
        template_id = contract_data.get("template_id")
        if not template_id or template_id not in self.CONTRACT_TEMPLATES:
            raise ValueError("Invalid contract template")
        
        template = self.CONTRACT_TEMPLATES[template_id]
        renewal_date = datetime.utcnow() + timedelta(days=365)
        
        return {
            "contract_id": str(uuid4()),
            "customer_id": contract_data["customer_id"],
            "account_id": contract_data["account_id"],
            "plan_name": template["name"],
            "description": template["description"],
            "annual_price": template["price"],
            "services": template["services"],
            "renewal_date": renewal_date.isoformat(),
            "status": "active",
            "stripe_subscription_id": f"sub_{uuid4().hex[:16]}",
            "created_at": datetime.utcnow().isoformat()
        }
    
    def get_customer_contracts(self, customer_id: str) -> List[dict]:
        """Get all contracts for a customer."""
        # TODO: Query contracts table
        return [
            {
                "contract_id": "mc-001",
                "customer_id": customer_id,
                "plan_name": "Annual HVAC Maintenance Plan",
                "annual_price": 299.00,
                "renewal_date": "2025-01-15T00:00:00Z",
                "status": "active",
                "last_service": "2024-01-10T10:00:00Z",
                "next_service": "2024-07-10T10:00:00Z"
            }
        ]
    
    def check_expiring_contracts(self, days_until_expiry: int = 30) -> List[dict]:
        """
        Find contracts expiring within the specified days.
        Triggers renewal reminders.
        """
        # TODO: Query contracts where renewal_date is within days_until_expiry
        return [
            {
                "contract_id": "mc-001",
                "customer_name": "Jennifer Mouton",
                "customer_email": "jennifer.mouton@gmail.com",
                "plan_name": "Annual HVAC Maintenance Plan",
                "renewal_date": "2024-02-15T00:00:00Z",
                "days_until_expiry": 30,
                "reminder_sent": False
            }
        ]
    
    def renew_contract(self, contract_id: str) -> dict:
        """
        Renew an existing contract.
        Processes payment, updates renewal date.
        """
        # TODO: Process Stripe subscription renewal
        new_renewal = datetime.utcnow() + timedelta(days=365)
        
        return {
            "contract_id": contract_id,
            "new_renewal_date": new_renewal.isoformat(),
            "status": "active",
            "renewed_at": datetime.utcnow().isoformat()
        }


# ============ REVIEW MANAGEMENT ============

class ReviewService:
    """
    Handles review requests and management.
    Google reviews, testimonials, reputation management.
    """
    
    REVIEW_PLATFORMS = [
        {"name": "Google", "url": "https://g.page/review"},
        {"name": "Yelp", "url": "https://yelp.com/writeareview"},
        {"name": "Facebook", "url": "https://facebook.com/reviews"}
    ]
    
    def generate_review_request(self, job_id: str, customer_email: str) -> dict:
        """
        Generate review request for completed job.
        Returns email content and review links.
        """
        # TODO: Send via email
        
        return {
            "request_id": str(uuid4()),
            "job_id": job_id,
            "email_subject": "How did we do? - Review your experience",
            "email_body": (
                "Hi {customer_name},\n\n"
                "Thank you for choosing Bayou Roofing & Construction!\n\n"
                "We'd love to hear about your experience. "
                "Would you take a moment to leave us a review?\n\n"
                "Leave a Google Review: {google_review_link}\n"
                "Leave a Yelp Review: {yelp_review_link}\n\n"
                "Your feedback helps us grow and helps other homeowners find quality service.\n\n"
                "Thank you!\n"
                "Bayou Roofing Team"
            ),
            "review_links": self.REVIEW_PLATFORMS,
            "scheduled_for": datetime.utcnow().isoformat(),
            "status": "pending"
        }
    
    def get_review_requests(self, account_id: str) -> List[dict]:
        """Get all review requests for an account."""
        # TODO: Query review_requests table
        return [
            {
                "request_id": "rr-001",
                "job_id": "job-001",
                "customer_name": "Robert Cormier",
                "sent_at": "2024-01-16T10:00:00Z",
                "status": "sent",
                "platform_completed": None
            }
        ]
    
    def record_review_received(self, job_id: str, platform: str, review_url: str, rating: Optional[int] = None) -> dict:
        """Record when a customer leaves a review."""
        return {
            "record_id": str(uuid4()),
            "job_id": job_id,
            "platform": platform,
            "review_url": review_url,
            "rating": rating,
            "recorded_at": datetime.utcnow().isoformat()
        }


# ============ SERVICE INSTANCES ============

customer_portal = CustomerPortalService()
maintenance_contracts = MaintenanceContractService()
reviews = ReviewService()
