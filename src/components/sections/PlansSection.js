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
      price: "$299",
      duration: "3 Hours",
      icon: Music,
      gradient: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/30",
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
      price: "$499",
      duration: "5 Hours",
      icon: Star,
      gradient: "from-orange-500/20 to-orange-600/20",
      borderColor: "border-orange-500/30",
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
      price: "$799",
      duration: "8 Hours",
      icon: Crown,
      gradient: "from-purple-500/20 to-purple-600/20",
      borderColor: "border-purple-500/30",
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
      className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-24 px-6 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-white/70 tracking-wide">PRICING PACKAGES</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Choose Your
            <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Tailored packages designed to match your event's unique needs and create unforgettable moments.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 50 }}
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
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-sm font-bold shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    MOST POPULAR
                  </div>
                </motion.div>
              )}

              <div className={`relative h-full bg-white/5 backdrop-blur-sm border ${pkg.popular ? 'border-orange-500/50' : 'border-white/10'} rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] group-hover:${pkg.borderColor}`}>
                
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${pkg.gradient} rounded-2xl border ${pkg.borderColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <pkg.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                      {pkg.name}
                    </h3>
                    
                    <p className="text-white/60 text-sm mb-4">{pkg.subtitle}</p>
                    
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-4xl font-bold text-white mb-1">{pkg.price}</div>
                    <div className="text-white/50 text-sm">per event</div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-orange-400/20 to-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/30">
                        <Check className="w-3 h-3 text-orange-400" />
                      </div>
                      <span className="text-white/70 text-sm leading-relaxed">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={() => router.push('/quote?mode=form')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group/btn w-full ${
                    pkg.popular 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' 
                      : 'bg-white/10 text-white border border-white/20'
                  } py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg ${
                    pkg.popular 
                      ? 'hover:from-orange-600 hover:to-orange-700' 
                      : 'hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.button>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pkg.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-white/60 text-sm">
            <Star className="w-4 h-4 text-orange-400" />
            <span>All packages include professional consultation and custom music curation</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlansSection;