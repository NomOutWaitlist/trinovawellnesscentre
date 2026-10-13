import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { TrinovaLogo } from './TrinovaLogo';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLink = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#002270] text-slate-300 border-t-2 border-[#00A651]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="cursor-pointer" onClick={() => handleLink('/')}>
              <TrinovaLogo size="md" variant="white" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unit 204, 178 John Street<br />
              Brampton, Ontario, L6W 2Z1<br />
              <span className="text-emerald-300 font-semibold">Conveniently serving Brampton & Mississauga</span>
            </p>
            <div className="pt-1 text-xs text-slate-400 space-y-1">
              <div>
                Phone:{' '}
                <a href="tel:+19054957748" className="text-white font-bold hover:text-[#00A651]">
                  (905) 495-7748
                </a>
              </div>
              <div>
                Direct billing: Sun Life, Manulife, Canada Life, Green Shield, Blue Cross & more
              </div>
            </div>
          </div>

          {/* Col 2: Care */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-3">
              Clinical Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLink('/services')} className="hover:text-white cursor-pointer text-left">
                  BrainCore Neurofeedback (qEEG)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/services')} className="hover:text-white cursor-pointer text-left">
                  Psychotherapy & Trauma Counseling
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/services')} className="hover:text-white cursor-pointer text-left">
                  Chiropractic & Sports Injury Care
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/services')} className="hover:text-white cursor-pointer text-left">
                  Registered Massage Therapy (RMT)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/programs/balance')} className="text-emerald-300 hover:text-white font-medium cursor-pointer text-left">
                  The Balance Program (12-Week Gut Reset)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/youth-focus')} className="text-emerald-300 hover:text-white font-medium cursor-pointer text-left">
                  Youth & Teen Focus Program
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Areas & SEO */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-3">
              Areas We Serve
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLink('/areas-served')} className="text-emerald-300 hover:text-white font-semibold cursor-pointer text-left flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Brampton (Downtown, Bramalea, Springdale)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/areas-served')} className="text-emerald-300 hover:text-white font-semibold cursor-pointer text-left flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Mississauga (City Centre, Hurontario, Streetsville)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/areas-served')} className="hover:text-white cursor-pointer text-left">
                  Caledon & Bolton (15 min north)
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/areas-served')} className="hover:text-white cursor-pointer text-left">
                  Vaughan & Woodbridge
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/areas-served')} className="hover:text-white cursor-pointer text-left">
                  Georgetown & Halton Hills
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/contact')} className="hover:text-white cursor-pointer text-left text-slate-400">
                  Free On-Site Patient Parking
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Hours & Action */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-2">
              Clinic Hours
            </h4>
            <div className="text-xs text-slate-300 space-y-1">
              <div>Monday to Friday: 8:30 AM to 7:30 PM</div>
              <div>Saturday: 9:00 AM to 4:00 PM</div>
              <div>Sunday: By Special Appointment</div>
            </div>
            <div className="pt-2">
              <button
                onClick={() => handleLink('/book')}
                className="btn-pill-leaf text-xs py-2.5 px-5 shadow-xs w-full justify-center"
              >
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-blue-900/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <div>
            &copy; {new Date().getFullYear()} Trinova Wellness Centre Inc. · Brampton, Ontario · trinovacentre.com · All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400 flex-wrap">
            <span>Outpatient scheduled wellness care. In medical emergencies, please dial 911.</span>
            <span>·</span>
            <button
              onClick={() => handleLink('/portal')}
              className="hover:text-slate-200 underline cursor-pointer"
            >
              Staff Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
