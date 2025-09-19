'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SocialIcon } from 'react-social-icons';
import { useRouter } from 'next/navigation';
import '@fontsource/archivo-black';
import '@fontsource/syncopate';
import '@fontsource/roboto';
import AIChat from '../components/AIChat';
import Footer from '../components/Footer';

const DJLandingPage = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('HOME');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
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

  const socialLinks = [
    { url: 'https://www.tiktok.com/@djlow323', platform: 'tiktok' },
    { url: 'https://open.spotify.com/user/djlow323', platform: 'spotify' },
    { url: 'https://www.facebook.com/DjLow.LasVegas', platform: 'facebook' },
    { url: 'https://x.com/DJLOW323', platform: 'twitter' },
    { url: 'https://www.instagram.com/djlow323', platform: 'instagram' },
    { url: 'https://www.youtube.com/@DjLowMixes', platform: 'youtube' },
    { url: 'https://www.mixcloud.com/djlow323/', platform: 'mixcloud' }
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

  const packages = [
    {
      name: "BASIC",
      price: "$299",
      duration: "3 Hours",
      features: [
        "Professional DJ Setup",
        "Music Library Access",
        "Basic Lighting",
        "Microphone for Announcements",
        "Setup & Breakdown"
      ]
    },
    {
      name: "PREMIUM",
      price: "$499",
      duration: "5 Hours",
      features: [
        "Everything in Basic",
        "Enhanced Sound System",
        "LED Party Lights",
        "Fog Machine",
        "Custom Music Requests",
        "Photo Booth Props"
      ],
      popular: true
    },
    {
      name: "ELITE",
      price: "$799",
      duration: "8 Hours",
      features: [
        "Everything in Premium",
        "Live Mixing Performance",
        "Professional MC Services",
        "Custom Event Planning",
        "Social Media Live Streaming"
      ]
    }
  ];

  const faqData = [
    {
      question: "What type of events do you cover?",
      answer: "I cover all types of events: weddings, birthdays, quinceañeras, corporate events, private parties and more."
    },
    {
      question: "Do you bring your own equipment?",
      answer: "Yes, I bring all the necessary professional equipment: DJ console, sound system, microphones, LED lights and special effects depending on the package selected."
    },
    {
      question: "Can I request specific music?",
      answer: "Absolutely! We work together to create the perfect playlist. You can send me your favorite song list and I'll make sure to include them in your event."
    },
    {
      question: "What areas do you cover in Las Vegas?",
      answer: "I cover the entire Las Vegas metropolitan area, Nevada, including Henderson, Summerlin, North Las Vegas and surrounding areas."
    }
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

  const renderHomeSection = () => (
    <section 
      ref={sectionRefs.HOME}
      data-section="HOME"
      className="relative w-full h-screen overflow-hidden"
    >
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-40">
        <motion.img 
          src="/images/logo.webp" 
          alt="DJ Logo" 
          className="h-16 md:h-24 w-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>

      {/* Login Button */}
      <div className="absolute top-8 right-8 z-40">
        <motion.button
          onClick={() => router.push('/auth')}
          className="bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#fe9511]/20 text-[#fe9511] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#fe9511] hover:text-black transition-all duration-300"
          style={{ fontFamily: 'Syncopate, sans-serif' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          LOGIN
        </motion.button>
      </div>

      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={handleVideoLoad}
      >
        <source src="/videos/video.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {!isVideoLoaded && (
        <img className='absolute top-0 left-0 w-full h-full object-cover' src='/images/main-image.webp'></img>
      )}
    </section>
  );

  const renderServicesSection = () => (
    <section 
      ref={sectionRefs.SERVICES}
      data-section="SERVICES"
      className="min-h-screen bg-black py-20 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center text-[#fe9511] mb-16"
            style={{ fontFamily: 'Archivo Black, sans-serif' }}>
          SERVICES
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="/assets/dj-console-pc.webp" 
              alt="DJ Services" 
              className="w-full rounded-lg shadow-2xl"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-[#fe9511] mb-6" style={{ fontFamily: 'Syncopate, sans-serif' }}>
              Professional DJ Services
            </h3>
            <p className="text-[#b2a9aa] mb-6 leading-relaxed">
              With years of experience I bring professional DJ services to make your event unforgettable. 
              From weddings to corporate events, I provide the perfect soundtrack for your special occasion.
            </p>
            <ul className="space-y-3 text-[#b2a9aa]">
              <li className="flex items-start">
                <span className="text-[#fe9511] mr-2">✓</span>
                <span>High-quality sound systems and professional equipment</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fe9511] mr-2">✓</span>
                <span>Extensive music library across all genres</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fe9511] mr-2">✓</span>
                <span>Custom playlists tailored to your event</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fe9511] mr-2">✓</span>
                <span>Lighting and special effects</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#fe9511] mr-2">✓</span>
                <span>Professional MC services</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Weddings",
              image: "/assets/better.webp",
              description: "Create the perfect atmosphere for your special day with a customized music selection."
            },
            {
              title: "Corporate Events",
              image: "/assets/corporate.webp",
              description: "Professional entertainment for company parties, conferences, and team-building events."
            },
            {
              title: "Private Parties",
              image: "/assets/quince.webp",
              description: "Birthdays, anniversaries, or any celebration that deserves great music."
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 100, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
            >
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex flex-col justify-end p-6">
                <h4 className="text-xl font-bold text-white mb-2">{service.title}</h4>
                <p className="text-white">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );

  const renderPlansSection = () => (
    <section 
      ref={sectionRefs.PLANS}
      data-section="PLANS"
      className="min-h-screen bg-black py-20 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center text-[#fe9511] mb-16"
            style={{ fontFamily: 'Archivo Black, sans-serif' }}>
          PLANS
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative bg-[#1a1a1a] border-2 rounded-lg p-8 ${
                pkg.popular ? 'border-[#fe9511] scale-105' : 'border-[#b2a9aa]/20'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#fe9511] text-black px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold text-[#fe9511] mb-2" style={{ fontFamily: 'Syncopate, sans-serif' }}>
                {pkg.name}
              </h3>
              <p className="text-[#b2a9aa] mb-6">{pkg.duration}</p>
              <ul className="space-y-3">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="text-[#b2a9aa] flex items-start">
                    <span className="text-[#fe9511] mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => router.push('/quote?mode=form')}
                className="w-full bg-[#fe9511] text-black py-3 rounded font-bold mt-6 hover:bg-[#fe9511]/90 transition-colors"
                style={{ fontFamily: 'Archivo Black, sans-serif' }}
              >
                GET A QUOTE
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );

  const renderAboutSection = () => (
    <section 
      ref={sectionRefs.ABOUT}
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

  const renderGallerySection = () => (
    <section 
      ref={sectionRefs.GALLERY}
      data-section="GALLERY"
      className="min-h-screen bg-black py-20 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center text-[#fe9511] mb-16"
            style={{ fontFamily: 'Archivo Black, sans-serif' }}>
          GALLERY
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { src: '/assets/quince.webp', title: 'Quinceañera' },
            { src: '/assets/reveal.webp', title: 'Gender Reveal' },
            { src: '/assets/better.webp', title: 'Private Event' },
            { src: '/assets/console-dj.webp', title: 'Professional Setup' },
            { src: '/assets/dj-console-pc.webp', title: 'Studio Setup' },
            { src: '/assets/setup2.webp', title: 'Equipment' },
            { src: '/assets/1.webp', title: 'DJLOW323' },
            { src: '/assets/dj-low-cover-logo-h.webp', title: 'Brand' }
          ].map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg"
            >
              <img 
                src={image.src} 
                alt={image.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-bold">{image.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );

  const renderFAQSection = () => (
    <section 
      ref={sectionRefs.FAQ}
      data-section="FAQ"
      className="min-h-screen bg-black py-20 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center text-[#fe9511] mb-16"
            style={{ fontFamily: 'Archivo Black, sans-serif' }}>
          FAQ
        </h2>

        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#1a1a1a] border border-[#b2a9aa]/20 rounded-lg p-6"
            >
              <h3 className="text-lg font-bold text-[#fe9511] mb-3"
                  style={{ fontFamily: 'Syncopate, sans-serif' }}>
                {faq.question}
              </h3>
              <p className="text-[#b2a9aa] leading-relaxed"
                 style={{ fontFamily: 'Roboto, sans-serif' }}>
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );

  const renderContactSection = () => (
    <section 
      ref={sectionRefs.CONTACT}
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

      {/* All sections */}
      {renderHomeSection()}
      {renderServicesSection()}
      {renderPlansSection()}
      {renderAboutSection()}
      {renderGallerySection()}
      {renderFAQSection()}
      {renderContactSection()}
      <Footer scrollToSection={scrollToSection} menuItems={menuItems} />

      {/* Navigation Bar - Desktop */}
      {!isMobile && (
        <motion.div 
          className="fixed bottom-0 left-0 w-full bg-black/95 backdrop-blur-sm border-t border-[#b2a9aa]/20 z-50"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex space-x-8">
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
                      className="absolute -bottom-6 left-0 w-full h-1 bg-[#fe9511]"
                      layoutId="activeBar"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <motion.button
              onClick={() => router.push('/quote?mode=form')}
              className="bg-[#fe9511] text-black px-6 py-2 font-bold text-sm rounded hover:bg-[#fe9511]/90 transition-colors duration-300"
              style={{ fontFamily: 'Archivo Black, sans-serif' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GET A QUOTE
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Navigation Bar - Mobile */}
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
              onClick={() => router.push('/quote?mode=form')}
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

      {/* AI Chat Component */}
      <AIChat />
    </div>
  );
};

export default DJLandingPage;