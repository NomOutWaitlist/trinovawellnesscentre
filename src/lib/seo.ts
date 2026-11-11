import { CLINIC_INFO, PRACTITIONERS } from '@/site/data/clinicData';
import { BASE_SERVICES } from '@/site/data/services';

export const SITE_URL = 'https://trinovacentre.com';
const clinicId = `${SITE_URL}/#clinic`;
const websiteId = `${SITE_URL}/#website`;
type SchemaNode = Record<string, unknown>;

export const PUBLIC_PAGES = {
  '/': { title: 'Trinova Wellness Centre | Chiropractic, Neurofeedback & Therapy in Brampton', description: 'Whole-person healthcare in Brampton serving Mississauga & Peel Region: chiropractic, BrainCore neurofeedback, RMT, psychotherapy and nutrition.', name: 'Home' },
  '/about': { title: 'Our Chiropractors & Therapists in Brampton | Trinova Wellness Centre', description: 'Meet the chiropractors, therapists and practitioners behind Trinova Wellness Centre in Brampton.', name: 'Our Team' },
  '/services': { title: 'Chiropractic, Massage & Psychotherapy in Brampton | Trinova', description: 'Explore chiropractic, BrainCore neurofeedback, massage therapy, psychotherapy, osteopathy and nutrition at Trinova Wellness Centre in Brampton.', name: 'Services' },
  '/areas-served': { title: 'Areas Served: Brampton, Mississauga & Peel | Trinova', description: 'Trinova serves patients from Brampton, Mississauga and across Peel Region with free parking and direct billing.', name: 'Areas Served' },
  '/programs/balance': { title: '12-Week Gut Reset in Brampton | The Balance Program — Trinova', description: "A guided 12-week gut health reset program with Trinova's integrative care team in Brampton, including nutrition consultations and private coaching.", name: 'The Balance Program' },
  '/youth-focus': { title: 'Youth & Teen Focus Program in Brampton | Trinova Wellness Centre', description: "Support for your child's focus, sleep and screen habits through BrainCore neurofeedback and teen counselling at Trinova Wellness Centre in Brampton.", name: 'Youth & Teen Focus' },
  '/contact': { title: 'Contact & Directions in Brampton | Trinova Wellness Centre', description: 'Contact Trinova Wellness Centre at Unit 204, 178 John Street, Brampton. Find clinic hours, phone numbers, parking and directions.', name: 'Contact' },
  '/book': { title: 'Book an Appointment in Brampton | Trinova Wellness Centre', description: "Request an appointment at Trinova Wellness Centre in Brampton. We'll match you with the right practitioner.", name: 'Book an Appointment' },
  '/referral': { title: 'Refer a Friend | Trinova Wellness Centre', description: 'Refer friends and family to Trinova Wellness Centre and learn about referral rewards.', name: 'Refer a Friend' },
} as const;
export type PublicPagePath = keyof typeof PUBLIC_PAGES;

export function clinicSchema(): SchemaNode {
  return {
    '@type': ['MedicalClinic', 'LocalBusiness', 'Organization'], '@id': clinicId,
    name: CLINIC_INFO.name, legalName: CLINIC_INFO.legalName,
    url: `${SITE_URL}/`, logo: `${SITE_URL}/trinova-logo.webp`,
    telephone: '+19054957748', email: CLINIC_INFO.emails,
    address: { '@type': 'PostalAddress', streetAddress: CLINIC_INFO.address,
      addressLocality: CLINIC_INFO.city, addressRegion: 'ON', postalCode: CLINIC_INFO.postalCode, addressCountry: 'CA' },
    areaServed: ['Brampton', 'Mississauga', 'Caledon', 'Bolton', 'Vaughan', 'Woodbridge', 'Georgetown', 'Halton Hills'].map(name => ({ '@type': 'Place', name })),
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:30', closes: '19:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '16:00' },
    ],
    hasMap: 'https://maps.google.com/?q=178+John+Street+Unit+204+Brampton+ON+L6W2Z1',
  };
}

