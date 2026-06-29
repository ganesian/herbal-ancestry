-- 喝安 Herbal Ancestry — Neon Database Setup
-- Run this in your Neon SQL Editor once after creating the project.

CREATE TABLE IF NOT EXISTS user_records (
  id                  SERIAL PRIMARY KEY,
  name                TEXT,
  whatsapp            TEXT NOT NULL,
  city                TEXT,
  birth_date          DATE,
  birth_time          TIME,
  gender              TEXT CHECK (gender IN ('male', 'female')),
  day_master_element  TEXT,
  five_factors        JSONB,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for quick lookup by WhatsApp
CREATE INDEX IF NOT EXISTS idx_user_records_whatsapp ON user_records (whatsapp);

-- Index for CRM date-range queries
CREATE INDEX IF NOT EXISTS idx_user_records_created ON user_records (created_at DESC);
