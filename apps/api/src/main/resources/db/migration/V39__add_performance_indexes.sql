-- Performance Optimization Indexes

-- 1. Soft Delete Indexes (deleted = false is used in almost all queries)
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT FALSE NOT NULL;
CREATE INDEX IF NOT EXISTS idx_appointments_active ON appointments (deleted) WHERE deleted = false;

ALTER TABLE patients ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT FALSE NOT NULL;
CREATE INDEX IF NOT EXISTS idx_patients_active ON patients (deleted) WHERE deleted = false;

ALTER TABLE doctors ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT FALSE NOT NULL;
CREATE INDEX IF NOT EXISTS idx_doctors_deleted ON doctors (deleted) WHERE deleted = false;

-- Removed: notifications table does not have a `deleted` column
-- Removed: blog_posts table does not have a `deleted` column

ALTER TABLE invoices ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT FALSE NOT NULL;
CREATE INDEX IF NOT EXISTS idx_invoices_deleted ON invoices (deleted) WHERE deleted = false;

ALTER TABLE hospitals ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT FALSE NOT NULL;
CREATE INDEX IF NOT EXISTS idx_hospitals_deleted ON hospitals (deleted) WHERE deleted = false;

ALTER TABLE services ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT FALSE NOT NULL;
CREATE INDEX IF NOT EXISTS idx_services_deleted ON services (deleted) WHERE deleted = false;

-- 2. Audit and Sorting Indexes
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON invoices (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs (created_at DESC);

-- 3. Additional Composite and Filter Indexes
-- Removed: notifications table does not have a `recipient_role` column

-- Appointment composite for common admin/doctor filters
CREATE INDEX IF NOT EXISTS idx_appointments_filtered_list ON appointments (doctor_id, status, appointment_date DESC);

-- 4. Search Optimization (Basic B-Tree for now, can be upgraded to GIN if needed)
-- PostgreSQL automatically creates indexes for UNIQUE columns, but we might need more for search if using LIKE
-- Note: LIKE '%query%' won't use B-Tree. For full-text search, we'd need GIN or GiST.
-- Adding indexes for common prefix search or equality
CREATE INDEX IF NOT EXISTS idx_users_names ON users (last_name, first_name);
