import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function Card({ className, hover, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-sm overflow-hidden',
        hover && 'hover:shadow-lg transition-shadow duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
