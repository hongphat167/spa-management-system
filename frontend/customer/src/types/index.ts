export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  benefits: string[];
  therapists: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  ingredients?: string;
  usage?: string;
  stock: number;
}

export interface Therapist {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image: string;
  rating: number;
  experience: number;
  services: string[];
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  therapistId: string;
  therapistName: string;
  date: string;
  time: string;
  price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  serviceId?: string;
  productId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
}

export interface BookingStep {
  service: Service | null;
  therapist: Therapist | null;
  date: string;
  time: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  };
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  validUntil: string;
  image: string;
  code: string;
}
