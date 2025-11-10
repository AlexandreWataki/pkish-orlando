-- Users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  sub TEXT UNIQUE,
  name TEXT,
  email TEXT UNIQUE,
  picture TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_google_id ON users (sub);
CREATE INDEX IF NOT EXISTS idx_users_email     ON users (email);

CREATE OR REPLACE FUNCTION set_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'users_set_updated_at') THEN
    CREATE TRIGGER users_set_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION set_users_updated_at();
  END IF;
END
$$;

-- App usages
CREATE TABLE IF NOT EXISTS app_usages (
  id BIGSERIAL PRIMARY KEY,
  device_id TEXT,
  app_version TEXT,
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
