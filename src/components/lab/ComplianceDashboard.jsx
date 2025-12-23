import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Server } from 'lucide-react';

export default function ComplianceDashboard() {
  // --- PART 1: COMPLIANCE LOGIC ---
  const [controls, setControls] = useState([
    { id: 1, label: 'Multi-Factor Auth (MFA)', active: true, weight: 15 },
    { id: 2, label: 'Data Encryption (At Rest)', active: true, weight: 20 },
    { id: 3, label: 'Data Encryption (In Transit)', active: false, weight: 15 },
    { id: 4, label: 'Auto-Offboarding Workflow', active: false, weight: 10 },
    { id: 5, label: 'Vendor Risk Assessment', active: true, weight: 10 },
    { id: 6, label: 'Penetration Testing (Annual)', active: false, weight: 20 },
    { id: 7, label: 'Incident Response Plan', active: true, weight: 10 },
  ]);

  const score = controls.reduce((acc, curr) => acc + (curr.active ? curr.weight : 0), 0);
  const getGrade = (s) => (s >= 90 ? 'A' : s >= 70 ? 'B' : s >= 50 ? 'C' : 'F');

  // --- PART 2: NETWORK TOPOLOGY (Draggable Nodes) ---
  const [nodes, setNodes] = useState([
    { id: 'HQ-Firewall', x: 50, y: 50, status: 'ok' },
    { id: 'DB-Cluster-01', x: 150, y: 120, status: 'ok' },
    { id: 'App-Server-Alpha', x: 250, y: 60, status: 'warning' },
    { id: 'Backup-Node', x: 200, y: 200, status: 'ok' },
  ]);

  const [draggingId, setDraggingId] = useState(null);
  const svgRef = useRef(null);

  const handleMouseDown = (id) => setDraggingId(id);
  const handleMouseUp = () => setDraggingId(null);
  
  const handleMouseMove = (e) => {
    if (!draggingId || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setNodes(nodes.map(n => n.id === draggingId ? { ...n, x, y } : n));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      
      {/* LEFT: READINESS AUDIT */}
      <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-sm">
        <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
            <h3 className="text-white font-bold">COMPLIANCE AUDIT</h3>
            <div className={`text-2xl font-mono font-bold ${score > 80 ? 'text-lux-green' : 'text-yellow-500'}`}>
                SOC2: {score}% ({getGrade(score)})
            </div>
        </div>
        
        <div className="space-y-4">
            {controls.map(c => (
                <div key={c.id} className="flex items-center justify-between p-3 bg-white/5 rounded-sm hover:bg-white/10 transition-colors cursor-pointer" onClick={() => {
                    setControls(controls.map(item => item.id === c.id ? {...item, active: !item.active} : item));
                }}>
                    <span className="text-sm text-gray-300 flex items-center gap-2">
                        {c.active ? <CheckCircle2 className="w-4 h-4 text-lux-green" /> : <AlertCircle className="w-4 h-4 text-gray-600" />}
                        {c.label}
                    </span>
                    <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${c.active ? 'bg-lux-green' : 'bg-gray-700'}`}>
                        <div className={`w-3 h-3 bg-black rounded-full shadow-md transform transition-transform ${c.active ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                </div>
            ))}
        </div>

        {/* Phishing Donut Chart Simulation */}
        <div className="mt-8 flex items-center gap-4 p-4 border border-gray-800 rounded-sm bg-black">
            <div className="relative w-16 h-16 rounded-full border-4 border-gray-800 border-t-lux-green animate-spin-slow flex items-center justify-center">
                <span className="text-xs font-bold text-white">4%</span>
            </div>
            <div>
                <div className="text-xs text-gray-500 uppercase font-mono">Phishing Sim</div>
                <div className="text-sm text-white">Click Rate: <span className="text-lux-green">Low Risk</span></div>
            </div>
        </div>
      </div>

      {/* RIGHT: INTERACTIVE TOPOLOGY */}
      <div className="bg-[#050505] border border-gray-800 rounded-sm relative overflow-hidden flex flex-col">
        <div className="absolute top-4 left-4 z-10 bg-black/80 px-2 py-1 border border-lux-green/30 text-[10px] text-lux-green font-mono">
            LIVE TOPOLOGY // DRAG NODES TO REORGANIZE
        </div>

        <div 
            ref={svgRef}
            className="flex-grow w-full h-[400px] cursor-crosshair relative"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {/* Render Connections (Lines) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {nodes.map((n, i) => (
                    // Connect every node to the first node (HQ) for simplicity in demo
                    i > 0 && (
                        <line 
                            key={`link-${i}`}
                            x1={nodes[0].x + 20} y1={nodes[0].y + 20}
                            x2={n.x + 20} y2={n.y + 20}
                            stroke="#00ff41" strokeWidth="1" strokeOpacity="0.3"
                        />
                    )
                ))}
            </svg>

            {/* Render Nodes */}
            {nodes.map((node) => (
                <div
                    key={node.id}
                    onMouseDown={() => handleMouseDown(node.id)}
                    className="absolute w-10 h-10 bg-black border border-lux-green text-lux-green flex items-center justify-center rounded-sm hover:bg-lux-green hover:text-black cursor-grab active:cursor-grabbing transition-colors shadow-[0_0_15px_rgba(0,255,65,0.2)] z-20 group"
                    style={{ left: node.x, top: node.y }}
                >
                    <Server size={18} />
                    
                    {/* Tooltip */}
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 p-2 rounded w-32 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-30">
                        <div className="text-[10px] text-white font-bold mb-1">{node.id}</div>
                        <div className={`text-[10px] uppercase font-mono ${node.status === 'ok' ? 'text-lux-green' : 'text-yellow-500'}`}>
                            Health: {node.status === 'ok' ? '99%' : 'Patch Req.'}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}