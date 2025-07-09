-- Initialize WhatsApp clicks tracking table for Neon database
-- This script ensures the table exists with proper structure

-- Drop table if exists (for clean setup)
-- DROP TABLE IF EXISTS whatsapp_clicks;

-- Create the main table for storing WhatsApp click events
CREATE TABLE IF NOT EXISTS whatsapp_clicks (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(255),
    product_name VARCHAR(255),
    url TEXT NOT NULL,
    city VARCHAR(100),
    source VARCHAR(255),
    button_location VARCHAR(255),
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    user_agent TEXT,
    phone_number VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_timestamp ON whatsapp_clicks(timestamp);
CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_product_name ON whatsapp_clicks(product_name);
CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_city ON whatsapp_clicks(city);
CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_source ON whatsapp_clicks(source);
CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_created_at ON whatsapp_clicks(created_at);

-- Clear any existing test data
DELETE FROM whatsapp_clicks WHERE product_name = 'Test Product';

-- Insert a fresh test record to verify the table works
INSERT INTO whatsapp_clicks (
    product_name, 
    url, 
    city, 
    source, 
    button_location, 
    user_agent,
    phone_number
) VALUES (
    'Database Test Product',
    'https://test-database-connection.com',
    'test-city',
    'database-init-v2',
    'test-location',
    'Database Init Script v2',
    '923093336142'
);

-- Verify the table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'whatsapp_clicks'
ORDER BY ordinal_position;

-- Show current record count
SELECT COUNT(*) as total_records FROM whatsapp_clicks;

-- Show the most recent records
SELECT 
    id,
    product_name,
    city,
    source,
    button_location,
    timestamp,
    created_at
FROM whatsapp_clicks 
ORDER BY created_at DESC 
LIMIT 5;
