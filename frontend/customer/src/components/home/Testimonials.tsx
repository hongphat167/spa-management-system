'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { reviews } from '@/lib/mockData';

export default function Testimonials() {
  const featured = reviews.slice(0, 3);

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-sm font-medium uppercase tracking-widest mb-2">
            Phản Hồi Thực Tế
          </p>
          <h2 className="text-4xl font-bold text-dark mb-4">Khách Hàng Nói Gì</h2>
          <p className="text-spa-gray text-lg max-w-2xl mx-auto">
            Những trải nghiệm thực tế từ khách hàng đã tin tưởng và sử dụng dịch vụ của Lotus Spa
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <Quote size={36} className="text-spaGreen/40 absolute top-4 right-4" />
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? 'text-gold fill-gold' : 'text-gray-300'}
                  />
                ))}
                <span className="text-sm text-spa-gray ml-1">({review.rating}/5)</span>
              </div>
              <p className="text-dark text-sm leading-relaxed mb-4 italic">
                &ldquo;{review.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-cream">
                <div className="w-10 h-10 rounded-full bg-spaGreen flex items-center justify-center text-dark font-bold text-sm">
                  {review.customerName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-dark text-sm">{review.customerName}</p>
                  <p className="text-xs text-spa-gray">
                    {new Date(review.date).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-spaGreen/20 to-champagne rounded-2xl p-8 grid grid-cols-3 gap-4 text-center"
        >
          <div>
            <p className="text-4xl font-bold text-gold">4.9</p>
            <div className="flex justify-center my-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="text-gold fill-gold" />
              ))}
            </div>
            <p className="text-spa-gray text-sm">Đánh giá trung bình</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gold">500+</p>
            <p className="text-spa-gray text-sm mt-1">Khách hàng hài lòng</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-gold">98%</p>
            <p className="text-spa-gray text-sm mt-1">Tỷ lệ quay lại</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
