import React, { useState } from 'react';
import { 
  MapPin, 
  Car, 
  Clock, 
  Phone, 
  ShieldCheck, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Navigation, 
  Calendar,
  Building,
  CreditCard
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { TrinovaLogo } from '../components/TrinovaLogo';

interface AreasServedPageProps {
  onNavigateToBook: (category?: string) => void;
  onNavigateToContact: () => void;
}

export const AreasServedPage: React.FC<AreasServedPageProps> = ({
  onNavigateToBook,
  onNavigateToContact
}) => {
  const [activeAreaTab, setActiveAreaTab] = useState<'brampton' | 'mississauga' | 'caledon' | 'vaughan' | 'georgetown'>('brampton');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const areasData = {
    brampton: {
      name: 'Brampton',
      tagline: 'Clinic Home Location · Unit 204, 178 John Street',
      driveTime: '0 to 10 minutes',
      description: 'Trinova Wellness Centre is proudly located right in Central Brampton on John Street. We provide whole-person multidisciplinary care with easy access from all Brampton neighborhoods.',
      neighborhoods: [
        { name: 'Downtown Brampton & Peel Village', time: '2 to 5 mins', note: 'Walking distance to Brampton GO station, free on-site parking' },
        { name: 'Bramalea & City Centre Area', time: '8 to 10 mins', note: 'Direct route via Queen St East and Central Park Drive' },
        { name: 'Springdale & North Brampton', time: '12 to 15 mins', note: 'Quick highway 410 south exit to Queen Street' },
        { name: 'Mount Pleasant & Bram West', time: '10 to 14 mins', note: 'Fast drive along Bovaird or Mississauga Road to Queen St' },
        { name: 'Castlemore & Goreway Area', time: '15 mins', note: 'Direct route via Countryside / Castlemore to Hwy 410' },
        { name: 'Heart Lake & Fletcher’s Meadow', time: '10 to 12 mins', note: 'Straight south along Hurontario / Main Street' }
      ],
      highlights: [
        'Dedicated free patient parking lot on John Street',
        '8-minute walk from Brampton Downtown GO Transit terminal',
        'Direct billing to Sun Life, Manulife, Canada Life & all major insurers',
        'Comprehensive team: Chiropractic, Osteopathy, RMT, Psychotherapy, BrainCore'
      ]
    },
    mississauga: {
      name: 'Mississauga',
      tagline: '12 to 20 Minutes North via Hurontario St or Highway 410',
      driveTime: '12 to 20 minutes',
      description: 'Patients from across Mississauga choose Trinova Wellness Centre because we house specialized BrainCore Neurofeedback brain mapping, functional body scanning, and licensed mental health psychotherapy under one roof.',
      neighborhoods: [
        { name: 'Mississauga City Centre / Square One', time: '15 to 18 mins', note: 'Straight north on Hurontario / Hwy 410 to Queen St' },
        { name: 'Streetsville & Central Erin Mills', time: '14 to 18 mins', note: 'Via Mississauga Rd or Creditview Rd north' },
        { name: 'Meadowvale & Lisgar', time: '16 to 20 mins', note: 'Direct route along Winston Churchill / Derry to 410' },
        { name: 'Malton & Airport Area', time: '14 to 16 mins', note: 'Fast connection via Derry Rd or Steeles Ave West' },
        { name: 'Cooksville & Dixie', time: '18 to 22 mins', note: 'North on Cawthra or Hurontario St straight into Brampton' },
        { name: 'Port Credit & South Mississauga', time: '22 to 25 mins', note: 'Highway 403 to Hwy 410 North' }
      ],
      highlights: [
        'One of the only certified BrainCore Neurofeedback qEEG clinics serving Peel Region',
        'No long hospital waitlists: same-week consultations available',
        'Direct billing for extended health benefits and auto injury (MVA) claims',
        'Stress-free clinic arrival with free dedicated parking spaces'
      ]
    },
    caledon: {
      name: 'Caledon & Bolton',
      tagline: '15 to 22 Minutes South via Highway 10 / Hurontario',
      driveTime: '15 to 22 minutes',
      description: 'Residents of Caledon and Bolton enjoy quick, scenic access down Hurontario Street or Airport Road to receive premier collaborative healthcare and neurofeedback without traveling into downtown Toronto.',
      neighborhoods: [
        { name: 'Bolton & South Caledon', time: '18 to 22 mins', note: 'Via Airport Rd south to Queen St West' },
        { name: 'Cheltenham & Inglewood', time: '15 to 18 mins', note: 'Straight south down Hurontario / Highway 10' },
        { name: 'Caledon East & Village', time: '20 to 24 mins', note: 'Via Highway 10 or Airport Rd' }
      ],
      highlights: [
        'Gentle, whole-person care for chronic spinal pain, concussions, and fatigue',
        'Spacious, calming clinic environment',
        'Complete family care for children, teens, and adults'
      ]
    },
    vaughan: {
      name: 'Vaughan & Woodbridge',
      tagline: '18 to 25 Minutes West via Highway 407 / Highway 7',
      driveTime: '18 to 25 minutes',
      description: 'Trinova is directly accessible for Woodbridge and Vaughan residents heading west on Queen Street / Highway 7 or taking Highway 407 to Highway 410.',
      neighborhoods: [
        { name: 'Woodbridge & Highway 7 corridor', time: '18 to 22 mins', note: 'Direct drive along Hwy 7 / Queen Street into Downtown Brampton' },
        { name: 'Maple & Vaughan Metropolitan Centre', time: '22 to 26 mins', note: 'Via Hwy 407 or Hwy 7 West to Hwy 410' },
        { name: 'Kleinburg', time: '20 to 25 mins', note: 'South along Highway 27 to Highway 7 West' }
      ],
      highlights: [
        'Specialized 12-week Balance gut reset and body composition scans',
        'Integrated sports injury chiropractic and registered massage therapy',
        'Evening and Saturday appointments available'
      ]
    },
    georgetown: {
      name: 'Georgetown & Halton Hills',
      tagline: '15 to 18 Minutes East via Queen Street West / Bovaird',
      driveTime: '15 to 18 minutes',
      description: 'Halton Hills and Georgetown patients appreciate being just minutes away from advanced drug-free brain training, osteopathy, and personalized nutrition guidance.',
      neighborhoods: [
        { name: 'Downtown Georgetown & Delrex', time: '15 to 18 mins', note: 'Straight east on Highway 7 (Guelph St / Queen St West)' },
        { name: 'Acton & North Halton', time: '22 to 26 mins', note: 'Via Highway 7 East straight to John Street' }
      ],
      highlights: [
        'Personalized care with licensed doctors and therapists collaborating as one team',
        'Comfortable private treatment rooms',
        'Easy free parking at our modern medical building'
      ]
    }
  };

  const travelTimeEstimates = [
    { from: 'Downtown Brampton GO', type: 'Transit / Walk', time: '8 min walk', distance: '650 m' },
    { from: 'Bramalea City Centre', type: 'Drive', time: '9 mins', distance: '5.8 km' },
    { from: 'Square One Shopping Centre (Mississauga)', type: 'Drive', time: '16 mins', distance: '14.2 km' },
    { from: 'Streetsville (Mississauga)', type: 'Drive', time: '15 mins', distance: '12.5 km' },
    { from: 'Mount Pleasant GO', type: 'Drive', time: '12 mins', distance: '8.4 km' },
    { from: 'Meadowvale Town Centre (Mississauga)', type: 'Drive', time: '17 mins', distance: '13.9 km' },
    { from: 'Georgetown Market Place', type: 'Drive', time: '18 mins', distance: '15.1 km' },
    { from: 'Bolton (Caledon)', type: 'Drive', time: '22 mins', distance: '19.4 km' },
    { from: 'Toronto Pearson Airport (YYZ)', type: 'Drive', time: '16 mins', distance: '16.5 km' },
    { from: 'Woodbridge (Vaughan)', type: 'Drive', time: '20 mins', distance: '18.1 km' }
  ];

  const localFaqs = [
    {
      q: 'Does Trinova direct-bill insurance for Brampton and Mississauga patients?',
      a: 'Yes. We provide direct electronic billing for all major Canadian extended healthcare providers, including Sun Life, Manulife, Canada Life, Desjardins, Green Shield Canada, Blue Cross, Telus Health eClaims, and many more. In most cases, you only pay any remaining deductible or co-pay, with zero paperwork.'
    },
    {
      q: 'How convenient is Trinova Wellness Centre for Mississauga residents?',
      a: 'Very convenient. We are located at 178 John Street in Brampton, just off Queen Street. Driving north from Mississauga along Highway 410 or Hurontario Street takes only 12 to 18 minutes. Unlike busy downtown Toronto or crowded hospital centers, our clinic offers reserved, free on-site parking directly outside our building.'
    },
    {
      q: 'Do I need a doctor referral to visit Trinova for chiropractic or massage?',
      a: 'No doctor referral is required to book appointments with our Chiropractors, Osteopaths, or Registered Massage Therapists (RMT). You can book directly online or by phone. (A few specific private employer insurance plans may ask for a doctor referral for massage therapy reimbursement, which you can easily check with your insurance provider).'
    },
    {
      q: 'Why do patients travel from across Peel Region and the GTA for BrainCore Neurofeedback?',
      a: 'BrainCore Neurofeedback is an advanced, non-invasive, drug-free brain wave training system backed by quantitative EEG (qEEG) brain mapping. Trinova is one of the premier clinics in Ontario equipped with this specialized technology, helping children and adults overcome anxiety, focus challenges, insomnia, migraines, and concussion recovery naturally.'
    },
    {
      q: 'Do you accept Motor Vehicle Accident (MVA) and WSIB workplace injury claims?',
      a: 'Yes. If you have been involved in a car accident in Brampton, Mississauga, or anywhere in the Greater Toronto Area, or suffered a workplace injury, our licensed doctors and therapists work with your insurance adjusters to provide approved rehabilitative chiropractic, osteopathic, and massage care.'
    },
    {
      q: 'Where do I park when visiting the clinic?',
      a: 'We offer free, convenient on-site parking for all patients in the private parking lot located right at 178 John Street. You never have to worry about paid meters or distant parking garages.'
    }
  ];

  const currentArea = areasData[activeAreaTab];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#EBF1FF] via-white to-slate-50 pt-12 pb-16 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#E8F8F0] px-4 py-1.5 rounded-full text-xs font-bold text-[#006837] uppercase tracking-wider mb-4 border border-emerald-200">
            <MapPin className="w-3.5 h-3.5 text-[#00A651]" />
            <span>Peel Region & Greater Toronto Healthcare Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#0033A0] tracking-tight mb-4">
            Serving Brampton, Mississauga <br className="hidden sm:inline" />
            <span className="text-[#006837]">& Nearby Communities</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Trinova Wellness Centre provides whole-person healthcare at <strong>178 John Street in Brampton</strong>. 
            We welcome patients from across Peel Region, including Mississauga, Caledon, Vaughan, and Georgetown, 
            seeking collaborative pain relief, therapy, and drug-free brain training.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigateToBook()}
              className="btn-pill-leaf text-base px-8 py-3.5 shadow-md w-full sm:w-auto cursor-pointer"
            >
              <span>Book Your First Visit</span>
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

          {/* Key Location Badges */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3">
              <Car className="w-5 h-5 text-[#0033A0] shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-900">Free On-Site Parking</div>
                <div className="text-[11px] text-slate-500">Reserved for patients</div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#00A651] shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-900">Open 6 Days a Week</div>
                <div className="text-[11px] text-slate-500">Mon-Fri till 7:30 PM, Sat 4 PM</div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-[#0033A0] shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-900">Direct Insurance Billing</div>
                <div className="text-[11px] text-slate-500">Sun Life, Manulife, all major</div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#00A651] shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-900">8 Licensed Specialists</div>
                <div className="text-[11px] text-slate-500">Doctors, RMTs & Counselors</div>
              </div>
            </div>
          </div>

          {/* Virtual Telehealth Anywhere Callout */}
          <div className="mt-6 max-w-4xl mx-auto bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-950">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#006837] text-white flex items-center justify-center shrink-0">
                <Navigation className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#0033A0]">Prefer care from home?</span> Nutrition coaching and psychological services (psychotherapy, couples counseling, trauma recovery) can be attended virtually through secure video links from anywhere across Ontario and Canada.
              </div>
            </div>
            <button
              onClick={() => onNavigateToBook('Therapy & Mental Health')}
              className="text-xs font-bold text-[#006837] bg-white border border-emerald-300 px-4 py-2 rounded-full hover:bg-emerald-50 shrink-0 cursor-pointer self-start sm:self-auto"
            >
              Book Virtual Care
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Region Selector */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0033A0] mb-2">
              Select Your Area for Commute & Care Details
            </h2>
            <p className="text-sm text-slate-600">
              Find driving routes, commute estimates, and why patients from your neighborhood visit our clinic.
            </p>
          </div>

          {/* Area Navigation Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            {(
              [
                { id: 'brampton', label: 'Brampton (Clinic Location)' },
                { id: 'mississauga', label: 'Mississauga (15 mins)' },
                { id: 'caledon', label: 'Caledon & Bolton' },
                { id: 'vaughan', label: 'Vaughan & Woodbridge' },
                { id: 'georgetown', label: 'Georgetown & Halton' }
              ] as const
            ).map((area) => (
              <button
                key={area.id}
                onClick={() => setActiveAreaTab(area.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeAreaTab === area.id
                    ? 'bg-[#0033A0] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {area.label}
              </button>
            ))}
          </div>

          {/* Area Details Card */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
              <div>
                <span className="text-xs font-bold text-[#00A651] uppercase tracking-wider block mb-1">
                  Featured Service Area
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0033A0]">
                  {currentArea.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{currentArea.tagline}</p>
              </div>

              <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200 self-start md:self-auto">
                <Car className="w-5 h-5 text-[#00A651]" />
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Average Commute</div>
                  <div className="text-sm font-bold text-slate-900">{currentArea.driveTime}</div>
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
              {currentArea.description}
            </p>

            {/* Sub-neighborhoods Grid */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Key Neighborhoods & Driving Times to 178 John St:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentArea.neighborhoods.map((n, i) => (
                  <div key={i} className="p-3.5 bg-white rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-xs text-slate-900">{n.name}</span>
                      <span className="text-[11px] font-semibold text-[#006837] bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal">{n.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100 mb-6">
              <h4 className="text-xs font-bold text-[#006837] uppercase tracking-wider mb-2">
                Why Patients from {currentArea.name} Trust Trinova:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {currentArea.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <div className="text-xs text-slate-600">
                <strong>Unit 204, 178 John Street, Brampton, ON L6W 2Z1</strong> · Free Parking On Site
              </div>
              <button
                onClick={() => onNavigateToBook()}
                className="btn-pill-leaf text-xs py-2.5 px-6 w-full sm:w-auto justify-center cursor-pointer"
              >
                <span>Book Appointment in Brampton</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Commute Distance Table for Google & Users */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading font-extrabold text-[#0033A0] mb-2">
              Commute Times from Major GTA Landmarks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Easy access via Highway 410, Highway 407, Queen Street, and Brampton Downtown GO Station.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="divide-y divide-slate-100">
              {travelTimeEstimates.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#006837] flex items-center justify-center shrink-0">
                      <Navigation className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{item.from}</div>
                      <div className="text-[11px] text-slate-500">{item.type} · Approx. {item.distance}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block px-3 py-1 bg-[#EBF1FF] text-[#0033A0] text-xs font-bold rounded-full">
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Available Clinical Disciplines for Brampton & Mississauga */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#00A651] uppercase tracking-wider block mb-1">
              Complete Multidisciplinary Care
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0033A0]">
              Healthcare Services Available for Brampton & Mississauga
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto mt-2">
              All services are delivered under one roof by certified, licensed Canadian professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="font-heading font-extrabold text-lg text-[#0033A0] mb-2">
                BrainCore Neurofeedback & qEEG
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Quantitative EEG brain mapping and drug-free neurofeedback training. Relieves anxiety, ADHD symptoms, chronic insomnia, and post-concussion syndrome for patients across Peel Region.
              </p>
              <div className="text-[11px] font-semibold text-[#006837]">
                Patients visit from: Brampton, Mississauga, Oakville, Vaughan
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="font-heading font-extrabold text-lg text-[#0033A0] mb-2">
                Chiropractic & Spinal Health
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Hands-on spinal adjustments, gentle joint mobilization, and postural correction for lower back pain, neck stiffness, sciatica, and auto injury rehabilitation.
              </p>
              <div className="text-[11px] font-semibold text-[#006837]">
                Direct insurance billing available
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="font-heading font-extrabold text-lg text-[#0033A0] mb-2">
                Registered Massage Therapy (RMT)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Deep tissue massage, myofascial trigger point release, and tension relief administered by College of Massage Therapists of Ontario (CMTO) registered practitioners.
              </p>
              <div className="text-[11px] font-semibold text-[#006837]">
                Direct billing to all major extended health plans
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="font-heading font-extrabold text-lg text-[#0033A0] mb-2">
                Psychotherapy & Trauma Counseling
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Private, confidential mental health psychotherapy. Specializing in EMDR trauma therapy, cognitive behavioral therapy (CBT), chronic stress, and emotional burnout.
              </p>
              <div className="text-[11px] font-semibold text-[#006837]">
                In-person at Brampton clinic and secure Ontario virtual visits
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="font-heading font-extrabold text-lg text-[#0033A0] mb-2">
                The Balance Program (12-Week Gut Reset)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Structured clinical protocol combining gut rebalancing nutrition, medical-grade supplements, and 3-minute cellular body scans to overcome fatigue, bloating, and food cravings.
              </p>
              <div className="text-[11px] font-semibold text-[#006837]">
                Guided by Clinical Director Dr. Jennifer Anthony
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="font-heading font-extrabold text-lg text-[#0033A0] mb-2">
                Custom Orthotics & Osteopathy
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Dynamic digital gait assessments, precision laboratory orthotic fabrication, and craniosacral osteopathy to correct posture and joint alignment from the ground up.
              </p>
              <div className="text-[11px] font-semibold text-[#006837]">
                Covered by most private health insurance policies
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO FAQ Section with Schema Answer Formatting */}
      <section className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#00A651] uppercase tracking-wider block mb-1">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0033A0]">
              Brampton & Mississauga Patient Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Everything you need to know about clinic location, insurance, parking, and booking.
            </p>
          </div>

          <div className="space-y-3">
            {localFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#006837] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Booking CTA Banner */}
      <section className="bg-[#002270] py-14 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex justify-center mb-4">
            <TrinovaLogo size="lg" variant="white" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold mb-3">
            Ready to Begin Your Care in Peel Region?
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Experience coordinated, multidisciplinary healthcare. Book online in under 60 seconds with direct insurance billing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigateToBook()}
              className="btn-pill-leaf text-base px-9 py-4 shadow-xl w-full sm:w-auto cursor-pointer"
            >
              <span>Book Appointment Now</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <a
              href="tel:+19054957748"
              className="px-8 py-3.5 rounded-full border border-white/40 text-white font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-base w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>(905) 495-7748</span>
            </a>
          </div>
          <div className="mt-6 text-xs text-slate-400">
            Unit 204, 178 John Street, Brampton, ON L6W 2Z1 · Free Patient Parking Available
          </div>
        </div>
      </section>
    </div>
  );
};
