"use client";

import { useState, useEffect } from "react";

export default function Malfoozat() {
  const [activeLang, setActiveLang] = useState("urdu");
  const [malfoozat, setMalfoozat] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    quote: "",
    author: "",
    source: "",
    lang: "urdu",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const languages = ["sindhi", "urdu", "english", "pashto", "arabic", "persian", "turkish"];

  // Fetch quotes from API
  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/quotes");
      if (!response.ok) throw new Error("Failed to fetch quotes");
      const data = await response.json();
      setMalfoozat(data);
    } catch (err) {
      console.error("Error fetching quotes:", err);
      setError("Failed to load quotes");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add quote");
      }

      const newQuote = await response.json();
      setMalfoozat((prev) => [...prev, newQuote]);
      setFormData({
        quote: "",
        author: "",
        source: "",
        lang: "urdu",
      });
      setIsModalOpen(false);
      alert(`Quote added successfully with ID: ${newQuote.id}`);
    } catch (err) {
      console.error("Error adding quote:", err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-light-bg min-h-screen py-16 px-4 sm:px-6 lg:px-12">
      {/* ✅ Heading with Add Button */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary-text">
            ملفوظات
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-accent hover:bg-brand-accent-dark text-white font-bold py-2 px-4 rounded-full text-2xl transition shadow-md"
            title="Add new quote"
          >
            +
          </button>
        </div>
        <div className="mt-2 w-20 h-1 bg-brand-accent rounded mx-auto"></div>
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
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-6 py-2 rounded-full text-sm font-medium shadow-sm transition ${
                  activeLang === lang
                    ? "bg-brand-accent text-white"
                    : "bg-white text-brand-accent hover:bg-brand-subtle-hover"
                }`}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>

          {/* ✅ Cards */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {malfoozat.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">کوئی ملفوظات نہیں</p>
            ) : (
              malfoozat
                .filter((m) => m.lang === activeLang)
                .map((m) => (
                  <div
                    key={m.id}
                    className="bg-white shadow-md rounded-2xl p-6 border border-brand-border hover:shadow-lg transition"
                  >
                    <p className="text-lg text-gray-800 leading-relaxed mb-4">"{m.quote}"</p>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>
                        <strong className="text-brand-accent">مقرّر:</strong> {m.author}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {m.lang.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">ماخذ: {m.source}</p>
                  </div>
                ))
            )}
          </div>
        </>
      )}

      {/* ✅ Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-brand-primary-text mb-6">نیا ملفوظہ شامل کریں</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ملفوظہ
                </label>
                <textarea
                  name="quote"
                  value={formData.quote}
                  onChange={handleInputChange}
                  placeholder="ملفوظہ درج کریں"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  rows="4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مقرّر
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="مقرّر کا نام"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ماخذ
                </label>
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  placeholder="ماخذ درج کریں"
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
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </option>
                  ))}
                </select>
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
