-- Add single_doctor_key to doctors table
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS single_doctor_key INTEGER NOT NULL DEFAULT 1;
ALTER TABLE doctors DROP CONSTRAINT IF EXISTS unique_single_doctor;
ALTER TABLE doctors ADD CONSTRAINT unique_single_doctor UNIQUE (single_doctor_key);

-- Add single_hospital_key to hospitals table
ALTER TABLE hospitals ADD COLUMN IF NOT EXISTS single_hospital_key INTEGER NOT NULL DEFAULT 1;
ALTER TABLE hospitals DROP CONSTRAINT IF EXISTS unique_single_hospital;
ALTER TABLE hospitals ADD CONSTRAINT unique_single_hospital UNIQUE (single_hospital_key);
