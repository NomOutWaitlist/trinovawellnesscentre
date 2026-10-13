import { Practitioner, DiagnosticTech, ServiceItem, BalancePhase } from '../types/clinic';

export const CLINIC_INFO = {
  name: 'Trinova Wellness Centre',
  legalName: 'Trinova Wellness Centre Inc.',
  address: 'Unit 204, 178 John Street',
  city: 'Brampton',
  province: 'Ontario',
  postalCode: 'L6W 2Z1',
  country: 'Canada',
  phone: '+1 (905) 495-7748',
  phoneDisplay: '(905) 495-7748',
  emails: [
    'trinovawellnesscentre@gmail.com',
    'centretrinova@gmail.com'
  ],
  website: 'trinovacentre.com',
  hours: [
    { days: 'Monday to Friday', time: '8:30 AM to 7:30 PM' },
    { days: 'Saturday', time: '9:00 AM to 4:00 PM' },
    { days: 'Sunday', time: 'By Special Appointment' }
  ],
  philosophy: 'True health is whole-person wellness: connecting your body, mind, brain, and gut under one roof. Healing should never happen in isolation.',
  mission: 'Help you overcome chronic pain, anxiety, and fatigue through caring, coordinated team healthcare.'
};

export const PRACTITIONERS: Practitioner[] = [
  {
    id: 'dr-jennifer-anthony',
    name: 'Dr. Jennifer Anthony',
    credentials: 'B.A., M.A., RP, PhD',
    role: 'Founder, Clinical Director, Psychotherapist & Nutrition Specialist',
    department: 'Leadership',
    bio: 'Dr. Jennifer Anthony brings psychological counseling and functional nutrition together to create personalized care plans. She helps people overcome long-standing anxiety, depression, trauma, and chronic pain by treating both the nervous system and body chemistry together.',
    focus: [
      'Anxiety & depression',
      'Trauma recovery (EMDR & CBT)',
      'Custom nutrition plans',
      'Brain-gut health connection',
      'Chronic fatigue & burnout'
    ],
    modalities: [
      'Talk Therapy (CBT)',
      'Eye Movement Trauma Therapy (EMDR)',
      'Mindfulness Practices',
      'Emotion-Focused Therapy',
      'Solution-Focused Counseling'
    ],
    isDirector: true,
    imageUrl: '/images/team/jennifer.png'
  },
  {
    id: 'dr-paulette-higgins-moncrieffe',
    name: 'Dr. Paulette Higgins-Moncrieffe',
    credentials: 'D.C.',
    role: 'Chiropractor & Sports Injury Specialist',
    department: 'Physical Rehab',
    bio: 'Dr. Paulette Higgins-Moncrieffe is an experienced chiropractor who focuses on spinal health, joint pain, sports injuries, and getting you moving without pain. She identifies the root causes of recurring aches so injuries don’t return.',
    focus: [
      'Back & neck pain relief',
      'Joint mobility & spinal health',
      'Sports injury recovery',
      'Posture correction',
      'Preventing future injuries'
    ],
    modalities: [
      'Gentle spinal adjustments',
      'Spinal decompression table',
      'Active exercise rehab',
      'Muscle & joint release'
    ],
    imageUrl: '/images/team/paulette.jpg'
  },
  {
    id: 'stacy-yong',
    name: 'Stacy Yong',
    credentials: 'M.Psy, RP (OAMHP)',
    role: 'Registered Psychotherapist',
    department: 'Mental Health',
    experienceYears: 19,
    bio: 'Stacy Yong has over 19 years of therapy experience, including more than 16 years at CAMH in Toronto. She specializes in trauma recovery, managing anxiety and depression, and helping patients recover emotionally after car accidents and workplace injuries.',
    focus: [
      'Car accident (MVA) recovery',
      'Workplace injury (WSIB) support',
      'Severe anxiety & depression',
      'Trauma & PTSD recovery',
      'Managing stress & emotions'
    ],
    modalities: [
      'Cognitive Behavioral Therapy (CBT)',
      'Trauma Processing (CPT)',
      'Emotion Coping Skills (DBT)',
      'Stress reduction techniques'
    ],
    imageUrl: '/images/team/stacy.jpg'
  },
  {
    id: 'dr-bita Sharifzadeh',
    name: 'Dr. Bita Sharifzadeh',
    credentials: 'C.Psych, PhD',
    role: 'Supervising Clinical Psychologist',
    department: 'Mental Health',
    bio: 'Dr. Bita Sharifzadeh oversees the psychological team and conducts formal psychological evaluations. She ensures all therapy at Trinova meets the highest hospital-grade clinical standards.',
    focus: [
      'Formal psychological testing',
      'Clinical supervision & care quality',
      'Trauma & mood evaluations',
      'Mental health roadmaps'
    ],
    modalities: [
      'Comprehensive psychological testing',
      'Clinical team oversight',
      'Evidence-based treatment plans'
    ],
    imageUrl: '/images/team/bita.jpg'
  },
  {
    id: 'shanna-kay-stephens',
    name: 'Shanna-Kay Stephens',
    credentials: 'MSW, RSW',
    role: 'Therapist (Youth, Adults, Couples & Families)',
    department: 'Mental Health',
    framework: 'Culturally inclusive & anti-oppressive care',
    bio: 'Shanna-Kay Stephens is a warm, empathetic therapist who works with teens, adults, couples, and families. She helps rebuild communication, resolve relationship friction, and heal family conflicts in a safe, non-judgmental space.',
    focus: [
      'Couples & marital communication',
      'Teen & young adult emotional support',
      'Family conflict resolution',
      'Identity & life transitions',
      'Healing intergenerational stress'
    ],
    modalities: [
      'Relationship & couples counseling',
      'Family therapy',
      'Culturally grounded mindfulness',
      'Empathy-building dialog'
    ],
    imageUrl: '/images/team/shanna-kay.jpg'
  },
  {
    id: 'vishma-lamichhane',
    name: 'Vishma Lamichhane',
    credentials: 'M.OMSc',
    role: 'Osteopathic Manual Practitioner',
    department: 'Physical Rehab',
    bio: 'Vishma Lamichhane uses gentle hands-on osteopathy to align joints, relieve tight connective tissue, and support healthy digestion. Her soothing techniques release deep muscle tension without cracking or popping joints.',
    focus: [
      'Gentle head & spine alignment (Craniosacral)',
      'Digestive & stomach comfort',
      'Full-body posture balancing',
      'Pelvic & hip stiffness',
      'Chronic tension release'
    ],
    modalities: [
      'Craniosacral gentle therapy',
      'Abdominal & stomach alignment',
      'Joint & ligament balancing',
      'Myofascial tension release'
    ],
    imageUrl: '/images/team/vishma.jpg'
  },
  {
    id: 'seyi-oladipo',
    name: 'Seyi Oladipo',
    credentials: 'RMT (CMTO)',
    role: 'Registered Massage Therapist',
    department: 'Physical Rehab',
    bio: 'Seyi Oladipo is a skilled Registered Massage Therapist dedicated to pain relief, muscle recovery, and easing desk-work tension. He works closely with our chiropractors to release deep knots and improve blood circulation.',
    focus: [
      'Deep tissue therapeutic massage',
      'Releasing stubborn muscle knots',
      'Desk posture & neck tension relief',
      'Sports recovery',
      'Improving blood & lymphatic flow'
    ],
    modalities: [
      'Clinical deep tissue massage',
      'Trigger point knot release',
      'Targeted muscle stretching',
      'Circulation therapy'
    ],
    imageUrl: '/images/team/seyi.jpg'
  },
  {
    id: 'michelle-ching',
    name: 'Michelle Ching',
    credentials: 'CNP, Holistic Nutritionist',
    role: 'Holistic Nutritionist & Digestive Coach',
    department: 'Nutrition',
    bio: 'Michelle Ching helps patients fix digestive issues, stop stomach bloating, and regain daily energy. She coaches patients in the 12-week Balance Program, finding which foods trigger discomfort and building easy, delicious meal plans.',
    focus: [
      'Stopping stomach bloating & gas',
      'Finding hidden food sensitivities',
      'Balancing blood sugar & daily energy',
      'Easy whole-food meal planning',
      'Gut microbiome restoration'
    ],
    modalities: [
      'Food & lifestyle reviews',
      'Step-by-step food reintroduction',
      'Targeted natural gut supplements',
      'Healthy daily habits coaching'
    ]
  }
];

