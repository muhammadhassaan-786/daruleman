"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    link: "",
  });

  // Add styles to hide Google Docs toolbar
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      /* Hide and disable Google Docs toolbar completely */
      .goog-inline-block { display: none !important; }
      [role="toolbar"] { display: none !important; }
      .goog-menu { display: none !important; }
      .goog-menubutton { display: none !important; }
      button[aria-label*="Open"] { display: none !important; }
      button[aria-label*="open"] { display: none !important; }
      a[href*="docs.google.com"] { pointer-events: none !important; }
      /* Hide all toolbar buttons in the top right */
      div[jsname] { pointer-events: none !important; }
      /* Disable all buttons in Google Docs viewer */
      .docs-gvh-buttonpair { display: none !important; }
      .docs-gvh-button { display: none !important; }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Fetch books from API
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/books");
      if (!response.ok) throw new Error("Failed to fetch books");
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to load books");
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
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add book");
      }

      const newBook = await response.json();
      setBooks((prev) => [...prev, newBook]);
      setFormData({
        title: "",
        author: "",
        price: "",
        link: "",
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding book:", err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-light-bg min-h-screen">
      {/* ✅ Heading with Add Button */}
      {!selectedBook && (
        <div className="py-16 px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary-text">
                کتابیں
              </h2>
            </div>
            <div className="mt-2 w-20 h-1 bg-brand-accent rounded mx-auto"></div>
          </div>

          {/* ✅ Error Message */}
          {error && (
            <div className="max-w-6xl mx-auto mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* ✅ Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {books.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">لوڈ ہو رہی ہیں...</p>
            ) : (
              books.sort((a, b) => b.id - a.id).map((book, idx) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="bg-white rounded-2xl shadow hover:shadow-lg border border-brand-subtle-hover p-6 transition"
                  >
                    <h3 className="text-lg font-bold text-brand-accent mb-2 leading-snug line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">مصنف: {book.author}</p>
                    <p className="text-sm text-gray-700 font-semibold mb-3">
                      قیمت: {book.price || "مفت"}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedBook(book);
                          setPdfLoading(true);
                          setPdfError("");
                        }}
                        className="flex-1 bg-brand-accent hover:bg-brand-accent-dark text-white font-bold py-2 px-4 rounded-lg transition"
                      >
                        کھولیں
                      </button>
                      <a
                        href={`https://wa.me/?text=Main ${encodeURIComponent(book.title)} khareedna chahta hun.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                      >
                        <span>خریدیں</span>
                      </a>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
        </div>
      )}

      {/* ✅ PDF Viewer */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Header */}
          <div className="bg-brand-accent text-white p-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{selectedBook.title}</h2>
              <p className="text-sm text-gray-100">مصنف: {selectedBook.author}</p>
            </div>
            <button
              onClick={() => {
                setSelectedBook(null);
                setPdfLoading(true);
                setPdfError("");
              }}
              className="text-white hover:bg-brand-accent-dark p-2 rounded-lg transition text-xl font-bold"
              title="بند کریں"
            >
              ✕
            </button>
          </div>

          {/* Loading State */}
          {pdfLoading && (
            <div className="flex-1 flex items-center justify-center bg-black">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent mx-auto mb-4"></div>
                <p className="text-white">PDF لوڈ ہو رہی ہے...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {pdfError && (
            <div className="flex-1 flex items-center justify-center bg-black">
              <div className="text-center">
                <p className="text-red-400 mb-4">PDF لوڈ نہیں ہو سکی</p>
                <a
                  href={selectedBook.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-brand-accent hover:bg-brand-accent-dark text-white font-bold py-2 px-6 rounded-lg transition"
                >
                  براہ راست کھولیں
                </a>
              </div>
            </div>
          )}

          {/* Embedded PDF */}
          {!pdfError && (
            <div className="flex-1 overflow-hidden relative">
              {/* Blocking overlay to prevent toolbar clicks */}
              <div 
                className="absolute top-0 right-0 h-16 z-10 pointer-events-auto"
                style={{ width: '200px' }}
                onClick={(e) => e.preventDefault()}
              />
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(selectedBook.link)}&embedded=true`}
                className="w-full h-full border-none"
                title={selectedBook.title}
                onLoad={() => setPdfLoading(false)}
                onError={() => {
                  setPdfLoading(false);
                  setPdfError("PDF لوڈ نہیں ہو سکی");
                }}
                allow="fullscreen"
                allowFullScreen
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          )}
        </div>
      )}

      {/* ✅ Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl my-8">
            <h3 className="text-2xl font-bold text-brand-primary-text mb-6">نئی کتاب شامل کریں</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
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
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="مصنف کا نام"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  قیمت (اختیاری)
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="مثلاً 500 یا مفت"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PDF لنک
                </label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="https://example.com/book.pdf"
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