export function serviceSchema(service: (typeof BASE_SERVICES)[number]): SchemaNode {
  const url = `${SITE_URL}/services/${service.id}`;
  return {
    '@type': 'Service', '@id': `${url}#service`, name: service.title,
    url, serviceType: service.category, description: service.whatItIs,
    provider: { '@id': clinicId }, areaServed: { '@type': 'Place', name: 'Brampton, Ontario' },
    availableChannel: [{ '@type': 'ServiceChannel', serviceLocation: { '@id': clinicId }, serviceUrl: `${SITE_URL}/book` }],
  };
}

function graphHead(path: string, title: string, description: string, name: string, extra: SchemaNode[] = [], pageType = 'WebPage', image?: string) {
  const url = `${SITE_URL}${path}`;
  const breadcrumbId = `${url}#breadcrumb`;
  const crumbs = path === '/' ? [] : [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    ...(path.startsWith('/services/') ? [{ '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` }] : []),
    { '@type': 'ListItem', position: path.startsWith('/services/') ? 3 : 2, name, item: url },
  ];
  const graph: SchemaNode[] = [
    clinicSchema(),
    { '@type': 'WebSite', '@id': websiteId, url: `${SITE_URL}/`, name: CLINIC_INFO.name, publisher: { '@id': clinicId }, inLanguage: 'en-CA' },
    { '@type': pageType, '@id': `${url}#webpage`, url, name: title, description,
      isPartOf: { '@id': websiteId }, about: { '@id': clinicId }, publisher: { '@id': clinicId }, inLanguage: 'en-CA',
      ...(crumbs.length ? { breadcrumb: { '@id': breadcrumbId } } : {}),
      ...(extra.length ? { mainEntity: extra.map(node => ({ '@id': node['@id'] })) } : {}),
    },
    ...(crumbs.length ? [{ '@type': 'BreadcrumbList', '@id': breadcrumbId, itemListElement: crumbs }] : []),
    ...extra,
  ];
  return {
    meta: [
      { title }, { name: 'description', content: description },
      { property: 'og:title', content: title }, { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' }, { property: 'og:url', content: url },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title }, { name: 'twitter:description', content: description },
      ...(image ? [{ property: 'og:image', content: image }, { name: 'twitter:image', content: image }] : []),
    ],
    links: [{ rel: 'canonical', href: url }],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c') }],
  };
}

export function pageHead(path: PublicPagePath) {
  const page = PUBLIC_PAGES[path];
  let extra: SchemaNode[] = [];
  if (path === '/about') extra = PRACTITIONERS.map(person => ({
    '@type': 'Person', '@id': `${SITE_URL}/about#${encodeURIComponent(person.id)}`,
    name: person.name, jobTitle: person.role, worksFor: { '@id': clinicId },
    ...(person.imageUrl ? { image: `${SITE_URL}${person.imageUrl}` } : {}),
  }));
  if (path === '/services') extra = BASE_SERVICES.map(serviceSchema);
  if (path === '/programs/balance' || path === '/youth-focus') {
    extra = [{ '@type': 'Service', '@id': `${SITE_URL}${path}#service`, name: page.name, description: page.description, url: `${SITE_URL}${path}`, provider: { '@id': clinicId }, areaServed: { '@type': 'City', name: 'Brampton' } }];
  }
  return graphHead(path, page.title, page.description, page.name, extra,
    path === '/about' ? 'AboutPage' : path === '/contact' ? 'ContactPage' : path === '/services' ? 'CollectionPage' : 'WebPage',
    path === '/about' ? `${SITE_URL}/images/team/jennifer-share.jpg` : undefined);
}

export function serviceHead(service: (typeof BASE_SERVICES)[number]) {
  return graphHead(`/services/${service.id}`, `${service.title} in Brampton | Trinova`, service.whatItIs, service.title, [serviceSchema(service)]);
}