"""
Social Automation Routes — BrandBase Phase 4
Platform connections, content generation, scheduling, posting, analytics
"""

from fastapi import APIRouter, HTTPException, Depends, Query
from datetime import datetime
from uuid import UUID
from typing import Optional, List

from routes.auth import get_current_user
from services.phase4_services import (
    platforms, content_generator, scheduler, poster, analytics,
    SocialPlatformService, ContentGeneratorService, SchedulingService,
    PostingService, SocialAnalyticsService
)
from mock_data import get_account

router = APIRouter()


# ============ PLATFORM CONNECTIONS ============

@router.get("/platforms")
async def get_supported_platforms():
    """Get all supported social media platforms."""
    return {
        "platforms": platforms.get_all_platforms()
    }


@router.get("/platforms/{platform}/info")
async def get_platform_info(platform: str):
    """Get platform capabilities and limits."""
    info = platforms.get_platform_info(platform)
    if not info:
        raise HTTPException(status_code=404, detail="Platform not supported")
    return info


@router.post("/platforms/{platform}/connect")
async def connect_platform(platform: str, redirect_uri: str, current_user: dict = Depends(get_current_user)):
    """
    Start OAuth flow to connect a platform.
    """
    result = platforms.initiate_oauth(platform, redirect_uri)
    return {
        "message": f"Connect {platform}",
        "auth_url": result["auth_url"]
    }


@router.post("/platforms/{platform}/callback")
async def handle_platform_callback(platform: str, code: str, current_user: dict = Depends(get_current_user)):
    """
    Handle OAuth callback from platform.
    Exchanges code for access token.
    """
    result = platforms.handle_oauth_callback(platform, code)
    return {
        "message": f"{platform} connected successfully",
        "account": {
            "account_id": result["account_id"],
            "account_name": result["account_name"]
        }
    }


@router.get("/platforms/connected")
async def get_connected_platforms(current_user: dict = Depends(get_current_user)):
    """Get all connected platforms for this account."""
    account = get_account()
    # TODO: Query connected_platforms table
    
    return {
        "account_id": account["id"],
        "platforms": [
            {"platform": "instagram", "account_name": "Bayou Roofing", "connected": True, "last_posted": "2024-01-15T10:00:00Z"},
            {"platform": "facebook", "account_name": "Bayou Roofing & Construction", "connected": True, "last_posted": "2024-01-15T14:00:00Z"},
            {"platform": "tiktok", "account_name": "@bayouroofing", "connected": True, "last_posted": None},
        ]
    }


# ============ CONTENT GENERATION ============

@router.post("/content/generate-schedule")
async def generate_content_schedule(
    platforms: List[str],
    template_type: str = "educational",
    current_user: dict = Depends(get_current_user)
):
    """
    Generate 30 days of AI content for specified platforms.
    """
    account = get_account()
    
    posts = content_generator.generate_monthly_content(
        business_name=account["business_name"],
        industry="roofing",
        platforms=platforms,
        template_type=template_type
    )
    
    # Create schedule
    schedule = scheduler.create_schedule(
        account_id=account["id"],
        posts=posts,
        schedule_type="monthly"
    )
    
    return {
        "message": f"Generated {len(posts)} posts for {len(platforms)} platforms",
        "schedule": schedule
    }


