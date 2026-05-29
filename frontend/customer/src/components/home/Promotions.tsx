'use client';
import { motion } from 'framer-motion';
import { Tag, Clock, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { promotions } from '@/lib/mockData';

function PromoCard({ promo, index }: { promo: typeof promotions[0]; index: number }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(promo.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const gradients = [
    'from-gold/20 to-champagne',
    'from-spaGreen/30 to-cream',
    'from-nude to-champagne',
    'from-spaGreen/20 to-nude/50',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`bg-gradient-to-br ${gradients[index % gradients.length]} rounded-2xl p-6 border border-nude/50 hover:shadow-lg transition-shadow`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="bg-gold text-white text-2xl font-bold px-4 py-2 rounded-xl">
          -{promo.discount}%
        </div>
        <Tag size={20} className="text-gold" />
      </div>

      <h3 className="text-lg font-bold text-dark mb-2">{promo.title}</h3>
      <p className="text-spa-gray text-sm leading-relaxed mb-4">{promo.description}</p>

      <div className="flex items-center gap-2 mb-3">
        <Clock size={14} className="text-spa-gray" />
        <span className="text-xs text-spa-gray">
          Hết hạn: {new Date(promo.validUntil).toLocaleDateString('vi-VN')}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 bg-white/70 border border-gold/30 rounded-lg px-3 py-2 text-center">
          <span className="font-mono font-bold text-gold text-sm tracking-widest">
            {promo.code}
          </span>
        </div>
        <button
          onClick={copyCode}
          className="bg-gold text-white p-2 rounded-lg hover:bg-yellow-600 transition-colors"
          title="Sao chép mã"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
    </motion.div>
  );
}

export default function Promotions() {
  return (
    <section className="py-20 bg-champagne/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-sm font-medium uppercase tracking-widest mb-2">
            Tiết Kiệm Hơn
          </p>
          <h2 className="text-4xl font-bold text-dark mb-4">Ưu Đãi Đặc Biệt</h2>
          <p className="text-spa-gray text-lg max-w-2xl mx-auto">
            Đừng bỏ lỡ những ưu đãi hấp dẫn từ Lotus Spa. Sử dụng mã giảm giá để tận hưởng dịch vụ với giá tốt nhất
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {promotions.map((promo, index) => (
            <PromoCard key={promo.id} promo={promo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
