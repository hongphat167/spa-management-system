-- Reset PostgreSQL sequences to match the current MAX(id) in each table.
-- Run this after importing seed data with explicit IDs.

SELECT setval(pg_get_serial_sequence('users', 'id'), COALESCE((SELECT MAX(id) FROM users), 1), true);
SELECT setval(pg_get_serial_sequence('customers', 'id'), COALESCE((SELECT MAX(id) FROM customers), 1), true);
SELECT setval(pg_get_serial_sequence('spa_services', 'id'), COALESCE((SELECT MAX(id) FROM spa_services), 1), true);
SELECT setval(pg_get_serial_sequence('therapists', 'id'), COALESCE((SELECT MAX(id) FROM therapists), 1), true);
SELECT setval(pg_get_serial_sequence('appointments', 'id'), COALESCE((SELECT MAX(id) FROM appointments), 1), true);
SELECT setval(pg_get_serial_sequence('invoices', 'id'), COALESCE((SELECT MAX(id) FROM invoices), 1), true);

SELECT 'Sequences reset successfully' AS status;
