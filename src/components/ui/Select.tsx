import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5 w-full relative">
        {label && <label className="text-sm font-semibold text-dark-secondary">{label}</label>}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "flex h-11 w-full appearance-none rounded-md border border-border bg-white px-3 py-2 pr-10 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500 focus-visible:ring-red-500",
              className
            )}
            {...props}
          >
            <option value="" disabled>Select an option</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-dark-secondary">
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </div>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);
Select.displayName = 'Select';
