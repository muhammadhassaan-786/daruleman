import { promises as fs } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

const filePath = join(process.cwd(), "public/audiobayanat.json");

export async function GET() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const audiobayanat = JSON.parse(data);
    return NextResponse.json(audiobayanat);
  } catch (error) {
    console.error("Error reading audiobayanat:", error);
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

    // Read existing data
    const data = await fs.readFile(filePath, "utf-8");
    const audiobayanat = JSON.parse(data);

    // Generate new ID
    const newId =
      audiobayanat.length > 0
        ? Math.max(...audiobayanat.map((b) => b.id)) + 1
        : 1;

    // Create new entry with current date
    const newAudioBayan = {
      id: newId,
      title: body.title,
      scholar: body.scholar,
      duration: body.duration,
      lang: body.lang,
      url: body.url,
      date: new Date().toISOString().split("T")[0],
    };

    // Add to array
    audiobayanat.push(newAudioBayan);

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(audiobayanat, null, 2));

    return NextResponse.json(newAudioBayan, { status: 201 });
  } catch (error) {
    console.error("Error adding audiobayanat:", error);
    return NextResponse.json(
      { error: "Failed to add audiobayanat" },
      { status: 500 }
    );
  }
}
