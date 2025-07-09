-- Initialize WhatsApp clicks tracking table for Neon database
-- This script creates the necessary table and indexes for storing WhatsApp click analytics

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

-- Add some sample data for testing (optional)
-- INSERT INTO whatsapp_clicks (product_name, url, city, source, button_location, user_agent, phone_number)
-- VALUES 
--     ('Test Product', 'https://example.com', 'karachi', '/test', 'header-button', 'Test User Agent', '923093336142'),
--     ('Another Product', 'https://example.com/product', 'lahore', '/products', 'product-card', 'Test User Agent 2', '923093336142');

-- Check if the table was created successfully
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

-- Show table structure
\d whatsapp_clicks;
