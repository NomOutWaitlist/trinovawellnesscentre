import { createFileRoute, redirect } from '@tanstack/react-router';
import { StaffReportsPage } from '@/site/pages/StaffPages';
import { getStaffAccess } from '@/lib/work-tracker.functions';
export const Route = createFileRoute('/staff/reports')({
  beforeLoad: async () => { const {role}=await getStaffAccess(); if(role!=='owner') throw redirect({ to:role==='employee'?'/staff/log':'/staff' }); },
  head: () => ({ meta: [ { title:'Owner Work Reports | Trinova Work Tracker' }, { name:'description',content:'Private owner accountability reports.' }, { property:'og:title',content:'Owner Work Reports | Trinova Work Tracker' }, { property:'og:description',content:'Private owner accountability reports.' }, { property:'og:type',content:'website' }, { name:'twitter:card',content:'summary' }, { name:'robots',content:'noindex, nofollow, noarchive' } ] }),
  component: StaffReportsPage,
});
