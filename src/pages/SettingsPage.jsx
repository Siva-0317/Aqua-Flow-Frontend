import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';
import { Loader2, Zap, Database, Globe } from 'lucide-react';
import DeviceConfig from '../components/DeviceConfig';

export default function SettingsPage() {
  const DEVICE_ID = 'arduino_r4_01';
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await dashboardAPI.getDeviceConfig(DEVICE_ID);
        setConfig(response.data);
      } catch (error) {
        console.log('No config found, will create new one');
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-emerald-500 mx-auto mb-4" />
          <p className="text-lg font-semibold text-slate-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full bg-gradient-to-br from-slate-50 via-emerald-50/20 to-sky-50/20 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-600">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-black text-slate-900">
              Settings
            </h1>
          </div>
          <p className="text-slate-600 font-semibold">Manage device configuration</p>
        </div>

        {/* Device Config */}
        <div className="mb-10">
          <DeviceConfig deviceId={DEVICE_ID} />
        </div>

        {/* Info Cards with enhanced styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Device ID Card */}
          <div className="rounded-xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-200/50">
                <Database className="h-5 w-5 text-blue-700" />
              </div>
              <h3 className="font-bold text-blue-900 uppercase tracking-wider">Device ID</h3>
            </div>
            <p className="text-sm font-mono text-blue-700 bg-blue-200/30 p-3 rounded-lg">{DEVICE_ID}</p>
          </div>

          {/* Thresholds Card */}
          <div className="rounded-xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-200/50">
                <Zap className="h-5 w-5 text-emerald-700" />
              </div>
              <h3 className="font-bold text-emerald-900 uppercase tracking-wider">Thresholds</h3>
            </div>
            <ul className="text-sm text-emerald-700 space-y-2">
              <li className="font-semibold">💧 Moisture: 30% - 60%</li>
              <li className="font-semibold">🌧️ Rainfall: {'>'} 5mm</li>
              <li className="font-semibold">🌡️ Temp: Max 40°C</li>
            </ul>
          </div>

          {/* API Endpoint Card */}
          <div className="rounded-xl border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-purple-100 p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-purple-200/50">
                <Globe className="h-5 w-5 text-purple-700" />
              </div>
              <h3 className="font-bold text-purple-900 uppercase tracking-wider">API</h3>
            </div>
            <p className="text-xs text-purple-700 bg-purple-200/30 p-3 rounded-lg break-all font-mono">
              {import.meta.env.VITE_API_URL || 'http://localhost:8000'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
