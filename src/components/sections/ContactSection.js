'use client';

import { motion } from 'framer-motion';
import { SocialIcon } from 'react-social-icons';
import { Mail, MapPin, Phone, Send, Heart } from 'lucide-react';

const ContactSection = ({ sectionRef }) => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "info@djlow323.com",
      href: "mailto:info@djlow323.com",
      gradient: "from-orange-400/20 to-amber-400/20"
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Las Vegas, Nevada, United States",
      gradient: "from-blue-400/20 to-cyan-400/20"
    },
    {
      icon: Phone,
      title: "Ready to Book?",
      content: "Get your quote today",
      gradient: "from-violet-400/20 to-purple-400/20"
    }
  ];

  return (
    <section
      ref={sectionRef}
      data-section="CONTACT"
      className="relative min-h-screen bg-slate-950 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Enhanced Background with Glass Effect */}
      <div className="absolute inset-0">
        {/* Gradient Orbs - Responsive sizes */}
        <div className="absolute top-1/4 left-1/6 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-orange-400/25 to-amber-400/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/6 w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Glass Distortion Effect */}
        <div className="absolute inset-0 backdrop-blur-[50px] sm:backdrop-blur-[100px] bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.02]"></div>
        
        {/* Grid Pattern - Responsive size */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px] lg:bg-[size:80px_80px]"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
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
                <Send className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                <span className="text-xs sm:text-sm font-semibold text-white/90 tracking-wider">GET IN TOUCH</span>
              </div>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-6 sm:mb-8 tracking-tight leading-none"
          >
            Let's Create
            <span className="block font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Something Amazing
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg lg:text-xl text-white/60 max-w-xl lg:max-w-2xl mx-auto leading-relaxed font-light"
          >
            Ready to make your event unforgettable? Let's discuss your vision and create the perfect musical experience together.
          </motion.p>
        </motion.div>

        {/* Enhanced Contact Content */}
        <div className="gap-12 sm:gap-16 items-center">
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500`}></div>
                  
                  {/* Main Card */}
                  <div className="relative bg-white/[0.06] backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 p-6 sm:p-8 hover:border-white/20 transition-all duration-500 group-hover:bg-white/[0.08] overflow-hidden">
                    {/* Glass Reflections */}
                    <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/[0.1] to-transparent rounded-t-xl sm:rounded-t-2xl"></div>
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-white/[0.05] to-transparent rounded-br-xl sm:rounded-br-2xl"></div>
                    
                    <div className="relative flex items-center gap-4 sm:gap-6">
                      <div className="relative group/icon">
                        <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} rounded-lg sm:rounded-xl blur-md group-hover/icon:blur-lg transition-all duration-300`}></div>
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-white/[0.08] backdrop-blur-md rounded-lg sm:rounded-xl border border-white/20 flex items-center justify-center group-hover/icon:scale-110 transition-all duration-300">
                          <info.icon className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2 group-hover:text-orange-400 transition-colors duration-300">
                          {info.title}
                        </h3>
                        {info.href ? (
                          <a 
                            href={info.href}
                            className="text-sm sm:text-base text-white/70 hover:text-orange-400 transition-colors duration-300 font-light"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-sm sm:text-base text-white/70 font-light group-hover:text-white/90 transition-colors duration-300">
                            {info.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Media Section */}
          
        </div>
      </div>
    </section>
  );
};

export default ContactSection;