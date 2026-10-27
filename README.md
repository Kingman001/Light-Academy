# Lights Academy school website template

This project includes a configurable public school website and the existing student/staff portal demo. The public website uses `config/school.ts` as its content, identity, theme, contact, feature-flag and route source.

## Customising a school

1. Update `schoolConfig` in `config/school.ts` with school-approved identity, programme, facility, news, FAQ, policy and contact information.
2. Replace the illustrative photography with images the school is authorised to publish. Obtain appropriate consent and safeguarding approval before publishing identifiable children.
3. Configure the theme tokens and feature flags in the same file. Set unused programmes or facilities to an empty list or `enabled: false`.
4. Verify every claim, address, contact method, curriculum, policy and form destination with an authorised school representative. The included sample copy is illustrative; the policy pages are starter templates, not legal advice or a compliance claim.

## Local development and deployment

```sh
npm install
npm run dev
npm run build
npm run preview
```

Set `SITE_URL` to the final HTTPS origin when producing a production build. The Vite build writes a sitemap containing configured programme, news and policy routes and a matching `robots.txt` into `dist/`. Without `SITE_URL` (or a canonical URL in the school config), the build still succeeds and emits a permissive `robots.txt`, but does not publish a sitemap. Configure your static host to serve `dist/` and rewrite public routes to `index.html`; use HTTPS.

Page titles, descriptions, canonical URLs, Open Graph metadata and school structured data are updated by the public-site renderer. Set `identity.canonicalUrl` to the production origin to make canonical links stable across preview hosts.
Student/staff portal bundles load on demand; the public-site visitor does not need to download those portal screens on the first page load.

## Forms and future integrations

`services/publicSiteService.ts` defines the typed enquiry-service boundary. Its default implementation explicitly reports demonstration mode; it does not persist, deliver, or falsely confirm an enquiry, tour, or newsletter subscription. Replace it with a same-origin API adapter when a server endpoint is available. The server must validate and rate-limit input, protect against spam, apply retention rules, and return a truthful delivery result. Never put API credentials in frontend code.

Tour request dates and times are configured in `config/school.ts`. A selected slot is a request only; it is not reserved or confirmed without a scheduling service.

Student insights are intentionally disabled in `services/geminiService.ts`. Connect them only through an authenticated, authorised server integration with approved school information, data minimisation, appropriate consent, and safeguards for children's data. Never send grades or other student records directly from the browser to an AI provider. Payments, portals, SMS/email delivery, and admissions CRM likewise require protected server integrations; do not collect payment-card data on this site.

Before enabling any backend feature, define authentication and role-based authorisation on the server, data access controls, secure transport, retention/deletion, backups, incident response, and an authorised privacy/safeguarding review. Public pages must not expose student records.

The existing student and staff portals in this repository contain demo data and are not production authentication or authorisation systems. Public portal links are disabled by default; do not enable them or connect real school records until protected authentication and authorisation exist.