export const DIAGNOSTIC_TECHNOLOGIES: DiagnosticTech[] = [
  {
    id: 'braincore-neurofeedback',
    name: 'BrainCore Brain Training',
    subtitle: 'Non-Invasive Brainwave Retraining',
    duration: '30 to 45 minutes per visit (20 to 30 visits total)',
    description: 'BrainCore is a drug-free, comfortable therapy that teaches your brain how to calm down, focus, and sleep better. You sit back and relax watching a movie while sensors gently listen to your brainwaves.',
    process: [
      'Step 1 (Brain Mapping): You wear a comfortable sensor cap that reads your natural brainwaves while your eyes are open and closed.',
      'Step 2 (Personalized Plan): We compare your brainwave patterns against healthy benchmarks to see where stress or focus issues are located.',
      'Step 3 (Relax & Watch): You sit in a comfortable chair watching a movie or listening to calm sounds while the sensors monitor your brain.',
      'Step 4 (Brain Learning): When your brain enters a relaxed, focused state, the screen brightens and audio stays clear. Over time, your brain naturally learns how to stay in this healthy state on its own.'
    ],
    biomarkersOrFrequencies: [
      {
        name: 'Delta Waves',
        role: 'Deep Sleep & Healing',
        description: 'Active during deep sleep when your body heals. If delta waves are high during the day, you feel sluggish and have brain fog.'
      },
      {
        name: 'Theta Waves',
        role: 'Daydreaming & Creativity',
        description: 'Active during light drowsiness and creative thought. When theta is too high during school or work, it causes ADHD and distraction.'
      },
      {
        name: 'Alpha Waves',
        role: 'Calm & Alert',
        description: 'Your brain’s relaxed resting state. Healthy alpha waves let you stay composed, relaxed, and clear-headed under pressure.'
      },
      {
        name: 'Beta Waves',
        role: 'Active Thinking & Stress',
        description: 'Used for solving problems and focusing. When beta waves run too fast, you experience racing thoughts, anxiety, and panic.'
      }
    ],
    targetConditions: [
      'ADHD & trouble focusing',
      'Anxiety, worry & panic',
      'Trouble falling or staying asleep',
      'Concussion recovery & headaches',
      'Brain fog & mental fatigue'
    ],
    benefits: [
      '100% Drug-Free & Painless',
      'Lasting natural results',
      'See your real progress on screen',
      'Safe for kids, teens, and adults'
    ]
  },
  {
    id: 'es-teck-assessment',
    name: 'ES Teck 3-Minute Body Scan',
    subtitle: 'Quick Stress & Hydration Screening',
    duration: '2 to 3 minutes',
    description: 'A fast, comfortable full-body screening that checks your stress levels, heart resilience, and cellular hydration in just 3 minutes with zero needles or blood draws.',
    process: [
      'Step 1 (Rest on Plates): You place your bare hands and feet on smooth metal plates, and two small sensors touch your forehead.',
      'Step 2 (Quick Micro-Signal): The device sends a gentle, imperceptible electrical pulse through your body’s natural fluid.',
      'Step 3 (Immediate Report): In less than 3 minutes, the system measures your stress levels, heart recovery, and fluid balance.'
    ],
    biomarkersOrFrequencies: [
      {
        name: 'Stress vs. Relax Balance',
        role: 'Fight or Flight vs. Rest & Digest',
        description: 'Checks if your body is trapped in high alert or able to relax, digest food, and heal.'
      },
      {
        name: 'Heart Stress Recovery',
        role: 'Heart Resilience & Daily Stamina',
        description: 'Measures how well your heart adapts to daily mental and physical stress.'
      },
      {
        name: 'Cell Hydration & Water Balance',
        role: 'Fluid Levels Inside Your Cells',
        description: 'Checks if your body is retaining water or if your cells are properly hydrated.'
      },
      {
        name: 'Blood Flow & Microcirculation',
        role: 'Small Blood Vessel Health',
        description: 'Evaluates circulation to your hands, feet, and organs.'
      }
    ],
    targetConditions: [
      'Unexplained tiredness & low energy',
      'Daily stress & feeling drained',
      'Stomach bloating & poor digestion',
      'Tracking progress during the 12-week gut reset'
    ],
    benefits: [
      'Takes only 3 minutes',
      'No blood draws or needles',
      'Clear, easy-to-read health report',
      'Shows real before-and-after proof'
    ]
  }
];

