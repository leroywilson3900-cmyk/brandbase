"""
Social Media Routes — BrandBase Phase 1 (Simplified)
Handles: Templates, scheduled posts
"""

from fastapi import APIRouter, HTTPException, Depends, status
from datetime import datetime
from uuid import UUID
from typing import Optional

from schemas import (
    TemplateCreate, TemplateResponse,
    ScheduledPostCreate, ScheduledPostResponse
)
from routes.auth import get_current_user

router = APIRouter()


# ============ TEMPLATES ============

@router.post("/templates", response_model=TemplateResponse, status_code=status.HTTP_201_CREATED)
async def create_template(
    template: TemplateCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Create a social media posting template.
    Templates define the structure for AI-generated monthly schedules.
    """
    # TODO: Insert into social_templates
    
    return {
        "id": "mock-template-id",
        "account_id": current_user.get("account_id", "00000000-0000-0000-0000-000000000001"),
        "name": template.name,
        "description": template.description or "",
        "industry": template.industry or "",
        "template_content": template.template_content,
        "is_active": True,
        "created_at": datetime.utcnow()
    }


@router.get("/templates", response_model=list[TemplateResponse])
async def list_templates(
    account_id: UUID,
    current_user: dict = Depends(get_current_user)
):
    """List available templates for account."""
    # TODO: Query social_templates
    
    return [
        {
            "id": "tpl-1",
            "account_id": str(account_id),
            "name": "Educational",
            "description": "How-to tips, industry facts",
            "industry": "general",
            "template_content": [
                {"day": 1, "platform": "instagram", "type": "educational"},
                {"day": 4, "platform": "facebook", "type": "tip"},
            ],
            "is_active": True,
            "created_at": datetime.utcnow()
        }
    ]


@router.post("/templates/generate-schedule")
async def generate_schedule(
    account_id: UUID,
    template_id: UUID,
    month: str,  # YYYY-MM
    current_user: dict = Depends(get_current_user)
):
    """
    Generate 30 days of posts from a template.
    AI creates content for each day, user approves before scheduling.
    """
    # TODO: 
    # 1. Fetch template
    # 2. Generate content using AI (MiniMax)
    # 3. Create scheduled posts in draft status
    
    return {
        "message": f"Schedule generated for {month}",
        "posts_generated": 30,
        "posts_in_draft": 30,
        "action_required": "Review and approve posts before they go live"
    }


# ============ SCHEDULED POSTS ============

@router.post("/posts", response_model=ScheduledPostResponse, status_code=status.HTTP_201_CREATED)
async def create_scheduled_post(
    post: ScheduledPostCreate,
    current_user: dict = Depends(get_current_user)
):
    """Manually schedule a social media post."""
    # TODO: Insert into scheduled_posts
    
    return {
        "id": "mock-post-id",
        "account_id": current_user.get("account_id", "00000000-0000-0000-0000-000000000001"),
        "platform": post.platform,
        "content": post.content,
        "media_urls": post.media_urls or [],
        "hashtags": post.hashtags or "",
        "scheduled_for": post.scheduled_for,
        "posted_at": None,
        "status": "scheduled",
        "created_at": datetime.utcnow()
    }


@router.get("/posts", response_model=list[ScheduledPostResponse])
async def list_scheduled_posts(
    account_id: UUID,
    status_filter: Optional[str] = None,
    current_user: dict = Depends(get_current_user)
):
    """List scheduled posts for account."""
    # TODO: Query scheduled_posts
    
    return []


@router.delete("/posts/{post_id}")
async def delete_scheduled_post(post_id: UUID, current_user: dict = Depends(get_current_user)):
    """Delete a scheduled post (before it's posted)."""
    # TODO: Delete from scheduled_posts
    
    return {"message": f"Post {post_id} deleted"}
