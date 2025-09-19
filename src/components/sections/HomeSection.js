'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const HomeSection = ({ sectionRef, handleVideoLoad, isVideoLoaded }) => {
  const router = useRouter();

  return (
    <section
      ref={sectionRef}
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
};

export default HomeSection;