export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  loyaltyPoints: number;
}

export interface SpaService {
  id: number;
  name: string;
  description: string;
  category: string;
  duration: number;
  price: number;
}

export interface Appointment {
  id: number;
  customer: string;
  therapist: string;
  service: string;
  time: string;
  status: "scheduled" | "inProgress" | "completed" | "cancelled";
}

export interface Invoice {
  id: string;
  customer: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  date: string;
}