@router.post("/content/generate-single")
async def generate_single_post(
    platform: str,
    topic: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Generate a single post on a specific topic.
    """
    account = get_account()
    
    post = content_generator.generate_single_post(
        platform=platform,
        topic=topic,
        business_name=account["business_name"],
        industry="roofing"
    )
    
    return {
        "post": post
    }


@router.post("/content/templates")
async def create_custom_template(
    name: str,
    platform: str,
    template_content: str,
    industry: str = "general",
    current_user: dict = Depends(get_current_user)
):
    """
    Create a custom content template.
    """
    # TODO: Store in templates table
    
    return {
        "template_id": str(UUID),
        "name": name,
        "platform": platform,
        "content": template_content,
        "created_at": datetime.utcnow().isoformat()
    }


# ============ SCHEDULING ============

@router.get("/schedule/calendar")
async def get_schedule_calendar(
    start_date: str,
    end_date: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get calendar view of scheduled posts.
    """
    account = get_account()
    calendar = scheduler.get_calendar_view(account["id"], start_date, end_date)
    return calendar


@router.post("/schedule/{schedule_id}/approve")
async def approve_schedule(schedule_id: str, current_user: dict = Depends(get_current_user)):
    """
    Approve a draft schedule. Posts go live.
    """
    result = scheduler.approve_schedule(schedule_id)
    return {
        "message": "Schedule approved and posts scheduled",
        "details": result
    }


@router.get("/schedule/{schedule_id}")
async def get_schedule(schedule_id: str, current_user: dict = Depends(get_current_user)):
    """Get schedule details."""
    # TODO: Fetch from schedules table
    return {
        "schedule_id": schedule_id,
        "status": "draft",
        "total_posts": 30
    }


# ============ POSTING ============

@router.post("/posts/{post_id}/post")
async def post_content(post_id: str, current_user: dict = Depends(get_current_user)):
    """
    Post a scheduled post to its platform.
    """
    # TODO: Fetch post, get access token, call posting service
    post = {
        "post_id": post_id,
        "platform": "instagram",
        "content": "Sample post content"
    }
    
    result = poster.post_content(post, "access_token")
    return {
        "message": "Post published successfully",
        "details": result
    }


@router.post("/posts/{post_id}/retry")
async def retry_failed_post(post_id: str, current_user: dict = Depends(get_current_user)):
    """
    Retry a failed post.
    """
    result = poster.retry_failed_post({"post_id": post_id})
    return {
        "message": "Retry scheduled",
        "details": result
    }


# ============ ANALYTICS ============

@router.get("/analytics/overview")
async def get_social_analytics(
    start_date: str,
    end_date: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get aggregated social analytics across all platforms.
    """
    account = get_account()
    data = analytics.get_account_analytics(account["id"], start_date, end_date)
    return data


@router.get("/analytics/platform/{platform}")
async def get_platform_analytics(
    platform: str,
    start_date: str,
    end_date: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get analytics for a specific platform.
    """
    # TODO: Fetch platform-specific analytics
    return {
        "platform": platform,
        "period": {"start": start_date, "end": end_date},
        "metrics": {
            "followers": 1840,
            "impressions": 8200,
            "engagement": 312,
            "engagement_rate": 3.8
        }
    }


@router.get("/analytics/posts/{post_id}")
async def get_post_analytics(post_id: str, current_user: dict = Depends(get_current_user)):
    """
    Get analytics for a specific post.
    """
    # TODO: Fetch from platform APIs
    return {
        "post_id": post_id,
        "impressions": 1250,
        "reach": 980,
        "engagement": 45,
        "likes": 32,
        "comments": 8,
        "shares": 5
    }


@router.get("/analytics/report")
async def generate_performance_report(current_user: dict = Depends(get_current_user)):
    """
    Generate monthly performance report.
    """
    account = get_account()
    report = analytics.generate_performance_report(account["id"])
    return report


# ============ TEMPLATE MANAGEMENT ============

@router.get("/templates")
async def get_content_templates(current_user: dict = Depends(get_current_user)):
    """Get available content templates by type."""
    return {
        "templates": [
            {"type": "educational", "name": "Educational", "description": "How-to tips, industry knowledge"},
            {"type": "showcase", "name": "Showcase", "description": "Before/after, completed jobs"},
            {"type": "testimonial", "name": "Testimonial", "description": "Customer reviews, trust building"},
            {"type": "promotional", "name": "Promotional", "description": "Seasonal deals, offers"},
            {"type": "behind_scenes", "name": "Behind the Scenes", "description": "Team highlights, process"}
        ]
    }
