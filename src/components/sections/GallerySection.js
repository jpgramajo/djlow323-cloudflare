'use client';

import { motion } from 'framer-motion';

const GallerySection = ({ sectionRef }) => {
  const galleryImages = [
    { src: '/assets/quince.webp', title: 'Quinceañera' },
    { src: '/assets/reveal.webp', title: 'Gender Reveal' },
    { src: '/assets/better.webp', title: 'Private Event' },
    { src: '/assets/console-dj.webp', title: 'Professional Setup' },
    { src: '/assets/dj-console-pc.webp', title: 'Studio Setup' },
    { src: '/assets/setup2.webp', title: 'Equipment' },
    { src: '/assets/1.webp', title: 'DJLOW323' },
    { src: '/assets/dj-low-cover-logo-h.webp', title: 'Brand' }
  ];

  return (
    <section
      ref={sectionRef}
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
          {galleryImages.map((image, index) => (
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
};

export default GallerySection;