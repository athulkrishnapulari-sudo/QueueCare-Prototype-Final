# QueueCare Mobile App Setup Guide

## ✅ What's Been Configured

Your QueueCare app has been set up as a **Progressive Web App (PWA)**, which allows it to be installed and run as a native-like app on mobile devices.

### Changes Made:

1. **PWA Plugin Added** (`vite-plugin-pwa`)
   - Automatic service worker generation
   - Offline functionality support
   - App caching strategies

2. **Web App Manifest** (`public/manifest.json`)
   - App name, icons, and branding
   - Installation configuration
   - Display preferences

3. **Service Worker** (`public/sw.js`)
   - Offline support
   - Asset caching
   - API call handling

4. **Updated HTML** (`index.html`)
   - Meta tags for mobile optimization
   - Apple-specific tags for iOS
   - Service worker registration

---

## 📱 How to Install on Mobile

### Step 1: Build the App
```bash
npm run build
npm run preview
```

This creates a production build and starts a preview server at http://localhost:3000

### Step 2: Install on Android
1. Open Chrome browser on your Android phone
2. Navigate to `http://<your-computer-ip>:3000`
3. Tap the menu (⋮) → **Install app** (or look for install prompt at bottom)
4. Tap **Install**

### Step 3: Install on iOS
1. Open Safari browser on your iPhone
2. Navigate to `http://<your-computer-ip>:3000`
3. Tap Share icon (⬆️) → **Add to Home Screen**
4. Name your app and tap **Add**

---

## 🎨 Add App Icons (Important!)

Replace these placeholder icon files with your own:

- `public/icon-192x192.png` (192x192 pixels)
- `public/icon-512x512.png` (512x512 pixels)  
- `public/icon-maskable-192x192.png` (192x192 pixels, with safe zone)
- `public/icon-maskable-512x512.png` (512x512 pixels, with safe zone)

**Quick Icon Generation:**
Use a free online tool like:
- https://www.favicon-generator.org/
- https://realfavicongenerator.net/

---

## 🚀 Development Server

To run locally during development:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

---

## ⚙️ Available Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check TypeScript types |

---

## 🔧 Customization

### Change App Name/Details
Edit `public/manifest.json`:
```json
{
  "name": "Your App Name",
  "short_name": "Short Name",
  "description": "Your description",
  "theme_color": "#2563eb",
  "background_color": "#ffffff"
}
```

### Offline Strategy
Edit `public/sw.js` to customize caching behavior for APIs and assets.

---

## 🌐 Deployment Tips

1. **Enable HTTPS**: PWAs require HTTPS (except localhost). Deploy to a service like Vercel, Netlify, or AWS Amplify.

2. **Test on Different Devices**: Test installation on both Android (Chrome) and iOS (Safari).

3. **Monitor Service Worker**: Check browser DevTools → Application → Service Workers for issues.

---

## 📝 Next Steps

1. ✅ Dependencies installed
2. ⚠️ **ADD APP ICONS** (required for full PWA experience)
3. Run `npm run build` to create production build
4. Deploy to a hosting service
5. Test installation on your mobile device

---

## 🐛 Troubleshooting

**App won't install?**
- Check browser console for errors
- Ensure manifest.json is served correctly
- Verify service worker is registered

**Offline features not working?**
- Check Service Worker in DevTools → Application tab
- Ensure cache strategy in sw.js matches your needs
- Clear browser cache and try again

**Icons not showing?**
- Verify icon files exist in `public/` folder
- Check file sizes: 192x192 and 512x512 PNG
- Hard refresh browser (Ctrl+Shift+R)

---

Would you like help with:
- Creating the app icons?
- Deploying to a hosting service?
- Customizing the app configuration?
