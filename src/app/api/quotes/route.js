import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// GET - Fetch all quotes
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return NextResponse.json(
      { error: "Failed to fetch quotes" },
      { status: 500 }
    );
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
        {
          error:
            "Missing required fields: quote, author, source, lang",
        },
        { status: 400 }
      );
    }

    // Create new quote object
    const newQuote = {
      quote,
      author,
      source,
      lang,
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from("quotes")
      .insert([newQuote])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error("Error adding quote:", error);
    return NextResponse.json(
      { error: "Failed to add quote" },
      { status: 500 }
    );
  }
}
