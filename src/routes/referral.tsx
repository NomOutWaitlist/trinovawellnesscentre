import { pageHead } from '@/lib/seo';
import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { ReferralPage } from "@/site/pages/ReferralPage";
import { useSiteNav } from "@/site/nav";

export const Route = createFileRoute("/referral")({
  head: () => pageHead('/referral'),
  component: Page,
});

function Page() {
  const go = useSiteNav();

  return <ClientOnly><ReferralPage /></ClientOnly>;
}
