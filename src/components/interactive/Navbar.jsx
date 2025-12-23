import React, { useState } from 'react';
import { solutionsData } from '../../data/solutions';
import { ChevronDown, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 lux-glass border-b border-lux-green/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <ShieldCheck className="text-lux-green w-8 h-8" />
            <a href="/" className="font-bold text-xl tracking-tighter text-white">LUX <span className="text-lux-green">SECURE</span></a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="/" className="hover:text-lux-green px-3 py-2 rounded-md text-sm font-medium transition-colors">STATUS</a>
              
              {/* Dropdown Wrapper */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <a href="/solutions" className="group flex items-center gap-1 hover:text-lux-green px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                  SOLUTIONS <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </a>

                {/* Dropdown Content */}
                <div className={`absolute left-1/2 -translate-x-1/2 w-[500px] bg-lux-dark border border-lux-green/30 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,65,0.1)] rounded-sm mt-2 p-4 grid grid-cols-2 gap-4 transition-all duration-300 ease-in-out origin-top ${isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                    {solutionsData.map((s) => (
                        <a key={s.id} href={s.href} className="block p-3 hover:bg-lux-green/10 rounded-md transition-colors group/item">
                            <div className="flex items-center gap-2 text-lux-green mb-1">
                                <s.icon className="w-4 h-4" />
                                <span className="font-bold text-xs uppercase tracking-wider">{s.title}</span>
                            </div>
                            <p className="text-[10px] text-gray-400 group-hover/item:text-gray-200">{s.description}</p>
                        </a>
                    ))}
                </div>
              </div>

              <a href="/vault" className="hover:text-lux-green px-3 py-2 rounded-md text-sm font-medium transition-colors">VAULT</a>
              <a href="/testing-lab" className="hover:text-lux-green px-3 py-2 rounded-md text-sm font-medium transition-colors">LAB</a>
              <a href="/consult" className="border border-lux-green/50 text-lux-green hover:bg-lux-green hover:text-black px-4 py-2 rounded-sm text-sm font-bold transition-all shadow-[0_0_10px_rgba(0,255,65,0.2)] hover:shadow-[0_0_20px_rgba(0,255,65,0.6)]">CONSULT</a>
            </div>
          </div>
          
          {/* Mobile Button */}
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-400 hover:text-white p-2">
                {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}