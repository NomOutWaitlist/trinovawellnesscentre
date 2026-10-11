import React, { useState } from 'react';
import { getTriageBookings, updateBookingStatus, getReferrals, updateReferralStatus } from '../utils/storage';
import { TriageBookingSubmission, ReferralSubmission } from '../types/clinic';
import { 
  UserCheck, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  Gift, 
  Phone, 
  Mail, 
  ChevronRight,
  Eye,
  X
} from 'lucide-react';

interface ClinicPortalPageProps {
  onNavigateToBook: () => void;
}

export const ClinicPortalPage: React.FC<ClinicPortalPageProps> = ({ onNavigateToBook }) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'referrals'>('appointments');
  const [bookings, setBookings] = useState<TriageBookingSubmission[]>(getTriageBookings());
  const [referrals, setReferrals] = useState<ReferralSubmission[]>(getReferrals());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedBooking, setSelectedBooking] = useState<TriageBookingSubmission | null>(null);

  const handleStatusChange = (id: string, newStatus: TriageBookingSubmission['status']) => {
    updateBookingStatus(id, newStatus);
    setBookings(getTriageBookings());
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#006837] bg-[#E8F8F0] px-3 py-0.5 rounded-full flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" />
              Patient Care Coordinator
            </span>
            <span className="text-xs text-slate-500">Trinova Clinical Registry</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0033A0]">
            Patient Inquiries & Appointments
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time queue for review by Dr. Jennifer Anthony and reception. Submissions from online booking appear here instantly.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'appointments'
                ? 'bg-[#0033A0] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Consultation Requests ({bookings.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('referrals')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'referrals'
                ? 'bg-[#006837] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>Referral Engine ({referrals.length})</span>
          </button>
        </div>
      </div>

      {/* INQUIRIES TAB */}
      {activeTab === 'appointments' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by patient name, ref#, or condition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0033A0]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Filter Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#0033A0]"
              >
                <option value="All">All Statuses</option>
                <option value="Received">Received</option>
                <option value="Reviewing">Reviewing</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
              </select>

              <button
                onClick={onNavigateToBook}
                className="btn-pill-leaf text-xs py-2 px-4 shrink-0"
              >
                + New Consultation
              </button>
            </div>
          </div>

          {/* Bookings Table / List */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-heading text-[11px] uppercase tracking-wider">
                    <th className="p-4">Ref Number</th>
                    <th className="p-4">Patient Name & Contact</th>
                    <th className="p-4">Clinical Category</th>
                    <th className="p-4">Primary Concerns</th>
                    <th className="p-4">Availability</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500 text-sm">
                        No appointment requests match your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/80 transition">
                        <td className="p-4 font-mono font-bold text-[#0033A0]">
                          {b.referenceNumber}
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-slate-800">{b.patientName}</div>
                          <div className="text-slate-500 text-xs">{b.patientPhone}</div>
                          <div className="text-slate-400 text-[11px]">{b.patientEmail}</div>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded text-xs">
                            {b.category}
                          </span>
                        </td>
                        <td className="p-4 max-w-xs">
                          <div className="flex flex-wrap gap-1 mb-1">
                            {b.concerns.slice(0, 2).map((c, i) => (
                              <span key={i} className="text-[10px] bg-blue-50 text-[#0033A0] px-1.5 py-0.5 rounded font-medium">
                                {c}
                              </span>
                            ))}
                            {b.concerns.length > 2 && (
                              <span className="text-[10px] text-slate-400">+{b.concerns.length - 2} more</span>
                            )}
                          </div>
                          <div className="text-slate-600 text-xs line-clamp-1 italic">
                            {b.concernDetails}
                          </div>
                        </td>
                        <td className="p-4 text-xs text-slate-600">
                          <div><strong>Days:</strong> {b.preferredDays.join(', ')}</div>
                          <div className="text-slate-500">{b.preferredTimeWindows.join(', ')}</div>
                        </td>
                        <td className="p-4">
                          <select
                            value={b.status}
                            onChange={(e) => handleStatusChange(b.id, e.target.value as any)}
                            className={`text-xs font-bold px-2.5 py-1 rounded-full border cursor-pointer ${
                              b.status === 'Scheduled'
                                ? 'bg-emerald-50 text-[#006837] border-emerald-300'
                                : b.status === 'Reviewing'
                                ? 'bg-blue-50 text-[#0033A0] border-blue-300'
                                : b.status === 'Completed'
                                ? 'bg-slate-100 text-slate-700 border-slate-300'
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                          >
                            <option value="Received">Received</option>
                            <option value="Reviewing">Reviewing</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedBooking(b)}
                            className="p-1.5 text-[#0033A0] hover:bg-slate-100 rounded-lg transition cursor-pointer"
                            title="Inspect Complete Clinical Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* REFERRALS TAB */}
      {activeTab === 'referrals' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-extrabold text-lg text-[#0033A0]">
                Patient Referral Log & Point Credits
              </h2>
              <p className="text-xs text-slate-500">
                Rewards are paid only after the referred patient attends their booked appointment.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {referrals.map((ref) => (
              <div
                key={ref.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-sm text-[#0033A0]">
                    {ref.refereeName}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#006837]">
                    {ref.status}
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div><strong>Referred By:</strong> {ref.referrerName} ({ref.referrerEmail})</div>
                  <div><strong>Referee Contact:</strong> {ref.refereePhone} · {ref.refereeEmail}</div>
                  <div><strong>Interest:</strong> {ref.serviceInterest}</div>
                  {ref.personalNote && (
                    <div className="italic text-slate-500 bg-white p-2 rounded border border-slate-200">
                      &ldquo;{ref.personalNote}&rdquo;
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Reward:</span>
                  <span className="font-bold text-sm text-[#00A651]">
                    {ref.status === 'Points Awarded' ? '100 Points paid' : ref.status === 'Invited' ? 'Locked until attended' : '100 Points ready to pay'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ref.status === 'Invited' && (
                    <button type="button" onClick={() => setReferrals(updateReferralStatus(ref.id, 'Consultation Attended'))} className="text-xs font-bold px-3 py-1.5 rounded-md bg-[#0033A0] text-white">
                      Mark Booking Attended
                    </button>
                  )}
                  {(ref.status === 'Consultation Attended' || ref.status === 'Care Started') && (
                    <button type="button" onClick={() => setReferrals(updateReferralStatus(ref.id, 'Points Awarded'))} className="text-xs font-bold px-3 py-1.5 rounded-md bg-[#00A651] text-white">
                      Pay Reward
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inspection Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#006837] bg-[#E8F8F0] px-3 py-0.5 rounded-full">
                  Clinical Intake Detail
                </span>
                <h3 className="font-heading font-extrabold text-xl text-[#0033A0] mt-1">
                  {selectedBooking.referenceNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-200">
                <div className="font-bold text-slate-800 text-base">{selectedBooking.patientName}</div>
                <div className="text-slate-600 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#00A651]" /> {selectedBooking.patientPhone}
                </div>
                <div className="text-slate-600 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#0033A0]" /> {selectedBooking.patientEmail}
                </div>
              </div>

              <div>
                <strong className="text-slate-700 block mb-1">Clinical Category:</strong>
                <span className="text-[#0033A0] font-semibold">{selectedBooking.category}</span>
              </div>

              <div>
                <strong className="text-slate-700 block mb-1">Selected Symptoms / Concerns:</strong>
                <div className="flex flex-wrap gap-1.5">
                  {selectedBooking.concerns.map((c, i) => (
                    <span key={i} className="bg-[#EBF1FF] text-[#0033A0] px-2.5 py-1 rounded-md text-xs font-semibold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <strong className="text-slate-700 block mb-1">Detailed Description:</strong>
                <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                  {selectedBooking.concernDetails}
                </p>
              </div>

              <div>
                <strong className="text-slate-700 block mb-1">Prior Care Notes / Clinician Preference:</strong>
                <p className="text-slate-600 italic">
                  {selectedBooking.priorCareNotes}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <strong className="text-slate-700 block mb-1">Preferred Days:</strong>
                  <span className="text-slate-600">{selectedBooking.preferredDays.join(', ')}</span>
                </div>
                <div>
                  <strong className="text-slate-700 block mb-1">Preferred Time:</strong>
                  <span className="text-slate-600">{selectedBooking.preferredTimeWindows.join(', ')}</span>
                </div>
              </div>

              <div className="pt-2">
                <strong className="text-slate-700 block mb-1">Update Status:</strong>
                <div className="flex gap-2">
                  {(['Received', 'Reviewing', 'Scheduled', 'Completed'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedBooking.id, st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        selectedBooking.status === st
                          ? 'bg-[#0033A0] text-white border-[#0033A0]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedBooking(null)}
                className="btn-pill-blue text-xs py-2 px-5 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
