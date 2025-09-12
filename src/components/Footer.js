'use client';

import { SocialIcon } from 'react-social-icons';

const Footer = ({ scrollToSection, menuItems }) => {
  const currentYear = new Date().getFullYear();
  
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
    <footer className="bg-black border-t border-[#b2a9aa]/20 py-12 px-6 mb-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <img src="/images/logo.webp" alt="DJLOW323" className="h-16 mx-auto md:mx-0 mb-4" />
            <p className="text-[#b2a9aa] text-sm">
              DJ • Las Vegas, Nevada
            </p>
          </div>
          
          {menuItems && (
            <div>
              <h4 className="text-white font-bold mb-4" style={{ fontFamily: 'Syncopate, sans-serif' }}>
                Quick Links
              </h4>
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection && scrollToSection(item)}
                    className="block text-[#b2a9aa] hover:text-[#fe9511] transition-colors duration-300 text-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-white font-bold mb-4" style={{ fontFamily: 'Syncopate, sans-serif' }}>
              Contact
            </h4>
            <p className="text-[#b2a9aa] text-sm mb-2">
              <a href="mailto:info@djlow323.com" className="hover:text-[#fe9511]">
                info@djlow323.com
              </a>
            </p>
            <p className="text-[#b2a9aa] text-sm">For Bookings & Events</p>
          </div>
        </div>

        <div className="border-t border-[#b2a9aa]/20 mt-8 pt-8 text-center">
          <p className="text-[#b2a9aa] text-sm">
            © {currentYear} DJLOW323. All rights reserved. | Las Vegas, Nevada
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;