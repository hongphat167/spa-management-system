import type { Appointment } from "@/types";

export const mockAppointments: Appointment[] = [
  { id: 1, customer: "Nguyễn Minh Anh", therapist: "Hà My", service: "Liệu trình thư giãn chuyên sâu", time: "09:00", status: "scheduled" },
  { id: 2, customer: "Trần Quỳnh Hoa", therapist: "Lan Chi", service: "Chăm sóc da mặt cao cấp", time: "10:30", status: "inProgress" },
  { id: 3, customer: "Lê Bảo Ngọc", therapist: "Khánh Linh", service: "Tẩy tế bào chết toàn thân", time: "13:00", status: "completed" },
  { id: 4, customer: "Đỗ Thu Trang", therapist: "Yến Nhi", service: "Gói trị liệu đá nóng", time: "15:30", status: "cancelled" },
  { id: 5, customer: "Võ Khánh Vy", therapist: "Thanh Thảo", service: "Liệu trình phục hồi chuyên biệt", time: "17:00", status: "scheduled" },
];
