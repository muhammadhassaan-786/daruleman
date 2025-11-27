import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

const hamdonaatokalaamFilePath = join(process.cwd(), "public", "hamdonaatokalaam.json");

// GET - Fetch all hamdonaatokalaam
export async function GET() {
  try {
    const data = await readFile(hamdonaatokalaamFilePath, "utf-8");
    const hamdonaatokalaam = JSON.parse(data);
    return NextResponse.json(hamdonaatokalaam);
  } catch (error) {
    console.error("Error reading hamdonaatokalaam:", error);
    return NextResponse.json({ error: "Failed to fetch hamdonaatokalaam" }, { status: 500 });
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

    // Read existing bayanat
    const data = await readFile(bayanatFilePath, "utf-8");
    const bayanat = JSON.parse(data);

    // Generate new ID
    const newId = bayanat.length > 0 ? Math.max(...bayanat.map((b) => b.id)) + 1 : 1;

    // Create new bayanat object
    const newBayan = {
      id: newId,
      title,
      scholar,
      date: new Date().toISOString().split("T")[0],
      duration,
      lang,
      url,
    };

    // Add to array and write back
    bayanat.push(newBayan);
    await writeFile(bayanatFilePath, JSON.stringify(bayanat, null, 2));

    return NextResponse.json(newBayan, { status: 201 });
  } catch (error) {
    console.error("Error adding bayanat:", error);
    return NextResponse.json({ error: "Failed to add bayanat" }, { status: 500 });
  }
}
