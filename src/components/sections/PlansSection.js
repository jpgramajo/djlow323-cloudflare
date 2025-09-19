'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const PlansSection = ({ sectionRef }) => {
  const router = useRouter();

  const packages = [
    {
      name: "BASIC",
      price: "$299",
      duration: "3 Hours",
      features: [
        "Professional DJ Setup",
        "Music Library Access",
        "Basic Lighting",
        "Microphone for Announcements",
        "Setup & Breakdown"
      ]
    },
    {
      name: "PREMIUM",
      price: "$499",
      duration: "5 Hours",
      features: [
        "Everything in Basic",
        "Enhanced Sound System",
        "LED Party Lights",
        "Fog Machine",
        "Custom Music Requests",
        "Photo Booth Props"
      ],
      popular: true
    },
    {
      name: "ELITE",
      price: "$799",
      duration: "8 Hours",
      features: [
        "Everything in Premium",
        "Live Mixing Performance",
        "Professional MC Services",
        "Custom Event Planning",
        "Social Media Live Streaming"
      ]
    }
  ];

  return (
    <section
      ref={sectionRef}
      data-section="PLANS"
      className="min-h-screen bg-black py-20 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center text-[#fe9511] mb-16"
            style={{ fontFamily: 'Archivo Black, sans-serif' }}>
          PLANS
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative bg-[#1a1a1a] border-2 rounded-lg p-8 ${
                pkg.popular ? 'border-[#fe9511] scale-105' : 'border-[#b2a9aa]/20'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#fe9511] text-black px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold text-[#fe9511] mb-2" style={{ fontFamily: 'Syncopate, sans-serif' }}>
                {pkg.name}
              </h3>
              <p className="text-[#b2a9aa] mb-6">{pkg.duration}</p>
              <ul className="space-y-3">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="text-[#b2a9aa] flex items-start">
                    <span className="text-[#fe9511] mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => router.push('/quote?mode=form')}
                className="w-full bg-[#fe9511] text-black py-3 rounded font-bold mt-6 hover:bg-[#fe9511]/90 transition-colors"
                style={{ fontFamily: 'Archivo Black, sans-serif' }}
              >
                GET A QUOTE
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default PlansSection;