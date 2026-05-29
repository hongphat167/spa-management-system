'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ServiceCard from '@/components/services/ServiceCard';
import { fetchConfiguredServices } from '@/lib/api';
import { Service } from '@/types';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturedServices() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    let active = true;

    async function loadServices() {
      try {
        const result = await fetchConfiguredServices();
        if (active) {
          setServices(result.slice(0, 6));
        }
      } catch {
        if (active) {
          setServices([]);
        }
      }
    }

    loadServices();

    return () => {
      active = false;
    };
  }, []);

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
            Chất Lượng Hàng Đầu
          </p>
          <h2 className="text-4xl font-bold text-dark mb-4">Dịch Vụ Nổi Bật</h2>
          <p className="text-spa-gray text-lg max-w-2xl mx-auto">
            Khám phá các dịch vụ spa cao cấp được thiết kế riêng để mang đến trải nghiệm thư giãn và chăm sóc sức khỏe toàn diện nhất
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            href="/dich-vu"
            className="inline-flex items-center gap-2 border-2 border-gold text-gold px-8 py-3 rounded-full font-medium hover:bg-gold hover:text-white transition-all duration-300"
          >
            Xem tất cả dịch vụ
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
