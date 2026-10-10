import React, { useState } from 'react';
import { CareJourneyTimeline } from '../components/CareJourneyTimeline';
import { DiagnosticTechShowcase } from '../components/DiagnosticTechShowcase';
import { InteractiveHealthMatrix } from '../components/InteractiveHealthMatrix';
import { BrainwaveVisualizer } from '../components/BrainwaveVisualizer';
import { CLINIC_INFO, PRACTITIONERS, THE_BALANCE_PROGRAM } from '../data/clinicData';
import { 
  ArrowRight, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Activity, 
  HeartHandshake, 
  BrainCircuit, 
  Salad, 
  ChevronRight, 
  Gift, 
  Check,
  CheckCircle2,
  Clock,
  Car
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Interactive Symptom Matcher state
  const [selectedIssue, setSelectedIssue] = useState<string>('Back & Neck Pain');

  const issuesList = [
    'Back & Neck Pain',
    'Anxiety & Stress',
    'ADHD & Brain Fog',
    'Bloating & Gut Trouble',
    'Sleep & Insomnia',
    'Car Crash / MVA Injury'
  ];

  const issueSolutions: Record<string, {
    title: string;
    specialist: string;
    description: string;
    deliverables: string[];
    categoryToBook: string;
  }> = {
    'Back & Neck Pain': {
      title: 'Spinal Alignment & Deep Muscle Relief',
      specialist: 'Dr. Paulette Higgins-Moncrieffe & Seyi Oladipo (RMT)',
      description: 'Gentle chiropractic adjustments, joint decompression, and deep tissue massage to release stubborn knots and correct poor posture.',
      deliverables: ['Pinpoint root-cause joint misalignments', 'Release deep neck, shoulder, and lower back tension', 'Custom foot orthotics if feet cause spinal strain'],
      categoryToBook: 'Spine, Pain & Muscle Care'
    },
    'Anxiety & Stress': {
      title: 'Therapy & Nervous System Calming',
      specialist: 'Dr. Jennifer Anthony (PhD, RP) & Stacy Yong (19+ yrs exp)',
      description: 'Safe, compassionate talk therapy (CBT, EMDR) paired with calming techniques to break the cycle of racing thoughts and emotional burnout.',
      deliverables: ['Hospital-grade counseling (CAMH veteran therapist)', 'EMDR trauma recovery for painful memories', 'Practical tools to handle daily anxiety'],
      categoryToBook: 'Therapy & Mental Health'
    },
    'ADHD & Brain Fog': {
      title: 'Drug-Free BrainCore Brainwave Training',
      specialist: 'Dr. Jennifer Anthony & Clinical Tech Team',
      description: 'Retrain brainwave frequencies without medication. You sit back and watch a movie while gentle sensors teach your brain how to focus and stay calm.',
      deliverables: ['100% painless and medication-free', 'Proven for children, teens, and adults with ADHD', 'Visible before-and-after improvements on screen'],
      categoryToBook: 'Drug-Free Brain Training'
    },
    'Bloating & Gut Trouble': {
      title: '12-Week Gut Reset & Food Trigger Discovery',
      specialist: 'Michelle Ching (Holistic Nutritionist) & Dr. Anthony',
      description: 'Stop daily abdominal bloating, pinpoint what foods upset your system, and rebuild your digestive lining with step-by-step coaching ($3,300).',
      deliverables: ['Identify hidden trigger foods that cause discomfort', 'Sooth stomach inflammation and gas', 'Pre- and post-reset full body scans'],
      categoryToBook: '12-Week Gut Reset'
    },
    'Sleep & Insomnia': {
      title: 'Restorative Sleep & Nervous System Reset',
      specialist: 'Dr. Jennifer Anthony & Vishma Lamichhane (Osteopathy)',
      description: 'Reset nighttime delta brainwave patterns and ease neck and jaw tension so you fall asleep naturally and wake up refreshed.',
      deliverables: ['Re-train overactive racing nighttime brainwaves', 'Gentle osteopathic craniosacral head and neck release', 'Drug-free, long-term sleep restoration'],
      categoryToBook: 'Drug-Free Brain Training'
    },
    'Car Crash / MVA Injury': {
      title: 'Coordinated MVA & WSIB Rehabilitation',
      specialist: 'Stacy Yong (RP), Dr. Higgins-Moncrieffe & Seyi Oladipo',
      description: 'Integrated physical rehabilitation and trauma processing for individuals injured in motor vehicle collisions or on the job.',
      deliverables: ['Direct insurance billing with zero out-of-pocket hassle', 'Whiplash, spinal recovery & soft tissue rehab', 'Emotional trauma and driving anxiety support'],
      categoryToBook: 'Spine, Pain & Muscle Care'
    }
  };

  const activeSolution = issueSolutions[selectedIssue];

  return (
    <div className="space-y-24 pb-24">
      {/* Cinematic Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Location Pill */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-[#E8F8F0] px-4 py-1.5 rounded-full text-xs font-bold text-[#006837] uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-[#00A651]" />
              <span>Serving Brampton, Mississauga & Peel Region · 178 John St</span>
            </div>
          </div>

          {/* Simple, Impactful Headline */}
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#0033A0] tracking-tight leading-[1.08] mb-6">
              Complete healthcare. <br />
              <span className="text-[#006837]">All under one roof.</span>
            </h1>
            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Pain relief, therapy, drug-free brain training, and gut health. Eight licensed specialists collaborating together in Brampton, just minutes from Mississauga. Select nutrition and psychological services available virtually from anywhere.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => onNavigate('/book')}
              className="btn-pill-leaf text-base px-9 py-4 shadow-lg w-full sm:w-auto cursor-pointer"
            >
              <span>Book an Appointment</span>
              <ChevronRight className="w-5 h-5" />
            </button>

            <a
              href="tel:+19054957748"
              className="btn-pill-outline text-base px-8 py-3.5 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#00A651]" />
              <span>(905) 495-7748</span>
            </a>
          </div>

          {/* Clinic Interior Showcase with Stats Bar */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 group">
            <img
              src="/images/trinova_clinic_interior_1791561947732.jpg"
              alt="Trinova Wellness Centre clinic interior in Brampton"
              className="w-full h-[360px] sm:h-[480px] object-cover object-center group-hover:scale-102 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            
            {/* Floating Glass Bar */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-slate-900">
              <div className="flex items-center gap-6 text-xs font-bold text-slate-700 flex-wrap justify-center sm:justify-start">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A651]" />
                  <span>8 Licensed Specialists</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0033A0]" />
                  <span>In-Person & Virtual Telehealth</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006837]" />
                  <span>Direct Insurance Billing</span>
                </div>
              </div>

              <div className="text-xs font-semibold text-slate-600 hidden md:block">
                Unit 204, 178 John St, Brampton · Free Visitor Parking
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Symptom Selector (Apple Clean) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-12 shadow-sm">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006837] mb-2 block">
              Personalized Matching
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0033A0] tracking-tight">
              What can we help you solve?
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2 font-normal">
              Tap a symptom below to see the exact team and approach matched to your need.
            </p>
          </div>

          {/* Interactive Chips */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {issuesList.map((issue) => {
              const isSelected = selectedIssue === issue;
              return (
                <button
                  key={issue}
                  onClick={() => setSelectedIssue(issue)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#0033A0] text-white shadow-md scale-[1.02]'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {issue}
                </button>
              );
            })}
          </div>

          {/* Solution Preview Card */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#006837] bg-[#E8F8F0] px-3 py-1 rounded-full inline-block mb-2">
                  Matched Care Pathway
                </span>
                <h3 className="font-heading text-2xl font-extrabold text-[#0033A0]">
                  {activeSolution.title}
                </h3>
                <div className="text-xs font-bold text-slate-600 mt-1">
                  Led by: {activeSolution.specialist}
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {activeSolution.description}
              </p>

              <div className="space-y-2 pt-2">
                {activeSolution.deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-white rounded-xl p-6 border border-slate-200/80 text-center space-y-3 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Ready to Start?
              </span>
              <div className="text-xs text-slate-600">
                Book a consultation for this symptom in Brampton.
              </div>
              <button
                onClick={() => onNavigate('/book')}
                className="btn-pill-leaf w-full justify-center text-xs py-3 shadow-md cursor-pointer"
              >
                <span>Book for This Concern</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="text-[11px] text-slate-400">
                Direct insurance billing available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars in Plain English */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#006837] mb-2 block">
            Our Specialties
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0033A0]">
            Four ways we help you heal.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Tile 1 */}
          <div 
            onClick={() => onNavigate('/services')}
            className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:border-[#0033A0]/40 transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0033A0]/10 text-[#0033A0] flex items-center justify-center mb-5">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-lg text-[#0033A0] mb-1.5">
                Brain Training
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Drug-free brainwave sessions for ADHD, anxiety, panic, sleep troubles, and concussions.
              </p>
            </div>
            <div className="text-xs font-bold text-[#0033A0] mt-6 flex items-center gap-1">
              Learn More <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Tile 2 */}
          <div 
            onClick={() => onNavigate('/services')}
            className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:border-[#006837]/40 transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#006837]/10 text-[#006837] flex items-center justify-center mb-5">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-lg text-[#006837] mb-1.5">
                Counseling & Therapy
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Compassionate talk therapy and EMDR trauma recovery with hospital-trained counselors.
              </p>
            </div>
            <div className="text-xs font-bold text-[#006837] mt-6 flex items-center gap-1">
              Learn More <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Tile 3 */}
          <div 
            onClick={() => onNavigate('/services')}
            className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:border-blue-400 transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#0033A0] flex items-center justify-center mb-5">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-lg text-[#0033A0] mb-1.5">
                Spine, Rehab & Massage
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Chiropractic adjustments, osteopathic alignment, deep tissue massage, and custom orthotics.
              </p>
            </div>
            <div className="text-xs font-bold text-[#0033A0] mt-6 flex items-center gap-1">
              Learn More <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Tile 4 */}
          <div 
            onClick={() => onNavigate('/programs/balance')}
            className="bg-white rounded-3xl p-7 border border-[#00A651]/30 shadow-xs hover:border-[#00A651] transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E8F8F0] text-[#006837] flex items-center justify-center mb-5">
                <Salad className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-lg text-[#006837] mb-1.5">
                12-Week Gut Reset
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Stop stomach bloating, discover trigger foods, and rebuild gut health with private coaching ($3,300).
              </p>
            </div>
            <div className="text-xs font-bold text-[#006837] mt-6 flex items-center gap-1">
              Learn More <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Health Matrix */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractiveHealthMatrix onBook={() => onNavigate('/book')} />
      </section>

      {/* Live Brainwave Visualizer */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BrainwaveVisualizer onBook={() => onNavigate('/book')} />
      </section>

      {/* Photo Split: Drug-Free Care */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 p-8 sm:p-14 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006837] block">
              Drug-Free Care
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0033A0] leading-tight">
              Watch a movie. Train your brain.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              You recline comfortably watching a movie or listening to audio while gentle sensors monitor your natural brainwaves. When your brain is relaxed and focused, the screen stays clear. Over 20 to 30 sessions, your brain naturally learns how to calm down and focus on its own.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                <Check className="w-4 h-4 text-[#00A651]" />
                <span>100% drug-free, painless, and relaxing</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                <Check className="w-4 h-4 text-[#00A651]" />
                <span>Sessions last 30 to 45 minutes</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                <Check className="w-4 h-4 text-[#00A651]" />
                <span>See before-and-after proof on screen</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/book')}
              className="btn-pill-leaf text-xs py-3 px-7 mt-4 cursor-pointer"
            >
              <span>Schedule Brain Training</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="lg:col-span-6 h-full min-h-[340px]">
            <img
              src="/images/neurofeedback_session_1791561964712.jpg"
              alt="BrainCore neurofeedback session in luxury suite"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* 4-Phase Care Journey */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <CareJourneyTimeline onNavigateToBook={() => onNavigate('/book')} />
      </section>

      {/* Diagnostic Technologies Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <DiagnosticTechShowcase onNavigateToBook={() => onNavigate('/book')} />
      </section>

      {/* Founder Spotlight: Dr. Jennifer Anthony */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl border border-slate-200/80 p-8 sm:p-12 mb-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-white">
            <img
              src="/images/dr_jennifer_anthony_1791561981144.jpg"
              alt="Dr. Jennifer Anthony, Founder & Clinical Director"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#006837] bg-emerald-100/60 px-3 py-0.5 rounded-full inline-block">
              Founder & Clinical Director
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0033A0]">
              Dr. Jennifer Anthony, PhD, RP
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              &ldquo;True health connects your physical body, mental health, brain, and digestion under one roof. When you treat the root cause instead of just covering up symptoms, you can finally feel like yourself again.&rdquo;
            </p>
            <div className="pt-1 flex items-center justify-center md:justify-start gap-4 text-xs font-semibold text-[#0033A0]">
              <span>Therapy · Trauma Recovery · Gut Health</span>
              <span>·</span>
              <button
                onClick={() => onNavigate('/about')}
                className="hover:underline font-bold"
              >
                Meet All 8 Specialists →
              </button>
            </div>
          </div>
        </div>

        {/* 4 Team Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRACTITIONERS.slice(0, 4).map((p) => (
            <div
              key={p.id}
              onClick={() => onNavigate('/about')}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:border-[#0033A0]/30 transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#006837] bg-[#E8F8F0] px-2.5 py-0.5 rounded-full inline-block mb-3">
                  {p.department}
                </span>
                <h3 className="font-heading font-extrabold text-base text-[#0033A0]">
                  {p.name}
                </h3>
                <div className="text-xs text-slate-500 font-semibold mb-2">
                  {p.credentials}
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                  {p.role}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 text-xs font-bold text-[#0033A0] flex items-center justify-between">
                <span>View Profile</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Balance Program Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0033A0] to-[#002270] text-white rounded-3xl p-8 sm:p-14 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00A651] bg-white/10 px-3.5 py-1 rounded-full inline-block">
              12-Week Gut Reset
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
              The Balance Program
            </h2>
            <p className="text-sm text-blue-100 leading-relaxed font-normal">
              Stop daily stomach bloating, heal your digestion, and restore healthy energy with private nutrition coaching and before-and-after body scans.
            </p>
            <div className="text-xs text-emerald-300 font-semibold pt-1">
              Month 1: Calm Bloating · Month 2: Rebuild Gut · Month 3: Add Foods Back
            </div>
          </div>

          <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 text-center shrink-0 w-full sm:w-80 shadow-2xl space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Complete 12-Week Program
            </div>
            <div className="font-heading font-extrabold text-4xl text-[#0033A0]">
              $3,300
            </div>
            <div className="text-[11px] text-slate-500 font-semibold">
              Tax inclusive · Includes all appointments & body scans
            </div>
            <button
              onClick={() => onNavigate('/programs/balance')}
              className="btn-pill-leaf w-full justify-center text-xs py-3 cursor-pointer"
            >
              <span>Explore Gut Reset</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Patient Referral Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E8F8F0] border border-[#00A651]/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#00A651] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base text-[#0033A0]">
                Invite a friend. Earn 100 reward points.
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Redeem for $25 to $150 in clinic credits and prepaid gift cards.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('/referral')}
            className="btn-pill-leaf text-xs py-2.5 px-6 shrink-0 cursor-pointer"
          >
            Refer a Friend
          </button>
        </div>
      </section>

      {/* Regional Care & Nearby Service Areas */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EBF1FF]/70 rounded-3xl border border-blue-200/80 p-8 sm:p-12 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1 rounded-full text-xs font-bold text-[#0033A0] uppercase tracking-wider mb-2 border border-blue-100 shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-[#00A651]" />
                <span>Regional Care Network</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-[#0033A0]">
                Serving Brampton, Mississauga & Nearby Areas
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-2 leading-relaxed">
                Centrally located at 178 John Street in Brampton, our collaborative clinic is within a 12 to 20 minute drive for residents across Peel Region and the Greater Toronto Area.
              </p>
            </div>

            <button
              onClick={() => onNavigate('/areas-served')}
              className="btn-pill-leaf text-xs py-3 px-6 shrink-0 cursor-pointer self-start md:self-auto"
            >
              <span>Explore All Areas & Routes</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading font-bold text-sm text-[#0033A0]">Brampton</span>
                <span className="text-[11px] font-bold text-[#006837] bg-emerald-50 px-2 py-0.5 rounded-full">0 to 10 min</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Downtown Brampton, Peel Village, Bramalea, Springdale, Mount Pleasant & Castlemore. Free on-site parking.
              </p>
              <div className="text-[11px] text-[#00A651] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Home Clinic Location</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading font-bold text-sm text-[#0033A0]">Mississauga</span>
                <span className="text-[11px] font-bold text-[#006837] bg-emerald-50 px-2 py-0.5 rounded-full">15 to 18 min</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Square One, Streetsville, Meadowvale, Hurontario & Malton. Direct route north via Highway 410.
              </p>
              <div className="text-[11px] text-[#00A651] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Neurofeedback & RMT</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading font-bold text-sm text-[#0033A0]">Caledon & Bolton</span>
                <span className="text-[11px] font-bold text-[#006837] bg-emerald-50 px-2 py-0.5 rounded-full">18 to 22 min</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                South along Highway 10 / Hurontario or Airport Road. Drug-free concussion recovery and spinal care.
              </p>
              <div className="text-[11px] text-[#00A651] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Spinal & Joint Rehab</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading font-bold text-sm text-[#0033A0]">Vaughan & Halton</span>
                <span className="text-[11px] font-bold text-[#006837] bg-emerald-50 px-2 py-0.5 rounded-full">18 to 25 min</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Woodbridge, Georgetown, and Halton Hills via Queen Street West / Highway 7 and Highway 407.
              </p>
              <div className="text-[11px] text-[#00A651] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Gut Reset & Psychotherapy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brampton Clinic Location & Contact Card */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006837] mb-1 block">
              Brampton Clinic
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0033A0]">
              Unit 204, 178 John Street
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Comfortable 2nd-floor clinic with elevator access and free visitor parking. Serving Brampton, Mississauga, and the Greater Toronto Area.
            </p>
            <div className="text-xs text-slate-500 pt-1">
              Mon to Fri 8:30 AM to 7:30 PM · Sat 9:00 AM to 4:00 PM
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => onNavigate('/book')}
              className="btn-pill-leaf text-sm px-8 py-3.5 w-full sm:w-auto shadow-md cursor-pointer"
            >
              <span>Book an Appointment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+19054957748"
              className="btn-pill-outline text-sm px-7 py-3 w-full sm:w-auto text-center cursor-pointer"
            >
              Call (905) 495-7748
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
