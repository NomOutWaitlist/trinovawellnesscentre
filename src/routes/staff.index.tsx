import { createFileRoute, redirect } from '@tanstack/react-router';
import { StaffLoginPage } from '@/site/pages/StaffPages';
import { getStaffAccess } from '@/lib/work-tracker.functions';
export const Route = createFileRoute('/staff/')({
  beforeLoad: async () => { const { role } = await getStaffAccess(); if(role) throw redirect({ to: role === 'owner' ? '/staff/reports' : '/staff/log' }); },
  head: () => ({ meta: [ { title:'Staff Access | Trinova Work Tracker' }, { name:'description',content:'Private Trinova staff access.' }, { property:'og:title',content:'Staff Access | Trinova Work Tracker' }, { property:'og:description',content:'Private staff access.' }, { property:'og:type',content:'website' }, { name:'twitter:card',content:'summary' }, { name:'robots',content:'noindex, nofollow, noarchive' } ] }),
  component: StaffLoginPage,
});
