import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("audiobayanat")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Error fetching audiobayanat:", error);
    return NextResponse.json(
      { error: "Failed to load audiobayanat" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (
      !body.title ||
      !body.scholar ||
      !body.duration ||
      !body.lang ||
      !body.url
    ) {
      return NextResponse.json(
        { error: "Missing required fields: title, scholar, duration, lang, url" },
        { status: 400 }
      );
    }

    // Create new entry with current date
    const newAudioBayan = {
      title: body.title,
      scholar: body.scholar,
      duration: body.duration,
      lang: body.lang,
      url: body.url,
      date: new Date().toISOString().split("T")[0],
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from("audiobayanat")
      .insert([newAudioBayan])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error("Error adding audiobayanat:", error);
    return NextResponse.json(
      { error: "Failed to add audiobayanat" },
      { status: 500 }
    );
  }
}
