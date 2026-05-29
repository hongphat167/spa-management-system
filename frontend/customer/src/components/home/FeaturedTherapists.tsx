'use client';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { therapists } from '@/lib/mockData';

function TherapistCard({ therapist, index }: { therapist: typeof therapists[0]; index: number }) {
  const initials = therapist.name
    .split(' ')
    .slice(-2)
    .map((n) => n[0])
    .join('');

  const colors = [
    'bg-spaGreen',
    'bg-champagne',
    'bg-nude',
    'bg-spaGreen/70',
    'bg-champagne/80',
    'bg-nude/70',
    'bg-spaGreen/50',
    'bg-champagne/60',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 text-center"
    >
      <div
        className={`w-20 h-20 rounded-full ${colors[index % colors.length]} flex items-center justify-center mx-auto mb-4 text-dark font-bold text-xl shadow-md`}
      >
        {initials}
      </div>
      <h3 className="font-bold text-dark text-lg mb-1">{therapist.name}</h3>
      <p className="text-gold text-sm font-medium mb-2">{therapist.specialty}</p>
      <div className="flex items-center justify-center gap-1 mb-3">
        <Star size={14} className="text-gold fill-gold" />
        <span className="text-sm text-dark font-medium">{therapist.rating}</span>
        <span className="text-xs text-spa-gray">({therapist.experience} năm)</span>
      </div>
      <p className="text-spa-gray text-xs leading-relaxed line-clamp-3">{therapist.bio}</p>
    </motion.div>
  );
}

export default function FeaturedTherapists() {
  return (
    <section className="py-20 bg-champagne/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-sm font-medium uppercase tracking-widest mb-2">
            Tay Nghề Xuất Sắc
          </p>
          <h2 className="text-4xl font-bold text-dark mb-4">Đội Ngũ Chuyên Viên</h2>
          <p className="text-spa-gray text-lg max-w-2xl mx-auto">
            Các chuyên viên của chúng tôi được đào tạo chuyên sâu với nhiều năm kinh nghiệm, mang lại dịch vụ chăm sóc tốt nhất cho bạn
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {therapists.map((therapist, index) => (
            <TherapistCard key={therapist.id} therapist={therapist} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
