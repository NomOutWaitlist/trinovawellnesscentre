import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "@/site/pages/ServicesPage";
import { useSiteNav } from "@/site/nav";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: 'Services | Trinova Wellness Centre' },
      { name: "description", content: 'Chiropractic, BrainCore neurofeedback, massage therapy, psychotherapy, osteopathy and diagnostics in Brampton.' },
      { property: "og:title", content: 'Services | Trinova Wellness Centre' },
      { property: "og:description", content: 'Chiropractic, BrainCore neurofeedback, massage therapy, psychotherapy, osteopathy and diagnostics in Brampton.' },
    ],
  }),
  component: Page,
});

function Page() {
  const go = useSiteNav();

  return <ServicesPage onNavigateToBook={(c) => go('/book', { category: c })} onNavigateToBalance={() => go('/programs/balance')} />;
}
