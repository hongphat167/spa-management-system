'use client';
import { motion } from 'framer-motion';
import { Star, Check, UserX } from 'lucide-react';
import { therapists } from '@/lib/mockData';
import { useBookingStore } from '@/store/bookingStore';
import { cn } from '@/lib/utils';

export default function TherapistSelector() {
  const { bookingData, setTherapist } = useBookingStore();
  const selectedService = bookingData.service;

  const availableTherapists = selectedService
    ? therapists.filter((t) => t.services.includes(selectedService.id))
    : therapists;

  const displayTherapists = availableTherapists.length > 0 ? availableTherapists : therapists;

  return (
    <div>
      <h2 className="text-2xl font-bold text-dark mb-2">Chọn Chuyên Viên</h2>
      <p className="text-spa-gray mb-6">
        Chọn chuyên viên bạn muốn hoặc để chúng tôi phân công cho bạn
      </p>

      {/* No preference option */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setTherapist(null)}
        className={cn(
          'cursor-pointer rounded-2xl border-2 p-4 mb-4 flex items-center gap-4 transition-all duration-200 hover:shadow-md',
          bookingData.therapist === null
            ? 'border-gold bg-champagne shadow-md'
            : 'border-nude bg-white hover:border-gold/50'
        )}
      >
        <div className="w-12 h-12 rounded-full bg-nude flex items-center justify-center flex-shrink-0">
          <UserX size={20} className="text-spa-gray" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-dark">Không có sở thích</h3>
          <p className="text-sm text-spa-gray">Để chúng tôi phân công chuyên viên phù hợp nhất</p>
        </div>
        {bookingData.therapist === null && (
          <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center">
            <Check size={14} className="text-white" />
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayTherapists.map((therapist, index) => {
          const isSelected = bookingData.therapist?.id === therapist.id;
          const initials = therapist.name.split(' ').slice(-2).map((n) => n[0]).join('');
          const colors = ['bg-spaGreen', 'bg-champagne', 'bg-nude', 'bg-spaGreen/70', 'bg-champagne/80'];

          return (
            <motion.div
              key={therapist.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              onClick={() => setTherapist(therapist)}
              className={cn(
                'relative cursor-pointer rounded-2xl border-2 p-4 transition-all duration-200 hover:shadow-md flex items-start gap-4',
                isSelected
                  ? 'border-gold bg-champagne shadow-md'
                  : 'border-nude bg-white hover:border-gold/50'
              )}
            >
              <div
                className={`w-14 h-14 rounded-full ${colors[index % colors.length]} flex items-center justify-center text-dark font-bold text-lg flex-shrink-0`}
              >
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-dark">{therapist.name}</h3>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gold font-medium mb-1">{therapist.specialty}</p>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={12} className="text-gold fill-gold" />
                  <span className="text-xs text-dark">{therapist.rating}</span>
                  <span className="text-xs text-spa-gray">• {therapist.experience} năm KN</span>
                </div>
                <p className="text-xs text-spa-gray line-clamp-2">{therapist.bio}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
