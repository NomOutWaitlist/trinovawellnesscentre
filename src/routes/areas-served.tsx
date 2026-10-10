import { createFileRoute } from "@tanstack/react-router";
import { AreasServedPage } from "@/site/pages/AreasServedPage";
import { useSiteNav } from "@/site/nav";

export const Route = createFileRoute("/areas-served")({
  head: () => ({
    meta: [
      { title: 'Areas Served: Brampton, Mississauga & Peel | Trinova' },
      { name: "description", content: 'Trinova serves patients from Brampton, Mississauga and across Peel Region with free parking and direct billing.' },
      { property: "og:title", content: 'Areas Served: Brampton, Mississauga & Peel | Trinova' },
      { property: "og:description", content: 'Trinova serves patients from Brampton, Mississauga and across Peel Region with free parking and direct billing.' },
    ],
  }),
  component: Page,
});

function Page() {
  const go = useSiteNav();

  return <AreasServedPage onNavigateToBook={(c) => go('/book', { category: c })} onNavigateToContact={() => go('/contact')} />;
}
