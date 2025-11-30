/**
 * Audio Player Utility
 * Handles cross-platform audio format support
 */

/**
 * Get the appropriate audio URL and type for current browser
 * Converts .opus to .mp3 for Android/iOS compatibility
 * @param {string} opusUrl - Original .opus file URL
 * @returns {string} - URL that works on current platform
 */
export const getAudioUrl = (opusUrl) => {
  if (!opusUrl) return "";

  // Check if device is Android or iOS (mobile that doesn't support opus well)
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isMobile = isAndroid || isIOS;

  // If it's an opus file and we're on mobile, try to convert it
  if (isMobile && opusUrl.includes(".opus")) {
    // Replace .opus with .mp3 - assuming server has both formats
    // or use a conversion service
    const mp3Url = opusUrl.replace(/\.opus$/i, ".mp3");
    return mp3Url;
  }

  return opusUrl;
};

/**
 * Get audio source elements for HTML audio tag
 * Provides multiple formats for compatibility
 * @param {string} opusUrl - Original .opus file URL
 * @returns {Array} - Array of source objects with {src, type}
 */
export const getAudioSources = (opusUrl) => {
  if (!opusUrl) return [];

  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isMobile = isAndroid || isIOS;

  const sources = [];

  // For mobile devices, prefer MP3
  if (isMobile) {
    const mp3Url = opusUrl.replace(/\.opus$/i, ".mp3");
    sources.push({
      src: mp3Url,
      type: "audio/mpeg",
    });
    // Fallback to opus
    sources.push({
      src: opusUrl,
      type: "audio/opus",
    });
  } else {
    // For desktop, use opus first
    sources.push({
      src: opusUrl,
      type: "audio/opus",
    });
    // Fallback to MP3
    const mp3Url = opusUrl.replace(/\.opus$/i, ".mp3");
    sources.push({
      src: mp3Url,
      type: "audio/mpeg",
    });
  }

  return sources;
};

/**
 * Handle audio playback with error recovery
 * @param {React.RefObject} audioRef - Reference to audio element
 * @param {Function} setIsPlaying - State setter for playing status
 * @param {Function} setError - State setter for error (optional)
 */
export const playAudio = async (audioRef, setIsPlaying, setError = null) => {
  try {
    if (audioRef.current) {
      await audioRef.current.play();
      setIsPlaying(true);
    }
  } catch (error) {
    console.error("Error playing audio:", error);
    if (setError) setError("Failed to play audio");
    setIsPlaying(false);
  }
};

/**
 * Pause audio playback
 * @param {React.RefObject} audioRef - Reference to audio element
 * @param {Function} setIsPlaying - State setter for playing status
 */
export const pauseAudio = (audioRef, setIsPlaying) => {
  if (audioRef.current) {
    audioRef.current.pause();
    setIsPlaying(false);
  }
};
