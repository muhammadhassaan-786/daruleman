"use client";

import { Phone, Clock, User } from "lucide-react";

const halqaatData = [
  {
    country: "پاکستان",
    cities: [
      {
        name: "اسلام آباد",
        halqaat: [
          {
            id: 1,
            name: "Halqa-01",
            area: "G-10",
            markaz: "Markaz Islamabad",
            ameer: "مولانا احمد",
            contact: "0300-1234567",
            location: "G-10 مرکزی مسجد",
            hours: "روزانہ: بعد نماز عصر",
          },
          {
            id: 2,
            name: "Halqa-02",
            area: "F-8",
            markaz: "Markaz Islamabad",
            ameer: "مولانا زبیر",
            contact: "0301-2345678",
            location: "F-8 جامع مسجد",
            hours: "جمعرات: بعد نماز عشاء",
          },
        ],
      },
      {
        name: "لاہور",
        halqaat: [
          {
            id: 3,
            name: "Halqa-03",
            area: "Model Town",
            markaz: "Markaz Lahore",
            ameer: "مولانا قاسم",
            contact: "0302-3456789",
            location: "Model Town B مسجد",
            hours: "اتوار: 10am - 1pm",
          },
          {
            id: 4,
            name: "Halqa-04",
            area: "Iqbal Town",
            markaz: "Markaz Lahore",
            ameer: "مولانا سلیم",
            contact: "0303-4567890",
            location: "Iqbal Town مرکزی مسجد",
            hours: "جمعہ: بعد نماز مغرب",
          },
        ],
      },
    ],
  },
];

export default function Halqaat() {
  return (
    <section className="bg-brand-light-bg py-16 px-6">
      {/* ✅ Section Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold text-brand-primary-text">
          تمام حلقات
        </h2>
        <div className="mt-3 w-24 h-1 bg-brand-accent rounded mx-auto"></div>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          ہمارے حلقات مختلف شہروں میں قرآن و سنت کے علم کے فروغ کے لیے منعقد کیے جاتے ہیں۔
        </p>
      </div>

      {/* ✅ Content */}
      {halqaatData.map((country) => (
        <div
          key={country.country}
          className="space-y-12 max-w-6xl mx-auto text-right"
        >
          {/* Country Name */}
          <h3 className="text-2xl md:text-3xl font-bold text-center text-brand-primary-text">
            {country.country}
          </h3>

          {country.cities.map((city) => (
            <div key={city.name} className="space-y-8">
              {/* City Heading */}
              <h4 className="text-xl md:text-2xl font-semibold text-brand-accent border-b-2 border-brand-subtle-hover pb-2">
                {city.name}
              </h4>

              {/* Halqa Cards */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {city.halqaat.map((h) => (
                  <div
                    key={h.id}
                    className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all p-5 space-y-3 hover:-translate-y-1 duration-300"
                  >
                    <h5 className="font-bold text-lg text-brand-accent">
                      {h.area}{" "}
                      <span className="text-gray-500">({h.name})</span>
                    </h5>
                    <p className="text-sm text-gray-600">{h.markaz}</p>

                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-brand-accent" />
                        <span>
                          <span className="font-semibold">امیر:</span> {h.ameer}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-brand-accent" />
                        <span>{h.contact}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-brand-accent" />
                        <span>{h.hours}</span>
                      </div>
                      <p className="text-gray-600">
                        <span className="font-semibold">مقام:</span>{" "}
                        {h.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}