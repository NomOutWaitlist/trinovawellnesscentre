import { z } from 'zod';

export const PILLARS = ['High Impact Women', 'High Impact App', 'Trinova Wellness Centre'] as const;
export type StaffRole = 'employee' | 'owner';
export const workInputSchema = z.object({
  id: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  pillar: z.enum(PILLARS),
  category: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(3000),
  start: z.string().regex(/^\d{2}:\d{2}$/),
  end: z.string().regex(/^\d{2}:\d{2}$/),
});
export type WorkInput = z.infer<typeof workInputSchema>;
export type WorkEntry = WorkInput & { minutes: number; timestamp: string };

export function calculateMinutes(start: string, end: string) {
  const parse = (time: string) => {
    if (!/^\d{2}:\d{2}$/.test(time)) throw new Error('Enter valid start and end times.');
    const [h, m] = time.split(':').map(Number);
    if (h > 23 || m > 59) throw new Error('Enter valid start and end times.');
    return h * 60 + m;
  };
  const minutes = parse(end) - parse(start);
  if (minutes <= 0) throw new Error('End time must be after start time on the same day.');
  return minutes;
}
export function durationLabel(minutes: number) {
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}
export function canReadReports(role: StaffRole | null) { return role === 'owner'; }
export function canLogWork(role: StaffRole | null) { return role === 'employee'; }
export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function csvForEntries(entries: WorkEntry[]) {
  const cell = (value: string | number) => {
    const text = String(value);
    return `"${(/^[=+\-@\t\r]/.test(text) ? "'" : '') + text.replace(/"/g, '""')}"`;
  };
  return [['Date', 'Pillar', 'Category', 'Start', 'End', 'Minutes', 'Work description'], ...entries.map(e => [e.date, e.pillar, e.category, e.start, e.end, e.minutes, e.description])].map(row => row.map(cell).join(',')).join('\r\n');
}