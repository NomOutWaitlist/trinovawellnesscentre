import { pageHead } from '@/lib/seo';
import { createFileRoute } from "@tanstack/react-router";
import { BalanceProgramPage } from "@/site/pages/BalanceProgramPage";
import { useSiteNav } from "@/site/nav";

export const Route = createFileRoute("/programs/balance")({
  head: () => pageHead('/programs/balance'),
  component: Page,
});

function Page() {
  const go = useSiteNav();

  return <BalanceProgramPage onNavigateToBook={(c) => go('/book', { category: c })} />;
}
