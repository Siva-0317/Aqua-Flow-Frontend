import React from 'react';
import moment from 'moment';
import { Droplets, Power, Calendar, Clock, Droplet } from 'lucide-react';

export default function IrrigationHistory({ events = [] }) {
  const irrigationEvents = events
    .filter(e => e.motor_status)
    .slice(0, 10);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-gradient-to-br from-sky-100 to-blue-100">
          <Droplets className="h-5 w-5 text-sky-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Irrigation History</h3>
          <p className="text-xs text-slate-500 mt-1">Recent irrigation events</p>
        </div>
      </div>

      {irrigationEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="p-4 rounded-full bg-slate-100 mb-4">
            <Droplets className="h-8 w-8 text-slate-400" />
          </div>
          <p className="text-sm font-semibold text-slate-600">No irrigation events yet</p>
          <p className="text-xs text-slate-400 mt-1">Events will appear here when irrigation is triggered</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {irrigationEvents.map((event, idx) => (
            <div 
              key={idx} 
              className="border-l-4 border-emerald-500 rounded-lg bg-gradient-to-r from-emerald-50 to-transparent p-4 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex gap-3 items-center mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      event.motor_status === 'ON'
                        ? 'bg-emerald-500 text-white shadow-lg'
                        : 'bg-slate-300 text-slate-700'
                    }`}>
                      <div className="flex items-center gap-1">
                        <Power className="h-3 w-3" />
                        {event.motor_status}
                      </div>
                    </span>
                    <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {moment(event.created_at).format('MMM D, YYYY')}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {moment(event.created_at).format('HH:mm:ss')}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">{event.reason}</p>
                  <div className="grid grid-cols-3 gap-2 text-xs font-medium">
                    <div className="flex items-center gap-2 text-emerald-700 bg-emerald-100/50 p-2 rounded">
                      <Droplet className="h-3 w-3" />
                      <span>{event.sensor_data?.soil_moisture?.toFixed(1) || '--'}% Moisture</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-700 bg-amber-100/50 p-2 rounded">
                      <span>🌡️ {event.sensor_data?.soil_temperature?.toFixed(1) || '--'}°C</span>
                    </div>
                    {event.irrigation_duration_minutes > 0 && (
                      <div className="flex items-center gap-2 text-blue-700 bg-blue-100/50 p-2 rounded">
                        <Clock className="h-3 w-3" />
                        <span>{event.irrigation_duration_minutes}m Duration</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
