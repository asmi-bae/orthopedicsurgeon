-- Drop the obsolete token_hash column from refresh_tokens
-- This column was replaced by the token column in V35, but the old NOT NULL constraint was causing 500 errors during MFA login.
ALTER TABLE refresh_tokens DROP COLUMN IF EXISTS token_hash;
