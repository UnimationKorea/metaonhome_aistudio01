
import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'MetaOn?', link: '/about' },
    { name: 'Features', link: '/features' },
    { name: 'Clients', link: '/clients' },
    { name: 'News', link: '/news' },
    { name: 'Contact', link: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || location.pathname !== '/' ? 'bg-[#0B0B0F]/90 backdrop-blur-md py-4 shadow-xl border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-purple rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <span className="font-bold text-white">M</span>
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase">META<span className="text-purple-500">ON</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              to={link.link} 
              className={`text-sm font-medium transition-colors hover:text-purple-400 ${isActive(link.link) ? 'text-purple-500' : 'text-gray-300'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/admin" className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500">
            <Shield size={18} />
          </Link>
          <Link to="/contact" className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105">
            Request Demo
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0B0B0F] border-b border-white/10 p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top duration-300">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              to={link.link} 
              onClick={() => setIsOpen(false)} 
              className={`text-lg font-medium border-b border-white/5 pb-2 ${isActive(link.link) ? 'text-purple-500' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/admin" onClick={() => setIsOpen(false)} className="text-gray-400">Admin Dashboard</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
