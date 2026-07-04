import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Bell, ChevronDown, Menu, Building2, Calendar } from 'lucide-react';

interface NavbarProps {
  onMenuToggle: () => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dateTimeStr = `${currentTime.getDate()} ${months[currentTime.getMonth()]} ${currentTime.getFullYear()}, ${currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 sticky top-0 z-20">
      {/* Left Side */}
      <div className="flex items-center">
        <button
          onClick={onMenuToggle}
          className="text-gray-400 hover:text-teal-600 transition-colors p-1"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5 text-sm text-gray-600">
        {/* Campus Selector */}
        <div className="hidden lg:flex items-center gap-2 cursor-pointer hover:text-teal-600 transition-colors bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
          <Building2 className="w-4 h-4 text-gray-400" />
          <span className="font-medium text-[13px]">XelCo Engineering College</span>
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </div>

        {/* Date and Time */}
        <div className="hidden md:flex items-center gap-2 text-[13px] text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{dateTimeStr}</span>
        </div>

        {/* Notifications */}
        <button className="relative text-gray-400 hover:text-teal-600 transition-colors p-1.5 hover:bg-teal-50 rounded-lg">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full ring-2 ring-white text-[9px] text-white font-bold flex items-center justify-center">4</span>
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2.5 cursor-pointer group pl-3 border-l border-gray-200">
          <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {userInitial}
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-[13px] font-semibold text-gray-700 leading-none">{user?.name || 'Manager'}</span>
          </div>
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </div>
      </div>
    </header>
  );
}
