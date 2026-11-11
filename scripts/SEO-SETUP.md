# Trinova search setup

## Implemented in the website
- Canonical URLs, Open Graph and Twitter text metadata on every public page, using the confirmed primary origin https://trinovacentre.com.
- Linked MedicalClinic / LocalBusiness / Organization, WebSite, WebPage (including AboutPage, ContactPage and CollectionPage), BreadcrumbList, Person and Service graphs. The clinic name, address, contact information and regular hours come from displayed clinic information.
- Eleven service detail pages use the same catalog as the services directory, with crawlable service links, location, practitioner, appointment information and booking links.
- Youth Focus and all service pages are included in the existing sitemap; private staff/portal pages are excluded and marked noindex. All existing crawler groups are preserved and block private tools.
- Team and homepage photos have reserved dimensions; below-the-fold photos are lazy-loaded. About uses the displayed founder photo in a 1200×630 compressed sharing rendition.
- Google Search Console ownership tag is in the root head for the connected account. Ownership verification is NOT complete until Google can read this exact tag on trinovacentre.com.

## Highest priority: publish to the primary site
Deploy these changes to the Vercel project serving trinovacentre.com. A Lovable publish does not update that separate Vercel deployment. Check the live root HTML for the Google verification tag before verifying ownership.

Then verify https://trinovacentre.com/ in the connected Google Search Console account, add the verified property, and submit https://trinovacentre.com/sitemap.xml. This URL-prefix property covers every page on this HTTPS hostname. DNS verification is optional if broader protocol/subdomain coverage is wanted.

Validate representative pages with https://validator.schema.org/ and https://search.google.com/test/rich-results. Schema validity does not guarantee Google rich-result eligibility or higher rankings. Next, inspect important URLs in Search Console and monitor impressions, clicks, indexing, and conversions over time.

## Remaining owner-account tasks
1. Google Business Profile: confirm ownership, select the category best matching the actual primary practice (not profit margin), add appropriate secondary categories and the actual service menu. Match name/address/phone to the website. Use https://trinovacentre.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp for the website link if analytics will be enabled.
2. Bing Webmaster Tools: verify the primary site and submit the same sitemap; import verified Search Console settings where supported.
3. Verify the clinic's Apple Business Connect, Bing Places, Lumino Health, relevant college-directory and other legitimate local listings. Never create fabricated reviews or duplicate listings; get permission before publishing practitioners' registration numbers.
4. Review medical claims and practitioner credentials with the clinic's licensed clinicians. Publish evidence-backed educational content with real author/reviewer biographies and genuine revision dates before adding Article markup.
5. Measure mobile performance with PageSpeed Insights after deployment. Image dimensions/lazy loading are improvements, not proof that Core Web Vitals pass.

## Analytics
Google Analytics was skipped during connection, so no GA4 tracking was activated. To enable it, connect Google Analytics using Browser Tracking (Measurement ID) and provide the ID. For Vercel, add the returned public VITE measurement-ID variable and redeploy. Define privacy/consent requirements before loading tracking, disable automatic form/outbound event collection on health-related pages, and never transmit names, phone numbers, email addresses, symptoms, booking query strings, form contents, or health-related page titles/URLs. Track only consented generic milestones such as phone clicks, first-step completion, and appointment-request submission. A submitted request is not a confirmed appointment or confirmed care outcome.

## Intentionally omitted
- FAQPage: not added as an SEO enhancement; Google FAQ rich results are restricted and matching questions alone is not a reason to add it.
- Product / Offer: care services are modeled as Service, not merchandise; no invented price, SKU, stock availability, or $3,300 offer.
- Article: there is no actual article page with verified authorship/publication data.
- AggregateRating / Review: no third-party review totals or self-serving clinic review stars fabricated.
- Geo meta coordinates: previous proposed coordinates were not verified; legacy geo meta tags are not a Google ranking lever.
- SearchAction: the website has no real internal search endpoint.
- Sitemap lastmod: existing dates are preserved because their source cannot be established; no dates were added to new entries, and no current/build-time date is used. Replace old values only when their source is confirmed as a fallback or an authoritative per-page content-change date is available.

No ranking guarantees, invented statistics or automatic directory submissions are part of this implementation.