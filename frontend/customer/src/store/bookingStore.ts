'use client';
import { create } from 'zustand';
import { Service, Therapist } from '@/types';

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

interface BookingData {
  service: Service | null;
  therapist: Therapist | null;
  date: string;
  time: string;
  customerInfo: CustomerInfo;
}

interface BookingState {
  currentStep: number;
  bookingData: BookingData;
  setService: (service: Service) => void;
  setTherapist: (therapist: Therapist | null) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetBooking: () => void;
}

const initialBookingData: BookingData = {
  service: null,
  therapist: null,
  date: '',
  time: '',
  customerInfo: {
    name: '',
    email: '',
    phone: '',
    notes: '',
  },
};

export const useBookingStore = create<BookingState>((set) => ({
  currentStep: 1,
  bookingData: initialBookingData,

  setService: (service) =>
    set((state) => ({
      bookingData: { ...state.bookingData, service },
    })),

  setTherapist: (therapist) =>
    set((state) => ({
      bookingData: { ...state.bookingData, therapist },
    })),

  setDate: (date) =>
    set((state) => ({
      bookingData: { ...state.bookingData, date },
    })),

  setTime: (time) =>
    set((state) => ({
      bookingData: { ...state.bookingData, time },
    })),

  setCustomerInfo: (customerInfo) =>
    set((state) => ({
      bookingData: { ...state.bookingData, customerInfo },
    })),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 5),
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),

  resetBooking: () =>
    set({
      currentStep: 1,
      bookingData: initialBookingData,
    }),
}));
