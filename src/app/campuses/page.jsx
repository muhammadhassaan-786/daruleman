"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image"; // ⬅️ New: Import Next.js Image component
import {
    MapPin,
    Phone,
    ImageIcon,
    X,
    ExternalLink,
    Clock,
} from "lucide-react";

// ⚠️ Static asset imports replaced with direct paths from the /public folder
const bgPath = "/assets/bg.avif";
const bg3Path = "/assets/bg3.avif";
const placeholderCampusPath = "/assets/logo.avif";

const campuses = [
    {
        id: "islamabad",
        city: "اسلام آباد",
        region: "Sector F-8/4, Islamabad",
        contactName: "مولانا علی حسن",
        phone: "0300-9876543",
        coords: { lat: 33.6844, lng: 73.0479 },
        // Using string paths for images
        images: [bg3Path, bgPath],
        hours: "روزانہ: 9am - 9pm",
        blurb:
            "تحریک ایمان و تقویٰ کا اسلام آباد مرکز، تعلیمی و روحانی تربیت کے لیے جدید سہولیات کے ساتھ۔",
    },
    {
        id: "lahore",
        city: "لاہور",
        region: "جوہر ٹاؤن، لاہور",
        contactName: "حاجی محمد ادریس",
        phone: "0321-1122334",
        coords: { lat: 31.5204, lng: 74.3587 },
        images: [bgPath, bg3Path],
        hours: "پیر تا جمعہ: 10am - 6pm",
        blurb:
            "لاہور مرکز میں روحانی نشستیں، درس نظامی اور کمیونٹی پروگرامز کا انعقاد کیا جاتا ہے۔",
    },
    {
        id: "karachi",
        city: "کراچی",
        region: "گلشنِ اقبال، کراچی",
        contactName: "مفتی زید عباسی",
        phone: "0345-5678901",
        coords: { lat: 24.8607, lng: 67.0011 },
        images: [bgPath],
        hours: "روزانہ: 9am - 5pm",
        blurb:
            "کراچی مرکز میں تعلیمی کلاسز اور فلاحی خدمات جاری ہیں — مستحقین تک پہنچانے کے منصوبے فعال ہیں۔",
    },
    {
        id: "peshawar",
        city: "پشاور",
        region: "حلقہ نمبر 1، مین روڈ پشاور",
        contactName: "مولانا احمد خان",
        phone: "0333-1234567",
        coords: { lat: 34.0151, lng: 71.5249 },
        images: [bg3Path],
        hours: "ہفتہ: 10am - 4pm",
        blurb:
            "پشاور مرکز مقامی کمیونٹی کی تربیت اور خد مت کے لیے مخصوص پروگرامز چلاتا ہے۔",
    },
    {
        id: "kowand",
        city: "کونڈ",
        region: "شباز ٹاؤن، کونڈ",
        contactName: "مولانا بلال احمد",
        phone: "0312-3456789",
        coords: { lat: 34.4, lng: 71.6 },
        images: [bg3Path],
        hours: "معمول کے مطابق",
        blurb:
            "کونڈ کا مرکز وادی کے قریب واقع ہے اور یہاں روحانی تربیت اور جماعتی سرگرمیاں منعقد ہوتی ہیں۔",
    },
];

/* Google Maps iframe URL helper */
const googleMapsSrc = (lat, lng, zoom = 14) =>
    `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`; // ⬅️ Fixed URL template

// ❌ Removed all hardcoded color constants, using centralized Tailwind classes instead.
// Using native Tailwind classes text-gray-900, text-gray-600, etc.

const TEXT_PRIMARY = 'text-gray-900'; // Black/Near-Black for Headings
const TEXT_SECONDARY = 'text-gray-600'; // Dark Gray for Subtext
const TEXT_INFO = 'text-gray-500'; // Gray for Minor details


