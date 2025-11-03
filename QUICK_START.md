# 🚀 Quick Start Guide - Authentication Setup

## ⚡ 3 Steps to Get Started

### Step 1: Set Up Your Database (5 minutes)

1. Go to: https://app.supabase.com/project/brmdzbtdypfxwbjburkz/sql/new
2. Copy ALL the code from `supabase-schema.sql`
3. Paste it into the SQL Editor
4. Click "Run" button
5. You should see "Success" message

**That's it! Your database is ready.**

---

### Step 2: Disable Email Confirmation (For Testing)

1. Go to: https://app.supabase.com/project/brmdzbtdypfxwbjburkz/auth/settings
2. Scroll to "Email Confirmations"
3. **Uncheck** "Enable email confirmations"
4. Click "Save"

**Why?** This lets you test without checking email during development.

---

### Step 3: Test Your Login

1. Your server should be running at: http://localhost:3001 (or 3000)
2. Go to: http://localhost:3001/signup (or whatever port is shown)
3. Fill out the form:
   - Choose "Student" or "Teacher"
   - Enter your name
   - Enter your email
   - Create a password (6+ characters)
   - Confirm password
4. Click "Create Account"
5. You should be redirected to your dashboard!

**Try logging out and back in to test the login page.**

---

## 🎯 Test Checklist

- [ ] Created database table (Step 1)
- [ ] Disabled email confirmation (Step 2)
- [ ] Successfully signed up a test user
- [ ] Successfully logged in
- [ ] Can see user email on dashboard
- [ ] Successfully logged out
- [ ] Can log back in

---

## 🔧 Optional: Enable Google Login

### A. Set Up Google OAuth App

1. Go to: https://console.cloud.google.com/
2. Create new project (or select existing)
3. Navigate to: **APIs & Services** → **Credentials**
4. Click: **Create Credentials** → **OAuth client ID**
5. Choose: **Web application**
6. Add redirect URI:
   ```
   https://brmdzbtdypfxwbjburkz.supabase.co/auth/v1/callback
   ```
7. Copy your **Client ID** and **Client Secret**

### B. Configure Supabase

1. Go to: https://app.supabase.com/project/brmdzbtdypfxwbjburkz/auth/providers
2. Find **Google** provider
3. Toggle it ON
4. Paste your Client ID and Client Secret
5. Click "Save"

### C. Test Google Login

1. Go to: http://localhost:3000/login
2. Click "Sign in with Google"
3. Choose your Google account
4. You should be redirected to your dashboard!

---

## 📝 What You Can Do Now

### Your authentication system supports:

✅ **Email/Password Signup** - Users can create accounts with email  
✅ **Email/Password Login** - Users can log in with credentials  
✅ **Google OAuth** - One-click sign in with Google (after setup)  
✅ **Role-Based Access** - Students and Teachers have separate dashboards  
✅ **Protected Routes** - Only logged-in users can access dashboards  
✅ **Session Management** - Users stay logged in until they sign out  
✅ **Secure Storage** - User data stored safely in Supabase  

---

## 🐛 Common Issues

### "relation public.profiles does not exist"
➡️ **Solution**: Run the SQL from `supabase-schema.sql` in Supabase SQL Editor

### Can't sign up or log in
➡️ **Solution**: Check your browser console for errors  
➡️ Make sure `.env.local` file exists with correct credentials

### Google login button does nothing
➡️ **Solution**: You need to set up Google OAuth (see "Optional: Enable Google Login" above)

### Email confirmation required
➡️ **Solution**: Disable email confirmation in Supabase settings (Step 2 above)

---

## 📚 Important Files

- **`supabase-schema.sql`** - Database setup (run this first!)
- **`DATABASE_SETUP.md`** - Detailed database instructions
- **`AUTH_SETUP_COMPLETE.md`** - Complete documentation
- **`.env.local`** - Your Supabase credentials (already configured)

---

## 🎉 Next Steps

Once authentication is working:

1. **Add Sign Out Button** to your dashboards:
   ```tsx
   import { SignOutButton } from '@/components/auth/sign-out-button'
   
   <SignOutButton />
   ```

2. **Show User Info**:
   ```tsx
   import { useAuth } from '@/lib/auth/auth-context'
   
   const { user } = useAuth()
   <p>Welcome, {user?.email}!</p>
   ```

3. **Protect Your Pages**:
   ```tsx
   import { ProtectedRoute } from '@/lib/auth/protected-route'
   
   <ProtectedRoute requiredRole="student">
     {/* Your content */}
   </ProtectedRoute>
   ```

---

## ✅ You're All Set!

Your authentication is now fully functional. Start building your app! 🚀

**Need help?** Check `AUTH_SETUP_COMPLETE.md` for detailed documentation.

