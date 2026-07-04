import React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && <label className="text-sm font-semibold text-dark-secondary">{label}</label>}
        <textarea
          ref={ref}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-border bg-white px-3 py-2 text-sm transition-colors placeholder:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
