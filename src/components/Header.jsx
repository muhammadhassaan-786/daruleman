"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Search, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const logoPath = "/assets/logo.avif";
const TEXT_PRIMARY = "text-brand-primary-text";
const TEXT_ACCENT = "text-brand-accent";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      title: "تعارف",
      path: "/introduction",
      sub: [
        { title: "تاریخ", path: "/history" },
        { title: "مقاصد", path: "/goals" },
        { title: "مراکز", path: "/campuses" },
        { title: "چشتیہ تاریخ", path: "/chishthistory" },
      ],
    },
    {
      title: "نشر و اشاعت",
      path: "/publication",
      sub: [
        { title: "آڈیو بیانات", path: "/audiobayanaat" },
        { title: "ویڈیو بیانات", path: "/videobayanaat" },
        { title: "حمد و نعت و کلام", path: "/hamdonaat" },
        { title: "تحریری اشعار", path: "/poetry" },
        { title: "ملفوظات", path: "/quotes" },
        { title: "کتابیں", path: "/books" },
      ],
    },
    {
      title: "تعلیم",
      path: "/education",
      sub: [
        { title: "درسِ نظامی", path: "/darse-nizami" },
        { title: "حفظِ قرآن", path: "/hifz-quran" },
        { title: "تجوید و قراءت", path: "/tajweed-qiraat" },
        { title: "داخلے", path: "/admissions" },
      ],
    },
    {
      title: "رابطہ",
      path: "/contact",
      sub: [
        { title: "حلقات", path: "/halqaat" },
        { title: "آپ کا حلقہ", path: "/your-halqa" },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => setOpenMenu(null);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  return (
    <header className="bg-brand-light-bg shadow-md border-b border-brand-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <motion.div
            className="h-12 w-12 rounded-full shadow-lg border-2 border-brand-subtle-hover relative"
            whileHover={{ rotate: 6, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={logoPath}
              alt="دار الایمان والتقویٰ لوگو"
              fill
              style={{ objectFit: "cover", borderRadius: "50%" }}
              priority
            />
          </motion.div>
          <h1 className={`text-lg sm:text-xl font-extrabold ${TEXT_PRIMARY} tracking-wide`}>
            دار الایمان والتقویٰ
          </h1>
        </Link>

        <nav
          className={`hidden md:flex items-center gap-8 text-md font-semibold ${TEXT_ACCENT}`}
          onMouseLeave={() => setOpenMenu(null)}
        >
          {navItems.map((item, i) => (
            <div key={i} className="relative inline-block" onMouseEnter={() => setOpenMenu(i)}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-1 hover:${TEXT_PRIMARY} transition-colors`}
                >
                  {item.title}
                  {item.sub && <ChevronDown size={16} />}
                </Link>
              </motion.div>

              {item.sub && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={openMenu === i ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className={`absolute top-full right-0 mt-3 bg-white shadow-xl rounded-2xl py-2 w-48 border border-brand-border z-50 ${
                    openMenu === i ? "pointer-events-auto" : "pointer-events-none"
                  }`}
                >
                  {item.sub.map((subItem, j) => (
                    <Link
                      key={j}
                      href={subItem.path}
                      className={`block px-4 py-2 rounded-lg hover:bg-brand-subtle-hover hover:${TEXT_PRIMARY} transition-colors`}
                      onClick={() => setOpenMenu(null)}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}

          <div className="relative ml-4">
            <input
              type="text"
              placeholder="تلاش کریں..."
              className="pl-3 pr-10 py-1.5 rounded-full border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm bg-white shadow-sm"
            />
            <Search
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${TEXT_ACCENT} w-4 h-4`}
            />
          </div>
        </nav>

        <button className={`md:hidden ${TEXT_ACCENT}`} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t border-brand-border shadow-inner"
        >
          <div className={`flex flex-col px-6 py-4 space-y-2 ${TEXT_ACCENT} text-right`}>
            {navItems.map((item, i) => (
              <div key={i} className="flex flex-col">
                <button
                  onClick={() => setOpenMenu(openMenu === i ? null : i)}
                  className={`flex justify-between items-center py-2 font-semibold hover:${TEXT_PRIMARY} transition-colors`}
                >
                  {item.title}
                  {item.sub && <ChevronDown size={16} />}
                </button>

                {item.sub && openMenu === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col pr-4 space-y-2 text-sm text-brand-accent border-r border-dotted border-brand-border"
                  >
                    {item.sub.map((subItem, j) => (
                      <Link
                        key={j}
                        href={subItem.path}
                        className={`py-1 hover:${TEXT_PRIMARY} transition-colors`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}

            <div className="relative pt-4">
              <input
                type="text"
                placeholder="تلاش کریں..."
                className="w-full pl-3 pr-10 py-2 rounded-full border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm bg-white shadow-sm"
              />
              <Search
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 mt-2 ${TEXT_ACCENT} w-4 h-4`}
              />
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
