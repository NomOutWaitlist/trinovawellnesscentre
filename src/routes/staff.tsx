import { createFileRoute, Outlet } from '@tanstack/react-router';
export const Route = createFileRoute('/staff')({ head: () => ({ meta: [{ name: 'robots', content: 'noindex, nofollow, noarchive' }] }), component: () => <Outlet /> });
