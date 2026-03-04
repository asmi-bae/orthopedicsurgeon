-- Create invoices table
DROP TABLE IF EXISTS invoices CASCADE;
CREATE TABLE invoices (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    created_by UUID,
    updated_by UUID,
    version BIGINT,
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    invoice_number VARCHAR(255) UNIQUE NOT NULL,
    patient_id UUID NOT NULL REFERENCES patients(id),
    appointment_id UUID REFERENCES appointments(id),
    amount DECIMAL(19, 2) NOT NULL,
    tax_amount DECIMAL(19, 2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(19, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    due_date TIMESTAMP WITHOUT TIME ZONE,
    issued_date TIMESTAMP WITHOUT TIME ZONE
);

-- Add invoice_id to payments table for relationship
ALTER TABLE payments ADD COLUMN IF NOT EXISTS invoice_id UUID REFERENCES invoices(id);

-- Indexes for performance
CREATE INDEX idx_invoices_patient_id ON invoices(patient_id);
CREATE INDEX idx_invoices_appointment_id ON invoices(appointment_id);
CREATE INDEX idx_invoices_number ON invoices(invoice_number);
CREATE INDEX idx_payments_invoice_id ON payments(invoice_id);
