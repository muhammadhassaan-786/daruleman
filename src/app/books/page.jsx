// "use client";

// import { ShoppingCart, Eye } from "lucide-react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// // --- Constants ---
// const bookImgPath = "/assets/book.avif";
// const whatsappNumber = "+923365495060";

// // --- Utility Classes ---
// const BRAND_ACCENT = "bg-brand-accent";
// const BRAND_ACCENT_TEXT = "text-brand-accent";
// const BRAND_PRIMARY_TEXT = "text-brand-primary-text";
// const BRAND_SUBTLE_HOVER = "border-brand-subtle-hover";

// export default function Books() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch books from Archive.org API
//   useEffect(() => {
//     const loadBooks = async () => {
//       try {
//         const res = await fetch("/api/books");
//         const data = await res.json();
//         setBooks(data);
//       } catch (err) {
//         console.error("Failed to load books:", err);
//         setBooks([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadBooks();
//   }, []);

//   return (
//     <div className="bg-brand-light-bg min-h-screen py-16 px-4 sm:px-6 lg:px-12">
//       <div className="max-w-6xl mx-auto text-center mb-10">
//         <h3
//           className={`text-3xl md:text-4xl font-extrabold ${BRAND_PRIMARY_TEXT} relative inline-block`}
//         >
//           کتابیں
//           <span
//             className={`absolute -bottom-2 start-1/2 -translate-x-1/2 w-24 h-1 ${BRAND_ACCENT} rounded-full`}
//           ></span>
//         </h3>
//       </div>

//       {/* Loading Skeleton */}
//       {loading && (
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
//           {[1, 2, 3, 4].map((n) => (
//             <div
//               key={n}
//               className="bg-white rounded-2xl shadow border p-6 h-40"
//             ></div>
//           ))}
//         </div>
//       )}

//       {/* Books Grid */}
//       {!loading && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
//           {books.map((book, idx) => (
//             <motion.div
//               key={book.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: idx * 0.1 }}
//               className={`bg-white rounded-2xl shadow hover:shadow-lg border ${BRAND_SUBTLE_HOVER} p-6 flex flex-col md:flex-row gap-6`}
//             >
//               {/* Thumbnail */}
//               <div className="w-full md:w-1/3 flex justify-center flex-shrink-0">
//                 <Image
//                   src={bookImgPath}
//                   alt={book.title}
//                   width={160}
//                   height={220}
//                   className="object-cover rounded-lg border border-gray-300"
//                 />
//               </div>

//               {/* Text Content */}
//               <div className="flex-1 text-right">
//                 <h3
//                   className={`text-xl font-bold ${BRAND_ACCENT_TEXT} mb-1 leading-snug`}
//                 >
//                   {book.title}
//                 </h3>

//                 <p className="text-sm text-gray-700 font-semibold mb-4">
//                   قیمت: {book.price || "مفت"}
//                 </p>

//                 <div className="flex flex-wrap gap-3 justify-start">

//                   {/* Buy Button */}
//                   <Link
//                     href={`https://wa.me/${whatsappNumber}?text=میں ${encodeURIComponent(
//                       book.title
//                     )} کتاب خریدنا چاہتا ہوں۔`}
//                     target="_blank"
//                     className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:bg-green-700"
//                   >
//                     <ShoppingCart size={16} /> خریدیں
//                   </Link>

//                   {/* View Online - BookReader */}
//                   <Link
//                     href={book.embed}
//                     target="_blank"
//                     className="flex items-center gap-1 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:bg-purple-700"
//                   >
//                     📖 آن لائن پڑھیں
//                   </Link>

//                   {/* PDF Viewer (if PDF exists) */}
//                   {book.pdf ? (
//                     <Link
//                       href={`/pdf-viewer?book=${encodeURIComponent(
//                         book.title
//                       )}&price=${encodeURIComponent(
//                         book.price || "مفت"
//                       )}&pdf=${encodeURIComponent(book.pdf)}`}
//                       className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:bg-blue-700"
//                     >
//                       <Eye size={16} /> پی ڈی ایف دیکھیں
//                     </Link>
//                   ) : (
//                     <button
//                       disabled
//                       className="flex items-center gap-1 bg-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm cursor-not-allowed"
//                     >
//                       پی ڈی ایف موجود نہیں
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }







"use client";

import { useEffect, useState } from "react";

export default function BooksPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function loadBooks() {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data);
    }

    loadBooks();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Books</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((b, i) => (
          <div key={i} className="border rounded-lg p-4 shadow">
            <h3 className="text-xl font-semibold">{b.title}</h3>

            <p className="text-gray-600 mt-2">Price: {b.price} PKR</p>

            <a
              className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              href={`/pdf-viewer?book=${encodeURIComponent(b.title)}&price=${encodeURIComponent(b.price)}&pdf=${encodeURIComponent(b.pdf)}`}
            >
              Open
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
