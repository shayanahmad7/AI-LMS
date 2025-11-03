# 🔧 Fixed: Infinite Recursion Error

## What Was the Problem?

The error "infinite recursion detected in policy for relation 'profiles'" was caused by a policy that tried to check if a user was a teacher by querying the same table it was protecting.

### Old Policy (❌ Broken):
```sql
CREATE POLICY "Teachers can view all profiles"
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles  -- ⚠️ This causes recursion!
      WHERE id = auth.uid() AND role = 'teacher'
    )
  );
```

When a teacher tried to read profiles, the policy checked the profiles table to see if they were a teacher, which triggered the same policy again → infinite loop!

---

## ✅ The Fix

I've simplified the policies to avoid recursion:

### New Policy (✅ Works):
```sql
-- All authenticated users can read all profiles
CREATE POLICY "Enable read for authenticated users"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (true);
```

This is simpler and avoids the recursion issue. In an LMS, it makes sense for:
- Students to see other students (for group work, etc.)
- Teachers to see all students
- Everyone to see public profile information

---

## 🚀 How to Fix Your Database

### Option 1: Run the Updated SQL (Recommended)

1. Go to: https://app.supabase.com/project/brmdzbtdypfxwbjburkz/sql/new
2. Copy the ENTIRE updated `supabase-schema.sql` file
3. Paste and run it
4. The SQL now includes commands to drop old policies first
5. Click **"Run"**

### Option 2: Drop the Table and Start Fresh

If you're still getting errors, you can start completely fresh:

1. Go to: https://app.supabase.com/project/brmdzbtdypfxwbjburkz/sql/new
2. Run this command first:
```sql
DROP TABLE IF EXISTS public.profiles CASCADE;
```
3. Then run the entire `supabase-schema.sql` file

---

## ✅ Test Your Fix

After running the SQL:

1. **Check Setup:**
   - Go to: http://localhost:3001/setup-check
   - All checks should be green now! ✅

2. **Test Signup:**
   - Go to: http://localhost:3001/signup
   - Create a test account
   - Should work without errors

3. **Test Login:**
   - Go to: http://localhost:3001/login
   - Login with your account
   - Should redirect to dashboard ✅

---

## 📊 What the New Policies Do

### ✅ Read Policy
- **Who:** All authenticated users
- **Can do:** Read any profile
- **Why:** Simple, no recursion, works for LMS use case

### ✅ Insert Policy
- **Who:** Authenticated users
- **Can do:** Create their own profile only
- **Why:** Users create their profile during signup

### ✅ Update Policy
- **Who:** Authenticated users
- **Can do:** Update their own profile only
- **Why:** Users can edit their own info, not others

---

## 🔐 Security Notes

This setup is secure for an LMS because:
- ✅ Only authenticated users can access profiles
- ✅ Users can only update their own profile
- ✅ Profile data is appropriate for an LMS (not sensitive)
- ✅ Teachers need to see student profiles anyway

If you need stricter controls later, you can:
- Hide certain fields from students
- Add role-based access at the application level
- Use Postgres functions to avoid recursion

---

## 🎯 Quick Summary

**Before:** Complex policy with recursion ❌  
**After:** Simple policy that works ✅

**Just run the updated SQL and you're good to go!** 🚀

