import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import moment from 'moment';
import { TrendingUp } from 'lucide-react';

export default function SensorChart({ readings = [] }) {
  const chartData = readings
    .slice(-20)
    .reverse()
    .map(r => ({
      time: moment(r.created_at).format('HH:mm'),
      moisture: r.soil_moisture,
      temperature: r.soil_temperature,
      humidity: r.soil_humidity,
    }));

  if (chartData.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-slate-200/50">
            <TrendingUp className="h-5 w-5 text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Sensor Trends</h3>
        </div>
        <div className="flex h-64 items-center justify-center text-slate-400">
          <div className="text-center">
            <div className="text-sm font-semibold mb-2">No data available yet</div>
            <div className="text-xs">Waiting for sensor readings...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100">
          <TrendingUp className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Sensor Trends</h3>
          <p className="text-xs text-slate-500 mt-1">Last 20 readings</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={350} className="mt-4">
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: '12px' }} />
          <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: 'none',
              borderRadius: '12px',
              padding: '12px',
              backdropFilter: 'blur(10px)',
            }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff', fontSize: '12px' }}
            formatter={(value) => [value.toFixed(1), '']}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line
            type="monotone"
            dataKey="moisture"
            name="Moisture %"
            stroke="#059669"
            strokeWidth={3}
            dot={false}
            isAnimationActive={true}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            name="Temp °C"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={false}
            isAnimationActive={true}
          />
          <Line
            type="monotone"
            dataKey="humidity"
            name="Humidity %"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
