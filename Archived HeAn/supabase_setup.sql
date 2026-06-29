-- Run this SQL in your Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste → Run

CREATE TABLE IF NOT EXISTS bazi_users (
  id              BIGSERIAL PRIMARY KEY,
  name            TEXT,
  whatsapp        TEXT NOT NULL,
  city_of_birth   TEXT,
  date_of_birth   DATE,
  time_of_birth   TIME,
  gender          TEXT CHECK (gender IN ('male', 'female')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index on whatsapp for fast CRM lookups
CREATE INDEX IF NOT EXISTS idx_bazi_users_whatsapp ON bazi_users (whatsapp);

-- Index on created_at for timeline queries
CREATE INDEX IF NOT EXISTS idx_bazi_users_created ON bazi_users (created_at DESC);

-- Row Level Security: allow anonymous inserts (from the website)
ALTER TABLE bazi_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert"
  ON bazi_users
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- If you want to read from the dashboard (service role only, not exposed to public):
-- CREATE POLICY "Allow service role select"
--   ON bazi_users
--   FOR SELECT
--   TO service_role
--   USING (true);
