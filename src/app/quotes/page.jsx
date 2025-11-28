"use client";

import { useState, useEffect } from "react";

export default function Malfoozat() {
  const [activeLang, setActiveLang] = useState("urdu");
  const [malfoozat, setMalfoozat] = useState([]);
  const [error, setError] = useState("");

  const languages = ["sindhi", "urdu", "english", "pashto", "arabic", "persian", "turkish"];

  // Fetch quotes from API
  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch("/api/quotes");
      if (!response.ok) throw new Error("Failed to fetch quotes");
      const data = await response.json();
      setMalfoozat(data);
    } catch (err) {
      console.error("Error fetching quotes:", err);
      setError("Failed to load quotes");
    }
  };

  return (
    <div className="bg-brand-light-bg min-h-screen py-16 px-4 sm:px-6 lg:px-12">
      {/* ✅ Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary-text mb-4">
          ملفوظات
        </h2>
        <div className="w-20 h-1 bg-brand-accent rounded mx-auto"></div>
      </div>

      {/* ✅ Error Message */}
      {error && (
        <div className="max-w-6xl mx-auto mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* ✅ Language Dropdown */}
      <div className="max-w-6xl mx-auto mb-12 flex justify-end">
        <div className="relative w-1/3 sm:w-48">
          <select
            value={activeLang}
            onChange={(e) => setActiveLang(e.target.value)}
            className="w-full appearance-none px-3 py-2 pr-8 rounded-lg text-xs sm:text-sm font-medium shadow-md transition-all cursor-pointer bg-brand-accent text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent-dark"
          >
            <option value="sindhi">سندھی</option>
            <option value="urdu">اردو</option>
            <option value="english">English</option>
            <option value="pashto">پشتو</option>
            <option value="arabic">العربية</option>
            <option value="persian">فارسی</option>
            <option value="turkish">Türkçe</option>
          </select>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* ✅ Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {malfoozat.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">کوئی ملفوظات نہیں</p>
        ) : (
          malfoozat
            .filter((m) => m.lang === activeLang)
            .sort((a, b) => b.id - a.id)
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

    </div>
  );
}
