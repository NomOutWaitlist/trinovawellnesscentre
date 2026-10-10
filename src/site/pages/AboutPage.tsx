import React, { useState } from 'react';
import { PRACTITIONERS } from '../data/clinicData';
import { Award, ChevronRight, Check } from 'lucide-react';

interface AboutPageProps {
  onNavigateToBook: (practitionerName?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToBook }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');

  const departments = ['All', 'Leadership', 'Mental Health', 'Physical Rehab', 'Nutrition'];

  const filteredPractitioners = selectedDepartment === 'All'
    ? PRACTITIONERS
    : PRACTITIONERS.filter(p => p.department === selectedDepartment);

  const founder = PRACTITIONERS.find(p => p.isDirector)!;

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#EBF1FF]/60 to-white pt-14 pb-12 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#006837] mb-2 block">
            Multidisciplinary Directory
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#0033A0] tracking-tight">
            Eight practitioners. <span className="text-[#006837]">One team.</span>
          </h1>
          <p className="text-base text-slate-500 mt-3 max-w-xl mx-auto font-normal">
            Doctors and therapists who confer in weekly clinical rounds to keep your recovery on track.
          </p>
        </div>
      </section>

      {/* Founder Spotlight Card (Apple Minimalist) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-[#00A651]/10 text-[#006837] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              <Award className="w-3.5 h-3.5 text-[#00A651]" />
              Founder & Clinical Director
            </div>
            
            <div>
              <h2 className="font-heading text-3xl font-extrabold text-[#0033A0]">
                {founder.name}
              </h2>
              <div className="text-sm font-bold text-slate-500 mt-0.5">
                {founder.credentials}
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Combines psychotherapy and functional nutrition to create bio-individual care roadmaps. Overcoming treatment-resistant depression, anxiety, trauma, and chronic disease.
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {['CBT', 'EMDR', 'Functional Nutrition', 'EFT', 'Mindfulness'].map((mod) => (
                <span
                  key={mod}
                  className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full"
                >
                  {mod}
                </span>
              ))}
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={() => onNavigateToBook(founder.name)}
              className="btn-pill-leaf text-xs sm:text-sm px-7 py-3.5 w-full md:w-auto shadow-md"
            >
              <span>Book Consultation with Dr. Anthony</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Practitioners Directory */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Department Filter Pills */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <h3 className="font-heading text-xl font-extrabold text-[#0033A0]">
            All Clinical Specialists
          </h3>
          <div className="flex items-center gap-1.5 flex-wrap">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                  selectedDepartment === dept
                    ? 'bg-[#0033A0] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Minimal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPractitioners.map((practitioner) => (
            <div
              key={practitioner.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:border-slate-300 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#006837] bg-[#E8F8F0] px-2.5 py-0.5 rounded-full">
                    {practitioner.department}
                  </span>
                  {practitioner.experienceYears && (
                    <span className="text-[11px] font-bold text-slate-400">
                      {practitioner.experienceYears}+ Years Experience
                    </span>
                  )}
                </div>

                <h4 className="font-heading font-extrabold text-xl text-[#0033A0]">
                  {practitioner.name}
                </h4>
                <div className="text-xs font-bold text-slate-400 mb-2">
                  {practitioner.credentials} · {practitioner.role}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {practitioner.bio.split('.')[0]}. {practitioner.bio.split('.')[1]}.
                </p>

                {/* Focus Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {practitioner.focus.slice(0, 3).map((f, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium bg-slate-50 text-slate-700 px-2.5 py-0.5 rounded border border-slate-100"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigateToBook(practitioner.name)}
                  className="font-heading font-bold text-xs text-[#0033A0] hover:text-[#002270] flex items-center gap-1 cursor-pointer"
                >
                  Request with {practitioner.name.split(' ')[0]} <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
