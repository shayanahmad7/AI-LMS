# Database Setup Instructions

## Steps to Set Up Your Supabase Database

### 1. Go to Your Supabase Project

Visit your Supabase dashboard: https://app.supabase.com/project/brmdzbtdypfxwbjburkz

### 2. Run the SQL Migration

1. Click on the **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy and paste the contents of `supabase-schema.sql` into the editor
4. Click **Run** to execute the SQL

This will create:
- A `profiles` table to store user information (name, email, role)
- Row Level Security (RLS) policies for data protection
- Indexes for better query performance
- Automatic timestamp management

### 3. Enable Google OAuth (Optional but Recommended)

1. Go to **Authentication** → **Providers** in your Supabase dashboard
2. Find **Google** in the list and click to configure
3. Enable the Google provider
4. You'll need to set up a Google OAuth app:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project (or select existing)
   - Enable Google+ API
   - Go to **Credentials** → **Create Credentials** → **OAuth client ID**
   - Choose **Web application**
   - Add authorized redirect URI: `https://brmdzbtdypfxwbjburkz.supabase.co/auth/v1/callback`
   - Copy the Client ID and Client Secret
5. Paste the Client ID and Client Secret into Supabase
6. Save the configuration

### 4. Configure Email Settings (Optional)

By default, Supabase uses their SMTP server for emails. To use your own:

1. Go to **Authentication** → **Email Templates**
2. Customize the confirmation and password reset emails
3. (Optional) Configure custom SMTP in **Settings** → **Auth**

### 5. Test Your Setup

1. Make sure your dev server is running: `npm run dev`
2. Go to http://localhost:3000/signup
3. Try signing up with email and password
4. Check your Supabase dashboard under **Authentication** → **Users** to see the new user
5. Try signing in with the credentials
6. Test Google OAuth if you configured it

## Database Schema

### profiles Table

| Column      | Type      | Description                           |
|-------------|-----------|---------------------------------------|
| id          | UUID      | Primary key (references auth.users)  |
| full_name   | TEXT      | User's full name                     |
| email       | TEXT      | User's email address                 |
| role        | TEXT      | Either 'student' or 'teacher'        |
| avatar_url  | TEXT      | Optional profile picture URL         |
| created_at  | TIMESTAMP | Account creation timestamp           |
| updated_at  | TIMESTAMP | Last update timestamp                |

## Security

- Row Level Security (RLS) is enabled
- Users can only read/update their own profiles
- Teachers can view all student profiles
- Authentication is required for all operations

## Troubleshooting

### Issue: "relation public.profiles does not exist"
**Solution**: Make sure you've run the SQL migration in the SQL Editor

### Issue: Google login doesn't work
**Solution**: 
1. Check that Google provider is enabled in Supabase
2. Verify the redirect URI matches exactly
3. Make sure your Google OAuth app is published (not in testing mode)

### Issue: Email confirmation not working
**Solution**: Check your email spam folder, or disable email confirmation in Supabase Authentication settings for development

### Issue: Users can't log in after signup
**Solution**: Check if email confirmation is required. You can disable it in Supabase under Authentication → Settings → "Enable email confirmations"

## Next Steps

After setting up the database, you can:
1. Add more fields to the profiles table as needed
2. Create additional tables for courses, assignments, etc.
3. Set up storage buckets for file uploads
4. Configure webhooks for real-time updates

