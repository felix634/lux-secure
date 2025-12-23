import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Wifi, Globe } from 'lucide-react';

export default function SystemScanner() {
  const [scanning, setScanning] = useState(true);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setScanning(false);
          return 100;
        }
        return prev + 1;
      });
      
      // Add fake logs
      if (Math.random() > 0.7) {
        const fakeIP = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.XXX`;
        setLogs(prev => [`Scanning node: ${fakeIP}... OK`, ...prev].slice(0, 3));
      }
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full lux-glass border-l-4 border-l-lux-green p-6 relative overflow-hidden group">
      {/* Scan Line Animation */}
      <div className="absolute top-0 left-0 w-full h-1 bg-lux-green/50 shadow-[0_0_20px_rgba(0,255,65,1)] animate-scan opacity-50 pointer-events-none"></div>
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lux-green font-bold text-lg mb-1 flex items-center gap-2">
             <Globe className="w-4 h-4 animate-pulse" /> SYSTEM STATUS
          </h3>
          <p className="text-xs text-gray-400 font-mono">CLIENT CONNECTION PROTOCOL</p>
        </div>
        <div className={`text-2xl ${scanning ? 'text-yellow-500' : 'text-lux-green'}`}>
          {scanning ? <Unlock className="animate-pulse" /> : <Lock />}
        </div>
      </div>

      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden border border-gray-700">
          <div 
            className="h-full bg-lux-green shadow-[0_0_10px_rgba(0,255,65,0.8)] transition-all duration-75"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-xs font-mono uppercase">
            <span>Encryption: {scanning ? 'NEGOTIATING' : 'AES-256-GCM'}</span>
            <span>{progress}%</span>
        </div>

        {/* Logs */}
        <div className="bg-black/40 p-3 rounded text-[10px] font-mono text-gray-500 h-20 overflow-hidden flex flex-col-reverse">
            {logs.map((log, i) => (
                <div key={i} className="border-l-2 border-lux-green/30 pl-2 mb-1 text-lux-green/70">
                    {'>'} {log}
                </div>
            ))}
            {!scanning && <div className="text-lux-green font-bold">{'>'} CONNECTION SECURE.</div>}
        </div>
      </div>
    </div>
  );
}