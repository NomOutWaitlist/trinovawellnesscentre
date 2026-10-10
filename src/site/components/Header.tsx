import React, { useState } from 'react';
import { Phone, MapPin, Clock, Menu, X, ChevronRight, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { TrinovaLogo } from './TrinovaLogo';
import { Button } from '@/components/ui/button';

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
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top Bar - Clean & Direct */}
      <div className="bg-trinova-blue text-primary-foreground text-xs py-2 px-4 border-b border-trinova-blue-dark">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center flex-wrap gap-4 text-primary-foreground">
            <a
              href="tel:+19054957748"
              className="flex items-center gap-1.5 hover:text-leaf-green transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-leaf-green" />
              <span>{CLINIC_INFO.phoneDisplay}</span>
            </a>
            <span className="hidden sm:inline text-muted-foreground">·</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-leaf-green-light" />
              <span>Unit 204, 178 John St, Brampton</span>
            </div>
            <span className="hidden md:inline text-muted-foreground">·</span>
            <div className="hidden md:flex items-center gap-1.5 text-primary-foreground/85">
              <Clock className="w-3.5 h-3.5 text-leaf-green-light" />
              <span>Mon to Fri 8:30 AM to 7:30 PM | Sat 9 AM to 4 PM</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-leaf-green-light hidden sm:inline font-medium text-[11px] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Serving Brampton & Peel Region
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Brand Logo & Name */}
          <div
            onClick={() => handleNavClick('/')}
            role="link" tabIndex={0} aria-label="Trinova Wellness Centre home"
            onKeyDown={(event) => { if (event.key === "Enter") handleNavClick("/"); }}
            className="flex items-center cursor-pointer group py-1 shrink-0"
          >
            <TrinovaLogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.path ||
                (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <Button variant="ghost"
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-2.5 py-2 rounded-md text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-trinova-blue bg-trinova-blue-light font-bold'
                      : 'text-muted-foreground hover:text-trinova-blue hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Button>
              );
            })}
          </nav>

          {/* Action Button: Pill CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Button variant="ghost"
              onClick={() => handleNavClick('/book')}
              className="btn-pill-leaf text-sm px-6 py-2.5 shadow-none cursor-pointer"
            >
              <span>Book Appointment</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center">
            <Button variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-foreground hover:text-trinova-blue hover:bg-muted cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-background border-t border-border px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => {
            const isActive =
              currentPath === link.path ||
              (link.path !== '/' && currentPath.startsWith(link.path));
            return (
              <Button variant="ghost"
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`w-full text-left px-4 py-3 rounded-md text-base font-semibold flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-trinova-blue-light text-trinova-blue font-bold'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Button>
            );
          })}

          <div className="pt-3 border-t border-border flex flex-col gap-2.5">
            <Button variant="ghost"
              onClick={() => handleNavClick('/book')}
              className="btn-pill-leaf w-full justify-center text-sm py-3 cursor-pointer"
            >
              <span>Book an Appointment</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <a
              href="tel:+19054957748"
              className="btn-pill-outline w-full justify-center text-sm py-2.5 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-leaf-green" />
              <span>Call (905) 495-7748</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
