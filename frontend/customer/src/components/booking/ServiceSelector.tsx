'use client';
import { motion } from 'framer-motion';
import { Clock, Star, Check } from 'lucide-react';
import { services } from '@/lib/mockData';
import { useBookingStore } from '@/store/bookingStore';
import { formatPrice, formatDuration } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function ServiceSelector() {
  const { bookingData, setService } = useBookingStore();

  return (
    <div>
      <h2 className="text-2xl font-bold text-dark mb-2">Chọn Dịch Vụ</h2>
      <p className="text-spa-gray mb-6">Vui lòng chọn dịch vụ bạn muốn sử dụng</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => {
          const isSelected = bookingData.service?.id === service.id;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              onClick={() => setService(service)}
              className={cn(
                'relative cursor-pointer rounded-2xl border-2 p-4 transition-all duration-200 hover:shadow-md',
                isSelected
                  ? 'border-gold bg-champagne shadow-md'
                  : 'border-nude bg-white hover:border-gold/50'
              )}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gold flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              )}
              <div className="mb-2">
                <span className="inline-block text-xs bg-spaGreen text-dark px-2 py-0.5 rounded-full font-medium">
                  {service.category}
                </span>
              </div>
              <h3 className="font-bold text-dark mb-1 pr-6">{service.name}</h3>
              <p className="text-xs text-spa-gray line-clamp-2 mb-3">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-gold font-bold">{formatPrice(service.price)}</span>
                <div className="flex items-center gap-3 text-xs text-spa-gray">
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {formatDuration(service.duration)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={11} className="text-gold" />
                    {service.rating}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
