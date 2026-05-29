'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Star, Calendar } from 'lucide-react';
import { Service } from '@/types';
import { formatPrice, formatDuration } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="green">{service.category}</Badge>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
          <Star size={12} className="text-gold fill-gold" />
          <span className="text-xs font-bold text-dark">{service.rating}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-dark text-lg mb-2 leading-tight">{service.name}</h3>
        <p className="text-spa-gray text-sm leading-relaxed mb-3 line-clamp-2">
          {service.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-spa-gray mb-4">
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-spaGreen" />
            <span>{formatDuration(service.duration)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-gold" />
            <span>{service.reviewCount} đánh giá</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-gold font-bold text-xl">{formatPrice(service.price)}</span>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/dat-lich?service=${service.id}`}
            className="flex-1 flex items-center justify-center gap-1 bg-gold text-white py-2.5 rounded-xl text-sm font-medium hover:bg-yellow-600 transition-colors"
          >
            <Calendar size={14} />
            Đặt lịch
          </Link>
          <Link
            href={`/dich-vu/${service.id}`}
            className="flex-1 flex items-center justify-center border-2 border-gold text-gold py-2.5 rounded-xl text-sm font-medium hover:bg-gold hover:text-white transition-colors"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
