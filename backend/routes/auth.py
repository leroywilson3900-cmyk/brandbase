from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional
import os

router = APIRouter()

# Mock users for development (replace with Supabase auth)
MOCK_USERS = [
    {"id": "00000000-0000-0000-0000-000000000011", "email": "marcus@bayouroofing.com", "name": "Marcus Thompson", "password": "demo123", "role": "owner"},
    {"id": "00000000-0000-0000-0000-000000000012", "email": "jim@bayouroofing.com", "name": "Jim Butler", "password": "demo123", "role": "tradesperson"},
]

class LoginRequest(BaseModel):
    email: str
    password: str

class SignupRequest(BaseModel):
    email: str
    password: str
    name: str
    business_name: Optional[str] = None

@router.post("/login")
async def login(req: LoginRequest):
    """Login endpoint - checks mock users or Supabase auth"""
    from main import supabase
    
    # Try Supabase auth first
    if supabase:
        try:
            response = supabase.auth.sign_in_with_password(
                email=req.email,
                password=req.password
            )
            return {
                "success": True,
                "user": {
                    "id": response.user.id,
                    "email": response.user.email,
                    "name": response.user.user_metadata.get("name", "")
                },
                "session": {
                    "access_token": response.session.access_token,
                    "refresh_token": response.session.refresh_token
                }
            }
        except Exception as e:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Fall back to mock users
    for user in MOCK_USERS:
        if user["email"] == req.email and user["password"] == req.password:
            return {
                "success": True,
                "user": {
                    "id": user["id"],
                    "email": user["email"],
                    "name": user["name"],
                    "role": user["role"]
                },
                "session": {"access_token": "mock_token_" + user["id"]}
            }
    
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.post("/signup")
async def signup(req: SignupRequest):
    """Signup endpoint - creates user in Supabase Auth"""
    from main import supabase
    
    if supabase:
        try:
            response = supabase.auth.sign_up({
                "email": req.email,
                "password": req.password,
                "options": {
                    "data": {
                        "name": req.name,
                        "business_name": req.business_name or ""
                    }
                }
            })
            return {
                "success": True,
                "user": {
                    "id": response.user.id,
                    "email": response.user.email,
                    "name": req.name
                }
            }
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
    
    raise HTTPException(status_code=400, detail="Supabase not configured")

@router.get("/me")
async def get_me(token: Optional[str] = None):
    """Get current user from token"""
    from main import supabase
    
    # For mock mode, return first user
    if not supabase:
        return {
            "id": "00000000-0000-0000-0000-000000000011",
            "email": "marcus@bayouroofing.com",
            "name": "Marcus Thompson",
            "role": "owner"
        }
    
    return {"error": "Not implemented - use Supabase client directly"}

@router.post("/logout")
async def logout():
    return {"success": True}