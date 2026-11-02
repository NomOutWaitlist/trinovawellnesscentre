import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { workInputSchema, calculateMinutes } from './work-tracker';

export const getStaffAccess = createServerFn({ method: 'GET' }).handler(async () => {
  const { staffSession } = await import('./work-tracker.server');
  const session = await staffSession();
  return { role: session.data.role ?? null };
});

export const staffLogin = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => z.object({ role: z.enum(['employee', 'owner']), pin: z.string().min(4).max(128) }).parse(input))
  .handler(async ({ data }) => {
    const { staffSession, throttleLogin, safePinEqual } = await import('./work-tracker.server');
    await throttleLogin();
    const expected = process.env[data.role === 'owner' ? 'OWNER_PIN' : 'EMPLOYEE_PIN'];
    if (!await safePinEqual(data.pin, expected)) return { ok: false as const, error: 'Incorrect PIN.' };
    const session = await staffSession();
    await session.clear();
    await session.update({ role: data.role });
    return { ok: true as const, role: data.role };
  });

export const staffLogout = createServerFn({ method: 'POST' }).handler(async () => {
  const { staffSession } = await import('./work-tracker.server');
  await (await staffSession()).clear();
  return { ok: true };
});

export const saveWorkEntry = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => workInputSchema.parse(input))
  .handler(async ({ data }) => {
    const { requireStaff, sheetRequest } = await import('./work-tracker.server');
    await requireStaff('log');
    const minutes = calculateMinutes(data.start, data.end);
    await sheetRequest('append', { entry: { ...data, minutes } });
    return { ok: true, minutes };
  });

export const getWorkEntries = createServerFn({ method: 'POST' }).handler(async () => {
  const { requireStaff, sheetRequest, checkedEntry } = await import('./work-tracker.server');
  await requireStaff('reports');
  const result = await sheetRequest('list');
  return { entries: (result.data ?? []).map(checkedEntry) };
});