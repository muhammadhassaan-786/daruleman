# Supabase Migration Checklist

## Pre-Deployment

- [ ] Install Supabase SDK: `npm install @supabase/supabase-js`
- [ ] Create Supabase account at https://supabase.com
- [ ] Create new project in Supabase
- [ ] Copy Project URL and anon key from Settings → API
- [ ] Create `.env.local` with credentials
- [ ] Run SQL schema from `supabase-schema.sql` in Supabase SQL editor
- [ ] Test locally with `npm run dev`
- [ ] Add test data from `/functions` page
- [ ] Verify data appears in Supabase dashboard

## Deployment to Vercel

- [ ] Commit and push to GitHub: `git add . && git commit -m "Migrate to Supabase" && git push`
- [ ] Go to Vercel dashboard
- [ ] Add environment variables:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Redeploy/trigger new deployment
- [ ] Test on live Vercel URL
- [ ] Verify adding new content works
- [ ] Check Supabase dashboard for new records

## Post-Deployment

- [ ] Monitor Supabase usage in dashboard
- [ ] Set up database backups (if not auto-enabled)
- [ ] Consider adding authentication for write operations
- [ ] Optionally delete old JSON files:
  - [ ] `public/audiobayanat.json`
  - [ ] `public/hamdonaatokalaam.json`
  - [ ] `public/poems.json`
  - [ ] `public/quotes.json`

## Files to Review

✅ All created/modified:
- `lib/supabase.js` - Client initialization
- `lib/api.js` - Helper functions
- `src/app/api/audiobayanat/route.js` - ✅ Migrated
- `src/app/api/hamdonaatokalaam/route.js` - ✅ Migrated
- `src/app/api/poems/route.js` - ✅ Migrated
- `src/app/api/quotes/route.js` - ✅ Migrated
- `supabase-schema.sql` - Database schema
- `SUPABASE_SETUP.md` - Full guide
- `MIGRATION_COMPLETE.md` - Summary
- `.env.example` - Template

## Expected Database After Setup

Tables created:
- [ ] `audiobayanat` (rows: ?)
- [ ] `hamdonaatokalaam` (rows: ?)
- [ ] `poems` (rows: ?)
- [ ] `quotes` (rows: ?)

Test query in Supabase SQL:
```sql
SELECT COUNT(*) FROM audiobayanat;
SELECT COUNT(*) FROM hamdonaatokalaam;
SELECT COUNT(*) FROM poems;
SELECT COUNT(*) FROM quotes;
```
