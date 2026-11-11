import { pageHead } from '@/lib/seo';
import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { ServicesPage } from "@/site/pages/ServicesPage";
import { useSiteNav } from "@/site/nav";

export const Route = createFileRoute("/services")({
  head: () => pageHead('/services'),
  component: Page,
});

function Page() {
  const go = useSiteNav();
  const pathname = useRouterState({ select: state => state.location.pathname });
  if (pathname !== "/services" && pathname !== "/services/") return <Outlet />;

  return <ServicesPage onNavigateToBook={(c) => go('/book', { category: c })} onNavigateToBalance={() => go('/programs/balance')} />;
}
