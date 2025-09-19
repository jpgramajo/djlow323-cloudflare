'use client';

import { motion } from 'framer-motion';
import '@fontsource/archivo-black';
import '@fontsource/syncopate';

const DashboardPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
          <div className="bg-[#1a1a1a] border border-[#fe9511]/20 rounded-lg p-12 mb-8">
            <div className="bg-[#fe9511] rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold text-[#fe9511] mb-4" style={{ fontFamily: 'Archivo Black, sans-serif' }}>
              Welcome to Your Dashboard!
            </h1>
            
            <p className="text-[#b2a9aa] text-lg mb-8 max-w-2xl mx-auto">
              This is your personal dashboard where you can manage your bookings, view analytics, 
              and access all DJ services. More features coming soon!
            </p>

            {/* Placeholder Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-[#2a2a2a] border border-[#b2a9aa]/10 rounded-lg p-6 text-center">
                <div className="bg-[#fe9511]/20 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#fe9511]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Syncopate, sans-serif' }}>
                  Bookings
                </h3>
                <p className="text-[#b2a9aa] text-sm">
                  Manage your upcoming events
                </p>
              </div>

              <div className="bg-[#2a2a2a] border border-[#b2a9aa]/10 rounded-lg p-6 text-center">
                <div className="bg-[#fe9511]/20 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#fe9511]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Syncopate, sans-serif' }}>
                  Analytics
                </h3>
                <p className="text-[#b2a9aa] text-sm">
                  View your performance stats
                </p>
              </div>

              <div className="bg-[#2a2a2a] border border-[#b2a9aa]/10 rounded-lg p-6 text-center">
                <div className="bg-[#fe9511]/20 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#fe9511]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Syncopate, sans-serif' }}>
                  Settings
                </h3>
                <p className="text-[#b2a9aa] text-sm">
                  Customize your preferences
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#fe9511]/10 border border-[#fe9511]/20 rounded-lg p-6"
          >
            <h2 className="text-xl font-bold text-[#fe9511] mb-2" style={{ fontFamily: 'Syncopate, sans-serif' }}>
              🚧 Under Development
            </h2>
            <p className="text-[#b2a9aa]">
              This dashboard is currently being built. More features and functionality will be added soon!
            </p>
          </motion.div>
    </motion.div>
  );
};

export default DashboardPage;