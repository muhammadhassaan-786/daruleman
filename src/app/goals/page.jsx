'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, BookOpen, Users } from 'lucide-react';

const objectivesData = [
  {
    id: 1,
    title: 'تزکیہ نفس',
    subtitle: 'Self-Purification',
    icon: Heart,
    color: 'from-rose-500 to-pink-500',
    description: 'تقویٰ، طہارت، اللہ تعالیٰ کے ساتھ شدید محبت، اس کی عظمت و معرفت اور خشیت کے اعلیٰ درجات اور زندگی کے ہر گوشے میں احسانی کیفیت حاصل کرنے کے لیے مسلسل محنت و کوشش کرنا۔ اور اپنے گردوپیش کو بھی اصلاح و تربیت اور ایمانی اوصاف و کمالات سے آراستہ ہونے کی جانب توجہ دلانا اور اس کے لیے عملی اقدامات کرنا۔',
  },
  {
    id: 2,
    title: 'پُورے دین پر عمل',
    subtitle: 'Full Implementation of Religion',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
    description: 'عقائد و ایمانیات سے لے کر عبادات، معاملات، معاشرت، حسنِ اخلاق اور حقوق و آداب تک پُورے کے پُورے دین پر خود عمل کرنا۔ دنیا کے سامنے دین اپنی کامل و مکمل اور صحیح سالم شکل میں پیش کرنا۔ دوسرے مسلمانوں کو بھی پُورے دین پر عمل پیرا ہونے کی ترغیب دینا، انہیں اس کی اہمیت و فوائل بتانا اور ناقص دین پر عمل کرنے کے نقصانات اور تباہ کن نتائج سے آگاہ کرنا۔',
  },
  {
    id: 3,
    title: 'اتحادِ اُمت',
    subtitle: 'Unity of the Ummah',
    icon: Users,
    color: 'from-amber-500 to-orange-500',
    description: 'اُمت کے بکھرے ہوئے شیرازے کو دوبارہ یکجا کرنے میں اپنی پوری قوت صرف کرنا۔ بنیادی عقائد، نظریات اور فروعی اجتہادی مسائل میں سے ہر ایک کو اپنے اپنے مرتبے اور مقام پر رکھنا۔ اپنی رائے پر بے جا اصرار کرنے، اور غیر متوازن مزاج کو اعتدال پر لانے کی کوشش کرنا۔ مختلف دینی سرگرمیوں اور شعبوں میں مشغول افراد کے درمیان پھیلے ہوئے تقابل و تفاخر کی زہریلی نفسیات اور اس کے نتیجے میں پیدا شدہ بعد کو باہمی تعاون و تناصر اور مؤاخاۃ و مواساۃ میں بدلنا۔',
  },
];

export default function Goals() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    hover: { scale: 1.02, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' },
  };

  return (
    <div className="min-h-screen bg-brand-light-bg py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-brand-primary-text mb-4">
            مقاصد
          </h1>
          <div className="w-32 h-1 bg-brand-accent rounded-full mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-brand-accent font-medium">
            اس ہدف کے حصول کے لیے یہ تحریک تین مقاصد پر کام کرتی ہے
          </p>
        </motion.div>

        {/* Objectives Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {objectivesData.map((objective, idx) => {
            const Icon = objective.icon;
            return (
              <motion.div
                key={objective.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: idx * 0.2 }}
                whileHover="hover"
                className="group"
              >
                <div className="h-full bg-white rounded-2xl shadow-lg border border-brand-subtle-hover overflow-hidden">
                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-r ${objective.color} p-8 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-4xl font-bold opacity-20">{objective.id}</div>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">{objective.title}</h2>
                    <p className="text-sm text-white/80">{objective.subtitle}</p>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <p className="text-brand-primary-text leading-relaxed text-justify">
                      {objective.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Decorative Bottom Section */}
        <motion.div
          className="mt-16 text-center"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="inline-block px-8 py-4 bg-white rounded-full shadow-lg border border-brand-subtle-hover">
            <p className="text-brand-accent font-medium">
              ہر مقصد دار الایمان والتقویٰ کے کام کا لازمی حصہ ہے
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}