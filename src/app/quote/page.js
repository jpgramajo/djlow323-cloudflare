'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import '@fontsource/archivo-black';
import '@fontsource/syncopate';
import '@fontsource/roboto';
import AIChat from '../../components/AIChat';
import Footer from '../../components/Footer';

const QuotePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('form');
  const [formData, setFormData] = useState({
    eventType: '',
    customEventType: '',
    firstName: '',
    lastName: '',
    email: '',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    eventDetails: ''
  });

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

  const timeSlots = [
    { value: 'morning', label: 'Morning (9 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 6 PM)' },
    { value: 'evening', label: 'Evening (6 PM - 12 AM)' }
  ];

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'ai') {
      setActiveTab('ai');
    } else {
      setActiveTab('form');
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! Your request has been sent. We will contact you soon.');
  };

  const goBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-black border-b border-[#b2a9aa]/20 py-6 px-6 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={goBack}
              className="text-[#b2a9aa] hover:text-[#fe9511] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <img src="/images/logo.webp" alt="DJLOW323" className="h-12 w-auto" />
            <h1 className="text-2xl md:text-3xl font-bold text-[#fe9511]" style={{ fontFamily: 'Archivo Black, sans-serif' }}>
              GET A QUOTE
            </h1>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-[#1a1a1a] border-b border-[#b2a9aa]/20 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('form')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors relative ${
                activeTab === 'form' 
                  ? 'border-[#fe9511] text-[#fe9511]' 
                  : 'border-transparent text-[#b2a9aa] hover:text-white'
              }`}
              style={{ fontFamily: 'Syncopate, sans-serif' }}
            >
              FORM
              {activeTab === 'form' && (
                <motion.div
                  className="absolute inset-0 bg-[#fe9511]/10 rounded-t-lg"
                  layoutId="activeTabBg"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors relative ${
                activeTab === 'ai' 
                  ? 'border-[#fe9511] text-[#fe9511]' 
                  : 'border-transparent text-[#b2a9aa] hover:text-white'
              }`}
              style={{ fontFamily: 'Syncopate, sans-serif' }}
            >
              AI ASSISTANT
              {activeTab === 'ai' && (
                <motion.div
                  className="absolute inset-0 bg-[#fe9511]/10 rounded-t-lg"
                  layoutId="activeTabBg"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={activeTab === 'ai' ? 'flex-1 flex flex-col' : 'max-w-7xl mx-auto px-6 py-12'}>
        <AnimatePresence mode="wait">
          {activeTab === 'form' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-[#1a1a1a] border border-[#fe9511]/20 rounded-lg p-8">
                <h2 className="text-3xl font-bold text-[#fe9511] mb-8 text-center"
                    style={{ fontFamily: 'Archivo Black, sans-serif' }}>
                  Event Quote Request
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Syncopate, sans-serif' }}>
                      Personal Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#b2a9aa] text-sm font-medium mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="w-full bg-black border border-[#b2a9aa]/20 rounded px-4 py-3 text-white focus:border-[#fe9511] focus:outline-none transition-colors"
                          placeholder="Your first name"
                        />
                      </div>
                      <div>
                        <label className="block text-[#b2a9aa] text-sm font-medium mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className="w-full bg-black border border-[#b2a9aa]/20 rounded px-4 py-3 text-white focus:border-[#fe9511] focus:outline-none transition-colors"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-[#b2a9aa] text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-black border border-[#b2a9aa]/20 rounded px-4 py-3 text-white focus:border-[#fe9511] focus:outline-none transition-colors"
                        placeholder="your-email@example.com"
                      />
                    </div>
                  </div>

                  {/* Event Information */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Syncopate, sans-serif' }}>
                      Event Details
                    </h3>
                    
                    <div className="mb-4">
                      <label className="block text-[#b2a9aa] text-sm font-medium mb-2">
                        Event Type *
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                        required
                        className="w-full bg-black border border-[#b2a9aa]/20 rounded px-4 py-3 text-white focus:border-[#fe9511] focus:outline-none transition-colors"
                      >
                        <option value="">Select event type</option>
                        {eventTypes.map((type, index) => (
                          <option key={index} value={type.toLowerCase().replace(/\s+/g, '-')}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {formData.eventType === 'other' && (
                      <div className="mb-4">
                        <label className="block text-[#b2a9aa] text-sm font-medium mb-2">
                          Please specify event type *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.customEventType}
                          onChange={(e) => setFormData({...formData, customEventType: e.target.value})}
                          className="w-full bg-black border border-[#b2a9aa]/20 rounded px-4 py-3 text-white focus:border-[#fe9511] focus:outline-none transition-colors"
                          placeholder="Please specify your event type"
                        />
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-[#b2a9aa] text-sm font-medium mb-2">
                          Event Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.eventDate}
                          onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                          className="w-full bg-black border border-[#b2a9aa]/20 rounded px-4 py-3 text-white focus:border-[#fe9511] focus:outline-none transition-colors"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-[#b2a9aa] text-sm font-medium mb-2">
                          Approximate Time *
                        </label>
                        <select
                          value={formData.eventTime}
                          onChange={(e) => setFormData({...formData, eventTime: e.target.value})}
                          required
                          className="w-full bg-black border border-[#b2a9aa]/20 rounded px-4 py-3 text-white focus:border-[#fe9511] focus:outline-none transition-colors"
                        >
                          <option value="">Select time</option>
                          {timeSlots.map((slot) => (
                            <option key={slot.value} value={slot.value}>
                              {slot.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-[#b2a9aa] text-sm font-medium mb-2">
                        Event Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.eventLocation}
                        onChange={(e) => setFormData({...formData, eventLocation: e.target.value})}
                        className="w-full bg-black border border-[#b2a9aa]/20 rounded px-4 py-3 text-white focus:border-[#fe9511] focus:outline-none transition-colors"
                        placeholder="City, venue name, or address"
                      />
                    </div>

                    <div>
                      <label className="block text-[#b2a9aa] text-sm font-medium mb-2">
                        Additional Details
                      </label>
                      <textarea
                        value={formData.eventDetails}
                        onChange={(e) => setFormData({...formData, eventDetails: e.target.value})}
                        rows={4}
                        className="w-full bg-black border border-[#b2a9aa]/20 rounded px-4 py-3 text-white focus:border-[#fe9511] focus:outline-none transition-colors resize-none"
                        placeholder="Tell us more about your event, special requests, number of guests, etc."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 text-center">
                    <button
                      type="submit"
                      className="bg-[#fe9511] text-black px-12 py-4 rounded-lg font-bold text-lg hover:bg-[#fe9511]/90 transition-colors transform hover:scale-105"
                      style={{ fontFamily: 'Archivo Black, sans-serif' }}
                    >
                      SEND REQUEST
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              {/* AI Chat Component - Full Page Version */}
              <AIChat 
                fullPage={true} 
                formData={formData}
                onFormDataChange={setFormData}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer - Only show for form tab */}
      {activeTab === 'form' && <Footer />}
    </div>
  );
};

export default QuotePage;