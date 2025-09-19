'use client';

import { motion } from 'framer-motion';

const ServicesSection = ({ sectionRef }) => {
  return (
    <section
      ref={sectionRef}
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
};

export default ServicesSection;