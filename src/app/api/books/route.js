import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public/books/books.json");
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
