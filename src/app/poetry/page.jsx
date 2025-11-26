"use client";

import { useState, useEffect } from "react";
import { Copy, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Poetry() {
  const [activeLang, setActiveLang] = useState("urdu");
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    poet: "",
    lang: "urdu",
    lines: ["", ""],
  });

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
      setLoading(true);
      const response = await fetch("/api/poems");
      if (!response.ok) throw new Error("Failed to fetch poems");
      const data = await response.json();
      setPoems(data);
    } catch (err) {
      console.error("Error fetching poems:", err);
      setError("Failed to load poems");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLineChange = (index, value) => {
    setFormData((prev) => {
      const newLines = [...prev.lines];
      newLines[index] = value;
      return { ...prev, lines: newLines };
    });
  };

  const addLineField = () => {
    setFormData((prev) => ({
      ...prev,
      lines: [...prev.lines, ""],
    }));
  };

  const removeLineField = (index) => {
    setFormData((prev) => ({
      ...prev,
      lines: prev.lines.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/poems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add poem");
      }

      const newPoem = await response.json();
      setPoems((prev) => [...prev, newPoem]);
      setFormData({
        title: "",
        poet: "",
        lang: "urdu",
        lines: ["", ""],
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding poem:", err);
      setError(err.message);
    } finally {
      setSubmitting(false);
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
      {/* ✅ Title with Add Button */}
      <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-primary-text">
            اشعار (تحریری)
          </h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-accent hover:bg-brand-accent-dark text-white font-bold py-2 px-4 rounded-full text-2xl transition shadow-md"
            title="Add new poem"
          >
            +
          </button>
        </div>
        <span className="absolute left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-1 bg-brand-accent rounded-full inline-block"></span>
      </div>

      {/* ✅ Error Message */}
      {error && (
        <div className="max-w-6xl mx-auto mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* ✅ Loading State */}
      {loading && (
        <div className="text-center text-brand-primary-text py-12">
          <p>جاری ہے...</p>
        </div>
      )}

      {/* ✅ Language Tabs */}
      {!loading && (
        <>
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
            {filtered.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">کوئی اشعار نہیں</p>
            ) : (
              filtered.map((poem, idx) => (
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
        </>
      )}

      {/* ✅ Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl my-8">
            <h3 className="text-2xl font-bold text-brand-primary-text mb-6">نیا شعر شامل کریں</h3>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="شعر کا عنوان"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  شاعر
                </label>
                <input
                  type="text"
                  name="poet"
                  value={formData.poet}
                  onChange={handleInputChange}
                  placeholder="شاعر کا نام"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  زبان
                </label>
                <select
                  name="lang"
                  value={formData.lang}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اشعار (لائنیں)
                </label>
                {formData.lines.map((line, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={line}
                      onChange={(e) => handleLineChange(index, e.target.value)}
                      placeholder={`لائن ${index + 1}`}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                      required
                    />
                    {formData.lines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLineField(index)}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addLineField}
                  className="text-sm text-brand-accent hover:text-brand-primary-text mt-2"
                >
                  + لائن شامل کریں
                </button>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-brand-accent hover:bg-brand-accent-dark text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
                >
                  {submitting ? "جاری ہے..." : "شامل کریں"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
                >
                  منسوخ کریں
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
