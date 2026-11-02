import { createFileRoute, redirect } from '@tanstack/react-router';
import { StaffLogPage } from '@/site/pages/StaffPages';
import { getStaffAccess } from '@/lib/work-tracker.functions';
export const Route = createFileRoute('/staff/log')({
  beforeLoad: async () => { const {role}=await getStaffAccess(); if(role!=='employee') throw redirect({ to:role==='owner'?'/staff/reports':'/staff' }); },
  head: () => ({ meta: [ { title:'Daily Work Log | Trinova Work Tracker' }, { name:'description',content:'Private employee work recording.' }, { property:'og:title',content:'Daily Work Log | Trinova Work Tracker' }, { property:'og:description',content:'Private employee work recording.' }, { property:'og:type',content:'website' }, { name:'twitter:card',content:'summary' }, { name:'robots',content:'noindex, nofollow, noarchive' } ] }),
  component: StaffLogPage,
});
