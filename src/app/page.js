'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import '@fontsource/archivo-black';
import '@fontsource/syncopate';
import '@fontsource/roboto';

// Import section components
import HomeSection from '../components/sections/HomeSection';
import ServicesSection from '../components/sections/ServicesSection';
import PlansSection from '../components/sections/PlansSection';
import AboutSection from '../components/sections/AboutSection';
import MixcloudSection from '@/components/sections/MixcloudSection';
import GallerySection from '../components/sections/GallerySection';
import FAQSection from '../components/sections/FAQSection';
import ContactSection from '../components/sections/ContactSection';

// Import other components
import Footer from '../components/Footer';

const DJLandingPage = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('HOME');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(true); // Estado para la burbuja de bienvenida
  const [bookingForm, setBookingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    eventDate: '',
    eventLocation: '',
    eventTime: '',
    eventType: '',
    customEventType: '',
    eventDetails: ''
  });

  const sectionRefs = {
    HOME: useRef(null),
    SERVICES: useRef(null),
    PLANS: useRef(null),
    ABOUT: useRef(null),
    MIX_CLOUD: useRef(null),
    // GALLERY: useRef(null),
    FAQ: useRef(null),
    CONTACT: useRef(null)
  };

  const menuItems = [
    'HOME',
    'SERVICES',
    'PLANS',
    'ABOUT',
    'MIXES',
    // 'GALLERY',
    'FAQ',
    'CONTACT'
  ];

  const eventTypes = [
    "Wedding",
    "Birthday Party",
    "Corporate Event",
    "Quinceañera",
    "Night Club",
    "Private Party",
    "Festival",
    "Other"
  ];

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // No auto-hide - CTA permanente hasta que el usuario lo cierre

  // Scroll spy to detect active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          setActiveSection(sectionId);

          const index = menuItems.indexOf(sectionId);
          if (index !== -1) {
            setCurrentMobileIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const scrollToSection = (sectionName) => {
    const ref = sectionRefs[sectionName];
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleMobileNavigation = (direction) => {
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentMobileIndex > 0 ? currentMobileIndex - 1 : menuItems.length - 1;
    } else {
      newIndex = currentMobileIndex < menuItems.length - 1 ? currentMobileIndex + 1 : 0;
    }

    setCurrentMobileIndex(newIndex);
    scrollToSection(menuItems[newIndex]);
  };

  // Navegación a página de quote
  const handleGetQuote = () => {
    router.push('/quote?mode=form');
  };

  const handleAIAssistant = () => {
    router.push('/quote?mode=ai');
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* All sections using components */}
      <HomeSection
        sectionRef={sectionRefs.HOME}
        handleVideoLoad={handleVideoLoad}
        isVideoLoaded={isVideoLoaded}
      />
      <ServicesSection sectionRef={sectionRefs.SERVICES} />
      <PlansSection sectionRef={sectionRefs.PLANS} />
      <AboutSection sectionRef={sectionRefs.ABOUT} />
      <MixcloudSection sectionRef={sectionRefs.MIX_CLOUD} />
      {/* <GallerySection sectionRef={sectionRefs.GALLERY} /> */}
      <FAQSection sectionRef={sectionRefs.FAQ} />
      <ContactSection sectionRef={sectionRefs.CONTACT} />

      <Footer scrollToSection={scrollToSection} menuItems={menuItems} />

      {/* Welcome Bubble - CTA sobre el botón AI */}
      <AnimatePresence>
        {showWelcomeBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="fixed bottom-28 left-1/2 transform -translate-x-1/2 z-50 max-w-xs"
          >
            <div className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg p-4 relative">
              {/* Close Button */}
              <button
                onClick={() => setShowWelcomeBubble(false)}
                className="absolute top-2 right-2 text-[#b2a9aa] hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="pr-6">
                <h3 className="text-[#fe9511] font-bold text-sm mb-2" style={{ fontFamily: 'Archivo Black, sans-serif' }}>
                  Try Our AI! 🤖
                </h3>
                <p className="text-[#b2a9aa] text-xs leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Get a quote with our AI assistant! Click on the robot button to try it
                </p>
              </div>

              {/* Arrow pointer to AI button */}
              <div className="absolute -bottom-2 right-8">
                <div className="w-4 h-4 bg-black/20 backdrop-blur-md border-b border-r border-white/10 transform rotate-45"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation Bar - Glassmorphism Effect */}
      <motion.nav 
        className="fixed top-4 left-4 right-4 z-50 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <div className="flex items-center">
            <motion.img
              src="/images/logo.webp"
              alt="DJ Logo"
              className="h-10 md:h-10 w-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`relative text-sm font-semibold transition-colors duration-300 ${
                    activeSection === item
                      ? 'text-[#fe9511]'
                      : 'text-[#b2a9aa] hover:text-white'
                  }`}
                  style={{ fontFamily: 'Syncopate, sans-serif' }}
                >
                  {item}
                  {activeSection === item && (
                    <motion.div
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#fe9511] rounded-full"
                      layoutId="activeBar"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
              
              {/* User Icon for Login */}
              <button 
                className="text-[#b2a9aa] hover:text-[#fe9511] transition-colors"
                onClick={() => router.push('/auth')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button 
              className="text-[#fe9511] p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile Menu Dropdown - Updated Glassmorphism */}
        {isMobile && (
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="backdrop-blur-md rounded-b-2xl overflow-hidden border-t border-white/10"
              >
                <div className="px-6 py-4 space-y-4">
                  {menuItems.map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className={`block w-full text-left font-semibold transition-colors duration-300 ${
                        activeSection === item
                          ? 'text-[#fe9511]'
                          : 'text-[#b2a9aa] hover:text-white'
                      }`}
                      style={{ fontFamily: 'Syncopate, sans-serif' }}
                    >
                      {item}
                    </button>
                  ))}
                  
                  {/* Login Option */}
                  <button 
                    className="block w-full text-left text-[#b2a9aa] hover:text-[#fe9511] font-semibold transition-colors duration-300"
                    onClick={() => router.push('/auth')}
                    style={{ fontFamily: 'Syncopate, sans-serif' }}
                  >
                    LOGIN
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.nav>

      {/* Bottom Action Buttons with Glassmorphism */}
      <motion.div 
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 flex items-center gap-4 bg-black/20 backdrop-blur-md rounded-full p-2 border border-white/10 shadow-lg"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <motion.button
          onClick={handleGetQuote}
          className="bg-[#fe9511] text-black px-4 py-3 font-bold text-sm rounded-full hover:bg-[#fe9511]/90 transition-colors duration-300 flex items-center gap-2 whitespace-nowrap"
          style={{ fontFamily: 'Archivo Black, sans-serif' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          GET A QUOTE
        </motion.button>

        {/* AI Chat Button with Larger & Centered Minimalist Robot Icon */}
        <motion.button 
          onClick={handleAIAssistant}
          className="bg-[#333] text-[#fe9511] p-3 rounded-full hover:bg-[#444] transition-colors duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"   // más grande que antes
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Antena */}
            <circle cx="12" cy="3" r="1" />
            <line x1="12" y1="4" x2="12" y2="6" />

            {/* Cabeza */}
            <rect x="6" y="6" width="12" height="10" rx="2" />

            {/* Ojos */}
            <circle cx="9" cy="11" r="1" />
            <circle cx="15" cy="11" r="1" />

            {/* Boca */}
            <line x1="9" y1="14" x2="15" y2="14" />
          </svg>
        </motion.button>

      </motion.div>

      {/* Scroll Indicator - Only visible on HOME */}
      {activeSection === 'HOME' && (
        <motion.div
          className="absolute bottom-20 md:bottom-24 left-1/2 transform -translate-x-1/2 z-30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[#fe9511]"
          >
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default DJLandingPage;