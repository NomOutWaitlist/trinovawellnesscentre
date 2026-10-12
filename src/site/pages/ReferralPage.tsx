import React, { useState } from 'react';
import { REFERRAL_PROGRAM, CLINIC_INFO } from '../data/clinicData';
import { saveReferral } from '../utils/storage';
import { 
  Gift, 
  Award, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  CreditCard, 
  DollarSign, 
  Send,
  Heart,
  ShieldCheck,
  Calculator
} from 'lucide-react';

export const ReferralPage: React.FC = () => {
  // Referral Form State
  const [referrerName, setReferrerName] = useState('');
  const [referrerEmail, setReferrerEmail] = useState('');
  const [referrerPhone, setReferrerPhone] = useState('');
  const [refereeName, setRefereeName] = useState('');
  const [refereeEmail, setRefereeEmail] = useState('');
  const [refereePhone, setRefereePhone] = useState('');
  const [serviceInterest, setServiceInterest] = useState('Whole-Person Wellness Consultation');
  const [personalNote, setPersonalNote] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Points Calculator State
  const [calcReferralCount, setCalcReferralCount] = useState<number>(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referrerName || !referrerEmail || !refereeName || !refereePhone) {
      return;
    }

    saveReferral({
      referrerName,
      referrerEmail,
      referrerPhone,
      refereeName,
      refereeEmail,
      refereePhone,
      serviceInterest,
      personalNote
    });

    setSubmittedSuccess(true);
    // Reset form
    setRefereeName('');
    setRefereeEmail('');
    setRefereePhone('');
    setPersonalNote('');
  };

  const calculatedPoints = calcReferralCount * 100;
  const unlockedTier = calculatedPoints >= 1000
    ? '1,000 Points: $150 Visa/Mastercard Gift Card or 30-Min Treatment'
    : calculatedPoints >= 500
    ? '500 Points: $75 Service Credit OR 20% Off Clinical Retail'
    : calculatedPoints >= 200
    ? '200 Points: $25 Clinic Service Credit'
    : 'Refer at least 2 people to unlock your first $25 Credit';

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#EBF1FF] to-white pt-12 pb-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#E8F8F0] border border-[#00A651]/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#006837] uppercase tracking-wide mb-3">
            <Gift className="w-4 h-4 text-[#00A651]" />
            <span>Community Wellness Rewards</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#0033A0] tracking-tight">
            Patient Referral Rewards Program
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Gift your friends, colleagues, and loved ones a complimentary consultation. When they begin their healing journey at Trinova, you earn reward points redeemable for clinic service credits and cash gift cards.
          </p>
        </div>
      </section>

      {/* How the Points Engine Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0033A0]/10 text-[#0033A0] flex items-center justify-center mx-auto">
              <Send className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-[#006837] uppercase tracking-wider">
              Step 1
            </div>
            <h3 className="font-heading font-extrabold text-lg text-[#0033A0]">
              Gift a Consultation
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Submit your referral below or share your personal patient referral code with a friend in need of care.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#006837]/10 text-[#006837] flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-[#006837] uppercase tracking-wider">
              Step 2
            </div>
            <h3 className="font-heading font-extrabold text-lg text-[#0033A0]">
              Loved One Begins Care
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When your referee attends their first in-clinic consultation, <strong>100 points</strong> are credited to your account. Points are never awarded for a booking alone — only for an attended visit.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#00A651]/30 bg-[#E8F8F0]/30 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#00A651] text-white flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-[#006837] uppercase tracking-wider">
              Step 3
            </div>
            <h3 className="font-heading font-extrabold text-lg text-[#0033A0]">
              Redeem Exclusive Tiers
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Redeem 200, 500, or 1,000 points for clinic service credits, clinical retail discounts, or $150 prepaid cash cards.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Reward Tiers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#006837] bg-[#E8F8F0] px-3.5 py-1 rounded-full inline-block mb-2">
            Reward Milestones
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-[#0033A0]">
            The 3 Trinova Reward Tiers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Every 100 points earned brings you closer to clinic credits and premium wellness perks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REFERRAL_PROGRAM.tiers.map((tier) => (
            <div
              key={tier.points}
              className={`rounded-3xl p-8 border transition flex flex-col justify-between ${
                tier.points === 500
                  ? 'bg-gradient-to-b from-white to-[#EBF1FF] border-[#0033A0] shadow-md scale-102 ring-2 ring-[#0033A0]/20'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0033A0]">
                    {tier.points} <span className="text-sm font-semibold text-slate-500">Pts</span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#00A651]/15 text-[#006837]">
                    {tier.highlight}
                  </span>
                </div>

                <div className="font-heading font-extrabold text-lg text-[#0033A0]">
                  {tier.reward}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00A651]" />
                  <span>Requires {tier.points / 100} attended first consultations</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Points Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0033A0] to-[#002270] text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#00A651]/20 border border-[#00A651]/40 px-3.5 py-1 rounded-full text-xs font-bold text-emerald-300 uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5" />
                <span>Interactive Earnings Estimator</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
                How Many Friends or Colleagues Could Benefit from Whole-Person Care?
              </h2>
              <p className="text-sm text-blue-100 leading-relaxed">
                Adjust the slider to calculate how many referral points and reward milestones you could accumulate by introducing your network to Trinova.
              </p>

              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-between text-sm font-semibold text-emerald-300">
                  <span>Number of Referrals:</span>
                  <span className="text-2xl font-extrabold text-white">{calcReferralCount} Friends</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={calcReferralCount}
                  onChange={(e) => setCalcReferralCount(parseInt(e.target.value))}
                  className="w-full h-3 bg-blue-900 rounded-lg appearance-none cursor-pointer accent-[#00A651]"
                />
                <div className="flex justify-between text-[11px] text-blue-200">
                  <span>1 Referral (100 Pts)</span>
                  <span>5 Referrals (500 Pts)</span>
                  <span>10+ Referrals (1,000+ Pts)</span>
                </div>
              </div>
            </div>

            {/* Calculated Reward Output Box */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 text-center">
              <div className="text-xs font-bold text-[#006837] uppercase tracking-wider">
                Estimated Points Earned
              </div>
              <div className="font-heading font-extrabold text-5xl text-[#0033A0]">
                {calculatedPoints} <span className="text-lg font-semibold text-slate-500">Pts</span>
              </div>
              <div className="p-3 bg-[#E8F8F0] rounded-xl border border-[#00A651]/30 text-xs font-bold text-[#006837]">
                Unlocked Tier: {unlockedTier}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Points never expire as long as you remain an active patient in our Brampton clinical registry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Submit a Referral Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-8 sm:p-12 shadow-md space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#006837] bg-[#E8F8F0] px-3.5 py-1 rounded-full inline-block">
              Send an Invitation
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0033A0]">
              Submit a Patient Referral
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Our front-desk team will reach out warmly to offer them a complimentary consultation and attribute 100 reward points to your profile once care begins.
            </p>
          </div>

          {submittedSuccess && (
            <div className="bg-[#E8F8F0] border-2 border-[#00A651] p-5 rounded-2xl text-center space-y-2 animate-in fade-in">
              <div className="w-10 h-10 rounded-full bg-[#00A651] text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="font-heading font-bold text-base text-[#006837]">
                Referral Successfully Recorded!
              </div>
              <p className="text-xs text-slate-700 max-w-md mx-auto">
                Thank you for trusting Trinova. Our clinical coordination desk will invite your referee for their complimentary consultation.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Referrer Details */}
            <div className="space-y-4">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[#0033A0] border-b border-slate-100 pb-2">
                1. Your Information (Referring Patient)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={referrerName}
                    onChange={(e) => setReferrerName(e.target.value)}
                    placeholder="e.g., Marcus Thorne"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0033A0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={referrerEmail}
                    onChange={(e) => setReferrerEmail(e.target.value)}
                    placeholder="m.thorne@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0033A0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Phone</label>
                  <input
                    type="tel"
                    value={referrerPhone}
                    onChange={(e) => setReferrerPhone(e.target.value)}
                    placeholder="(905) 555-0199"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0033A0]"
                  />
                </div>
              </div>
            </div>

            {/* Referee Details */}
            <div className="space-y-4 pt-2">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[#006837] border-b border-slate-100 pb-2">
                2. Person You Are Referring (Friend / Family / Colleague)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Referee Full Name *</label>
                  <input
                    type="text"
                    required
                    value={refereeName}
                    onChange={(e) => setRefereeName(e.target.value)}
                    placeholder="e.g., Sarah Johnson"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A651]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Referee Phone *</label>
                  <input
                    type="tel"
                    required
                    value={refereePhone}
                    onChange={(e) => setRefereePhone(e.target.value)}
                    placeholder="(905) 555-0144"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A651]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Referee Email</label>
                  <input
                    type="email"
                    value={refereeEmail}
                    onChange={(e) => setRefereeEmail(e.target.value)}
                    placeholder="sarah.j@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A651]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Primary Area of Interest</label>
                <select
                  value={serviceInterest}
                  onChange={(e) => setServiceInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A651] bg-white"
                >
                  <option value="Whole-Person Wellness Consultation">Whole-Person Wellness Consultation</option>
                  <option value="BrainCore Neurofeedback Therapy">BrainCore Neurofeedback (ADHD / Anxiety / Concussion)</option>
                  <option value="Psychotherapy & EMDR">Psychotherapy & EMDR (Trauma / Mood)</option>
                  <option value="Pain Rehab & Chiropractic">Chiropractic, Osteopathy & RMT</option>
                  <option value="The Balance Program (Gut Reset)">The Balance Program ($3,300 Gut Reset)</option>
                  <option value="Post-MVA Accident Recovery">Post-MVA Car Accident Care</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Personal Note or Context (Optional)</label>
                <textarea
                  rows={2}
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  placeholder="e.g., Struggling with chronic headaches after a motor vehicle accident..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A651]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-pill-leaf w-full justify-center text-sm py-3.5 shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Submit Referral & Gift Complimentary Consultation</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
