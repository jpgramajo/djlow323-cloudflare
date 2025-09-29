'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '@fontsource/archivo-black';
import '@fontsource/syncopate';
import '@fontsource/roboto';

export default function UserLayout({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const authValue = sessionStorage.getItem('auth');
    if (authValue !== '1') {
      router.push('/auth');
      return;
    }
    setIsAuthorized(true);
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      sessionStorage.removeItem('auth');
      router.push('/');
    }
  };

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated background shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-red-500/15 to-orange-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header with Glassmorphism */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 z-20 bg-black/30 backdrop-blur-lg border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4 sm:p-6">
          <div className="flex items-center">
            <img src="/images/logo.webp" alt="DJLOW323" className="h-10 sm:h-12 w-auto" />
          </div>

          <button
            onClick={handleLogout}
            className="bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-500/30 text-white hover:text-red-300 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 backdrop-blur-sm"
            style={{ fontFamily: 'Syncopate, sans-serif' }}
          >
            LOGOUT
          </button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}