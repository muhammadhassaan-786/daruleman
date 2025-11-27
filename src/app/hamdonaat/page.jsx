"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Save, Download, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Kalaam() {
  const [activeLang, setActiveLang] = useState("urdu");
  const [hamdonaatokalaam, setHamdonaatokalaam] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const audioRef = useRef(null);

  // Mapped brand classes for styling consistency
  const BRAND_ACCENT = 'bg-brand-accent';
  const BRAND_ACCENT_TEXT = 'text-brand-accent';
  const BRAND_DARK_TEXT = 'text-brand-primary-text';

  const languages = [
    "urdu", "english", "pashto", "arabic", "farsi", "turkish", "sindhi", "punjabi",
  ];

  // Fetch hamdonaatokalaam from API
  useEffect(() => {
    fetchHamdonaatokalaam();
  }, []);

  const fetchHamdonaatokalaam = async () => {
    try {
      const response = await fetch("/api/hamdonaatokalaam");
      if (!response.ok) throw new Error("Failed to fetch hamdonaatokalaam");
      const data = await response.json();
      setHamdonaatokalaam(data);
    } catch (err) {
      console.error("Error fetching hamdonaatokalaam:", err);
      setError("Failed to load hamdonaatokalaam");
    }
  };

  // Filter & Sort
  const filtered = hamdonaatokalaam
    .filter((b) => b.lang === activeLang)
    .filter(
      (b) =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.scholar.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === "newest"
        ? b.id - a.id
        : a.id - b.id
    );

  // Handle Play logic
  const handlePlay = (bayan) => {
    if (currentAudio?.id === bayan.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentAudio(bayan);
    }
  };

  // Logic to load and auto-play new audio
  useEffect(() => {
    if (currentAudio) {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error("Error attempting to play audio:", error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentAudio]);

  // Logic to update progress bar and sync play/pause states
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
  }, [currentAudio]);

  // Update progress helper
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const prog =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(prog || 0);
    }
  };

  return (
    <div className="bg-brand-light-bg min-h-screen py-16 px-4 sm:px-6 lg:px-12">
      {/* Section Heading */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h3 className={`text-3xl md:text-4xl font-extrabold ${BRAND_DARK_TEXT} mb-4`}>
          حمد و نعت و کلام
        </h3>
        <span className={`block w-24 h-1 ${BRAND_ACCENT} rounded-full mx-auto`}></span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-6xl mx-auto mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Language Tabs */}
      <motion.div
        className="flex justify-center flex-wrap gap-2 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {languages.map((lang) => (
          <motion.button
            whileTap={{ scale: 0.9 }}
            key={lang}
            onClick={() => setActiveLang(lang)}
            className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all shadow ${activeLang === lang
              ? `${BRAND_ACCENT} text-white shadow-lg`
              : `bg-white ${BRAND_ACCENT_TEXT} border border-brand-accent hover:bg-brand-subtle-hover`
              }`}
          >
            {lang.toUpperCase()}
          </motion.button>
        ))}
      </motion.div>

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-6">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="🔍 تلاش کریں (عنوان یا مقرر)"
            className={`w-full border rounded-lg py-2 px-4 pr-10 text-sm md:text-base shadow-sm focus:ring-brand-accent focus:border-brand-accent`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
        <select
          className={`border rounded-lg py-2 px-3 text-sm md:text-base shadow-sm focus:ring-brand-accent focus:border-brand-accent`}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="w-full text-right border-collapse rounded-xl overflow-hidden">
          <thead className={`${BRAND_ACCENT} text-white text-sm md:text-base`}>
            <tr>
              <th className="p-3">نمبر</th>
              <th className="p-3">عنوان</th>
              <th className="p-3">مقرر</th>
              <th className="p-3">تاریخ</th>
              <th className="p-3">مدت</th>
              <th className="p-3">سنیں</th>
              <th className="p-3">محفوظ کریں</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b, idx) => (
              <motion.tr
                key={b.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } border-b hover:bg-brand-subtle-hover/50 text-sm md:text-base`}
              >
                <td className="p-3">{idx + 1}</td>
                <td className="p-3 font-medium break-words">{b.title}</td>
                <td className="p-3 text-gray-700">{b.scholar}</td>
                <td className="p-3 text-gray-500">
                  {new Date(b.date).toLocaleDateString("en-US", {
                    year: "numeric", month: "short", day: "numeric",
                  })}
                </td>
                <td className="p-3">{b.duration}</td>
                <td className="p-3">
                  <button
                    onClick={() => handlePlay(b)}
                    className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition shadow"
                  >
                    {currentAudio?.id === b.id && isPlaying ? (<Pause size={16} />) : (<Play size={16} />)}
                  </button>
                </td>
                <td className="p-3 flex gap-2 justify-end">
                  <button className={`${BRAND_ACCENT} text-white p-2 rounded-md hover:bg-brand-primary-text transition shadow`}>
                    <Save size={16} />
                  </button>
                  <button className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 transition shadow">
                    <Download size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filtered.map((b, idx) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className={`bg-white p-4 rounded-xl shadow border-r-4 border-brand-accent`}
          >
            <h4 className="font-semibold text-base break-words">{b.title}</h4>
            <p className="text-sm text-gray-700">{b.scholar}</p>
            <p className="text-xs text-gray-500">
              {new Date(b.date).toLocaleDateString("en-US")} • {b.duration}
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handlePlay(b)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-1 shadow"
              >
                {currentAudio?.id === b.id && isPlaying ? (
                  <>
                    <Pause size={16} /> Pause
                  </>
                ) : (
                  <>
                    <Play size={16} /> Play
                  </>
                )}
              </button>
              <button className={`${BRAND_ACCENT} text-white p-2 rounded-md hover:bg-brand-primary-text transition shadow`}>
                <Save size={16} />
              </button>
              <button className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 transition shadow">
                <Download size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Player */}
      <AnimatePresence>
        {currentAudio && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed inset-x-0 m-auto h-fit bottom-3 transform -translate-x-1/2 backdrop-blur-md 
            bg-white/90 shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3 
            w-[95%] sm:w-[80%] md:w-[600px] border border-emerald-200"
          >
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm md:text-base truncate text-brand-primary-text">
                {currentAudio.title}
              </h4>
              <p className="text-xs md:text-sm text-gray-500 truncate">
                {currentAudio.scholar}
              </p>
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-1 mt-2 rounded-full overflow-hidden">
                <div
                  className={`${BRAND_ACCENT} h-1 transition-all duration-200`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={() => handlePlay(currentAudio)}
              className="bg-blue-600 text-white p-2 md:p-3 rounded-full hover:bg-blue-700 transition shadow"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <button
              onClick={() => {
                audioRef.current.pause();
                setCurrentAudio(null);
                setIsPlaying(false);
              }}
              className="bg-red-600 text-white p-2 md:p-3 rounded-full hover:bg-red-700 transition shadow"
            >
              <X size={18} />
            </button>

            <audio
              ref={audioRef}
              src={currentAudio.url}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
