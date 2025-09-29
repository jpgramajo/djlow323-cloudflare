'use client';

import { motion } from 'framer-motion';
import DynamicIcon from '@/components/DynamicIcon';
import '@fontsource/archivo-black';
import '@fontsource/syncopate';

const DashboardPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      {/* Main Welcome Card */}
      <div className="relative group text-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 sm:p-12 mb-8 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
        <div className="relative">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-all duration-500"></div>
            <div className="relative bg-black rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center border-2 border-orange-400/50">
              <DynamicIcon name="briefcase" className="w-10 h-10 text-orange-400" />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-4" style={{ fontFamily: 'Archivo Black, sans-serif' }}>
            Welcome to Your Dashboard
          </h1>
          
          <p className="text-white/70 text-base sm:text-lg mb-8 max-w-3xl mx-auto">
            This is your personal space to manage bookings, view analytics, and access all DJ services. More features are on the way!
          </p>

          {/* Placeholder Cards with Glassmorphism */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Bookings', icon: 'briefcase', description: 'Manage your upcoming events' },
              { title: 'Analytics', icon: 'barChart2', description: 'View your performance stats' },
              { title: 'Settings', icon: 'settings', description: 'Customize your preferences' },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="bg-orange-500/10 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-orange-500/20">
                  <DynamicIcon name={card.icon} className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Syncopate, sans-serif' }}>
                  {card.title}
                </h3>
                <p className="text-white/60 text-sm">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Under Development Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 flex items-center justify-center space-x-4"
      >
        <div className="flex-shrink-0">
          <div className="bg-yellow-500/20 rounded-full p-3">
            <DynamicIcon name="alertTriangle" className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-yellow-400 mb-1" style={{ fontFamily: 'Syncopate, sans-serif' }}>
            Under Development
          </h2>
          <p className="text-white/70">
            This dashboard is currently being built. More features and functionality will be added soon!
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;