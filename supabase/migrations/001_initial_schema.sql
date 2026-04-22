-- BrandBase Full Schema
-- Run this in Supabase SQL Editor (Database → SQL Editor)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ACCOUNTS (Business/Tenant)
-- ============================================
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name VARCHAR(255) NOT NULL,
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  plan VARCHAR(50) DEFAULT 'starter',
  industry VARCHAR(100) DEFAULT 'general',
  phone VARCHAR(50),
  email VARCHAR(255),
  address TEXT,
  logo_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- USERS (Team Members)
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'tradesperson',
  avatar_url VARCHAR(500),
  phone VARCHAR(50),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- LEADS
-- ============================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
  created_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  assigned_to_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  preferred_contact VARCHAR(20) DEFAULT 'phone',
  service_type VARCHAR(255),
  job_details TEXT,
  lead_source VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new_lead',
  priority VARCHAR(20) DEFAULT 'medium',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- QUOTES
-- ============================================
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
  created_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  approved_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  service_type VARCHAR(255),
  status VARCHAR(50) DEFAULT 'draft',
  line_items JSONB DEFAULT '[]',
  total_amount DECIMAL(10,2),
  ai_suggested_price DECIMAL(10,2),
  pricing_mode VARCHAR(50) DEFAULT 'manual',
  photos JSONB DEFAULT '[]',
  signature_url VARCHAR(500),
  notes TEXT,
  due_date DATE,
  sent_at TIMESTAMP,
  signed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- APPOINTMENTS
-- ============================================
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  quote_id UUID REFERENCES quotes(id) ON DELETE SET NULL,
  account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  customer_name VARCHAR(255),
  customer_phone VARCHAR(50),
  scheduled_at TIMESTAMP NOT NULL,
  appointment_type VARCHAR(100),
  address TEXT,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- INVOICES
-- ============================================
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id UUID REFERENCES quotes(id) ON DELETE SET NULL,
  account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  amount DECIMAL(10,2),
  status VARCHAR(50) DEFAULT 'pending',
  due_date DATE,
  paid_date DATE,
  payment_method VARCHAR(50),
  stripe_payment_intent_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- SOCIAL POSTS
-- ============================================
CREATE TABLE social_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  platform VARCHAR(50),
  content TEXT,
  image_urls JSONB DEFAULT '[]',
  scheduled_for TIMESTAMP,
  posted_at TIMESTAMP,
  status VARCHAR(50) DEFAULT 'draft',
  analytics JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- CUSTOMERS (separate from leads for long-term)
-- ============================================
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  company VARCHAR(255),
  total_spent DECIMAL(10,2) DEFAULT 0,
  jobs_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_leads_account_id ON leads(account_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_assigned ON leads(assigned_to_user_id);
CREATE INDEX idx_quotes_account_id ON quotes(account_id);
CREATE INDEX idx_quotes_lead_id ON quotes(lead_id);
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_scheduled ON appointments(scheduled_at);
CREATE INDEX idx_appointments_account ON appointments(account_id);
CREATE INDEX idx_invoices_account_id ON invoices(account_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_quote_id ON invoices(quote_id);
CREATE INDEX idx_customers_account_id ON customers(account_id);
CREATE INDEX idx_social_posts_account_id ON social_posts(account_id);
CREATE INDEX idx_users_account_id ON users(account_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Allow all for development (tighten up in production)
CREATE POLICY "Allow all for authenticated users" ON accounts FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON users FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON leads FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON quotes FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON appointments FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON invoices FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON social_posts FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON customers FOR ALL USING (true);

-- ============================================
-- SEED MOCK DATA (delete in production)
-- ============================================
INSERT INTO accounts (id, business_name, plan, industry, phone, email, address) VALUES
('00000000-0000-0000-0000-000000000001', 'Bayou Roofing LLC', 'pro', 'roofing', '(337) 555-0100', 'info@bayouroofing.com', '1204 S. Market St, Suite 201, Lafayette, LA 70501');

INSERT INTO users (id, account_id, email, name, role) VALUES
('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000001', 'marcus@bayouroofing.com', 'Marcus Thompson', 'owner'),
('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000001', 'jim@bayouroofing.com', 'Jim Butler', 'tradesperson'),
('00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000001', 'ashley@bayouroofing.com', 'Ashley Viator', 'admin');

INSERT INTO leads (id, account_id, created_by_user_id, assigned_to_user_id, customer_name, customer_email, customer_phone, service_type, lead_source, status, priority, notes) VALUES
('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000011', 'Jennifer Mouton', 'jennifer.mouton@email.com', '(337) 555-0147', 'Roofing - Shingle Replacement', 'Website Form', 'new_lead', 'high', 'Homeowner in Broussard. Insurance claim approved.'),
('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000012', 'Robert Cormier', 'rcormier@bayoucowboy.net', '(337) 555-0198', 'Roofing - Full Replacement', 'Google Ads', 'appointment_set', 'high', 'Commercial property. 12,000 sq ft metal roof.'),
('00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000011', 'Sarah Hebert', 'shebert@gmail.com', '(337) 555-0234', 'Roofing - Repair', 'Facebook', 'quote_sent', 'medium', 'Minor repair. Leak in garage.');

INSERT INTO customers (id, account_id, name, email, phone, address, total_spent, jobs_completed) VALUES
('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000001', 'Lisa Trahan', 'lisa.t@outlook.com', '(337) 555-0312', '4455 Bonin Rd, Youngsville, LA 70592', 12000, 2),
('00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000001', 'David Babineaux', 'dbabineaux@gmail.com', '(337) 555-0423', '7722 US-90, New Iberia, LA 70560', 8400, 3),
('00000000-0000-0000-0000-000000000203', '00000000-0000-0000-0000-000000000001', 'Sarah Hebert', 'shebert@gmail.com', '(337) 555-0234', '8923 Old Jeanerette Rd, Lafayette, LA 70506', 4750, 1);

-- ============================================
-- FUNCTION: Auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER quotes_updated_at BEFORE UPDATE ON quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at();