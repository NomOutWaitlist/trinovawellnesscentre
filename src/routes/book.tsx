import { pageHead } from '@/lib/seo';
import { createFileRoute } from "@tanstack/react-router";
import { BookPage } from "@/site/pages/BookPage";
import { useSiteNav } from "@/site/nav";

export const Route = createFileRoute("/book")({
  validateSearch: (s: Record<string, unknown>): { category?: string; practitioner?: string; concern?: string } => ({
    ...(typeof s["category"] === "string" ? { category: s["category"] } : {}),
    ...(typeof s["concern"] === "string" ? { concern: s["concern"] } : {}),
    ...(typeof s["practitioner"] === "string" ? { practitioner: s["practitioner"] } : {}),
  }),
  head: () => pageHead('/book'),
  component: Page,
});

function Page() {
  const go = useSiteNav();
  const search = Route.useSearch();
  return <BookPage initialCategory={search.category} initialPractitioner={search.practitioner} initialConcern={search.concern} onNavigateHome={() => go('/')} onNavigateToPortal={() => go('/portal')} />;
}