export const THE_BALANCE_PROGRAM = {
  name: 'The Balance Program',
  subtitle: '12-Week Gut Reset & Energy Protocol',
  price: 'Personalized Care Plan',
  priceDetail: 'Tax inclusive · Complete 12-week doctor-guided program',
  overview: 'The Balance Program is Trinova’s 12-week program designed to stop stomach bloating, heal your gut lining, and restore daily energy. Because 80% of your body’s mood and immune chemicals are made in your gut, fixing your digestion clears brain fog and fatigue.',
  inclusions: [
    '75-minute consultation with Dr. Jennifer Anthony',
    'Pre- and post-program ES Teck 3-minute body scans (Week 1 and Week 12)',
    'Customized 12-week nutrition plan by Michelle Ching',
    '6 private one-on-one coaching sessions every two weeks',
    'Personalized natural supplement guide for gut healing',
    'Trinova gut-friendly recipe book and reintroduction steps',
    'Direct messaging with your nutrition coach between visits',
    'Lifelong healthy habits guide when you finish'
  ],
  phases: [
    {
      phaseNumber: 1,
      weeks: 'Weeks 1 to 4',
      title: 'Calm & Soothe',
      goal: 'Stop bloating and give your stomach a break from foods that cause inflammation.',
      keyActions: [
        'Temporarily pause common foods that cause irritation (gluten, dairy, excess sugar, processed oils)',
        'Enjoy soothing, warm bone broths, gentle vegetables, and natural digestive support',
        'Stabilize blood sugar so you stop experiencing afternoon energy crashes',
        'Complete your initial 3-minute body scan to see your starting stress baseline'
      ],
      clinicalFocus: 'Relieving stomach cramps, easing gas, and calming your digestive tract.'
    },
    {
      phaseNumber: 2,
      weeks: 'Weeks 5 to 8',
      title: 'Rebuild & Repair',
      goal: 'Heal the stomach lining and restore healthy, beneficial gut bacteria.',
      keyActions: [
        'Introduce healthy probiotics and natural nutrients that repair your stomach lining',
        'Learn simple breathing exercises that stimulate your body’s natural digestive nerve',
        'Midway check-in with Dr. Anthony to celebrate improvements in energy and mood'
      ],
      clinicalFocus: 'Healing the gut lining so food absorbs properly without causing bloating.'
    },
    {
      phaseNumber: 3,
      weeks: 'Weeks 9 to 12',
      title: 'Add Foods Back Safely',
      goal: 'Systematically test paused foods so you can eat comfortably for life.',
      keyActions: [
        'Test paused foods one at a time over 3 days to see exactly which ones agree with you',
        'Build a permanent, flexible food plan you can stick to without feeling deprived',
        'Complete your final 3-minute body scan to see your measured improvements',
        'Receive your personal lifelong nutrition roadmap'
      ],
      clinicalFocus: 'Eating freely with confidence, clear skin, and sustained all-day energy.'
    }
  ] as BalancePhase[]
};

