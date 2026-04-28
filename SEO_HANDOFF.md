# SEO Handoff (Developer Setup)

This repository now includes the technical SEO foundation needed for a static deployment.

## Already implemented

- `sitemap.xml` at project root with bilingual DE/EN URLs and hreflang alternates.
- `robots.txt` at project root with sitemap reference.
- Shared metadata in `src/app/[locale]/layout.tsx`:
  - production `metadataBase` (`https://tat-bau.de`)
  - index/follow robots directives
  - canonical + language alternates (`de`, `en`, `x-default`)
  - Open Graph and Twitter card defaults
  - Organization JSON-LD schema

## What the SEO team can now do

- Define page-level SEO titles and descriptions for each route/language.
- Expand structured data (e.g., LocalBusiness, Product, BreadcrumbList) per page.
- Refine keyword targeting and internal linking.
- Track search performance in Google Search Console.

## Developer note

Any page-specific SEO overrides should be added in route-level metadata functions where needed.
