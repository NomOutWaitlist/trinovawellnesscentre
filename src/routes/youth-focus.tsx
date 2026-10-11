import { createFileRoute } from "@tanstack/react-router";
import { YouthFocusPage } from "@/site/pages/YouthFocusPage";
import { useSiteNav } from "@/site/nav";

const title = "Youth & Teen Focus Program | Screen Time & Attention Help in Brampton";
const description =
  "Is scrolling and short-form video affecting your child's focus, sleep or mood? Drug-free BrainCore neurofeedback and teen counselling at Trinova Wellness Centre, Brampton.";

export const Route = createFileRoute("/youth-focus")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const go = useSiteNav();
  return <YouthFocusPage onNavigate={(p) => go(p)} />;
}
