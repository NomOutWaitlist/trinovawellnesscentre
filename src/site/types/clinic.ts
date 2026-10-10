export interface Practitioner {
  id: string;
  name: string;
  credentials: string;
  role: string;
  department: 'Leadership' | 'Mental Health' | 'Physical Rehab' | 'Nutrition' | 'Diagnostics';
  bio: string;
  focus: string[];
  modalities?: string[];
  experienceYears?: number;
  framework?: string;
  imageUrl?: string;
  isDirector?: boolean;
}

export interface DiagnosticTech {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  duration: string;
  process: string[];
  biomarkersOrFrequencies: {
    name: string;
    description: string;
    role: string;
  }[];
  targetConditions: string[];
  benefits: string[];
}

export interface ServiceItem {
  id: string;
  category: 'Physical Rehabilitation' | 'Mental Health & Psychotherapy' | 'Specialized Diagnostics' | 'Functional Nutrition';
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliveryFormat?: 'In-Person & Virtual Telehealth' | 'In-Person (Brampton Clinic)';
  deliveryDetails?: string;
  treatments: string[];
  indications: string[];
  practitioners: string[];
  icon: string;
}

export interface BalancePhase {
  phaseNumber: number;
  weeks: string;
  title: string;
  goal: string;
  keyActions: string[];
  clinicalFocus: string;
}

export interface AppointmentBookingSubmission {
  id: string;
  referenceNumber: string;
  timestamp: string;
  category: string;
  concerns: string[];
  concernDetails: string;
  preferredDays: string[];
  preferredTimeWindows: string[];
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  priorCareNotes: string;
  deliveryPreference?: 'in-person' | 'virtual' | 'flexible';
  status: 'Received' | 'Reviewing' | 'Scheduled' | 'Completed';
  urgency: 'Routine' | 'Priority' | 'Immediate Evaluation';
}

export type TriageBookingSubmission = AppointmentBookingSubmission;

export interface ReferralSubmission {
  id: string;
  timestamp: string;
  referrerName: string;
  referrerEmail: string;
  referrerPhone: string;
  refereeName: string;
  refereeEmail: string;
  refereePhone: string;
  serviceInterest: string;
  personalNote?: string;
  status: 'Invited' | 'Consultation Attended' | 'Care Started' | 'Points Awarded';
  pointsEarned: number;
}

export interface ContactInquiry {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
