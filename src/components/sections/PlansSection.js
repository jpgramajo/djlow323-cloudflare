'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Music, Clock, Star, Zap, Crown, Sparkles, Check, ArrowRight } from 'lucide-react';

const PlansSection = ({ sectionRef }) => {
  const router = useRouter();
  
  const packages = [
    {
      name: "ESSENTIAL",
      subtitle: "Perfect for intimate gatherings",
      duration: "3 Hours",
      icon: Music,
      gradient: "from-blue-400/20 to-cyan-400/20",
      borderColor: "border-blue-400/30",
      hoverGradient: "from-blue-400/10 to-cyan-400/10",
      features: [
        "Professional DJ Setup",
        "Curated Music Library",
        "Basic Ambient Lighting",
        "Wireless Microphone",
        "Complete Setup & Breakdown"
      ]
    },
    {
      name: "PREMIUM",
      subtitle: "Most popular choice",
      duration: "5 Hours",
      icon: Star,
      gradient: "from-orange-400/20 to-amber-400/20",
      borderColor: "border-orange-400/30",
      hoverGradient: "from-orange-400/10 to-amber-400/10",
      features: [
        "Everything in Essential",
        "Enhanced Audio System",
        "Dynamic LED Lighting",
        "Atmospheric Effects",
        "Live Music Requests",
        "Interactive Photo Props"
      ],
      popular: true
    },
    {
      name: "ELITE",
      subtitle: "Ultimate experience",
      duration: "8 Hours",
      icon: Crown,
      gradient: "from-violet-400/20 to-purple-400/20",
      borderColor: "border-violet-400/30",
      hoverGradient: "from-violet-400/10 to-purple-400/10",
      features: [
        "Everything in Premium",
        "Live Mixing Performance",
        "Professional MC Services",
        "Custom Event Coordination",
        "Social Media Integration"
      ]
    }
  ];

  return (
    <section
      ref={sectionRef}
      data-section="PLANS"
      className="relative min-h-screen bg-slate-950 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/6 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-orange-400/25 to-amber-400/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/6 w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 backdrop-blur-[50px] sm:backdrop-blur-[100px] bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.02]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px] lg:bg-[size:80px_80px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20 lg:mb-24"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6 sm:mb-8"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/[0.08] backdrop-blur-md rounded-2xl border border-white/10 hover:border-orange-400/30 transition-all duration-300">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                <span className="text-xs sm:text-sm font-semibold text-white/90 tracking-wider">PACKAGES</span>
              </div>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-6 sm:mb-8 tracking-tight leading-none"
          >
            Choose Your
            <span className="block font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Experience
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg lg:text-xl text-white/60 max-w-xl lg:max-w-2xl mx-auto leading-relaxed font-light"
          >
            Tailored packages designed to match your event's unique needs and create unforgettable moments.
          </motion.p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              className={`group relative ${pkg.popular ? 'lg:scale-105' : ''}`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-amber-400/30 rounded-full blur-lg"></div>
                    <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-white/[0.12] backdrop-blur-md rounded-full border border-orange-400/30 text-white text-sm font-bold">
                      <Sparkles className="w-4 h-4 text-orange-400" />
                      <span className="text-white/90">MOST POPULAR</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Card */}
              <div className="relative h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${pkg.hoverGradient} rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500`}></div>
                <div className={`relative h-full bg-white/[0.06] backdrop-blur-xl rounded-2xl sm:rounded-3xl border ${pkg.popular ? 'border-orange-400/20' : 'border-white/10'} p-6 sm:p-8 hover:border-white/20 transition-all duration-500 overflow-hidden`}>
                  {/* Glass Reflections */}
                  <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/[0.1] to-transparent rounded-t-2xl sm:rounded-t-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-white/[0.05] to-transparent rounded-br-2xl sm:rounded-br-3xl"></div>
                  
                  {/* Header: Icon + Name + Subtitle + Duration */}
                  <div className="flex items-start mb-6 sm:mb-8 gap-4">
                    <div className={`relative inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/[0.08] backdrop-blur-md rounded-xl sm:rounded-2xl border ${pkg.borderColor} group-hover/icon:scale-110 transition-all duration-300`}>
                      <pkg.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-1 group-hover:text-orange-400 transition-colors duration-300">{pkg.name}</h3>
                      <p className="text-white/60 text-sm sm:text-base font-light">{pkg.subtitle}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="group/feature flex items-center gap-3"
                      >
                        <div className="relative flex-shrink-0">
                          <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-md opacity-0 group-hover/feature:opacity-100 transition-all duration-300"></div>
                          <div className="relative w-6 h-6 bg-white/[0.08] backdrop-blur-md rounded-full border border-orange-400/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-orange-400" />
                          </div>
                        </div>
                        <span className="text-white/70 text-sm leading-relaxed font-light group-hover/feature:text-white/90 transition-colors duration-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.button
                    onClick={() => router.push('/quote?mode=form')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group/btn relative w-full overflow-hidden rounded-xl sm:rounded-2xl"
                  >
                    <div className={`absolute inset-0 ${
                      pkg.popular 
                        ? 'bg-gradient-to-r from-orange-400 to-amber-400' 
                        : 'bg-white/[0.08] border border-white/20'
                    } transition-all duration-300`}></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.2] via-transparent to-black/[0.1] opacity-50"></div>
                    <div className={`relative flex items-center justify-center gap-2 py-3 sm:py-4 font-semibold transition-all duration-300 ${
                      pkg.popular ? 'text-white' : 'text-white/90 hover:text-white'
                    }`}>
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 sm:mt-20 lg:mt-24"
        >
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/[0.08] backdrop-blur-md rounded-full border border-white/20 hover:border-orange-400/30 transition-all duration-300">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
              <span className="text-sm sm:text-base text-white/80 font-light">All packages include professional consultation and custom music curation</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlansSection;
