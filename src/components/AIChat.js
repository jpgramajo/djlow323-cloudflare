'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChat = ({ fullPage = false, formData = null, onFormDataChange = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [internalFormData, setInternalFormData] = useState({
    eventType: '',
    fullName: '',
    email: '',
    eventDate: '',
    eventTime: '',
    eventLocation: ''
  });
  
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [canSend, setCanSend] = useState(false);
  const messagesEndRef = useRef(null);

  const eventTypes = [
    { value: 'wedding', label: 'Wedding' },
    { value: 'birthday', label: 'Birthday Party' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'other', label: 'Other' }
  ];

  const timeSlots = [
    { value: 'morning', label: 'Morning (9 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 6 PM)' },
    { value: 'evening', label: 'Evening (6 PM - 12 AM)' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addMessage = (text, sender, type = 'text') => {
    const newMessage = {
      id: Date.now() + Math.random(), // Add random component to ensure uniqueness
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

  const startChat = async () => {
    setIsOpen(true);
    setShowWelcome(false);
    setMessages([]);
    
    if (fullPage && messages.length === 0) {
      await simulateTyping();
      addMessage("Hello! I'm DJLOW323's virtual assistant. I'll help you get a personalized quote for your event. What type of event are you planning?", 'ai');
      setCurrentStep('eventType');
    }
  };

  useEffect(() => {
    if (fullPage && messages.length === 0) {
      startChat();
    }
  }, [fullPage]);

  // Initialize with existing form data if available
  useEffect(() => {
    if (formData && onFormDataChange && fullPage) {
      // Pre-fill form data from existing data if available
    }
  }, [formData, onFormDataChange, fullPage]);

  const handleSendResponse = async () => {
    setCanSend(false);
    
    if (currentStep === 'eventType' && selectedOption) {
      const selectedType = eventTypes.find(type => type.value === selectedOption);
      addMessage(selectedType.label, 'user');
      
      const newData = { eventType: selectedOption };
      if (onFormDataChange && formData) {
        onFormDataChange({ ...formData, ...newData });
      }
      setSelectedOption('');

      await simulateTyping();
      addMessage("Perfect! Now I need your full name to personalize the quote.", 'ai');
      setCurrentStep('fullName');
    } else if (currentStep === 'fullName' && userInput.trim()) {
      addMessage(userInput.trim(), 'user');
      
      const names = userInput.trim().split(' ');
      const newData = { 
        firstName: names[0] || '',
        lastName: names.slice(1).join(' ') || ''
      };
      if (onFormDataChange && formData) {
        onFormDataChange({ ...formData, ...newData });
      }
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
      
      const newData = { email: userInput.trim() };
      if (onFormDataChange && formData) {
        onFormDataChange({ ...formData, ...newData });
      }
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
      
      const newData = { eventDate: selectedOption };
      if (onFormDataChange && formData) {
        onFormDataChange({ ...formData, ...newData });
      }
      setSelectedOption('');

      await simulateTyping();
      addMessage("What approximate time will the event be?", 'ai');
      setCurrentStep('eventTime');
    } else if (currentStep === 'eventTime' && selectedOption) {
      const selectedTime = timeSlots.find(slot => slot.value === selectedOption);
      addMessage(selectedTime.label, 'user');
      
      const newData = { eventTime: selectedOption };
      if (onFormDataChange && formData) {
        onFormDataChange({ ...formData, ...newData });
      }
      setSelectedOption('');

      await simulateTyping();
      addMessage("Finally, where will the event take place? (City, specific venue)", 'ai');
      setCurrentStep('eventLocation');
    } else if (currentStep === 'eventLocation' && userInput.trim()) {
      addMessage(userInput.trim(), 'user');
      
      const newData = { eventLocation: userInput.trim() };
      if (onFormDataChange && formData) {
        onFormDataChange({ ...formData, ...newData });
      }
      setUserInput('');

      await simulateTyping();
      addMessage("Perfect! I have all the necessary information. Let me process your request...", 'ai');
      
      setTimeout(async () => {
        await simulateTyping();
        const currentFormData = formData || internalFormData;
        const eventTypeLabel = eventTypes.find(t => t.value === currentFormData.eventType)?.label || 'event';
        addMessage(`All set! I've sent your quote request. We'll contact you soon at ${currentFormData.email} with a personalized proposal for your ${eventTypeLabel.toLowerCase()}. Thank you for choosing DJLOW323!`, 'ai');
        setCurrentStep('completed');
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


  const renderChatInput = () => {
    if (currentStep === 'eventType') {
      return (
        <div className="p-4 border-t border-[#b2a9aa]/20 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {eventTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => handleOptionSelect(type.value)}
                className={`py-2 px-3 rounded text-sm font-semibold transition-colors ${
                  selectedOption === type.value
                    ? 'bg-[#fe9511] text-black'
                    : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'
                }`}
                disabled={!canSend && selectedOption && selectedOption !== type.value}
              >
                {type.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleSendResponse}
            disabled={!canSend || !selectedOption}
            className="w-full bg-[#fe9511] text-black py-2 px-3 rounded font-semibold hover:bg-[#fe9511]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      );
    }

    if (currentStep === 'eventDate') {
      return (
        <div className="p-4 border-t border-[#b2a9aa]/20 space-y-3">
          <input
            type="date"
            value={selectedOption}
            onChange={(e) => handleOptionSelect(e.target.value)}
            className="w-full bg-black border border-[#b2a9aa]/20 rounded px-3 py-2 text-white focus:border-[#fe9511] focus:outline-none"
            min={new Date().toISOString().split('T')[0]}
          />
          <button
            onClick={handleSendResponse}
            disabled={!canSend || !selectedOption}
            className="w-full bg-[#fe9511] text-black py-2 px-3 rounded font-semibold hover:bg-[#fe9511]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      );
    }

    if (currentStep === 'eventTime') {
      return (
        <div className="p-4 border-t border-[#b2a9aa]/20 space-y-3">
          <div className="space-y-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.value}
                onClick={() => handleOptionSelect(slot.value)}
                className={`w-full py-2 px-3 rounded text-sm font-semibold transition-colors ${
                  selectedOption === slot.value
                    ? 'bg-[#fe9511] text-black'
                    : 'bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]'
                }`}
                disabled={!canSend && selectedOption && selectedOption !== slot.value}
              >
                {slot.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleSendResponse}
            disabled={!canSend || !selectedOption}
            className="w-full bg-[#fe9511] text-black py-2 px-3 rounded font-semibold hover:bg-[#fe9511]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      );
    }

    if (currentStep === 'fullName' || currentStep === 'email' || currentStep === 'eventLocation') {
      return (
        <div className="p-4 border-t border-[#b2a9aa]/20">
          <div className="flex gap-2">
            <input
              type={currentStep === 'email' ? 'email' : 'text'}
              value={userInput}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={
                currentStep === 'fullName' ? 'Your full name...' :
                currentStep === 'email' ? 'your-email@example.com' :
                'Event location...'
              }
              className="flex-1 bg-black border border-[#b2a9aa]/20 rounded px-3 py-2 text-white focus:border-[#fe9511] focus:outline-none text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && canSend) {
                  handleSendResponse();
                }
              }}
            />
            <button
              onClick={handleSendResponse}
              disabled={!canSend}
              className="bg-[#fe9511] text-black px-4 py-2 rounded font-semibold hover:bg-[#fe9511]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  if (fullPage) {
    return (
      <div className="flex-1 flex justify-center bg-black">
        <div className="w-full lg:max-w-[50%] flex flex-col h-full">
          {/* Messages - Scrollable Middle Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-black">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${message.sender === 'user'
                      ? 'bg-[#fe9511] text-black'
                      : 'bg-[#1a1a1a] text-white border border-[#b2a9aa]/20'
                    }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#1a1a1a] border border-[#b2a9aa]/20 text-white p-4 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-[#fe9511] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#fe9511] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-[#fe9511] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Fixed Bottom */}
          <div className="bg-[#1a1a1a] border-t border-[#b2a9aa]/20 flex-shrink-0">
            {renderChatInput()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {/* Welcome Bubble */}
      <AnimatePresence>
        {showWelcome && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 bg-[#1a1a1a] border border-[#fe9511]/20 rounded-lg p-4 w-80 cursor-pointer"
            onClick={() => window.location.href = '/quote?mode=ai'}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowWelcome(false);
              }}
              className="absolute top-2 right-2 text-[#b2a9aa] hover:text-[#fe9511] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex items-start space-x-3">
              <div className="bg-[#fe9511] rounded-full p-2 flex-shrink-0">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Hello! 👋</p>
                <p className="text-[#b2a9aa] text-sm">
                  Click here to get a personalized quote for your event with our virtual assistant.
                </p>
              </div>
            </div>
            
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-[#1a1a1a] border-r border-b border-[#fe9511]/20 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chat Button */}
      <motion.button
        onClick={() => window.location.href = '/quote?mode=ai'}
        className="bg-[#fe9511] hover:bg-[#fe9511]/90 text-black p-4 rounded-full shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 bg-[#1a1a1a] border border-[#fe9511]/20 rounded-lg w-96 h-[500px] flex flex-col shadow-2xl"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#b2a9aa]/20">
              <div className="flex items-center space-x-3">
                <div className="bg-[#fe9511] rounded-full p-2">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">DJLOW323 Assistant</h3>
                  <p className="text-[#b2a9aa] text-xs">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#b2a9aa] hover:text-[#fe9511] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-[#fe9511] text-black'
                        : 'bg-[#2a2a2a] text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#2a2a2a] text-white p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#fe9511] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#fe9511] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-[#fe9511] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {renderChatInput()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChat;