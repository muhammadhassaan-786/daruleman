-- Supabase SQL Schema for Daruleman
-- Copy and paste this into your Supabase SQL Editor to create all tables

-- Create audiobayanat table
CREATE TABLE IF NOT EXISTS audiobayanat (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  scholar TEXT NOT NULL,
  duration TEXT NOT NULL,
  lang TEXT NOT NULL,
  url TEXT NOT NULL,
  date TEXT NOT NULL DEFAULT CURRENT_DATE::TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create hamdonaatokalaam table
CREATE TABLE IF NOT EXISTS hamdonaatokalaam (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  scholar TEXT NOT NULL,
  duration TEXT NOT NULL,
  lang TEXT NOT NULL,
  url TEXT NOT NULL,
  date TEXT NOT NULL DEFAULT CURRENT_DATE::TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create poems table
CREATE TABLE IF NOT EXISTS poems (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  poet TEXT NOT NULL,
  lang TEXT NOT NULL,
  lines JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id BIGSERIAL PRIMARY KEY,
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  source TEXT NOT NULL,
  lang TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create islahi_majalis table
CREATE TABLE IF NOT EXISTS islahi_majalis (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  scholar TEXT NOT NULL,
  duration TEXT NOT NULL,
  lang TEXT NOT NULL,
  url TEXT NOT NULL,
  date TEXT NOT NULL DEFAULT CURRENT_DATE::TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (optional, but recommended)
ALTER TABLE audiobayanat ENABLE ROW LEVEL SECURITY;
ALTER TABLE hamdonaatokalaam ENABLE ROW LEVEL SECURITY;
ALTER TABLE poems ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE islahi_majalis ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read" ON audiobayanat FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON hamdonaatokalaam FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON poems FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON quotes FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON islahi_majalis FOR SELECT USING (true);

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  price TEXT NOT NULL DEFAULT 'Free',
  link TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create policies to allow public insert (you can add authentication later)
CREATE POLICY "Allow public insert" ON audiobayanat FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON hamdonaatokalaam FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON poems FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON islahi_majalis FOR INSERT WITH CHECK (true);

-- Enable Row Level Security for books
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Create policies for books table
CREATE POLICY "Allow public read" ON books FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON books FOR INSERT WITH CHECK (true);
