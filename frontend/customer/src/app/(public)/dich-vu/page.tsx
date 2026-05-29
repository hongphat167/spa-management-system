'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { services } from '@/lib/mockData';
import ServiceCard from '@/components/services/ServiceCard';
import ServiceFilter from '@/components/services/ServiceFilter';

export default function DichVuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    return Array.from(new Set(services.map((s) => s.category)));
  }, []);

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="text-gold text-sm font-medium uppercase tracking-widest mb-2">
            Trải Nghiệm Cao Cấp
          </p>
          <h1 className="text-4xl font-bold text-dark mb-4">Dịch Vụ Spa</h1>
          <p className="text-spa-gray text-lg max-w-2xl mx-auto">
            Khám phá đầy đủ các dịch vụ chăm sóc sức khỏe và sắc đẹp cao cấp tại Lotus Spa
          </p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-spa-gray" />
          <input
            type="text"
            placeholder="Tìm kiếm dịch vụ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border-2 border-nude rounded-full bg-white focus:outline-none focus:border-gold transition-all text-dark"
          />
        </div>

        {/* Filter */}
        <ServiceFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Results count */}
        <p className="text-spa-gray text-sm mb-6">
          Tìm thấy <span className="text-gold font-medium">{filtered.length}</span> dịch vụ
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <motion.div
            key={selectedCategory + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-spa-gray text-lg">Không tìm thấy dịch vụ phù hợp</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-4 text-gold hover:underline"
            >
              Xem tất cả dịch vụ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
