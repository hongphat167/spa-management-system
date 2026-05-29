import type { Metadata } from 'next';
import './globals.css';
import { ToastViewport } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: 'Lotus Spa - Trải Nghiệm Thư Giãn Cao Cấp',
  description: 'Spa cao cấp với dịch vụ massage, chăm sóc da và sắc đẹp tại Việt Nam',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        {children}
        <ToastViewport />
      </body>
    </html>
  );
}
