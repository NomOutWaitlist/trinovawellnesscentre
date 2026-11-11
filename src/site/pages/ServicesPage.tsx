import { Link } from '@tanstack/react-router';
import { BASE_SERVICES } from '../data/services';
export type { BaseService } from '../data/services';
import React, { useState } from 'react';
import { 
  Activity, 
  Heart, 
  Brain, 
  Salad, 
  ShieldCheck, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  CheckCircle2, 
  Clock, 
  User, 
  Car,
  Video,
  MapPin,
  Globe,
  Laptop
} from 'lucide-react';

interface ServicesPageProps {
  onNavigateToBook: (category?: string) => void;
  onNavigateToBalance: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ 
  onNavigateToBook, 
  onNavigateToBalance 
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [selectedDelivery, setSelectedDelivery] = useState<'All' | 'In-Person' | 'Virtual'>('All');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const [selectedSymptom, setSelectedSymptom] = useState<string>('Lower Back & Neck Pain');

  const categories = [
    'All',
    'Physical Care',
    'Mental Health',
    'Brain Health',
    'Gut & Nutrition',
    'Special Programs'
  ];

  const baseServices = BASE_SERVICES;

  const symptomQuickMatch: Record<string, {
    title: string;
    description: string;
    recommendedIds: string[];
    bookCategory: string;
  }> = {
    'Lower Back & Neck Pain': {
      title: 'Spinal Alignment & Muscle Relief',
      description: 'Finds where joints are stuck, relieves pinched nerves, and relaxes tight muscles with hands-on care.',
      recommendedIds: ['chiropractic', 'massage', 'osteopathy'],
      bookCategory: 'Spine, Pain & Muscle Care'
    },
    'Anxiety & Constant Stress': {
      title: 'Nervous System Calming & Talk Therapy (In-Person or Virtual)',
      description: 'Teaches your mind and body how to turn off the stress alarm so you can relax and sleep deeply. Connect in-person or virtually from anywhere.',
      recommendedIds: ['psychotherapy', 'clinical-psychology', 'braincore'],
      bookCategory: 'Therapy & Mental Health'
    },
    'Stomach Bloating & Fatigue': {
      title: 'Gut Reset & Dietary Coaching (In-Person or Virtual)',
      description: 'Stops uncomfortable stomach pressure, identifies problem foods, and rebuilds healthy digestion with virtual or in-person coaching.',
      recommendedIds: ['nutrition-coaching', 'gut-balance', 'esteck'],
      bookCategory: '12-Week Gut Reset'
    },
    'ADHD, Focus & Concussions': {
      title: 'Drug-Free Brain Training',
      description: 'Retrains brainwave frequencies with comfortable video feedback so focus and clarity return naturally.',
      recommendedIds: ['braincore', 'osteopathy'],
      bookCategory: 'Drug-Free Brain Training'
    },
    'Car Crash (MVA) Injury': {
      title: 'Direct-Billed MVA & Whiplash Recovery',
      description: 'Physical therapy and trauma counseling billed directly to your insurance company with zero paperwork hassle.',
      recommendedIds: ['mva-wsib', 'chiropractic', 'psychotherapy'],
      bookCategory: 'Spine, Pain & Muscle Care'
    }
  };

  const filteredServices = baseServices.filter(s => {
    const matchesCategory = selectedFilter === 'All' || s.category === selectedFilter;
    const matchesDelivery = 
      selectedDelivery === 'All' ? true :
      selectedDelivery === 'Virtual' ? s.isVirtualAvailable :
      !s.isVirtualAvailable;
    return matchesCategory && matchesDelivery;
  });

