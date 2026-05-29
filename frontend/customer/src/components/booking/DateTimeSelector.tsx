'use client';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import { cn } from '@/lib/utils';

const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

export default function DateTimeSelector() {
  const { bookingData, setDate, setTime } = useBookingStore();

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <h2 className="text-2xl font-bold text-dark mb-2">Chọn Ngày & Giờ</h2>
      <p className="text-spa-gray mb-6">Chọn ngày và khung giờ phù hợp với lịch của bạn</p>

      {/* Date Picker */}
      <div className="mb-8">
        <label className="flex items-center gap-2 text-dark font-semibold mb-3">
          <Calendar size={18} className="text-gold" />
          Ngày hẹn
        </label>
        <input
          type="date"
          min={today}
          value={bookingData.date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full max-w-xs px-4 py-3 border-2 border-nude rounded-xl bg-cream focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all text-dark"
        />
        {bookingData.date && (
          <p className="text-sm text-spa-gray mt-2">
            Ngày đã chọn:{' '}
            <span className="text-gold font-medium">
              {new Date(bookingData.date).toLocaleDateString('vi-VN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </p>
        )}
      </div>

      {/* Time Slots */}
      <div>
        <label className="flex items-center gap-2 text-dark font-semibold mb-3">
          <Clock size={18} className="text-gold" />
          Khung Giờ
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {timeSlots.map((time, index) => (
            <motion.button
              key={time}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.04 }}
              onClick={() => setTime(time)}
              className={cn(
                'py-3 px-2 rounded-xl text-sm font-medium transition-all duration-200 border-2',
                bookingData.time === time
                  ? 'bg-gold text-white border-gold shadow-md shadow-gold/30'
                  : 'bg-white text-dark border-nude hover:border-gold hover:text-gold'
              )}
            >
              {time}
            </motion.button>
          ))}
        </div>
      </div>

      {bookingData.date && bookingData.time && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-spaGreen/20 rounded-xl p-4 border border-spaGreen"
        >
          <p className="text-dark font-medium">
            ✅ Bạn đã chọn:{' '}
            <span className="text-gold">
              {new Date(bookingData.date).toLocaleDateString('vi-VN')}{' '}
              lúc {bookingData.time}
            </span>
          </p>
        </motion.div>
      )}
    </div>
  );
}
