import React, { useState, useEffect, useRef } from 'react';

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'output', content: 'LuxOS v4.1.18 initialized.' },
    { type: 'output', content: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  
  // Reference to the scrollable container
  const containerRef = useRef(null);

  // 1. Defined commands and their text responses
  const commands = {
    help: 'NAVIGATION: company, solutions, vault, lab // SYSTEM: clear, whoami, contact',
    
    // Navigation Responses
    company: 'Initiating transfer to Company Profile (/about)...',
    solutions: 'Accessing Solutions Database...',
    vault: 'Requesting Level-5 Clearance for Vault access...',
    lab: 'Booting Simulation Environment...',
    
    // System Responses
    contact: 'Secure Channel: secure@lux.io',
    whoami: 'User: Guest | Clearance: Low',
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      
      // 2. Handle "Clear" command separately
      if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      }

      // 3. Get response or error message
      const response = commands[cmd] || `Command not found: "${cmd}". Type "help".`;
      
      // Update History (Input + Output)
      const newHistory = [...history, { type: 'input', content: input }, { type: 'output', content: response }];
      setHistory(newHistory);
      setInput('');

      // 4. Handle Redirection Logic (The "Magic")
      // We use a timeout so the user can read the confirmation message before the page changes
      if (cmd === 'company') setTimeout(() => window.location.href = '/about', 800);
      if (cmd === 'solutions') setTimeout(() => window.location.href = '/solutions', 800);
      if (cmd === 'vault') setTimeout(() => window.location.href = '/vault', 800);
      if (cmd === 'lab') setTimeout(() => window.location.href = '/testing-lab', 800);
    }
  };

  // Scroll to bottom on new history
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="w-full h-[300px] bg-[#050505] border border-gray-800 rounded-sm p-4 font-mono text-xs md:text-sm overflow-hidden flex flex-col shadow-2xl relative z-20">
      
      {/* Terminal Header */}
      <div className="flex gap-2 mb-4 border-b border-gray-800 pb-2 select-none">
        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        <span className="ml-auto text-gray-600 text-[10px] md:text-xs">bash -- lux-shell</span>
      </div>
      
      {/* Output Area */}
      <div ref={containerRef} className="flex-1 overflow-y-auto scrollbar-hide space-y-1 mb-2">
        {history.map((line, i) => (
          <div key={i} className={`${line.type === 'input' ? 'text-gray-500' : 'text-lux-green'}`}>
            {line.type === 'input' ? '$ ' : '> '}
            {line.content}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex text-lux-green items-center">
        <span className="mr-2 animate-pulse">$</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none flex-1 text-gray-200 focus:ring-0 placeholder-gray-800"
          placeholder="Type command..."
          spellCheck="false"
          autoComplete="off"
        />
      </div>
    </div>
  );
}