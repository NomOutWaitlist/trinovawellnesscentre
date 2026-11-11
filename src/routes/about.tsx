import { pageHead } from '@/lib/seo';
import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/site/pages/AboutPage";
import { useSiteNav } from "@/site/nav";

export const Route = createFileRoute("/about")({
  head: () => pageHead('/about'),
  component: Page,
});

function Page() {
  const go = useSiteNav();

  return <AboutPage onNavigateToBook={(n) => go('/book', { practitioner: n })} />;
}
