'use client';

import { motion } from 'framer-motion';
import { Music, Users, Star, Sparkles, Volume2, Mic } from 'lucide-react';

const ServicesSection = ({ sectionRef }) => {
  const services = [
    {
      title: "Wedding Celebrations",
      icon: Star,
      description: "Crafting the perfect soundtrack for your most important day with curated music experiences.",
      features: ["Custom ceremony music", "Reception entertainment", "First dance coordination"]
    },
    {
      title: "Corporate Events",
      icon: Users,
      description: "Professional entertainment solutions for conferences, launches, and team celebrations.",
      features: ["Brand-aligned playlists", "Professional presentation", "Audience engagement"]
    },
    {
      title: "Private Experiences",
      icon: Sparkles,
      description: "Intimate celebrations designed around your personal style and musical preferences.",
      features: ["Personalized curation", "Intimate atmosphere", "Flexible arrangements"]
    }
  ];

  const features = [
    { icon: Volume2, text: "Professional Audio Systems" },
    { icon: Music, text: "Curated Music Libraries" },
    { icon: Mic, text: "Live MC Services" },
    { icon: Sparkles, text: "Ambient Lighting Design" }
  ];

  return (
    <section
      ref={sectionRef}
      data-section="SERVICES"
      className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-24 px-6 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
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
            <Music className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-white/70 tracking-wide">PROFESSIONAL SERVICES</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Premium
            <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
              DJ Services
            </span>
          </h2>
          
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Elevating your events with carefully crafted musical experiences and professional entertainment solutions.
          </p>
        </motion.div>



        {/* Hero Service Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16 items-center mb-32"
        >
          {/* Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <img
                src="/assets/dj-console-pc.webp"
                alt="Professional DJ Equipment"
                className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 backdrop-blur-sm rounded-full border border-orange-500/20 mb-6">
              <Volume2 className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-400 tracking-wide">PROFESSIONAL EQUIPMENT</span>
            </div>
            
            <h3 className="text-4xl font-bold text-white mb-6 leading-tight">
              State-of-the-Art
              <span className="block text-orange-400">Audio Experience</span>
            </h3>
            
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              Professional-grade equipment and years of expertise combine to deliver flawless audio experiences that elevate every moment of your event.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10"
                >
                  <feature.icon className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-white/80">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const images = ["/assets/better.webp", "/assets/corporate.webp", "/assets/quince.webp"];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:border-orange-500/30">
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={images[index]}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Icon Overlay */}
                    <div className="absolute top-4 right-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-white/70 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex-shrink-0"></div>
                          <span className="text-white/60 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500/20 to-orange-600/20 backdrop-blur-sm rounded-full border border-orange-500/30 text-white/80 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Ready to elevate your event?</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;