import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-spaGreen flex items-center justify-center">
                <span className="text-dark font-bold text-sm">L</span>
              </div>
              <span className="text-xl font-bold">
                Lotus <span className="text-gold">Spa</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Không gian spa cao cấp, nơi bạn tìm lại sự thư giãn và cân bằng trong cuộc sống hiện đại. Chúng tôi cam kết mang đến trải nghiệm chăm sóc sức khỏe và sắc đẹp tốt nhất.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-spaGreen hover:text-dark transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-spaGreen hover:text-dark transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-spaGreen hover:text-dark transition-colors"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gold">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              {[
                { href: '/dich-vu', label: 'Dịch vụ' },
                { href: '/san-pham', label: 'Sản phẩm' },
                { href: '/dat-lich', label: 'Đặt lịch' },
                { href: '/lien-he', label: 'Liên hệ' },
                { href: '/dang-nhap', label: 'Đăng nhập' },
                { href: '/dang-ky', label: 'Đăng ký' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-spaGreen transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gold">Dịch Vụ Nổi Bật</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {[
                'Massage Thư Giãn Toàn Thân',
                'Chăm Sóc Da Mặt',
                'Massage Đá Nóng',
                'Tắm Dưỡng Trắng Da',
                'Massage Thái Cổ Truyền',
                'Facial Trẻ Hóa Da',
              ].map((service) => (
                <li key={service} className="hover:text-spaGreen transition-colors cursor-pointer">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gold">Liên Hệ</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={16} className="text-spaGreen mt-0.5 flex-shrink-0" />
                <span>123 Đường Nguyễn Huệ, Quận 1, TP.HCM</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={16} className="text-spaGreen flex-shrink-0" />
                <span>0123 456 789</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={16} className="text-spaGreen flex-shrink-0" />
                <span>info@lotusspa.vn</span>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-white mb-2">Giờ Làm Việc</h4>
              <div className="text-gray-400 text-sm space-y-1">
                <p>Thứ 2 - Thứ 6: 9:00 - 21:00</p>
                <p>Thứ 7 - Chủ Nhật: 8:00 - 22:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-sm">© 2024 Lotus Spa. Bảo lưu mọi quyền.</p>
          <p className="text-gray-500 text-sm">Thiết kế với ❤️ cho sức khỏe và sắc đẹp của bạn</p>
        </div>
      </div>
    </footer>
  );
}
