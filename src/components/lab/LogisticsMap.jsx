import React, { useState } from 'react';
import { Truck, Navigation, Clock, Thermometer } from 'lucide-react';

export default function LogisticsMap() {
  const [route, setRoute] = useState({ start: 'Berlin', end: 'Vienna' });
  
  // Fake calculation logic
  const distance = Math.floor(Math.random() * 500) + 400;
  const cost = (distance * 1.5).toFixed(2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      
      {/* CONTROLS */}
      <div className="bg-[#0a0a0a] border border-gray-800 p-6 flex flex-col gap-6">
        <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Navigation className="text-blue-500" /> ROUTE OPTIMIZER
            </h3>
            <div className="space-y-4">
                <div>
                    <label className="text-[10px] uppercase text-gray-500 font-mono">Origin</label>
                    <input type="text" value={route.start} onChange={e => setRoute({...route, start: e.target.value})} className="w-full bg-black border border-gray-700 p-2 text-white text-sm focus:border-blue-500 outline-none" />
                </div>
                <div>
                    <label className="text-[10px] uppercase text-gray-500 font-mono">Destination</label>
                    <input type="text" value={route.end} onChange={e => setRoute({...route, end: e.target.value})} className="w-full bg-black border border-gray-700 p-2 text-white text-sm focus:border-blue-500 outline-none" />
                </div>
            </div>
        </div>

        <div className="bg-blue-900/10 border border-blue-500/30 p-4 rounded-sm">
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-xs">Est. Distance</span>
                <span className="text-white font-mono">{distance} km</span>
            </div>
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-xs">Fuel Cost</span>
                <span className="text-blue-400 font-mono">€{cost}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-gray-400 text-xs">Efficiency</span>
                <span className="text-lux-green font-mono">94%</span>
            </div>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 text-sm font-bold uppercase tracking-widest transition-colors">
            Dispatch Fleet
        </button>
      </div>

      {/* MAP VISUALIZATION */}
      <div className="lg:col-span-2 bg-[#050505] border border-gray-800 relative overflow-hidden group">
         {/* Map Background Pattern */}
         <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-[size:30px_30px]"></div>
         
         {/* Stylized Landmasses (SVG) */}
         <svg className="absolute inset-0 w-full h-full text-gray-800 fill-current opacity-20 pointer-events-none" viewBox="0 0 400 300">
             <path d="M50,150 Q100,50 200,100 T350,200" stroke="none" />
             <path d="M10,250 Q150,200 250,280" stroke="none" />
         </svg>

         {/* Routes */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none">
             {/* Route 1 */}
             <path d="M80,80 Q200,50 320,150" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeDasharray="5,5" />
             {/* Route 2 */}
             <path d="M100,200 Q200,250 300,200" fill="none" stroke="#1d4ed8" strokeWidth="2" opacity="0.5" />
         </svg>

         {/* Moving Trucks/Dots */}
         {/* Truck 1 */}
         <div className="absolute top-[80px] left-[80px] w-4 h-4 text-blue-400 animate-[movePath1_10s_linear_infinite_alternate] cursor-help group/truck z-10">
            <Truck size={16} />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black border border-blue-500 p-2 w-32 hidden group-hover/truck:block z-20">
                <div className="text-[10px] text-gray-400">CARGO ID: #8832</div>
                <div className="text-xs text-white flex items-center gap-1"><Thermometer size={10} /> Temp: 4°C</div>
            </div>
         </div>

         {/* Truck 2 */}
         <div className="absolute top-[200px] left-[100px] w-3 h-3 bg-blue-500 rounded-full animate-[movePath2_15s_linear_infinite_alternate] shadow-[0_0_10px_blue]"></div>

         {/* Overlay UI */}
         <div className="absolute bottom-4 right-4 flex gap-4">
            <div className="bg-black/80 border border-gray-700 p-2 flex flex-col items-center min-w-[80px]">
                <span className="text-[10px] text-gray-500 uppercase">Active Units</span>
                <span className="text-xl text-white font-mono">142</span>
            </div>
            <div className="bg-black/80 border border-gray-700 p-2 flex flex-col items-center min-w-[80px]">
                <span className="text-[10px] text-gray-500 uppercase">On Time</span>
                <span className="text-xl text-lux-green font-mono">98%</span>
            </div>
         </div>
      </div>
      
      <style>{`
        @keyframes movePath1 {
            0% { transform: translate(0, 0); }
            100% { transform: translate(240px, 70px); }
        }
        @keyframes movePath2 {
            0% { transform: translate(0, 0); }
            100% { transform: translate(200px, 0); }
        }
      `}</style>
    </div>
  );
}