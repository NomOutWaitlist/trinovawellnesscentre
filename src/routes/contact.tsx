import { pageHead } from '@/lib/seo';
import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/site/pages/ContactPage";
import { useSiteNav } from "@/site/nav";

export const Route = createFileRoute("/contact")({
  head: () => pageHead('/contact'),
  component: Page,
});

function Page() {
  const go = useSiteNav();

  return <ContactPage onNavigateToBook={() => go('/book')} />;
}
