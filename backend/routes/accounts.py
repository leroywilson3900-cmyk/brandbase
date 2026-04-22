"""
Account Routes — BrandBase Phase 1
Handles: Account CRUD, user management
"""

from fastapi import APIRouter, HTTPException, Depends, status
from datetime import datetime
from uuid import UUID
from typing import Optional

from schemas import (
    AccountCreate, AccountUpdate, AccountResponse,
    UserInviteRequest, UserInviteResponse, UserResponse
)
from routes.auth import get_current_user

router = APIRouter()


def get_current_account_id(current_user: dict = Depends(get_current_user)) -> UUID:
    """Extract account_id from current user session."""
    # TODO: Fetch user from DB, get account_id
    return UUID(current_user.get("account_id", "00000000-0000-0000-0000-000000000001"))


@router.post("/", response_model=AccountResponse)
async def create_account(account: AccountCreate, current_user: dict = Depends(get_current_user)):
    """
    Create a new master account.
    Called automatically on signup — usually not called directly.
    """
    # TODO: Implement with Supabase
    # 1. Insert into accounts table
    # 2. Update user record with account_id
    
    return {
        "id": "mock-account-id",
        "business_name": account.business_name,
        "owner_id": current_user["id"],
        "plan": "pro",
        "created_at": datetime.utcnow()
    }


@router.get("/{account_id}", response_model=AccountResponse)
async def get_account(account_id: UUID, current_user: dict = Depends(get_current_user)):
    """Get account details."""
    # TODO: Check authorization
    
    return {
        "id": str(account_id),
        "business_name": "Demo Business",
        "owner_id": str(current_user["id"]),
        "plan": "pro",
        "created_at": datetime.utcnow()
    }


@router.put("/{account_id}", response_model=AccountResponse)
async def update_account(
    account_id: UUID,
    account: AccountUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update account details."""
    # TODO: Check authorization (only owner can update)
    
    return {
        "id": str(account_id),
        "business_name": account.business_name or "Demo Business",
        "owner_id": str(current_user["id"]),
        "plan": "pro",
        "created_at": datetime.utcnow()
    }


@router.get("/{account_id}/users", response_model=list[UserResponse])
async def list_account_users(account_id: UUID, current_user: dict = Depends(get_current_user)):
    """List all users under this account."""
    # TODO: Query users table where account_id = account_id
    
    return [
        {
            "id": "user-1",
            "email": "owner@demo.com",
            "name": "Owner User",
            "account_id": str(account_id),
            "role": "owner",
            "is_active": True,
            "created_at": datetime.utcnow()
        }
    ]


@router.post("/{account_id}/users", response_model=UserInviteResponse)
async def invite_user(
    account_id: UUID,
    invite: UserInviteRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Invite a new user to the account.
    Sends invitation email.
    """
    # TODO: 
    # 1. Check if current user is owner/admin
    # 2. Create user record with temporary password
    # 3. Send invitation email
    
    return {
        "user_id": "new-user-uuid",
        "email": invite.email,
        "status": "invited",
        "message": f"Invitation sent to {invite.email}"
    }


@router.delete("/{account_id}/users/{user_id}")
async def remove_user(
    account_id: UUID,
    user_id: UUID,
    current_user: dict = Depends(get_current_user)
):
    """
    Remove a user from account.
    Only owner can remove users.
    """
    # TODO: Check authorization
    
    return {"message": f"User {user_id} removed from account"}


@router.get("/{account_id}/analytics/revenue")
async def get_revenue_analytics(
    account_id: UUID,
    period_start: Optional[str] = None,
    period_end: Optional[str] = None,
    current_user: dict = Depends(get_current_user)
):
    """
    Get revenue breakdown by user.
    Shows: Jim $2400 (3 jobs), Bob $1800 (2 jobs), etc.
    """
    # TODO: Query quotes joined with users, sum by created_by_user_id
    
    return {
        "period_start": period_start or "2024-01-01",
        "period_end": period_end or datetime.utcnow().isoformat(),
        "total_revenue": 5150.00,
        "total_jobs": 6,
        "by_user": [
            {"user_id": "jim-1", "user_name": "Jim", "total_revenue": 2400.00, "jobs_count": 3},
            {"user_id": "bob-2", "user_name": "Bob", "total_revenue": 1800.00, "jobs_count": 2},
            {"user_id": "sally-3", "user_name": "Sally", "total_revenue": 950.00, "jobs_count": 1},
        ]
    }
