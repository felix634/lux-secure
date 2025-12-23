import React, { useState, useEffect } from 'react';

// Sub-component: Radar Scanner (For Threat/Red Team)
const RadarView = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-lux-dark/50">
        {/* Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#00ff41_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
        
        {/* Radar Sweep */}
        <div className="w-64 h-64 border border-lux-green/30 rounded-full relative animate-[spin_4s_linear_infinite]">
            <div className="w-full h-1/2 bg-gradient-to-t from-lux-green/20 to-transparent absolute top-0 left-0 border-b border-lux-green/50 origin-bottom transform rotate-0 blur-sm"></div>
        </div>
        
        {/* Targets */}
        <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-red-500 rounded-full animate-ping delay-700"></div>
        
        <div className="absolute bottom-4 left-4 text-xs font-mono text-lux-green">
            STATUS: SCANNING SECTOR 7G...
        </div>
    </div>
);

// Sub-component: Encryption Stream (For Crypt/Builder)
const CryptoView = () => {
    const [hash, setHash] = useState('');
    const chars = 'ABCDEF0123456789';
    
    useEffect(() => {
        const interval = setInterval(() => {
            let str = '';
            for(let i=0; i<8; i++) {
                str += Array(4).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('') + ' ';
            }
            setHash(str);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full p-6 font-mono text-xs text-lux-green break-all opacity-80 overflow-hidden bg-lux-dark/50 flex flex-col justify-center">
             <div className="text-white mb-2 border-b border-gray-700 pb-2">ENCRYPTION HANDSHAKE</div>
             {Array(6).fill(0).map((_, i) => (
                 <div key={i} className="mb-1 opacity-50 odd:opacity-100">{hash}</div>
             ))}
             <div className="mt-2 text-white bg-lux-green/20 inline-block px-2 rounded-sm w-fit animate-pulse">
                KEY GENERATED
             </div>
        </div>
    );
};

// Sub-component: Server Grid (For Cloud/IoT)
const GridView = () => {
    return (
        <div className="w-full h-full p-6 grid grid-cols-4 gap-2 bg-lux-dark/50">
            {Array(16).fill(0).map((_, i) => (
                <div key={i} className="bg-gray-900 border border-gray-700 relative overflow-hidden group">
                    <div className={`absolute top-1 right-1 w-1 h-1 rounded-full ${Math.random() > 0.8 ? 'bg-red-500 animate-ping' : 'bg-lux-green'}`}></div>
                    <div className="absolute bottom-1 left-1 h-1 bg-lux-green/30 w-full group-hover:w-1/2 transition-all duration-500"></div>
                </div>
            ))}
            <div className="col-span-4 text-center text-xs font-mono text-lux-green mt-2">
                NODES ONLINE: 16/16 // LATENCY: 12ms
            </div>
        </div>
    );
};

export default function SolutionDemo({ type }) {
  return (
    <div className="w-full h-64 border border-lux-green/30 rounded-sm overflow-hidden relative shadow-[0_0_15px_rgba(0,255,65,0.1)]">
        {type === 'SCAN' && <RadarView />}
        {type === 'CRYPT' && <CryptoView />}
        {type === 'GRID' && <GridView />}
        
        {/* Overlay Lines */}
        <div className="absolute inset-0 pointer-events-none border border-lux-green/10 m-1"></div>
        <div className="absolute top-0 right-0 p-2 text-[10px] font-mono text-gray-500">
            MOD: {type}
        </div>
    </div>
  );
}