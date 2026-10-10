import React, { useState } from 'react';
import { Phone, MapPin, Clock, Menu, X, ChevronRight, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { TrinovaLogo } from './TrinovaLogo';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Specialists', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Areas Served', path: '/areas-served' },
    { label: 'Gut Reset', path: '/programs/balance' },
    { label: 'Rewards', path: '/referral' },
    { label: 'Location', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Bar - Clean & Direct */}
      <div className="bg-[#0033A0] text-white text-xs py-2 px-4 border-b border-[#002270]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center flex-wrap gap-4 text-slate-100">
            <a
              href="tel:+19054957748"
              className="flex items-center gap-1.5 hover:text-[#00A651] transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-[#00A651]" />
              <span>{CLINIC_INFO.phoneDisplay}</span>
            </a>
            <span className="hidden sm:inline text-slate-400">·</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-300" />
              <span>Unit 204, 178 John St, Brampton (Near Mississauga)</span>
            </div>
            <span className="hidden md:inline text-slate-400">·</span>
            <div className="hidden md:flex items-center gap-1.5 text-slate-200">
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
              <span>Mon to Fri 8:30 AM to 7:30 PM | Sat 9 AM to 4 PM</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-emerald-300 hidden sm:inline font-medium text-[11px] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Serving Brampton, Mississauga & Peel Region
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <div
            onClick={() => handleNavClick('/')}
            className="flex items-center cursor-pointer group py-1"
          >
            <TrinovaLogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.path ||
                (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#0033A0] bg-[#EBF1FF] font-bold'
                      : 'text-slate-600 hover:text-[#0033A0] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action Button: Pill CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('/book')}
              className="btn-pill-leaf text-sm px-6 py-2.5 shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>Book Appointment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-[#0033A0] hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => {
            const isActive =
              currentPath === link.path ||
              (link.path !== '/' && currentPath.startsWith(link.path));
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-[#EBF1FF] text-[#0033A0] font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => handleNavClick('/book')}
              className="btn-pill-leaf w-full justify-center text-sm py-3 cursor-pointer"
            >
              <span>Book an Appointment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+19054957748"
              className="btn-pill-outline w-full justify-center text-sm py-2.5 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#00A651]" />
              <span>Call (905) 495-7748</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