export default function Marakiz() {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(null);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });
    const dialogRef = useRef(null);

    const filtered = campuses.filter((c) => {
        const matchesQuery =
            !query ||
            [c.city, c.region, c.contactName, c.blurb]
                .join(" ")
                .toLowerCase()
                .includes(query.toLowerCase());
        return matchesQuery;
    });

    // close modal with Escape
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") setSelected(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // reset focus on modal open
    useEffect(() => {
        if (selected && dialogRef.current) dialogRef.current.focus();
    }, [selected]);

    // ⬅️ Fixed string interpolation
    const openDirections = (lat, lng) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(url, "_blank");
    };

    return (
        // ✅ Replaced bg-[${LIGHT_BEIGE}] with bg-brand-light-bg
        <div className="bg-brand-light-bg bg-none py-16 px-4 sm:px-6 lg:px-8">
            
            {/* Section header */}
            <div className="text-center mb-16">
                <h2 className={`text-3xl md:text-5xl font-extrabold ${TEXT_PRIMARY} pb-6`}> 
                    تحریک ایمان و تقویٰ
                </h2>
                <h3 className={`text-2xl md:text-3xl font-bold ${TEXT_PRIMARY} relative inline-block mt-4`}> 
                    ہمارے مراکز
                    {/* ⚠️ Still using MEDIUM_BROWN hex for the accent line. Should be added to tailwind.config.js for a clean fix. */}
                    <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#8A7B68] rounded-full`}></span> 
                </h3>
                <p className={`${TEXT_SECONDARY} mt-6 max-w-2xl mx-auto`}>
                    فعال مراکز کی تفصیل، رابطہ معلومات، اوقاتِ کار اور مقام۔
                </p>
            </div>

            {/* Grid of cards */}
            <main className="max-w-6xl mx-auto">
                <section ref={ref} 
                    className="grid gap-6 grid-cols-1 md:grid-cols-2"> 
                    {filtered.map((c, i) => (
                        <motion.article
                            key={c.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.07 }}
                            onClick={() => setSelected(c)}
                            whileHover={{ scale: 1.02 }}
                            // ✅ border-brand-subtle-hover
                            className={`relative bg-white rounded-2xl shadow-xl border border-brand-subtle-hover overflow-hidden 
                            cursor-pointer transform transition-all hover:shadow-2xl hover:-translate-y-1`}
                        >
                            {/* Side accent is solid Dark Brown */}
                            {/* ✅ bg-brand-accent/80 */}
                            <div className={`absolute inset-y-0 right-0 w-2 bg-brand-accent/80`} /> 

                            <div className="p-5 md:p-6 pl-8 md:pl-10">
                                <div className="flex flex-col sm:flex-row items-start gap-4"> 
                                    {/* Image placeholder uses light accent */}
                                    {/* ✅ bg-brand-subtle-hover */}
                                    <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-brand-subtle-hover flex-shrink-0 shadow-sm relative`}>
                                        <Image
                                            src={c.images?.[0] || placeholderCampusPath}
                                            alt={`${c.city} تصویر`}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            sizes="(max-width: 640px) 160px, 200px"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className={`text-xl font-bold ${TEXT_PRIMARY}`}>
                                            {c.city}
                                        </h3>
                                        <p className={`text-sm ${TEXT_SECONDARY} mt-1 truncate`}>{c.region}</p>

                                        <p className={`mt-3 text-gray-700 text-sm leading-6 line-clamp-3`}> 
                                            {c.blurb}
                                        </p>

                                        <div className="mt-4 flex flex-wrap items-center gap-3">
                                            
                                            {/* Button: View Details */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelected(c);
                                                }}
                                                // ✅ bg-brand-subtle-hover, border-brand-border, hover:bg-[#EAE5DB] (similar shade)
                                                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-subtle-hover border border-brand-border hover:bg-brand-subtle-hover/70 text-sm ${TEXT_PRIMARY}`}
                                            >
                                                <ImageIcon className={`w-4 h-4 ${TEXT_SECONDARY}`} />
                                                تفصیلات دیکھیں
                                            </button>

                                            {/* Button: Get Directions */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openDirections(c.coords.lat, c.coords.lng);
                                                }}
                                                // ✅ border-brand-border, hover:bg-brand-light-bg
                                                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-brand-border hover:bg-brand-light-bg text-sm ${TEXT_PRIMARY}`}
                                            >
                                                <ExternalLink className={`w-4 h-4 ${TEXT_SECONDARY}`} />
                                                راستہ پاؤ
                                            </button>

                                            {/* Button: Call */}
                                            <a
                                                href={`tel:${c.phone}`}
                                                onClick={(e) => e.stopPropagation()}
                                                // ✅ border-brand-border, hover:bg-brand-light-bg
                                                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-brand-border hover:bg-brand-light-bg text-sm ${TEXT_PRIMARY}`}
                                                aria-label={`فون کریں ${c.contactName}`}
                                            >
                                                <Phone className={`w-4 h-4 ${TEXT_SECONDARY}`} />
                                                {c.phone}
                                            </a>
                                            
                                            {/* Hours text */}
                                            <span className={`w-full mt-2 sm:w-auto sm:ml-auto text-xs ${TEXT_INFO} flex items-center gap-2`}>
                                                <Clock className={`w-4 h-4 text-gray-400`} />
                                                <span>{c.hours}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact info */}
                                <div className={`mt-5 text-xs ${TEXT_INFO}`}>
                                    رابطہ: {c.contactName}
                                </div>
                            </div>
                        </motion.article>
                    ))}

                    {filtered.length === 0 && (
                        <div className={`col-span-full py-20 text-center ${TEXT_SECONDARY}`}>
                            کوئی مرکز تلاش نہیں ہوا — تلاش کی اصطلاح تبدیل کریں یا تمام مراکز دیکھیں۔
                        </div>
                    )}
                </section>
            </main>

            {/* Modal/Dialog for Selected Campus */}
            {selected && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${selected.city} تفصیلات`}
                    tabIndex={-1}
                    ref={dialogRef}
                    className="fixed inset-0 z-50 flex justify-center p-0 md:p-4 items-stretch md:items-center"
                >
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelected(null)}
                    />

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="relative w-full h-full md:h-auto sm:max-w-4xl bg-white rounded-none md:rounded-2xl shadow-2xl flex flex-col overflow-hidden" 
                    >
                        {/* Header */}
                        {/* ✅ border-brand-subtle-hover */}
                        <div className={`flex items-center justify-between p-4 border-b border-brand-subtle-hover`}>
                            <div>
                                <h3 className={`text-xl font-bold ${TEXT_PRIMARY}`}>{selected.city}</h3>
                                <p className={`text-sm ${TEXT_SECONDARY}`}>{selected.region}</p>
                            </div>
                            <button
                                onClick={() => setSelected(null)}
                                aria-label="بند کریں"
                                // ✅ bg-brand-subtle-hover, hover:bg-brand-subtle-hover/70
                                className={`w-10 h-10 rounded-full bg-brand-subtle-hover hover:bg-brand-subtle-hover/70 flex items-center justify-center ${TEXT_SECONDARY}`} 
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Body (No Gallery) */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            
                            {/* Map */}
                            {/* ✅ border-brand-subtle-hover */}
                            <div className={`rounded-lg overflow-hidden h-56 sm:h-72 border border-brand-subtle-hover`}>
                                <iframe
                                    title={`${selected.city} map`}
                                    src={googleMapsSrc(selected.coords.lat, selected.coords.lng, 14)}
                                    className="w-full h-full border-0"
                                    loading="lazy"
                                />
                            </div>

                            {/* Info */}
                            <div className={`space-y-3 text-sm ${TEXT_PRIMARY}`}>
                                <div className="flex items-center gap-2">
                                    <MapPin className={`w-4 h-4 ${TEXT_SECONDARY} flex-shrink-0`} />
                                    <span className="break-words">{selected.region}</span> 
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className={`w-4 h-4 ${TEXT_SECONDARY} flex-shrink-0`} />
                                    <span>{selected.phone} ({selected.contactName})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className={`w-4 h-4 ${TEXT_SECONDARY} flex-shrink-0`} />
                                    <span>{selected.hours}</span>
                                </div>
                                <p className={`mt-3 leading-7 text-gray-700`}>{selected.blurb}</p>
                            </div>
                        </div>

                        {/* Fixed Footer (Mobile Friendly Actions) */}
                        {/* ✅ border-brand-subtle-hover */}
                        <div className={`p-4 border-t border-brand-subtle-hover flex gap-3 flex-wrap sm:flex-nowrap`}> 
                            <button
                                onClick={() =>
                                    openDirections(selected.coords.lat, selected.coords.lng)
                                }
                                // ✅ bg-brand-accent, hover:bg-brand-primary-text
                                className={`w-full sm:flex-1 px-4 py-3 rounded-lg bg-brand-accent text-white font-semibold hover:bg-brand-primary-text transition`} 
                            >
                                راستہ
                            </button>
                            <a
                                href={`tel:${selected.phone}`}
                                // ✅ border-brand-border, hover:bg-brand-light-bg
                                className={`w-full sm:flex-1 px-4 py-3 rounded-lg border border-brand-border text-center font-semibold ${TEXT_PRIMARY} hover:bg-brand-light-bg transition`} 
                            >
                                کال کریں
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}