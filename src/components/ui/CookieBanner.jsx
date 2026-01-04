import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X, Settings, Check, Ban } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  // Default Settings
  const [preferences, setPreferences] = useState({
    necessary: true, 
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // 1. Check if user already consented
    const savedSettings = localStorage.getItem('lux_cookie_settings');
    if (!savedSettings) {
      setTimeout(() => setVisible(true), 500);
    } else {
        setPreferences(JSON.parse(savedSettings));
    }

    // 2. Listen for custom reopen event
    const handleReopen = () => {
        setVisible(true);
        setExpanded(true);
    };

    window.addEventListener('lux-open-cookies', handleReopen);
    return () => window.removeEventListener('lux-open-cookies', handleReopen);
  }, []);

  const handleToggle = (key) => {
    if (key === 'necessary') return; // Locked
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Logic for "Accept All" or "Confirm Selection"
  const handleSave = (all = false) => {
    const finalSettings = all 
        ? { necessary: true, analytics: true, marketing: true } 
        : preferences;

    saveAndClose(finalSettings);
  };

  // Logic for "Reject All"
  const handleRejectAll = () => {
    // We keep 'necessary' true because we need to remember that they rejected cookies!
    const rejectedSettings = { necessary: true, analytics: false, marketing: false };
    saveAndClose(rejectedSettings);
  };

  const saveAndClose = (settings) => {
    localStorage.setItem('lux_cookie_settings', JSON.stringify(settings));
    setPreferences(settings); // Sync state
    setVisible(false);
    console.log('LuxOS: Protocols Updated', settings);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 z-[100] flex justify-center items-end pointer-events-none">
      <div className={`bg-[#0a0a0a]/95 backdrop-blur-xl border border-lux-green/30 rounded-sm shadow-[0_0_40px_rgba(0,255,65,0.15)] max-w-2xl w-full flex flex-col transition-all duration-500 ease-in-out pointer-events-auto overflow-hidden ${expanded ? 'max-h-[600px]' : 'max-h-[200px]'}`}>
        
        {/* HEADER */}
        <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="p-3 bg-lux-green/10 rounded-sm border border-lux-green/20 hidden md:block">
                <Cookie className="text-lux-green w-6 h-6 animate-pulse" />
            </div>

            <div className="flex-1">
                <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-lux-green md:hidden"/> System Protocol // Data Retention
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed font-mono">
                    We use encrypted tracking nodes to optimize network latency. 
                    Rejecting non-essential nodes will not impact site visibility.
                </p>
            </div>

            <button onClick={() => setVisible(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                <X size={16} />
            </button>
        </div>

        {/* EXPANDED SETTINGS */}
        {expanded && (
            <div className="px-6 pb-6 space-y-4 border-t border-gray-800/50 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* Necessary (Locked) */}
                <div className="flex items-center justify-between opacity-50 cursor-not-allowed">
                    <div>
                        <div className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                            <ShieldCheck size={12} className="text-lux-green"/> Core Infrastructure
                        </div>
                        <div className="text-[10px] text-gray-500 font-mono mt-1">Required for system stability (e.g. remembering this choice). Locked.</div>
                    </div>
                    <div className="w-10 h-5 bg-lux-green/20 rounded-full relative border border-lux-green/50">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-lux-green rounded-full shadow-[0_0_10px_rgba(0,255,65,0.5)]"></div>
                    </div>
                </div>

                {/* Analytics Toggle */}
                <div className="flex items-center justify-between cursor-pointer" onClick={() => handleToggle('analytics')}>
                    <div>
                        <div className="text-white text-xs font-bold uppercase tracking-wider">Telemetry & Analytics</div>
                        <div className="text-[10px] text-gray-500 font-mono mt-1">Improve threat detection algorithms.</div>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative border transition-all duration-300 ${preferences.analytics ? 'bg-lux-green/20 border-lux-green/50' : 'bg-gray-900 border-gray-700'}`}>
                        <div className={`absolute top-1 w-3 h-3 rounded-full transition-all duration-300 ${preferences.analytics ? 'right-1 bg-lux-green shadow-[0_0_10px_rgba(0,255,65,0.5)]' : 'left-1 bg-gray-500'}`}></div>
                    </div>
                </div>

                {/* Marketing Toggle */}
                <div className="flex items-center justify-between cursor-pointer" onClick={() => handleToggle('marketing')}>
                    <div>
                        <div className="text-white text-xs font-bold uppercase tracking-wider">Outreach Uplink</div>
                        <div className="text-[10px] text-gray-500 font-mono mt-1">Targeted communications across the grid.</div>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative border transition-all duration-300 ${preferences.marketing ? 'bg-lux-green/20 border-lux-green/50' : 'bg-gray-900 border-gray-700'}`}>
                        <div className={`absolute top-1 w-3 h-3 rounded-full transition-all duration-300 ${preferences.marketing ? 'right-1 bg-lux-green shadow-[0_0_10px_rgba(0,255,65,0.5)]' : 'left-1 bg-gray-500'}`}></div>
                    </div>
                </div>
            </div>
        )}

        {/* BUTTONS BAR */}
        <div className="bg-[#050505] p-4 border-t border-gray-800 flex flex-col md:flex-row gap-3">
            
            {/* 1. ACCEPT ALL */}
            <button 
                onClick={() => handleSave(true)} 
                className="flex-1 px-4 py-3 bg-lux-green text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,255,65,0.3)] flex items-center justify-center gap-2"
            >
                <Check size={14} /> Accept All
            </button>
            
            {/* 2. REJECT ALL (Added) */}
            <button 
                onClick={handleRejectAll} 
                className="flex-1 px-4 py-3 border border-red-500/30 text-red-500 font-bold text-xs uppercase tracking-widest hover:bg-red-500/10 hover:border-red-500 transition-colors flex items-center justify-center gap-2"
            >
                <Ban size={14} /> Reject All
            </button>

            {/* 3. CONFIGURE / SAVE */}
            {expanded ? (
                <button 
                    onClick={() => handleSave(false)} 
                    className="flex-1 px-4 py-3 border border-gray-700 text-gray-300 font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
                >
                    Confirm Selection
                </button>
            ) : (
                <button 
                    onClick={() => setExpanded(true)} 
                    className="flex-1 px-4 py-3 border border-gray-700 text-gray-400 font-bold text-xs uppercase tracking-widest hover:border-white hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                    <Settings size={14} /> Configure
                </button>
            )}
        </div>
      </div>
    </div>
  );
}