/**
 * Advanced Audio Player Component
 * Handles multiple audio formats with proper fallbacks for all platforms
 */

import React from "react";

/**
 * AudioPlayer Component
 * @param {Object} props
 * @param {React.RefObject} props.audioRef - Audio element ref
 * @param {string} props.audioUrl - Primary audio URL
 * @param {Function} props.onTimeUpdate - Callback for time updates
 * @param {Function} props.onEnded - Callback when audio ends
 * @param {string} props.title - Audio title for logging
 */
export const AudioPlayer = React.forwardRef(
  (
    {
      audioUrl,
      onTimeUpdate,
      onEnded,
      title = "Audio",
      preload = "auto",
      crossOrigin = "anonymous",
    },
    ref
  ) => {
    if (!audioUrl) {
      return (
        <audio
          ref={ref}
          preload={preload}
          crossOrigin={crossOrigin}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
        />
      );
    }

    // Determine primary format
    const urlLower = audioUrl.toLowerCase();
    let primaryType = "audio/mpeg";

    if (urlLower.includes(".opus") || urlLower.includes(".ogg")) {
      primaryType = 'audio/ogg; codecs="opus"';
    } else if (urlLower.includes(".webm")) {
      primaryType = 'audio/webm; codecs="opus"';
    } else if (urlLower.includes(".m4a") || urlLower.includes(".aac")) {
      primaryType = "audio/aac";
    } else if (urlLower.includes(".wav")) {
      primaryType = "audio/wav";
    }

    // Generate alternative formats
    const generateAltUrl = (extension) => audioUrl.replace(/\.[^.]+$/, extension);

    return (
      <audio
        ref={ref}
        preload={preload}
        crossOrigin={crossOrigin}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onError={(e) => {
          console.warn(
            `Audio error for ${title}:`,
            e.target.error?.message || "Unknown error"
          );
        }}
      >
        {/* Primary format */}
        <source src={audioUrl} type={primaryType} />

        {/* Android/iOS fallback: MP3 */}
        <source src={generateAltUrl(".mp3")} type="audio/mpeg" />

        {/* Fallback: AAC */}
        <source src={generateAltUrl(".m4a")} type="audio/aac" />

        {/* Fallback: WebM Opus */}
        {!urlLower.includes(".webm") && (
          <source src={generateAltUrl(".webm")} type='audio/webm; codecs="opus"' />
        )}

        {/* Fallback: WAV */}
        <source src={generateAltUrl(".wav")} type="audio/wav" />

        Your browser does not support the audio element.
      </audio>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";

export default AudioPlayer;
