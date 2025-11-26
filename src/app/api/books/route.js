import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

const filePath = path.join(process.cwd(), "public/books/books.json");

export async function GET() {
  try {
    const jsonData = await fs.readFile(filePath, "utf-8");
    const books = JSON.parse(jsonData);
    return NextResponse.json(books);
  } catch (error) {
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

    // Read existing books
    const jsonData = await fs.readFile(filePath, "utf-8");
    const books = JSON.parse(jsonData);

    // Generate new ID
    const newId = books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1;

    // Create new book object
    const newBook = {
      id: newId,
      title,
      author,
      price: price || "Free",
      link,
    };

    // Add to array and write back
    books.push(newBook);
    await fs.writeFile(filePath, JSON.stringify(books, null, 2));

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error("Error adding book:", error);
    return NextResponse.json({ error: "Failed to add book" }, { status: 500 });
  }
}

