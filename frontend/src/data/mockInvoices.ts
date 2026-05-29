import type { Invoice } from "@/types";

export const mockInvoices: Invoice[] = [
  { id: "INV-2026-001", customer: "Nguyễn Minh Anh", amount: 850000, status: "paid", date: "2026-05-20" },
  { id: "INV-2026-002", customer: "Trần Quỳnh Hoa", amount: 1200000, status: "pending", date: "2026-05-22" },
  { id: "INV-2026-003", customer: "Lê Bảo Ngọc", amount: 650000, status: "overdue", date: "2026-05-18" },
  { id: "INV-2026-004", customer: "Đỗ Thu Trang", amount: 1400000, status: "paid", date: "2026-05-24" },
  { id: "INV-2026-005", customer: "Võ Khánh Vy", amount: 1800000, status: "pending", date: "2026-05-26" },
];
