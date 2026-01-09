import React, { useState, useEffect } from 'react';
import { dashboardAPI, arduinoAPI } from '../services/api';
import { Loader2, Send, AlertCircle } from 'lucide-react';
import SensorCard from '../components/SensorCard';
import MotorStatus from '../components/MotorStatus';
import SensorChart from '../components/SensorChart';
import IrrigationHistory from '../components/IrrigationHistory';
import Statistics from '../components/Statistics';
import { Droplets, Thermometer, CloudRain } from 'lucide-react';

export default function DashboardPage() {
  const DEVICE_ID = 'arduino_r4_01';
  const [readings, setReadings] = useState([]);
  const [commands, setCommands] = useState([]);
  const [deviceStatus, setDeviceStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const [readingsRes, commandsRes, statusRes] = await Promise.all([
          dashboardAPI.getLatestReadings(DEVICE_ID, 30),
          dashboardAPI.getIrrigationHistory(DEVICE_ID, 24),
          arduinoAPI.getDeviceStatus(DEVICE_ID),
        ]);

        setReadings(readingsRes.data);
        setCommands(commandsRes.data);
        setDeviceStatus(statusRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Send test data
  const handleSendTestData = async () => {
    setIsSending(true);
    try {
      const testData = {
        soil_moisture: Math.random() * 100,
        soil_temperature: 25 + Math.random() * 15,
        soil_humidity: 40 + Math.random() * 50,
      };

      const response = await arduinoAPI.sendSensorData(DEVICE_ID, testData);
      
      // Refresh data
      const [readingsRes, commandsRes] = await Promise.all([
        dashboardAPI.getLatestReadings(DEVICE_ID, 30),
        dashboardAPI.getIrrigationHistory(DEVICE_ID, 24),
      ]);

      setReadings(readingsRes.data);
      setCommands(commandsRes.data);
    } catch (error) {
      console.error('Error sending test data:', error);
      alert('Error sending test data');
    } finally {
      setIsSending(false);
    }
  };

  const latestReading = readings[0];
  const latestCommand = commands[0];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-slate-400" />
      </div>
    );
  }

  const getMoistureStatus = (value) => {
    if (!value) return 'info';
    if (value < 30) return 'critical';
    if (value > 60) return 'normal';
    return 'warning';
  };

  return (
    <div className="w-full min-h-full bg-gradient-to-br from-slate-50 via-emerald-50/20 to-sky-50/20 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with improved styling */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600">
                  <Droplets className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-4xl font-black text-slate-900">
                  Smart Irrigation
                </h1>
              </div>
              <p className="text-slate-600 font-semibold">
                Real-time monitoring and AI-powered control system
              </p>
            </div>
            <button
              onClick={handleSendTestData}
              disabled={isSending}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg ${
                isSending
                  ? 'bg-slate-400 opacity-75'
                  : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-xl hover:scale-105'
              }`}
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Test Data</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Alert with improved styling */}
        {error && (
          <div className="mb-8 rounded-xl border-2 border-red-300 bg-gradient-to-r from-red-50 to-red-100 p-5 flex items-start gap-4 shadow-lg animate-pulse">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-red-700 mb-1">Dashboard Error</p>
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Sensor Cards Grid with improved styling */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <SensorCard
            title="Soil Moisture"
            value={latestReading?.soil_moisture}
            unit="%"
            icon={Droplets}
            status={getMoistureStatus(latestReading?.soil_moisture)}
            threshold="30% - 60%"
          />
          <SensorCard
            title="Soil Temperature"
            value={latestReading?.soil_temperature}
            unit="°C"
            icon={Thermometer}
            status={latestReading?.soil_temperature > 35 ? 'warning' : 'normal'}
            threshold="Max 40°C"
          />
          <SensorCard
            title="Soil Humidity"
            value={latestReading?.soil_humidity}
            unit="%"
            icon={CloudRain}
            status="info"
            threshold="Ambient"
          />
        </div>

        {/* Motor Status & Chart */}
        <div className="mb-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <MotorStatus
              status={latestCommand?.motor_status || 'OFF'}
              decision={latestCommand?.reason}
              isLoading={isSending}
            />
          </div>
          <div className="lg:col-span-2">
            <SensorChart readings={readings} />
          </div>
        </div>

        {/* History & Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <IrrigationHistory events={commands} />
          <Statistics deviceId={DEVICE_ID} />
        </div>
      </div>
    </div>
  );
}
