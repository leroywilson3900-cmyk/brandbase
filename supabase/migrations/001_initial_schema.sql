-- BrandBase Initial Schema
-- Run this in Supabase SQL Editor

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Accounts (businesses)
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name VARCHAR(255) NOT NULL,
  owner_id UUID REFERENCES auth.users(id),
  plan VARCHAR(50) DEFAULT 'starter',
  industry VARCHAR(100),
  phone VARCHAR(50),
  email VARCHAR(255),
  address TEXT,
  logo_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Users (team members)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'tradesperson',
  avatar_url VARCHAR(500),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Leads
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
  created_by_user_id UUID REFERENCES users(id),
  assigned_to_user_id UUID REFERENCES users(id),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  preferred_contact VARCHAR(20),
  service_type VARCHAR(255),
  job_details TEXT,
  lead_source VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new_lead',
  priority VARCHAR(20) DEFAULT 'medium',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Quotes
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  created_by_user_id UUID REFERENCES users(id),
  approved_by_user_id UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'draft',
  line_items JSONB DEFAULT '[]',
  total_amount DECIMAL(10,2),
  ai_suggested_price DECIMAL(10,2),
  pricing_mode VARCHAR(50) DEFAULT 'manual',
  photos JSONB DEFAULT '[]',
  signature_url VARCHAR(500),
  notes TEXT,
  due_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Appointments
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id),
  scheduled_at TIMESTAMP NOT NULL,
  appointment_type VARCHAR(100),
  address TEXT,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Invoices
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id UUID REFERENCES quotes(id) ON DELETE SET NULL,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  amount DECIMAL(10,2),
  status VARCHAR(50) DEFAULT 'pending',
  due_date DATE,
  paid_date DATE,
  payment_method VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Social Posts
CREATE TABLE social_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
  platform VARCHAR(50),
  content TEXT,
  scheduled_for TIMESTAMP,
  posted_at TIMESTAMP,
  status VARCHAR(50) DEFAULT 'draft',
  analytics JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;

-- Policies (basic - allow all for now in development)
CREATE POLICY "Allow all" ON accounts FOR ALL USING (true);
CREATE POLICY "Allow all" ON users FOR ALL USING (true);
CREATE POLICY "Allow all" ON leads FOR ALL USING (true);
CREATE POLICY "Allow all" ON quotes FOR ALL USING (true);
CREATE POLICY "Allow all" ON appointments FOR ALL USING (true);
CREATE POLICY "Allow all" ON invoices FOR ALL USING (true);
CREATE POLICY "Allow all" ON social_posts FOR ALL USING (true);

-- Indexes for performance
CREATE INDEX idx_leads_account_id ON leads(account_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_quotes_lead_id ON quotes(lead_id);
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_scheduled_at ON appointments(scheduled_at);
CREATE INDEX idx_invoices_status ON invoices(status);
