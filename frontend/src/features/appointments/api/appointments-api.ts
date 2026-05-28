import { addDays, formatISO } from "date-fns";
import { apiClient } from "@/services/api-client";
import type { Appointment } from "@/features/appointments/types/appointment";

const now = new Date();
const fallback: Appointment[] = [
  {
    id: "1",
    customerName: "Olivia Martin",
    serviceName: "Hot Stone Massage",
    therapistName: "Anna Nguyen",
    startAt: formatISO(addDays(now, 1)),
    status: "SCHEDULED",
  },
  {
    id: "2",
    customerName: "Ethan Lee",
    serviceName: "Hydrating Facial",
    therapistName: "Mai Tran",
    startAt: formatISO(addDays(now, 2)),
    status: "SCHEDULED",
  },
];

export async function getAppointments() {
  try {
    return await apiClient.get<Appointment[]>("/appointments").then((res) => res.data);
  } catch {
    return fallback;
  }
}
