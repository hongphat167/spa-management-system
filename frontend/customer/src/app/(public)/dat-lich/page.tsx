'use client';
import { motion } from 'framer-motion';
import { useBookingStore } from '@/store/bookingStore';
import ServiceSelector from '@/components/booking/ServiceSelector';
import TherapistSelector from '@/components/booking/TherapistSelector';
import DateTimeSelector from '@/components/booking/DateTimeSelector';
import CustomerForm from '@/components/booking/CustomerForm';
import BookingConfirmation from '@/components/booking/BookingConfirmation';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, label: 'Dịch vụ' },
  { id: 2, label: 'Chuyên viên' },
  { id: 3, label: 'Ngày & Giờ' },
  { id: 4, label: 'Thông tin' },
  { id: 5, label: 'Xác nhận' },
];

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300',
                currentStep === step.id
                  ? 'bg-gold text-white shadow-lg shadow-gold/30'
                  : currentStep > step.id
                  ? 'bg-spaGreen text-dark'
                  : 'bg-nude text-spa-gray'
              )}
            >
              {currentStep > step.id ? '✓' : step.id}
            </div>
            <span
              className={cn(
                'text-xs mt-1.5 font-medium hidden sm:block',
                currentStep === step.id ? 'text-gold' : 'text-spa-gray'
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                'h-0.5 w-10 sm:w-16 mx-1 sm:mx-2 transition-all duration-300',
                currentStep > step.id ? 'bg-spaGreen' : 'bg-nude'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function DatLichPage() {
  const { currentStep, nextStep, prevStep, bookingData } = useBookingStore();

  const canNext = () => {
    switch (currentStep) {
      case 1: return bookingData.service !== null;
      case 2: return true; // therapist is optional
      case 3: return bookingData.date !== '' && bookingData.time !== '';
      case 4: return (
        bookingData.customerInfo.name.length >= 2 &&
        bookingData.customerInfo.email.includes('@') &&
        bookingData.customerInfo.phone.length >= 10
      );
      default: return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <ServiceSelector />;
      case 2: return <TherapistSelector />;
      case 3: return <DateTimeSelector />;
      case 4: return <CustomerForm />;
      case 5: return <BookingConfirmation />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-gold text-sm font-medium uppercase tracking-widest mb-2">
            Chỉ Vài Bước Đơn Giản
          </p>
          <h1 className="text-4xl font-bold text-dark">Đặt Lịch Hẹn</h1>
        </motion.div>

        {/* Step indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Step content */}
        <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 min-h-[400px]">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </div>

        {/* Navigation */}
        {currentStep < 5 && (
          <div className="flex justify-between mt-6">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 border-2 border-nude text-spa-gray px-6 py-3 rounded-full font-medium hover:border-gold hover:text-gold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Quay lại
            </button>
            <button
              onClick={nextStep}
              disabled={!canNext()}
              className="flex items-center gap-2 bg-gold text-white px-8 py-3 rounded-full font-medium hover:bg-yellow-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Tiếp theo →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
