"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ChishtHistory() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const history = [
    {
      name: "خواجہ معین الدین اجمیری",
      years: "1142–1236 AD",
      desc: "برصغیر میں روحانی تعلیمات کے بانی، جنہوں نے محبت اور رواداری کا پیغام عام کیا۔",
    },
    {
      name: "خواجہ قطب الدین بختیار کاکی",
      years: "1173–1235 AD",
      desc: "حضرت اجمیری کے خلیفہ اول، دہلی میں قیام فرمایا اور خلقِ خدا کی خدمت کی۔",
    },
    {
      name: "بابا فرید الدین گنج شکر",
      years: "1179–1266 AD",
      desc: "پاکپتن کے عظیم بزرگ اور شاعر، جنہیں گنج شکر کے لقب سے یاد کیا جاتا ہے۔",
    },
    {
      name: "خواجہ نظام الدین اولیاء",
      years: "1238–1325 AD",
      desc: "دہلی کے مشہور بزرگ، جنہیں محبوبِ الٰہی کہا جاتا ہے۔",
    },
    {
      name: "حضرت نصیر الدین چراغ دہلوی",
      years: "1274–1356 AD",
      desc: "دہلی کے آخری بڑے صوفی بزرگ، جنہوں نے سادگی اور خدمت کو فروغ دیا۔",
    },
    {
      name: "خواجہ گیسو دراز بندہ نواز",
      years: "1321–1422 AD",
      desc: "جنہوں نے دکن (گلبرگہ) میں خانقاہ قائم کی اور روحانی فیض کو پھیلایا۔",
    },
    {
      name: "مشائخ دہلی و پنجاب",
      years: "15ویں–17ویں صدی",
      desc: "اس دور میں علما و مشائخ نے تعلیمات کی حفاظت اور ترویج کی۔",
    },
    {
      name: "خواجہ نور محمد مہاروی",
      years: "1730–1790 AD",
      desc: "مہار شریف کے بزرگ، جنہوں نے ذکر اور خدمتِ خلق کو زندہ کیا۔",
    },
    {
      name: "خواجہ غلام فرید",
      years: "1845–1901 AD",
      desc: "مشہور صوفی شاعر، جنہوں نے سرائیکی اور اردو میں کلام کہا۔",
    },
    {
      name: "خواجہ ذکریا ملتانی",
      years: "وفات: 1957 AD",
      desc: "20ویں صدی کے بزرگ، جنہوں نے ملتان میں روحانی فیض کو عام کیا۔",
    },
    {
      name: "خواجہ مختار الدین شاہ",
      years: "موجودہ دور",
      desc: "سلسلے کے موجودہ بزرگ اور جانشین، جو تعلیمات کو آگے بڑھا رہے ہیں۔",
    },
  ];

  return (
    <div className="bg-brand-light-bg min-h-screen py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-brand-primary-text mb-6">
          تاریخ مشائخِ چشت
        </h2>
        <h3 className="text-xl md:text-2xl font-semibold text-brand-primary-text relative inline-block">
          روحانی وراثت اور تسلسل
          <span className="absolute -bottom-2 start-1/2 -translate-x-1/2 w-20 h-1 bg-[#C7B9A3] rounded-full"></span>
        </h3>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="absolute start-1/2 top-0 h-full border-s-4 border-brand-accent transform -translate-x-1/2"></div>

        <div ref={ref} className="space-y-16">
          {history.map((item, idx) => (
            <motion.div
              key={idx}
              className={`relative flex flex-col md:flex-row items-center ${
                idx % 2 === 0 ? "md:justify-end" : "md:justify-start"
              }`}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
            >
              <motion.div className="absolute start-1/2 transform -translate-x-1/2 w-6 h-6 bg-brand-accent border-4 border-white rounded-full z-10 shadow-md"></motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`bg-white shadow-xl border border-brand-border rounded-2xl p-6 w-full md:w-5/12 ${
                  idx % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                }`}
              >
                <h3 className="text-2xl font-bold text-brand-accent mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-700 mb-3 font-medium">
                  {item.years}
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {item.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
