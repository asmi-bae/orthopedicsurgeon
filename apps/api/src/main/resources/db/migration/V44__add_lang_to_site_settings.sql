-- Add lang column to site_settings to support translation
ALTER TABLE site_settings ADD COLUMN lang VARCHAR(10) DEFAULT 'EN' NOT NULL;

-- Update unique constraint to include lang
ALTER TABLE site_settings DROP CONSTRAINT site_settings_key_key;
ALTER TABLE site_settings ADD CONSTRAINT site_settings_key_lang_key UNIQUE (key, lang);

-- Index for faster lookups by language
CREATE INDEX idx_site_settings_lang ON site_settings(lang);
