'use client';

import { motion } from 'framer-motion';
import { Music, Play, Headphones, ExternalLink } from 'lucide-react';

const MixcloudSection = ({ sectionRef }) => {
  return (
    <section
      ref={sectionRef}
      data-section="MIX CLOUD"
      className="relative min-h-screen bg-slate-950 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Enhanced Background with Glass Effect */}
      <div className="absolute inset-0">
        {/* Gradient Orbs - Responsive sizes */}
        <div className="absolute top-1/4 right-1/6 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-orange-400/25 to-amber-400/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/6 w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
                <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                <span className="text-xs sm:text-sm font-semibold text-white/90 tracking-wider">LIVE MIXES</span>
              </div>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-6 sm:mb-8 tracking-tight leading-none"
          >
            Latest
            <span className="block font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Mixes
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg lg:text-xl text-white/60 max-w-xl lg:max-w-2xl mx-auto leading-relaxed font-light"
          >
            Discover my latest sets, live performances, and exclusive mixes. Experience the energy and passion that defines every performance.
          </motion.p>
        </motion.div>

        {/* Enhanced Mixcloud Player */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-20"
        >
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-violet-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            
            {/* Main Container */}
            <div className="relative bg-white/[0.08] backdrop-blur-2xl rounded-3xl border border-white/20 p-6 sm:p-8 lg:p-12 hover:border-orange-400/30 transition-all duration-500 overflow-hidden">
              {/* Glass Reflections */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.1] to-transparent rounded-t-3xl"></div>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-white/[0.05] to-transparent rounded-br-3xl"></div>
              
              <div className="relative">
                {/* Player Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative group/icon">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-xl blur-lg group-hover/icon:blur-xl transition-all duration-300"></div>
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-white/[0.1] backdrop-blur-md rounded-xl border border-orange-400/30 flex items-center justify-center group-hover/icon:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 sm:w-7 sm:h-7 text-orange-400 ml-1" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">Mixcloud Player</h3>
                      <p className="text-white/60 text-sm font-light">DJLOW323 Official Channel</p>
                    </div>
                  </div>
                  
                  <motion.a
                    href="https://www.mixcloud.com/djlow323/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group/btn relative overflow-hidden rounded-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20 blur-md"></div>
                    <div className="relative flex items-center gap-2 px-6 py-3 bg-white/[0.08] backdrop-blur-md rounded-xl border border-white/20 hover:border-orange-400/40 transition-all duration-300">
                      <ExternalLink className="w-4 h-4 text-orange-400" />
                      <span className="text-white/90 text-sm font-medium">Visit Mixcloud</span>
                    </div>
                  </motion.a>
                </div>

                {/* Iframe Container */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-violet-400/10 rounded-2xl blur-lg"></div>
                  <div className="relative bg-white/[0.05] backdrop-blur-md rounded-2xl border border-white/20 p-4 sm:p-6">
                    {/* Glass Reflections for iframe container */}
                    <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/[0.08] to-transparent rounded-t-2xl"></div>
                    
                    <div className="relative aspect-video sm:aspect-[16/10] lg:aspect-[16/9] overflow-hidden rounded-xl">
                      <iframe
                        src="https://www.mixcloud.com/widget/iframe/?feed=%2Fdjlow323%2F"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        className="absolute inset-0 w-full h-full rounded-xl"
                        allow="autoplay"
                        title="DJLOW323 Mixcloud Player"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: Music,
              title: "Live Sessions",
              description: "Experience live mixing sessions and exclusive tracks",
              gradient: "from-orange-400/10 to-amber-400/10"
            },
            {
              icon: Headphones,
              title: "Premium Quality",
              description: "High-quality audio for the ultimate listening experience",
              gradient: "from-blue-400/10 to-cyan-400/10"
            },
            {
              icon: Play,
              title: "Latest Releases",
              description: "Stay updated with the newest mixes and performances",
              gradient: "from-violet-400/10 to-purple-400/10"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500`}></div>
              
              {/* Main Card */}
              <div className="relative bg-white/[0.06] backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8 hover:border-white/20 transition-all duration-500 group-hover:bg-white/[0.08] text-center">
                {/* Glass Reflections */}
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/[0.1] to-transparent rounded-t-2xl"></div>
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-white/[0.05] to-transparent rounded-br-2xl"></div>
                
                <div className="relative">
                  <div className="relative group/icon mb-4">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-xl blur-md group-hover/icon:blur-lg transition-all duration-300`}></div>
                    <div className="relative w-12 h-12 mx-auto bg-white/[0.08] backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center group-hover/icon:scale-110 transition-all duration-300">
                      <item.icon className="w-6 h-6 text-orange-400" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm font-light leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 sm:mt-20 lg:mt-24"
        >
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-amber-400/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/[0.08] backdrop-blur-md rounded-full border border-white/20 hover:border-orange-400/40 transition-all duration-300">
              <Music className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
              <span className="text-sm sm:text-base text-white/90 font-medium">Follow for exclusive content and live sessions</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MixcloudSection;