import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to load books", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, author, price, link } = body;

    // Validate required fields
    if (!title || !author || !link) {
      return NextResponse.json(
        { error: "Missing required fields: title, author, link" },
        { status: 400 }
      );
    }

    // Create new book object
    const newBook = {
      title,
      author,
      price: price || "Free",
      link,
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from("books")
      .insert([newBook])
      .select();

    if (error) throw error;

    return NextResponse.json(data?.[0], { status: 201 });
  } catch (error) {
    console.error("Error adding book:", error);
    return NextResponse.json(
      { error: "Failed to add book", details: error.message },
      { status: 500 }
    );
  }
}

