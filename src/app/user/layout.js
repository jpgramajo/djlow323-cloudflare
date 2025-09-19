'use client';

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
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-black border-b border-[#b2a9aa]/20 py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/images/logo.webp" alt="DJLOW323" className="h-12 w-auto" />
          </div>

          <button
            onClick={handleLogout}
            className="bg-[#b2a9aa]/20 hover:bg-red-500/20 border border-[#b2a9aa]/20 hover:border-red-500/20 text-[#b2a9aa] hover:text-red-400 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300"
            style={{ fontFamily: 'Syncopate, sans-serif' }}
          >
            LOGOUT
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {children}
      </div>
    </div>
  );
}