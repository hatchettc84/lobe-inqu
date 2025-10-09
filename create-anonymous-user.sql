-- Create anonymous user for development when authentication is disabled
-- This allows the application to work without full authentication setup

INSERT INTO users (id, username, email, avatar, created_at, updated_at)
VALUES 
  ('anonymous-user', 'Anonymous User', 'anonymous@inqubatorai.local', null, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Optionally create default settings for the anonymous user
INSERT INTO user_settings (id, created_at, updated_at)
VALUES 
  ('anonymous-user', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
