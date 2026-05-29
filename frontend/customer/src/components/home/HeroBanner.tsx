'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Khách hàng' },
  { value: '15+', label: 'Dịch vụ' },
  { value: '8+', label: 'Chuyên viên' },
];

export default function HeroBanner() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-cream via-champagne to-spaGreen/30">
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-spaGreen/20 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-nude/40 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-56 h-56 rounded-full bg-gold/10 blur-2xl -translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <Sparkles size={16} className="text-gold" />
              <span className="text-gold text-sm font-medium uppercase tracking-widest">
                Spa Cao Cấp Số 1 Việt Nam
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark leading-tight mb-6"
            >
              Trải Nghiệm{' '}
              <span className="text-gold">Thư Giãn</span>{' '}
              Tuyệt Vời
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-spa-gray text-lg leading-relaxed mb-8 max-w-lg"
            >
              Không gian spa cao cấp, dịch vụ chăm sóc sức khỏe và sắc đẹp hàng đầu. Hãy để chúng tôi giúp bạn tái tạo năng lượng và tìm lại sự cân bằng trong cuộc sống.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link
                href="/dat-lich"
                className="flex items-center gap-2 bg-gold text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 transition-all duration-300 shadow-lg shadow-gold/30"
              >
                <Calendar size={18} />
                Đặt lịch ngay
              </Link>
              <Link
                href="/dich-vu"
                className="flex items-center gap-2 border-2 border-dark text-dark px-8 py-4 rounded-full font-semibold hover:bg-dark hover:text-white transition-all duration-300"
              >
                Xem dịch vụ
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-8"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-gold">{stat.value}</p>
                  <p className="text-sm text-spa-gray mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://picsum.photos/seed/hero1/800/600"
                  alt="Lotus Spa"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-spaGreen flex items-center justify-center">
                  <Sparkles size={20} className="text-dark" />
                </div>
                <div>
                  <p className="font-bold text-dark text-sm">Đánh giá 5 sao</p>
                  <p className="text-xs text-spa-gray">Từ 500+ khách hàng</p>
                </div>
              </motion.div>
              {/* Another floating card */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4"
              >
                <p className="text-gold font-bold text-2xl">30%</p>
                <p className="text-xs text-spa-gray">Ưu đãi hôm nay</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
