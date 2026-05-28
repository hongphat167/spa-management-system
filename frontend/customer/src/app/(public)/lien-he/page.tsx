'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  subject: z.string().min(3, 'Chủ đề phải có ít nhất 3 ký tự'),
  message: z.string().min(10, 'Tin nhắn phải có ít nhất 10 ký tự'),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  {
    icon: MapPin,
    title: 'Địa chỉ',
    content: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
    color: 'text-spaGreen',
    bg: 'bg-spaGreen/10',
  },
  {
    icon: Phone,
    title: 'Điện thoại',
    content: '0123 456 789',
    color: 'text-gold',
    bg: 'bg-gold/10',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@lotusspa.vn',
    color: 'text-nude',
    bg: 'bg-nude/30',
  },
];

const workingHours = [
  { day: 'Thứ 2 - Thứ 6', hours: '9:00 - 21:00' },
  { day: 'Thứ 7', hours: '8:00 - 22:00' },
  { day: 'Chủ Nhật', hours: '8:00 - 22:00' },
];

export default function LienHePage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-sm font-medium uppercase tracking-widest mb-2">
            Luôn Sẵn Sàng Hỗ Trợ
          </p>
          <h1 className="text-4xl font-bold text-dark mb-4">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-spa-gray text-lg max-w-2xl mx-auto">
            Có câu hỏi hoặc cần tư vấn? Đội ngũ của chúng tôi luôn sẵn sàng giúp bạn
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Contact info */}
          <div className="space-y-5">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-5 flex items-start gap-4 shadow-sm"
              >
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                  <item.icon size={20} className={item.color} />
                </div>
                <div>
                  <h3 className="font-semibold text-dark mb-1">{item.title}</h3>
                  <p className="text-spa-gray text-sm">{item.content}</p>
                </div>
              </motion.div>
            ))}

            {/* Working hours */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-champagne flex items-center justify-center">
                  <Clock size={20} className="text-gold" />
                </div>
                <h3 className="font-semibold text-dark">Giờ Làm Việc</h3>
              </div>
              <div className="space-y-2">
                {workingHours.map((item) => (
                  <div key={item.day} className="flex justify-between text-sm">
                    <span className="text-spa-gray">{item.day}</span>
                    <span className="text-dark font-medium">{item.hours}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right - Contact form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-dark mb-6">Gửi Tin Nhắn</h2>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-spaGreen/20 border border-spaGreen rounded-xl p-4 mb-6 flex items-center gap-3"
                >
                  <CheckCircle size={20} className="text-dark" />
                  <p className="text-dark font-medium">
                    Tin nhắn đã được gửi! Chúng tôi sẽ phản hồi trong 24 giờ.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('name')}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-3 border-2 border-nude rounded-xl bg-cream focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all text-dark"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 border-2 border-nude rounded-xl bg-cream focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all text-dark"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-1">
                    Chủ đề <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('subject')}
                    placeholder="Tôi muốn hỏi về..."
                    className="w-full px-4 py-3 border-2 border-nude rounded-xl bg-cream focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all text-dark"
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-1">
                    Tin nhắn <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="Nội dung tin nhắn của bạn..."
                    className="w-full px-4 py-3 border-2 border-nude rounded-xl bg-cream focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all text-dark resize-none"
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-gold text-white py-3.5 rounded-full font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Gửi tin nhắn
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