export const CARE_JOURNEY_PHASES = [
  {
    phase: 'Phase 1',
    title: 'Consultation & Discovery',
    badge: 'Step 1: Your Baseline',
    description: 'We listen to your health story and measure what is going on before starting treatment.',
    deliverables: [
      '60-second symptom questionnaire to match you with the right specialist',
      '75-minute deep-dive consultation with Dr. Jennifer Anthony',
      'Objective Baselines: 3-minute body scan & brainwave mapping',
      'Spinal posture check and nutrition review',
      'A clear, personalized care plan made just for you'
    ]
  },
  {
    phase: 'Phase 2',
    title: 'Coordinated Team Care',
    badge: 'Step 2: Healing',
    description: 'Your treatments are scheduled together so your brain, muscles, and gut support each other.',
    deliverables: [
      'Brain training sessions paired with physical adjustments and therapy',
      'Talk therapy & EMDR trauma processing with CAMH veterans',
      'Spine, joint, and posture alignment with our chiropractor and osteopath',
      'Deep tissue massage with Seyi Oladipo and gut nutrition coaching'
    ]
  },
  {
    phase: 'Phase 3',
    title: 'Re-Scans & Proof',
    badge: 'Step 3: Measuring Progress',
    description: 'We do not guess. We re-scan your body and brain so you see your real improvement on screen.',
    deliverables: [
      'Follow-up 3-minute body scan at Week 6 to 8 to measure reduced stress',
      'Mid-point brainwave scan at sessions 12 to 15 showing improved focus',
      'Adjusting treatment frequency as you gain strength and feel better',
      'Seeing your own brainwaves calm down on screen'
    ]
  },
  {
    phase: 'Phase 4',
    title: 'Long-Term Vitality',
    badge: 'Step 4: Staying Well',
    description: 'Keeping you healthy with easy home exercises, seasonal tune-ups, and ongoing support.',
    deliverables: [
      'Simple home stretching, relaxation, and meal guide',
      'Occasional tune-up visits whenever you need a refresh',
      'Annual body scans to keep track of your long-term health',
      'Referral rewards: invite friends and family to get healthy too'
    ]
  }
];

