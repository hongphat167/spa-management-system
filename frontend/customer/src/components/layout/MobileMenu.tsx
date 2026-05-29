'use client';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const navLinks = [
  { href: '/', label: 'Trang Chủ' },
  { href: '/dich-vu', label: 'Dịch Vụ' },
  { href: '/san-pham', label: 'Sản Phẩm' },
  { href: '/dat-lich', label: 'Đặt Lịch' },
  { href: '/lien-he', label: 'Liên Hệ' },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-72 bg-cream z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-nude">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-spaGreen flex items-center justify-center">
                  <span className="text-dark font-bold text-xs">L</span>
                </div>
                <span className="font-bold text-dark">
                  Lotus <span className="text-gold">Spa</span>
                </span>
              </div>
              <button onClick={onClose} className="text-dark hover:text-gold transition-colors">
                <X size={22} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 p-5">
              <ul className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block py-3 px-4 rounded-xl text-dark hover:bg-spaGreen hover:text-dark transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Auth Area */}
            <div className="p-5 border-t border-nude">
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-spaGreen flex items-center justify-center">
                      <User size={18} className="text-dark" />
                    </div>
                    <div>
                      <p className="font-medium text-dark text-sm">{user.name}</p>
                      <p className="text-xs text-spa-gray">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/tai-khoan"
                    onClick={onClose}
                    className="block py-2 px-4 rounded-xl text-dark hover:bg-spaGreen transition-colors text-sm"
                  >
                    Tài khoản của tôi
                  </Link>
                  <Link
                    href="/lich-hen"
                    onClick={onClose}
                    className="block py-2 px-4 rounded-xl text-dark hover:bg-spaGreen transition-colors text-sm"
                  >
                    Lịch hẹn của tôi
                  </Link>
                  <button
                    onClick={() => { logout(); onClose(); }}
                    className="w-full text-left py-2 px-4 rounded-xl text-red-500 hover:bg-red-50 transition-colors text-sm"
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/dang-nhap"
                    onClick={onClose}
                    className="block w-full text-center py-3 border-2 border-gold text-gold rounded-full font-medium hover:bg-gold hover:text-white transition-colors"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/dang-ky"
                    onClick={onClose}
                    className="block w-full text-center py-3 bg-gold text-white rounded-full font-medium hover:bg-yellow-600 transition-colors"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
