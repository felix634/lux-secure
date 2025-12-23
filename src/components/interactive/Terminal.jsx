import React, { useState, useEffect, useRef } from 'react';

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'output', content: 'LuxOS v4.1.18 initialized.' },
    { type: 'output', content: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  const commands = {
    help: 'Available commands: help, services, clear, contact, whoami',
    services: 'Listing services: Threat Detection, Red Team AI, IoT Defense...',
    contact: 'Email us: secure@lux.io',
    whoami: 'User: Guest | Clearance: Low',
    clear: 'CLEAR',
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const response = commands[cmd] || `Command not found: ${cmd}`;
      
      let newHistory = [...history, { type: 'input', content: input }];
      
      if (cmd === 'clear') {
        newHistory = [];
      } else {
        newHistory.push({ type: 'output', content: response });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="w-full h-[300px] bg-[#050505] border border-gray-800 rounded-sm p-4 font-mono text-xs md:text-sm overflow-hidden flex flex-col shadow-2xl">
      <div className="flex gap-2 mb-4 border-b border-gray-800 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        <span className="ml-auto text-gray-600">bash -- lux-shell</span>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1">
        {history.map((line, i) => (
          <div key={i} className={`${line.type === 'input' ? 'text-gray-400' : 'text-lux-green'}`}>
            {line.type === 'input' ? '$ ' : '> '}
            {line.content}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="mt-2 flex text-lux-green">
        <span className="mr-2">$</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none flex-1 text-gray-200 focus:ring-0"
          autoFocus
          spellCheck="false"
        />
      </div>
    </div>
  );
}