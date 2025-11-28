"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";

const logoPath = "/assets/logo.avif";
const audioPath = "/assets/audio.mp3";
const bg3Path = "/assets/bg3.avif";

export default function Home() {
    const router = useRouter();
    const [quotes, setQuotes] = useState([]);
    const [audios, setAudios] = useState([]);
    const [bayanaat, setBayanaat] = useState([]);
    const [majalis, setMajalis] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch latest data from APIs
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch quotes (malfoozat)
                const quotesRes = await fetch("/api/quotes");
                if (quotesRes.ok) {
                    const quotesData = await quotesRes.json();
                    setQuotes(quotesData.slice(0, 3));
                }

                // Fetch audio bayanaat
                const audioRes = await fetch("/api/audiobayanat");
                if (audioRes.ok) {
                    const audioData = await audioRes.json();
                    setAudios(audioData.slice(0, 4));
                }

                // Fetch hamdonaatokalaam (bayanaat)
                const bayRes = await fetch("/api/hamdonaatokalaam");
                if (bayRes.ok) {
                    const bayData = await bayRes.json();
                    setBayanaat(bayData.slice(0, 3));
                }

                // Fetch islahi majalis
                const majalisRes = await fetch("/api/islahimajalis");
                if (majalisRes.ok) {
                    const majalisData = await majalisRes.json();
                    setMajalis(majalisData.slice(0, 3));
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // ❌ Corrected routes to match converted Next.js paths
    const features = [
        { icon: "✸", title: "تعارف دار الایمان والتقویٰ", desc: "جامعہ اور اس کی خدمات ایک نظر میں", route: "/introduction" },
        { icon: "🕌", title: "مفتی سید مختار الدین شاہ", desc: "تعارف، علمی و تحقیقی خدمات", route: "/chishthistory" },
        { icon: "📖", title: "کتابیں", desc: "مفید علمی و اصلاحی کتب", route: "/books" },
        { icon: "🕋", title: "آڈیو و کلام", desc: "قرآن و سنت پر مبنی تعلیمات کا علمبردار", route: "/audiobayanaat" },
    ];

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
        hover: { scale: 1.03, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)" },
    };

    const navigateTo = (route) => router.push(route);

    return (
        <div className="min-h-screen font-nafees bg-brand-light-bg overflow-hidden">
            {/* Hero */}
            <section className="relative w-full h-[50vh] md:h-[60vh] bg-cover bg-center">
                {/* ❌ Replaced div background with Next.js Image component */}
                <Image
                    src={bg3Path}
                    alt="دار الایمان والتقویٰ پس منظر"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <motion.h1
                        // ✅ text-brand-light-bg, bg-brand-accent/70
                        className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-light-bg text-center bg-brand-accent/70 px-6 py-3 rounded-2xl shadow-lg"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        دار الایمان والتقویٰ
                    </motion.h1>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* اہم شخصیات */}
                <motion.section
                    className="py-16 md:py-20"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* ✅ text-brand-accent */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-brand-accent mb-4">
                        اہم شخصیات کا تعارف
                    </h2>
                    {/* ✅ bg-brand-accent (subtle brown) */}
                    <div className="w-32 h-1 bg-brand-accent mx-auto mb-10 rounded-full"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                name: "مولانا محمد ذکریا کاندھلوی",
                                desc: "شیخ الحدیث مولانا محمد ذکریا کاندھلوی (رحمۃ اللہ) عالمی شہرت یافتہ عالم اور روحانی رہنما تھے۔",
                            },
                            {
                                name: "مفتی سید مختار الدین شاہ",
                                desc: "حضرت مفتی سید مختار الدین شاہ ایک ممتاز اسلامی اسکالر اور شیخ الحدیث ہیں۔",
                            },
                        ].map((person, idx) => (
                            <motion.div
                                key={idx}
                                // ✅ border-brand-subtle-hover
                                className="bg-white shadow-lg rounded-2xl p-6 text-center border border-brand-subtle-hover"
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                whileHover="hover"
                                viewport={{ once: true }}
                            >
                                <div className="w-32 h-32 mx-auto flex items-center justify-center rounded-full bg-brand-subtle-hover border-4 border-brand-subtle-hover">
                                    {/* ✅ text-brand-accent */}
                                    <FaUser className="text-brand-accent text-5xl" />
                                </div>
                                {/* ✅ text-brand-accent */}
                                <h3 className="mt-4 text-xl font-semibold text-brand-accent">{person.name}</h3>
                                {/* ✅ text-brand-primary-text */}
                                <p className="mt-3 text-brand-primary-text">{person.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section> 

                {/* اس ہفتے کی مجلس */}
                <section className="w-full flex flex-col items-center justify-center py-8 bg-brand-subtle-hover/50">
                    {/* ✅ text-brand-accent */}
                    <h2 className="text-3xl font-bold text-brand-accent text-center mb-2">اس ہفتے کی مجلس</h2>
                    {/* ✅ bg-brand-accent */}
                    <div className="w-24 h-1 bg-brand-accent rounded-full mb-10"></div>
                    {/* ✅ border-brand-subtle-hover */}
                    <div className="bg-white border border-brand-subtle-hover shadow-lg rounded-xl p-8 w-full md:w-[600px] text-center">
                        {/* ✅ text-brand-accent */}
                        <h3 className="text-xl font-semibold text-brand-accent mb-1">اصلاحی مجلس - حصہ اول</h3>
                        {/* ✅ text-brand-primary-text */}
                        <p className="text-sm text-brand-primary-text mb-5">مفتی سید مختار الدین شاہ صاحب</p>
                        <audio controls className="w-full rounded-lg">
                            <source src={audioPath} type="audio/mp3" />
                            آپ کا براؤزر آڈیو پلیئر کو سپورٹ نہیں کرتا۔
                        </audio>
                    </div>
                </section>

                {/* منتخب ملفوظات */}
                <motion.section
                    className="py-16 md:py-20"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* ✅ text-brand-accent */}
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-accent mb-4">
                        منتخب ملفوظات
                    </h2>
                    {/* ✅ bg-brand-accent */}
                    <div className="w-32 h-1 bg-brand-accent mx-auto mb-10 rounded-full"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {quotes.map((quote, idx) => (
                            <motion.div
                                key={idx}
                                className="relative bg-white rounded-2xl shadow-lg p-6 text-center border border-brand-subtle-hover"
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                whileHover="hover"
                                viewport={{ once: true }}
                            >
                                <div 
                                    // ❌ RTL Fix: left-1/2 -> start-1/2
                                    className="absolute -top-5 start-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-brand-accent text-white text-3xl shadow">
                                    “
                                </div>
                                {/* ✅ text-brand-primary-text */}
                                <p className="mt-6 text-brand-primary-text">{quote.quote}</p>
                                {/* ✅ text-brand-accent */}
                                <p className="mt-4 text-sm text-brand-accent">— {quote.author}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <motion.button
                            // ✅ bg-brand-accent
                            className="px-6 py-3 bg-brand-accent text-white rounded-lg shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            // ⬅️ Use Next.js router for navigation
                            onClick={() => navigateTo("/quotes")}
                        >
                            تمام ملفوظات پڑھیں
                        </motion.button>
                    </div>
                </motion.section>

                {/* تازہ ترین آڈیو بیانات */}
                {/* ✅ bg-brand-subtle-hover/70 */}
                <motion.section
                    className="py-16 md:py-20 bg-brand-subtle-hover/70 rounded-2xl shadow-lg px-6 md:px-10 mt-10"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* ✅ text-brand-accent */}
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-accent mb-4">
                        تازہ ترین آڈیو بیانات
                    </h2>
                    {/* ✅ bg-brand-accent */}
                    <div className="w-28 h-1 bg-brand-accent mx-auto mb-10 rounded-full"></div>

                    {loading ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500">لوڈ ہو رہا ہے...</p>
                        </div>
                    ) : audios.length > 0 ? (
                        <div className="bg-white border border-brand-subtle-hover rounded-xl shadow overflow-hidden">
                            {audios.map((audio, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between p-5 border-b border-brand-subtle-hover last:border-none"
                                >
                                    <div className="text-right">
                                        <h3 className="text-lg font-semibold text-brand-accent">{audio.title}</h3>
                                        <p className="text-sm text-brand-primary-text">{audio.scholar}</p>
                                    </div>
                                    <p className="text-sm text-brand-primary-text">{audio.duration}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-500">کوئی آڈیو دستیاب نہیں</p>
                        </div>
                    )}

                    <div className="text-center mt-8">
                        <motion.button
                            className="px-6 py-3 bg-brand-accent text-white rounded-lg shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigateTo("/audiobayanaat")}
                        >
                            تمام آڈیو بیانات سنیں
                        </motion.button>
                    </div>
                </motion.section>

                {/* تازہ ترین حمد و نعت و کلام */}
                <motion.section
                    className="py-16 md:py-20"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* ✅ text-brand-accent */}
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-accent mb-4">
                        تازہ ترین حمد و نعت و کلام
                    </h2>
                    {/* ✅ bg-brand-accent */}
                    <div className="w-28 h-1 bg-brand-accent mx-auto mb-10 rounded-full"></div>

                    {loading ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500">لوڈ ہو رہا ہے...</p>
                        </div>
                    ) : bayanaat.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {bayanaat.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    className="bg-white rounded-2xl shadow-lg p-6 border border-brand-subtle-hover"
                                    variants={cardVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    whileHover="hover"
                                    viewport={{ once: true }}
                                >
                                    <h3 className="text-lg font-semibold text-brand-accent mb-2">{item.title}</h3>
                                    <p className="text-sm text-brand-primary-text mb-3">مقرر: {item.scholar}</p>
                                    <p className="text-xs text-gray-500">مدت: {item.duration}</p>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-500">کوئی حمد و نعت دستیاب نہیں</p>
                        </div>
                    )}

                    <div className="text-center mt-10">
                        <motion.button
                            className="px-6 py-3 bg-brand-accent text-white rounded-lg shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigateTo("/hamdonaat")}
                        >
                            تمام حمد و نعت و کلام سنیں
                        </motion.button>
                    </div>
                </motion.section>

                {/* تازہ ترین اصلاحی مجالس */}
                <motion.section
                    className="py-16 md:py-20 bg-brand-subtle-hover/70 rounded-2xl shadow-lg px-6 md:px-10 mt-10"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-accent mb-4">
                        تازہ ترین اصلاحی مجالس
                    </h2>
                    <div className="w-28 h-1 bg-brand-accent mx-auto mb-10 rounded-full"></div>

                    {loading ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500">لوڈ ہو رہا ہے...</p>
                        </div>
                    ) : majalis.length > 0 ? (
                        <div className="bg-white border border-brand-subtle-hover rounded-xl shadow overflow-hidden">
                            {majalis.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between p-5 border-b border-brand-subtle-hover last:border-none"
                                >
                                    <div className="text-right">
                                        <h3 className="text-lg font-semibold text-brand-accent">{item.title}</h3>
                                        <p className="text-sm text-brand-primary-text">{item.scholar}</p>
                                    </div>
                                    <p className="text-sm text-brand-primary-text">{item.duration}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-500">کوئی اصلاحی مجلس دستیاب نہیں</p>
                        </div>
                    )}

                    <div className="text-center mt-8">
                        <motion.button
                            className="px-6 py-3 bg-brand-accent text-white rounded-lg shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigateTo("/islahi-majalis")}
                        >
                            تمام اصلاحی مجالس سنیں
                        </motion.button>
                    </div>
                </motion.section>

                {/* اہم موضوعات */}
                <motion.section
                    className="py-16 md:py-20"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* ✅ text-brand-accent */}
                    <h2 className="text-3xl font-bold text-center text-brand-accent mb-4">
                        اہم موضوعات
                    </h2>
                    {/* ✅ bg-brand-accent */}
                    <div className="w-32 h-1 bg-brand-accent mx-auto mb-10 rounded-full"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                // ✅ border-brand-subtle-hover
                                className="relative flex items-center bg-white border border-brand-subtle-hover shadow-md rounded-xl p-6 group cursor-pointer"
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                whileHover="hover"
                                viewport={{ once: true }}
                                onClick={() => f.route && navigateTo(f.route)}
                            >
                                {/* ❌ RTL Fix: left-0 -> start-0, rounded-r-full -> rounded-l-full */}
                                <motion.div
                                    className="absolute start-0 top-0 bottom-0 w-0 h-full rounded-l-full bg-brand-accent/70"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "200%" }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                />
                                <div className="relative z-10 flex items-center">
                                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-brand-subtle-hover text-3xl text-brand-accent shadow">
                                        {f.icon}
                                    </div>
                                    {/* ❌ RTL Fix: mr-4 -> ms-4 (margin-start) */}
                                    <div className="ms-4 text-right flex-1">
                                        {/* ✅ text-brand-accent */}
                                        <h3 className="text-lg font-semibold text-brand-accent">{f.title}</h3>
                                        {/* ✅ text-brand-primary-text */}
                                        <p className="text-sm text-brand-primary-text mt-1">{f.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </div>
        </div>
    );
}