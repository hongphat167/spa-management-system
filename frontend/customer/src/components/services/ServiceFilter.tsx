'use client';
import { cn } from '@/lib/utils';

interface ServiceFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function ServiceFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: ServiceFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onCategoryChange('all')}
        className={cn(
          'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
          selectedCategory === 'all'
            ? 'bg-gold text-white shadow-md shadow-gold/30'
            : 'bg-white text-spa-gray border border-nude hover:border-gold hover:text-gold'
        )}
      >
        Tất cả
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
            selectedCategory === category
              ? 'bg-gold text-white shadow-md shadow-gold/30'
              : 'bg-white text-spa-gray border border-nude hover:border-gold hover:text-gold'
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
