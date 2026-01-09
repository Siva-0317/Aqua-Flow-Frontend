import React from 'react';
import { Leaf, BarChart3, Settings as SettingsIcon, Home, Droplets } from 'lucide-react';

export default function Navbar({ currentPage, onPageChange }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'history', label: 'History', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg group-hover:shadow-xl transition-all">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-black text-slate-900 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                SmartIrrigate
              </span>
              <p className="text-xs font-semibold text-slate-500 -mt-1">AI-Powered Irrigation</p>
            </div>
          </div>

          <div className="flex gap-1 bg-slate-100/50 rounded-full p-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                      : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
