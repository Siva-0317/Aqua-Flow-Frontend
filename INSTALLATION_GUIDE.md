# Smart Irrigation Frontend - Installation & Usage Guide

## Quick Start

### Prerequisites
- Node.js 16.x or higher
- npm 8.x or higher
- Git (optional)

### Installation

1. **Navigate to project directory**
```bash
cd smart-irrigation-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
Create or update `.env` file:
```
VITE_API_URL=http://localhost:8000
```

For production:
```
VITE_API_URL=https://your-backend-url.com
```

### Development Server

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the optimized production bundle:
```bash
npm run build
```

Output files will be in the `dist/` directory

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
smart-irrigation-frontend/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── SensorCard.jsx      # Sensor reading display
│   │   ├── MotorStatus.jsx     # Motor/pump status
│   │   ├── SensorChart.jsx     # Data visualization
│   │   ├── IrrigationHistory.jsx
│   │   ├── Statistics.jsx      # 7-day stats
│   │   ├── DeviceConfig.jsx    # Settings form
│   │   └── Navbar.jsx          # Navigation bar
│   ├── pages/                   # Page components
│   │   ├── DashboardPage.jsx   # Main monitoring
│   │   ├── HistoryPage.jsx     # Events history
│   │   └── SettingsPage.jsx    # Configuration
│   ├── services/
│   │   └── api.js              # API client
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # Global styles
│   ├── index.css               # Tailwind imports
│   └── main.jsx                # React entry point
├── public/                      # Static assets
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind config
├── postcss.config.js           # PostCSS config
├── .env                        # Environment variables
└── README.md                   # Project documentation
```

## Features Overview

### Dashboard Page
- **Real-time Sensor Readings**: Soil moisture, temperature, humidity
- **Motor Status**: Current irrigation pump state
- **Sensor Trends Chart**: Historical data visualization
- **Irrigation History**: Recent events
- **Statistics**: 7-day analytics
- **Test Data Button**: Send mock sensor data for testing

### History Page
- **Irrigation Events**: Complete event log
- **Time Filters**: 6h, 24h, 7d, 30d views
- **Event Details**: Status, timing, sensor data, duration
- **Search/Filter**: By time range

### Settings Page
- **Device Configuration**: Field size, crop type, stage, soil type
- **Location**: Latitude/Longitude coordinates
- **Device Info**: Device ID display
- **Thresholds**: Configured limits
- **API Endpoint**: Backend URL

## API Configuration

### Base URL
The app communicates with a backend API at:
```
{VITE_API_URL}/api
```

### Available Endpoints

**Arduino Endpoints:**
- `POST /api/arduino/sensor-data` - Send sensor readings
- `GET /api/arduino/device-status/{deviceId}` - Get device status
- `POST /api/arduino/user-config` - Save configuration

**Dashboard Endpoints:**
- `GET /api/dashboard/latest-readings/{deviceId}` - Get recent readings (limit param)
- `GET /api/dashboard/irrigation-history/{deviceId}` - Get events (hours param)
- `GET /api/dashboard/device-config/{deviceId}` - Get saved configuration
- `GET /api/dashboard/stats/{deviceId}` - Get statistics (days param)

### Sample Device ID
Default device ID: `arduino_r4_01`

## Deployment

### Using Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables:
   - `VITE_API_URL`: Your backend URL
4. Deploy automatically on push

### Using Netlify

1. Push code to GitHub
2. Connect to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Set environment variables in Netlify dashboard

### Using Docker

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

Build and run:
```bash
docker build -t smart-irrigation-frontend .
docker run -p 3000:3000 smart-irrigation-frontend
```

## Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5173
kill -9 <PID>
```

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables Not Loading
- Restart dev server: `npm run dev`
- Check `.env` file exists in root
- Verify `VITE_` prefix for Vite variables

### API Connection Issues
- Verify backend is running
- Check `VITE_API_URL` in `.env`
- Check CORS settings in backend
- Open DevTools Network tab to see requests

### Build Errors
```bash
# Clear build cache
rm -rf dist/

# Rebuild
npm run build
```

## Development Tips

### Hot Module Replacement (HMR)
Changes to files are automatically reflected in the browser without full page reload.

### Debug Mode
Check browser DevTools for:
- Console: Error messages
- Network: API requests
- React DevTools: Component tree

### Testing API Endpoints
Use the "Send Test Data" button on the dashboard to generate mock data.

## Performance Optimization

- Lazy loading of images (if any)
- Code splitting with Vite
- CSS purging with Tailwind
- Tree shaking of unused dependencies
- Optimized bundle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Security

- CORS configured for backend only
- Environment variables for sensitive data
- HTTPS recommended for production
- Input validation on forms

## Monitoring & Analytics

To add analytics, update `App.jsx`:
```jsx
// Add analytics service of choice
// Google Analytics, Mixpanel, etc.
```

## Contributing

1. Create a feature branch
2. Make changes with clear commits
3. Test thoroughly
4. Submit pull request

## License

[Specify your license here]

## Support

For issues or questions:
- Check documentation files
- Review component code
- Check browser console for errors
- Contact development team

---

**Smart Irrigation Frontend v1.0.0**
**Last Updated**: January 9, 2026
**Status**: Production Ready ✅
