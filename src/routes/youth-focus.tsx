import { pageHead } from '@/lib/seo';
import { createFileRoute } from "@tanstack/react-router";
import { YouthFocusPage } from "@/site/pages/YouthFocusPage";
import { useSiteNav } from "@/site/nav";

const title = "Youth & Teen Focus Program | Screen Time & Attention Help in Brampton";
const description =
  "Is scrolling and short-form video affecting your child's focus, sleep or mood? Drug-free BrainCore neurofeedback and teen counselling at Trinova Wellness Centre, Brampton.";

export const Route = createFileRoute("/youth-focus")({
  head: () => pageHead('/youth-focus'),
  component: Page,
});

function Page() {
  const go = useSiteNav();
  return <YouthFocusPage onNavigate={(p) => go(p)} />;
}
