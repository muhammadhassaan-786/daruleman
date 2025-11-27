import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// GET - Fetch all hamdonaatokalaam
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("hamdonaatokalaam")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Error fetching hamdonaatokalaam:", error);
    return NextResponse.json(
      { error: "Failed to fetch hamdonaatokalaam" },
      { status: 500 }
    );
  }
}

// POST - Add a new hamdonaatokalaam
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, scholar, duration, lang, url } = body;

    // Validate required fields
    if (!title || !scholar || !duration || !lang || !url) {
      return NextResponse.json(
        { error: "Missing required fields: title, scholar, duration, lang, url" },
        { status: 400 }
      );
    }

    // Create new hamdonaat object
    const newBayan = {
      title,
      scholar,
      date: new Date().toISOString().split("T")[0],
      duration,
      lang,
      url,
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from("hamdonaatokalaam")
      .insert([newBayan])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error("Error adding hamdonaatokalaam:", error);
    return NextResponse.json(
      { error: "Failed to add hamdonaatokalaam" },
      { status: 500 }
    );
  }
}
