import React, { useState, useEffect, useMemo } from 'react';
import { Truck, Navigation, AlertTriangle, CloudRain, Package, CheckCircle2 } from 'lucide-react';

export default function LogisticsMap() {
  const [startCity, setStartCity] = useState('Berlin');
  const [endCity, setEndCity] = useState('Vienna');
  const [isDispatching, setIsDispatching] = useState(false);
  const [activeFleet, setActiveFleet] = useState([]);

  // --- 1. PSEUDO-GEOCODING ENGINE ---
  // This turns any text string into a coordinate (0-100%)
  // It ensures "Berlin" always lands on the same spot without an API.
  const getCoords = (city) => {
    let hash = 0;
    for (let i = 0; i < city.length; i++) {
      hash = city.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Map hash to 10-90% range to keep inside the box
    const x = Math.abs(hash % 80) + 10; 
    const y = Math.abs((hash >> 3) % 80) + 10;
    return { x, y };
  };

  // Calculate coordinates dynamically
  const startPos = useMemo(() => getCoords(startCity), [startCity]);
  const endPos = useMemo(() => getCoords(endCity), [endCity]);

  // Calculate fake metrics
  const distance = Math.floor(Math.sqrt(Math.pow(endPos.x - startPos.x, 2) + Math.pow(endPos.y - startPos.y, 2)) * 15);
  const cost = (distance * 2.5).toFixed(2);
  const risk = distance > 800 ? 'HIGH' : 'LOW';

  const handleDispatch = () => {
    setIsDispatching(true);
    // Add a new "active" truck to the list
    const newTruck = {
        id: Math.floor(Math.random() * 1000),
        start: startPos,
        end: endPos,
        progress: 0
    };
    setActiveFleet(prev => [...prev, newTruck]);
    
    setTimeout(() => setIsDispatching(false), 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      
      {/* LEFT: COMMAND SIDEBAR */}
      <div className="bg-[#0a0a0a] border border-gray-800 p-6 flex flex-col h-full justify-between">
        <div>
            <div className="flex items-center gap-2 mb-6 text-blue-500">
                <Navigation size={20} />
                <h3 className="font-bold tracking-widest text-sm">ROUTE OPTIMIZER</h3>
            </div>
            
            <div className="space-y-4 mb-8">
                <div className="group">
                    <label className="text-[10px] uppercase text-gray-500 font-mono group-focus-within:text-blue-500">Origin Node</label>
                    <input 
                        type="text" 
                        value={startCity} 
                        onChange={e => setStartCity(e.target.value)} 
                        className="w-full bg-black border border-gray-700 p-3 text-white text-sm focus:border-blue-500 outline-none transition-colors rounded-sm font-mono"
                    />
                </div>
                <div className="group">
                    <label className="text-[10px] uppercase text-gray-500 font-mono group-focus-within:text-blue-500">Destination Node</label>
                    <input 
                        type="text" 
                        value={endCity} 
                        onChange={e => setEndCity(e.target.value)} 
                        className="w-full bg-black border border-gray-700 p-3 text-white text-sm focus:border-blue-500 outline-none transition-colors rounded-sm font-mono"
                    />
                </div>
            </div>

            {/* Live Metrics Card */}
            <div className="bg-blue-950/20 border border-blue-500/20 p-4 rounded-sm space-y-3">
                <div className="flex justify-between items-center border-b border-blue-500/10 pb-2">
                    <span className="text-gray-400 text-xs flex items-center gap-2"><Truck size={12}/> Est. Range</span>
                    <span className="text-white font-mono text-sm">{distance * 12} km</span>
                </div>
                <div className="flex justify-between items-center border-b border-blue-500/10 pb-2">
                    <span className="text-gray-400 text-xs flex items-center gap-2"><Package size={12}/> Cargo Value</span>
                    <span className="text-blue-400 font-mono text-sm">€{cost}k</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs flex items-center gap-2"><CloudRain size={12}/> Weather Risk</span>
                    <span className={`font-mono text-sm font-bold ${risk === 'HIGH' ? 'text-red-500' : 'text-lux-green'}`}>{risk}</span>
                </div>
            </div>
        </div>

        <button 
            onClick={handleDispatch}
            disabled={isDispatching}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 text-sm font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
            {isDispatching ? 'Calculating...' : 'Dispatch Fleet'}
        </button>
      </div>

      {/* RIGHT: TACTICAL MAP */}
      <div className="lg:col-span-2 bg-[#050505] border border-gray-800 relative overflow-hidden group">
         
         {/* 1. Map Grid Background */}
         <div className="absolute inset-0 opacity-20 bg-[linear-gradient(#3b82f6_1px,transparent_1px),linear-gradient(90deg,#3b82f6_1px,transparent_1px)] bg-[size:40px_40px]"></div>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000_100%)]"></div>

         {/* 2. Abstract World Map SVG (Static Background) */}
         <svg className="absolute inset-0 w-full h-full text-gray-800 fill-current opacity-10 pointer-events-none">
             <path d="M50,150 Q150,50 250,150 T450,250" stroke="none" transform="scale(2)" />
         </svg>

         {/* 3. Dynamic Visualization Layer */}
         <svg className="absolute inset-0 w-full h-full">
             <defs>
                 {/* Gradient for the path */}
                 <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                     <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                     <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
                 </linearGradient>
                 {/* Marker Definition */}
                 <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                     <path d="M0,0 L10,5 L0,10" fill="#3b82f6" />
                 </marker>
             </defs>

             {/* Connection Line */}
             <line 
                x1={`${startPos.x}%`} y1={`${startPos.y}%`} 
                x2={`${endPos.x}%`} y2={`${endPos.y}%`} 
                stroke="url(#routeGradient)" 
                strokeWidth="2" 
                strokeDasharray="5,5"
                className="animate-pulse"
             />

             {/* City Nodes */}
             <circle cx={`${startPos.x}%`} cy={`${startPos.y}%`} r="4" fill="#3b82f6">
                <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
             </circle>
             <circle cx={`${endPos.x}%`} cy={`${endPos.y}%`} r="4" fill="#60a5fa" />
         </svg>

         {/* 4. Moving Truck Overlay (HTML for ease of icon use) */}
         {/* We use inline styles to position the truck based on the dynamic percentage */}
         <div 
            className="absolute transition-all duration-1000 ease-in-out z-20"
            style={{ 
                left: `calc(${startPos.x}% + (${endPos.x} - ${startPos.x}) * 1% / 2)`, 
                top: `calc(${startPos.y}% + (${endPos.y} - ${startPos.y}) * 1% / 2)`,
                transform: 'translate(-50%, -50%)'
            }}
         >
             <div className="bg-black border border-blue-500 p-2 rounded-full shadow-[0_0_15px_blue]">
                 <Truck size={16} className="text-blue-400" />
             </div>
             
             {/* Hover Manifest Info */}
             <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 p-2 w-32 rounded text-[10px] text-gray-300 backdrop-blur-md">
                 <div className="font-bold text-white mb-1">IN TRANSIT</div>
                 <div>Dest: {endCity}</div>
                 <div className="text-blue-400">ETA: 4h 20m</div>
             </div>
         </div>

         {/* 5. City Labels */}
         <div className="absolute text-xs font-mono text-blue-400 font-bold" style={{ left: `${startPos.x}%`, top: `${startPos.y}%`, transform: 'translate(-50%, -150%)' }}>
             {startCity.toUpperCase()}
         </div>
         <div className="absolute text-xs font-mono text-white font-bold" style={{ left: `${endPos.x}%`, top: `${endPos.y}%`, transform: 'translate(-50%, 20px)' }}>
             {endCity.toUpperCase()}
         </div>

         {/* 6. Active Fleet Counter Overlay */}
         <div className="absolute bottom-4 right-4 flex gap-4">
            <div className="bg-black/90 border border-gray-800 p-3 rounded-sm">
                <div className="text-[10px] text-gray-500 uppercase mb-1">Fleet Status</div>
                <div className="text-xl text-white font-mono flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-lux-green" /> 
                    OPTIMAL
                </div>
            </div>
         </div>

      </div>
    </div>
  );
}