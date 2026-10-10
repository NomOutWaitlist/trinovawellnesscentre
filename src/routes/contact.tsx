import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/site/pages/ContactPage";
import { useSiteNav } from "@/site/nav";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: 'Contact Us | Trinova Wellness Centre' },
      { name: "description", content: 'Get in touch with Trinova Wellness Centre at 178 John St, Brampton. Hours, directions and inquiries.' },
      { property: "og:title", content: 'Contact Us | Trinova Wellness Centre' },
      { property: "og:description", content: 'Get in touch with Trinova Wellness Centre at 178 John St, Brampton. Hours, directions and inquiries.' },
    ],
  }),
  component: Page,
});

function Page() {
  const go = useSiteNav();

  return <ContactPage onNavigateToBook={() => go('/book')} />;
}
