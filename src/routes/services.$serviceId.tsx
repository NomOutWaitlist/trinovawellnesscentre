import { createFileRoute, notFound } from '@tanstack/react-router';
import { BASE_SERVICES } from '@/site/data/services';
import { serviceHead } from '@/lib/seo';
import { ServiceDetailPage } from '@/site/pages/ServiceDetailPage';

export const Route = createFileRoute('/services/$serviceId')({
  loader: ({ params }) => {
    const service = BASE_SERVICES.find(item => item.id === params.serviceId);
    if (!service) throw notFound();
    return service;
  },
  head: ({ loaderData }) => loaderData ? serviceHead(loaderData) : {
    meta: [{ title: 'Service unavailable | Trinova Wellness Centre' }, { name: 'robots', content: 'noindex' }],
  },
  component: Page,
});

function Page() {
  return <ServiceDetailPage service={Route.useLoaderData()} />;
}