import type { SpaService } from "@/types";

export const mockServices: SpaService[] = [
  { id: 1, name: "Liệu trình thư giãn chuyên sâu", description: "Giảm căng thẳng và phục hồi năng lượng.", category: "Massage", duration: 60, price: 850000 },
  { id: 2, name: "Chăm sóc da mặt cao cấp", description: "Làm sạch, cấp ẩm và trẻ hóa làn da.", category: "Chăm sóc da", duration: 75, price: 1200000 },
  { id: 3, name: "Tẩy tế bào chết toàn thân", description: "Làm mịn và cải thiện độ sáng da.", category: "Body Care", duration: 45, price: 650000 },
  { id: 4, name: "Gói trị liệu đá nóng", description: "Thả lỏng cơ bắp với liệu pháp đá nóng.", category: "Massage", duration: 90, price: 1400000 },
  { id: 5, name: "Liệu trình phục hồi chuyên biệt", description: "Phù hợp khách hàng cần phục hồi sau căng thẳng kéo dài.", category: "Wellness", duration: 120, price: 1800000 },
];
