import { describe, expect, it } from 'vitest';
import { calculateMinutes, canReadReports, canLogWork, PILLARS, csvForEntries } from '@/lib/work-tracker';

describe('Private work tracking rules', () => {
  it('calculates elapsed work from start and finish', () => {
    expect(calculateMinutes('09:15', '11:45')).toBe(150);
    expect(calculateMinutes('13:50', '14:10')).toBe(20);
  });
  it('rejects finish times before or equal to the start', () => {
    expect(() => calculateMinutes('11:00', '10:00')).toThrow();
    expect(() => calculateMinutes('11:00', '11:00')).toThrow();
    expect(() => calculateMinutes('29:00', '30:00')).toThrow();
  });
  it('only allows the owner to read all work data', () => {
    expect(canReadReports('owner')).toBe(true);
    expect(canReadReports('employee')).toBe(false);
    expect(canReadReports(null)).toBe(false);
  });
  it('only allows an authenticated employee to log work', () => {
    expect(canLogWork('employee')).toBe(true);
    expect(canLogWork('owner')).toBe(false);
    expect(canLogWork(null)).toBe(false);
  });
  it('uses exactly the three requested pillars', () => {
    expect([...PILLARS]).toEqual(['High Impact Women', 'High Impact App', 'Trinova Wellness Centre']);
  });
  it('escapes spreadsheet formulas in exported categories', () => {
    const csv = csvForEntries([{ id: 'a', date: '2026-11-02', pillar: 'High Impact App', category: '=1+1', start: '09:00', end: '10:00', minutes: 60, description: 'Work', timestamp: '' }]);
    expect(csv).toContain('"\'=1+1"');
  });
});