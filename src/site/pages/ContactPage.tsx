import React, { useState } from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { saveContactInquiry } from '../utils/storage';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Car, 
  Accessibility, 
  Building, 
  AlertCircle
} from 'lucide-react';

interface ContactPageProps {
  onNavigateToBook: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateToBook }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Clinical Inquiry');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    saveContactInquiry({
      name,
      email,
      phone,
      subject,
      message
    });

    setSentSuccess(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#EBF1FF] to-white pt-12 pb-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#006837] bg-[#E8F8F0] px-3.5 py-1 rounded-full inline-block mb-3">
            Get in Touch With Our Clinic
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#0033A0] tracking-tight">
            Contact Trinova Wellness Centre
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Conveniently located in Brampton, Ontario. Reach out to our multidisciplinary intake desk, schedule your visit, or inquire about personalized care programs.
          </p>
        </div>
      </section>

      {/* Primary Contact Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#00A651]/10 text-[#006837] flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#00A651]" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-[#0033A0]">
                Call Reception
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct phone support for scheduling, referrals, and insurance billing questions.
              </p>
              <div className="pt-2">
                <a
                  href="tel:+19054957748"
                  className="font-heading font-extrabold text-xl text-[#0033A0] hover:text-[#002270] block"
                >
                  {CLINIC_INFO.phoneDisplay}
                </a>
                <span className="text-xs text-emerald-600 font-semibold">Toll-free across Ontario: +1 (905) 495-7748</span>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4 text-xs text-slate-500">
              Staffed Monday through Saturday
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0033A0]/10 text-[#0033A0] flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#0033A0]" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-[#0033A0]">
                Email Us
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Send clinical intake documents, medical imaging reports, or general queries.
              </p>
              <div className="pt-2 space-y-1 text-xs sm:text-sm font-semibold">
                <a
                  href={`mailto:${CLINIC_INFO.emails[0]}`}
                  className="text-[#0033A0] hover:underline block break-all"
                >
                  {CLINIC_INFO.emails[0]}
                </a>
                <a
                  href={`mailto:${CLINIC_INFO.emails[1]}`}
                  className="text-[#0033A0] hover:underline block break-all"
                >
                  {CLINIC_INFO.emails[1]}
                </a>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4 text-xs text-slate-500">
              Email inquiries reviewed within 24 hours
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-[#0033A0]">
                Clinic Address
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Unit 204, 178 John Street<br />
                Brampton, Ontario, L6W 2Z1
              </p>
              <div className="pt-1 text-xs text-slate-600">
                <strong>Directions:</strong> Situated near Steeles Ave and Queen St corridor with easy 410 Highway access.
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4 text-xs text-emerald-700 font-semibold">
              Free on-site patient parking
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map & Directions + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Location Visual & Building Details */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#006837] bg-[#E8F8F0] px-3 py-1 rounded-full">
                Brampton Facility & Accessibility
              </span>
              <h2 className="font-heading text-2xl font-extrabold text-[#0033A0]">
                Visiting Trinova Wellness Centre
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We are situated in a modern, fully accessible professional medical and wellness building in Brampton.
              </p>
            </div>

            {/* Visual Location Card */}
            <div className="bg-[#EBF1FF] rounded-2xl p-6 border border-blue-200/80 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="font-heading font-bold text-sm text-[#0033A0]">
                  Unit 204, 178 John Street, Brampton
                </div>
                <span className="text-xs bg-[#00A651] text-white px-2.5 py-0.5 rounded-full font-bold">
                  2nd Floor
                </span>
              </div>

              {/* Map representation */}
              <div className="w-full h-44 bg-slate-200 rounded-xl overflow-hidden relative flex items-center justify-center border border-slate-300">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 via-blue-50 to-emerald-50 opacity-90" />
                
                {/* Visual Map Grid Lines */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-30">
                  {[...Array(24)].map((_, i) => (
                    <div key={i} className="border-r border-b border-slate-400/40" />
                  ))}
                </div>

                {/* Map Pin Marker */}
                <div className="relative z-10 text-center animate-bounce">
                  <div className="w-10 h-10 rounded-full bg-[#0033A0] text-white flex items-center justify-center mx-auto shadow-lg border-2 border-white">
                    <MapPin className="w-5 h-5 text-[#00A651]" />
                  </div>
                  <span className="text-[11px] font-bold text-[#0033A0] bg-white px-2 py-0.5 rounded shadow mt-1 inline-block">
                    178 John St, Unit 204
                  </span>
                </div>

                <div className="absolute bottom-2 left-2 text-[10px] text-slate-500 font-medium">
                  Brampton, ON · L6W 2Z1
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-blue-200/70 flex items-center justify-between text-xs">
                <a
                  href="https://maps.google.com/?q=178+John+Street+Unit+204+Brampton+ON+L6W2Z1"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#0033A0] hover:underline flex items-center gap-1"
                >
                  Open in Google Maps / Apple Maps →
                </a>
              </div>
            </div>

            {/* Building Amenities */}
            <div className="space-y-3 pt-2">
              <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-500">
                Facility Amenities & Arrival Guidance:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-[#006837] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-slate-800">Parking</strong>
                    <div className="text-slate-500">Free dedicated visitor spaces</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                  <Accessibility className="w-4 h-4 text-[#0033A0] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-slate-800">Elevator</strong>
                    <div className="text-slate-500">Direct access to 2nd floor</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#00A651] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-slate-800">Hours</strong>
                    <div className="text-slate-500">Open until 7:30 PM weekdays</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#006837] bg-[#E8F8F0] px-3 py-1 rounded-full">
                Front-Desk Inquiry Form
              </span>
              <h2 className="font-heading text-2xl font-extrabold text-[#0033A0] mt-2">
                Send Us a Secure Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Have a question about our services or need help getting started? Send our administration team a note.
              </p>
            </div>

            {sentSuccess && (
              <div className="bg-[#E8F8F0] border-2 border-[#00A651] p-4 rounded-xl text-center space-y-1 animate-in fade-in">
                <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#006837]">
                  <CheckCircle2 className="w-5 h-5 text-[#00A651]" />
                  <span>Message Sent Successfully</span>
                </div>
                <p className="text-xs text-slate-600">
                  Our front-desk coordinator will reply to your email within one business day.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Jonathan Lee"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0033A0]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jonathan@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0033A0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(905) 555-0177"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0033A0]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Topic of Inquiry
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0033A0] bg-white"
                >
                  <option value="General Clinical Inquiry">General Clinical Inquiry</option>
                  <option value="BrainCore Neurofeedback Question">BrainCore Neurofeedback Question</option>
                  <option value="The Balance Program ($3,300 Gut Reset)">The Balance Program ($3,300 Gut Reset)</option>
                  <option value="Post-MVA / WSIB Claim Processing">Post-MVA / WSIB Claim Processing</option>
                  <option value="Insurance Direct Billing Inquiry">Insurance Direct Billing Inquiry</option>
                  <option value="Practitioner Specific Question">Question for Dr. Jennifer Anthony / Team</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can our clinical team support your wellness journey?"
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0033A0]"
                />
              </div>

              <button
                type="submit"
                className="btn-pill-leaf w-full justify-center text-sm py-3.5 shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Send Message to Trinova</span>
              </button>
            </form>

            <div className="pt-2 text-center">
              <span className="text-xs text-slate-500">
                Ready to book an appointment right now?{' '}
                <button
                  onClick={onNavigateToBook}
                  className="font-bold text-[#0033A0] hover:underline cursor-pointer"
                >
                  Match your care & book a visit →
                </button>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
