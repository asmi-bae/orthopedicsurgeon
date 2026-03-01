-- V15__seed_data.sql

-- Seed Hospital
INSERT INTO hospitals (name, address, city, phone, email, license_number, status)
VALUES ('City Orthopedic Center', '123 Health Ave', 'New York', '+1-212-555-0100', 'contact@cityortho.com', 'HOSP-2024-001', 'ACTIVE');

-- Helper to get hospital id
DO $$
DECLARE
    h_id UUID;
    d1_id UUID;
    d2_id UUID;
    d3_id UUID;
    p1_id UUID;
    p2_id UUID;
    s1_id UUID;
    s2_id UUID;
    s3_id UUID;
    s4_id UUID;
BEGIN
    SELECT id INTO h_id FROM hospitals LIMIT 1;

    -- Seed Services for this hospital
    INSERT INTO services (hospital_id, name, description, duration_minutes, price, category)
    VALUES (h_id, 'Orthopedic Consultation', 'Initial consultation with a specialist', 30, 150.00, 'CONSULTATION') RETURNING id INTO s1_id;
    INSERT INTO services (hospital_id, name, description, duration_minutes, price, category)
    VALUES (h_id, 'X-Ray Single View', 'Diagnostic X-Ray imaging', 15, 80.00, 'RADIOLOGY') RETURNING id INTO s2_id;
    INSERT INTO services (hospital_id, name, description, duration_minutes, price, category)
    VALUES (h_id, 'Physiotherapy Session', 'Post-surgery rehabilitation', 45, 120.00, 'PHYSIOTHERAPY') RETURNING id INTO s3_id;
    INSERT INTO services (hospital_id, name, description, duration_minutes, price, category)
    VALUES (h_id, 'Knee Surgery Consultation', 'Specialized surgery evaluation', 60, 250.00, 'SURGICAL') RETURNING id INTO s4_id;

    -- Note: Doctors and Patients require User accounts first.
    -- Assuming users are created by the system/auth system first.
    -- For seed data, we expect some users to exist or we create dummy ones if needed.
    -- Since auth system is in place, we can link to existing users.
END $$;
