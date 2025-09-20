'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Music, ExternalLink } from 'lucide-react';

const Footer = ({ scrollToSection, menuItems }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden mb-12">
      {/* Enhanced Background with Glass Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="absolute inset-0 backdrop-blur-[50px] bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.02]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:60px_60px] sm:bg-[size:80px_80px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="relative group mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-transparent to-blue-400/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
          
          <div className="relative bg-white/[0.08] backdrop-blur-2xl rounded-3xl border border-white/20 p-8 sm:p-12 hover:border-orange-400/30 transition-all duration-500 overflow-hidden">
            {/* Glass Reflections */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.1] to-transparent rounded-t-3xl"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-white/[0.05] to-transparent rounded-br-3xl"></div>
            
            <div className="relative grid md:grid-cols-3 gap-8 lg:gap-12">
              {/* Brand Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center md:text-left"
              >
                <div className="relative group/brand mb-6">
                  <div className="absolute inset-0 bg-orange-400/20 rounded-2xl blur-lg group-hover/brand:blur-xl transition-all duration-300"></div>
                  <div className="relative inline-block p-4 bg-white/[0.08] backdrop-blur-md rounded-2xl border border-white/20 hover:border-orange-400/40 transition-all duration-300">
                    <img src="/images/logo.webp" alt="DJLOW323" className="h-16 w-auto" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">
                    DJLOW323
                  </h3>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-white/60">
                    <Music className="w-4 h-4 text-orange-400" />
                    <span className="text-sm font-light">Professional DJ</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-white/60">
                    <MapPin className="w-4 h-4 text-orange-400" />
                    <span className="text-sm font-light">Las Vegas, Nevada</span>
                  </div>
                </div>
              </motion.div>

              {/* Quick Links Section */}
              {menuItems && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center md:text-left"
                > 
                  <div className="space-y-3">
                    {menuItems.map((item, index) => (
                      <motion.button
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        viewport={{ once: true }}
                        onClick={() => scrollToSection && scrollToSection(item)}
                        className="group/link relative block w-full text-left"
                      >
                        <div className="absolute inset-0 bg-orange-400/10 rounded-lg blur-md opacity-0 group-hover/link:opacity-100 transition-all duration-300"></div>
                        <div className="relative flex items-center gap-2 px-3 py-2 text-white/70 hover:text-orange-400 transition-colors duration-300">
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                          <span className="text-sm font-light">{item}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center md:text-left"
              >
                
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="group/contact relative"
                  >
                    <div className="absolute inset-0 bg-orange-400/10 rounded-xl blur-md opacity-0 group-hover/contact:opacity-100 transition-all duration-300"></div>
                    <div className="relative flex items-center justify-center md:justify-start gap-3 p-3 bg-white/[0.04] backdrop-blur-md rounded-xl border border-white/10 hover:border-orange-400/30 transition-all duration-300">
                      <div className="w-8 h-8 bg-orange-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-orange-400" />
                      </div>
                      <div className="text-left">
                        <a 
                          href="mailto:info@djlow323.com" 
                          className="text-white/80 hover:text-orange-400 transition-colors duration-300 text-sm font-medium"
                        >
                          info@djlow323.com
                        </a>
                        <p className="text-white/50 text-xs font-light">For Bookings & Events</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glass Separator */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/20 to-transparent rounded-full blur-sm"></div>
            <div className="relative h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-blue-400/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative text-center p-6 bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500">
              {/* Glass Reflections */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent rounded-t-2xl"></div>
              
              <div className="relative">
                <p className="text-white/60 text-sm font-light">
                  © {currentYear} <span className="text-orange-400 font-medium">DJLOW323</span>. All rights reserved.
                </p>
                <p className="text-white/40 text-xs font-light mt-1">
                  Las Vegas, Nevada
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;