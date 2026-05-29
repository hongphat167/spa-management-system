export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Star, Calendar, CheckCircle, ArrowLeft } from 'lucide-react';
import { fetchConfiguredServices } from '@/lib/api';
import { formatPrice, formatDuration } from '@/lib/utils';

interface Props {
  params: { id: string };
}

export default async function ServiceDetailPage({ params }: Props) {
  const services = await fetchConfiguredServices();
  const service = services.find((s) => s.id === params.id);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/dich-vu"
          className="inline-flex items-center gap-2 text-spa-gray hover:text-gold transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Quay lại danh sách
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div>
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-80 object-cover"
              />
            </div>

            <div className="mt-6 rounded-2xl bg-white p-4 text-sm text-spa-gray">
              Chuyên viên sẽ được phân công phù hợp theo lịch trống khi bạn đặt lịch.
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="inline-block text-xs bg-spaGreen text-dark px-3 py-1 rounded-full font-medium mb-3">
              {service.category}
            </div>
            <h1 className="text-3xl font-bold text-dark mb-3">{service.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star size={16} className="text-gold fill-gold" />
                <span className="font-semibold text-dark">{service.rating}</span>
                <span className="text-spa-gray text-sm">({service.reviewCount} đánh giá)</span>
              </div>
              <div className="flex items-center gap-1 text-spa-gray text-sm">
                <Clock size={14} className="text-spaGreen" />
                <span>{formatDuration(service.duration)}</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-gold mb-6">
              {formatPrice(service.price)}
            </div>

            <p className="text-spa-gray leading-relaxed mb-6">{service.description}</p>

            {/* Benefits */}
            {service.benefits.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-dark mb-3">Lợi ích của dịch vụ</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-spaGreen flex-shrink-0" />
                      <span className="text-sm text-dark">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex gap-3 flex-wrap">
              <Link
                href={`/dat-lich?service=${service.id}`}
                className="flex items-center gap-2 bg-gold text-white px-8 py-3.5 rounded-full font-semibold hover:bg-yellow-600 transition-colors shadow-lg shadow-gold/30"
              >
                <Calendar size={18} />
                Đặt lịch ngay
              </Link>
              <Link
                href="/lien-he"
                className="border-2 border-dark text-dark px-8 py-3.5 rounded-full font-semibold hover:bg-dark hover:text-white transition-colors"
              >
                Tư vấn miễn phí
              </Link>
            </div>

            {/* Note */}
            <div className="mt-6 bg-champagne rounded-xl p-4 text-sm text-dark">
              <p className="font-semibold mb-1">📋 Lưu ý</p>
              <ul className="text-spa-gray space-y-1">
                <li>• Vui lòng đến trước 15 phút để chuẩn bị</li>
                <li>• Không ăn no trước khi sử dụng dịch vụ</li>
                <li>• Thông báo nếu có dị ứng hay vấn đề sức khỏe</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
