import { AppointmentBookingSubmission, TriageBookingSubmission, ReferralSubmission, ContactInquiry } from '../types/clinic';

const BOOKINGS_STORAGE_KEY = 'trinova_booking_triage_submissions';
const REFERRALS_STORAGE_KEY = 'trinova_referral_submissions';
const CONTACT_STORAGE_KEY = 'trinova_contact_inquiries';

const INITIAL_BOOKINGS: TriageBookingSubmission[] = [
  {
    id: 'req-101',
    referenceNumber: 'TRN-2026-8841',
    timestamp: '2026-10-07T14:32:00Z',
    category: 'Mental Health & Psychotherapy',
    concerns: ['Anxiety & Panic', 'Sleep Disturbances', 'Trauma / PTSD'],
    concernDetails: 'Struggling with hypervigilance and insomnia following a workplace incident 6 months ago. Interested in EMDR and psychotherapy with Stacy Yong.',
    preferredDays: ['Tuesday', 'Thursday'],
    preferredTimeWindows: ['Morning (9am - 12pm)', 'Afternoon (12pm - 4pm)'],
    patientName: 'Samantha Davies',
    patientPhone: '(905) 555-0198',
    patientEmail: 's.davies@example.ca',
    priorCareNotes: 'Saw general practitioner; prescribed sleep aids but seeking root cause trauma therapy and somatic regulation.',
    status: 'Scheduled',
    urgency: 'Priority'
  },
  {
    id: 'req-102',
    referenceNumber: 'TRN-2026-8859',
    timestamp: '2026-10-08T09:15:00Z',
    category: 'Specialized Diagnostic & Retraining',
    concerns: ['ADHD & Focus', 'Brain Fog', 'Chronic Headaches'],
    concernDetails: 'Long-standing concentration fatigue and afternoon brain fog. Want a 19-sensor qEEG BrainCore brain map and ES Teck scan.',
    preferredDays: ['Monday', 'Wednesday', 'Friday'],
    preferredTimeWindows: ['Evening (4pm - 7:30pm)'],
    patientName: 'Kavita Patel',
    patientPhone: '(416) 555-0342',
    patientEmail: 'kavita.patel@example.com',
    priorCareNotes: 'Seeking non-pharmacological treatment protocol.',
    status: 'Reviewing',
    urgency: 'Routine'
  },
  {
    id: 'req-103',
    referenceNumber: 'TRN-2026-8874',
    timestamp: '2026-10-08T16:45:00Z',
    category: 'The Balance Program (Gut Reset)',
    concerns: ['Gut & Digestive Issues', 'Chronic Fatigue', 'Inflammation'],
    concernDetails: 'Severe abdominal bloating and systemic exhaustion. Ready to start the 12-week Balance Program under Dr. Jennifer Anthony and Michelle Ching.',
    preferredDays: ['Saturday', 'Monday'],
    preferredTimeWindows: ['Morning (9am - 12pm)'],
    patientName: 'Robert Vance',
    patientPhone: '(905) 555-0721',
    patientEmail: 'robert.vance@example.org',
    priorCareNotes: 'Endoscopy inconclusive; wants functional microbiome and mucosal barrier approach.',
    status: 'Received',
    urgency: 'Priority'
  }
];

const INITIAL_REFERRALS: ReferralSubmission[] = [
  {
    id: 'ref-201',
    timestamp: '2026-10-06T11:20:00Z',
    referrerName: 'Marcus Thorne',
    referrerEmail: 'm.thorne@example.com',
    referrerPhone: '(905) 555-3211',
    refereeName: 'David Sterling',
    refereeEmail: 'david.s@example.com',
    refereePhone: '(905) 555-8832',
    serviceInterest: 'BrainCore Neurofeedback Therapy',
    personalNote: 'Marcus recommended the clinic after seeing remarkable improvements in post-concussion headaches.',
    status: 'Consultation Attended',
    pointsEarned: 100
  },
  {
    id: 'ref-202',
    timestamp: '2026-10-08T10:00:00Z',
    referrerName: 'Elena Rostova',
    referrerEmail: 'elena.rostova@example.com',
    referrerPhone: '(416) 555-9014',
    refereeName: 'Anna Belova',
    refereeEmail: 'anna.belova@example.com',
    refereePhone: '(416) 555-4309',
    serviceInterest: 'The Balance Program (12-Week Gut Reset)',
    personalNote: 'Colleague dealing with severe chronic digestive distress.',
    status: 'Care Started',
    pointsEarned: 100
  }
];

export function getBookings(): AppointmentBookingSubmission[] {
  try {
    const data = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
      return INITIAL_BOOKINGS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_BOOKINGS;
  }
}

export const getTriageBookings = getBookings;

export function saveBooking(booking: Omit<AppointmentBookingSubmission, 'id' | 'referenceNumber' | 'timestamp' | 'status'>): AppointmentBookingSubmission {
  const existing = getBookings();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newSubmission: AppointmentBookingSubmission = {
    ...booking,
    id: `req-${Date.now()}`,
    referenceNumber: `TRN-${new Date().getFullYear()}-${randomSuffix}`,
    timestamp: new Date().toISOString(),
    status: 'Received'
  };
  const updated = [newSubmission, ...existing];
  try {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
  return newSubmission;
}

export const saveTriageBooking = saveBooking;

export function updateBookingStatus(id: string, status: TriageBookingSubmission['status']): void {
  const current = getTriageBookings();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
}

export function getReferrals(): ReferralSubmission[] {
  try {
    const data = localStorage.getItem(REFERRALS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(REFERRALS_STORAGE_KEY, JSON.stringify(INITIAL_REFERRALS));
      return INITIAL_REFERRALS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_REFERRALS;
  }
}

export function saveReferral(referral: Omit<ReferralSubmission, 'id' | 'timestamp' | 'status' | 'pointsEarned'>): ReferralSubmission {
  const existing = getReferrals();
  const newRef: ReferralSubmission = {
    ...referral,
    id: `ref-${Date.now()}`,
    timestamp: new Date().toISOString(),
    status: 'Invited',
    pointsEarned: 0
  };
  const updated = [newRef, ...existing];
  try {
    localStorage.setItem(REFERRALS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save referral to localStorage', e);
  }
  return newRef;
}

/** Reward is only payable once the referred patient has attended their booking. */
export function updateReferralStatus(id: string, status: ReferralSubmission['status']): ReferralSubmission[] {
  const updated = getReferrals().map((r) => {
    if (r.id !== id) return r;
    if (status === 'Points Awarded' && r.status === 'Invited') return r;
    return { ...r, status, pointsEarned: status === 'Points Awarded' ? 100 : 0 };
  });
  localStorage.setItem(REFERRALS_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function saveContactInquiry(inquiry: Omit<ContactInquiry, 'id' | 'timestamp'>): ContactInquiry {
  const newInq: ContactInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    timestamp: new Date().toISOString()
  };
  try {
    const existingStr = localStorage.getItem(CONTACT_STORAGE_KEY);
    const existing: ContactInquiry[] = existingStr ? JSON.parse(existingStr) : [];
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify([newInq, ...existing]));
  } catch (e) {
    console.error('Failed to save contact inquiry', e);
  }
  return newInq;
}
