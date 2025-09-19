'use client';

import { motion } from 'framer-motion';
import { SocialIcon } from 'react-social-icons';
import { Music, Radio, Users, Heart, MapPin, Award } from 'lucide-react';

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
      icon: Radio,
      title: "Official DJ",
      description: "98.1 FM FiestaMix Las Vegas"
    },
    {
      icon: Award,
      title: "Production Member",
      description: "Lo Maximo Production"
    },
    {
      icon: Users,
      title: "Former DJ",
      description: "99.3 FM LatinoMix"
    }
  ];

  return (
    <section
      ref={sectionRef}
      data-section="ABOUT"
      className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-24 px-6 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Header */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
                <Heart className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-medium text-white/70 tracking-wide">GET TO KNOW ME</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                Meet
                <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                  DJLOW323
                </span>
              </h2>
            </div>

            {/* Bio */}
            <div className="space-y-6 mb-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg text-white/70 leading-relaxed"
              >
                I'm DJLOW323, official DJ of <span className="text-orange-400 font-semibold">98.1 FM FiestaMix</span> in Las Vegas, Nevada. 
                With years of experience in the music industry, I've been part of Lo Maximo Production and previously 
                DJ at 99.3 FM LatinoMix.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-lg text-white/70 leading-relaxed"
              >
                My passion is creating <span className="text-orange-400 font-semibold">unique musical experiences</span> that make 
                every event unforgettable. From intimate weddings to large corporate celebrations, my goal is to get everyone dancing.
              </motion.p>
            </div>

            {/* Location Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-orange-600/10 backdrop-blur-sm rounded-full border border-orange-500/20 mb-8"
            >
              <MapPin className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 text-sm font-medium">Based in Las Vegas, Nevada</span>
            </motion.div>

            {/* Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="group text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl border border-orange-500/30 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <achievement.icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1">{achievement.title}</h4>
                  <p className="text-white/60 text-xs">{achievement.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Social Media */}
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-white font-semibold mb-4 flex items-center gap-2"
              >
                <Music className="w-5 h-5 text-orange-400" />
                Connect With Me
              </motion.h3>
              
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.platform}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full blur group-hover:blur-md transition-all duration-300"></div>
                    <SocialIcon
                      url={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ height: 44, width: 44 }}
                      bgColor="transparent"
                      className="relative border-2 border-white/20 rounded-full hover:border-orange-500/50 transition-all duration-300"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Background blur effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            
            {/* Image container */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <img
                src="/assets/about.webp"
                alt="DJLOW323 Professional Setup"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">DJLOW323</div>
                      <div className="text-orange-400 text-sm">Professional DJ & Producer</div>
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