  const toggleExpand = (id: string) => {
    setExpandedServiceId(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-10 sm:space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#EBF1FF]/70 to-white pt-10 sm:pt-16 pb-8 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#006837] mb-2 block">
            Clinic Care Directory
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#0033A0] tracking-tight leading-tight">
            Chiropractic, Therapy & Wellness Services in Brampton
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto font-normal leading-relaxed">
            Collaborative physical therapy, hospital-grade mental health, drug-free brain training, and functional gut nutrition under one roof in Brampton, with select virtual services accessible from anywhere.
          </p>
        </div>
      </section>

      {/* In-Person & Virtual Telehealth Callout Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E8F8F0] border border-emerald-200/90 rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#006837] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Video className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-extrabold text-[#0033A0]">
                  In-Person & Virtual Telehealth Available
                </span>
                <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                  Connect From Anywhere
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                <strong>Nutrition consultations</strong> and <strong>psychological therapy services</strong> can be attended in person at our Brampton wellness centre or virtually from anywhere in Ontario and Canada through secure, encrypted video.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
            <button
              onClick={() => {
                setSelectedDelivery('Virtual');
                setSelectedFilter('All');
              }}
              className="text-xs font-bold text-[#006837] bg-white border border-emerald-300 hover:bg-emerald-50 px-4 py-2.5 rounded-full transition cursor-pointer w-full sm:w-auto text-center"
            >
              Filter Virtual Services
            </button>
          </div>
        </div>
      </section>

      {/* Quick Symptom Pathway Finder (Mobile Friendly) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-8 shadow-xs">
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#006837] block">
              Quick Care Finder
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-[#0033A0] mt-1">
              What would you like to improve?
            </h2>
          </div>

          {/* Symptom selector buttons - Scrollable on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none -mx-2 px-2">
            {Object.keys(symptomQuickMatch).map((symptom) => {
              const isSelected = selectedSymptom === symptom;
              return (
                <button
                  key={symptom}
                  onClick={() => setSelectedSymptom(symptom)}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-[#0033A0] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {symptom}
                </button>
              );
            })}
          </div>

          {/* Active Symptom Plan Preview */}
          <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#006837] uppercase tracking-wide">
                Recommended Care Plan
              </span>
              <div className="font-heading text-base sm:text-lg font-bold text-[#0033A0]">
                {symptomQuickMatch[selectedSymptom].title}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                {symptomQuickMatch[selectedSymptom].description}
              </p>
            </div>

            <button
              onClick={() => onNavigateToBook(symptomQuickMatch[selectedSymptom].bookCategory)}
              className="btn-pill-leaf shrink-0 text-xs py-3 px-6 justify-center"
            >
              <span>Book This Care</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Base Services Catalog */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filtering Bar */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#0033A0]">
                Base Services Directory
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Detailed clinical information: who needs it, what it is, delivery formats, and insurance coverage.
              </p>
            </div>

            {/* Delivery Format Toggle */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-full self-start sm:self-auto">
              <button
                onClick={() => setSelectedDelivery('All')}
                className={`text-xs px-3 py-1.5 rounded-full font-bold transition cursor-pointer ${
                  selectedDelivery === 'All' ? 'bg-[#0033A0] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Formats
              </button>
              <button
                onClick={() => setSelectedDelivery('Virtual')}
                className={`text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1 transition cursor-pointer ${
                  selectedDelivery === 'Virtual' ? 'bg-[#006837] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Video className="w-3 h-3" />
                <span>Virtual / Anywhere</span>
              </button>
              <button
                onClick={() => setSelectedDelivery('In-Person')}
                className={`text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1 transition cursor-pointer ${
                  selectedDelivery === 'In-Person' ? 'bg-slate-800 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapPin className="w-3 h-3" />
                <span>In-Person Only</span>
              </button>
            </div>
          </div>

          {/* Department Categories Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-[#0033A0] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards List - Mobile First */}
        <div className="space-y-5">
          {filteredServices.map((service) => {
            const isExpanded = expandedServiceId === service.id;

            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-8 shadow-xs hover:border-slate-300 transition"
              >
                {/* Top Meta Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#006837] bg-[#E8F8F0] px-2.5 py-0.5 rounded-full inline-block">
                      {service.category}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {service.specialist}
                    </span>
                  </div>

                  {/* Delivery Format Badge */}
                  <div className="flex items-center gap-1.5">
                    {service.isVirtualAvailable ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006837] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                        <Video className="w-3 h-3 text-[#00A651]" />
                        <span>In-Person & Virtual (Connect from Anywhere)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>In-Person (Brampton Clinic)</span>
                      </span>
                    )}

                    {service.id === 'gut-balance' && (
                      <span className="text-xs font-bold text-[#0033A0] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                        12-Week Personalized Protocol
                      </span>
                    )}
                  </div>
                </div>

                {/* Service Title */}
                <h4 className="font-heading font-extrabold text-xl sm:text-2xl text-[#0033A0] mb-3">
                  <Link to="/services/$serviceId" params={{ serviceId: service.id }} className="hover:underline">{service.title}</Link>
                </h4>

                {/* Delivery format quick notice */}
                <div className="mb-4 text-xs text-slate-600 flex items-center gap-1.5 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                  {service.isVirtualAvailable ? (
                    <>
                      <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>Delivery:</strong> Available in-person at our Brampton clinic or virtually through private telehealth video from anywhere in Ontario.</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-3.5 h-3.5 text-[#0033A0] shrink-0" />
                      <span><strong>Delivery:</strong> Conducted in-person at Unit 204, 178 John St, Brampton.</span>
                    </>
                  )}
                </div>

                {/* 1. What It Is Section */}
                <div className="mb-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    What It Is
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {service.whatItIs}
                  </p>
                </div>

                {/* 2. Who Needs It Section */}
                <div className="mb-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#006837] mb-2">
                    Who Needs It
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.whoNeedsIt.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-[#00A651] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. More On It (Expandable Details) */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 bg-blue-50/50 p-4 sm:p-5 rounded-2xl border border-blue-100/60 animate-in fade-in duration-200">
                    <div className="text-xs font-bold text-[#0033A0] uppercase tracking-wider">
                      More on this treatment:
                    </div>
                    
                    <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                      <div>
                        <strong className="text-slate-900">How it works: </strong>
                        {service.moreOnIt.howItWorks}
                      </div>
                      <div>
                        <strong className="text-slate-900">Session details: </strong>
                        {service.moreOnIt.sessionDetails}
                      </div>
                      <div>
                        <strong className="text-slate-900">Delivery details: </strong>
                        {service.deliveryDetails}
                      </div>
                      <div>
                        <strong className="text-slate-900">Insurance coverage: </strong>
                        {service.moreOnIt.coverage}
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions Bar */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    onClick={() => toggleExpand(service.id)}
                    className="text-xs font-bold text-[#0033A0] hover:text-[#002270] flex items-center gap-1 cursor-pointer self-start sm:self-auto py-1"
                  >
                    <span>{isExpanded ? 'Show less details' : 'More on this treatment'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {service.id === 'gut-balance' && (
                      <button
                        onClick={onNavigateToBalance}
                        className="text-xs font-bold text-[#006837] hover:underline px-3 py-2 cursor-pointer"
                      >
                        Program Details →
                      </button>
                    )}

                    <button
                      onClick={() => onNavigateToBook(service.bookCategory)}
                      className="btn-pill-leaf text-xs py-2.5 px-5 w-full sm:w-auto justify-center"
                    >
                      <span>Book Appointment</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct Billing & Regional Care Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0033A0] text-white rounded-3xl p-6 sm:p-10 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00A651]">
                Brampton & Remote Care
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                Direct Insurance Billing & Seamless Telehealth
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xl font-normal leading-relaxed">
                We submit claims directly to Sun Life, Canada Life, Manulife, Desjardins, Blue Cross, auto insurance (MVA), and WSIB. Attend in person at 178 John St or virtually from your laptop or phone.
              </p>
            </div>

            <button
              onClick={() => onNavigateToBook('Whole-Body & Mind Checkup')}
              className="btn-pill-leaf shrink-0 text-xs py-3.5 px-7 justify-center bg-[#00A651] hover:bg-[#008f45]"
            >
              <span>Schedule First Visit</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
