# Password Protection Deployment Guide

## Vercel Deployment with Password Protection

### Step 1: Add Environment Variable to Vercel

```bash
# Using Vercel CLI (already configured with VERCEL_TOKEN)
vercel env add DEV_ACCESS_PASSWORD production
```

When prompted, enter your password (default: `6fx-dev-2026`)

### Step 2: Deploy to Vercel

```bash
# Deploy to production
vercel --prod --token=$VERCEL_TOKEN --yes
```

### What Was Implemented

**Protected Routes:**
- All pages require password authentication
- Middleware redirects unauthenticated users to `/login`
- Session valid for 7 days via HttpOnly cookie

**Files Created:**
- `app/login/page.tsx` - Login page
- `app/api/auth/login/route.ts` - Authentication endpoint
- `app/api/auth/logout/route.ts` - Logout endpoint
- `middleware.ts` - Route protection

**Environment Variable:**
- `DEV_ACCESS_PASSWORD` - Password for site access (default: `6fx-dev-2026`)

### Security Features

- HttpOnly cookies (JavaScript cannot access)
- Secure flag in production (HTTPS only)
- SameSite protection
- 7-day session expiration

### Changing the Password

**Option 1: Vercel Dashboard**
1. Go to project settings
2. Environment Variables
3. Update `DEV_ACCESS_PASSWORD`
4. Redeploy

**Option 2: Vercel CLI**
```bash
vercel env rm DEV_ACCESS_PASSWORD production
vercel env add DEV_ACCESS_PASSWORD production
# Enter new password when prompted
vercel --prod --token=$VERCEL_TOKEN --yes
```

### Testing After Deployment

1. Visit your Vercel URL
2. You'll be redirected to `/login`
3. Enter password: `6fx-dev-2026`
4. Access granted for 7 days

## Production Ready

✅ Password protection active
✅ All routes protected except `/login`
✅ Secure cookie-based sessions
✅ Ready for Vercel deployment
