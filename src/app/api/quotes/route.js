import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

const quotesFilePath = join(process.cwd(), "public", "quotes.json");

// GET - Fetch all quotes
export async function GET() {
  try {
    const data = await readFile(quotesFilePath, "utf-8");
    const quotes = JSON.parse(data);
    return NextResponse.json(quotes);
  } catch (error) {
    console.error("Error reading quotes:", error);
    return NextResponse.json({ error: "Failed to fetch quotes" }, { status: 500 });
  }
}

// POST - Add a new quote
export async function POST(request) {
  try {
    const body = await request.json();
    const { quote, author, source, lang } = body;

    // Validate required fields
    if (!quote || !author || !source || !lang) {
      return NextResponse.json(
        { error: "Missing required fields: quote, author, source, lang" },
        { status: 400 }
      );
    }

    // Read existing quotes
    const data = await readFile(quotesFilePath, "utf-8");
    const quotes = JSON.parse(data);

    // Generate new ID
    const newId = quotes.length > 0 ? Math.max(...quotes.map((q) => q.id)) + 1 : 1;

    // Create new quote object
    const newQuote = {
      id: newId,
      quote,
      author,
      source,
      lang,
    };

    // Add to array and write back
    quotes.push(newQuote);
    await writeFile(quotesFilePath, JSON.stringify(quotes, null, 2));

    return NextResponse.json(newQuote, { status: 201 });
  } catch (error) {
    console.error("Error adding quote:", error);
    return NextResponse.json({ error: "Failed to add quote" }, { status: 500 });
  }
}
