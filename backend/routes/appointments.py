"""
Appointment Routes — BrandBase Phase 1
Handles: Appointment booking, scheduling, reminders
"""

from fastapi import APIRouter, HTTPException, Depends, status
from datetime import datetime
from uuid import UUID
from typing import Optional

from schemas import (
    AppointmentCreate, AppointmentUpdate, AppointmentResponse
)
from routes.auth import get_current_user

router = APIRouter()


@router.post("/", response_model=AppointmentResponse, status_code=status.HTTP_201_CREATED)
async def create_appointment(
    appointment: AppointmentCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Book an appointment (phone consultation or on-site).
    Creates appointment, schedules reminders.
    """
    # TODO: 
    # 1. Insert into appointments table
    # 2. Check for calendar conflicts
    # 3. Send confirmation to customer
    # 4. Schedule reminders
    
    return {
        "id": "mock-appointment-id",
        "lead_id": str(appointment.lead_id),
        "account_id": current_user.get("account_id", "00000000-0000-0000-0000-000000000001"),
        "scheduled_by_user_id": current_user["id"],
        "assigned_user_id": str(appointment.assigned_user_id) if appointment.assigned_user_id else None,
        "appointment_type": appointment.appointment_type,
        "scheduled_at": appointment.scheduled_at,
        "duration_minutes": appointment.duration_minutes,
        "status": "scheduled",
        "notes": appointment.notes or "",
        "reminder_24h": False,
        "reminder_1h": False,
        "created_at": datetime.utcnow()
    }


@router.get("/{appointment_id}", response_model=AppointmentResponse)
async def get_appointment(appointment_id: UUID, current_user: dict = Depends(get_current_user)):
    """Get appointment by ID."""
    # TODO: Fetch from appointments table
    
    return {
        "id": str(appointment_id),
        "lead_id": "lead-1",
        "account_id": current_user.get("account_id", "00000000-0000-0000-0000-000000000001"),
        "scheduled_by_user_id": current_user["id"],
        "assigned_user_id": current_user["id"],
        "appointment_type": "on_site",
        "scheduled_at": datetime.utcnow(),
        "duration_minutes": "60",
        "status": "scheduled",
        "notes": "",
        "reminder_24h": False,
        "reminder_1h": False,
        "created_at": datetime.utcnow()
    }


@router.put("/{appointment_id}", response_model=AppointmentResponse)
async def update_appointment(
    appointment_id: UUID,
    appointment: AppointmentUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update appointment (reschedule, change assigned user, etc)."""
    # TODO: Update, check for conflicts, notify customer
    
    return {
        "id": str(appointment_id),
        "lead_id": "lead-1",
        "account_id": current_user.get("account_id", "00000000-0000-0000-0000-000000000001"),
        "scheduled_by_user_id": current_user["id"],
        "assigned_user_id": current_user["id"],
        "appointment_type": "on_site",
        "scheduled_at": appointment.scheduled_at or datetime.utcnow(),
        "duration_minutes": appointment.duration_minutes or "60",
        "status": appointment.status or "scheduled",
        "notes": appointment.notes or "",
        "reminder_24h": False,
        "reminder_1h": False,
        "created_at": datetime.utcnow()
    }


@router.post("/{appointment_id}/cancel")
async def cancel_appointment(appointment_id: UUID, current_user: dict = Depends(get_current_user)):
    """Cancel appointment. Notifies customer."""
    # TODO: Update status, send cancellation notification
    
    return {"message": f"Appointment {appointment_id} cancelled"}


@router.get("/availability/slots")
async def get_available_slots(
    account_id: UUID,
    date: str,  # YYYY-MM-DD
    appointment_type: str = "on_site",
    current_user: dict = Depends(get_current_user)
):
    """
    Get available appointment slots for a given date.
    Prevents double-booking.
    """
    # TODO: 
    # 1. Query existing appointments for date
    # 2. Return open slots based on business hours
    # 3. No double-booking check
    
    return {
        "date": date,
        "appointment_type": appointment_type,
        "slots": [
            {"time": "09:00", "available": True},
            {"time": "10:00", "available": False},
            {"time": "11:00", "available": True},
            {"time": "13:00", "available": True},
            {"time": "14:00", "available": True},
            {"time": "15:00", "available": False},
            {"time": "16:00", "available": True},
        ]
    }


@router.get("/calendar")
async def get_calendar(
    account_id: UUID,
    start_date: str,
    end_date: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get calendar view of appointments.
    Used for office/admin dashboard.
    """
    # TODO: Query appointments for date range
    
    return {
        "appointments": [
            {
                "id": "apt-1",
                "lead_name": "John Smith",
                "appointment_type": "on_site",
                "scheduled_at": "2024-01-15T10:00:00Z",
                "duration_minutes": "60",
                "status": "scheduled",
                "assigned_user": "Jim"
            }
        ]
    }
