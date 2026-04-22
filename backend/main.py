"""
BrandBase Backend — FastAPI Application
Connected to Supabase PostgreSQL
"""

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

# ============ SUPABASE CLIENT ============
supabase_url = os.getenv("SUPABASE_URL", "")
supabase_key = os.getenv("SUPABASE_KEY", "")
supabase: Client = create_client(supabase_url, supabase_key) if supabase_url and supabase_key else None

# ============ LIFESPAN ============
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 BrandBase API starting up...")
    print(f"📦 Supabase: {'Connected ✓' if supabase else 'Not configured (using mock data)'}")
    print(f"🌍 Environment: {os.getenv('ENV', 'development')}")
    yield
    print("👋 BrandBase API shutting down...")

# ============ APP ============
app = FastAPI(
    title="BrandBase API",
    description="BrandBase + QuoteForge unified platform for service businesses",
    version="1.0.0",
    lifespan=lifespan,
)

# ============ CORS ============
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============ HEALTH CHECK ============
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "brandbase-api",
        "version": "1.0.0",
        "supabase": "connected" if supabase else "not configured"
    }

@app.get("/")
async def root():
    return {
        "message": "BrandBase API",
        "docs": "/docs",
        "supabase": "connected" if supabase else "not configured"
    }

# ============ ROUTES ============
from routes import accounts, leads, quotes, appointments, auth, social, webhooks, ai, customer_portal, social_automation, chat

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(accounts.router, prefix="/accounts", tags=["Accounts"])
app.include_router(leads.router, prefix="/leads", tags=["Leads"])
app.include_router(quotes.router, prefix="/quotes", tags=["Quotes"])
app.include_router(appointments.router, prefix="/appointments", tags=["Appointments"])
app.include_router(social.router, prefix="/social", tags=["Social Media"])
app.include_router(webhooks.router, prefix="/webhooks", tags=["Webhooks"])
app.include_router(ai.router, prefix="/ai", tags=["AI Services"])
app.include_router(customer_portal.router, prefix="/customer-portal", tags=["Customer Portal"])
app.include_router(social_automation.router, prefix="/social-auto", tags=["Social Automation"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])

# ============ ERROR HANDLERS ============
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return {"error": exc.detail, "status_code": exc.status_code}

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    return {"error": "Internal server error", "status_code": 500}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)