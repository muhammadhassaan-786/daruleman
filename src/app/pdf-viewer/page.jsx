"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function PdfViewerContent() {
  const searchParams = useSearchParams();

  const book = decodeURIComponent(searchParams.get("book") || "کتاب");
  const price = decodeURIComponent(searchParams.get("price") || "نامعلوم");
  const pdfParam = decodeURIComponent(searchParams.get("pdf") || "");

  // Allow only valid full URLs from archive.org
  const safePdf =
    pdfParam.startsWith("https://archive.org/download/") &&
    pdfParam.endsWith(".pdf")
      ? pdfParam
      : null;

  // Fallback to a safe blank PDF if invalid
  const pdfUrl = safePdf
    ? `${safePdf}#toolbar=0&navpanes=0&scrollbar=1&view=FitH&pagemode=none`
    : `/blank.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH&pagemode=none`;

  // Block right-click + common shortcuts
  useEffect(() => {
    const blockContext = (e) => e.preventDefault();
    const blockKeys = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if ([65, 67, 80, 83, 85].includes(e.keyCode)) e.preventDefault();
      }
      if (e.key === "F12") e.preventDefault();
    };

    document.addEventListener("contextmenu", blockContext);
    document.addEventListener("keydown", blockKeys);

    return () => {
      document.removeEventListener("contextmenu", blockContext);
      document.removeEventListener("keydown", blockKeys);
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-light-bg flex flex-col items-center py-4 px-2 overflow-y-auto">

      {/* Header */}
      <header className="w-full max-w-2xl text-center mb-3">
        <h1 className="text-lg font-bold text-brand-accent">{book}</h1>
        <p className="text-sm text-gray-600">قیمت: {price}</p>
      </header>

      {/* PDF Viewer */}
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
        <iframe
          src={pdfUrl}
          title={book}
          className="w-full h-[75vh] border-0"
          allowFullScreen
          loading="lazy"
          style={{ touchAction: "pan-y", pointerEvents: "auto" }}
        />
      </div>
    </div>
  );
}

export default function PdfViewer() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center text-lg">
          لوڈ ہو رہا ہے...
        </div>
      }
    >
      <PdfViewerContent />
    </Suspense>
  );
}
