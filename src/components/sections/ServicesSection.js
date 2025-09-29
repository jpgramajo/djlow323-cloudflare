'use client';

import { motion } from 'framer-motion';
import DynamicIcon from '@/components/DynamicIcon';

const ServicesSection = ({ sectionRef }) => {
  const services = [
    {
      title: "Wedding Celebrations",
      icon: 'star',
      description: "Crafting the perfect soundtrack for your most important day with curated music experiences.",
      features: ["Custom ceremony music", "Reception entertainment", "First dance coordination"],
      gradient: "from-rose-400/20 to-pink-400/20"
    },
    {
      title: "Corporate Events",
      icon: 'users',
      description: "Professional entertainment solutions for conferences, launches, and team celebrations.",
      features: ["Brand-aligned playlists", "Professional presentation", "Audience engagement"],
      gradient: "from-blue-400/20 to-cyan-400/20"
    },
    {
      title: "Private Experiences",
      icon: 'sparkles',
      description: "Intimate celebrations designed around your personal style and musical preferences.",
      features: ["Personalized curation", "Intimate atmosphere", "Flexible arrangements"],
      gradient: "from-violet-400/20 to-purple-400/20"
    }
  ];

  const features = [
    { icon: 'volume2', text: "Professional Audio" },
    { icon: 'music', text: "Curated Libraries" },
    { icon: 'mic', text: "Live MC Services" },
    { icon: 'zap', text: "Dynamic Lighting" }
  ];

  return (
    <section
      ref={sectionRef}
      data-section="SERVICES"
      className="relative min-h-screen bg-slate-950 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Enhanced Background with Glass Effect */}
      <div className="absolute inset-0">
        {/* Gradient Orbs - Responsive sizes */}
        <div className="absolute top-1/4 left-1/6 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-orange-400/30 to-amber-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/6 w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-gradient-to-r from-blue-400/25 to-indigo-400/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Glass Distortion Effect */}
        <div className="absolute inset-0 backdrop-blur-[50px] sm:backdrop-blur-[100px] bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.02]"></div>
        
        {/* Grid Pattern - Responsive size */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px] lg:bg-[size:80px_80px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Modern Header */}
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
                <DynamicIcon name="music" className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                <span className="text-xs sm:text-sm font-semibold text-white/90 tracking-wider">PREMIUM SERVICES</span>
              </div>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-6 sm:mb-8 tracking-tight leading-none"
          >
            Professional
            <span className="block font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              DJ Services
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg lg:text-xl text-white/60 max-w-xl lg:max-w-2xl mx-auto leading-relaxed font-light"
          >
            Elevating events with meticulously crafted musical experiences and cutting-edge entertainment solutions.
          </motion.p>
        </motion.div>

        {/* Glass Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-20 sm:mb-24 lg:mb-32"
        >
          <div className="relative group">
            {/* Glass Container with Advanced Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-transparent to-blue-400/10 rounded-2xl sm:rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative bg-white/[0.06] backdrop-blur-xl sm:backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 lg:p-12 hover:border-white/20 transition-all duration-500 overflow-hidden">
              {/* Inner Glass Reflections */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent rounded-t-2xl sm:rounded-t-3xl"></div>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-white/[0.04] to-transparent rounded-br-2xl sm:rounded-br-3xl"></div>
              
              <div className="relative grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                {/* Enhanced Image */}
                <div className="relative group/image">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-blue-500/30 rounded-xl sm:rounded-2xl blur-xl opacity-60 group-hover/image:opacity-80 transition-all duration-500"></div>
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/[0.05] backdrop-blur-sm border border-white/20">
                    <img
                      src="/assets/dj-console-pc.webp"
                      alt="Professional DJ Equipment"
                      className="w-full h-64 sm:h-80 lg:h-96 object-cover group-hover/image:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10"></div>
                    
                    {/* Floating Glass Elements */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full sm:rounded-2xl border border-white/20 flex items-center justify-center">
                        <DynamicIcon name="volume2" className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modern Content */}
                <div className="space-y-6 sm:space-y-8">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="inline-block">
                      <div className="relative">
                        <div className="absolute inset-0 bg-orange-400/20 rounded-lg sm:rounded-xl blur-lg"></div>
                        <div className="relative px-3 py-1.5 sm:px-4 sm:py-2 bg-white/[0.08] backdrop-blur-md rounded-lg sm:rounded-xl border border-orange-400/20">
                          <span className="text-xs sm:text-sm font-semibold text-orange-400 tracking-wide">STATE-OF-THE-ART</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
                      Immersive
                      <span className="block font-bold text-orange-400">Audio Experience</span>
                    </h3>
                    
                    <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light">
                      Professional-grade equipment and years of expertise combine to deliver flawless audio experiences that transform every moment of your event into something extraordinary.
                    </p>
                  </div>

                  {/* Glass Feature Cards - Fixed text colors */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="group/feature relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-lg sm:rounded-xl blur-md opacity-0 group-hover/feature:opacity-100 transition-all duration-300"></div>
                        <div className="relative flex items-center gap-3 p-3 sm:p-4 bg-white/[0.06] backdrop-blur-md rounded-lg sm:rounded-xl border border-white/10 hover:border-orange-400/30 transition-all duration-300">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <DynamicIcon name={feature.icon} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />
                          </div>
                          <span className="text-sm font-medium text-white/90">{feature.text}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modern Services Grid - Same layout, just responsive sizes */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const images = ["/assets/wedding.jpg", "/assets/corp.webp", "/assets/priv.jpg"];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Enhanced Glass Card */}
                <div className="relative h-full">
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500`}></div>
                  
                  {/* Main Card */}
                  <div className="relative h-full bg-white/[0.06] backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 group-hover:bg-white/[0.08]">
                    {/* Glass Reflection */}
                    <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/[0.1] to-transparent"></div>
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-white/[0.05] to-transparent"></div>
                    
                    {/* Image Header */}
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <img
                        src={images[index]}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      
                      {/* Floating Icon */}
                      <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-white/20 rounded-lg sm:rounded-xl blur-md"></div>
                          <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-white/[0.15] backdrop-blur-md rounded-lg sm:rounded-xl border border-white/20 flex items-center justify-center">
                            <DynamicIcon name={service.icon} className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative p-6 sm:p-8 space-y-4 sm:space-y-6">
                      <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
                        {service.title}
                      </h3>
                      
                      <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-2 sm:space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3 group/item">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex-shrink-0"></div>
                            <span className="text-sm text-white/60 font-light group-hover/item:text-white/80 transition-colors duration-300">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      {/* <div className="pt-2 sm:pt-4">
                        <div className="group/cta inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors duration-300 cursor-pointer">
                          <span className="text-sm font-medium">Learn More</span>
                          <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modern CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 sm:mt-20 lg:mt-24"
        >
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-amber-400/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/[0.08] backdrop-blur-md rounded-full border border-white/20 hover:border-orange-400/40 transition-all duration-300">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
              <span className="text-sm sm:text-base text-white/90 font-medium">Ready to create something extraordinary?</span>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default ServicesSection;