import React from 'react';

interface PlaceholderPageProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function PlaceholderPage({ title, description, icon }: PlaceholderPageProps) {
  return (
    <div className="p-6 flex-1">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 flex flex-col items-center justify-center min-h-[400px]">
        {icon && <div className="text-teal-200 mb-6">{icon}</div>}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-sm text-gray-500 max-w-md text-center">
          {description || 'This section is under development. Check back soon for updates.'}
        </p>
        <div className="mt-8 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-xs text-gray-400 font-medium">Coming Soon</span>
        </div>
      </div>
    </div>
  );
}
