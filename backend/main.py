"""
BrandBase Backend — FastAPI Application
Phase 1: Core Lead + Quote Flow
"""

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

load_dotenv()

from routes import accounts, leads, quotes, appointments, auth, social, webhooks, ai, customer_portal, social_automation


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    # Startup
    print("🚀 BrandBase API starting up...")
    print(f"📦 Environment: {os.getenv('ENV', 'development')}")
    yield
    # Shutdown
    print("👋 BrandBase API shutting down...")


# ============ APP ============

app = FastAPI(
    title="BrandBase API",
    description="BrandBase + QuoteForge unified platform for service businesses",
    version="1.0.0",
    lifespan=lifespan,
)


# ============ CORS ============

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://brandbase.app",
        "https://www.brandbase.app",
        "https://*.vercel.app",  # Vercel preview URLs
    ],
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
        "phase": "1 - Core Lead + Quote Flow"
    }


@app.get("/")
async def root():
    return {
        "message": "BrandBase API",
        "docs": "/docs",
        "phase": "Phase 1: Core Lead + Quote Flow"
    }


# ============ ROUTES ============

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


# ============ ERROR HANDLERS ============

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return {
        "error": exc.detail,
        "status_code": exc.status_code,
    }


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    return {
        "error": "Internal server error",
        "status_code": 500,
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8001,
        reload=True,
        log_level="info"
    )