export const REFERRAL_PROGRAM = {
  title: 'Trinova Patient Referral Rewards Program',
  summary: 'Active patients can gift friends or family members a complimentary consultation. When they begin care at Trinova, you earn reward points redeemable for clinic credits and gift cards.',
  mechanism: 'Every patient receives an easy referral code. When a friend attends their consultation and begins care, you instantly receive 100 reward points.',
  tiers: [
    {
      points: 200,
      reward: '$25 Clinic Credit',
      description: 'Applied directly toward any future chiropractic, massage, osteopathy, or therapy visit.',
      highlight: 'First Reward'
    },
    {
      points: 500,
      reward: '$75 Clinic Credit OR 20% Off Wellness Products',
      description: 'Use for $75 off clinical treatments or 20% off retail items like custom orthotics and braces.',
      highlight: 'Most Popular'
    },
    {
      points: 1000,
      reward: '$150 Visa/Mastercard Gift Card OR Free 30-Min Treatment',
      description: 'Receive a $150 prepaid Visa/Mastercard cash card or a free 30-minute wellness treatment.',
      highlight: 'Top Reward'
    }
  ]
};

export const CLINIC_SERVICES: ServiceItem[] = [
  {
    id: 'pain-rehab',
    category: 'Physical Rehabilitation',
    title: 'Pain Relief & Physical Health',
    shortDesc: 'Relief for back, neck, and joint pain combining chiropractic care, gentle osteopathy, deep tissue massage, and custom foot orthotics.',
    fullDesc: 'Pain stops you from sleeping, working, and enjoying life. Our physical care team finds the root source of your aches through chiropractic spinal care, gentle osteopathy, deep knot massage, and custom orthotics.',
    deliveryFormat: 'In-Person (Brampton Clinic)',
    deliveryDetails: 'Delivered in-person at our modern Brampton facility with specialized tables, rehabilitation equipment, and private treatment suites.',
    treatments: [
      'Chiropractic care & sports injury rehab (Dr. Paulette Higgins-Moncrieffe)',
      'Gentle osteopathy & posture alignment (Vishma Lamichhane)',
      'Registered massage therapy: deep tissue & knot release (Seyi Oladipo)',
      'Acupuncture & spinal decompression table',
      'Custom foot orthotics, orthopedic shoes & compression stockings'
    ],
    indications: [
      'Lower back pain, sciatica & pinched nerves',
      'Neck stiffness & whiplash',
      'Shoulder pain & sports injuries',
      'Tension headaches from sitting at a desk',
      'Car accident injuries (MVA) & workplace injuries (WSIB)'
    ],
    practitioners: ['Dr. Paulette Higgins-Moncrieffe', 'Vishma Lamichhane', 'Seyi Oladipo'],
    icon: 'Activity'
  },
  {
    id: 'mental-health',
    category: 'Mental Health & Psychotherapy',
    title: 'Mental Health & Counseling',
    shortDesc: 'Caring, confidential therapy for anxiety, depression, trauma, and relationships led by hospital-trained clinicians.',
    fullDesc: 'Your emotions and physical body are deeply connected. Our therapy team provides warm, non-judgmental counseling for individuals, couples, and teens to help you overcome anxiety, stress, and past trauma. Sessions are available in-person at our Brampton clinic or virtually through secure telehealth from anywhere in Ontario.',
    deliveryFormat: 'In-Person & Virtual Telehealth',
    deliveryDetails: 'Available in-person at our Brampton clinic or virtually through secure, encrypted video sessions from anywhere in Ontario and Canada.',
    treatments: [
      'Individual, couples, teen, and family counseling',
      'EMDR eye movement trauma therapy for PTSD and difficult memories',
      'Cognitive Behavioral Therapy (CBT) to stop negative thought spirals',
      'Emotional coping and stress reduction skills',
      'Car accident (MVA) and workplace injury (WSIB) mental health support',
      'Culturally inclusive and welcoming counseling'
    ],
    indications: [
      'Daily anxiety, worry & panic attacks',
      'Feeling down, depressed or burned out',
      'Past trauma & painful memories (PTSD)',
      'Relationship tension & communication struggles',
      'Major life changes & grief'
    ],
    practitioners: ['Dr. Jennifer Anthony', 'Stacy Yong, M.Psy, RP', 'Dr. Bita Sharifzadeh', 'Shanna-Kay Stephens'],
    icon: 'HeartHandshake'
  },
  {
    id: 'diagnostics-tech',
    category: 'Specialized Diagnostics',
    title: 'Brain Training & Body Scans',
    shortDesc: 'Drug-free brainwave retraining (BrainCore) and 3-minute full-body stress screenings (ES Teck).',
    fullDesc: 'We don’t guess what’s going on, we measure it. Our BrainCore brain mapping checks 19 to 21 brain regions, and our 3-minute body scan checks your stress levels and hydration.',
    deliveryFormat: 'In-Person (Brampton Clinic)',
    deliveryDetails: 'Conducted on-site at our Brampton clinic using specialized BrainCore sensor mapping hardware and ES Teck bio-impedance scanning plates.',
    treatments: [
      'Brainwave mapping with a comfortable sensor cap',
      'Brainwave retraining sessions watching movies or listening to audio',
      '3-Minute full-body stress & hydration scan',
      'Stress vs. relax balance score',
      'Heart resilience & stamina evaluation',
      'Circulation check'
    ],
    indications: [
      'ADHD & trouble focusing at school or work',
      'Concussions & lingering head fog',
      'Difficulty falling asleep or staying asleep',
      'Feeling constantly exhausted & burned out',
      'Seeing real proof that your body is getting healthier'
    ],
    practitioners: ['Dr. Jennifer Anthony', 'Certified Clinic Technicians'],
    icon: 'Cpu'
  },
  {
    id: 'nutrition-balance',
    category: 'Functional Nutrition',
    title: 'Gut Health & Nutrition',
    shortDesc: 'Stop stomach bloating, heal your digestion, and restore natural daily energy with our 12-week gut reset.',
    fullDesc: 'Your stomach is closely connected to your brain. Our nutrition specialists find the foods that trigger bloating and repair your stomach lining so you feel energized after meals. Consultations and coaching are provided in-person at our Brampton clinic or virtually from anywhere.',
    deliveryFormat: 'In-Person & Virtual Telehealth',
    deliveryDetails: 'Available in-person at our Brampton clinic or virtually from anywhere with digital meal plans, gut symptom tracking, and direct telehealth video sessions.',
    treatments: [
      'The Balance Program: 12-Week Complete Gut Reset',
      'Finding hidden food sensitivities that cause bloating',
      'Repairing the stomach lining (leaky gut support)',
      'Restoring healthy, beneficial gut bacteria',
      'Balancing blood sugar to stop afternoon energy crashes'
    ],
    indications: [
      'Stomach bloating, gas, reflux & stomach aches (IBS)',
      'Skin flare-ups and joint stiffness linked to food',
      'Afternoon energy crashes & sweet cravings',
      'Brain fog and low mood caused by stomach issues',
      'Recovering gut health after antibiotics'
    ],
    practitioners: ['Dr. Jennifer Anthony', 'Michelle Ching'],
    icon: 'Salad'
  }
];

export const PATIENT_TESTIMONIALS = [
  {
    quote: "Trinova changed my life. After my car crash, I was going to five different clinics that never talked to each other. Dr. Jennifer Anthony brought my physical rehab, trauma therapy, and brain training together under one roof. For the first time in years, I sleep without pain.",
    author: "Marcus T.",
    location: "Brampton, ON",
    program: "Car Accident Recovery & BrainCore"
  },
  {
    quote: "The 12-Week Balance Program was worth every dollar. My daily stomach bloating and brain fog had confused doctors for years. By Week 6, the bloating was completely gone, and my 3-minute scan proved my stress levels dropped by 45%.",
    author: "Elena R.",
    location: "Mississauga, ON",
    program: "12-Week Gut Reset Program"
  },
  {
    quote: "BrainCore brain training helped my son focus in school without needing medications. Seeing his brainwaves improve on screen every week gave our family so much relief. The staff is so kind and attentive.",
    author: "David & Priya K.",
    location: "Brampton, ON",
    program: "BrainCore Brain Training"
  }
];
