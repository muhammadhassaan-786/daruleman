"use client";

import { BookOpen } from "lucide-react";

export default function HifzeQuran() {
  const years = [
    {
      id: 1,
      title: "پہلا سال",
      sabaq: "روزانہ 5 تا 10 آیات",
      sabaqi: "پچھلے 1 یا 2 صفحات",
      manzil: "جزء عم اور پچھلا یاد کیا ہوا حصہ",
      length: "تقریباً 5 پارے",
    },
    {
      id: 2,
      title: "دوسرا سال",
      sabaq: "روزانہ 10 تا 15 آیات",
      sabaqi: "پچھلے 2 تا 3 صفحات",
      manzil: "گزشتہ سال کا مکمل حصہ + نیا سبق",
      length: "مزید 10 پارے",
    },
    {
      id: 3,
      title: "تیسرا سال",
      sabaq: "روزانہ آدھا تا ایک رکوع",
      sabaqi: "پچھلے 3 تا 4 صفحات",
      manzil: "آدھا قرآن کا دور",
      length: "مزید 10 پارے",
    },
    {
      id: 4,
      title: "چوتھا سال",
      sabaq: "روزانہ ایک رکوع",
      sabaqi: "پچھلے 5 صفحات",
      manzil: "پورے قرآن کا دور (جزء بہ جزء)",
      length: "بقیہ قرآن (پارہ 30 مکمل)",
    },
  ];

  return (
    <section className="bg-brand-light-bg py-16 px-6">
      {/* Heading */}
      <div className="text-center mb-12">
        {/* ✅ text-brand-primary-text */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary-text">
          حفظِ قرآن
        </h2>
        {/* ✅ Accent line uses bg-brand-accent */}
        <div className="mt-3 w-24 h-1 bg-brand-accent rounded mx-auto"></div>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          چار سالہ منصوبہ جس میں سبق، سبقی اور منزل کے ساتھ قرآن پاک مکمل
          حفظ کرایا جاتا ہے۔
        </p>
      </div>

      {/* Timeline Style Layout */}
      <div className="relative max-w-5xl mx-auto">
        {/* Vertical line (Timeline Spine) */}
        {/* ❌ RTL Fix: left-4 -> start-4, and bg-brand-accent */}
        <div className="absolute start-4 md:start-1/2 top-0 bottom-0 w-1 bg-brand-subtle-hover rounded"></div>

        <div className="space-y-12">
          {years.map((year, i) => (
            <div
              key={year.id}
              // ❌ Removed explicit md:flex-row-reverse. The logic below handles positioning.
              className={`relative flex flex-col md:flex-row items-center`}
            >
              {/* Dot */}
              {/* ❌ RTL Fix: left-2 -> start-2, and bg-brand-accent */}
              <div className="absolute start-2 md:start-1/2 transform -translate-x-1/2 bg-brand-accent w-6 h-6 rounded-full border-4 border-white shadow"></div>

              {/* Card */}
              <div
                className={`w-full md:w-1/2 p-6 bg-white border rounded-2xl shadow-md transition hover:shadow-lg
                  ${
                    i % 2 === 0 
                      // ❌ Even index: Should be on the RIGHT side in LTR, but RTL flips it to LEFT.
                      // So, position to the start and add margin-end (me) to push it away from the center.
                      ? "md:me-auto md:pe-10" 
                      // ❌ Odd index: Should be on the LEFT side in LTR, but RTL flips it to RIGHT.
                      // So, position to the end and add margin-start (ms) to push it away from the center.
                      : "md:ms-auto md:ps-10" 
                  }
                `}
              >
                <h3 className="flex items-center gap-2 text-xl font-bold text-brand-accent mb-4">
                  {/* Icon color kept dynamic or fixed (text-yellow-500) */}
                  <BookOpen className="w-5 h-5 text-yellow-500" /> 
                  {year.title}
                </h3>

                <ul className="space-y-2 text-gray-700 text-sm leading-relaxed">
                  <li>
                    <span className="font-semibold text-brand-accent">سبق: </span>
                    {year.sabaq}
                  </li>
                  <li>
                    <span className="font-semibold text-brand-accent">سبقی: </span>
                    {year.sabaqi}
                  </li>
                  <li>
                    <span className="font-semibold text-brand-accent">منزل: </span>
                    {year.manzil}
                  </li>
                  <li>
                    <span className="font-semibold text-brand-accent">
                      کل مقدار:{" "}
                    </span>
                    {year.length}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}