"""
Authentication Routes — BrandBase Phase 1
Handles: signup, login, logout, me
"""

from fastapi import APIRouter, HTTPException, Depends, status
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from typing import Optional
import os

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

# Mock Supabase auth for now — replace with actual Supabase client later
# from supabase import create_client

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    # TODO: Fetch user from database
    return {"id": user_id, "email": payload.get("email")}


router = APIRouter()


@router.post("/signup")
async def signup(email: str, password: str, name: str, business_name: str):
    """
    Create new account + master user.
    In production: uses Supabase Auth + creates account in DB.
    """
    # TODO: Implement with Supabase
    # 1. Create Supabase auth user
    # 2. Create account record
    # 3. Create user record with owner role
    
    if len(password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")
    
    # Mock response for now
    return {
        "message": "Account created successfully",
        "user_id": "mock-uuid",
        "account_id": "mock-account-uuid",
        "email": email,
    }


@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Login and get access token.
    In production: validates against Supabase Auth.
    """
    # TODO: Implement with Supabase
    # 1. Validate email/password against Supabase Auth
    # 2. Fetch user record
    # 3. Create JWT token
    
    # Mock response for demo
    access_token = create_access_token(
        data={"sub": "mock-user-id", "email": form_data.username}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": "mock-user-id",
            "email": form_data.username,
            "name": "Demo User",
            "account_id": "mock-account-id",
            "role": "owner"
        }
    }


@router.post("/logout")
async def logout(current_user: dict = Depends(get_current_user)):
    """
    Logout — invalidate token.
    In production: blacklist token or use Supabase session revoke.
    """
    return {"message": "Logged out successfully"}


@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    """
    Get current user info.
    In production: fetch from Supabase + join with users table.
    """
    # TODO: Implement with Supabase
    return {
        "id": current_user["id"],
        "email": current_user["email"],
        "name": "Demo User",
        "account_id": current_user.get("account_id"),
        "role": "owner",
        "is_active": True,
        "created_at": datetime.utcnow()
    }
