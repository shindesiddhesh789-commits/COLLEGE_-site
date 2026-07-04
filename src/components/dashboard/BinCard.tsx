import React from 'react';
import { Trash2, Zap } from 'lucide-react';

export interface BinData {
  binId: string;
  location: string;
  fillLevel: number;
  temperature: number;
  battery: number;
  wifi: 'Connected' | 'Disconnected';
}

function getStatus(bin: BinData) {
  if (bin.wifi === 'Disconnected') return 'Offline';
  if (bin.fillLevel >= 80) return 'Full';
  if (bin.fillLevel >= 50) return 'Half Full';
  if (bin.fillLevel > 15) return 'Normal';
  return 'Empty';
}

function getStyles(status: string) {
  switch (status) {
    case 'Full':
      return {
        border: 'border-red-200',
        badge: 'bg-red-500 text-white shadow-sm shadow-red-200 animate-pulse',
        ring: 'text-red-500',
        iconBg: 'bg-red-50 text-red-600',
        glow: 'hover:shadow-md hover:border-red-300 shadow-sm shadow-red-50',
        fillColor: 'text-red-600',
      };
    case 'Half Full':
      return {
        border: 'border-amber-100',
        badge: 'bg-amber-100 text-amber-700',
        ring: 'text-amber-400',
        iconBg: 'bg-amber-50 text-amber-600',
        glow: 'hover:shadow-md hover:border-amber-200',
        fillColor: 'text-gray-800',
      };
    case 'Offline':
      return {
        border: 'border-gray-100',
        badge: 'bg-gray-100 text-gray-500',
        ring: 'text-gray-200',
        iconBg: 'bg-gray-100 text-gray-400',
        glow: '',
        fillColor: 'text-gray-400',
      };
    default: // Normal / Empty
      return {
        border: 'border-gray-100',
        badge: 'bg-teal-50 text-teal-700',
        ring: 'text-teal-500',
        iconBg: 'bg-teal-50 text-teal-600',
        glow: 'hover:shadow-md hover:border-teal-200',
        fillColor: 'text-gray-800',
      };
  }
}

export default function BinCard({ bin }: { bin: BinData }) {
  const status = getStatus(bin);
  const styles = getStyles(status);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = status === 'Offline' ? circumference : circumference - (bin.fillLevel / 100) * circumference;

  return (
    <div
      className={`bg-white border ${styles.border} rounded-xl p-4 flex flex-col justify-between transition-all duration-300 ${styles.glow}`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-sm font-bold text-gray-800">{bin.binId}</h3>
          <p className="text-[11px] text-gray-500">{bin.location}</p>
        </div>
        <div className={`w-6 h-6 rounded-full ${styles.iconBg} flex items-center justify-center`}>
          <Trash2 className="w-2.5 h-2.5" />
        </div>
      </div>

      {/* Gauge */}
      <div className="flex justify-center my-3 relative">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-100" />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className={`${styles.ring} transition-all duration-700 ease-in-out`}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-xl font-bold ${styles.fillColor}`}>
            {bin.fillLevel}
            <span className="text-xs">%</span>
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 pt-3 flex justify-between items-center mt-1">
        <span className={`text-[9px] uppercase font-bold px-2 py-1 rounded-md ${styles.badge} tracking-wide`}>
          {status}
        </span>
        <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-400" />
          {bin.battery}%
        </span>
      </div>
    </div>
  );
}
