import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-dark mb-1">{label}</label>}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 border border-nude rounded-xl bg-cream focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all',
            error && 'border-red-400',
            className
          )}
          {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
export default Input;
