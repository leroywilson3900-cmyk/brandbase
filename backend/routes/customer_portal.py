"""
Customer Portal Routes — BrandBase Phase 3
Customer-facing app, job progress tracker, maintenance contracts, reviews
"""

from fastapi import APIRouter, HTTPException, Depends, Query
from datetime import datetime
from uuid import UUID
from typing import Optional

from routes.auth import get_current_user
from services.phase3_services import (
    customer_portal, maintenance_contracts, reviews,
    CustomerPortalService, MaintenanceContractService, ReviewService
)
from mock_data import get_account

router = APIRouter()


# ============ CUSTOMER PORTAL ============

@router.get("/customer/{customer_id}/dashboard")
async def get_customer_dashboard(customer_id: str):
    """
    Get customer dashboard.
    Read-only view of all their jobs and appointments.
    """
    dashboard = customer_portal.get_customer_dashboard(customer_id)
    return dashboard


@router.get("/customer/{customer_id}/jobs")
async def get_customer_jobs(customer_id: str):
    """Get all jobs for a customer."""
    # TODO: Query jobs by customer email/phone
    return {
        "customer_id": customer_id,
        "jobs": []
    }


@router.get("/jobs/{job_id}/progress")
async def get_job_progress(job_id: str):
    """
    Get detailed job progress with timeline.
    Shows all steps from quote to completion.
    """
    progress = customer_portal.get_job_progress(job_id)
    return progress


@router.post("/jobs/{job_id}/feedback")
async def submit_job_feedback(job_id: str, rating: int = Query(..., ge=1, le=5), feedback: str = ""):
    """
    Submit customer feedback for a completed job.
    Rating must be 1-5.
    """
    try:
        result = customer_portal.submit_customer_feedback(job_id, rating, feedback)
        return {
            "message": "Thank you for your feedback!",
            "details": result
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# ============ MAINTENANCE CONTRACTS ============

@router.get("/contracts/templates")
async def get_contract_templates():
    """
    Get available maintenance contract templates.
    Shows plans, pricing, and services included.
    """
    templates = maintenance_contracts.get_contract_templates()
    return {
        "templates": templates
    }


@router.post("/contracts")
async def create_contract(
    customer_id: str,
    template_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new maintenance contract.
    Sets up recurring billing.
    """
    account = get_account()
    
    try:
        contract = maintenance_contracts.create_contract({
            "customer_id": customer_id,
            "account_id": account["id"],
            "template_id": template_id
        })
        
        return {
            "message": "Contract created successfully",
            "contract": contract
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/contracts/customer/{customer_id}")
async def get_customer_contracts(customer_id: str):
    """Get all maintenance contracts for a customer."""
    contracts = maintenance_contracts.get_customer_contracts(customer_id)
    return {
        "customer_id": customer_id,
        "contracts": contracts
    }


@router.get("/contracts/expiring")
async def get_expiring_contracts(
    days: int = Query(30, ge=1, le=90),
    current_user: dict = Depends(get_current_user)
):
    """
    Get contracts expiring within specified days.
    Used to send renewal reminders.
    """
    expiring = maintenance_contracts.check_expiring_contracts(days)
    return {
        "total": len(expiring),
        "contracts": expiring
    }


@router.post("/contracts/{contract_id}/renew")
async def renew_contract(contract_id: str, current_user: dict = Depends(get_current_user)):
    """
    Renew an existing maintenance contract.
    Processes payment, updates renewal date.
    """
    result = maintenance_contracts.renew_contract(contract_id)
    return {
        "message": "Contract renewed successfully",
        "details": result
    }


# ============ REVIEW MANAGEMENT ============

@router.post("/reviews/request")
async def send_review_request(
    job_id: str,
    customer_email: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Send review request to customer after job completion.
    Includes links to Google, Yelp, Facebook reviews.
    """
    request = reviews.generate_review_request(job_id, customer_email)
    return {
        "message": "Review request sent",
        "details": request
    }


@router.get("/reviews/requests")
async def get_review_requests(current_user: dict = Depends(get_current_user)):
    """Get all review requests for account."""
    account = get_account()
    requests = reviews.get_review_requests(account["id"])
    return {
        "requests": requests
    }


@router.post("/reviews/record")
async def record_review(
    job_id: str,
    platform: str,
    review_url: str,
    rating: Optional[int] = None,
    current_user: dict = Depends(get_current_user)
):
    """
    Record when a customer leaves a review.
    Tracks rating and link for testimonial use.
    """
    result = reviews.record_review_received(job_id, platform, review_url, rating)
    return {
        "message": "Review recorded",
        "details": result
    }


# ============ CUSTOMER AUTH (Simplified) ============

@router.post("/customer/verify")
async def verify_customer(customer_email: str):
    """
    Verify customer identity for portal access.
    Sends magic link to email.
    """
    # TODO: Send magic link via email
    
    return {
        "message": f"Verification link sent to {customer_email}",
        "status": "sent"
    }


@router.get("/customer/token/{token}")
async def validate_customer_token(token: str):
    """
    Validate magic link token.
    Returns customer_id and access token.
    """
    # TODO: Validate token, return customer data
    
    return {
        "valid": True,
        "customer_id": "customer-001",
        "access_token": f"ct_{uuid4().hex[:24]}"
    }
