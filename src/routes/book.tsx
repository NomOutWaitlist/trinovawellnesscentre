import { createFileRoute } from "@tanstack/react-router";
import { BookPage } from "@/site/pages/BookPage";
import { useSiteNav } from "@/site/nav";

export const Route = createFileRoute("/book")({
  validateSearch: (s: Record<string, unknown>): { category?: string; practitioner?: string; concern?: string } => ({
    ...(typeof s["category"] === "string" ? { category: s["category"] } : {}),
    ...(typeof s["concern"] === "string" ? { concern: s["concern"] } : {}),
    ...(typeof s["practitioner"] === "string" ? { practitioner: s["practitioner"] } : {}),
  }),
  head: () => ({
    meta: [
      { title: 'Book an Appointment | Trinova Wellness Centre' },
      { name: "description", content: "Request an appointment at Trinova Wellness Centre in Brampton. We'll match you with the right practitioner." },
      { property: "og:title", content: 'Book an Appointment | Trinova Wellness Centre' },
      { property: "og:description", content: "Request an appointment at Trinova Wellness Centre in Brampton. We'll match you with the right practitioner." },
    ],
  }),
  component: Page,
});

function Page() {
  const go = useSiteNav();
  const search = Route.useSearch();
  return <BookPage initialCategory={search.category} initialPractitioner={search.practitioner} initialConcern={search.concern} onNavigateHome={() => go('/')} onNavigateToPortal={() => go('/portal')} />;
}
