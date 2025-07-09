-- Initialize WhatsApp clicks tracking table in Neon database
-- Run this script in your Neon database console

-- Create the whatsapp_clicks table
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

-- Add some sample data for testing (optional)
-- INSERT INTO whatsapp_clicks (product_name, url, city, source, button_location, phone_number) 
-- VALUES ('Test Product', 'https://example.com', 'Test City', 'test_page', 'test_button', '923093336142');

-- Check if table was created successfully
SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'whatsapp_clicks' 
ORDER BY ordinal_position;

-- Check current record count
SELECT COUNT(*) as total_records FROM whatsapp_clicks;

-- Show recent records (if any)
SELECT * FROM whatsapp_clicks ORDER BY created_at DESC LIMIT 5;
