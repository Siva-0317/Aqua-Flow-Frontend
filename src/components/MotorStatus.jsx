import React from 'react';
import { Power, Loader2, Activity } from 'lucide-react';

export default function MotorStatus({ status = 'OFF', decision, reason, isLoading = false }) {
  const isOn = status === 'ON';

  return (
    <div className={`rounded-2xl p-8 text-center transition-all duration-500 shadow-2xl overflow-hidden relative ${
      isOn 
        ? 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 text-slate-900'
    }`}>
      {isOn && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
        </div>
      )}
      
      <div className="relative z-10">
        <div className="mb-6 flex justify-center">
          {isLoading ? (
            <div className={`${isOn ? 'text-white' : 'text-slate-400'}`}>
              <Loader2 className="h-16 w-16 animate-spin" />
            </div>
          ) : (
            <div className={`p-4 rounded-full ${isOn ? 'bg-white/20' : 'bg-slate-300/30'}`}>
              <Power className={`h-12 w-12 ${isOn ? 'text-white' : 'text-slate-500'} ${isOn ? 'animate-pulse' : ''}`} />
            </div>
          )}
        </div>
        
        <h3 className="text-4xl font-bold mb-2">Motor <span className="font-black">{status}</span></h3>
        <p className={`text-base mb-4 font-semibold ${isOn ? 'text-emerald-50' : 'text-slate-600'}`}>
          Irrigation Pump
        </p>

        {isOn && (
          <div className="mb-4 flex items-center justify-center gap-2 text-sm text-emerald-50 font-semibold">
            <Activity className="h-4 w-4 animate-pulse" />
            <span>Running</span>
          </div>
        )}

        {decision && (
          <div className={`mb-4 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all ${
            isOn ? 'bg-white/25 text-white' : 'bg-slate-300/40 text-slate-700'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isOn ? 'bg-white' : 'bg-slate-600'}`}></div>
            {decision}
          </div>
        )}

        {reason && (
          <p className={`mt-4 text-sm font-medium leading-relaxed ${isOn ? 'text-emerald-50' : 'text-slate-500'}`}>
            {reason}
          </p>
        )}

        {isOn && (
          <div className="mt-6 flex gap-2 justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        )}
      </div>
    </div>
  );
}
