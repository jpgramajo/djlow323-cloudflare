'use client';

import { motion } from 'framer-motion';
import DynamicIcon from '@/components/DynamicIcon';

const AboutSection = ({ sectionRef }) => {
  const socialLinks = [
    { url: 'https://www.tiktok.com/@djlow323', platform: 'tiktok' },
    { url: 'https://open.spotify.com/user/djlow323', platform: 'spotify' },
    { url: 'https://www.facebook.com/DjLow.LasVegas', platform: 'facebook' },
    { url: 'https://x.com/DJLOW323', platform: 'twitter' },
    { url: 'https://www.instagram.com/djlow323', platform: 'instagram' },
    { url: 'https://www.youtube.com/@DjLowMixes', platform: 'youtube' },
    { url: 'https://www.mixcloud.com/djlow323/', platform: 'mixcloud' }
  ];

  const achievements = [
    {
      icon: 'radio',
      title: "Official DJ",
      description: "98.1 FM FiestaMix Las Vegas",
      gradient: "from-orange-400/20 to-amber-400/20"
    },
    {
      icon: 'award',
      title: "Production Member",
      description: "Lo Maximo Production",
      gradient: "from-blue-400/20 to-cyan-400/20"
    },
    {
      icon: 'users',
      title: "Former DJ",
      description: "99.3 FM LatinoMix",
      gradient: "from-violet-400/20 to-purple-400/20"
    }
  ];

  return (
    <section
      ref={sectionRef}
      data-section="ABOUT"
      className="relative min-h-screen bg-slate-950 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Enhanced Background with Glass Effect */}
      <div className="absolute inset-0">
        {/* Gradient Orbs - Responsive sizes */}
        <div className="absolute top-1/4 right-1/6 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-orange-400/25 to-amber-400/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/6 w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 bg-gradient-to-r from-violet-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Glass Distortion Effect */}
        <div className="absolute inset-0 backdrop-blur-[50px] sm:backdrop-blur-[100px] bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.02]"></div>
        
        {/* Grid Pattern - Responsive size */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px] lg:bg-[size:80px_80px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 lg:space-y-12"
          >
            {/* Modern Header */}
            <div>
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-block mb-6 sm:mb-8"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/[0.08] backdrop-blur-md rounded-2xl border border-white/10 hover:border-orange-400/30 transition-all duration-300">
                    <DynamicIcon name="heart" className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                    <span className="text-xs sm:text-sm font-semibold text-white/90 tracking-wider">GET TO KNOW ME</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 sm:mb-8 tracking-tight leading-none"
              >
                Meet
                <span className="block font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                  DJLOW
                </span>
              </motion.h2>
            </div>

            {/* Enhanced Bio with Glass Effects */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 via-transparent to-blue-400/5 rounded-2xl sm:rounded-3xl blur-xl"></div>
              <div className="relative bg-white/[0.04] backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6">
                {/* Glass Reflections */}
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/[0.08] to-transparent rounded-t-2xl sm:rounded-t-3xl"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-white/[0.04] to-transparent rounded-br-2xl sm:rounded-br-3xl"></div>
                
                <div className="relative space-y-6">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-base sm:text-lg text-white/70 leading-relaxed font-light"
                  >
                    I'm <span className="text-orange-400 font-semibold">DJLOW</span>, a professional DJ based in Las Vegas, Nevada. With experience in the music industry since 2003, I've worked on a wide range of events, from radio promotions to large-scale celebrations, and across all music genres.
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-base sm:text-lg text-white/70 leading-relaxed font-light"
                  >
                    My passion is creating <span className="text-orange-400 font-semibold">unique musical experiences</span> that make 
                    every event unforgettable. From intimate weddings to large corporate celebrations, my goal is to get everyone dancing.
                  </motion.p>

                  {/* Enhanced Location Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="inline-block"
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
                      <div className="relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/[0.08] backdrop-blur-md rounded-full border border-orange-400/30 hover:border-orange-400/50 transition-all duration-300">
                        <DynamicIcon name="mapPin" className="w-4 h-4 text-orange-400" />
                        <span className="text-orange-400 text-sm font-medium">Based in Las Vegas, Nevada</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Enhanced Social Media */}
            <div className="space-y-4 sm:space-y-6">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="text-white font-semibold text-lg sm:text-xl flex items-center gap-3"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-400/20 rounded-lg flex items-center justify-center">
                  <DynamicIcon name="music" className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                </div>
                Connect With Me
              </motion.h3>
              
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.platform}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-full blur-md opacity-0 group-hover:opacity-80 transition-all duration-300"></div>
                    <div className="relative bg-white/[0.08] backdrop-blur-md rounded-full border border-white/20 group-hover:border-orange-400/40 transition-all duration-300 p-1">
                      <DynamicIcon
                        name={social.platform}
                        url={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ height: 40, width: 40, cursor: 'pointer' }}
                        bgColor="transparent"
                        className="transition-all duration-300"
                        onClick={() => social.platform !== 'mixcloud' ? null : window.open(social.url, "_blank")}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Enhanced Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Enhanced Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-blue-400/20 rounded-2xl sm:rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            
            {/* Glass Image Container */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/[0.05] backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-500">
              {/* Inner Glass Reflections */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent rounded-t-2xl sm:rounded-t-3xl z-10"></div>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-white/[0.04] to-transparent rounded-br-2xl sm:rounded-br-3xl z-10"></div>
              
              <img
                src="/assets/about.webp"
                alt="DJLOW323 Professional Setup"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Enhanced Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5"></div>
              
              {/* Enhanced Floating Badge */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-20">
                <div className="relative group/badge">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-xl sm:rounded-2xl blur-lg group-hover/badge:blur-xl transition-all duration-300"></div>
                  <div className="relative bg-white/[0.12] backdrop-blur-md border border-white/30 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    {/* Inner Glass Reflection */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.15] to-transparent rounded-t-xl sm:rounded-t-2xl"></div>
                    
                    <div className="relative flex items-center gap-3 sm:gap-4">
                      <div className="relative group/icon">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-400 rounded-lg sm:rounded-xl blur-md group-hover/icon:blur-lg transition-all duration-300"></div>
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-amber-400 rounded-lg sm:rounded-xl flex items-center justify-center group-hover/icon:scale-110 transition-transform duration-300">
                        <DynamicIcon name="music" className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="text-white font-bold text-base sm:text-lg">DJLOW</div>
                        <div className="text-orange-400 text-sm font-medium">Professional DJ</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;