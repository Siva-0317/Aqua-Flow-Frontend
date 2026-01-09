import React, { useEffect, useState } from 'react';
import { dashboardAPI } from '../services/api';
import { BarChart3, Loader2, TrendingUp, Droplet, Clock, AlertCircle } from 'lucide-react';

export default function Statistics({ deviceId }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardAPI.getStatistics(deviceId, 7);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [deviceId]);

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="flex items-center justify-center h-80">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-slate-400 mx-auto mb-4" />
            <p className="text-sm text-slate-600 font-semibold">Loading statistics...</p>
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      icon: Droplet,
      label: 'Avg Moisture',
      value: stats?.avg_moisture,
      unit: '%',
      bg: 'from-emerald-50 to-emerald-100',
      color: 'text-emerald-600',
      badge: 'bg-emerald-200/50 text-emerald-800',
    },
    {
      icon: AlertCircle,
      label: 'Avg Temperature',
      value: stats?.avg_temperature,
      unit: '°C',
      bg: 'from-amber-50 to-amber-100',
      color: 'text-amber-600',
      badge: 'bg-amber-200/50 text-amber-800',
    },
    {
      icon: Clock,
      label: 'Total Duration',
      value: stats?.total_irrigation_duration,
      unit: 'min',
      bg: 'from-blue-50 to-blue-100',
      color: 'text-blue-600',
      badge: 'bg-blue-200/50 text-blue-800',
    },
    {
      icon: TrendingUp,
      label: 'Irrigations',
      value: stats?.irrigation_count,
      unit: 'events',
      bg: 'from-purple-50 to-purple-100',
      color: 'text-purple-600',
      badge: 'bg-purple-200/50 text-purple-800',
    },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100">
          <BarChart3 className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Statistics</h3>
          <p className="text-xs text-slate-500 mt-1">Last 7 days</p>
        </div>
      </div>

      {stats ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx}
                className={`bg-gradient-to-br ${card.bg} rounded-xl p-5 border border-slate-200/50 hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`${card.badge} p-2 rounded-lg`}>
                    <Icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                  <TrendingUp className={`h-4 w-4 ${card.color} opacity-50`} />
                </div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">{card.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-3xl font-black ${card.color}`}>
                    {card.value !== undefined && card.value !== null ? card.value : '--'}
                  </span>
                  <span className={`text-sm font-semibold ${card.color} opacity-70`}>{card.unit}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="h-12 w-12 text-slate-300 mb-4" />
          <p className="text-sm text-slate-600 font-semibold">No data available</p>
        </div>
      )}
    </div>
  );
}
