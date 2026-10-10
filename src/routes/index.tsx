import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/site/pages/HomePage";
import { useSiteNav } from "@/site/nav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: 'Trinova Wellness Centre | Chiropractic, Neurofeedback & Therapy in Brampton' },
      { name: "description", content: 'Whole-person healthcare in Brampton serving Mississauga & Peel Region: chiropractic, BrainCore neurofeedback, RMT, psychotherapy and gut reset.' },
      { property: "og:title", content: 'Trinova Wellness Centre | Chiropractic, Neurofeedback & Therapy in Brampton' },
      { property: "og:description", content: 'Whole-person healthcare in Brampton serving Mississauga & Peel Region: chiropractic, BrainCore neurofeedback, RMT, psychotherapy and gut reset.' },
    ],
  }),
  component: Page,
});

function Page() {
  const go = useSiteNav();

  return <HomePage onNavigate={(p) => go(p)} />;
}
