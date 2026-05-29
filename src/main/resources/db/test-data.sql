-- Local test dataset for end-to-end spa flow
-- Safe to run in development or staging only.

-- Uncomment the next line when you want a clean reset before reseeding.
-- TRUNCATE TABLE invoices, appointments, therapists, customers, spa_services, users RESTART IDENTITY CASCADE;

INSERT INTO users (id, email, password, first_name, last_name, phone, role, is_active)
VALUES
  (1, 'admin@spa.local', 'admin123', 'System', 'Admin', '0900000001', 'ADMIN', true),
  (2, 'lan.nguyen@spa.local', 'therapist123', 'Nguyen', 'Lan', '0900000002', 'THERAPIST', true),
  (3, 'minh.tran@spa.local', 'therapist123', 'Tran', 'Minh', '0900000003', 'THERAPIST', true),
  (4, 'hoa.le@spa.local', 'therapist123', 'Le', 'Hoa', '0900000004', 'THERAPIST', true);

INSERT INTO customers (id, email, first_name, last_name, phone, date_of_birth, loyalty_points, total_spent, is_active)
VALUES
  (1, 'anh.nguyen@example.com', 'Nguyen', 'Anh', '0911111111', '1992-04-18', 120, 3200000.00, true),
  (2, 'linh.pham@example.com', 'Pham', 'Linh', '0922222222', '1995-09-22', 80, 1850000.00, true),
  (3, 'tuan.vo@example.com', 'Vo', 'Tuan', '0933333333', '1988-12-03', 220, 6400000.00, true),
  (4, 'mai.dang@example.com', 'Dang', 'Mai', '0944444444', '1999-07-11', 40, 920000.00, true);

INSERT INTO spa_services (id, name, description, image_url, price, duration_minutes, is_active)
VALUES
  (1, 'Aromatherapy Massage', 'Massage thư giãn với tinh dầu tự nhiên', '/images/services/aromatherapy.jpg', 450000.00, 60, true),
  (2, 'Deep Tissue Massage', 'Giảm căng cơ chuyên sâu cho dân văn phòng', '/images/services/deep-tissue.jpg', 650000.00, 75, true),
  (3, 'Facial Care', 'Chăm sóc da mặt phục hồi và cấp ẩm', '/images/services/facial-care.jpg', 520000.00, 50, true),
  (4, 'Hot Stone Therapy', 'Massage đá nóng giúp thư giãn toàn thân', '/images/services/hot-stone.jpg', 780000.00, 90, true),
  (5, 'Body Scrub', 'Tẩy tế bào chết toàn thân', '/images/services/body-scrub.jpg', 390000.00, 45, false);

INSERT INTO therapists (id, user_id, specialization, experience_years, is_available)
VALUES
  (1, 2, 'Massage trị liệu và thư giãn', 6, true),
  (2, 3, 'Chăm sóc da và facial chuyên sâu', 4, true),
  (3, 4, 'Massage body và đá nóng', 8, false);

INSERT INTO appointments (id, customer_id, service_id, therapist_id, appointment_date, end_time, status, notes)
VALUES
  (1, 1, 1, 1, '2026-06-03 09:00:00', '2026-06-03 10:00:00', 'SCHEDULED', 'Khách muốn phòng yên tĩnh'),
  (2, 2, 3, 2, '2026-06-03 11:30:00', '2026-06-03 12:20:00', 'COMPLETED', 'Đã hoàn thành tốt'),
  (3, 3, 4, 3, '2026-06-04 14:00:00', '2026-06-04 15:30:00', 'CANCELLED', 'Khách đổi lịch'),
  (4, 4, 2, null, '2026-06-05 16:00:00', '2026-06-05 17:15:00', 'SCHEDULED', 'Chờ phân công chuyên viên'),
  (5, 1, 2, 1, '2026-06-06 13:00:00', '2026-06-06 14:15:00', 'SCHEDULED', 'Khách quay lại sau 2 tuần');

INSERT INTO invoices (id, appointment_id, customer_id, total_amount, tax_amount, discount_amount, payment_status, issued_at, due_at, paid_at)
VALUES
  (1, 1, 1, 495000.00, 45000.00, 0.00, 'PENDING', '2026-06-03 08:30:00', '2026-06-05 23:59:59', null),
  (2, 2, 2, 572000.00, 52000.00, 0.00, 'PAID', '2026-06-03 11:00:00', '2026-06-04 23:59:59', '2026-06-03 12:30:00'),
  (3, 3, 3, 858000.00, 78000.00, 0.00, 'OVERDUE', '2026-06-04 13:30:00', '2026-06-05 23:59:59', null),
  (4, 5, 1, 495000.00, 45000.00, 0.00, 'PENDING', '2026-06-06 12:30:00', '2026-06-08 23:59:59', null);

SELECT setval(pg_get_serial_sequence('users', 'id'), COALESCE((SELECT MAX(id) FROM users), 1), true);
SELECT setval(pg_get_serial_sequence('customers', 'id'), COALESCE((SELECT MAX(id) FROM customers), 1), true);
SELECT setval(pg_get_serial_sequence('spa_services', 'id'), COALESCE((SELECT MAX(id) FROM spa_services), 1), true);
SELECT setval(pg_get_serial_sequence('therapists', 'id'), COALESCE((SELECT MAX(id) FROM therapists), 1), true);
SELECT setval(pg_get_serial_sequence('appointments', 'id'), COALESCE((SELECT MAX(id) FROM appointments), 1), true);
SELECT setval(pg_get_serial_sequence('invoices', 'id'), COALESCE((SELECT MAX(id) FROM invoices), 1), true);

SELECT 'Seed data loaded successfully' AS status;