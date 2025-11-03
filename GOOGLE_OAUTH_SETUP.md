# 🔧 Fix Google OAuth "redirect_uri_mismatch" Error

## The Problem

You're seeing: **"Error 400: redirect_uri_mismatch"**

This happens because Google needs to know exactly which URLs your app can redirect to after login.

---

## ✅ Quick Fix (5 minutes)

### Step 1: Find Your Google Cloud Console

1. Go to: https://console.cloud.google.com/
2. Select your project (or create a new one)
3. In the left menu, go to: **APIs & Services** → **Credentials**

### Step 2: Create or Edit OAuth Client

**If you DON'T have an OAuth client yet:**
1. Click **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
2. Choose **"Web application"**
3. Give it a name (e.g., "AI-LMS Local Dev")

**If you already have one:**
1. Find your OAuth 2.0 Client ID in the list
2. Click the pencil icon to edit it

### Step 3: Add Redirect URIs

In the **"Authorized redirect URIs"** section, add BOTH of these:

```
http://localhost:3001/auth/callback
https://brmdzbtdypfxwbjburkz.supabase.co/auth/v1/callback
```

**Why both?**
- First one: For testing locally on your computer
- Second one: For Supabase to handle the OAuth flow

### Step 4: Save and Copy Credentials

1. Click **"SAVE"** at the bottom
2. Copy your **Client ID** (looks like: `xxxxx.apps.googleusercontent.com`)
3. Copy your **Client Secret** (random string)

### Step 5: Add to Supabase

1. Go to: https://app.supabase.com/project/brmdzbtdypfxwbjburkz/auth/providers
2. Find **Google** provider and click it
3. Toggle it **ON**
4. Paste your **Client ID**
5. Paste your **Client Secret**
6. Click **"Save"**

### Step 6: Test It!

1. Go to: http://localhost:3001/login
2. Click **"Sign in with Google"**
3. It should work now! ✅

---

## 🔍 Still Not Working?

### Common Issues:

**1. Wrong Port Number**
Your server is on port **3001**, not 3000. Make sure you added:
```
http://localhost:3001/auth/callback
```
(Note the **3001** not 3000!)

**2. Forgot to Save in Google Console**
After adding redirect URIs, you MUST click the **SAVE** button at the bottom.

**3. Google OAuth App in Testing Mode**
If your OAuth app is in "Testing" mode:
- Go to: **APIs & Services** → **OAuth consent screen**
- Add your email (mr7316@nyu.edu) to "Test users"
- OR publish your app (not required for development)

**4. Credentials Not in Supabase**
Make sure you:
- Enabled Google provider in Supabase
- Pasted BOTH Client ID and Secret
- Clicked Save

**5. Browser Cache**
Try opening in an incognito/private window

---

## 📝 Complete Google OAuth Setup Checklist

- [ ] Created/edited OAuth client in Google Cloud Console
- [ ] Added `http://localhost:3001/auth/callback` to redirect URIs
- [ ] Added `https://brmdzbtdypfxwbjburkz.supabase.co/auth/v1/callback` to redirect URIs
- [ ] Saved changes in Google Cloud Console
- [ ] Copied Client ID and Client Secret
- [ ] Enabled Google provider in Supabase
- [ ] Pasted credentials in Supabase
- [ ] Saved in Supabase
- [ ] (Optional) Added yourself as test user OR published app
- [ ] Tested login at http://localhost:3001/login

---

## 🎯 Alternative: Skip Google for Now

If you just want to test the authentication:

1. Go to http://localhost:3001/signup
2. Use **email and password** instead (no Google needed)
3. Create a test account
4. You can set up Google OAuth later!

---

## 📸 Visual Guide

### What it should look like in Google Cloud Console:

**Authorized redirect URIs section:**
```
✓ http://localhost:3001/auth/callback
✓ https://brmdzbtdypfxwbjburkz.supabase.co/auth/v1/callback
```

### What it should look like in Supabase:

**Google Provider:**
- Status: **Enabled** (toggle ON)
- Client ID: `xxxxx.apps.googleusercontent.com`
- Client Secret: `xxxxxxxxxx`
- Redirect URL: `https://brmdzbtdypfxwbjburkz.supabase.co/auth/v1/callback` (auto-filled)

---

## ✅ Success!

Once configured, you'll be able to:
- Click "Sign in with Google"
- Choose your Google account
- Automatically create an account
- Be redirected to your dashboard

The first time you sign in with Google, it will:
1. Create a Supabase auth user
2. Create a profile in your profiles table
3. Assign you the default role (student)
4. Log you in and redirect to /student or /teacher

---

## Need More Help?

### Check these URLs:

**Your Local App:**
- Homepage: http://localhost:3001
- Login: http://localhost:3001/login
- Signup: http://localhost:3001/signup

**Google Cloud Console:**
- Credentials: https://console.cloud.google.com/apis/credentials

**Supabase Dashboard:**
- Auth Providers: https://app.supabase.com/project/brmdzbtdypfxwbjburkz/auth/providers
- Auth Settings: https://app.supabase.com/project/brmdzbtdypfxwbjburkz/auth/settings

**Test with Email Instead:**
- Just use email/password signup for now
- Google OAuth is optional!

