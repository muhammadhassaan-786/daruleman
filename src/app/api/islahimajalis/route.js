import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("islahi_majalis")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Error fetching islahi majalis:", error);
    return NextResponse.json(
      { error: "Failed to load islahi majalis", details: error.message },
      { status: 500 }
    );
  }
}

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

    // Create new islahi majalis object
    const newMajalis = {
      title,
      scholar,
      duration,
      lang,
      url,
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from("islahi_majalis")
      .insert([newMajalis])
      .select();

    if (error) throw error;

    return NextResponse.json(data?.[0], { status: 201 });
  } catch (error) {
    console.error("Error adding islahi majalis:", error);
    return NextResponse.json(
      { error: "Failed to add islahi majalis", details: error.message },
      { status: 500 }
    );
  }
}
