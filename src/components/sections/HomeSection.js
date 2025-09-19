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