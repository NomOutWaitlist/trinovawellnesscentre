import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { clinicSchema, pageHead, PUBLIC_PAGES, serviceHead } from '@/lib/seo';
import { BASE_SERVICES } from '@/site/data/services';

describe('Search identity and indexing rules', () => {
  it('uses the confirmed primary domain on every public page', () => {
    for (const path of Object.keys(PUBLIC_PAGES) as (keyof typeof PUBLIC_PAGES)[]) {
      const head = pageHead(path);
      expect(head.links).toEqual([{ rel: 'canonical', href: `https://trinovacentre.com${path}` }]);
      expect(head.meta.find(item => 'property' in item && item.property === 'og:url')?.content).toBe(`https://trinovacentre.com${path}`);
    }
  });
  it('connects each real service to its individual canonical page', () => {
    for (const service of BASE_SERVICES) {
      const head = serviceHead(service);
      const graph = JSON.parse(head.scripts[0].children)['@graph'];
      const node = graph.find((item: Record<string, unknown>) => item['@type'] === 'Service');
      expect(node.url).toBe(`https://trinovacentre.com/services/${service.id}`);
      expect(node.provider).toEqual({ '@id': 'https://trinovacentre.com/#clinic' });
    }
  });
  it('uses published clinic hours without inventing Sunday hours', () => {
    expect(clinicSchema()['openingHoursSpecification']).toEqual([
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:30', closes: '19:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '16:00' },
    ]);
  });
  it('includes youth focus and every service while excluding private tools', () => {
    const xml = readFileSync('public/sitemap.xml', 'utf8');
    expect(xml).toContain('<loc>https://trinovacentre.com/youth-focus</loc>');
    for (const service of BASE_SERVICES) expect(xml).toContain(`<loc>https://trinovacentre.com/services/${service.id}</loc>`);
    expect(xml).not.toMatch(/<loc>[^<]*\/(staff|portal)/);
  });
  it('blocks private tools for every existing crawler group', () => {
    const robots = readFileSync('public/robots.txt', 'utf8');
    const groups = robots.split(/\n\s*\n/).filter(group => group.startsWith('User-agent:'));
    expect(groups).toHaveLength(5);
    for (const group of groups) {
      expect(group).toContain('Disallow: /staff');
      expect(group).toContain('Disallow: /portal');
    }
  });
});