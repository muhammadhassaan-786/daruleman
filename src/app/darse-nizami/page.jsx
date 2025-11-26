"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DarseNizami() {
  const [openYear, setOpenYear] = useState(null);

  const years = [
    {
      id: 1,
      title: "سال اول (اوّل)",
      subjects: [
        {
          name: "میزان الصرف",
          detail:
            "عربی صرف کی بنیادی کتاب جس سے الفاظ کی بناوٹ اور تبدیلی کے اصول سیکھائے جاتے ہیں۔",
        },
        {
          name: "علم الصرف",
          detail: "مزید گہرائی کے ساتھ صیغوں اور ابواب کا مطالعہ۔",
        },
        {
          name: "نحو میر / ہدایۃ النحو",
          detail: "عربی قواعد و جملوں کی تشکیل کے بنیادی اصول۔",
        },
        {
          name: "املا و خط",
          detail: "درست املا اور خوشخطی کی مشق۔",
        },
        {
          name: "تجوید",
          detail: "قرآن کریم کی صحیح تلفظ کے ساتھ تلاوت کے اصول۔",
        },
      ],
    },
    {
      id: 2,
      title: "سال دوم (دوم)",
      subjects: [
        {
          name: "نور الایضاح",
          detail: "فقہ حنفی کی ابتدائی کتاب، عبادات کے مسائل پر مشتمل۔",
        },
        {
          name: "سلم العلوم",
          detail:
            "منطق کی بنیادی کتاب جو استدلال اور دلیل کے اصول سکھاتی ہے۔",
        },
        {
          name: "بلاغت",
          detail: "زبان و بیان کی خوبیوں کا مطالعہ۔",
        },
      ],
    },
    {
      id: 3,
      title: "سال سوم (سوم)",
      subjects: [
        {
          name: "اصول فقہ",
          detail: "فقہی مسائل کے استنباط کے بنیادی اصول۔",
        },
        {
          name: "فقہ حنفی",
          detail: "فقہ حنفی کی متوسط کتب کا مطالعہ۔",
        },
        {
          name: "تفسیر آسان",
          detail: "قرآن کریم کی منتخب آیات کی سادہ تشریح۔",
        },
      ],
    },
    {
      id: 4,
      title: "سال چہارم (رابع)",
      subjects: [
        {
          name: "احادیث منتخبہ",
          detail: "منتخب احادیث کا مطالعہ مع شرح۔",
        },
        {
          name: "کنز الدقائق",
          detail: "فقہ حنفی کی معتبر کتاب، معاملات اور عبادات پر مبنی۔",
        },
        {
          name: "بلاغۃ",
          detail: "عربی ادب میں فصاحت و بلاغت کے اصول۔",
        },
      ],
    },
    {
      id: 5,
      title: "سال پنجم (خامسہ)",
      subjects: [
        {
          name: "تفسیر جلالین",
          detail:
            "امام جلال الدین محلی اور امام جلال الدین سیوطی کی مشہور مختصر تفسیر۔",
        },
        {
          name: "فقہ: ہدایہ",
          detail:
            "فقہ حنفی کی مشہور و معتبر کتاب، عبادات اور معاملات کے ابواب۔",
        },
        {
          name: "اصول الحدیث",
          detail:
            "حدیث کی سند و متن کی تحقیق اور روایت کے اصول۔",
        },
      ],
    },
    {
      id: 6,
      title: "سال ششم (سادسہ)",
      subjects: [
        {
          name: "صحیح بخاری (جزء اول)",
          detail: "بخاری شریف کی ابتدائی جلد کا مطالعہ۔",
        },
        {
          name: "صحیح مسلم",
          detail: "صحیح مسلم کی منتخب احادیث مع شرح۔",
        },
        {
          name: "فقہ: ہدایہ",
          detail: "فقہ کے مزید ابواب اور ان کی شرح۔",
        },
      ],
    },
    {
      id: 7,
      title: "سال ہفتم (موقوف علیہ)",
      subjects: [
        {
          name: "سنن ترمذی",
          detail: "امام ترمذی کی حدیث کی کتاب، فقہی ابواب کے ساتھ۔",
        },
        {
          name: "سنن ابی داؤد",
          detail: "فقہی ابواب پر مشتمل احادیث۔",
        },
        {
          name: "فقہ معاصر",
          detail: "عصر حاضر کے فقہی مسائل اور ان کا حل۔",
        },
      ],
    },
    {
      id: 8,
      title: "سال ہشتم (دورہ حدیث)",
      subjects: [
        {
          name: "صحیح بخاری",
          detail: "امام بخاری کی مکمل کتاب مع تفصیلی شرح۔",
        },
        {
          name: "صحیح مسلم",
          detail: "امام مسلم کی مکمل کتاب مع شرح۔",
        },
        {
          name: "سنن نسائی",
          detail: "امام نسائی کی حدیث کی کتاب۔",
        },
        {
          name: "سنن ابن ماجہ",
          detail: "امام ابن ماجہ کی حدیث کی کتاب۔",
        },
      ],
    },
  ];

  return (
    <section className="bg-brand-light-bg py-16 px-6">
      {/* Section Heading */}
      <div className="text-center mb-12">
        {/* ✅ text-brand-primary-text */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary-text">
          درس نظامی
        </h2>
        {/* ✅ Accent line uses bg-brand-accent */}
        <div className="mt-3 w-24 h-1 bg-brand-accent rounded mx-auto"></div>
      </div>

      {/* Year Blocks */}
      {/* ✅ Replaced gradient background with bg-brand-light-bg. Added border around the list */}
      <div className="max-w-3xl mx-auto space-y-4 p-4 rounded-xl bg-brand-light-bg border border-brand-border">
        {years.map((year) => (
          <div
            key={year.id}
            className="bg-white rounded-xl shadow-md border border-brand-subtle-hover overflow-hidden transition hover:shadow-lg"
          >
            {/* Year Header (Accordion Trigger) */}
            <button
              onClick={() =>
                setOpenYear(openYear === year.id ? null : year.id)
              }
              className="w-full flex justify-between items-center px-6 py-4 text-right transition-colors"
            >
              {/* ✅ text-brand-accent and text-brand-accent for icons */}
              <span className="text-lg font-bold text-brand-accent flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-accent" />
                {year.title}
              </span>
              {/* ✅ text-brand-accent */}
              {openYear === year.id ? (
                <ChevronUp className="w-5 h-5 text-brand-accent" />
              ) : (
                <ChevronDown className="w-5 h-5 text-brand-accent" />
              )}
            </button>

            {/* Subjects (Accordion Content) */}
            <AnimatePresence initial={false}>
              {openYear === year.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6 space-y-4"
                >
                  {year.subjects.map((subj, i) => (
                    <div
                      key={i}
                      // ✅ border-brand-subtle-hover, bg-brand-subtle-hover/30
                      className="p-4 rounded-xl border border-brand-subtle-hover shadow-sm bg-brand-subtle-hover/30 hover:bg-brand-subtle-hover/50 transition"
                    >
                      {/* ✅ text-brand-accent */}
                      <h3 className="font-semibold text-brand-accent">
                        {subj.name}
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed mt-1">
                        {subj.detail}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}