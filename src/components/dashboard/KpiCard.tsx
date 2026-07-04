import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: string;
  trendUp?: boolean;
  subtitle?: string;
}

export default function KpiCard({
  title,
  value,
  unit,
  icon: Icon,
  iconColor = 'text-teal-600',
  trend,
  trendUp = true,
  subtitle,
}: KpiCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex gap-3">
        <Icon className={`w-8 h-8 ${iconColor} mt-0.5 shrink-0`} />
        <div className="min-w-0">
          <p className="text-[11px] text-gray-500 font-medium mb-1 truncate">{title}</p>
          <p className="text-2xl font-semibold text-gray-800 leading-none">
            {value}
            {unit && <span className="text-sm ml-0.5 font-normal">{unit}</span>}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-end mt-4">
        {trend ? (
          <p className={`text-[10px] font-medium ${trendUp ? 'text-teal-600' : 'text-red-500'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </p>
        ) : subtitle ? (
          <p className="text-[10px] text-gray-400">{subtitle}</p>
        ) : (
          <span />
        )}
        <svg className="w-12 h-6" viewBox="0 0 50 20" fill="none">
          <path
            d="M0 15 Q 10 5, 20 10 T 40 5 T 50 10"
            stroke={trendUp ? '#14b8a6' : '#ef4444'}
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}
