'use client';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Package } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isDiscounted = product.originalPrice && product.originalPrice > product.price;
  const isLowStock = product.stock <= 10;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge variant="nude">{product.category}</Badge>
          {isDiscounted && (
            <Badge variant="gold">
              -{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
          <Star size={12} className="text-gold fill-gold" />
          <span className="text-xs font-bold text-dark">{product.rating}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-dark text-base mb-1.5 leading-tight">{product.name}</h3>
        <p className="text-spa-gray text-sm leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-gray-300'}
            />
          ))}
          <span className="text-xs text-spa-gray ml-1">({product.reviewCount})</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-gold font-bold text-lg">{formatPrice(product.price)}</span>
          {isDiscounted && (
            <span className="text-spa-gray text-sm line-through">
              {formatPrice(product.originalPrice!)}
            </span>
          )}
        </div>

        {isLowStock && (
          <div className="flex items-center gap-1 mb-3">
            <Package size={12} className="text-red-500" />
            <span className="text-xs text-red-500 font-medium">
              Chỉ còn {product.stock} sản phẩm
            </span>
          </div>
        )}

        <button className="w-full flex items-center justify-center gap-2 bg-gold text-white py-2.5 rounded-xl text-sm font-medium hover:bg-yellow-600 transition-colors">
          <ShoppingCart size={16} />
          Thêm vào giỏ
        </button>
      </div>
    </motion.div>
  );
}
