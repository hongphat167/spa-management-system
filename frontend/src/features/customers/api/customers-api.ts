import { apiClient } from "@/services/api-client";
import type { Customer } from "@/features/customers/types/customer";

const fallback: Customer[] = [
  { id: "1", fullName: "Olivia Martin", email: "olivia@example.com", phone: "0900000001", loyaltyPoints: 120 },
  { id: "2", fullName: "Ethan Lee", email: "ethan@example.com", phone: "0900000002", loyaltyPoints: 75 },
];

export async function getCustomers() {
  try {
    return await apiClient.get<Customer[]>("/customers").then((res) => res.data);
  } catch {
    return fallback;
  }
}
