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

export interface BaseService {
  id: string;
  category: 'Physical Care' | 'Mental Health' | 'Brain Health' | 'Gut & Nutrition' | 'Special Programs';
  title: string;
  specialist: string;
  deliveryFormat: 'In-Person & Virtual Telehealth' | 'In-Person (Brampton Clinic)';
  deliveryDetails: string;
  isVirtualAvailable: boolean;
  whatItIs: string;
  whoNeedsIt: string[];
  moreOnIt: {
    howItWorks: string;
    sessionDetails: string;
    coverage: string;
  };
  bookCategory: string;
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

  const baseServices: BaseService[] = [
    {
      id: 'chiropractic',
      category: 'Physical Care',
      title: 'Chiropractic Care & Sports Medicine',
      specialist: 'Dr. Paulette Higgins-Moncrieffe, D.C.',
      deliveryFormat: 'In-Person (Brampton Clinic)',
      deliveryDetails: 'In-person hands-on care at Unit 204, 178 John St, Brampton using ergonomic spinal decompression and adjustive suites.',
      isVirtualAvailable: false,
      whatItIs: 'Hands-on care to restore proper movement to your spine and joints. We gently relieve pressure on pinched nerves and tight muscles so you can walk, bend, and work without nagging pain.',
      whoNeedsIt: [
        'Persistent lower back pain or hip tightness',
        'Stiff neck and shoulder tension from sitting at a desk',
        'Shooting nerve pain or numbness down the leg (sciatica)',
        'Sports injuries, sprains, or joint mobility restrictions'
      ],
      moreOnIt: {
        howItWorks: 'During your visit, Dr. Higgins-Moncrieffe checks your posture, joint range of motion, and spinal alignment. Treatments include gentle joint adjustments, muscle work, active rehab exercises, and posture coaching.',
        sessionDetails: 'Initial assessment takes 45 to 60 minutes. Follow-up visits are 15 to 30 minutes in our Brampton clinic.',
        coverage: 'Covered by almost all standard Ontario workplace extended health plans.'
      },
      bookCategory: 'Spine, Pain & Muscle Care'
    },
    {
      id: 'osteopathy',
      category: 'Physical Care',
      title: 'Osteopathy & Whole-Body Alignment',
      specialist: 'Vishma Lamichhane, M.OMSc',
      deliveryFormat: 'In-Person (Brampton Clinic)',
      deliveryDetails: 'In-person gentle bodywork in our quiet Brampton treatment suite.',
      isVirtualAvailable: false,
      whatItIs: 'A gentle, soothing hands-on therapy that treats the entire body as one connected system. We balance joints, ligaments, and internal tension without cracking or popping your bones.',
      whoNeedsIt: [
        'Chronic full-body stiffness that massages do not seem to fix',
        'Tension headaches and pressure around the skull or jaw',
        'Digestive bloating and abdominal discomfort linked to posture',
        'Pelvic imbalance or rib pain when taking a deep breath'
      ],
      moreOnIt: {
        howItWorks: 'Vishma uses gentle craniosacral head release, subtle joint rocking, and visceral abdominal alignment. It calms your nervous system and allows tight tissues to soften naturally.',
        sessionDetails: 'Visits are 45 to 60 minutes in a quiet, peaceful treatment room.',
        coverage: 'Covered under Osteopathy on most private insurance plans.'
      },
      bookCategory: 'Spine, Pain & Muscle Care'
    },
    {
      id: 'massage',
      category: 'Physical Care',
      title: 'Registered Massage Therapy (RMT)',
      specialist: 'Seyi Oladipo, RMT (CMTO)',
      deliveryFormat: 'In-Person (Brampton Clinic)',
      deliveryDetails: 'In-person therapeutic massage in private sound-insulated rooms at our Brampton location.',
      isVirtualAvailable: false,
      whatItIs: 'Clinical, licensed hands-on massage tailored to your exact comfort level. We release stubborn knots, improve blood circulation, and soothe tight muscles throughout your back, neck, and shoulders.',
      whoNeedsIt: [
        'Knots and burning tightness between your shoulder blades',
        'Tense neck muscles from long hours on a phone or computer',
        'Post-workout muscle soreness or athletic recovery needs',
        'High everyday stress that keeps your shoulders hunched'
      ],
      moreOnIt: {
        howItWorks: 'Seyi combines deep tissue massage, trigger point knot release, and gentle muscle stretching. He checks in on pressure throughout your session to ensure you are comfortable.',
        sessionDetails: 'Sessions are 30, 45, or 60 minutes. Direct billing is available for most insurers.',
        coverage: '100% eligible under Registered Massage Therapy extended benefits.'
      },
      bookCategory: 'Spine, Pain & Muscle Care'
    },
    {
      id: 'psychotherapy',
      category: 'Mental Health',
      title: 'Psychotherapy & Mental Health Counseling',
      specialist: 'Dr. Jennifer Anthony (PhD, RP), Stacy Yong (RP), Shanna-Kay Stephens (RSW)',
      deliveryFormat: 'In-Person & Virtual Telehealth',
      deliveryDetails: 'Available in-person at our Brampton clinic or virtually through encrypted video sessions from anywhere in Ontario and Canada.',
      isVirtualAvailable: true,
      whatItIs: 'Safe, completely confidential talk therapy and trauma counseling. We help you work through anxiety, heal past painful experiences, and build healthy coping habits that stick. You can join us in-person at our Brampton wellness centre or virtually from the privacy of your home.',
      whoNeedsIt: [
        'Constant worry, racing thoughts, panic attacks, or social anxiety',
        'Feeling drained, unmotivated, overwhelmed, or depressed',
        'Lingering emotional stress or PTSD following a traumatic event',
        'Relationship friction, couples communication issues, or family conflict'
      ],
      moreOnIt: {
        howItWorks: 'We match you with the right therapist for your goals. Modalities include Cognitive Behavioral Therapy (CBT), EMDR for trauma recovery, emotion-focused counseling, and culturally sensitive family therapy.',
        sessionDetails: 'Private 50-minute sessions available in-person in Brampton or online via secure telehealth link (accessible from anywhere on phone, tablet, or laptop).',
        coverage: 'Eligible under Psychotherapy or Psychological Services on extended health plans.'
      },
      bookCategory: 'Therapy & Mental Health'
    },
    {
      id: 'clinical-psychology',
      category: 'Mental Health',
      title: 'Supervised Clinical Psychology & Diagnostic Evaluations',
      specialist: 'Dr. Bita Sharifzadeh, C.Psych, PhD & Clinical Team',
      deliveryFormat: 'In-Person & Virtual Telehealth',
      deliveryDetails: 'Evaluations and clinical consultations available in-person at our clinic or virtually online from anywhere in Ontario.',
      isVirtualAvailable: true,
      whatItIs: 'Formal psychological testing, diagnostic intake evaluations, and hospital-grade clinical supervision for trauma, mood disorders, and accident recovery claims.',
      whoNeedsIt: [
        'Formal psychological documentation for insurance, workplace, or legal claims',
        'Complex mood conditions needing clinical diagnostic clarity',
        'Patients seeking hospital-standard care roadmaps with registered psychologists',
        'Individuals recovering from severe traumatic injuries or workplace burnout'
      ],
      moreOnIt: {
        howItWorks: 'Dr. Sharifzadeh conducts structured clinical interviews and psychological inventories. Treatment plans are integrated directly with physical rehab and medical providers.',
        sessionDetails: 'Comprehensive assessments are 60 to 90 minutes. Available in-person or via secure virtual video.',
        coverage: 'Fully eligible under Clinical Psychology benefits on private health insurance.'
      },
      bookCategory: 'Therapy & Mental Health'
    },
    {
      id: 'nutrition-coaching',
      category: 'Gut & Nutrition',
      title: 'Functional Nutrition & Dietary Coaching',
      specialist: 'Michelle Ching, CNP (Holistic Nutritionist & Digestive Coach)',
      deliveryFormat: 'In-Person & Virtual Telehealth',
      deliveryDetails: 'Attend in-person at our Brampton clinic or virtually from anywhere in Ontario and Canada through private video consultations.',
      isVirtualAvailable: true,
      whatItIs: 'Personalized dietary coaching that targets the root cause of stomach distress, daily bloating, and energy crashes. Michelle builds customized meal plans, identifies food intolerances, and guides natural microbiome rebalancing.',
      whoNeedsIt: [
        'Recurring stomach bloating, gas, indigestion, and sluggish metabolism',
        'Uncertainty about which foods trigger inflammation or stomach pain',
        'Desire for realistic, whole-food meal plans that fit a busy work schedule',
        'Patients wanting virtual dietary support from home without commuting'
      ],
      moreOnIt: {
        howItWorks: 'We evaluate your food journals, lifestyle stressors, and digestive history. You receive actionable grocery lists, gut-soothing meal blueprints, and targeted natural supplement protocols.',
        sessionDetails: 'Initial consultations are 60 minutes. Follow-up coaching sessions are 30 to 45 minutes, in-person or virtually from anywhere.',
        coverage: 'Eligible under Nutritional Counseling or Health Spending Accounts (HSA) on most corporate plans.'
      },
      bookCategory: '12-Week Gut Reset'
    },
    {
      id: 'gut-balance',
      category: 'Gut & Nutrition',
      title: 'The Balance Program (12-Week Gut Reset & Energy Protocol)',
      specialist: 'Dr. Jennifer Anthony & Michelle Ching, CNP',
      deliveryFormat: 'In-Person & Virtual Telehealth',
      deliveryDetails: 'Virtual consultations and weekly check-ins from anywhere in Ontario, combined with in-person body scans at our Brampton clinic.',
      isVirtualAvailable: true,
      whatItIs: 'A complete 12-week doctor-guided program that stops painful stomach bloating, repairs your digestive barrier, and restores daily vitality. Coaching and consultations can be completed virtually from anywhere.',
      whoNeedsIt: [
        'Daily stomach bloating, painful gas, acid reflux, or IBS cramps',
        'Feeling heavy, sluggish, or foggy after eating meals',
        'Skin breakouts or joint stiffness triggered by hidden food sensitivities',
        'People who have tried random probiotics or diets with no lasting relief'
      ],
      moreOnIt: {
        howItWorks: 'Phase 1 (Weeks 1 to 4) removes inflammatory triggers and calms your stomach. Phase 2 (Weeks 5 to 8) rebuilds healthy gut bacteria and mucosal barrier. Phase 3 (Weeks 9 to 12) safely reintroduces favorite foods with before-and-after body scans.',
        sessionDetails: '12 weeks of weekly 1-on-1 nutritional guidance, meal plans, and diagnostic check-ins. Coaching sessions can be attended in-person or virtually from anywhere.',
        coverage: 'Parts of the program may be claimed through nutritional counseling and psychotherapy benefits.'
      },
      bookCategory: '12-Week Gut Reset'
    },
    {
      id: 'braincore',
      category: 'Brain Health',
      title: 'BrainCore Brain Training (Neurofeedback)',
      specialist: 'Supervised by Dr. Jennifer Anthony',
      deliveryFormat: 'In-Person (Brampton Clinic)',
      deliveryDetails: 'Conducted exclusively in-person in our BrainCore tech suite at Unit 204, 178 John St, Brampton.',
      isVirtualAvailable: false,
      whatItIs: 'A comfortable, 100% drug-free way to retrain your brainwaves. You sit back in a recliner and watch a movie while small sensors teach your brain how to calm down, focus, and sleep peacefully.',
      whoNeedsIt: [
        'Children, teens, or adults with ADHD and trouble concentrating',
        'Severe anxiety or panic that medications have not resolved',
        'Trouble falling asleep, staying asleep, or waking up exhausted',
        'Lingering brain fog, headaches, and sensitivity after a concussion'
      ],
      moreOnIt: {
        howItWorks: 'We start with a painless sensor cap to map your natural brainwave patterns. During training visits, you watch a movie. When your brain enters a calm, focused rhythm, the screen stays clear. Over 20 to 30 sessions, your brain naturally learns how to stay in that healthy rhythm on its own.',
        sessionDetails: 'Sessions take 30 to 45 minutes, typically 2 times per week at our Brampton location.',
        coverage: 'Often covered under psychological services or health spending accounts.'
      },
      bookCategory: 'Drug-Free Brain Training'
    },
    {
      id: 'esteck',
      category: 'Brain Health',
      title: 'ES Teck 3-Minute Whole-Body Scan',
      specialist: 'Clinical Assessment Team',
      deliveryFormat: 'In-Person (Brampton Clinic)',
      deliveryDetails: 'Quick 3-minute in-person test at our Brampton facility using metal touchplates and forehead sensors.',
      isVirtualAvailable: false,
      whatItIs: 'A fast, painless screening that measures your stress levels, cellular hydration, and cardiovascular stamina in just 3 minutes. Zero needles, zero blood tests, and instant results.',
      whoNeedsIt: [
        'Anyone who feels constantly tired but their regular blood tests come back normal',
        'People who want to know if their body is stuck in fight-or-flight stress mode',
        'Patients starting a new health program who want to track real progress over time',
        'Individuals curious about cellular hydration and heart recovery rate'
      ],
      moreOnIt: {
        howItWorks: 'You rest your bare hands and feet on smooth metal plates, and two small sensors touch your forehead. A tiny, imperceptible electrical signal checks fluid balance and autonomic nervous system tone. Your clinician explains your score during the visit.',
        sessionDetails: 'The scan itself takes under 3 minutes and is part of your comprehensive intake consultation in Brampton.',
        coverage: 'Included as part of our comprehensive clinical health assessments.'
      },
      bookCategory: 'Whole-Body & Mind Checkup'
    },
    {
      id: 'orthotics',
      category: 'Special Programs',
      title: 'Custom Orthotics & Medical Compression',
      specialist: 'Clinical Biomechanics Team',
      deliveryFormat: 'In-Person (Brampton Clinic)',
      deliveryDetails: 'Custom gait exam, precision casting, and fitting done at our Brampton clinic.',
      isVirtualAvailable: false,
      whatItIs: 'Custom-crafted shoe inserts and medical-grade compression stockings made specifically for your feet and legs. They correct your posture from the ground up and relieve leg fatigue.',
      whoNeedsIt: [
        'Sharp heel pain in the morning or arch soreness (plantar fasciitis)',
        'Knee, hip, or lower back aches caused by standing all day at work',
        'Flat feet, high arches, or uneven shoe wear',
        'Swollen ankles, heavy tired legs, or varicose veins'
      ],
      moreOnIt: {
        howItWorks: 'We perform a digital gait analysis and physical foot examination. Precision molds are created to craft durable orthotics that fit into your everyday running shoes, dress shoes, or work boots.',
        sessionDetails: 'Exam takes 30 minutes in Brampton. Custom orthotics are ready in approximately 2 weeks.',
        coverage: 'Generally 80% to 100% covered under employer health benefit plans with a doctor prescription.'
      },
      bookCategory: 'Spine, Pain & Muscle Care'
    },
    {
      id: 'mva-wsib',
      category: 'Special Programs',
      title: 'Car Accident (MVA) & Workplace Injury (WSIB)',
      specialist: 'Multidisciplinary Trauma & Rehab Team',
      deliveryFormat: 'In-Person & Virtual Telehealth',
      deliveryDetails: 'Physical therapy provided in-person in Brampton; trauma psychotherapy available in-person or virtually from anywhere in Ontario.',
      isVirtualAvailable: true,
      whatItIs: 'Coordinated physical therapy and trauma care for people hurt in car crashes or on the job. We manage all the insurance paperwork and billing directly so you can focus completely on healing.',
      whoNeedsIt: [
        'Whiplash, neck stiffness, or back pain following a car collision',
        'Driving anxiety, nightmares, or panic after a motor vehicle accident',
        'Workplace injuries, repetitive strain, or lifting sprains covered by WSIB',
        'Anyone frustrated with confusing insurance claim forms'
      ],
      moreOnIt: {
        howItWorks: 'We combine chiropractic care, registered massage, gentle osteopathy, and trauma counseling under one coordinated plan. We submit your treatment plans directly to your auto insurer (HCAI) or WSIB.',
        sessionDetails: 'Zero out-of-pocket payment for approved claims. We handle all direct billing.',
        coverage: '100% billed directly to auto insurance or WSIB.'
      },
      bookCategory: 'Spine, Pain & Muscle Care'
    }
  ];

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
            Our Services & Base Care
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
                  {service.title}
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
