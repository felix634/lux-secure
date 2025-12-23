import React from 'react';

export default function ThreatMap() {
  // Random coordinates for "threats"
  const threats = [
    { x: 20, y: 30, delay: '0s' },
    { x: 50, y: 40, delay: '1.2s' },
    { x: 70, y: 25, delay: '2.5s' },
    { x: 80, y: 60, delay: '0.5s' },
    { x: 30, y: 70, delay: '3s' },
  ];

  return (
    <div className="relative w-full aspect-video bg-[#080808] border border-gray-800 rounded-lg overflow-hidden flex items-center justify-center group">
       
       <div className="absolute top-4 left-4 z-10">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-red-500 font-bold tracking-widest">LIVE THREAT FEED</span>
            </div>
       </div>

      {/* Abstract World Map SVG */}
      <svg viewBox="0 0 100 50" className="w-full h-full opacity-20 fill-lux-green/20 stroke-lux-green/30 stroke-[0.2]">
        <path d="M20,10 Q30,5 50,20 T90,10" />
        <path d="M10,20 Q40,30 60,25 T95,40" />
        <path d="M15,40 Q35,35 55,45 T85,30" />
        {/* Grid lines */}
        <line x1="0" y1="10" x2="100" y2="10" strokeOpacity="0.5" />
        <line x1="0" y1="20" x2="100" y2="20" strokeOpacity="0.5" />
        <line x1="0" y1="30" x2="100" y2="30" strokeOpacity="0.5" />
        <line x1="0" y1="40" x2="100" y2="40" strokeOpacity="0.5" />
      </svg>

      {/* Pulsing Dots */}
      {threats.map((t, i) => (
        <div 
            key={i}
            className="absolute w-2 h-2"
            style={{ left: `${t.x}%`, top: `${t.y}%` }}
        >
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" style={{ animationDelay: t.delay }}></div>
            <div className="relative w-2 h-2 bg-red-600 rounded-full"></div>
            {/* Connecting lines for effect */}
            <div className="absolute w-[100px] h-[1px] bg-gradient-to-r from-red-500/50 to-transparent top-1 left-1 rotate-45 transform origin-left opacity-0 group-hover:opacity-30 transition-opacity"></div>
        </div>
      ))}
    </div>
  );
}