"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image"; 

const bgPath = '/assets/bg.avif'; 
const bg3Path = '/assets/bg3.avif';

export default function History() {
    const historyData = [
        {
            title: "ابتدائی ایام",
            text: "تحریک ایمان و تقویٰ کا قیام حضرت سید مخدوم شاہ صاحب کے دور میں ہوا۔ یہ تحریک کا آغاز ایک چھوٹے سے گاؤں میں ہوا، جہاں علم و تقویٰ کی روشنی لوگوں کے دلوں میں اجاگر کی گئی۔",
            image: bgPath, 
        },
        {
            title: "مرکز کا قیام",
            text: "ادارہ جدید دور کے تقاضوں کے مطابق ایک مرکزی مقام پر قائم ہوا۔ یہاں دینی تعلیمات، روحانی تربیت اور سماجی خدمات کے منصوبے شروع کیے گئے۔ اس مرکز نے نہ صرف مقامی سطح پر بلکہ قومی و عالمی سطح پر بھی نمایاں کردار ادا کیا۔",
            image: bg3Path, 
        },
        {
            title: "موجودہ دور",
            text: "آج تحریک ایمان و تقویٰ جدید وسائل اور نصاب کے ذریعے علم، محبت اور خدمت کے مشن کو جاری رکھے ہوئے ہے۔ ادارہ جدید تعلیمی نصاب، رفاہی خدمات اور عالمی سطح پر تعاون کے ذریعے دین کی خدمت انجام دے رہا ہے۔",
            image: bgPath,
        },
    ];

    return (
        // ✅ Replaced bg-[${LIGHT_BEIGE}] with bg-brand-light-bg
        <div className="bg-brand-light-bg bg-none py-16 px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center mb-16">
                {/* ✅ Replaced text-[${DARKEST_BROWN}] with text-brand-primary-text */}
                <h2 className="text-3xl md:text-5xl font-extrabold text-brand-primary-text pb-6">
                    تحریک ایمان و تقویٰ
                </h2>
                {/* ✅ Replaced text-[${DARKEST_BROWN}] with text-brand-primary-text */}
                <h3 className="text-2xl md:text-3xl font-bold text-brand-primary-text relative inline-block mt-4">
                    ہماری تاریخ
                    {/* ⚠️ NOTE: The specific hex for Medium Brown Accent was NOT added to the config, so it's kept as a hex for now. 
                       For a clean fix, you should add it to your tailwind.config.js */}
                    <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#C7B9A3] rounded-full`}></span>
                </h3>
            </div>

            {/* History Timeline */}
            <div className="space-y-16 md:space-y-24 max-w-6xl mx-auto">
                {historyData.map((item, index) => {
                    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

                    return (
                        <motion.div
                            ref={ref}
                            key={index}
                            className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                                }`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                        >
                            {/* Image Container (Wider on mobile, always present) */}
                            <motion.div
                                // ✅ Replaced border-[${LIGHT_ACCENT}] with border-brand-subtle-hover
                                className={`w-full max-w-xs h-auto aspect-square rounded-xl md:rounded-full overflow-hidden shadow-xl border-4 border-brand-subtle-hover flex-shrink-0 bg-white relative`} 
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill 
                                    style={{ objectFit: 'cover' }} 
                                />
                            </motion.div>

                            {/* Text Container */}
                            <div className="flex-1 flex items-center">
                                <div className={`w-full text-center md:text-right bg-white rounded-2xl p-6 shadow-xl border border-brand-subtle-hover`}>
                                    {/* ✅ Replaced text-[${DARK_BROWN}] with text-brand-accent */}
                                    <h4 className={`text-2xl font-bold text-brand-accent mb-4`}>
                                        {item.title}
                                    </h4>
                                    {/* ✅ Replaced ${TEXT_SECONDARY} with text-gray-700 */}
                                    <p className="text-gray-700 leading-8 text-lg">{item.text}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}