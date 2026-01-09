import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Arduino endpoints
export const arduinoAPI = {
  sendSensorData: (deviceId, sensorData) =>
    api.post('/api/arduino/sensor-data', {
      device_id: deviceId,
      soil_moisture: sensorData.soil_moisture,
      soil_temperature: sensorData.soil_temperature,
      soil_humidity: sensorData.soil_humidity,
    }),

  setUserConfig: (config) =>
    api.post('/api/arduino/user-config', config),

  getDeviceStatus: (deviceId) =>
    api.get(`/api/arduino/device-status/${deviceId}`),
};

// Dashboard endpoints
export const dashboardAPI = {
  getLatestReadings: (deviceId, limit = 20) =>
    api.get(`/api/dashboard/latest-readings/${deviceId}`, { params: { limit } }),

  getIrrigationHistory: (deviceId, hours = 24) =>
    api.get(`/api/dashboard/irrigation-history/${deviceId}`, { params: { hours } }),

  getDeviceConfig: (deviceId) =>
    api.get(`/api/dashboard/device-config/${deviceId}`),

  getStatistics: (deviceId, days = 7) =>
    api.get(`/api/dashboard/stats/${deviceId}`, { params: { days } }),
};

export default api;
