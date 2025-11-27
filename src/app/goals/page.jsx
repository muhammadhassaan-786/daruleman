'use client';

import React, { useState } from 'react';
import { ChevronRight, Heart, Leaf, Sparkles } from 'lucide-react';

const maqasidData = [
  {
    id: 'ethics',
    icon: Heart,
    title: 'اخلاقی اقدار',
    subtitle: 'اسلامی اخلاق اور کردار سازی کو معاشرتی زندگی میں رائج کرنا',
    items: [
      { title: 'ایمانداری', desc: 'ہر معاملے میں سچائی اور دیانت کو بنیاد بنانا۔ زندگی کے ہر شعبے میں امانت اور شفافیت کو عام کرنا۔' },
      { title: 'احترام والدین', desc: 'بزرگوں کی قدر اور والدین کے ساتھ حسنِ سلوک کو فروغ دینا۔' },
      { title: 'شکریہ', desc: 'نِعمتوں کا شکر ادا کرنا اور شکرگزاری کو عادت بنانا۔' },
      { title: 'بردباری', desc: 'مشکلات میں صبر اور تنازعہ میں تحمل اپنانا۔' },
      { title: 'عدل', desc: 'سماجی اور مالی معاملات میں انصاف کو یقینی بنانا۔' },
      { title: 'عفو و درگزر', desc: 'غلطیوں کو معاف کرنے اور مفاہمت کو ترجیح دینے کی روح کو فروغ دینا۔' },
      { title: 'محبتِ خیر', desc: 'مسرت، تعاون اور سچائی کے ذریعے معاشرے میں محبت اور بھلائی پھیلانا۔' },
    ],
  },
  {
    id: 'sustenance',
    icon: Leaf,
    title: 'فلاح و بہبود',
    subtitle: 'معاشی اور سماجی ترقیات کے ذریعے فلاح عام کرنا',
    items: [
      { title: 'روزگار', desc: 'مستحکم روزگار کے مواقع پیدا کرنا تاکہ لوگ خود کفیل بن سکیں۔' },
      { title: 'حفظِ صحت', desc: 'بنیادی طبی سہولیات اور صحت مندانہ رویوں کی فراہمی۔' },
      { title: 'تعلیم', desc: 'معیاری تعلیم تک مساوی رسائی کو یقینی بنانا۔' },
      { title: 'حفاظت', desc: 'معاشرتی تحفظ اور کمزور طبقوں کی حفاظت کو فروغ دینا۔' },
      { title: 'خوراک اور پانی', desc: 'بنیادی خوراک اور صاف پانی تک یقینی رسائی۔' },
      { title: 'رہائش', desc: 'محفوظ اور معقول رہائش کے انتظامات۔' },
      { title: 'خاندانی بہبود', desc: 'خاندانوں کے استحکام اور حفاظت کو فروغ دینا۔' },
    ],
  },
  {
    id: 'spiritual',
    icon: Sparkles,
    title: 'روحانیت',
    subtitle: 'روحانی ترقی، اخلاقی بصیرت اور زندگی کے معنوی پہلوؤں کی اہمیت',
    items: [
      { title: 'ذکر و فکر', desc: 'اللہ کے ساتھ تعلق مضبوط کرنے کے لئے ذِکر اور مراقبہ کی سرگرمیاں۔' },
      { title: 'شعورِ اخلاق', desc: 'باطنی شعور اور اخلاقی اصلاح کے ذریعے شخصیت کی تزکیہ۔' },
      { title: 'خدمت', desc: 'خیرخواہی اور دوسروں کی خدمت کو عبادت کا درجہ دینا۔' },
      { title: 'اعتدال', desc: 'روحانی اور دنیاوی زندگی میں توازن کو فروغ دینا۔' },
      { title: 'ہدایت', desc: 'صحیح راہنمائی اور مشاورت کے ذریعے لوگوں کو سہارا دینا۔' },
      { title: 'شکرگزاریِ قلب', desc: 'دل کی شکرگزاری اور سکون کے لیے روحانی مشقیں۔' },
      { title: 'اخلاص', desc: 'ہر عمل میں نیت کی صفائی اور اخلاص کو مرکزی حیثیت دینا۔' },
    ],
  },
];

