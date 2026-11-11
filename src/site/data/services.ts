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

export const BASE_SERVICES: BaseService[] = [
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
      specialist: 'Jennifer Anthony (PhD, RP), Stacy Yong (RP), Shanna-Kay Stephens (RSW)',
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
      specialist: 'Jennifer Anthony & Michelle Ching, CNP',
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
      specialist: 'Supervised by Jennifer Anthony',
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
