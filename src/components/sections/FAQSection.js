'use client';

import { motion } from 'framer-motion';

const FAQSection = ({ sectionRef }) => {
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

  return (
    <section
      ref={sectionRef}
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
};

export default FAQSection;