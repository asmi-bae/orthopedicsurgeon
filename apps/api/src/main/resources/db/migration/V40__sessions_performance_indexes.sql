-- Performance Indexes for Sessions Table
-- sessions.user_id is heavily queried (findByUserIdAndIsActiveTrue) but has no index
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions (user_id);

-- Compound index for the most common query: active sessions per user
CREATE INDEX IF NOT EXISTS idx_sessions_user_active ON sessions (user_id, is_active) WHERE is_active = true;

-- access_token_jti is already UNIQUE (which creates an index), but make sure
CREATE INDEX IF NOT EXISTS idx_sessions_access_token_jti ON sessions (access_token_jti);

-- Index for cleanup queries on inactive sessions
CREATE INDEX IF NOT EXISTS idx_sessions_is_active ON sessions (is_active);
