import { createFileRoute } from "@tanstack/react-router";
import { BalanceProgramPage } from "@/site/pages/BalanceProgramPage";
import { useSiteNav } from "@/site/nav";

export const Route = createFileRoute("/programs/balance")({
  head: () => ({
    meta: [
      { title: 'The Balance Program: Gut Reset | Trinova' },
      { name: "description", content: "A guided 12-week gut health reset program with Trinova's integrative care team." },
      { property: "og:title", content: 'The Balance Program: Gut Reset | Trinova' },
      { property: "og:description", content: "A guided 12-week gut health reset program with Trinova's integrative care team." },
    ],
  }),
  component: Page,
});

function Page() {
  const go = useSiteNav();

  return <BalanceProgramPage onNavigateToBook={(c) => go('/book', { category: c })} />;
}
