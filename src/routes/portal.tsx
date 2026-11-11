import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { ClinicPortalPage } from "@/site/pages/ClinicPortalPage";
import { useSiteNav } from "@/site/nav";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow, noarchive" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: 'Clinic Portal | Trinova Wellness Centre' },
      { name: "description", content: 'Staff view of appointment requests and referrals at Trinova Wellness Centre.' },
      { property: "og:title", content: 'Clinic Portal | Trinova Wellness Centre' },
      { property: "og:description", content: 'Staff view of appointment requests and referrals at Trinova Wellness Centre.' },
    ],
  }),
  component: Page,
});

function Page() {
  const go = useSiteNav();

  return <ClientOnly><ClinicPortalPage onNavigateToBook={() => go('/book')} /></ClientOnly>;
}
