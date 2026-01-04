
import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Mission', link: '/about' },
    { name: 'Experience', link: '/features' },
    { name: 'Network', link: '/clients' },
    { name: 'Global News', link: '/news' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled || location.pathname !== '/' ? 'bg-[#0B0B0F]/90 backdrop-blur-2xl py-4 shadow-2xl border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-purple rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover:rotate-6 transition-all">
            <span className="font-black text-white italic">M</span>
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase">META<span className="text-purple-500">ON</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8 border-r border-white/10 pr-10">
            {navLinks.map(link => (
              <Link 
                key={link.name} 
                to={link.link} 
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-purple-400 ${isActive(link.link) ? 'text-purple-500' : 'text-gray-400'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <Link to="/contact" className="bg-white text-black hover:bg-purple-600 hover:text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl">
              Get Started
            </Link>
            <Link to="/admin" className="p-3 hover:bg-white/5 rounded-full transition-colors text-gray-500">
              <Shield size={18} />
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white p-2 bg-white/5 rounded-xl border border-white/5" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0B0B0F]/95 backdrop-blur-3xl border-b border-white/10 p-8 flex flex-col gap-6 lg:hidden animate-in slide-in-from-top duration-300">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              to={link.link} 
              onClick={() => setIsOpen(false)} 
              className={`text-xl font-black uppercase tracking-tight flex justify-between items-center ${isActive(link.link) ? 'text-purple-500' : 'text-gray-400'}`}
            >
              {link.name} <ChevronRight size={18} className="text-gray-700"/>
            </Link>
          ))}
          <div className="pt-8 mt-4 border-t border-white/5 flex flex-col gap-4">
             <Link to="/contact" onClick={() => setIsOpen(false)} className="w-full bg-purple-600 py-5 rounded-2xl text-center font-black uppercase tracking-widest text-sm shadow-xl shadow-purple-900/40">Request a Demo</Link>
             <Link to="/admin" onClick={() => setIsOpen(false)} className="w-full py-5 rounded-2xl text-center font-black uppercase tracking-widest text-xs text-gray-600 bg-white/5">Administrator Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
