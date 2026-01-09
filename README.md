# Smart Irrigation Frontend

A modern React-based web application for monitoring and controlling an AI-powered smart irrigation system.

## Features

- **Real-time Dashboard**: Monitor soil moisture, temperature, and humidity
- **Motor Control**: View irrigation pump status and automation decisions
- **Sensor Trends**: Visual charts of sensor data over time
- **Irrigation History**: Track all irrigation events and durations
- **Statistics**: Weekly analytics and aggregate data
- **Device Configuration**: Configure field parameters, crop type, and location
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Tech Stack

- **React 18**: Modern UI library
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: React charting library
- **Axios**: HTTP client
- **Lucide React**: Icon library
- **Moment.js**: Date/time formatting

## Installation

```bash
cd smart-irrigation-frontend
npm install
```

## Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build

```bash
npm run build
```

## Configuration

Create a `.env` file in the project root:

```
VITE_API_URL=http://localhost:8000
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── services/           # API services
├── App.jsx            # Main app component
├── App.css            # Global styles
└── index.css          # Tailwind imports
```

## API Endpoints

The app communicates with the backend via these endpoints:

- `POST /api/arduino/sensor-data` - Send sensor readings
- `GET /api/arduino/device-status/{deviceId}` - Get device status
- `POST /api/arduino/user-config` - Save device configuration
- `GET /api/dashboard/latest-readings/{deviceId}` - Get recent sensor data
- `GET /api/dashboard/irrigation-history/{deviceId}` - Get irrigation events
- `GET /api/dashboard/device-config/{deviceId}` - Get device configuration
- `GET /api/dashboard/stats/{deviceId}` - Get statistics

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
