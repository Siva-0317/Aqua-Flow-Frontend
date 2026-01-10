import React, { useState, useEffect } from 'react';
import { arduinoAPI } from '../services/api';
import { Settings, Loader2, Check, AlertCircle, MapPin } from 'lucide-react';

export default function DeviceConfig({ deviceId, onSaved }) {
  const [config, setConfig] = useState({
    device_id: deviceId,
    field_size: 1000,
    crop_type: 'rabi',
    crop_stage: 'germinative',
    soil_type: 'loamy',
    latitude: 12.9716,
    longitude: 77.5946,
  });

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: isNaN(value) ? value : parseFloat(value),
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await arduinoAPI.setUserConfig(config);
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
      if (onSaved) onSaved(config);
    } catch (error) {
      console.error('Error saving config:', error);
      setError('Error saving configuration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100">
          <Settings className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Device Configuration</h3>
          <p className="text-xs text-slate-500 mt-1">Configure field and crop parameters</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Field Size */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
              Field Size (m²)
            </label>
            <input
              type="number"
              name="field_size"
              value={config.field_size}
              onChange={handleChange}
              className="w-full rounded-lg border-2 border-slate-300 px-4 py-3 font-semibold text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
            />
          </div>

          {/* Crop Type */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
              Crop Type
            </label>
            <select
              name="crop_type"
              value={config.crop_type}
              onChange={handleChange}
              className="w-full rounded-lg border-2 border-slate-300 px-4 py-3 font-semibold text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
            >
              <option value="rabi">Rabi</option>
              <option value="kharif">Kharif</option>
              <option value="zaid">Zaid</option>
            </select>
          </div>

          {/* Crop Stage */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
              Crop Stage
            </label>
            <select
              name="crop_stage"
              value={config.crop_stage}
              onChange={handleChange}
              className="w-full rounded-lg border-2 border-slate-300 px-4 py-3 font-semibold text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
            >
              <option value="germinative">Germinative</option>
              <option value="vegetative">Vegetative</option>
              <option value="maturity">Maturity</option>
              <option value="flowering">Flowering</option>
            </select>
          </div>

          {/* Soil Type */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
              Soil Type
            </label>
            <select
              name="soil_type"
              value={config.soil_type}
              onChange={handleChange}
              className="w-full rounded-lg border-2 border-slate-300 px-4 py-3 font-semibold text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
            >
              <option value="sandy">Sandy</option>
              <option value="loamy">Loamy</option>
              <option value="clay">Clay</option>
            </select>
          </div>

          {/* Latitude */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Latitude
            </label>
            <input
              type="number"
              step="0.0001"
              name="latitude"
              value={config.latitude}
              onChange={handleChange}
              className="w-full rounded-lg border-2 border-slate-300 px-4 py-3 font-semibold text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
            />
          </div>

          {/* Longitude */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Longitude
            </label>
            <input
              type="number"
              step="0.0001"
              name="longitude"
              value={config.longitude}
              onChange={handleChange}
              className="w-full rounded-lg border-2 border-slate-300 px-4 py-3 font-semibold text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || saved}
          className={`w-full rounded-xl px-6 py-4 text-white font-bold text-lg uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 transform ${
            saved
              ? 'bg-emerald-600 shadow-lg'
              : loading
              ? 'bg-slate-400 opacity-75'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-xl hover:scale-105'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : saved ? (
            <>
              <Check className="h-5 w-5" />
              <span>Saved Successfully!</span>
            </>
          ) : (
            <>
              <Settings className="h-5 w-5" />
              <span>Save Configuration</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
