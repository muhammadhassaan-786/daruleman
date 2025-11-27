import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// GET - Fetch all poems
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("poems")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Error fetching poems:", error);
    return NextResponse.json(
      { error: "Failed to fetch poems" },
      { status: 500 }
    );
  }
}

// POST - Add a new poem
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, poet, lang, lines } = body;

    // Validate required fields
    if (
      !title ||
      !poet ||
      !lang ||
      !lines ||
      !Array.isArray(lines) ||
      lines.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: title, poet, lang, lines (array)",
        },
        { status: 400 }
      );
    }

    // Create new poem object
    const newPoem = {
      title,
      poet,
      lang,
      lines,
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from("poems")
      .insert([newPoem])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error("Error adding poem:", error);
    return NextResponse.json(
      { error: "Failed to add poem" },
      { status: 500 }
    );
  }
}
