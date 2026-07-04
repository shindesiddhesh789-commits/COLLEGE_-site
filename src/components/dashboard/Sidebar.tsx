import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import {
  LayoutDashboard, Trash2, MapPin, Truck, Bell, BarChart3,
  Users, Settings, LogOut, Leaf, ChevronLeft, ChevronRight,
  FileText, Activity, Wifi, Phone, CheckCircle2
} from 'lucide-react';

const mainNav = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'SmartBins', icon: Trash2, path: '/dashboard/smartbins' },
  { label: 'Locations', icon: MapPin, path: '/dashboard/locations' },
  { label: 'Collections', icon: Truck, path: '/dashboard/collections' },
  { label: 'Alerts', icon: Bell, path: '/dashboard/alerts', badge: 4 },
  { label: 'Reports', icon: FileText, path: '/dashboard/reports' },
  { label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
  { label: 'Staff', icon: Users, path: '/dashboard/staff' },
  { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = (isActive: boolean) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
      isActive
        ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/20'
        : 'text-gray-600 hover:bg-teal-50 hover:text-teal-700'
    }`;

  return (
    <aside
      className={`${
        collapsed ? 'w-[72px]' : 'w-60'
      } bg-white border-r border-gray-200 flex flex-col shrink-0 transition-all duration-300 h-screen sticky top-0 z-30`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-gray-100 shrink-0">
        <img 
          src="/logo.png" 
          alt="XelCo InfraTechnologies" 
          className={`h-9 object-contain transition-all ${collapsed ? 'w-8 object-left' : 'w-auto'}`}
        />
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {mainNav.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => linkClass(isActive)}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && <span>{item.label}</span>}
            {!collapsed && item.badge && (
              <span className="ml-auto bg-teal-600 text-white text-[10px] w-5 h-5 rounded-full font-bold flex items-center justify-center shadow-sm">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      {!collapsed && (
        <div className="px-4 pb-3 space-y-3 border-t border-gray-100 pt-3">
          {/* System Status */}
          <div className="bg-teal-50/60 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Wifi className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-[11px] font-bold text-gray-700">System Status</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-teal-500" />
              <span className="text-[10px] text-teal-700 font-medium">All Systems Operational</span>
            </div>
          </div>

          {/* Need Help */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-[11px] font-bold text-gray-700 mb-0.5">Need Help?</p>
            <p className="text-[10px] text-gray-400">Contact Support</p>
            <div className="flex items-center gap-1 mt-1">
              <Phone className="w-3 h-3 text-gray-400" />
              <span className="text-[10px] text-gray-500 font-medium">+91 98765 43210</span>
            </div>
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="hidden md:flex h-10 items-center justify-center border-t border-gray-100 text-gray-400 hover:text-teal-600 hover:bg-teal-50 transition-colors shrink-0"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
