# BrandBase Deployment Guide

## Architecture
- **Frontend:** Vercel (Next.js 14)
- **Backend:** Render (FastAPI)
- **Database:** Supabase (PostgreSQL)

---

## 1. Supabase (Database)

1. Create project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run this schema:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Accounts (businesses)
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name VARCHAR(255) NOT NULL,
  owner_id UUID REFERENCES auth.users(id),
  plan VARCHAR(50) DEFAULT 'starter',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Users (team members)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES accounts(id),
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'tradesperson',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Leads
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES accounts(id),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  service_type VARCHAR(255),
  job_details TEXT,
  lead_source VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new_lead',
  assigned_to UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Quotes
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id),
  created_by UUID REFERENCES users(id),
  approved_by UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'draft',
  line_items JSONB DEFAULT '[]',
  total_amount DECIMAL(10,2),
  ai_suggested_price DECIMAL(10,2),
  pricing_mode VARCHAR(50) DEFAULT 'manual',
  signature_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Appointments
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id),
  user_id UUID REFERENCES users(id),
  scheduled_at TIMESTAMP NOT NULL,
  appointment_type VARCHAR(100),
  notes TEXT,
  status VARCHAR(50) DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (add policies as needed)
```

3. Get your connection string from Settings → Connection String
4. Database URL: `postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres`

---

## 2. Backend → Render

### Option A: GitHub Connect (Recommended)
1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Blueprint
3. Connect your GitHub repo
4. Create a `render.yaml` (already included)

### Option B: Manual Deploy
1. Create Web Service
2. Build command: `pip install -r requirements.txt`
3. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Set environment variables below

### Environment Variables
```
ENV=production
DATABASE_URL=postgresql://postgres:xxx@db.xxx.supabase.co:5432/postgres
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=your_anon_key
STRIPE_KEY=sk_live_xxx
JWT_SECRET=generate_a_long_random_string
CORS_ORIGINS=https://brandbase.app,https://www.brandbase.app
```

### Health Check
```
GET https://your-backend.onrender.com/health
```

---

## 3. Frontend → Vercel

### Connect GitHub
1. Go to [vercel.com](https://vercel.com)
2. Import project → select `brandbase/web` folder
3. Framework: Next.js
4. Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
   ```
5. Deploy!

### Or via CLI
```bash
cd brandbase/web
npm i -g vercel
vercel
```

---

## 4. Custom Domain (Optional)
- Vercel: Add domain in project settings
- Point DNS to Vercel
- Update CORS_ORIGINS in Render

---

## Mock Data Mode
Everything currently uses mock data. No real API calls until you:
1. Set `DATABASE_URL` in Render
2. Create Supabase tables
3. Set `NEXT_PUBLIC_API_URL` in Vercel

---

## Quick Start (Local Dev)

**Backend:**
```bash
cd brandbase/backend
cp .env.example .env
# Fill in your Supabase credentials
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

**Frontend:**
```bash
cd brandbase/web
npm install
npm run dev
```

Frontend runs on http://localhost:3000
Backend runs on http://localhost:8001