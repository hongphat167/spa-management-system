ALTER TABLE spa_services
ADD COLUMN IF NOT EXISTS image_url VARCHAR(500);

UPDATE spa_services
SET image_url = COALESCE(image_url, '/images/services/default.jpg')
WHERE image_url IS NULL;