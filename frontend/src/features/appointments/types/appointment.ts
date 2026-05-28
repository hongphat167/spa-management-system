export type AppointmentStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED";

export interface Appointment {
  id: string;
  customerName: string;
  serviceName: string;
  therapistName: string;
  startAt: string;
  status: AppointmentStatus;
}
