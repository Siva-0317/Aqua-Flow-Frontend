import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';
import { Loader2, BarChart3, Clock } from 'lucide-react';
import IrrigationHistory from '../components/IrrigationHistory';

export default function HistoryPage() {
  const DEVICE_ID = 'arduino_r4_01';
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hours, setHours] = useState(24);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const response = await dashboardAPI.getIrrigationHistory(DEVICE_ID, hours);
        setCommands(response.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [hours]);

  return (
    <div className="w-full min-h-full bg-gradient-to-br from-slate-50 via-emerald-50/20 to-sky-50/20 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-400 to-purple-600">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-black text-slate-900">Irrigation History</h1>
            </div>
            <p className="text-slate-600 font-semibold">View all irrigation events and decisions</p>
          </div>

          <select
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value))}
            className="rounded-xl border-2 border-slate-300 px-6 py-3 font-bold text-slate-900 bg-white shadow-lg hover:shadow-xl focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
          >
            <option value={6}>Last 6 hours</option>
            <option value={24}>Last 24 hours</option>
            <option value={168}>Last 7 days</option>
            <option value={720}>Last 30 days</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Loader2 className="h-16 w-16 animate-spin text-emerald-500 mx-auto mb-4" />
              <p className="text-lg font-semibold text-slate-600">Loading history...</p>
            </div>
          </div>
        ) : (
          <IrrigationHistory events={commands} />
        )}
      </div>
    </div>
  );
}
