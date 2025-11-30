/**
 * Advanced Audio Utilities for Cross-Platform Compatibility
 * Handles OPUS, MP3, AAC formats with proper fallbacks
 */

/**
 * Detect audio format support using browser's canPlayType()
 * @returns {Object} - Capabilities object
 */
export const detectAudioSupport = () => {
  if (typeof document === "undefined") {
    return { opus: false, mp3: true, aac: true };
  }

  const audio = document.createElement("audio");

  return {
    opus: audio.canPlayType('audio/ogg; codecs="opus"') !== "",
    webm: audio.canPlayType('audio/webm; codecs="opus"') !== "",
    mp3: audio.canPlayType("audio/mpeg") !== "",
    aac: audio.canPlayType("audio/aac") !== "",
    wav: audio.canPlayType("audio/wav") !== "",
  };
};

/**
 * Get device type
 * @returns {string} - 'android', 'ios', 'desktop'
 */
export const getDeviceType = () => {
  if (typeof navigator === "undefined") return "desktop";

  const ua = navigator.userAgent.toLowerCase();

  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";

  return "desktop";
};

/**
 * Determine optimal audio format and sources based on device & support
 * @param {string} opusUrl - URL to OPUS file
 * @param {Object} options - Configuration options
 * @returns {Object} - { primaryUrl, primaryType, sources: Array }
 */
export const getOptimalAudioSource = (opusUrl, options = {}) => {
  if (!opusUrl) {
    return { primaryUrl: "", primaryType: "", sources: [] };
  }

  const support = detectAudioSupport();
  const device = getDeviceType();
  const { preferMp3OnMobile = true } = options;

  // Source list with fallback order
  const sourceList = [];

  // For Android, MP3 is most reliable
  if (device === "android" && preferMp3OnMobile) {
    const mp3Url = opusUrl.replace(/\.opus$/i, ".mp3");

    if (support.mp3) {
      sourceList.push({ src: mp3Url, type: "audio/mpeg" });
    }

    if (support.aac) {
      const aacUrl = opusUrl.replace(/\.opus$/i, ".m4a");
      sourceList.push({ src: aacUrl, type: "audio/aac" });
    }

    // Fallback to OPUS if supported
    if (support.opus) {
      sourceList.push({ src: opusUrl, type: 'audio/ogg; codecs="opus"' });
    }

    if (support.webm) {
      sourceList.push({ src: opusUrl, type: 'audio/webm; codecs="opus"' });
    }
  }
  // For iOS, AAC/MP3 are most reliable
  else if (device === "ios") {
    if (support.aac) {
      const aacUrl = opusUrl.replace(/\.opus$/i, ".m4a");
      sourceList.push({ src: aacUrl, type: "audio/aac" });
    }

    if (support.mp3) {
      const mp3Url = opusUrl.replace(/\.opus$/i, ".mp3");
      sourceList.push({ src: mp3Url, type: "audio/mpeg" });
    }

    if (support.opus) {
      sourceList.push({ src: opusUrl, type: 'audio/ogg; codecs="opus"' });
    }
  }
  // For desktop, prefer OPUS (smaller files)
  else {
    if (support.opus) {
      sourceList.push({ src: opusUrl, type: 'audio/ogg; codecs="opus"' });
    }

    if (support.webm) {
      sourceList.push({ src: opusUrl, type: 'audio/webm; codecs="opus"' });
    }

    if (support.mp3) {
      const mp3Url = opusUrl.replace(/\.opus$/i, ".mp3");
      sourceList.push({ src: mp3Url, type: "audio/mpeg" });
    }

    if (support.aac) {
      const aacUrl = opusUrl.replace(/\.opus$/i, ".m4a");
      sourceList.push({ src: aacUrl, type: "audio/aac" });
    }
  }

  // Remove duplicates and return
  const uniqueSources = [];
  const seenUrls = new Set();

  sourceList.forEach((source) => {
    if (!seenUrls.has(source.src)) {
      seenUrls.add(source.src);
      uniqueSources.push(source);
    }
  });

  return {
    primaryUrl: uniqueSources[0]?.src || opusUrl,
    primaryType: uniqueSources[0]?.type || 'audio/ogg; codecs="opus"',
    sources: uniqueSources,
  };
};

/**
 * Get proper HTML audio attributes for best performance
 * @returns {Object} - Audio element attributes
 */
export const getAudioAttributes = () => {
  return {
    preload: "auto", // Preload audio metadata and first frame
    crossOrigin: "anonymous", // Enable CORS for stream processing
    controlsList: "nodownload", // Optional: hide download button
  };
};

/**
 * Safe audio play with error handling
 * @param {React.RefObject} audioRef - Audio element ref
 * @returns {Promise<void>}
 */
export const safeAudioPlay = async (audioRef) => {
  if (!audioRef?.current) return;

  try {
    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      await playPromise;
    }
  } catch (error) {
    console.error("Audio playback error:", error.message);
    // Silently fail - browser may block autoplay
  }
};

/**
 * Safe audio pause
 * @param {React.RefObject} audioRef - Audio element ref
 */
export const safeAudioPause = (audioRef) => {
  if (!audioRef?.current) return;

  try {
    audioRef.current.pause();
  } catch (error) {
    console.error("Audio pause error:", error.message);
  }
};

/**
 * Generate proper cache headers for audio responses
 * Use in API routes to ensure proper streaming
 * @returns {Object} - Headers object
 */
export const getAudioResponseHeaders = () => {
  return {
    "Content-Type": 'audio/ogg; codecs="opus"', // Update based on actual format
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=31536000, immutable", // 1 year cache
    "Content-Disposition": "inline", // Stream instead of download
  };
};

/**
 * Log audio format support for debugging
 */
export const logAudioSupport = () => {
  if (typeof console !== "undefined") {
    const support = detectAudioSupport();
    const device = getDeviceType();

    console.group("🎵 Audio Support Report");
    console.log("Device:", device);
    console.table(support);
    console.groupEnd();
  }
};
