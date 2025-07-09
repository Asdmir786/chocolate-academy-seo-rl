-- Final Neon Database Setup for WhatsApp Click Tracking
-- This script ensures clean setup with proper structure

-- Drop existing table if you want a fresh start
DROP TABLE IF EXISTS whatsapp_clicks;

-- Create the whatsapp_clicks table with proper structure
CREATE TABLE whatsapp_clicks (
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

-- Create indexes for optimal performance
CREATE INDEX idx_whatsapp_clicks_timestamp ON whatsapp_clicks(timestamp);
CREATE INDEX idx_whatsapp_clicks_product_name ON whatsapp_clicks(product_name);
CREATE INDEX idx_whatsapp_clicks_city ON whatsapp_clicks(city);
CREATE INDEX idx_whatsapp_clicks_source ON whatsapp_clicks(source);
CREATE INDEX idx_whatsapp_clicks_created_at ON whatsapp_clicks(created_at);

-- Clear any test data
DELETE FROM whatsapp_clicks WHERE product_name LIKE '%Test%' OR product_name LIKE '%Database%';

-- Insert a verification record
INSERT INTO whatsapp_clicks (
    product_name, 
    url, 
    city, 
    source, 
    button_location, 
    user_agent,
    phone_number
) VALUES (
    'Database Setup Verification',
    'https://chocolateacademy.top/setup-verification',
    'system',
    'database-setup',
    'initialization-script',
    'Neon Database Setup Script',
    '923093336142'
);

-- Verify table structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'whatsapp_clicks'
ORDER BY ordinal_position;

-- Show current record count
SELECT COUNT(*) as total_records FROM whatsapp_clicks;

-- Show sample records
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
LIMIT 10;

-- Grant necessary permissions (if needed)
-- GRANT ALL PRIVILEGES ON TABLE whatsapp_clicks TO your_user;
-- GRANT USAGE, SELECT ON SEQUENCE whatsapp_clicks_id_seq TO your_user;

-- Show table structure
\d whatsapp_clicks;

-- Final verification message
SELECT 'WhatsApp clicks table successfully created in Neon database!' as status;
