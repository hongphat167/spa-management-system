'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import MobileMenu from './MobileMenu';

const navLinks = [
  { href: '/', label: 'Trang Chủ' },
  { href: '/dich-vu', label: 'Dịch Vụ' },
  { href: '/san-pham', label: 'Sản Phẩm' },
  { href: '/dat-lich', label: 'Đặt Lịch' },
  { href: '/lien-he', label: 'Liên Hệ' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-nude shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-spaGreen flex items-center justify-center">
                <span className="text-dark font-bold text-sm">L</span>
              </div>
              <span className="text-xl font-bold text-dark">
                Lotus <span className="text-gold">Spa</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-dark hover:text-gold transition-colors duration-200 font-medium text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth Area */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 text-dark hover:text-gold transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-spaGreen flex items-center justify-center">
                      <User size={16} className="text-dark" />
                    </div>
                    <span className="text-sm font-medium">{user.name}</span>
                    <ChevronDown size={14} />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-nude overflow-hidden"
                      >
                        <Link
                          href="/tai-khoan"
                          className="flex items-center gap-2 px-4 py-3 text-sm text-dark hover:bg-cream transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User size={14} />
                          Tài khoản của tôi
                        </Link>
                        <Link
                          href="/lich-hen"
                          className="flex items-center gap-2 px-4 py-3 text-sm text-dark hover:bg-cream transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Lịch hẹn của tôi
                        </Link>
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false); }}
                          className="flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-cream transition-colors w-full"
                        >
                          <LogOut size={14} />
                          Đăng xuất
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link
                    href="/dang-nhap"
                    className="text-dark hover:text-gold transition-colors font-medium text-sm"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/dang-ky"
                    className="bg-gold text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-600 transition-colors"
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-dark hover:text-gold transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Spacer */}
      <div className="h-16" />

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
