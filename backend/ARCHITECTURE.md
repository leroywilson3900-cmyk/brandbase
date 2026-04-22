# BrandBase Backend Architecture

## Overview
BrandBase + QuoteForge unified platform for service-based businesses (LLCs, solopreneurs).
Mobile-first responsive web app. Backend: FastAPI + Supabase.

---

## PHASE 1: Core Lead + Quote Flow (Foundation)

### 1.1 User Accounts
- Master account (owner/admin)
- Sub-accounts (tradespeople)
- Office/admin role
- Auth: Supabase Auth (email + password)

### 1.2 Lead Capture Forms
- Contact form on landing page
- "How did you find us?" dropdown
- Preferred contact method (text/email/phone)
- Service type selection
- Auto-populates QuoteForge CRM

### 1.3 Lead Status Pipeline
```
NEW_LEAD → FOLLOWUP_CALL → APPOINTMENT_SET → ON_SITE_VISIT → QUOTE_SENT → DEPOSIT_RECEIVED → JOB_IN_PROGRESS → PAYMENT_COMPLETE → JOB_DONE
```

### 1.4 Quote Creation
- On-site entry via QuoteForce
- Line items: labor + materials
- Photos attached
- AI pricing assist (learns over time)
- Three modes: Manual / AI-Assisted / AI-Auto-Quote

### 1.5 Digital Signatures
- DocuSign or HelloSign API
- Customer signs on phone/tablet
- No paper

### 1.6 Approval Workflow
- Tradesperson submits quote
- Sent to approval queue
- Office/boss approves or rejects
- Approved → Quote sent to customer

---

## Database Schema (Phase 1)

### accounts
| Column | Type |
|--------|------|
| id | UUID |
| business_name | VARCHAR |
| owner_id | UUID (FK to auth.users) |
| plan | ENUM('starter','pro','scale') |
| created_at | TIMESTAMP |

### users
| Column | Type |
|--------|------|
| id | UUID |
| account_id | UUID (FK) |
| email | VARCHAR |
| role | ENUM('owner','tradesperson','admin') |
| name | VARCHAR |
| created_at | TIMESTAMP |

### leads
| Column | Type |
|--------|------|
| id | UUID |
| account_id | UUID (FK) |
| created_by_user_id | UUID (FK) |
| customer_name | VARCHAR |
| customer_email | VARCHAR |
| customer_phone | VARCHAR |
| preferred_contact | ENUM('text','email','phone') |
| service_type | VARCHAR |
| job_details | TEXT |
| lead_source | VARCHAR |
| status | ENUM(lead statuses) |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

### quotes
| Column | Type |
|--------|------|
| id | UUID |
| lead_id | UUID (FK) |
| created_by_user_id | UUID (FK) |
| approved_by_user_id | UUID (FK) |
| status | ENUM('draft','pending_approval','approved','sent','accepted','rejected','invoiced','paid') |
| line_items | JSONB |
| total_amount | DECIMAL |
| photos | JSONB |
| ai_suggested_price | DECIMAL |
| pricing_mode | ENUM('manual','ai_assisted','ai_auto') |
| signature_url | VARCHAR |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

## API Endpoints (Phase 1)

### Auth
- POST /auth/signup
- POST /auth/login
- POST /auth/logout
- GET /auth/me

### Accounts
- POST /accounts
- GET /accounts/{id}
- PUT /accounts/{id}
- POST /accounts/{id}/users
- GET /accounts/{id}/users
- DELETE /accounts/{id}/users/{user_id}

### Leads
- POST /leads
- GET /leads
- GET /leads/{id}
- PUT /leads/{id}
- PATCH /leads/{id}/status
- GET /accounts/{id}/leads

### Quotes
- POST /quotes
- GET /quotes
- GET /quotes/{id}
- PUT /quotes/{id}
- POST /quotes/{id}/approve
- POST /quotes/{id}/reject
- POST /quotes/{id}/send
- POST /quotes/{id}/sign
- POST /quotes/{id}/change-order

---

## External Integrations (Phase 1)
- DocuSign API (e-signatures)
- Stripe API (payments)

---

## Tech Stack
- Backend: FastAPI
- Database: Supabase (PostgreSQL)
- Auth: Supabase Auth
- File Storage: Supabase Storage
- Payments: Stripe
- E-Sign: DocuSign
