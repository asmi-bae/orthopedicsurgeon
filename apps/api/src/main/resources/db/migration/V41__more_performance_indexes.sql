-- More Performance Optimization Indexes

-- 1. Patients: Index for counting new patients by createdAt
CREATE INDEX IF NOT EXISTS idx_patients_created_at ON patients (created_at DESC);

-- 2. Invoices: Partial index for summing paid revenue
CREATE INDEX IF NOT EXISTS idx_invoices_paid_revenue ON invoices (total_amount) WHERE status = 'PAID' AND deleted = false;

-- 3. Appointments: Composite index for dashboard live appointments
-- Current query: WHERE appointment_date = CURRENT_DATE AND status = 'CONFIRMED'
CREATE INDEX IF NOT EXISTS idx_appointments_live_dashboard ON appointments (appointment_date, status) WHERE deleted = false;

-- 4. Hospitals: Index for counting active hospitals
CREATE INDEX IF NOT EXISTS idx_hospitals_status_active ON hospitals (status) WHERE status = 'ACTIVE' AND deleted = false;

-- 5. Refresh Tokens: Index for rotation and cleanup logic
-- Used in: findByToken, deleteByUser, findByUserAndIsRevokedFalse
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_active ON refresh_tokens (user_id, is_revoked) WHERE is_revoked = false;
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token ON refresh_tokens (token);
