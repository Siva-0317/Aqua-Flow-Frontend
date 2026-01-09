import React from 'react';
import { Droplet, Thermometer, CloudRain, AlertCircle, TrendingUp } from 'lucide-react';

export default function SensorCard({ title, value, unit, icon: Icon, status = 'normal', threshold }) {
  const statusConfig = {
    normal: {
      bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      border: 'border-emerald-300',
      icon: 'text-emerald-600',
      text: 'text-emerald-900',
      label: 'text-emerald-700',
      badge: 'bg-emerald-200/50 text-emerald-800',
    },
    warning: {
      bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
      border: 'border-amber-300',
      icon: 'text-amber-600',
      text: 'text-amber-900',
      label: 'text-amber-700',
      badge: 'bg-amber-200/50 text-amber-800',
    },
    critical: {
      bg: 'bg-gradient-to-br from-red-50 to-red-100',
      border: 'border-red-300',
      icon: 'text-red-600',
      text: 'text-red-900',
      label: 'text-red-700',
      badge: 'bg-red-200/50 text-red-800',
    },
    info: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      border: 'border-blue-300',
      icon: 'text-blue-600',
      text: 'text-blue-900',
      label: 'text-blue-700',
      badge: 'bg-blue-200/50 text-blue-800',
    },
  };

  const config = statusConfig[status];

  return (
    <div className={`${config.bg} rounded-xl border-2 ${config.border} p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-sm font-bold ${config.label} uppercase tracking-wider`}>{title}</p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className={`text-4xl font-bold ${config.text}`}>
              {value !== null && value !== undefined ? value.toFixed(1) : '--'}
            </span>
            <span className={`text-base font-semibold ${config.label}`}>{unit}</span>
          </div>
          {threshold && (
            <p className={`mt-3 text-xs font-medium ${config.label}`}>
              <span className="opacity-75">Range: </span>{threshold}
            </p>
          )}
        </div>
        <div className="relative">
          <div className={`${config.badge} p-3 rounded-full`}>
            <Icon className={`h-8 w-8 ${config.icon}`} />
          </div>
        </div>
      </div>
      {status === 'warning' && (
        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-amber-700">
          <AlertCircle className="h-4 w-4" />
          <span>Monitor closely</span>
        </div>
      )}
      {status === 'critical' && (
        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-red-700 animate-pulse">
          <AlertCircle className="h-4 w-4" />
          <span>Action required!</span>
        </div>
      )}
    </div>
  );
}
