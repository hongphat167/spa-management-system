import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "@/features/appointments/api/appointments-api";

export function useAppointments() {
  return useQuery({ queryKey: ["appointments"], queryFn: getAppointments });
}
