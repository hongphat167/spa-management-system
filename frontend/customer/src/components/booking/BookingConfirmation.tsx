'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, Calendar, Clock, User, Mail, Phone, Sparkles } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import { formatPrice, formatDuration } from '@/lib/utils';
import { submitPublicBooking } from '@/lib/api';

export default function BookingConfirmation() {
  const [confirmed, setConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { bookingData, resetBooking } = useBookingStore();
  const { service, therapist, date, time, customerInfo } = bookingData;

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await submitPublicBooking(bookingData);
      setConfirmed(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Không thể xác nhận đặt lịch');
    } finally {
      setIsLoading(false);
    }
  };

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="w-24 h-24 rounded-full bg-spaGreen flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={48} className="text-dark" />
        </motion.div>
        <h2 className="text-3xl font-bold text-dark mb-3">Đặt Lịch Thành Công!</h2>
        <p className="text-spa-gray text-lg mb-6 max-w-md mx-auto">
          Chúng tôi đã nhận được yêu cầu đặt lịch của bạn. Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.
        </p>
        <div className="bg-champagne rounded-2xl p-5 max-w-sm mx-auto mb-8 text-left">
          <p className="text-sm text-dark">
            <span className="font-semibold">Dịch vụ:</span> {service?.name}
          </p>
          <p className="text-sm text-dark mt-1">
            <span className="font-semibold">Ngày giờ:</span>{' '}
            {date && new Date(date).toLocaleDateString('vi-VN')} lúc {time}
          </p>
          <p className="text-sm text-dark mt-1">
            <span className="font-semibold">Liên hệ:</span> {customerInfo.phone}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="bg-gold text-white px-8 py-3 rounded-full font-medium hover:bg-yellow-600 transition-colors"
            onClick={resetBooking}
          >
            Về trang chủ
          </Link>
          <button
            onClick={resetBooking}
            className="border-2 border-gold text-gold px-8 py-3 rounded-full font-medium hover:bg-gold hover:text-white transition-colors"
          >
            Đặt lịch mới
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-dark mb-2">Xác Nhận Đặt Lịch</h2>
      <p className="text-spa-gray mb-6">Vui lòng kiểm tra lại thông tin trước khi xác nhận</p>

      <div className="space-y-4">
        {/* Service info */}
        {service && (
          <div className="bg-white rounded-2xl p-5 border border-nude">
            <h3 className="text-sm font-semibold text-spa-gray uppercase mb-3 flex items-center gap-2">
              <Sparkles size={14} className="text-gold" /> Dịch vụ đã chọn
            </h3>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-dark text-lg">{service.name}</p>
                <p className="text-spa-gray text-sm">{service.category} • {formatDuration(service.duration)}</p>
              </div>
              <span className="text-gold font-bold text-xl">{formatPrice(service.price)}</span>
            </div>
          </div>
        )}

        {/* Therapist */}
        <div className="bg-white rounded-2xl p-5 border border-nude">
          <h3 className="text-sm font-semibold text-spa-gray uppercase mb-3 flex items-center gap-2">
            <User size={14} className="text-gold" /> Chuyên viên
          </h3>
          <p className="font-medium text-dark">
            {therapist ? therapist.name : 'Không có sở thích (sẽ được phân công)'}
          </p>
          {therapist && <p className="text-sm text-spa-gray">{therapist.specialty}</p>}
        </div>

        {/* Date & Time */}
        <div className="bg-white rounded-2xl p-5 border border-nude">
          <h3 className="text-sm font-semibold text-spa-gray uppercase mb-3 flex items-center gap-2">
            <Calendar size={14} className="text-gold" /> Ngày & Giờ
          </h3>
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-spa-gray mb-1">Ngày</p>
              <p className="font-medium text-dark">
                {date ? new Date(date).toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '—'}
              </p>
            </div>
            <div>
              <p className="text-xs text-spa-gray mb-1">Giờ</p>
              <p className="font-medium text-dark flex items-center gap-1">
                <Clock size={14} className="text-gold" /> {time || '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Customer info */}
        <div className="bg-white rounded-2xl p-5 border border-nude">
          <h3 className="text-sm font-semibold text-spa-gray uppercase mb-3 flex items-center gap-2">
            <User size={14} className="text-gold" /> Thông tin khách hàng
          </h3>
          <div className="space-y-1.5">
            <p className="flex items-center gap-2 text-dark text-sm">
              <User size={13} className="text-spa-gray" /> {customerInfo.name || '—'}
            </p>
            <p className="flex items-center gap-2 text-dark text-sm">
              <Mail size={13} className="text-spa-gray" /> {customerInfo.email || '—'}
            </p>
            <p className="flex items-center gap-2 text-dark text-sm">
              <Phone size={13} className="text-spa-gray" /> {customerInfo.phone || '—'}
            </p>
            {customerInfo.notes && (
              <p className="text-spa-gray text-sm mt-2 italic">📝 {customerInfo.notes}</p>
            )}
          </div>
        </div>

        {/* Total */}
        {service && (
          <div className="bg-champagne rounded-2xl p-5 flex justify-between items-center">
            <span className="font-semibold text-dark text-lg">Tổng cộng</span>
            <span className="text-2xl font-bold text-gold">{formatPrice(service.price)}</span>
          </div>
        )}
      </div>

      <button
        onClick={handleConfirm}
        disabled={isLoading}
        className="w-full mt-6 bg-gold text-white py-4 rounded-full font-semibold text-lg hover:bg-yellow-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Đang xử lý...
          </>
        ) : (
          <>
            <CheckCircle size={20} />
            Xác nhận đặt lịch
          </>
        )}
      </button>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
    </div>
  );
}
