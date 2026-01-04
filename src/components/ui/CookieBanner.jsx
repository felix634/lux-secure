import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check local storage after a small delay for dramatic effect
    const consent = localStorage.getItem('lux_cookie_consent');
    if (!consent) {
      setTimeout(() => setVisible(true), 1500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lux_cookie_consent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 z-50 flex justify-center pointer-events-none">
      <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-lux-green/30 p-6 rounded-sm shadow-[0_0_40px_rgba(0,255,65,0.15)] max-w-2xl w-full flex flex-col md:flex-row items-start md:items-center gap-6 pointer-events-auto animate-[slideUp_0.5s_ease-out]">
        
        {/* Icon */}
        <div className="p-3 bg-lux-green/10 rounded-sm border border-lux-green/20">
            <Cookie className="text-lux-green w-6 h-6" />
        </div>

        {/* Content */}
        <div className="flex-1">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1 flex items-center gap-2">
                System Protocol
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed font-mono">
                This secure channel utilizes localized cookies to maintain session encryption and optimize network latency. 
                Continued use of this terminal constitutes acceptance of our data retention protocols.
            </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 w-full md:w-auto">
            <button 
                onClick={handleAccept}
                className="flex-1 md:flex-none px-6 py-2 bg-lux-green text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,255,65,0.3)] whitespace-nowrap"
            >
                Acknowledge
            </button>
            <button 
                onClick={() => setVisible(false)} // Just hide it for session
                className="px-4 py-2 border border-gray-700 text-gray-500 hover:text-white hover:border-white transition-colors text-xs font-bold uppercase"
            >
                <X size={16} />
            </button>
        </div>

      </div>
      
      <style>{`
        @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}