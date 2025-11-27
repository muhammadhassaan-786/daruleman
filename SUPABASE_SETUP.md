# Supabase Migration Setup Guide

## Overview
Your app has been fully migrated from JSON file storage to **Supabase PostgreSQL Database**. This ensures compatibility with Vercel deployment (no filesystem writes).

---

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"New Project"**
3. Fill in:
   - **Project Name**: daruleman
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users
4. Click **"Create new project"** and wait for it to initialize (~2 minutes)

---

## Step 2: Get Your Supabase Credentials

1. In Supabase dashboard, go to **Settings → API**
2. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Step 3: Create Environment Variables

Create `.env.local` in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Step 4: Create Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy the entire content from `supabase-schema.sql`
4. Paste it into the SQL editor
5. Click **"Run"**

This will create all 4 tables:
- `audiobayanat`
- `hamdonaatokalaam`
- `poems`
- `quotes`

---

## Step 5: Install Supabase Package

```bash
npm install @supabase/supabase-js
```

---

## Step 6: Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000/functions` and try adding content. Check the Supabase dashboard to see data being stored.

---

## Step 7: Deploy to Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Migrate to Supabase database"
   git push origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. In **Environment Variables**, add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```
5. Click **Deploy**

---

## Data Structure

### audiobayanat & hamdonaatokalaam
```json
{
  "id": 1,
  "title": "string",
  "scholar": "string",
  "duration": "MM:SS",
  "lang": "urdu|english|...",
  "url": "https://...",
  "date": "YYYY-MM-DD",
  "created_at": "timestamp"
}
```

### poems
```json
{
  "id": 1,
  "title": "string",
  "poet": "string",
  "lang": "urdu|english|...",
  "lines": ["line1", "line2", ...],
  "created_at": "timestamp"
}
```

### quotes
```json
{
  "id": 1,
  "quote": "string",
  "author": "string",
  "source": "string",
  "lang": "urdu|english|...",
  "created_at": "timestamp"
}
```

---

## Verifying It Works

After deployment:
- Try adding audio bayanat, poems, quotes from `/functions`
- Check Supabase dashboard → **Table Editor** to see new entries
- Verify GET requests fetch data correctly

---

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Ensure `.env.local` has both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- On Vercel, check **Settings → Environment Variables**

### Error: "Table does not exist"
- Run the SQL script from `supabase-schema.sql` again
- Verify all 4 tables appear in Supabase → **Table Editor**

### No data appearing in Supabase
- Check browser console for errors
- Verify RLS policies are enabled (they should be by default)
- Try inserting test data directly in Supabase dashboard

---

## No More JSON Files!

Your app now uses:
- ✅ **Supabase PostgreSQL** for data storage
- ✅ **Next.js API Routes** for CRUD operations
- ✅ **Zero filesystem writes** (Vercel compatible)
- ✅ **Free tier** supports ~1 million rows

You can safely delete the JSON files if desired:
- `public/audiobayanat.json`
- `public/hamdonaatokalaam.json`
- `public/poems.json`
- `public/quotes.json`
