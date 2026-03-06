-- Comprehensive migration to fix all remaining schema mismatches
-- Using V35 to bypass the failed V34 in Flyway history

-- 1. Notifications table fixes
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'UNREAD';
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS recipient_role VARCHAR(100);
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS is_global BOOLEAN DEFAULT FALSE;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS severity VARCHAR(50) DEFAULT 'INFO';
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE;

-- 2. Refresh tokens table fixes
-- Map token_hash to token and revoked to is_revoked for JPA compatibility
ALTER TABLE refresh_tokens ADD COLUMN IF NOT EXISTS token VARCHAR(255);
ALTER TABLE refresh_tokens ADD COLUMN IF NOT EXISTS is_revoked BOOLEAN DEFAULT FALSE;

-- Data sync for refresh_tokens
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='refresh_tokens' AND column_name='token_hash') THEN
        UPDATE refresh_tokens SET token = token_hash WHERE token IS NULL;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='refresh_tokens' AND column_name='revoked') THEN
        UPDATE refresh_tokens SET is_revoked = revoked WHERE is_revoked IS FALSE;
    END IF;
END $$;

-- 3. Sessions table (ensure it exists)
CREATE TABLE IF NOT EXISTS sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    access_token_jti UUID UNIQUE NOT NULL,
    refresh_token_hash VARCHAR(255) NOT NULL,
    device_fingerprint VARCHAR(255),
    device_name VARCHAR(100),
    device_type VARCHAR(50),
    browser VARCHAR(50),
    os VARCHAR(50),
    ip_address VARCHAR(50),
    location VARCHAR(100),
    user_agent VARCHAR(512),
    is_active BOOLEAN DEFAULT TRUE,
    last_activity TIMESTAMP,
    terminated_at TIMESTAMP,
    terminated_reason VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
