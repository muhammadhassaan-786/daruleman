"use client";

import { useState, useEffect } from "react";
import { Copy, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Poetry() {
  const [activeLang, setActiveLang] = useState("urdu");
  const [poems, setPoems] = useState([]);
  const [error, setError] = useState("");

  const languages = [
    "urdu",
    "english",
    "pashto",
    "arabic",
    "farsi",
    "turkish",
    "sindhi",
    "punjabi",
  ];

  // Fetch poems from API
  useEffect(() => {
    fetchPoems();
  }, []);

  const fetchPoems = async () => {
    try {
      const response = await fetch("/api/poems");
      if (!response.ok) throw new Error("Failed to fetch poems");
      const data = await response.json();
      setPoems(data);
    } catch (err) {
      console.error("Error fetching poems:", err);
      setError("Failed to load poems");
    }
  };

  const handleCopy = (poem) => {
    const poemText = `${poem.title}\n\nشاعر: ${poem.poet}\n\n${poem.lines.join("\n")}`;
    
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(poemText).catch((err) => {
        console.error("Clipboard API failed:", err);
        copyToClipboardFallback(poemText);
      });
    } else {
      // Fallback for older browsers
      copyToClipboardFallback(poemText);
    }
  };

  const copyToClipboardFallback = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }
    document.body.removeChild(textArea);
  };

  const handleShare = (poem) => {
    const shareUrl = `${window.location.origin}/poetry?poem=${poem.id}`;
    const shareText = `دیکھیں یہ شعر: "${poem.title}" از ${poem.poet}`;
    
    if (navigator.share) {
      navigator.share({
        title: poem.title,
        text: shareText,
        url: shareUrl,
      });
    } else {
      // Fallback: Copy to clipboard
      const fullText = `${shareText}\n${shareUrl}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fullText).catch((err) => {
          console.error("Clipboard API failed:", err);
          copyToClipboardFallback(fullText);
        });
      } else {
        copyToClipboardFallback(fullText);
      }
    }
  };

  const filtered = poems.filter((p) => p.lang === activeLang);

  return (
    <div className="bg-brand-light-bg min-h-screen py-10 px-3 sm:px-6 lg:px-12">
      {/* ✅ Title */}
      <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-12">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-primary-text mb-4">
          اشعار (تحریری)
        </h3>
        <span className="w-20 sm:w-24 h-1 bg-brand-accent rounded-full inline-block"></span>
      </div>

      {/* ✅ Error Message */}
      {error && (
        <div className="max-w-6xl mx-auto mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* ✅ Language Tabs */}
      <div className="flex justify-center flex-wrap gap-2 mb-8 sm:mb-12">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveLang(lang)}
            className={`px-4 py-2 rounded-full text-sm sm:text-base transition font-medium ${
              activeLang === lang
                ? "bg-brand-accent text-white shadow"
                : "bg-white text-brand-accent border border-brand-accent hover:bg-brand-subtle-hover"
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ✅ Poetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {poems.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">کوئی اشعار نہیں</p>
        ) : (
          poems
            .filter((p) => p.lang === activeLang)
            .sort((a, b) => b.id - a.id)
            .map((poem, idx) => (
              <motion.div
                key={poem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition border border-brand-subtle-hover overflow-hidden"
              >
                  {/* Header */}
                  <div className="bg-brand-accent text-white px-3 sm:px-4 py-2 flex justify-between items-center">
                    <h3 className="font-bold text-sm sm:text-base">{poem.title}</h3>
                    <span className="bg-white text-brand-accent px-2 py-0.5 text-xs rounded-full font-medium">
                      {poem.lang.toUpperCase()}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-4 sm:p-6 text-center">
                    <p className="text-xs sm:text-sm text-gray-500 mb-2">
                      شاعر: {poem.poet}
                    </p>
                    {poem.lines.map((line, i) => (
                      <p
                        key={i}
                        className="text-base sm:text-lg leading-relaxed text-gray-800"
                      >
                        {line}
                      </p>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="px-3 sm:px-4 py-2 sm:py-3 flex justify-start gap-2 border-t">
                    <button 
                      onClick={() => handleCopy(poem)}
                      className="p-2 rounded-full hover:bg-gray-100 transition"
                      title="شعر کو کاپی کریں"
                    >
                      <Copy size={18} className="text-gray-600" />
                    </button>
                    <button 
                      onClick={() => handleShare(poem)}
                      className="p-2 rounded-full hover:bg-gray-100 transition"
                      title="شعر کو شیئر کریں"
                    >
                      <Share2 size={18} className="text-gray-600" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>

    </div>
  );
}
