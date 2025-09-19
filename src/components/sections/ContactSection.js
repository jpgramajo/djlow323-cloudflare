'use client';

import { motion } from 'framer-motion';
import { SocialIcon } from 'react-social-icons';

const ContactSection = ({ sectionRef }) => {
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
      data-section="CONTACT"
      className="bg-gradient-to-br from-black to-[#1a1a1a] py-20 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-[#fe9511] mb-16"
            style={{ fontFamily: 'Archivo Black, sans-serif' }}>
          CONTACT
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6"
                style={{ fontFamily: 'Syncopate, sans-serif' }}>
              Get In Touch
            </h3>
            <p className="text-[#b2a9aa] mb-6">
              Email: <a href="mailto:info@djlow323.com" className="text-[#fe9511] hover:underline">
                info@djlow323.com
              </a>
            </p>
            <p className="text-[#b2a9aa] mb-8">Las Vegas, Nevada, United States</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6"
                style={{ fontFamily: 'Syncopate, sans-serif' }}>
              Follow Me
            </h3>
            <div className="flex justify-center flex-wrap gap-4">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.platform}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SocialIcon
                    url={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ height: 50, width: 50 }}
                    bgColor="#fe9511"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;