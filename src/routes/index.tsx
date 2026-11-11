import { pageHead } from '@/lib/seo';
import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/site/pages/HomePage";
import { useSiteNav } from "@/site/nav";

export const Route = createFileRoute("/")({
  head: () => pageHead('/'),
  component: Page,
});

function Page() {
  const go = useSiteNav();

  return <HomePage onNavigate={(p) => go(p)} />;
}
