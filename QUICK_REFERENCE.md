# Quick Reference - Supabase API Routes

## Environment Setup

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## API Endpoints

### Audio Bayanat
- **GET** `/api/audiobayanat` - Fetch all audio bayanat
- **POST** `/api/audiobayanat` - Add new audio bayanat

### Hamdonaat
- **GET** `/api/hamdonaatokalaam` - Fetch all hamdonaat
- **POST** `/api/hamdonaatokalaam` - Add new hamdonaat

### Poems
- **GET** `/api/poems` - Fetch all poems
- **POST** `/api/poems` - Add new poem

### Quotes
- **GET** `/api/quotes` - Fetch all quotes
- **POST** `/api/quotes` - Add new quote

---

## Request/Response Examples

### Add Audio Bayanat
```javascript
// Request
POST /api/audiobayanat
{
  "title": "Bayan Title",
  "scholar": "Scholar Name",
  "duration": "30:15",
  "lang": "urdu",
  "url": "https://example.com/audio.mp3"
}

// Response (201 Created)
{
  "id": 1,
  "title": "Bayan Title",
  "scholar": "Scholar Name",
  "duration": "30:15",
  "lang": "urdu",
  "url": "https://example.com/audio.mp3",
  "date": "2024-11-27",
  "created_at": "2024-11-27T12:00:00Z"
}
```

### Add Poem
```javascript
// Request
POST /api/poems
{
  "title": "Poem Title",
  "poet": "Poet Name",
  "lang": "urdu",
  "lines": ["Line 1", "Line 2", "Line 3"]
}

// Response (201 Created)
{
  "id": 1,
  "title": "Poem Title",
  "poet": "Poet Name",
  "lang": "urdu",
  "lines": ["Line 1", "Line 2", "Line 3"],
  "created_at": "2024-11-27T12:00:00Z"
}
```

### Add Quote
```javascript
// Request
POST /api/quotes
{
  "quote": "A wise quote",
  "author": "Author Name",
  "source": "Book/Source",
  "lang": "urdu"
}

// Response (201 Created)
{
  "id": 1,
  "quote": "A wise quote",
  "author": "Author Name",
  "source": "Book/Source",
  "lang": "urdu",
  "created_at": "2024-11-27T12:00:00Z"
}
```

### Fetch All Data
```javascript
// Request
GET /api/audiobayanat

// Response (200 OK)
[
  {
    "id": 1,
    "title": "...",
    ...
  },
  {
    "id": 2,
    "title": "...",
    ...
  }
]
```

---

## Error Responses

### 400 Bad Request
```javascript
{
  "error": "Missing required fields: title, scholar, duration, lang, url"
}
```

### 500 Internal Server Error
```javascript
{
  "error": "Failed to add audiobayanat"
}
```

---

## Supabase Dashboard URLs

After creating project:
- **Main Dashboard**: https://app.supabase.com/projects/[project-id]
- **SQL Editor**: https://app.supabase.com/project/[project-id]/sql/new
- **Table Editor**: https://app.supabase.com/project/[project-id]/editor
- **API Settings**: https://app.supabase.com/project/[project-id]/settings/api

---

## Common Supabase Operations

### Check if tables exist
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

### Count records
```sql
SELECT COUNT(*) as count FROM audiobayanat;
```

### Reset table (clear all data)
```sql
DELETE FROM audiobayanat;
```

### Drop table
```sql
DROP TABLE audiobayanat;
```

---

## Testing with cURL

```bash
# Add audio bayanat
curl -X POST http://localhost:3000/api/audiobayanat \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Bayan",
    "scholar": "Test Scholar",
    "duration": "20:00",
    "lang": "urdu",
    "url": "https://example.com/test.mp3"
  }'

# Get all audio bayanat
curl http://localhost:3000/api/audiobayanat
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Missing environment variables" | Add vars to `.env.local` |
| 401 Unauthorized | Check anon key is correct |
| "Table does not exist" | Run SQL schema from `supabase-schema.sql` |
| No data returned | Verify table isn't empty in Supabase |
| Connection timeout | Check Supabase project is active |

---

## Important Notes

⚠️ **Public Anon Key**: The anon key is exposed client-side (this is fine - it's read/public insert only)

🔒 **For Production**: Add authentication and stricter RLS policies

💾 **Backups**: Supabase automatically backs up data

🚀 **Vercel**: Environment variables must be added in Vercel dashboard
