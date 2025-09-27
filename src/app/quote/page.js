'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, User, Calendar, MapPin, MessageSquare, FileText, Sparkles, Send, Bot, CheckCircle } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';
import Footer from '../../components/Footer';

const QuotePageContent = () => {
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

  // AI Chat State
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [canSend, setCanSend] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [hasInitialized, setHasInitialized] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [dateComponents, setDateComponents] = useState({
    month: '',
    day: '',
    year: ''
  });
  const messagesEndRef = useRef(null);
  const turnstileRef = useRef(null);

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

  const aiEventTypes = [
    { value: 'wedding', label: 'Wedding' },
    { value: 'birthday', label: 'Birthday Party' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'other', label: 'Other' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Generate arrays for date selectors
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const days = Array.from({ length: 31 }, (_, i) => {
    const day = (i + 1).toString().padStart(2, '0');
    return { value: day, label: day };
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => {
    const year = currentYear + i;
    return { value: year.toString(), label: year.toString() };
  });

  const formatDateFromComponents = (month, day, year) => {
    if (month && day && year) {
      return `${year}-${month}-${day}`;
    }
    return '';
  };

  const updateFormDataDate = (month, day, year) => {
    const formattedDate = formatDateFromComponents(month, day, year);
    setFormData(prev => ({ ...prev, eventDate: formattedDate }));
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'ai') {
      setActiveTab('ai');
    } else {
      setActiveTab('form');
    }
  }, [searchParams]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addMessage = (text, sender, type = 'text') => {
    const newMessage = {
      id: Date.now() + Math.random(),
      text,
      sender,
      type,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = async () => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsTyping(false);
  };

  const startAIChat = async () => {
    if (hasInitialized) return;
    
    setHasInitialized(true);
    setMessages([]);
    
    await simulateTyping();
    addMessage("Hello! I'm DJLOW's virtual assistant. I'll help you get a personalized quote for your event. What type of event are you planning?", 'ai');
    setCurrentStep('eventType');
  };

  useEffect(() => {
    if (activeTab === 'ai' && !hasInitialized) {
      startAIChat();
    }
  }, [activeTab, hasInitialized]);

  const handleAISendResponse = async () => {
    setCanSend(false);
    
    if (currentStep === 'eventType' && selectedOption) {
      const selectedType = aiEventTypes.find(type => type.value === selectedOption);
      addMessage(selectedType.label, 'user');
      
      setFormData(prev => ({ ...prev, eventType: selectedOption }));
      setSelectedOption('');

      await simulateTyping();
      addMessage("Perfect! Now I need your full name to personalize the quote.", 'ai');
      setCurrentStep('fullName');
    } else if (currentStep === 'fullName' && userInput.trim()) {
      addMessage(userInput.trim(), 'user');
      
      const names = userInput.trim().split(' ');
      setFormData(prev => ({ 
        ...prev,
        firstName: names[0] || '',
        lastName: names.slice(1).join(' ') || ''
      }));
      setUserInput('');

      await simulateTyping();
      addMessage("Great! Now I need your email to send you the detailed quote.", 'ai');
      setCurrentStep('email');
    } else if (currentStep === 'email' && userInput.trim()) {
      if (!validateEmail(userInput.trim())) {
        addMessage(userInput.trim(), 'user');
        setUserInput('');
        
        await simulateTyping();
        addMessage("Please enter a valid email address. For example: your-email@example.com", 'ai');
        return;
      }

      addMessage(userInput.trim(), 'user');
      setFormData(prev => ({ ...prev, email: userInput.trim() }));
      setUserInput('');

      await simulateTyping();
      addMessage("Excellent! When will your event be? Select the date.", 'ai');
      setCurrentStep('eventDate');
    } else if (currentStep === 'eventDate' && selectedOption) {
      const formattedDate = new Date(selectedOption).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      addMessage(formattedDate, 'user');
      setFormData(prev => ({ ...prev, eventDate: selectedOption }));
      setSelectedOption('');

      await simulateTyping();
      addMessage("What approximate time will the event be?", 'ai');
      setCurrentStep('eventTime');
    } else if (currentStep === 'eventTime' && selectedOption) {
      const selectedTime = timeSlots.find(slot => slot.value === selectedOption);
      addMessage(selectedTime.label, 'user');
      
      setFormData(prev => ({ ...prev, eventTime: selectedOption }));
      setSelectedOption('');

      await simulateTyping();
      addMessage("Finally, where will the event take place? (City, specific venue)", 'ai');
      setCurrentStep('eventLocation');
    } else if (currentStep === 'eventLocation' && userInput.trim()) {
      addMessage(userInput.trim(), 'user');
      setFormData(prev => ({ ...prev, eventLocation: userInput.trim() }));
      setUserInput('');

      await simulateTyping();
      addMessage("Great! One last question: Do you have any additional details or special requests for your event? (number of guests, music preferences, special equipment, etc.) You can also just say 'none' if you don't have any.", 'ai');
      setCurrentStep('eventDetails');
    } else if (currentStep === 'eventDetails' && userInput.trim()) {
      addMessage(userInput.trim(), 'user');
      const details = userInput.trim().toLowerCase() === 'none' ? '' : userInput.trim();
      setFormData(prev => ({ ...prev, eventDetails: details }));
      setUserInput('');

      await simulateTyping();
      addMessage("Perfect! I have all the necessary information. Let me process your request...", 'ai');

      // Send the actual quote request
      setTimeout(async () => {
        if (!turnstileToken) {
          await simulateTyping();
          addMessage("I need you to complete the security verification first. Please check the widget above and try again.", 'ai');
          setCurrentStep('eventDetails'); // Go back to allow retry
          return;
        }

        // Get the updated formData with the eventDetails
        const finalFormData = {
          ...formData,
          eventDetails: details
        };

        try {
          const response = await fetch('/api/request_quote', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...finalFormData,
              turnstileToken: turnstileToken
            }),
          });

          const result = await response.json();

          await simulateTyping();
          if (response.ok) {
            const eventTypeLabel = aiEventTypes.find(t => t.value === finalFormData.eventType)?.label || 'event';
            addMessage(`All set! I've sent your quote request. We'll contact you soon at ${finalFormData.email} with a personalized proposal for your ${eventTypeLabel.toLowerCase()}. Thank you for choosing DJLOW323! 🎉`, 'ai');
            setCurrentStep('completed');

            // Reset Turnstile
            setTurnstileToken('');
            if (turnstileRef.current) {
              turnstileRef.current.reset();
            }
          } else {
            addMessage(`I'm sorry, there was an error sending your request: ${result.message}. Please try again or use the traditional form.`, 'ai');
            setCurrentStep('eventDetails'); // Allow retry
          }
        } catch (error) {
          console.error('AI Chat API Error:', error);
          await simulateTyping();
          addMessage("I'm sorry, there was a network error. Please check your connection and try again, or use the traditional form.", 'ai');
          setCurrentStep('eventDetails'); // Allow retry
        }
      }, 2000);
    }
  };

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    setCanSend(true);
  };

  const handleInputChange = (value) => {
    setUserInput(value);
    setCanSend(value.trim().length > 0);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!turnstileToken) {
      alert('Please complete the security verification first.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/request_quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken: turnstileToken
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage(result.message);
        // Reset form
        setFormData({
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
        // Reset date components
        setDateComponents({
          month: '',
          day: '',
          year: ''
        });
        // Reset Turnstile
        setTurnstileToken('');
        if (turnstileRef.current) {
          turnstileRef.current.reset();
        }
      } else {
        setSubmitMessage(result.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    router.push('/');
  };

  const renderAIChatInput = () => {
    if (currentStep === 'eventType') {
      return (
        <div className="relative p-6 space-y-4">
          <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm rounded-b-3xl"></div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              {aiEventTypes.map((type) => (
                <motion.button
                  key={type.value}
                  onClick={() => handleOptionSelect(type.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    selectedOption === type.value
                      ? 'bg-gradient-to-r from-orange-400 to-amber-400 text-black'
                      : 'bg-white/[0.08] backdrop-blur-md border border-white/20 text-white hover:border-orange-400/30'
                  }`}
                >
                  {selectedOption === type.value && (
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10 rounded-xl"></div>
                  )}
                  <span className="relative">{type.label}</span>
                </motion.button>
              ))}
            </div>
            <motion.button
              onClick={handleAISendResponse}
              disabled={!canSend || !selectedOption}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn relative w-full mt-4 overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10"></div>
              
              <div className="relative flex items-center justify-center py-3 font-semibold text-black">
                <Send className="w-5 h-5 mr-2" />
                Send
              </div>
              
              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
              </div>
            </motion.button>
          </div>
        </div>
      );
    }

    if (currentStep === 'eventDate') {
      return (
        <div className="relative p-6 space-y-4">
          <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm rounded-b-3xl"></div>
          <div className="relative space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400/10 rounded-xl blur-md opacity-0 focus-within:opacity-100 transition-all duration-300"></div>
              <div className="relative flex gap-2">
                {/* Month Selector */}
                <select
                  value={dateComponents.month}
                  onChange={(e) => {
                    const newMonth = e.target.value;
                    setDateComponents(prev => ({ ...prev, month: newMonth }));
                    const formattedDate = formatDateFromComponents(newMonth, dateComponents.day, dateComponents.year);
                    if (formattedDate) {
                      setSelectedOption(formattedDate);
                      setCanSend(true);
                    }
                  }}
                  className="flex-1 bg-white/[0.08] backdrop-blur-md border border-white/20 rounded-xl px-3 py-3 text-white focus:border-blue-400/50 focus:outline-none transition-all duration-300 appearance-none text-sm"
                >
                  <option value="" className="bg-slate-900">Month</option>
                  {months.map((month) => (
                    <option key={month.value} value={month.value} className="bg-slate-900">
                      {month.label}
                    </option>
                  ))}
                </select>

                <span className="text-white/60 self-center">/</span>

                {/* Day Selector */}
                <select
                  value={dateComponents.day}
                  onChange={(e) => {
                    const newDay = e.target.value;
                    setDateComponents(prev => ({ ...prev, day: newDay }));
                    const formattedDate = formatDateFromComponents(dateComponents.month, newDay, dateComponents.year);
                    if (formattedDate) {
                      setSelectedOption(formattedDate);
                      setCanSend(true);
                    }
                  }}
                  className="flex-1 bg-white/[0.08] backdrop-blur-md border border-white/20 rounded-xl px-3 py-3 text-white focus:border-blue-400/50 focus:outline-none transition-all duration-300 appearance-none text-sm"
                >
                  <option value="" className="bg-slate-900">Day</option>
                  {days.map((day) => (
                    <option key={day.value} value={day.value} className="bg-slate-900">
                      {day.label}
                    </option>
                  ))}
                </select>

                <span className="text-white/60 self-center">/</span>

                {/* Year Selector */}
                <select
                  value={dateComponents.year}
                  onChange={(e) => {
                    const newYear = e.target.value;
                    setDateComponents(prev => ({ ...prev, year: newYear }));
                    const formattedDate = formatDateFromComponents(dateComponents.month, dateComponents.day, newYear);
                    if (formattedDate) {
                      setSelectedOption(formattedDate);
                      setCanSend(true);
                    }
                  }}
                  className="flex-1 bg-white/[0.08] backdrop-blur-md border border-white/20 rounded-xl px-3 py-3 text-white focus:border-blue-400/50 focus:outline-none transition-all duration-300 appearance-none text-sm"
                >
                  <option value="" className="bg-slate-900">Year</option>
                  {years.map((year) => (
                    <option key={year.value} value={year.value} className="bg-slate-900">
                      {year.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <motion.button
              onClick={handleAISendResponse}
              disabled={!canSend || !selectedOption}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn relative w-full overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10"></div>

              <div className="relative flex items-center justify-center py-3 font-semibold text-black">
                <Send className="w-5 h-5 mr-2" />
                Send
              </div>
            </motion.button>
          </div>
        </div>
      );
    }

    if (currentStep === 'eventTime') {
      return (
        <div className="relative p-6 space-y-4">
          <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm rounded-b-3xl"></div>
          <div className="relative space-y-3">
            {timeSlots.map((slot) => (
              <motion.button
                key={slot.value}
                onClick={() => handleOptionSelect(slot.value)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  selectedOption === slot.value
                    ? 'bg-gradient-to-r from-orange-400 to-amber-400 text-black'
                    : 'bg-white/[0.08] backdrop-blur-md border border-white/20 text-white hover:border-orange-400/30'
                }`}
              >
                {slot.label}
              </motion.button>
            ))}
            <motion.button
              onClick={handleAISendResponse}
              disabled={!canSend || !selectedOption}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn relative w-full overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10"></div>
              
              <div className="relative flex items-center justify-center py-3 font-semibold text-black">
                <Send className="w-5 h-5 mr-2" />
                Send
              </div>
            </motion.button>
          </div>
        </div>
      );
    }

    if (currentStep === 'fullName' || currentStep === 'email' || currentStep === 'eventLocation' || currentStep === 'eventDetails') {
      return (
        <div className="relative p-6">
          <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm rounded-b-3xl"></div>
          <div className="relative flex gap-3">
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-orange-400/10 rounded-xl blur-md opacity-0 focus-within:opacity-100 transition-all duration-300"></div>
              {currentStep === 'eventDetails' ? (
                <textarea
                  value={userInput}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="Additional details (number of guests, music preferences, special equipment, etc.) or type 'none'"
                  rows={3}
                  className="relative w-full bg-white/[0.08] backdrop-blur-md border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/40 focus:border-orange-400/50 focus:outline-none transition-all duration-300 resize-none"
                />
              ) : (
                <input
                  type={currentStep === 'email' ? 'email' : 'text'}
                  value={userInput}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={
                    currentStep === 'fullName' ? 'Your full name...' :
                    currentStep === 'email' ? 'your-email@example.com' :
                    'Event location...'
                  }
                  className="relative w-full bg-white/[0.08] backdrop-blur-md border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/40 focus:border-orange-400/50 focus:outline-none transition-all duration-300"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && canSend) {
                      handleAISendResponse();
                    }
                  }}
                />
              )}
            </div>
            <motion.button
              onClick={handleAISendResponse}
              disabled={!canSend}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group/btn relative overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10"></div>
              
              <div className="relative px-6 py-4 font-semibold text-black">
                <Send className="w-5 h-5" />
              </div>
            </motion.button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Enhanced Background with Glass Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-orange-400/25 to-amber-400/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-violet-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        <div className="absolute inset-0 backdrop-blur-[50px] bg-gradient-to-br from-white/[0.01] via-transparent to-white/[0.01]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      </div>

      <div className="relative flex flex-col min-h-screen">
        {/* Enhanced Header with better visibility */}
        <div className="border-b border-white/20 py-6 px-4 sm:px-6 flex-shrink-0 relative z-10">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"></div>
          <div className="relative max-w-7xl mx-auto">
            {/* Main header content */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={goBack}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-orange-400/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative p-2 bg-white/[0.12] backdrop-blur-md rounded-xl border border-white/30 hover:border-orange-400/50 transition-all duration-300">
                    <ArrowLeft className="w-6 h-6 text-white group-hover:text-orange-400 transition-colors duration-300" />
                  </div>
                </motion.button>

                <img src="/images/logo.webp" alt="DJLOW323" className="h-12 w-auto" />

                <div className="relative group">
                  <div className="absolute inset-0 bg-orange-400/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                  <div className="relative px-4 py-2 bg-white/[0.12] backdrop-blur-md rounded-2xl border border-orange-400/40">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-light text-white">
                      Get Your
                      <span className="font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent ml-2">
                        Quote
                      </span>
                    </h1>
                  </div>
                </div>
              </div>

              {/* Cloudflare Turnstile Widget - Desktop only */}
              <div className="hidden md:flex items-center">
                <Turnstile
                  ref={turnstileRef}
                  siteKey={'0x4AAAAAAB3mnehJw_KXHjtQ'}
                  options={{
                    theme: 'dark',
                    size: 'flexible'
                  }}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onError={() => setTurnstileToken('')}
                  onExpire={() => setTurnstileToken('')}
                />
                {/* 'normal' | 'compact' | 'flexible' | 'invisible' */}
              </div>
            </div>

            {/* Cloudflare Turnstile Widget - Mobile only */}
            <div className="md:hidden mt-4 flex justify-center">
              <Turnstile
                siteKey={'0x4AAAAAAB3mnehJw_KXHjtQ'}
                options={{
                  theme: 'dark',
                  size: 'flexible'
                }}
                onSuccess={(token) => setTurnstileToken(token)}
                onError={() => setTurnstileToken('')}
                onExpire={() => setTurnstileToken('')}
              />
            </div>
          </div>
        </div>

        {/* Enhanced Tab Navigation with better visibility */}
        <div className="border-b border-white/20 flex-shrink-0 relative z-10">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex space-x-8">
              <motion.button
                onClick={() => setActiveTab('form')}
                className={`relative py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'form' 
                    ? 'text-orange-400' 
                    : 'text-white/70 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span>FORM</span>
                </div>
                
                {activeTab === 'form' && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0"
                    transition={{ duration: 0.3 }}
                  >
                    <div className="h-0.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"></div>
                    <div className="absolute inset-0 bg-orange-400/20 rounded-t-lg blur-sm"></div>
                  </motion.div>
                )}
              </motion.button>
              
              <motion.button
                onClick={() => setActiveTab('ai')}
                className={`relative py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === 'ai' 
                    ? 'text-orange-400' 
                    : 'text-white/70 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  <span>AI ASSISTANT</span>
                </div>
                
                {activeTab === 'ai' && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0"
                    transition={{ duration: 0.3 }}
                  >
                    <div className="h-0.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"></div>
                    <div className="absolute inset-0 bg-orange-400/20 rounded-t-lg blur-sm"></div>
                  </motion.div>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={activeTab === 'ai' ? 'flex-1 flex flex-col min-h-0' : 'relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1'}>
          <AnimatePresence mode="wait">
            {activeTab === 'form' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-4xl mx-auto"
              >
                {/* Main Form Container */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/15 via-transparent to-blue-400/15 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                  
                  <div className="relative bg-white/[0.08] backdrop-blur-2xl rounded-3xl border border-white/20 p-8 sm:p-12 hover:border-orange-400/30 transition-all duration-500 overflow-hidden">
                    {/* Glass Reflections */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.1] to-transparent rounded-t-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-white/[0.05] to-transparent rounded-br-3xl"></div>
                    
                    <div className="relative">
                      {/* Header */}
                      <div className="text-center mb-10">
                        <div className="relative group/icon mb-6">
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-2xl blur-lg group-hover/icon:blur-xl transition-all duration-300"></div>
                          <div className="relative w-16 h-16 mx-auto bg-white/[0.1] backdrop-blur-md rounded-2xl border border-orange-400/30 flex items-center justify-center group-hover/icon:scale-110 transition-transform duration-300">
                            <Sparkles className="w-8 h-8 text-orange-400" />
                          </div>
                        </div>
                        
                        <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">
                          Event Quote
                          <span className="block font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                            Request
                          </span>
                        </h2>
                        <p className="text-white/60 font-light">
                          Tell us about your event and we'll create the perfect experience for you.
                        </p>
                      </div>

                      {/* Form */}
                      <div className="space-y-10">
                        {/* Personal Information Section */}
                        <div className="relative group/section">
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-amber-400/5 rounded-2xl blur-lg opacity-0 group-hover/section:opacity-100 transition-all duration-500"></div>
                          
                          <div className="relative bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
                            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/[0.08] to-transparent rounded-t-2xl"></div>
                            
                            <div className="relative">
                              <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-orange-400/20 rounded-lg flex items-center justify-center">
                                  <User className="w-5 h-5 text-orange-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">Personal Information</h3>
                              </div>
                              
                              <div className="grid sm:grid-cols-2 gap-6">
                                <div className="group/input">
                                  <label className="block text-white/80 text-sm font-medium mb-3">
                                    First Name *
                                  </label>
                                  <div className="relative">
                                    <div className="absolute inset-0 bg-orange-400/10 rounded-xl blur-md opacity-0 group-focus-within/input:opacity-100 transition-all duration-300"></div>
                                    <input
                                      type="text"
                                      required
                                      value={formData.firstName}
                                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                      className="relative w-full bg-white/[0.05] backdrop-blur-md border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/40 focus:border-orange-400/50 focus:outline-none transition-all duration-300"
                                      placeholder="Your first name"
                                    />
                                  </div>
                                </div>
                                
                                <div className="group/input">
                                  <label className="block text-white/80 text-sm font-medium mb-3">
                                    Last Name *
                                  </label>
                                  <div className="relative">
                                    <div className="absolute inset-0 bg-orange-400/10 rounded-xl blur-md opacity-0 group-focus-within/input:opacity-100 transition-all duration-300"></div>
                                    <input
                                      type="text"
                                      required
                                      value={formData.lastName}
                                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                      className="relative w-full bg-white/[0.05] backdrop-blur-md border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/40 focus:border-orange-400/50 focus:outline-none transition-all duration-300"
                                      placeholder="Your last name"
                                    />
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-6 group/input">
                                <label className="block text-white/80 text-sm font-medium mb-3">
                                  Email Address *
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-0 bg-orange-400/10 rounded-xl blur-md opacity-0 group-focus-within/input:opacity-100 transition-all duration-300"></div>
                                  <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="relative w-full bg-white/[0.05] backdrop-blur-md border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/40 focus:border-orange-400/50 focus:outline-none transition-all duration-300"
                                    placeholder="your-email@example.com"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Event Details Section */}
                        <div className="relative group/section">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-cyan-400/5 rounded-2xl blur-lg opacity-0 group-hover/section:opacity-100 transition-all duration-500"></div>
                          
                          <div className="relative bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8">
                            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/[0.08] to-transparent rounded-t-2xl"></div>
                            
                            <div className="relative">
                              <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center">
                                  <Calendar className="w-5 h-5 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">Event Details</h3>
                              </div>
                              
                              <div className="space-y-6">
                                <div className="group/input">
                                  <label className="block text-white/80 text-sm font-medium mb-3">
                                    Event Type *
                                  </label>
                                  <div className="relative">
                                    <div className="absolute inset-0 bg-blue-400/10 rounded-xl blur-md opacity-0 group-focus-within/input:opacity-100 transition-all duration-300"></div>
                                    <select
                                      value={formData.eventType}
                                      onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                                      required
                                      className="relative w-full bg-white/[0.05] backdrop-blur-md border border-white/20 rounded-xl px-4 py-4 text-white focus:border-blue-400/50 focus:outline-none transition-all duration-300 appearance-none"
                                    >
                                      <option value="" className="bg-slate-900">Select event type</option>
                                      {eventTypes.map((type, index) => (
                                        <option key={index} value={type.toLowerCase().replace(/\s+/g, '-')} className="bg-slate-900">
                                          {type}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>

                                {formData.eventType === 'other' && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="group/input"
                                  >
                                    <label className="block text-white/80 text-sm font-medium mb-3">
                                      Please specify event type *
                                    </label>
                                    <div className="relative">
                                      <div className="absolute inset-0 bg-blue-400/10 rounded-xl blur-md opacity-0 group-focus-within/input:opacity-100 transition-all duration-300"></div>
                                      <input
                                        type="text"
                                        required
                                        value={formData.customEventType}
                                        onChange={(e) => setFormData({...formData, customEventType: e.target.value})}
                                        className="relative w-full bg-white/[0.05] backdrop-blur-md border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/40 focus:border-blue-400/50 focus:outline-none transition-all duration-300"
                                        placeholder="Please specify your event type"
                                      />
                                    </div>
                                  </motion.div>
                                )}

                                <div className="grid sm:grid-cols-2 gap-6">
                                  <div className="group/input">
                                    <label className="block text-white/80 text-sm font-medium mb-3">
                                      Event Date *
                                    </label>
                                    <div className="relative">
                                      <div className="absolute inset-0 bg-blue-400/10 rounded-xl blur-md opacity-0 group-focus-within/input:opacity-100 transition-all duration-300"></div>
                                      <div className="relative flex gap-2">
                                        {/* Month Selector */}
                                        <select
                                          value={dateComponents.month}
                                          onChange={(e) => {
                                            const newMonth = e.target.value;
                                            setDateComponents(prev => ({ ...prev, month: newMonth }));
                                            updateFormDataDate(newMonth, dateComponents.day, dateComponents.year);
                                          }}
                                          required
                                          className="flex-1 bg-white/[0.05] backdrop-blur-md border border-white/20 rounded-xl px-3 py-4 text-white focus:border-blue-400/50 focus:outline-none transition-all duration-300 appearance-none"
                                        >
                                          <option value="" className="bg-slate-900">Month</option>
                                          {months.map((month) => (
                                            <option key={month.value} value={month.value} className="bg-slate-900">
                                              {month.label}
                                            </option>
                                          ))}
                                        </select>

                                        <span className="text-white/60 self-center">/</span>

                                        {/* Day Selector */}
                                        <select
                                          value={dateComponents.day}
                                          onChange={(e) => {
                                            const newDay = e.target.value;
                                            setDateComponents(prev => ({ ...prev, day: newDay }));
                                            updateFormDataDate(dateComponents.month, newDay, dateComponents.year);
                                          }}
                                          required
                                          className="flex-1 bg-white/[0.05] backdrop-blur-md border border-white/20 rounded-xl px-3 py-4 text-white focus:border-blue-400/50 focus:outline-none transition-all duration-300 appearance-none"
                                        >
                                          <option value="" className="bg-slate-900">Day</option>
                                          {days.map((day) => (
                                            <option key={day.value} value={day.value} className="bg-slate-900">
                                              {day.label}
                                            </option>
                                          ))}
                                        </select>

                                        <span className="text-white/60 self-center">/</span>

                                        {/* Year Selector */}
                                        <select
                                          value={dateComponents.year}
                                          onChange={(e) => {
                                            const newYear = e.target.value;
                                            setDateComponents(prev => ({ ...prev, year: newYear }));
                                            updateFormDataDate(dateComponents.month, dateComponents.day, newYear);
                                          }}
                                          required
                                          className="flex-1 bg-white/[0.05] backdrop-blur-md border border-white/20 rounded-xl px-3 py-4 text-white focus:border-blue-400/50 focus:outline-none transition-all duration-300 appearance-none"
                                        >
                                          <option value="" className="bg-slate-900">Year</option>
                                          {years.map((year) => (
                                            <option key={year.value} value={year.value} className="bg-slate-900">
                                              {year.label}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="group/input">
                                    <label className="block text-white/80 text-sm font-medium mb-3">
                                      Approximate Time *
                                    </label>
                                    <div className="relative">
                                      <div className="absolute inset-0 bg-blue-400/10 rounded-xl blur-md opacity-0 group-focus-within/input:opacity-100 transition-all duration-300"></div>
                                      <select
                                        value={formData.eventTime}
                                        onChange={(e) => setFormData({...formData, eventTime: e.target.value})}
                                        required
                                        className="relative w-full bg-white/[0.05] backdrop-blur-md border border-white/20 rounded-xl px-4 py-4 text-white focus:border-blue-400/50 focus:outline-none transition-all duration-300 appearance-none"
                                      >
                                        <option value="" className="bg-slate-900">Select time</option>
                                        {timeSlots.map((slot) => (
                                          <option key={slot.value} value={slot.value} className="bg-slate-900">
                                            {slot.label}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                <div className="group/input">
                                  <label className="block text-white/80 text-sm font-medium mb-3">
                                    Event Location *
                                  </label>
                                  <div className="relative">
                                    <div className="absolute inset-0 bg-blue-400/10 rounded-xl blur-md opacity-0 group-focus-within/input:opacity-100 transition-all duration-300"></div>
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                      <MapPin className="w-5 h-5 text-white/40" />
                                    </div>
                                    <input
                                      type="text"
                                      required
                                      value={formData.eventLocation}
                                      onChange={(e) => setFormData({...formData, eventLocation: e.target.value})}
                                      className="relative w-full bg-white/[0.05] backdrop-blur-md border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/40 focus:border-blue-400/50 focus:outline-none transition-all duration-300"
                                      placeholder="City, venue name, or address"
                                    />
                                  </div>
                                </div>

                                <div className="group/input">
                                  <label className="block text-white/80 text-sm font-medium mb-3">
                                    Additional Details
                                  </label>
                                  <div className="relative">
                                    <div className="absolute inset-0 bg-violet-400/10 rounded-xl blur-md opacity-0 group-focus-within/input:opacity-100 transition-all duration-300"></div>
                                    <div className="absolute left-4 top-4">
                                      <MessageSquare className="w-5 h-5 text-white/40" />
                                    </div>
                                    <textarea
                                      value={formData.eventDetails}
                                      onChange={(e) => setFormData({...formData, eventDetails: e.target.value})}
                                      rows={4}
                                      className="relative w-full bg-white/[0.05] backdrop-blur-md border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/40 focus:border-violet-400/50 focus:outline-none transition-all duration-300 resize-none"
                                      placeholder="Tell us more about your event, special requests, number of guests, etc."
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center pt-4">
                          {submitMessage && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`mb-4 p-4 rounded-xl border ${
                                submitMessage.includes('ERROR') || submitMessage.includes('error')
                                  ? 'bg-red-500/10 border-red-500/30 text-red-400'
                                  : 'bg-green-500/10 border-green-500/30 text-green-400'
                              }`}
                            >
                              <p className="text-sm font-medium">{submitMessage}</p>
                            </motion.div>
                          )}

                          <motion.button
                            onClick={handleFormSubmit}
                            disabled={isSubmitting || !turnstileToken}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group/btn relative overflow-hidden rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400"></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10 opacity-50"></div>

                            <div className="relative flex items-center justify-center gap-3 px-12 py-4 font-bold text-black text-lg transition-all duration-300">
                              {isSubmitting ? (
                                <>
                                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                  <span>SENDING...</span>
                                </>
                              ) : (
                                <>
                                  <Send className="w-6 h-6" />
                                  <span>SEND REQUEST</span>
                                </>
                              )}
                            </div>

                            <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                            </div>
                          </motion.button>

                          {!turnstileToken && (
                            <p className="text-white/60 text-sm mt-3">
                              Please complete the security verification above to enable the send button.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex-1 flex justify-center"
              >
                <div className="w-full lg:max-w-[50%] flex flex-col h-full md:max-h-[calc(100vh-280px)]">
                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 md:min-h-0">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="relative group max-w-[80%]">
                          {message.sender === 'user' ? (
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-2xl blur-md"></div>
                              <div className="relative bg-gradient-to-r from-orange-400 to-amber-400 text-black p-4 rounded-2xl">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10 rounded-2xl"></div>
                                <p className="relative text-sm leading-relaxed font-medium">{message.text}</p>
                              </div>
                            </div>
                          ) : (
                            <div className="relative">
                              <div className="absolute inset-0 bg-white/5 rounded-2xl blur-md"></div>
                              <div className="relative bg-white/[0.08] backdrop-blur-xl border border-white/20 text-white p-4 rounded-2xl">
                                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.1] to-transparent rounded-t-2xl"></div>
                                <p className="relative text-sm leading-relaxed">{message.text}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="relative">
                          <div className="absolute inset-0 bg-white/5 rounded-2xl blur-md"></div>
                          <div className="relative bg-white/[0.08] backdrop-blur-xl border border-white/20 text-white p-4 rounded-2xl">
                            <div className="flex space-x-2">
                              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-t-3xl border-t border-white/20"></div>
                    {renderAIChatInput()}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer - Desktop only */}
        <div className="hidden md:block border-t border-white/20 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Back to Home Button */}
              <motion.button
                onClick={goBack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-orange-400/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative flex items-center gap-2 px-4 py-2 bg-white/[0.12] backdrop-blur-md rounded-xl border border-white/30 hover:border-orange-400/50 transition-all duration-300">
                  <ArrowLeft className="w-4 h-4 text-white group-hover:text-orange-400 transition-colors duration-300" />
                  <span className="text-white group-hover:text-orange-400 transition-colors duration-300 text-sm font-medium">
                    Back to Home
                  </span>
                </div>
              </motion.button>

              {/* Footer Text */}
              <div className="text-center">
                <p className="text-white/60 text-sm">
                  © 2024 DJLOW323. All rights reserved.
                </p>
              </div>

              {/* Logo */}
              <div className="flex items-center">
                <img src="/images/logo.webp" alt="DJLOW323" className="h-8 w-auto opacity-70" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuotePage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    }>
      <QuotePageContent />  
    </Suspense>
  );
};

export default QuotePage;