'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, MessageSquare } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import Input from '@/components/ui/Input';

const schema = z.object({
  name: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().regex(/^[0-9]{10,11}$/, 'Số điện thoại phải có 10-11 chữ số'),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function CustomerForm() {
  const { bookingData, setCustomerInfo } = useBookingStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: bookingData.customerInfo,
  });

  const watchedValues = watch();

  useEffect(() => {
    const subscription = watch((value) => {
      setCustomerInfo({
        name: value.name || '',
        email: value.email || '',
        phone: value.phone || '',
        notes: value.notes || '',
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, setCustomerInfo]);

  const onSubmit = (data: FormData) => {
    setCustomerInfo({
      name: data.name,
      email: data.email,
      phone: data.phone,
      notes: data.notes || '',
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-dark mb-2">Thông Tin Của Bạn</h2>
      <p className="text-spa-gray mb-6">Vui lòng điền thông tin để chúng tôi liên hệ xác nhận lịch hẹn</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-dark mb-1">
            <User size={15} className="text-gold" />
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name')}
            placeholder="Nguyễn Văn A"
            className="w-full px-4 py-3 border-2 border-nude rounded-xl bg-cream focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all text-dark placeholder:text-spa-gray"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-dark mb-1">
            <Mail size={15} className="text-gold" />
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="example@email.com"
            className="w-full px-4 py-3 border-2 border-nude rounded-xl bg-cream focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all text-dark placeholder:text-spa-gray"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-dark mb-1">
            <Phone size={15} className="text-gold" />
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="0901234567"
            className="w-full px-4 py-3 border-2 border-nude rounded-xl bg-cream focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all text-dark placeholder:text-spa-gray"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-dark mb-1">
            <MessageSquare size={15} className="text-gold" />
            Ghi chú (tùy chọn)
          </label>
          <textarea
            {...register('notes')}
            placeholder="Bạn có yêu cầu đặc biệt nào không? (ví dụ: dị ứng, vùng tập trung massage...)"
            rows={4}
            className="w-full px-4 py-3 border-2 border-nude rounded-xl bg-cream focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all text-dark placeholder:text-spa-gray resize-none"
          />
        </div>
      </form>
    </div>
  );
}
