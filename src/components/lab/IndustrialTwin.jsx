import React, { useState } from 'react';
import { Zap, Settings, TrendingUp, AlertTriangle } from 'lucide-react';

export default function IndustrialTwin() {
  const [sensors, setSensors] = useState(10); // Slider value
  const [stress, setStress] = useState(false);
  
  // Calculate Savings
  const savings = sensors * 1250; 
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      
      {/* LEFT: ROI CALCULATOR */}
      <div className="space-y-8">
        <div className="bg-[#0a0a0a] border border-gray-800 p-6">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="text-orange-500" /> ROI PROJECTOR
            </h3>
            
            <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>IoT Sensor Density</span>
                    <span className="text-white">{sensors} Units</span>
                </div>
                <input 
                    type="range" min="1" max="100" value={sensors} 
                    onChange={(e) => setSensors(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-900/10 border border-orange-500/30 p-4 rounded-sm text-center">
                    <div className="text-xs text-gray-400 uppercase">Annual Savings</div>
                    <div className="text-2xl font-bold text-white mt-1">${savings.toLocaleString()}</div>
                </div>
                <div className="bg-orange-900/10 border border-orange-500/30 p-4 rounded-sm text-center">
                    <div className="text-xs text-gray-400 uppercase">Downtime Prevention</div>
                    <div className="text-2xl font-bold text-orange-500 mt-1">{Math.min(sensors * 0.5, 95)}%</div>
                </div>
            </div>
        </div>

        <button 
            onMouseDown={() => setStress(true)}
            onMouseUp={() => setStress(false)}
            onMouseLeave={() => setStress(false)}
            className={`w-full py-4 font-bold uppercase tracking-widest transition-all ${stress ? 'bg-red-600 scale-95' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}
        >
            {stress ? '⚠️ STRESS TEST ACTIVE' : 'HOLD TO SIMULATE LOAD'}
        </button>
      </div>

      {/* RIGHT: DIGITAL TWIN SVG */}
      <div className="bg-[#050505] border border-gray-800 flex items-center justify-center relative overflow-hidden p-10">
         {/* Background Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,165,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,165,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

         {/* The Machine (SVG) */}
         <div className={`relative transition-all duration-300 ${stress ? 'animate-shake' : ''}`}>
             <svg width="200" height="300" viewBox="0 0 200 300" className="drop-shadow-2xl">
                 {/* Main Housing */}
                 <rect x="40" y="20" width="120" height="260" rx="4" fill="#1a1a1a" stroke="#333" strokeWidth="2" />
                 
                 {/* Internal Core (Glows Red on Stress) */}
                 <rect x="60" y="100" width="80" height="100" fill={stress ? '#ef4444' : '#2a2a2a'} className="transition-colors duration-200" />
                 
                 {/* Cooling Pipes */}
                 <path d="M20,50 L40,50 M160,50 L180,50" stroke={stress ? '#ef4444' : '#555'} strokeWidth="4" />
                 <path d="M20,250 L40,250 M160,250 L180,250" stroke={stress ? '#ef4444' : '#555'} strokeWidth="4" />

                 {/* Status Light */}
                 <circle cx="100" cy="50" r="6" fill={stress ? '#ef4444' : '#00ff41'} className={stress ? 'animate-ping' : ''} />
             </svg>

             {/* Floating Data Widgets */}
             <div className={`absolute -right-16 top-1/2 p-2 bg-black border text-xs font-mono transition-colors ${stress ? 'border-red-500 text-red-500' : 'border-gray-600 text-gray-400'}`}>
                TEMP: {stress ? 'CRITICAL' : 'OPTIMAL'}
             </div>
         </div>
      </div>
      
      <style>{`
        @keyframes shake {
            0% { transform: translate(1px, 1px) rotate(0deg); }
            10% { transform: translate(-1px, -2px) rotate(-1deg); }
            20% { transform: translate(-3px, 0px) rotate(1deg); }
            30% { transform: translate(3px, 2px) rotate(0deg); }
            40% { transform: translate(1px, -1px) rotate(1deg); }
            50% { transform: translate(-1px, 2px) rotate(-1deg); }
            60% { transform: translate(-3px, 1px) rotate(0deg); }
            70% { transform: translate(3px, 1px) rotate(-1deg); }
            80% { transform: translate(-1px, -1px) rotate(1deg); }
            90% { transform: translate(1px, 2px) rotate(0deg); }
            100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
}