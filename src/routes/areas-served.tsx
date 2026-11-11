import { pageHead } from '@/lib/seo';
import { createFileRoute } from "@tanstack/react-router";
import { AreasServedPage } from "@/site/pages/AreasServedPage";
import { useSiteNav } from "@/site/nav";

export const Route = createFileRoute("/areas-served")({
  head: () => pageHead('/areas-served'),
  component: Page,
});

function Page() {
  const go = useSiteNav();

  return <AreasServedPage onNavigateToBook={(c) => go('/book', { category: c })} onNavigateToContact={() => go('/contact')} />;
}
