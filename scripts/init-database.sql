-- Create the whatsapp_clicks table
CREATE TABLE IF NOT EXISTS whatsapp_clicks (
  id SERIAL PRIMARY KEY,
  product_id VARCHAR(255),
  product_name VARCHAR(255),
  url TEXT,
  city VARCHAR(100),
  source VARCHAR(255),
  button_location VARCHAR(255),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_agent TEXT,
  phone_number VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_timestamp ON whatsapp_clicks(timestamp);
CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_city ON whatsapp_clicks(city);
CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_source ON whatsapp_clicks(source);
CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_product_name ON whatsapp_clicks(product_name);

-- Insert some sample data for testing
INSERT INTO whatsapp_clicks (
  product_id, product_name, url, city, source, button_location, user_agent
) VALUES 
  ('prod_001', 'Dark Chocolate Truffles', 'https://chocolateacademy.pk/shop', 'lahore', '/shop', 'product-card', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'),
  ('prod_002', 'Milk Chocolate Box', 'https://chocolateacademy.pk/gifting', 'karachi', '/gifting', 'hero-section', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'),
  ('prod_003', 'Custom Wedding Cake', 'https://chocolateacademy.pk/contact', 'islamabad', '/contact', 'contact-form', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15');
