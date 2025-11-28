"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Search, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function IslahiMajalis() {
  const [activeLang, setActiveLang] = useState("urdu");
  const [majalis, setMajalis] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const audioRef = useRef(null);

  const BRAND_ACCENT = "bg-brand-accent";
  const BRAND_ACCENT_TEXT = "text-brand-accent";
  const BRAND_DARK_TEXT = "text-brand-primary-text";

  const languages = [
    "urdu", "english", "pashto", "arabic", "farsi", "turkish", "sindhi", "punjabi",
  ];

  // Fetch islahi majalis from API
  useEffect(() => {
    fetchMajalis();
  }, []);

  const fetchMajalis = async () => {
    try {
      const response = await fetch("/api/islahimajalis");
      if (!response.ok) throw new Error("Failed to fetch islahi majalis");
      const data = await response.json();
      setMajalis(data);
    } catch (err) {
      console.error("Error fetching islahi majalis:", err);
      setError("Failed to load islahi majalis");
    }
  };

  const filtered = majalis
    .filter((m) => m.lang === activeLang)
    .filter(
      (m) =>
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.scholar.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === "newest" ? b.id - a.id : a.id - b.id
    );

  const handlePlay = (majalis) => {
    if (currentAudio?.id === majalis.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentAudio(majalis);
    }
  };

  useEffect(() => {
    if (currentAudio && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().then(() => setIsPlaying(true)).catch(error => {
        console.error("Error attempting to play audio:", error);
        setIsPlaying(false);
      });
    }
  }, [currentAudio]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const prog = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(prog || 0);
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    const handlePlayEvent = () => setIsPlaying(true);
    const handlePauseEvent = () => setIsPlaying(false);
    
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("play", handlePlayEvent);
    audioRef.current.addEventListener("pause", handlePauseEvent);
    
    return () => {
      audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current?.removeEventListener("play", handlePlayEvent);
      audioRef.current?.removeEventListener("pause", handlePauseEvent);
    };
  }, []);

  return (
    <div className="bg-brand-light-bg min-h-screen py-10 px-3 sm:px-6 lg:px-12">
      {/* ✅ Title */}
      <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-12">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-primary-text mb-4">
          اصلاحی مجالس
        </h3>
        <p className="text-sm sm:text-base text-brand-accent">Islahi Majalis - اصلاحی مجالس</p>
      </div>

      {/* ✅ Error Message */}
      {error && (
        <div className="max-w-6xl mx-auto mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* ✅ Search Bar */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="تلاش کریں..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
        </div>
      </div>

      {/* ✅ Language Dropdown */}
      <div className="max-w-6xl mx-auto mb-8 flex justify-end">
        <div className="relative w-1/3 sm:w-48">
          <select
            value={activeLang}
            onChange={(e) => setActiveLang(e.target.value)}
            className={`w-full appearance-none px-3 py-2 pr-8 rounded-lg text-xs sm:text-sm font-medium shadow-md transition-all cursor-pointer ${BRAND_ACCENT} text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent-dark`}
          >
            <option value="urdu">اردو</option>
            <option value="english">English</option>
            <option value="pashto">پشتو</option>
            <option value="arabic">العربية</option>
            <option value="farsi">فارسی</option>
            <option value="turkish">Türkçe</option>
            <option value="sindhi">سندھی</option>
            <option value="punjabi">پنجابی</option>
          </select>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* ✅ Main Content */}
      <div className="max-w-6xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">کوئی اصلاحی مجلس نہیں</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {filtered.map((majalis, idx) => (
                <motion.div
                  key={majalis.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className={`${
                    currentAudio?.id === majalis.id
                      ? `${BRAND_ACCENT} shadow-xl`
                      : "bg-white shadow-md"
                  } rounded-xl p-6 border border-brand-subtle-hover hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 text-right">
                      <h3 className={`text-lg font-semibold ${currentAudio?.id === majalis.id ? "text-white" : BRAND_DARK_TEXT}`}>
                        {majalis.title}
                      </h3>
                      <p className={`text-sm ${currentAudio?.id === majalis.id ? "text-white/80" : "text-gray-600"}`}>
                        مقرر: {majalis.scholar}
                      </p>
                    </div>
                    <button
                      onClick={() => handlePlay(majalis)}
                      className={`ml-4 flex-shrink-0 p-3 rounded-full transition ${
                        currentAudio?.id === majalis.id
                          ? "bg-white/20"
                          : "bg-brand-subtle-hover hover:bg-brand-accent"
                      }`}
                    >
                      {currentAudio?.id === majalis.id && isPlaying ? (
                        <Pause className={`w-6 h-6 ${currentAudio?.id === majalis.id ? "text-white" : BRAND_ACCENT_TEXT}`} />
                      ) : (
                        <Play className={`w-6 h-6 ${currentAudio?.id === majalis.id ? "text-white" : BRAND_ACCENT_TEXT}`} />
                      )}
                    </button>
                  </div>

                  {/* ✅ Progress Bar (only show when selected) */}
                  {currentAudio?.id === majalis.id && (
                    <>
                      <div className="mb-4">
                        <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
                          <div
                            className="h-full bg-white transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      <audio
                        ref={audioRef}
                        src={majalis.url}
                        className="w-full"
                      />
                    </>
                  )}

                  <div className={`flex items-center justify-between text-sm ${currentAudio?.id === majalis.id ? "text-white/80" : "text-gray-600"}`}>
                    <span>{majalis.duration}</span>
                    <span>{majalis.lang.toUpperCase()}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