export default function Maqasid() {
  const [activeTab, setActiveTab] = useState(maqasidData[0].id);

  // Mapped brand classes for simplicity and readability
  const BRAND_ACCENT = 'text-brand-accent';
  const BRAND_BG = 'bg-brand-accent';
  const BRAND_PRIMARY_TEXT = 'text-brand-primary-text';
  const SUBTLE_HOVER = 'bg-brand-subtle-hover';

  return (
    <>
      {/* ✅ Base background set to light beige brand color */}
      <div className="min-h-screen bg-brand-light-bg py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Title */}
          <div className="text-center mb-16">
            {/* ✅ Title text uses primary dark text color */}
            <h1 className={`text-5xl md:text-7xl font-bold ${BRAND_PRIMARY_TEXT} mb-4`}> 
              مقاصد
            </h1>
            {/* ✅ Subtitle uses brand accent color */}
            <p className={`text-xl ${BRAND_ACCENT} font-medium`}>تین ستونِ حیات — ہر ایک میں سات نورانی نکات</p>
          </div>

          {/* Main Objectives Section */}
          <div className="mb-16 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 lg:p-12 border border-brand-border">
            <h2 className={`text-4xl font-bold ${BRAND_PRIMARY_TEXT} mb-4 text-center`}>
              اس ہدف کے حصول کے لیے یہ تحریک تین مقاصد پر کام کرتی ہے:
            </h2>
            <div className="w-32 h-1 bg-brand-accent rounded mx-auto mb-10"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Objective 1 */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-subtle-hover/30 to-white p-8 border border-brand-subtle-hover hover:border-brand-accent transition-all duration-300 hover:shadow-xl">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-subtle-hover/50 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative">
                  <div className={`flex items-center gap-3 mb-4`}>
                    <div className={`flex-shrink-0 w-12 h-12 ${BRAND_BG} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      ۱
                    </div>
                    <h3 className={`text-2xl font-bold ${BRAND_PRIMARY_TEXT}`}>تزکیہ نفس</h3>
                  </div>
                  <p className={`${BRAND_ACCENT} leading-relaxed text-justify`}>
                    تقویٰ، طہارت، اللہ تعالیٰ کے ساتھ شدید محبت، اس کی عظمت و معرفت اور خشیت کے اعلیٰ درجات اور زندگی کے ہر گوشے میں احسانی کیفیت حاصل کرنے کے لیے مسلسل محنت و کوشش کرنا۔ اور اپنے گردوپیش کو بھی اصلاح و تربیت اور ایمانی اوصاف و کمالات سے آراستہ ہونے کی جانب توجہ دلانا اور اس کے لیے عملی اقدامات کرنا۔
                  </p>
                </div>
              </div>

              {/* Objective 2 */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-subtle-hover/30 to-white p-8 border border-brand-subtle-hover hover:border-brand-accent transition-all duration-300 hover:shadow-xl">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-subtle-hover/50 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative">
                  <div className={`flex items-center gap-3 mb-4`}>
                    <div className={`flex-shrink-0 w-12 h-12 ${BRAND_BG} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      ۲
                    </div>
                    <h3 className={`text-2xl font-bold ${BRAND_PRIMARY_TEXT}`}>پُورے دین پر عمل</h3>
                  </div>
                  <p className={`${BRAND_ACCENT} leading-relaxed text-justify`}>
                    عقائد و ایمانیات سے لے کر عبادات، معاملات، معاشرت، حسنِ اخلاق اور حقوق و آداب تک پُورے کے پُورے دین پر خود عمل کرنا۔ دنیا کے سامنے دین اپنی کامل و مکمل اور صحیح سالم شکل میں پیش کرنا۔ دوسرے مسلمانوں کو بھی پُورے دین پر عمل پیرا ہونے کی ترغیب دینا اور ناقص دین پر عمل کرنے کے نقصانات سے آگاہ کرنا۔
                  </p>
                </div>
              </div>

              {/* Objective 3 */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-subtle-hover/30 to-white p-8 border border-brand-subtle-hover hover:border-brand-accent transition-all duration-300 hover:shadow-xl">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-subtle-hover/50 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative">
                  <div className={`flex items-center gap-3 mb-4`}>
                    <div className={`flex-shrink-0 w-12 h-12 ${BRAND_BG} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      ۳
                    </div>
                    <h3 className={`text-2xl font-bold ${BRAND_PRIMARY_TEXT}`}>اتحادِ اُمت</h3>
                  </div>
                  <p className={`${BRAND_ACCENT} leading-relaxed text-justify`}>
                    اُمت کے بکھرے ہوئے شیرازے کو دوبارہ یکجا کرنے میں اپنی پوری قوت صرف کرنا۔ بنیادی عقائد اور فروعی مسائل کو ہر ایک کے مرتبے پر رکھنا۔ مختلف دینی سرگرمیوں میں مشغول افراد کے درمیان تقابل و تفاخر کو باہمی تعاون و تناصر میں بدلنا۔
                  </p>
                </div>
              </div>
            </div>
          </div>
            {/* Tab Navigation */}
            <div className="space-y-4 lg:col-span-1">
              {maqasidData.map((section) => {
                const Icon = section.icon;
                const isActive = activeTab === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full text-right p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 
                      ${
                        isActive
                          ? `${BRAND_BG} text-white shadow-2xl`
                          : `bg-white/80 backdrop-blur-sm ${SUBTLE_HOVER} shadow-lg`
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className={`text-2xl font-bold ${isActive ? 'text-white' : BRAND_PRIMARY_TEXT}`}>
                          {section.title}
                        </h3>
                        {/* ❌ Adjusted text to use brand subtle color when inactive */}
                        <p className={`mt-2 text-sm ${isActive ? 'text-brand-subtle-hover' : BRAND_ACCENT}`}>
                          {section.subtitle}
                        </p>
                      </div>
                      <div className={`p-3 rounded-full ${isActive ? 'bg-white/20' : SUBTLE_HOVER}`}>
                        <Icon className={`w-8 h-8 ${isActive ? 'text-white' : BRAND_ACCENT}`} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Content Area */}
            <div className="lg:col-span-2">
              {maqasidData.map((section) => {
                const isActive = activeTab === section.id;
                return (
                  <div
                    key={section.id}
                    className={`transition-all duration-500 ${isActive ? 'block' : 'hidden'}`}
                  >
                    {/* ✅ Added border-brand-border */}
                    <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 lg:p-12 border border-brand-border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section.items.map((item, idx) => (
                          <div
                            key={idx}
                            // ✅ Border/background uses brand subtle hover color
                            className="group relative overflow-hidden rounded-2xl bg-white p-6 border border-brand-subtle-hover hover:border-brand-accent transition-all duration-300 hover:shadow-xl"
                          >
                            {/* Decorative element uses subtle brand hover color */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-subtle-hover/50 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                            
                            <div className="relative flex items-start gap-4">
                              {/* Icon/Number */}
                              {/* ✅ Uses BRAND_BG for number background */}
                              <div className={`flex-shrink-0 w-12 h-12 ${BRAND_BG} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                {idx + 1}
                              </div>
                              
                              <div className="flex-1 text-right">
                                {/* ✅ Title uses primary dark text */}
                                <h4 className={`text-xl font-bold ${BRAND_PRIMARY_TEXT} mb-2`}>{item.title}</h4>
                                {/* ✅ Description uses brand accent color */}
                                <p className={`${BRAND_ACCENT} leading-relaxed`}>{item.desc}</p>
                              </div>
                              
                              {/* ❌ RTL Fix: Arrow should be on the left/end */}
                              <ChevronRight className={`w-5 h-5 ${BRAND_ACCENT} opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center">
            <div className="flex gap-8">
              {maqasidData.map((section) => {
                const Icon = section.icon;
                const isActive = activeTab === section.id;
                return (
                  <div
                    key={section.id}
                    className={`p-4 rounded-full ${
                      isActive
                        ? `${BRAND_BG} text-white shadow-xl`
                        : `${SUBTLE_HOVER} text-brand-accent`
                    } transition-all duration-300`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
    </>
  );
}