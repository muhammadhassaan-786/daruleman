import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

const poemsFilePath = join(process.cwd(), "public", "poems.json");

// GET - Fetch all poems
export async function GET() {
  try {
    const data = await readFile(poemsFilePath, "utf-8");
    const poems = JSON.parse(data);
    return NextResponse.json(poems);
  } catch (error) {
    console.error("Error reading poems:", error);
    return NextResponse.json({ error: "Failed to fetch poems" }, { status: 500 });
  }
}

// POST - Add a new poem
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, poet, lang, lines } = body;

    // Validate required fields
    if (!title || !poet || !lang || !lines || !Array.isArray(lines) || lines.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: title, poet, lang, lines (array)" },
        { status: 400 }
      );
    }

    // Read existing poems
    const data = await readFile(poemsFilePath, "utf-8");
    const poems = JSON.parse(data);

    // Generate new ID
    const newId = poems.length > 0 ? Math.max(...poems.map((p) => p.id)) + 1 : 1;

    // Create new poem object
    const newPoem = {
      id: newId,
      title,
      poet,
      lang,
      lines,
    };

    // Add to array and write back
    poems.push(newPoem);
    await writeFile(poemsFilePath, JSON.stringify(poems, null, 2));

    return NextResponse.json(newPoem, { status: 201 });
  } catch (error) {
    console.error("Error adding poem:", error);
    return NextResponse.json({ error: "Failed to add poem" }, { status: 500 });
  }
}
