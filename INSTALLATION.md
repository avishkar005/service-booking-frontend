# 📦 Installation & Setup Guide

## Step-by-Step Installation Instructions

### Step 1: Download & Extract

1. **Download** the project folder/zip file
2. **Extract** to your desired location
3. **Open terminal/command prompt** in the project directory

```bash
cd path/to/service-booking-platform
```

---

### Step 2: Install Node.js (If not already installed)

#### Windows:
1. Go to https://nodejs.org/
2. Download LTS version (Long Term Support)
3. Run installer and follow instructions
4. Verify installation:
```bash
node --version
npm --version
```

#### Mac:
Using Homebrew:
```bash
brew install node
```

Or download from https://nodejs.org/

#### Linux:
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

---

### Step 3: Install Project Dependencies

This is the **MOST IMPORTANT STEP**. Run this command in the project root directory:

```bash
npm install
```

**What this does:**
- Downloads all required packages (React, Next.js, Tailwind CSS, etc.)
- Creates `node_modules` folder with ~300MB of dependencies
- Takes 2-5 minutes depending on your internet speed

**Expected Output:**
```
added 312 packages, and audited 313 packages in 2m

42 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

**If you see errors:**
```bash
# Clear npm cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

### Step 4: Set Up Environment Variables

Create a file named `.env.local` in the root directory:

```bash
# Windows
copy .env.example .env.local

# Mac/Linux
cp .env.example .env.local
```

**Edit `.env.local`** with your settings:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

This tells the frontend where your Spring Boot backend is running.

---

### Step 5: Install Additional Dependencies (Optional)

#### Install Tailwind CSS Plugin
```bash
npm install -D tailwindcss-animate
```

#### Install Radix UI Components (for ShadCN)
```bash
npm install @radix-ui/react-slot
```

These should already be in package.json, but run if you encounter import errors.

---

### Step 6: Start Development Server

```bash
npm run dev
```

**Expected Output:**
```
   ▲ Next.js 14.1.0
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 3.2s
```

**Open your browser** and go to: **http://localhost:3000**

---

## 🎯 Complete Terminal Command Sequence

Copy and paste these commands one by one:

```bash
# 1. Navigate to project
cd service-booking-platform

# 2. Install dependencies (WAIT for this to complete - takes 2-5 mins)
npm install

# 3. Copy environment file
cp .env.example .env.local

# 4. Start development server
npm run dev
```

---

## 🏗️ Building for Production

### Step 1: Create Production Build
```bash
npm run build
```

This will:
- Optimize all React components
- Minify JavaScript and CSS
- Generate static pages
- Create `.next` folder

**Expected Output:**
```
Route (app)                              Size     First Load JS
┌ ○ /                                    142 B          87.4 kB
├ ○ /auth/login                          5.02 kB        92.4 kB
├ ○ /auth/register                       5.23 kB        92.6 kB
└ ○ /customer/dashboard                  8.45 kB        95.8 kB

○  (Static)  automatically rendered as static HTML
```

### Step 2: Start Production Server
```bash
npm start
```

This runs the optimized production build on http://localhost:3000

---

## 🔧 Common Issues & Solutions

### Issue 1: "npm: command not found"
**Solution:** Node.js is not installed. Go to Step 2 and install Node.js.

---

### Issue 2: "Cannot find module 'next'"
**Solution:** Dependencies not installed. Run:
```bash
npm install
```

---

### Issue 3: Port 3000 is already in use
**Solution:** Either:
- Kill the process using port 3000
- Or run on different port:
```bash
npm run dev -- -p 3001
```

---

### Issue 4: "EACCES: permission denied"
**Solution (Mac/Linux):** Run with sudo or fix npm permissions:
```bash
sudo chown -R $USER:$(id -gn $USER) ~/.npm
sudo chown -R $USER:$(id -gn $USER) ~/.config
```

---

### Issue 5: Build errors or TypeScript errors
**Solution:**
```bash
# Delete build cache and node_modules
rm -rf .next node_modules package-lock.json

# Reinstall
npm install

# Rebuild
npm run build
```

---

## 📝 Verification Checklist

After installation, verify everything works:

- [ ] `npm install` completed without errors
- [ ] `npm run dev` starts server on http://localhost:3000
- [ ] Can access login page in browser
- [ ] Can navigate between login and register
- [ ] No console errors in browser DevTools (F12)
- [ ] Hot reload works (edit file and see changes)

---

## 🚀 Next Steps After Installation

1. **Configure Backend API**
   - Start your Spring Boot application on port 8080
   - Update `.env.local` with correct API URL

2. **Test Google OAuth** (optional)
   - Get Google Client ID from Google Cloud Console
   - Add to `.env.local`

3. **Customize Styling**
   - Edit `tailwind.config.js` for colors
   - Edit `app/globals.css` for global styles

4. **Add More Pages**
   - Create folders in `app/` directory
   - Follow Next.js App Router conventions

---

## 💡 Development Tips

### Hot Reload
Changes to files automatically refresh the browser. If not working:
```bash
# Restart dev server
Ctrl+C (to stop)
npm run dev (to start again)
```

### Code Editor Setup
**VS Code Extensions (Recommended):**
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- Prettier - Code formatter

### Browser DevTools
Press **F12** to open DevTools and check:
- Console for errors
- Network tab for API calls
- React DevTools for component debugging

---

## 📞 Need Help?

If you encounter issues:
1. Check the error message carefully
2. Google the exact error message
3. Check Node.js and npm versions:
   ```bash
   node --version  # Should be v18 or higher
   npm --version   # Should be v9 or higher
   ```
4. Review the troubleshooting section above

---

## Summary - Just 4 Commands!

For experienced developers, here's all you need:

```bash
cd service-booking-platform
npm install
cp .env.example .env.local
npm run dev
```

**Then open:** http://localhost:3000

That's it! You're ready to develop! 🎉
