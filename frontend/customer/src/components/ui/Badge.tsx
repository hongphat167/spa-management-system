import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'gold' | 'nude' | 'red';
  className?: string;
}

export default function Badge({ children, variant = 'green', className }: BadgeProps) {
  const variants = {
    green: 'bg-spaGreen text-dark',
    gold: 'bg-gold text-white',
    nude: 'bg-nude text-dark',
    red: 'bg-red-100 text-red-700',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
