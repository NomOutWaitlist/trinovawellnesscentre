import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/site/pages/AboutPage";
import { useSiteNav } from "@/site/nav";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: 'About Our Team | Trinova Wellness Centre' },
      { name: "description", content: 'Meet the chiropractors, therapists and practitioners behind Trinova Wellness Centre in Brampton.' },
      { property: "og:title", content: 'About Our Team | Trinova Wellness Centre' },
      { property: "og:description", content: 'Meet the chiropractors, therapists and practitioners behind Trinova Wellness Centre in Brampton.' },
    ],
  }),
  component: Page,
});

function Page() {
  const go = useSiteNav();

  return <AboutPage onNavigateToBook={(n) => go('/book', { practitioner: n })} />;
}
