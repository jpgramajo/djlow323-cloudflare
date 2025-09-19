'use client';

import { motion } from 'framer-motion';
import { SocialIcon } from 'react-social-icons';

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

  return (
    <section
      ref={sectionRef}
      data-section="ABOUT"
      className="min-h-screen bg-gradient-to-br from-black to-[#1a1a1a] py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-[#fe9511] mb-8"
                style={{ fontFamily: 'Archivo Black, sans-serif' }}>
              ABOUT
            </h2>
            <p className="text-lg text-[#b2a9aa] mb-6 leading-relaxed"
               style={{ fontFamily: 'Roboto, sans-serif' }}>
              I'm DJLOW323, official DJ of 98.1 FM FiestaMix in Las Vegas, Nevada. With years of experience
              in the music industry, I've been part of Lo Maximo Production and previously DJ at 99.3 FM LatinoMix.
            </p>
            <p className="text-lg text-[#b2a9aa] mb-8 leading-relaxed"
               style={{ fontFamily: 'Roboto, sans-serif' }}>
              My passion is creating unique musical experiences that make every event unforgettable.
              From intimate weddings to large corporate celebrations, my goal is to get everyone dancing.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.platform}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                >
                  <SocialIcon
                    url={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ height: 40, width: 40 }}
                    bgColor="#fe9511"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="/assets/about.webp"
              alt="DJLOW323 Setup"
              className="w-full rounded-lg shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;