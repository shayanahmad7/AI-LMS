# 🔧 Troubleshooting Guide

## ❌ Problem: "Invalid email or password" when logging in

### Quick Fix:

**Most likely cause: You haven't set up the database yet!**

1. Go to: https://app.supabase.com/project/brmdzbtdypfxwbjburkz/sql/new
2. Open the file `supabase-schema.sql` in your project
3. Copy ALL the SQL code
4. Paste it into Supabase SQL Editor
5. Click **"Run"**
6. Try logging in again!

### Other possible causes:

**1. Email Confirmation is Enabled**

Supabase might require you to confirm your email before logging in.

**Fix:**
- Go to: https://app.supabase.com/project/brmdzbtdypfxwbjburkz/auth/settings
- Find "Enable email confirmations"
- **Uncheck** it (for development)
- Click "Save"
- Try creating a new account and logging in

**2. Wrong Email or Password**

- Make sure you're using the exact same email and password you signed up with
- Passwords are case-sensitive
- Try resetting your password using the "Forgot password?" link

**3. Account Doesn't Exist Yet**

- Make sure you've actually created an account at http://localhost:3001/signup first
- Check Supabase dashboard to see if the user exists:
  - Go to: https://app.supabase.com/project/brmdzbtdypfxwbjburkz/auth/users
  - Your email should be in the list

---

## ❌ Problem: Forgot Password link gives 404

**Status: FIXED!** ✅

The forgot password page has been created. Try it now:
- http://localhost:3001/forgot-password

---

## ❌ Problem: "Access blocked" with Google Sign-in

**Solution:**

You need to add redirect URIs to Google Cloud Console.

See the full guide in `GOOGLE_OAUTH_SETUP.md`

**Quick fix:**
1. Go to https://console.cloud.google.com/apis/credentials
2. Add these redirect URIs:
   ```
   http://localhost:3001/auth/callback
   https://brmdzbtdypfxwbjburkz.supabase.co/auth/v1/callback
   ```
3. Save and try again

---

## ❌ Problem: Site looks broken or unstyled

**Status: Should be FIXED!** ✅

If you still see styling issues:
1. Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
2. Clear browser cache
3. Try in incognito/private window

---

## ✅ How to Check if Database is Set Up

Run this in Supabase SQL Editor to check if your profiles table exists:

```sql
SELECT * FROM profiles LIMIT 5;
```

**If you get an error like "relation public.profiles does not exist":**
- You need to run the SQL from `supabase-schema.sql`

**If you see a table (even if empty):**
- Your database is set up correctly! ✅

---

## ✅ How to Check if a User Exists

1. Go to: https://app.supabase.com/project/brmdzbtdypfxwbjburkz/auth/users
2. Look for your email in the list
3. Check the "Confirmed" column:
   - ✅ Green checkmark = Email confirmed
   - ⏳ Pending = Email not confirmed yet

---

## ✅ Testing Checklist

Use this to verify everything is working:

### Database Setup
- [ ] Ran `supabase-schema.sql` in Supabase SQL Editor
- [ ] Can see `profiles` table in Supabase (Table Editor)
- [ ] No errors when running: `SELECT * FROM profiles;`

### Email Confirmation Settings
- [ ] Disabled "Email confirmations" in Supabase for development
- [ ] OR checked email and clicked confirmation link

### Account Creation
- [ ] Can access http://localhost:3001/signup
- [ ] Can fill out signup form
- [ ] Signup completes without errors
- [ ] User appears in Supabase auth users list

### Login
- [ ] Can access http://localhost:3001/login
- [ ] Can enter email and password
- [ ] Login succeeds and redirects to dashboard
- [ ] Can see dashboard page

### Password Reset
- [ ] Can access http://localhost:3001/forgot-password
- [ ] Can submit email address
- [ ] Receives success message

---

## 🚨 Common Error Messages

### "Invalid login credentials"
**Cause:** Wrong email/password OR email not confirmed
**Fix:** 
1. Check you're using the right credentials
2. Disable email confirmation in Supabase settings
3. Try creating a new account

### "Email not confirmed"
**Cause:** Email confirmation is enabled and you haven't clicked the link
**Fix:**
1. Check your email for confirmation link
2. OR disable email confirmations in Supabase

### "relation public.profiles does not exist"
**Cause:** Database table hasn't been created
**Fix:** Run `supabase-schema.sql` in Supabase SQL Editor

### "redirect_uri_mismatch"
**Cause:** Google OAuth redirect URIs not configured
**Fix:** See `GOOGLE_OAUTH_SETUP.md`

### "Network error" or "Failed to fetch"
**Cause:** Can't connect to Supabase
**Fix:**
1. Check your internet connection
2. Verify Supabase URL and key in `.env.local`
3. Make sure Supabase project is active

---

## 📞 Still Having Issues?

### Check These:

1. **Server is running:**
   - Terminal should show: `Local: http://localhost:3001`
   - Try accessing http://localhost:3001 in browser

2. **Environment variables exist:**
   - Check `.env.local` file exists
   - Contains NEXT_PUBLIC_SUPABASE_URL
   - Contains NEXT_PUBLIC_SUPABASE_ANON_KEY

3. **Database is set up:**
   - Run `supabase-schema.sql` in Supabase
   - Check that profiles table exists

4. **Supabase project is active:**
   - Go to https://app.supabase.com/
   - Make sure your project is running (not paused)

### Quick Test:

Try signing up with a NEW email address:
1. Go to http://localhost:3001/signup
2. Use a different email
3. Fill out the form
4. If signup works, the issue was with your original account
5. Try logging in with the NEW account

---

## ✅ Everything Working?

Once you can:
- ✅ Sign up with email/password
- ✅ Log in with email/password
- ✅ See your dashboard after login
- ✅ Use forgot password feature

Then your authentication is fully working! 🎉

Next steps:
- Set up Google OAuth (optional)
- Start building your courses
- Add students/teachers
- Explore the dashboard features

