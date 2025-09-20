'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Mail, Shield, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

const AuthPage = () => {
  const router = useRouter();
  const [step, setStep] = useState('email'); // 'email' | 'verification'
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/auth/status', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok && data.result) {
          sessionStorage.setItem('auth', '1');
          router.push('/user');
          return;
        }
      } catch (error) {
        // Silently continue with normal login flow
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthStatus();
  }, [router]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async () => {
    setError('');
    setMessage('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setStep('verification');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return; // Only allow single character
    
    const newCode = [...code];
    newCode[index] = value.toUpperCase();
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
    
    // Handle Enter key
    if (e.key === 'Enter') {
      handleVerificationSubmit();
    }
  };

  const handleVerificationSubmit = async () => {
    setError('');
    setMessage('');

    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setError('Please enter the complete 6-digit code.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, code: fullCode }),
      });

      const data = await response.json();

      if (response.ok && data.result) {
        setMessage(data.message);
        sessionStorage.setItem('auth', '1');
        router.push('/user');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (step === 'verification') {
      setStep('email');
    } else {
      router.push('/');
    }
  };

  const handleEmailKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEmailSubmit();
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute inset-0 backdrop-blur-[100px] bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.02]"></div>
        </div>

        <div className="relative flex items-center justify-center min-h-screen p-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/[0.08] backdrop-blur-2xl rounded-3xl border border-white/20 p-12 text-center">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.1] to-transparent rounded-t-3xl"></div>
              
              <div className="relative">
                <div className="relative group/icon mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-2xl blur-lg"></div>
                  <div className="relative w-20 h-20 mx-auto bg-white/[0.1] backdrop-blur-md rounded-2xl border border-orange-400/30 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-light text-white mb-4">
                  Checking
                  <span className="block font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                    Authentication
                  </span>
                </h1>
                <p className="text-white/60 font-light">
                  Please wait while we verify your session.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Enhanced Background with Glass Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-orange-400/25 to-amber-400/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-violet-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        <div className="absolute inset-0 backdrop-blur-[100px] bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.02]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      </div>

      {/* Enhanced Header */}
      <div className="relative border-b border-white/10 py-6 px-4 sm:px-6">
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={goBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-orange-400/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative p-2 bg-white/[0.08] backdrop-blur-md rounded-xl border border-white/20 hover:border-orange-400/40 transition-all duration-300">
                <ArrowLeft className="w-6 h-6 text-white/70 group-hover:text-orange-400 transition-colors duration-300" />
              </div>
            </motion.button>
            <img src="/images/logo.webp" alt="DJLOW323" className="h-12 w-auto" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6 min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {step === 'email' ? (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative group"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-blue-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                
                {/* Main Card */}
                <div className="relative bg-white/[0.08] backdrop-blur-2xl rounded-3xl border border-white/20 p-8 sm:p-10 hover:border-orange-400/30 transition-all duration-500 overflow-hidden">
                  {/* Glass Reflections */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.1] to-transparent rounded-t-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-white/[0.05] to-transparent rounded-br-3xl"></div>
                  
                  <div className="relative">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="relative group/icon mb-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-2xl blur-lg group-hover/icon:blur-xl transition-all duration-300"></div>
                        <div className="relative w-16 h-16 mx-auto bg-white/[0.1] backdrop-blur-md rounded-2xl border border-orange-400/30 flex items-center justify-center group-hover/icon:scale-110 transition-transform duration-300">
                          <Mail className="w-8 h-8 text-orange-400" />
                        </div>
                      </div>
                      
                      <h1 className="text-3xl sm:text-4xl font-light text-white mb-4">
                        Welcome
                        <span className="block font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                          Back
                        </span>
                      </h1>
                      <p className="text-white/60 font-light">
                        Please enter your email address to continue.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-3">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-xl blur-md opacity-0 focus-within:opacity-100 transition-all duration-300"></div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={handleEmailKeyPress}
                            className="relative w-full bg-white/[0.05] backdrop-blur-md border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/40 focus:border-orange-400/50 focus:outline-none transition-all duration-300"
                            placeholder="your-email@example.com"
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="relative group/error"
                        >
                          <div className="absolute inset-0 bg-red-400/20 rounded-xl blur-md"></div>
                          <div className="relative bg-red-500/10 backdrop-blur-md border border-red-400/30 rounded-xl p-4 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                            <p className="text-red-300 text-sm font-light">{error}</p>
                          </div>
                        </motion.div>
                      )}

                      {message && (
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="relative group/success"
                        >
                          <div className="absolute inset-0 bg-green-400/20 rounded-xl blur-md"></div>
                          <div className="relative bg-green-500/10 backdrop-blur-md border border-green-400/30 rounded-xl p-4 flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <p className="text-green-300 text-sm font-light">{message}</p>
                          </div>
                        </motion.div>
                      )}

                      <motion.button
                        onClick={handleEmailSubmit}
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group/btn relative w-full overflow-hidden rounded-xl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10 opacity-50"></div>
                        
                        <div className="relative flex items-center justify-center py-4 font-semibold text-black transition-all duration-300">
                          {isLoading ? (
                            <div className="flex items-center space-x-3">
                              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                              <span>Sending Code...</span>
                            </div>
                          ) : (
                            'Send Verification Code'
                          )}
                        </div>
                        
                        <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                        </div>
                      </motion.button>
                    </div>

                    <div className="mt-8 text-center">
                      <p className="text-white/50 text-sm font-light">
                        Don't have an account? Contact us for access.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="verification"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative group"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-violet-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                
                {/* Main Card */}
                <div className="relative bg-white/[0.08] backdrop-blur-2xl rounded-3xl border border-white/20 p-8 sm:p-10 hover:border-orange-400/30 transition-all duration-500 overflow-hidden">
                  {/* Glass Reflections */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.1] to-transparent rounded-t-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-white/[0.05] to-transparent rounded-br-3xl"></div>
                  
                  <div className="relative">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="relative group/icon mb-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-2xl blur-lg group-hover/icon:blur-xl transition-all duration-300"></div>
                        <div className="relative w-16 h-16 mx-auto bg-white/[0.1] backdrop-blur-md rounded-2xl border border-orange-400/30 flex items-center justify-center group-hover/icon:scale-110 transition-transform duration-300">
                          <Shield className="w-8 h-8 text-orange-400" />
                        </div>
                      </div>
                      
                      <h1 className="text-3xl sm:text-4xl font-light text-white mb-4">
                        Verify
                        <span className="block font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                          Email
                        </span>
                      </h1>
                      <p className="text-white/60 font-light mb-2">
                        We've sent a 6-digit code to
                      </p>
                      <p className="text-orange-400 font-medium">{email}</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-4 text-center">
                          Enter Verification Code
                        </label>
                        <div className="flex justify-center gap-3">
                          {code.map((digit, index) => (
                            <div key={index} className="relative group/input">
                              <div className="absolute inset-0 bg-orange-400/20 rounded-xl blur-md opacity-0 group-focus-within/input:opacity-100 transition-all duration-300"></div>
                              <input
                                id={`code-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleCodeChange(index, e.target.value)}
                                onKeyDown={(e) => handleCodeKeyDown(index, e)}
                                className="relative w-12 h-12 sm:w-14 sm:h-14 bg-white/[0.05] backdrop-blur-md border border-white/20 rounded-xl text-center text-white text-lg font-bold focus:border-orange-400/50 focus:outline-none transition-all duration-300"
                                disabled={isLoading}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="relative group/error"
                        >
                          <div className="absolute inset-0 bg-red-400/20 rounded-xl blur-md"></div>
                          <div className="relative bg-red-500/10 backdrop-blur-md border border-red-400/30 rounded-xl p-4 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                            <p className="text-red-300 text-sm font-light text-center">{error}</p>
                          </div>
                        </motion.div>
                      )}

                      {message && (
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="relative group/success"
                        >
                          <div className="absolute inset-0 bg-green-400/20 rounded-xl blur-md"></div>
                          <div className="relative bg-green-500/10 backdrop-blur-md border border-green-400/30 rounded-xl p-4 flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <p className="text-green-300 text-sm font-light text-center">{message}</p>
                          </div>
                        </motion.div>
                      )}

                      <motion.button
                        onClick={handleVerificationSubmit}
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group/btn relative w-full overflow-hidden rounded-xl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10 opacity-50"></div>
                        
                        <div className="relative flex items-center justify-center py-4 font-semibold text-black transition-all duration-300">
                          {isLoading ? (
                            <div className="flex items-center space-x-3">
                              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                              <span>Verifying...</span>
                            </div>
                          ) : (
                            'Verify & Login'
                          )}
                        </div>
                        
                        <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                        </div>
                      </motion.button>
                    </div>

                    <div className="mt-8 text-center">
                      <button
                        onClick={() => setStep('email')}
                        className="text-orange-400 hover:text-orange-300 text-sm font-light transition-colors duration-300"
                      >
                        Didn't receive the code? Try again
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;