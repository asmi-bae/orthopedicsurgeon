-- Production Readiness: Search Optimization & More Indexes

-- 1. Enable Trigram extension for fuzzy search if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 2. Trigram Indexes for User Search (fixes slow LIKE queries)
-- Individual indexes support Spring Data's findByEmailContaining, etc.
CREATE INDEX IF NOT EXISTS idx_users_email_trgm ON users USING gin (email gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_users_first_name_trgm ON users USING gin (first_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_users_last_name_trgm ON users USING gin (last_name gin_trgm_ops);

-- 3. Trigram Indexes for Doctor Search
CREATE INDEX IF NOT EXISTS idx_doctors_specialization_trgm ON doctors USING gin (specialization gin_trgm_ops) WHERE deleted = false;

-- 4. Trigram Indexes for Patient Search
CREATE INDEX IF NOT EXISTS idx_patients_city_trgm ON patients USING gin (city gin_trgm_ops) WHERE deleted = false;

-- 5. Functional Index for lower-case email lookups (common in auth)
CREATE INDEX IF NOT EXISTS idx_users_email_lower ON users (LOWER(email));

-- 6. Index for Appointment listing (most common sorting is appointment_date)
CREATE INDEX IF NOT EXISTS idx_appointments_sorting ON appointments (appointment_date DESC, created_at DESC) WHERE deleted = false;

-- 7. Notification indexing for unread counts (dashboard performance)
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications (user_id) WHERE is_read = false;

-- 8. Session indexing for fast token rotation
CREATE INDEX IF NOT EXISTS idx_sessions_refresh_token ON sessions (refresh_token_hash);
