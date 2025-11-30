/**
 * Audio Proxy Middleware Route
 * Serves audio files with proper streaming headers
 * Handles format detection and caching
 */

import { NextResponse } from "next/server";

/**
 * GET handler for audio streaming
 * Usage: /api/audio/stream?url=<encoded-url>
 * Returns: Audio stream with proper headers
 */
export async function GET(request) {
  try {
    // Get audio URL from query parameters
    const { searchParams } = new URL(request.url);
    const audioUrl = searchParams.get("url");

    if (!audioUrl) {
      return NextResponse.json(
        { error: "Audio URL is required" },
        { status: 400 }
      );
    }

    // Decode URL if encoded
    const decodedUrl = decodeURIComponent(audioUrl);

    // Validate URL format (basic security check)
    try {
      new URL(decodedUrl);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid audio URL format" },
        { status: 400 }
      );
    }

    // Determine audio format from URL extension
    const urlLower = decodedUrl.toLowerCase();
    let contentType = "audio/mpeg"; // Default to MP3

    if (urlLower.includes(".opus") || urlLower.includes(".ogg")) {
      contentType = 'audio/ogg; codecs="opus"';
    } else if (urlLower.includes(".webm")) {
      contentType = 'audio/webm; codecs="opus"';
    } else if (urlLower.includes(".m4a") || urlLower.includes(".aac")) {
      contentType = "audio/aac";
    } else if (urlLower.includes(".wav")) {
      contentType = "audio/wav";
    }

    // Fetch audio from source with streaming support
    const response = await fetch(decodedUrl, {
      headers: {
        "Range": request.headers.get("range") || "",
        "User-Agent": "DaruLemanAudioProxy/1.0",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch audio file" },
        { status: response.status }
      );
    }

    // Get original content length
    const contentLength = response.headers.get("content-length");

    // Create response with proper audio headers
    const audioResponse = new NextResponse(response.body, {
      status: response.status,
      headers: {
        "Content-Type": contentType,
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Disposition": "inline",
        // Copy content length if available
        ...(contentLength && { "Content-Length": contentLength }),
      },
    });

    return audioResponse;
  } catch (error) {
    console.error("Audio streaming error:", error);
    return NextResponse.json(
      {
        error: "Failed to stream audio",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
