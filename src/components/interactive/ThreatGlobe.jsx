import React, { useState, useEffect, useRef, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { ShieldAlert, Crosshair, Radio, Zap } from 'lucide-react';

export default function ThreatGlobe() {
  const globeEl = useRef();
  const [arcs, setArcs] = useState([]);
  const [rings, setRings] = useState([]);
  const [globeReady, setGlobeReady] = useState(false);

  // --- Configuration ---
  const CONFIG = {
    color: '#00ff41',       // Lux Green
    colorAttack: '#ef4444', // Red
    globeColor: '#050505',  // Dark Black
    atmosphere: '#00ff41',  // Green Glow
  };

  // --- Data Generators ---

  // 1. Static Nodes (Major Cities)
  const CITIES = [
    { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
    { name: 'New York', lat: 40.7128, lng: -74.0060 },
    { name: 'London', lat: 51.5074, lng: -0.1278 },
    { name: 'Moscow', lat: 55.7558, lng: 37.6173 },
    { name: 'Beijing', lat: 39.9042, lng: 116.4074 },
    { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
    { name: 'Brasilia', lat: -15.7801, lng: -47.9292 },
    { name: 'Cape Town', lat: -33.9249, lng: 18.4241 },
    { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
    { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  ];

  // 2. Generate Random Attacks (Arcs & Rings)
  useEffect(() => {
    const interval = setInterval(() => {
      // Pick random start and end cities
      const start = CITIES[Math.floor(Math.random() * CITIES.length)];
      const end = CITIES[Math.floor(Math.random() * CITIES.length)];

      if (start.name === end.name) return;

      const isAttack = Math.random() > 0.6; // 40% chance of "Attack" (Red)
      const color = isAttack ? [CONFIG.colorAttack, CONFIG.colorAttack] : [CONFIG.color, CONFIG.color];

      // Add Arc
      const newArc = {
        startLat: start.lat,
        startLng: start.lng,
        endLat: end.lat,
        endLng: end.lng,
        color: color,
        dashAnimateTime: Math.random() * 1500 + 1000, // Speed
      };

      setArcs(prev => [...prev, newArc].slice(-15)); // Keep last 15 arcs

      // Add Impact Ring at destination
      const newRing = {
        lat: end.lat,
        lng: end.lng,
        maxR: Math.random() * 5 + 3,
        propagationSpeed: Math.random() * 2 + 1,
        repeatPeriod: Math.random() * 1000 + 500,
        color: isAttack ? CONFIG.colorAttack : CONFIG.color,
      };

      setRings(prev => [...prev, newRing].slice(-10)); // Keep last 10 rings

    }, 800); // New attack every 800ms

    return () => clearInterval(interval);
  }, []);

  // Set initial camera view
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      setGlobeReady(true);
    }
  }, []);

  return (
    <div className="relative w-full aspect-video md:h-[600px] bg-[#050505] border border-gray-800 rounded-lg overflow-hidden flex items-center justify-center group shadow-2xl">

      {/* The Globe Component */}
      <div className={`transition-opacity duration-1000 ${globeReady ? 'opacity-100' : 'opacity-0'}`}>
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundColor="rgba(0,0,0,0)" // Transparent background

          // Visuals
          atmosphereColor={CONFIG.atmosphere}
          atmosphereAltitude={0.2}

          // Arcs (The Lightbeams)
          arcsData={arcs}
          arcColor="color"
          arcDashLength={0.5}
          arcDashGap={1}
          arcDashAnimateTime={(d) => d.dashAnimateTime}
          arcStroke={0.5}

          // Rings (Impacts)
          ringsData={rings}
          ringColor="color"
          ringMaxRadius="maxR"
          ringPropagationSpeed="propagationSpeed"
          ringRepeatPeriod="repeatPeriod"

          // Points (Cities)
          pointsData={CITIES}
          pointColor={() => '#ffffff'}
          pointAltitude={0.01}
          pointRadius={0.5}

          // Interaction
          width={typeof window !== 'undefined' ? Math.min(window.innerWidth - 32, 1000) : 1000}
          height={typeof window !== 'undefined' ? Math.min(window.innerHeight * 0.6, 600) : 600}
        />
      </div>

      {/* --- HUD OVERLAYS (Kaspersky Style) --- */}

      {/* Top Left: Status */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none select-none">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative">
            <div className="w-3 h-3 bg-lux-green rounded-full animate-ping absolute inset-0"></div>
            <div className="w-3 h-3 bg-lux-green rounded-full relative z-10"></div>
          </div>
          <h3 className="text-white font-bold tracking-widest text-sm">GLOBAL MONITOR</h3>
        </div>
        <div className="lux-glass px-4 py-2 border-l-2 border-lux-green">
          <p className="text-lux-green font-mono text-2xl font-bold">ONLINE</p>
          <p className="text-gray-500 text-[10px]">NODES ACTIVE: {CITIES.length}</p>
        </div>
      </div>

      {/* Right Side: Live Feed List */}
      <div className="absolute top-6 right-6 z-10 hidden md:block w-64 pointer-events-none select-none">
        <div className="lux-glass p-4 rounded-sm border border-white/5">
          <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Radio className="w-3 h-3 text-lux-green" /> LOGS
            </span>
            <span className="text-[10px] text-gray-500">LIVE</span>
          </div>

          <div className="space-y-3">
            {arcs.slice(-4).reverse().map((arc, i) => (
              <div key={i} className="flex items-center justify-between text-[10px] font-mono animate-pulse">
                <span className={arc.color[0] === CONFIG.colorAttack ? "text-red-500 font-bold" : "text-lux-green"}>
                  {arc.color[0] === CONFIG.colorAttack ? "THREAT BLOCKED" : "DATA SYNC"}
                </span>
                <span className="text-gray-600">
                  PKT-{Math.floor(Math.random() * 999)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Center: Controls Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 lux-glass px-6 py-3 rounded-full border border-white/5 pointer-events-none select-none">
        <Crosshair className="w-4 h-4 text-gray-400" />
        <div className="w-px h-4 bg-gray-700"></div>
        <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase hidden sm:inline">
          Drag to Rotate // Scroll to Zoom
        </span>
        <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase sm:hidden">
          Drag // Scroll
        </span>
        <div className="w-px h-4 bg-gray-700"></div>
        <Zap className="w-4 h-4 text-gray-400" />
      </div>

      {/* Vignette & Grid Texture Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(transparent_50%,#050505_100%)]"></div>
      <div className="absolute inset-0 z-[-1] opacity-10 bg-[linear-gradient(rgba(0,255,65,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    </div>
  );
}