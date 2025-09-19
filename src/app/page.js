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
import GallerySection from '../components/sections/GallerySection';
import FAQSection from '../components/sections/FAQSection';
import ContactSection from '../components/sections/ContactSection';

// Import other components
import AIChat from '../components/AIChat';
import Footer from '../components/Footer';

const DJLandingPage = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('HOME');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para controlar menú móvil
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
    GALLERY: useRef(null),
    FAQ: useRef(null),
    CONTACT: useRef(null)
  };

  const menuItems = [
    'HOME',
    'SERVICES',
    'PLANS',
    'ABOUT',
    'GALLERY',
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
    setIsMobileMenuOpen(false); // Cerrar menú móvil después de hacer clic
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

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    console.log('Booking form submitted:', bookingForm);
    alert('Thank you! Your request has been sent. We will contact you soon.');
    setShowBookingForm(false);
    setBookingForm({
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
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Booking Form Modal */}
      <AnimatePresence>
        {showBookingForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowBookingForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1a1a1a] border border-[#fe9511]/20 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold text-[#fe9511] mb-6 text-center"
                  style={{ fontFamily: 'Archivo Black, sans-serif' }}>
                GET A QUOTE
              </h2>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={bookingForm.firstName}
                    onChange={(e) => setBookingForm({...bookingForm, firstName: e.target.value})}
                    className="bg-black border border-[#b2a9aa]/20 rounded px-4 py-3 text-white focus:border-[#fe9511] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    value={bookingForm.lastName}
                    onChange={(e) => setBookingForm({...bookingForm, lastName: e.target.value})}
                    className="bg-black border border-[#b2a9aa]/20 rounded px-4 py-3 text-white focus:border-[#fe9511] focus:outline-none"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                  className="bg-black border border-[#b2a9aa]/20 rounded px-4 py-3 text-white focus:border-[#fe9511] focus:outline-none w-full"
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="date"
                    placeholder="Event Date"
                    required
                    value={bookingForm.eventDate}
                    onChange={(e) => setBookingForm({...bookingForm, eventDate: e.target.value})}
                    className="bg-black border border-[#b2a9aa]/20 rounded px-4 py-3 text-white focus:border-[#fe9511] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Approximate Time (e.g. 7:00 PM)"
                    value={bookingForm.eventTime}
                    onChange={(e) => setBookingForm({...bookingForm, eventTime: e.target.value})}
                    className="bg-black border border-[#b2a9aa]/20 rounded px-4 py-3 text-white focus:border-[#fe9511] focus:outline-none"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Event Location"
                  required
                  value={bookingForm.eventLocation}
                  onChange={(e) => setBookingForm({...bookingForm, eventLocation: e.target.value})}
                  className="bg-black border border-[#b2a9aa]/20 rounded px-4 py-3 text-white focus:border-[#fe9511] focus:outline-none w-full"
                />

                <select
                  value={bookingForm.eventType}
                  onChange={(e) => setBookingForm({...bookingForm, eventType: e.target.value})}
                  required
                  className="bg-black border border-[#b2a9aa]/20 rounded px-4 py-3 text-white focus:border-[#fe9511] focus:outline-none w-full"
                >
                  <option value="">Event Type</option>
                  {eventTypes.map((type, index) => (
                    <option key={index} value={type.toLowerCase().replace(/\s+/g, '-')}>
                      {type}
                    </option>
                  ))}
                </select>

                {bookingForm.eventType === 'other' && (
                  <input
                    type="text"
                    placeholder="Please specify event type"
                    value={bookingForm.customEventType}
                    onChange={(e) => setBookingForm({...bookingForm, customEventType: e.target.value})}
                    className="bg-black border border-[#b2a9aa]/20 rounded px-4 py-3 text-white focus:border-[#fe9511] focus:outline-none w-full"
                  />
                )}

                <textarea
                  placeholder="Event Details / Special Requests"
                  value={bookingForm.eventDetails}
                  onChange={(e) => setBookingForm({...bookingForm, eventDetails: e.target.value})}
                  rows={4}
                  className="bg-black border border-[#b2a9aa]/20 rounded px-4 py-3 text-white focus:border-[#fe9511] focus:outline-none w-full resize-none"
                />

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 bg-[#b2a9aa] text-black py-3 rounded font-bold hover:bg-[#b2a9aa]/80 transition-colors"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#fe9511] text-black py-3 rounded font-bold hover:bg-[#fe9511]/90 transition-colors"
                    style={{ fontFamily: 'Archivo Black, sans-serif' }}
                  >
                    SEND REQUEST
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All sections using components */}
      <HomeSection
        sectionRef={sectionRefs.HOME}
        handleVideoLoad={handleVideoLoad}
        isVideoLoaded={isVideoLoaded}
      />
      <ServicesSection sectionRef={sectionRefs.SERVICES} />
      <PlansSection sectionRef={sectionRefs.PLANS} />
      <AboutSection sectionRef={sectionRefs.ABOUT} />
      <GallerySection sectionRef={sectionRefs.GALLERY} />
      <FAQSection sectionRef={sectionRefs.FAQ} />
      <ContactSection sectionRef={sectionRefs.CONTACT} />

      <Footer scrollToSection={scrollToSection} menuItems={menuItems} />

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
                onClick={() => router.push('/login')}
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

        {/* Mobile Menu Dropdown */}
        {isMobile && (
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-black/80 backdrop-blur-md rounded-b-2xl overflow-hidden"
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
                    onClick={() => router.push('/login')}
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

      {/* Bottom Action Buttons with Glassmorphism - Only for Desktop */}
      {!isMobile && (
        <motion.div 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex items-center gap-4 bg-black/20 backdrop-blur-md rounded-full p-2 border border-white/10 shadow-lg"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.button
            onClick={() => setShowBookingForm(true)}
            className="bg-[#fe9511] text-black px-6 py-3 font-bold text-sm rounded-full hover:bg-[#fe9511]/90 transition-colors duration-300 flex items-center gap-2"
            style={{ fontFamily: 'Archivo Black, sans-serif' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            GET A QUOTE
          </motion.button>

          {/* AI Chat Button with Lightbulb Icon */}
          <button className="bg-[#333] text-[#fe9511] p-3 rounded-full hover:bg-[#444] transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </button>
        </motion.div>
      )}

      {/* Mobile Navigation Bar - Bottom (Existing) */}
      {isMobile && (
        <motion.div
          className="fixed bottom-0 left-0 w-full bg-black/95 backdrop-blur-sm border-t border-[#b2a9aa]/20 z-50"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleMobileNavigation('prev')}
                className="text-[#fe9511] p-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="text-center min-w-0 flex-1">
                <motion.button
                  key={currentMobileIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={() => scrollToSection(menuItems[currentMobileIndex])}
                  className={`text-xs font-semibold ${
                    activeSection === menuItems[currentMobileIndex]
                      ? 'text-[#fe9511]'
                      : 'text-[#b2a9aa]'
                  }`}
                  style={{ fontFamily: 'Syncopate, sans-serif' }}
                >
                  {menuItems[currentMobileIndex]}
                </motion.button>
                <div className="flex justify-center mt-1">
                  <motion.div
                    className="w-8 h-0.5 bg-[#fe9511]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeSection === menuItems[currentMobileIndex] ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <button
                onClick={() => handleMobileNavigation('next')}
                className="text-[#fe9511] p-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <motion.button
              onClick={() => setShowBookingForm(true)}
              className="bg-[#fe9511] text-black px-3 py-1.5 font-bold text-xs rounded hover:bg-[#fe9511]/90 transition-colors duration-300 ml-4"
              style={{ fontFamily: 'Archivo Black, sans-serif' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GET A QUOTE
            </motion.button>
          </div>
        </motion.div>
      )}

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

      {/* AI Chat Component - Hidden on desktop as it's now in the bottom bar */}
      {isMobile && <AIChat />}
    </div>
  );
};

export default DJLandingPage;