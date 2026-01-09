# 🚀 Quick Reference Card - Smart Irrigation Frontend

## One-Minute Setup

```bash
cd smart-irrigation-frontend
npm install
npm run dev
# Open http://localhost:5173
```

---

## Project at a Glance

| Aspect | Details |
|--------|---------|
| **Framework** | React 18 + Vite |
| **Styling** | Tailwind CSS |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Build Time** | ~3-5 seconds |
| **Bundle Size** | ~500KB (optimized) |

---

## Directory Structure

```
src/
├── components/ (8 components)
├── pages/ (3 pages)
├── services/ (API client)
└── styles/
```

---

## Key Features

🌡️ Real-time sensor monitoring
💧 Soil moisture tracking
📊 Data visualization charts
📱 Responsive design
⚡ Smooth animations
🎨 Modern gradient UI
🔄 Live auto-refresh
✅ Error handling

---

## NPM Scripts

```bash
npm run dev        # Start dev server
npm run build      # Create production build
npm run preview    # Preview production build
npm install        # Install dependencies
```

---

## Environment Setup

**.env file:**
```
VITE_API_URL=http://localhost:8000
```

---

## Component Quick Links

| Component | Purpose | Location |
|-----------|---------|----------|
| SensorCard | Display sensor values | components/ |
| MotorStatus | Show motor state | components/ |
| Statistics | Show 7-day stats | components/ |
| Dashboard | Main monitoring | pages/ |
| Settings | Configuration | pages/ |
| History | Event log | pages/ |

---

## API Base URL

```
{VITE_API_URL}/api/
```

**Default Device ID**: `arduino_r4_01`

---

## Important Files

- `vite.config.js` - Build configuration
- `tailwind.config.js` - Styling config
- `.env` - Environment variables
- `package.json` - Dependencies
- `App.jsx` - Main app component

---

## Color Scheme

🟢 Emerald - Normal/Success
🟡 Amber - Warning
🔴 Red - Critical
🔵 Blue - Info

---

## Responsive Breakpoints

- **Mobile** (default)
- **Tablet** (md: 768px)
- **Desktop** (lg: 1024px)
- **Large** (xl: 1280px)

---

## Common Commands

```bash
# Install new package
npm install package-name

# Remove node_modules
rm -rf node_modules package-lock.json
npm install

# Clear dist
rm -rf dist

# Fix linting issues
npm run lint -- --fix
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port in use | Kill process or use different port |
| Module not found | Run `npm install` |
| Build fails | Clear `dist/` and rebuild |
| API errors | Check `.env` and backend |
| Styling issues | Clear cache, restart dev server |

---

## File Size Optimization

- ✅ Tree-shaken unused code
- ✅ Minified CSS with Tailwind
- ✅ Code splitting enabled
- ✅ Production optimizations

---

## Browser Support

- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Mobile browsers ✅

---

## Keyboard Shortcuts

- `Ctrl+K` - Search (if implemented)
- `Tab` - Navigate
- `Enter` - Submit forms
- `Esc` - Close modals

---

## Performance Tips

1. Use dev tools to profile
2. Check Network tab for API calls
3. Monitor bundle size
4. Test on mobile devices
5. Use React DevTools extension

---

## Documentation Files

- `README.md` - Overview
- `DESIGN_GUIDE.md` - Design system
- `ENHANCEMENT_SUMMARY.md` - Changes
- `INSTALLATION_GUIDE.md` - Setup
- `ENHANCEMENT_REPORT.md` - Full report

---

## Getting Help

1. Check documentation files
2. Review component code
3. Check browser console
4. Review API responses
5. Check network tab

---

## Next Steps

1. ✅ Install dependencies
2. ✅ Configure .env
3. ✅ Start dev server
4. ✅ Test on mobile
5. ✅ Deploy to production

---

## Production Checklist

- [ ] .env configured
- [ ] API URL correct
- [ ] Built with `npm run build`
- [ ] Tested in production mode
- [ ] No console errors
- [ ] Responsive on all devices
- [ ] All features working

---

## Quick Links

- 📖 [Documentation](./README.md)
- 🎨 [Design Guide](./DESIGN_GUIDE.md)
- 📋 [Enhancement Report](./ENHANCEMENT_REPORT.md)
- 🚀 [Installation Guide](./INSTALLATION_GUIDE.md)

---

**Version 1.0.0 | Production Ready ✅**

Made with ❤️ for Smart Irrigation
