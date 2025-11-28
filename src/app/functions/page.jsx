"use client";

import { useState } from "react";
import { Plus, Music, Mic, BookOpen, Quote, Library } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Functions() {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Audio Bayanat Form State
  const [audioFormData, setAudioFormData] = useState({
    title: "",
    scholar: "",
    duration: "",
    lang: "urdu",
    url: "",
  });

  // Hamdonaat Form State
  const [hamdonaatFormData, setHamdonaatFormData] = useState({
    title: "",
    scholar: "",
    duration: "",
    lang: "urdu",
    url: "",
  });

  // Poetry Form State
  const [poetryFormData, setPoetryFormData] = useState({
    title: "",
    poet: "",
    lang: "urdu",
    lines: ["", ""],
  });

  // Quotes Form State
  const [quotesFormData, setQuotesFormData] = useState({
    quote: "",
    author: "",
    source: "",
    lang: "urdu",
  });

  // Books Form State
  const [booksFormData, setBooksFormData] = useState({
    title: "",
    author: "",
    price: "",
    link: "",
  });

  // Islahi Majalis Form State
  const [majalisFormData, setMajalisFormData] = useState({
    title: "",
    scholar: "",
    duration: "",
    lang: "urdu",
    url: "",
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

  const quotesLanguages = [
    "sindhi",
    "urdu",
    "english",
    "pashto",
    "arabic",
    "persian",
    "turkish",
  ];

  // Handlers for Audio Bayanat
  const handleAudioChange = (e) => {
    const { name, value } = e.target;
    setAudioFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAudioSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/audiobayanat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(audioFormData),
      });

      if (!response.ok) throw new Error("Failed to add audio bayanat");
      setAudioFormData({
        title: "",
        scholar: "",
        duration: "",
        lang: "urdu",
        url: "",
      });
      setActiveModal(null);
      alert("Audio Bayanat added successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Handlers for Hamdonaat
  const handleHamdonaatChange = (e) => {
    const { name, value } = e.target;
    setHamdonaatFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHamdonaatSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/hamdonaatokalaam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hamdonaatFormData),
      });

      if (!response.ok) throw new Error("Failed to add hamdonaat");
      setHamdonaatFormData({
        title: "",
        scholar: "",
        duration: "",
        lang: "urdu",
        url: "",
      });
      setActiveModal(null);
      alert("Hamdonaat added successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Handlers for Poetry
  const handlePoetryChange = (e) => {
    const { name, value } = e.target;
    setPoetryFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePoetryLineChange = (index, value) => {
    setPoetryFormData((prev) => {
      const newLines = [...prev.lines];
      newLines[index] = value;
      return { ...prev, lines: newLines };
    });
  };

  const addPoetryLine = () => {
    setPoetryFormData((prev) => ({
      ...prev,
      lines: [...prev.lines, ""],
    }));
  };

  const removePoetryLine = (index) => {
    setPoetryFormData((prev) => ({
      ...prev,
      lines: prev.lines.filter((_, i) => i !== index),
    }));
  };

  const handlePoetrySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/poems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(poetryFormData),
      });

      if (!response.ok) throw new Error("Failed to add poem");
      setPoetryFormData({
        title: "",
        poet: "",
        lang: "urdu",
        lines: ["", ""],
      });
      setActiveModal(null);
      alert("Poem added successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Handlers for Quotes
  const handleQuotesChange = (e) => {
    const { name, value } = e.target;
    setQuotesFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuotesSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quotesFormData),
      });

      if (!response.ok) throw new Error("Failed to add quote");
      setQuotesFormData({
        quote: "",
        author: "",
        source: "",
        lang: "urdu",
      });
      setActiveModal(null);
      alert("Quote added successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Handlers for Books
  const handleBooksChange = (e) => {
    const { name, value } = e.target;
    setBooksFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooksSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booksFormData),
      });

      if (!response.ok) throw new Error("Failed to add book");
      setBooksFormData({
        title: "",
        author: "",
        price: "",
        link: "",
      });
      setActiveModal(null);
      alert("Book added successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Handlers for Islahi Majalis
  const handleMajalisChange = (e) => {
    const { name, value } = e.target;
    setMajalisFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMajalisSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/islahimajalis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(majalisFormData),
      });

      if (!response.ok) throw new Error("Failed to add islahi majalis");
      setMajalisFormData({
        title: "",
        scholar: "",
        duration: "",
        lang: "urdu",
        url: "",
      });
      setActiveModal(null);
      alert("Islahi Majalis added successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setError("");
  };

  const functions = [
    {
      id: "audiobayanat",
      label: "Audio Bayanat",
      urdu: "آڈیو بیانات",
      icon: Music,
      color: "bg-blue-500",
      description: "شامل کریں اور سنیں",
    },
    {
      id: "hamdonaat",
      label: "Hamdonaat (Malfozat)",
      urdu: "حمد و نعت و کلام",
      icon: Mic,
      color: "bg-green-500",
      description: "مقدس کلام شامل کریں",
    },
    {
      id: "poetry",
      label: "Poetry",
      urdu: "اشعار",
      icon: BookOpen,
      color: "bg-purple-500",
      description: "اشعار شامل کریں",
    },
    {
      id: "quotes",
      label: "Quotes (Malfozat)",
      urdu: "ملفوظات",
      icon: Quote,
      color: "bg-orange-500",
      description: "حکیمانہ الفاظ شامل کریں",
    },
    {
      id: "books",
      label: "Books",
      urdu: "کتابیں",
      icon: Library,
      color: "bg-red-500",
      description: "کتابیں شامل کریں",
    },
    {
      id: "islahimajalis",
      label: "Islahi Majalis",
      urdu: "اصلاحی مجالس",
      icon: Mic,
      color: "bg-indigo-500",
      description: "اصلاحی مجالس شامل کریں",
    },
  ];

  return (
    <div className="bg-brand-light-bg min-h-screen py-16 px-4 sm:px-6 lg:px-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary-text mb-4">
          منتظم کے افعال
        </h1>
        <p className="text-lg text-gray-600">
          نیا مواد شامل کرنے کے لیے نیچے کوئی بھی آپشن منتخب کریں
        </p>
        <div className="mt-4 w-32 h-1 bg-brand-accent rounded mx-auto"></div>
      </div>

      {/* Function Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {functions.map((func) => {
          const IconComponent = func.icon;
          return (
            <div
              key={func.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              {/* Background */}
              <div className={`${func.color} h-32 w-full transition-all duration-300`}></div>

              {/* Content */}
              <div className="bg-white p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 text-left">
                      {func.urdu}
                    </h3>
                    <p className="text-sm text-gray-500">{func.description}</p>
                  </div>
                  <div className={`${func.color} p-3 rounded-full text-white`}>
                    <IconComponent size={24} />
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal(func.id)}
                  className={`w-full ${func.color} text-white font-semibold py-2 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2`}
                >
                  <Plus size={18} /> شامل کریں
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Audio Bayanat */}
      {activeModal === "audiobayanat" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl my-8">
            <h3 className="text-2xl font-bold text-brand-primary-text mb-6">
              نیا آڈیو بیان شامل کریں
            </h3>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleAudioSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان
                </label>
                <input
                  type="text"
                  name="title"
                  value={audioFormData.title}
                  onChange={handleAudioChange}
                  placeholder="بیان کا عنوان"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مقرر
                </label>
                <input
                  type="text"
                  name="scholar"
                  value={audioFormData.scholar}
                  onChange={handleAudioChange}
                  placeholder="مقرر کا نام"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مدت
                </label>
                <input
                  type="text"
                  name="duration"
                  value={audioFormData.duration}
                  onChange={handleAudioChange}
                  placeholder="مثلاً 30:15"
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
                  value={audioFormData.lang}
                  onChange={handleAudioChange}
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
                  آڈیو لنک
                </label>
                <input
                  type="url"
                  name="url"
                  value={audioFormData.url}
                  onChange={handleAudioChange}
                  placeholder="https://example.com/audio.mp3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  required
                />
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
                  onClick={closeModal}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
                >
                  منسوخ کریں
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Hamdonaat */}
      {activeModal === "hamdonaat" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl my-8">
            <h3 className="text-2xl font-bold text-brand-primary-text mb-6">
              نیا حمد و نعت و کلام شامل کریں
            </h3>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleHamdonaatSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان
                </label>
                <input
                  type="text"
                  name="title"
                  value={hamdonaatFormData.title}
                  onChange={handleHamdonaatChange}
                  placeholder="بیان کا عنوان"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مقرر
                </label>
                <input
                  type="text"
                  name="scholar"
                  value={hamdonaatFormData.scholar}
                  onChange={handleHamdonaatChange}
                  placeholder="مقرر کا نام"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مدت
                </label>
                <input
                  type="text"
                  name="duration"
                  value={hamdonaatFormData.duration}
                  onChange={handleHamdonaatChange}
                  placeholder="مثلاً 30:15"
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
                  value={hamdonaatFormData.lang}
                  onChange={handleHamdonaatChange}
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
                  آڈیو لنک
                </label>
                <input
                  type="url"
                  name="url"
                  value={hamdonaatFormData.url}
                  onChange={handleHamdonaatChange}
                  placeholder="https://example.com/audio.mp3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  required
                />
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
                  onClick={closeModal}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
                >
                  منسوخ کریں
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Poetry */}
      {activeModal === "poetry" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl my-8">
            <h3 className="text-2xl font-bold text-brand-primary-text mb-6">
              نیا شعر شامل کریں
            </h3>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handlePoetrySubmit} className="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان
                </label>
                <input
                  type="text"
                  name="title"
                  value={poetryFormData.title}
                  onChange={handlePoetryChange}
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
                  value={poetryFormData.poet}
                  onChange={handlePoetryChange}
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
                  value={poetryFormData.lang}
                  onChange={handlePoetryChange}
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
                {poetryFormData.lines.map((line, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={line}
                      onChange={(e) => handlePoetryLineChange(index, e.target.value)}
                      placeholder={`لائن ${index + 1}`}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                      required
                    />
                    {poetryFormData.lines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePoetryLine(index)}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addPoetryLine}
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
                  onClick={closeModal}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
                >
                  منسوخ کریں
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Quotes */}
      {activeModal === "quotes" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl my-8">
            <h3 className="text-2xl font-bold text-brand-primary-text mb-6">
              نیا ملفوظہ شامل کریں
            </h3>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleQuotesSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ملفوظہ
                </label>
                <textarea
                  name="quote"
                  value={quotesFormData.quote}
                  onChange={handleQuotesChange}
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
                  value={quotesFormData.author}
                  onChange={handleQuotesChange}
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
                  value={quotesFormData.source}
                  onChange={handleQuotesChange}
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
                  value={quotesFormData.lang}
                  onChange={handleQuotesChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                >
                  {quotesLanguages.map((lang) => (
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
                  onClick={closeModal}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
                >
                  منسوخ کریں
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Books */}
      {activeModal === "books" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl my-8">
            <h3 className="text-2xl font-bold text-brand-primary-text mb-6">
              نیا کتاب شامل کریں
            </h3>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleBooksSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان
                </label>
                <input
                  type="text"
                  name="title"
                  value={booksFormData.title}
                  onChange={handleBooksChange}
                  placeholder="کتاب کا عنوان"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مصنف
                </label>
                <input
                  type="text"
                  name="author"
                  value={booksFormData.author}
                  onChange={handleBooksChange}
                  placeholder="مصنف کا نام"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  قیمت
                </label>
                <input
                  type="text"
                  name="price"
                  value={booksFormData.price}
                  onChange={handleBooksChange}
                  placeholder="مثلاً: Free یا 500 PKR"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  لنک
                </label>
                <input
                  type="url"
                  name="link"
                  value={booksFormData.link}
                  onChange={handleBooksChange}
                  placeholder="https://example.com/book"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  required
                />
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
                  onClick={closeModal}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
                >
                  منسوخ کریں
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Islahi Majalis */}
      {activeModal === "islahimajalis" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl my-8">
            <h3 className="text-2xl font-bold text-brand-primary-text mb-6">
              نیا اصلاحی مجلس شامل کریں
            </h3>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleMajalisSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان
                </label>
                <input
                  type="text"
                  name="title"
                  value={majalisFormData.title}
                  onChange={handleMajalisChange}
                  placeholder="مجلس کا عنوان"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  علماء/داروغہ
                </label>
                <input
                  type="text"
                  name="scholar"
                  value={majalisFormData.scholar}
                  onChange={handleMajalisChange}
                  placeholder="علماء کا نام"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مدت (منٹ میں)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={majalisFormData.duration}
                  onChange={handleMajalisChange}
                  placeholder="45"
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
                  value={majalisFormData.lang}
                  onChange={handleMajalisChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  required
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  آڈیو لنک
                </label>
                <input
                  type="url"
                  name="url"
                  value={majalisFormData.url}
                  onChange={handleMajalisChange}
                  placeholder="https://example.com/audio.mp3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  required
                />
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
                  onClick={closeModal}
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
