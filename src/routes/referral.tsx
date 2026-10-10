import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { ReferralPage } from "@/site/pages/ReferralPage";
import { useSiteNav } from "@/site/nav";

export const Route = createFileRoute("/referral")({
  head: () => ({
    meta: [
      { title: 'Refer a Friend | Trinova Wellness Centre' },
      { name: "description", content: 'Refer friends and family to Trinova Wellness Centre and earn referral rewards.' },
      { property: "og:title", content: 'Refer a Friend | Trinova Wellness Centre' },
      { property: "og:description", content: 'Refer friends and family to Trinova Wellness Centre and earn referral rewards.' },
    ],
  }),
  component: Page,
});

function Page() {
  const go = useSiteNav();

  return <ClientOnly><ReferralPage /></ClientOnly>;
}
