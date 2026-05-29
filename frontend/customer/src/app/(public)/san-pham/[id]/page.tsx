export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, Package, ArrowLeft, ShoppingCart, CheckCircle } from 'lucide-react';
import { products } from '@/lib/mockData';
import { formatPrice } from '@/lib/utils';

interface Props {
  params: { id: string };
}

export default function ProductDetailPage({ params }: Props) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const isDiscounted = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = isDiscounted
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/san-pham"
          className="inline-flex items-center gap-2 text-spa-gray hover:text-gold transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Quay lại danh sách
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div>
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {isDiscounted && (
                <div className="absolute top-4 left-4 bg-gold text-white text-lg font-bold px-4 py-2 rounded-xl">
                  -{discountPercent}%
                </div>
              )}
            </div>

            {/* Rating summary */}
            <div className="mt-4 bg-white rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-spa-gray mb-1">Đánh giá trung bình</p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-gold">{product.rating}</span>
                  <div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-spa-gray">{product.reviewCount} đánh giá</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-spa-gray mb-1">Tình trạng kho</p>
                <div className="flex items-center gap-1">
                  <Package size={14} className={product.stock > 10 ? 'text-spaGreen' : 'text-red-500'} />
                  <span className={`font-medium text-sm ${product.stock > 10 ? 'text-dark' : 'text-red-500'}`}>
                    {product.stock > 10 ? `Còn ${product.stock} sản phẩm` : `Chỉ còn ${product.stock}`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="inline-block text-xs bg-nude text-dark px-3 py-1 rounded-full font-medium mb-3">
              {product.category}
            </div>
            <h1 className="text-3xl font-bold text-dark mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-gold">{formatPrice(product.price)}</span>
              {isDiscounted && (
                <span className="text-spa-gray text-lg line-through">
                  {formatPrice(product.originalPrice!)}
                </span>
              )}
            </div>

            <p className="text-spa-gray leading-relaxed mb-6">{product.description}</p>

            {/* Ingredients */}
            {product.ingredients && (
              <div className="mb-5">
                <h3 className="font-bold text-dark mb-2">Thành phần chính</h3>
                <div className="bg-spaGreen/10 rounded-xl p-4 border border-spaGreen/30">
                  <p className="text-sm text-dark leading-relaxed">{product.ingredients}</p>
                </div>
              </div>
            )}

            {/* Usage */}
            {product.usage && (
              <div className="mb-6">
                <h3 className="font-bold text-dark mb-2">Hướng dẫn sử dụng</h3>
                <div className="bg-champagne rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-gold mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-dark leading-relaxed">{product.usage}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Buy button */}
            <div className="flex gap-3 flex-wrap">
              <button className="flex-1 flex items-center justify-center gap-2 bg-gold text-white px-8 py-3.5 rounded-full font-semibold hover:bg-yellow-600 transition-colors shadow-lg shadow-gold/30">
                <ShoppingCart size={18} />
                Mua ngay
              </button>
              <button className="border-2 border-gold text-gold px-6 py-3.5 rounded-full font-semibold hover:bg-gold hover:text-white transition-colors">
                Thêm vào giỏ
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {['Hàng chính hãng', 'Miễn phí đổi trả', 'Giao hàng nhanh'].map((badge) => (
                <div key={badge} className="text-center p-3 bg-white rounded-xl">
                  <CheckCircle size={18} className="text-spaGreen mx-auto mb-1" />
                  <p className="text-xs text-dark font-medium">{badge}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
