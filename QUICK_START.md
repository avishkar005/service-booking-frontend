# ⚡ Quick Start Guide (5 Minutes)

## Prerequisites Check ✓

Before starting, ensure you have:
- **Node.js** (v18+) installed → Check: `node --version`
- **npm** (v9+) installed → Check: `npm --version`

If not, download from: https://nodejs.org/

---

## 🚀 Installation (Copy & Paste)

Open your terminal in the project folder and run:

```bash
# Step 1: Install dependencies (takes 2-5 minutes)
npm install

# Step 2: Create environment file
cp .env.example .env.local

# Step 3: Start the app
npm run dev
```

**That's it!** Open http://localhost:3000 in your browser.

---

## 🎯 What You'll See

1. **Login Page** - Beautiful split-screen design
   - Try email: `demo@example.com`
   - Password: `password123`
   - Or click "Continue with Google"

2. **Register Page** - Create new account
   - Choose: Customer or Service Provider
   - Fill in the form
   - Get instant access

3. **Customer Dashboard** - After login as customer
   - Browse service categories
   - View featured vendors
   - See recent bookings

4. **Vendor Dashboard** - After login as vendor
   - View analytics and stats
   - Manage booking requests
   - Track earnings

---

## 📁 Project Structure (Need to Know)

```
service-booking-platform/
├── app/                    # All your pages
│   ├── auth/              # Login & Register
│   ├── customer/          # Customer pages
│   └── vendor/            # Vendor pages
├── components/            # Reusable UI components
├── lib/                   # Utilities, API, state
├── package.json          # Dependencies
└── .env.local            # Your config (API URL, etc.)
```

---

## 🔧 Important Files to Edit

### 1. `.env.local` - Backend Connection
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```
Change this to your Spring Boot backend URL.

### 2. `tailwind.config.js` - Colors & Design
```javascript
colors: {
  primary: '#667eea',    // Change this
  secondary: '#764ba2',  // Change this
}
```

### 3. `lib/api.ts` - API Endpoints
All backend API calls are defined here.

---

## 🎨 Customization Quick Tips

### Change Brand Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#YOUR_COLOR_HERE',
    }
  }
}
```

### Change Logo/App Name
Edit `app/layout.tsx`:
```typescript
export const metadata = {
  title: 'Your App Name',
  description: 'Your Description',
}
```

### Add New Page
Create file: `app/your-page/page.tsx`
```tsx
export default function YourPage() {
  return <div>Your content here</div>
}
```

---

## 🔌 Connecting to Spring Boot Backend

### 1. Make sure Spring Boot is running
```bash
# Your Spring Boot should be on:
http://localhost:8080
```

### 2. Enable CORS in Spring Boot
Add this to your Spring Boot app:
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }
}
```

### 3. Test API Connection
Open browser console (F12) and check Network tab for API calls.

---

## 📱 Testing on Mobile/Tablet

The app is fully responsive!

```bash
# Find your local IP
ipconfig getifaddr en0  # Mac
ipconfig               # Windows

# Then access from mobile:
http://YOUR_IP:3000
```

---

## 🏗️ Building for Production

When ready to deploy:

```bash
# Create optimized build
npm run build

# Test production build locally
npm start

# Deploy to Vercel (easiest)
npm install -g vercel
vercel
```

---

## 🐛 Quick Troubleshooting

### Problem: "npm: command not found"
→ **Install Node.js** from https://nodejs.org/

### Problem: Port 3000 already in use
→ Run on different port:
```bash
npm run dev -- -p 3001
```

### Problem: Changes not showing
→ Hard refresh browser: `Ctrl+Shift+R` (or `Cmd+Shift+R`)

### Problem: TypeScript errors
→ Restart VS Code TypeScript server:
`Cmd/Ctrl + Shift + P` → Type "TypeScript: Restart TS Server"

---

## ✅ Verification Checklist

After setup, verify:
- [ ] Server runs: `npm run dev` works
- [ ] Opens in browser: http://localhost:3000
- [ ] Can click between Login/Register
- [ ] Can login (even with fake credentials - won't connect to real API yet)
- [ ] See dashboard after login
- [ ] No red errors in browser console (F12)

---

## 🎓 Learning Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React**: https://react.dev

---

## 📞 Common Questions

**Q: Do I need MongoDB installed locally?**
A: No! That's for your Spring Boot backend. This is just the frontend.

**Q: Can I use this with a different backend (not Spring Boot)?**
A: Yes! Just update the API endpoints in `lib/api.ts`

**Q: Is this production-ready?**
A: Yes! The code structure follows Next.js best practices. Just add your real backend API.

**Q: How do I deploy this?**
A: Easiest: Vercel (free). Just run `vercel` in the terminal.

---

## 🎉 You're All Set!

Your app is running at: **http://localhost:3000**

**Next Steps:**
1. ✅ Explore the UI and features
2. ✅ Connect to your Spring Boot backend
3. ✅ Customize colors and branding
4. ✅ Add your own features
5. ✅ Deploy to production

**Happy Coding! 🚀**
