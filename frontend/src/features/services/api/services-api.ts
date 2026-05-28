import { apiClient } from "@/services/api-client";
import type { SpaService } from "@/features/services/types/service";

const fallback: SpaService[] = [
  { id: "1", name: "Hot Stone Massage", category: "Massage", price: 60, durationMinutes: 60, active: true },
  { id: "2", name: "Hydrating Facial", category: "Facial", price: 45, durationMinutes: 45, active: true },
];

export async function getServices() {
  try {
    return await apiClient.get<SpaService[]>("/services").then((res) => res.data);
  } catch {
    return fallback;
  }
}
