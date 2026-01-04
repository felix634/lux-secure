import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Server, Shield, Activity, Lock, X } from 'lucide-react';

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

  const complianceScore = controls.reduce((acc, curr) => acc + (curr.active ? curr.weight : 0), 0);
  const getGrade = (s) => (s >= 90 ? 'A' : s >= 70 ? 'B' : s >= 50 ? 'C' : 'F');

  // --- PART 2: ACTIVE DEFENSE TOPOLOGY ---
  const [nodes, setNodes] = useState([
    { id: 'HQ-Firewall', type: 'firewall', x: 50, y: 50, health: 100, status: 'secure', connections: 4520 },
    { id: 'DB-Cluster-01', type: 'database', x: 200, y: 120, health: 95, status: 'secure', connections: 120 },
    { id: 'App-Server-Alpha', type: 'server', x: 300, y: 60, health: 45, status: 'warning', connections: 890 },
    { id: 'Legacy-Auth', type: 'server', x: 180, y: 250, health: 20, status: 'critical', connections: 45 },
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [draggingId, setDraggingId] = useState(null);
  const svgRef = useRef(null);

  // Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prevNodes => prevNodes.map(node => {
        let change = 0;
        if (node.status !== 'secure' && Math.random() > 0.7) {
            change = -5;
        }
        const connChange = Math.floor(Math.random() * 50) - 25;
        const newHealth = Math.max(0, Math.min(100, node.health + change));
        
        let newStatus = node.status;
        if (newHealth < 30) newStatus = 'critical';
        else if (newHealth < 70) newStatus = 'warning';

        return { 
            ...node, 
            health: newHealth,
            status: newStatus,
            connections: Math.max(0, node.connections + connChange)
        };
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (e, id) => {
    e.stopPropagation();
    setDraggingId(id);
    setSelectedNodeId(id);
  };

  const handleMouseUp = () => setDraggingId(null);
  
  const handleMouseMove = (e) => {
    if (!draggingId || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const safeX = Math.max(20, Math.min(rect.width - 20, x));
    const safeY = Math.max(20, Math.min(rect.height - 20, y));

    setNodes(nodes.map(n => n.id === draggingId ? { ...n, x: safeX, y: safeY } : n));
  };

  const patchNode = (id) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, health: 100, status: 'secure' } : n));
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  const getStatusColor = (status) => {
    if (status === 'critical') return '#ef4444';
    if (status === 'warning') return '#eab308';
    return '#00ff41';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      
      {/* LEFT PANEL */}
      <div className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-sm flex flex-col h-full">
        <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
                <Shield size={18} className="text-lux-green"/> COMPLIANCE AUDIT
            </h3>
            <div className={`text-2xl font-mono font-bold ${complianceScore > 80 ? 'text-lux-green' : 'text-yellow-500'}`}>
                SOC2: {complianceScore}% ({getGrade(complianceScore)})
            </div>
        </div>
        
        <div className="space-y-3 overflow-y-auto flex-grow pr-2 scrollbar-thin scrollbar-thumb-gray-800">
            {controls.map(c => (
                <div key={c.id} 
                    className={`flex items-center justify-between p-3 rounded-sm border transition-all cursor-pointer ${c.active ? 'bg-lux-green/5 border-lux-green/30' : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'}`}
                    onClick={() => setControls(controls.map(item => item.id === c.id ? {...item, active: !item.active} : item))}
                >
                    <span className={`text-sm flex items-center gap-3 ${c.active ? 'text-white' : 'text-gray-500'}`}>
                        {c.active ? <CheckCircle2 size={16} className="text-lux-green" /> : <AlertCircle size={16} />}
                        {c.label}
                    </span>
                    <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 ${c.active ? 'bg-lux-green' : 'bg-gray-700'}`}>
                        <div className={`w-3 h-3 bg-black rounded-full shadow-md transform transition-transform duration-300 ${c.active ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="bg-[#050505] border border-gray-800 rounded-sm relative overflow-hidden flex flex-col h-full group select-none">
        
        <div className="absolute top-4 left-4 z-10 flex gap-4 pointer-events-none">
            <div className="bg-black/80 px-2 py-1 border border-lux-green/30 text-[10px] text-lux-green font-mono flex items-center gap-2">
                <Activity size={10} className="animate-pulse"/> LIVE TOPOLOGY // DRAG NODES TO REORGANIZE
            </div>
        </div>

        <div 
            ref={svgRef}
            className="flex-grow w-full h-[400px] cursor-crosshair relative"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={() => setSelectedNodeId(null)}
        >
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {nodes.map((n, i) => (
                    i > 0 && (
                        <g key={`link-${i}`}>
                            <line 
                                x1={nodes[0].x} y1={nodes[0].y}
                                x2={n.x} y2={n.y}
                                stroke={n.status === 'secure' ? '#00ff41' : n.status === 'warning' ? '#eab308' : '#ef4444'} 
                                strokeWidth={n.status === 'secure' ? 1 : 2} 
                                strokeOpacity="0.4"
                            />
                            {n.status !== 'secure' && (
                                <circle r="2" fill="#ef4444">
                                    <animateMotion dur="2s" repeatCount="indefinite"
                                        path={`M${nodes[0].x},${nodes[0].y} L${n.x},${n.y}`} />
                                </circle>
                            )}
                        </g>
                    )
                ))}
            </svg>

            {nodes.map((node) => {
                const isSelected = selectedNodeId === node.id;
                const color = getStatusColor(node.status);
                
                return (
                    <div
                        key={node.id}
                        onMouseDown={(e) => handleMouseDown(e, node.id)}
                        className={`absolute w-12 h-12 flex items-center justify-center rounded-sm border-2 cursor-grab active:cursor-grabbing transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20 group`}
                        style={{ 
                            left: node.x, 
                            top: node.y, 
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#000',
                            borderColor: color,
                            boxShadow: isSelected ? `0 0 20px ${color}` : 'none'
                        }}
                    >
                        {node.type === 'firewall' && <Shield size={20} style={{ color }} />}
                        {node.type === 'database' && <Server size={20} style={{ color }} />}
                        {node.type === 'server' && <Activity size={20} style={{ color }} />}

                        <div className="absolute -bottom-3 left-0 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full transition-all duration-500" 
                                style={{ width: `${node.health}%`, backgroundColor: color }}
                            ></div>
                        </div>

                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-gray-400 bg-black/80 px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            {node.id}
                        </div>
                    </div>
                );
            })}
        </div>

        {selectedNode && (
            <div className="absolute bottom-0 left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-md border-t border-gray-800 p-4 transition-transform duration-300 z-30">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-[10px] text-gray-500 uppercase font-mono mb-1">NODE INSPECTOR</div>
                        <h4 className="text-white font-bold text-lg flex items-center gap-2">
                            {selectedNode.id}
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                                selectedNode.status === 'secure' ? 'border-green-900 text-green-500' : 
                                selectedNode.status === 'warning' ? 'border-yellow-900 text-yellow-500' : 
                                'border-red-900 text-red-500'
                            }`}>
                                {selectedNode.status.toUpperCase()}
                            </span>
                        </h4>
                    </div>
                    <button onClick={() => setSelectedNodeId(null)} className="text-gray-500 hover:text-white"><X size={16}/></button>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-black border border-gray-800 p-3 rounded-sm">
                        <div className="text-[10px] text-gray-500 mb-1">SYSTEM HEALTH</div>
                        <div className="text-xl font-mono text-white" style={{ color: getStatusColor(selectedNode.status) }}>
                            {Math.round(selectedNode.health)}%
                        </div>
                        <div className="w-full h-1 bg-gray-800 mt-2 rounded-full overflow-hidden">
                             <div className="h-full transition-all duration-500" style={{ width: `${selectedNode.health}%`, backgroundColor: getStatusColor(selectedNode.status) }}></div>
                        </div>
                    </div>

                    <div className="bg-black border border-gray-800 p-3 rounded-sm">
                        <div className="text-[10px] text-gray-500 mb-1">ACTIVE CONNECTIONS</div>
                        <div className="text-xl font-mono text-blue-400">
                            {selectedNode.connections.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-gray-600 mt-1">TCP/UDP TRAFFIC</div>
                    </div>

                    <div className="flex flex-col justify-center">
                        {selectedNode.status === 'secure' ? (
                            <div className="text-center text-lux-green text-xs font-bold border border-lux-green/20 p-2 rounded-sm bg-lux-green/5">
                                <CheckCircle2 size={16} className="mx-auto mb-1"/>
                                SYSTEM SECURE
                            </div>
                        ) : (
                            <button 
                                onClick={() => patchNode(selectedNode.id)}
                                className="bg-lux-green hover:bg-white text-black font-bold py-3 text-xs uppercase tracking-widest rounded-sm transition-colors shadow-[0_0_15px_rgba(0,255,65,0.3)] animate-pulse"
                            >
                                <Lock size={14} className="inline mr-1"/>
                                DEPLOY PATCH
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}