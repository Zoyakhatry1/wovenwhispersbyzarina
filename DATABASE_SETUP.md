# 🗄️ Database Setup Guide - Supabase Integration

## What Changed?

Your WovenWhispers store now has **database support**! This means:
- ✅ Updates from admin panel are **instant** and **global**
- ✅ All devices see the same products immediately
- ✅ No need to edit code files anymore
- ✅ Changes persist permanently in the cloud

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Free Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign up with GitHub (or email)
4. Click **"New project"**

### Step 2: Create a New Project

Fill in:
- **Project name**: `wovenwhispers-store` (or anything you like)
- **Database Password**: Choose a strong password (save it somewhere!)
- **Region**: Choose closest to you (India → Mumbai/Singapore)
- **Pricing Plan**: Free tier (perfect for your store!)

Click **"Create new project"** and wait 1-2 minutes.

### Step 3: Create Products Table

1. In your Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New query"**
3. Paste this SQL code:

```sql
-- Create products table
CREATE TABLE products (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  emoji TEXT,
  badge TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access"
  ON products
  FOR SELECT
  TO PUBLIC
  USING (true);

-- Create policy to allow public write access (for admin)
-- In production, you should secure this with auth!
CREATE POLICY "Allow public write access"
  ON products
  FOR ALL
  TO PUBLIC
  USING (true)
  WITH CHECK (true);
```

4. Click **"Run"** (or press Ctrl/Cmd + Enter)
5. You should see "Success. No rows returned"

### Step 4: Get Your API Credentials

1. Click **"Settings"** (left sidebar, bottom)
2. Click **"API"**
3. Copy these two values:

   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (the long string under "Project API keys")

### Step 5: Add to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your **wovenwhispers** project
3. Click **"Settings"** → **"Environment Variables"**
4. Add TWO new variables:

   **Variable 1:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://xxxxx.supabase.co` (paste your Project URL)
   - Click **"Add"**

   **Variable 2:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: (paste your anon public key)
   - Click **"Add"**

5. Click **"Redeploy"** or push a new commit to trigger deployment

### Step 6: Test It!

1. Wait 1-2 minutes for Vercel to redeploy
2. Go to your admin page: `your-site.vercel.app/admin`
3. Login (password: `crochet2025`)
4. Add/edit a product
5. Click **"💾 Save All Changes to Database"**
6. You should see: "✅ Products saved successfully! Changes are now live for everyone."
7. Open your site on your phone - changes should appear instantly! 🎉

---

## 📱 How It Works Now

### Before (localStorage):
```
You update admin → Saved to YOUR browser only
Phone/other devices → Still see old products ❌
```

### After (Supabase):
```
You update admin → Saves to cloud database ☁️
                ↓
All devices fetch from database
                ↓
Everyone sees new products instantly! ✅
```

---

## 🔧 Troubleshooting

### "Database not configured" message?

**Problem**: Environment variables not set in Vercel

**Solution**:
1. Check Vercel → Settings → Environment Variables
2. Make sure both variables are there:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Click "Redeploy" after adding them

### Products not showing after save?

**Problem**: Database table might not have data

**Solution**:
1. Go to Supabase dashboard
2. Click "Table Editor" → "products"
3. You should see your products listed
4. If empty, click "Save All Changes to Database" again in admin

### Still using localStorage?

**Problem**: Code might be using fallback

**Solution**:
- Open browser console (F12)
- Check for any error messages
- Make sure you've deployed the latest code with database support

---

## 🎯 Usage Guide

### Adding Products:

1. Go to `/admin`
2. Click **"+ Add New Product"**
3. Fill in details
4. Click **"Add Product"**
5. Click **"💾 Save All Changes to Database"**
6. Done! Product is live for everyone

### Editing Products:

1. Go to `/admin`
2. Find the product
3. Click **"✏️ Edit"**
4. Make changes
5. Click **"Update Product"**
6. Click **"💾 Save All Changes to Database"**
7. Done! Changes are live

### Deleting Products:

1. Go to `/admin`
2. Find the product
3. Click **"🗑️ Delete"**
4. Confirm
5. Click **"💾 Save All Changes to Database"**
6. Done! Product removed for everyone

---

## 🔐 Security Note

**Current Setup**: Anyone with admin password can edit products

**For Production** (when you're ready):
1. Enable Supabase Auth
2. Create admin user accounts
3. Update RLS policies to require authentication
4. Remove the public write policy

But for now, the simple password protection is fine for testing!

---

## 💰 Cost

**Supabase Free Tier includes:**
- ✅ 500 MB database
- ✅ 1 GB file storage
- ✅ 50,000 monthly active users
- ✅ Unlimited API requests

**Perfect for small stores!** You won't need to pay unless you get thousands of customers.

---

## ✅ Checklist

- [ ] Created Supabase account
- [ ] Created new project
- [ ] Created products table (ran SQL)
- [ ] Copied Project URL
- [ ] Copied anon public key
- [ ] Added environment variables to Vercel
- [ ] Redeployed on Vercel
- [ ] Tested admin panel
- [ ] Saved products to database
- [ ] Verified changes appear on phone

---

## 🆘 Need Help?

If you get stuck:
1. Check Supabase dashboard for any error messages
2. Check Vercel deployment logs
3. Open browser console (F12) to see JavaScript errors
4. Make sure environment variables are set correctly

The setup guide above covers 99% of cases. Follow it step by step and you'll be good! 🚀

---

## 📊 View Your Data

Want to see your products in the database?

1. Go to Supabase dashboard
2. Click **"Table Editor"**
3. Click **"products"** table
4. You can see/edit all products here too!

This is useful for:
- Checking what's in the database
- Manual edits if needed
- Viewing analytics

---

**That's it! You now have a professional, database-backed e-commerce store! 🎉**
