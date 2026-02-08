# ServiceHub - Multi-Vendor Service Booking Platform

A complete, production-ready UrbanClap-like service booking platform built with Next.js, React, TypeScript, Tailwind CSS, and ShadCN UI.

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A code editor (VS Code recommended)

### Installation Steps

#### 1. Extract/Upload the Project Folder
```bash
# Navigate to your project directory
cd service-booking-platform
```

#### 2. Install Dependencies
```bash
# Using npm
npm install

# OR using yarn
yarn install
```

This will install all required packages including:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- ShadCN UI components
- Zustand (state management)
- Axios (API calls)
- React Hook Form + Zod (form validation)
- Framer Motion (animations)
- Recharts (charts)
- And more...

#### 3. Set Up Environment Variables
Create a `.env.local` file in the root directory:

```bash
# Copy the example env file
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Google OAuth (optional - for "Continue with Google")
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here

# Other configurations
NEXT_PUBLIC_APP_NAME=ServiceHub
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### 4. Run Development Server
```bash
# Using npm
npm run dev

# OR using yarn
yarn dev
```

The application will start at **http://localhost:3000**

#### 5. Build for Production
```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
service-booking-platform/
├── app/                          # Next.js App Router
│   ├── auth/                     # Authentication pages
│   │   ├── login/               # Login page
│   │   └── register/            # Registration page
│   ├── customer/                # Customer pages
│   │   ├── dashboard/           # Customer dashboard
│   │   ├── services/            # Service listing
│   │   ├── bookings/            # Booking management
│   │   └── profile/             # Customer profile
│   ├── vendor/                  # Vendor pages
│   │   ├── dashboard/           # Vendor dashboard
│   │   ├── services/            # Service management
│   │   ├── bookings/            # Booking requests
│   │   └── earnings/            # Earnings & analytics
│   ├── admin/                   # Admin panel
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── ui/                      # ShadCN UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── auth/                    # Auth components
│   ├── customer/                # Customer components
│   ├── vendor/                  # Vendor components
│   └── shared/                  # Shared components
├── lib/                         # Utilities & configurations
│   ├── api.ts                   # API client (Axios)
│   ├── store.ts                 # Zustand store
│   ├── types.ts                 # TypeScript types
│   ├── utils.ts                 # Utility functions
│   └── hooks/                   # Custom React hooks
├── public/                      # Static assets
│   ├── images/
│   └── fonts/
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.js          # Tailwind CSS config
├── next.config.js              # Next.js config
└── README.md                   # This file
```

## 🔧 Configuration Files Explained

### package.json
Contains all project dependencies and scripts. Already configured with all required packages.

### tsconfig.json
TypeScript configuration for type checking and compilation.

### tailwind.config.js
Tailwind CSS configuration with custom:
- Colors (primary, secondary, accent)
- Fonts (Outfit, Syne)
- Animations
- Custom utilities

### next.config.js
Next.js configuration for:
- Image optimization
- API routes
- Build optimization

## 📦 Key Dependencies

### Core Framework
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN UI** - High-quality component library
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### State Management
- **Zustand** - Lightweight state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### API & Data
- **Axios** - HTTP client
- **Date-fns** - Date utilities
- **Recharts** - Chart library

## 🌐 Backend Integration

### Spring Boot API Setup

The frontend is ready to connect to your Spring Boot backend. Here's what you need:

#### 1. Spring Boot Dependencies (pom.xml)
```xml
<dependencies>
    <!-- Spring Boot Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Security + JWT -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt</artifactId>
        <version>0.9.1</version>
    </dependency>
    
    <!-- MongoDB -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-mongodb</artifactId>
    </dependency>
    
    <!-- Validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
</dependencies>
```

#### 2. Configure CORS in Spring Boot

Create a `WebConfig.java`:
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

#### 3. MongoDB Configuration

In `application.properties`:
```properties
# MongoDB Configuration
spring.data.mongodb.uri=mongodb://localhost:27017/servicehub
spring.data.mongodb.database=servicehub

# Server Configuration
server.port=8080

# JWT Configuration
jwt.secret=your-secret-key-here
jwt.expiration=86400000
```

#### 4. Required API Endpoints

The frontend expects these endpoints (all prefixed with `/api`):

**Authentication**
- POST `/auth/login` - User login
- POST `/auth/register` - User registration
- POST `/auth/google` - Google OAuth
- POST `/auth/logout` - User logout
- GET `/auth/refresh` - Refresh token

**Users**
- GET `/users/profile` - Get user profile
- PUT `/users/profile` - Update profile

**Services**
- GET `/services` - List all services
- GET `/services/:id` - Get service details
- POST `/services` - Create service (vendor)
- PUT `/services/:id` - Update service
- DELETE `/services/:id` - Delete service

**Bookings**
- GET `/bookings` - List bookings
- POST `/bookings` - Create booking
- PUT `/bookings/:id` - Update booking
- DELETE `/bookings/:id/cancel` - Cancel booking

**Categories**
- GET `/categories` - List categories

**Vendors**
- GET `/vendors` - List vendors
- GET `/vendors/:id` - Get vendor details

**Dashboard**
- GET `/dashboard/customer` - Customer stats
- GET `/dashboard/vendor` - Vendor stats

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color-here',
      secondary: '#your-color-here',
    }
  }
}
```

### Changing Fonts
Edit `app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;600;700&display=swap');
```

### Adding New Pages
1. Create folder in `app/` directory
2. Add `page.tsx` file
3. Export default component

## 📱 Features Checklist

### ✅ Authentication
- [x] Login page with email/password
- [x] Registration with role selection
- [x] Continue with Google OAuth
- [x] Forgot password flow
- [x] JWT token handling
- [x] Protected routes

### ✅ Customer Features
- [x] Service category browsing
- [x] Service search & filters
- [x] Vendor profiles
- [x] Booking system
- [x] Booking history
- [x] Reviews & ratings

### ✅ Vendor Features
- [x] Dashboard with analytics
- [x] Service management
- [x] Booking requests
- [x] Earnings tracking
- [x] Availability management
- [x] Customer reviews

### ✅ UI/UX
- [x] Responsive design
- [x] Modern animations
- [x] Glassmorphism effects
- [x] Skeleton loaders
- [x] Toast notifications
- [x] Modal dialogs

## 🐛 Troubleshooting

### Issue: Dependencies not installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: Port 3000 already in use
```bash
# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Issue: TypeScript errors
```bash
# Restart TypeScript server in VS Code
Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"
```

## 📚 Development Workflow

### 1. Start Development
```bash
npm run dev
```

### 2. Make Changes
- Edit files in `app/`, `components/`, or `lib/`
- Hot reload will update automatically

### 3. Test Features
- Test in multiple browsers
- Check responsive design (Chrome DevTools)
- Verify API integration

### 4. Build & Deploy
```bash
npm run build
npm start
```

## 🚀 Deployment Options

### Vercel (Recommended for Next.js)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload .next folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔐 Security Notes

### Before Production:
1. ✅ Change all default secrets in `.env.local`
2. ✅ Enable HTTPS
3. ✅ Set up proper CORS policies
4. ✅ Implement rate limiting
5. ✅ Add input validation
6. ✅ Set up error tracking (Sentry)
7. ✅ Enable CSP headers

## 📞 Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ShadCN UI Documentation](https://ui.shadcn.com)
- [React Documentation](https://react.dev)

## 📄 License

This project is ready for commercial use. Customize as needed for your requirements.

---

**Happy Coding! 🎉**

For any issues or questions, refer to the documentation links above or check the inline code comments.
