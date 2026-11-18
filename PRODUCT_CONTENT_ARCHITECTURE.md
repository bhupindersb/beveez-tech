# Beveez Tech Product Content Architecture

Status: planning specification; no new public claims should be published until the corresponding product behaviour is verified in the live application.

## Positioning

Beveez Tech is the parent technology company behind a portfolio of focused digital products and a client-services practice. Product pages should explain a real user problem, the product workflow, who it serves, what is currently available, and the next step. They must not read like generic agency service pages.

Keep product availability explicit:
- UNLIVO: available.
- AffilixWP: available, but review current release/readme and live feature parity before publishing detailed claims.
- Docs AI: available. Confirmed positioning supplied by the product owner: code documentation generation for 20+ programming languages.
- Beveez AI: in development. Describe only planned direction; do not use "try now" or imply launched capabilities.

## Product audit findings

### UNLIVO

Repository inspected: `bhupindersb/unlivo` (Next.js 15, React 19, Supabase, Mapbox). Public site: https://www.unlivo.com/.

Code-backed workflows found:
- Buyer requirement submission for buy/rent, property category/type, preferred cities/localities, budget, size, bedrooms where relevant, possession/furnishing preferences and notes.
- Property discovery with category, location, purpose and budget filters.
- Requirement matching is currently rules-based: the matching API calls the Supabase `get_buyer_requirement_matches` RPC, applies additional possession/furnishing preference scoring, and returns `matchingMode: "rules"`. Do not describe this as generative-AI matching.
- Property owners/providers can submit property listings; listings pass through review before appearing publicly.
- Broker onboarding includes application and admin approval before broker listing tools are enabled.
- Broker workspace code includes property management, enquiries, site visits, offers and transactions.
- Broker subscription/listing-limit functionality exists in the application; publish commercial details only after checking current live configuration.

Public positioning should focus on requirement-led property discovery and the connected buyer/owner/broker journey. Avoid guarantees that a match will lead to a transaction, or claims that every listing is verified unless the actual verification policy is defined and consistently applied.

Existing guide routes in the Beveez Tech branch:
- `/products/unlivo/property-matching`
- `/products/unlivo/for-buyers`
- `/products/unlivo/for-sellers-and-brokers`

Recommended architecture:
- Keep `/products/unlivo` as the main conversion page.
- Keep and expand `property-matching` as the core differentiator explainer.
- Keep and expand `for-buyers` as a buyer journey page.
- Split the combined provider guide into `for-property-owners` and `for-brokers` only when each has enough distinct workflow detail; retain the old combined URL with an internal link or redirect if it is superseded.
- Add `how-it-works` for the end-to-end journey (requirement → matching → review/contact → visits/offers/transaction).
- Add `property-listing-and-review` to explain provider listing submission and review.
- Add `broker-tools` for enquiries, visits, offers, transactions and broker workspace.
- Add `faq` with buyer, owner and broker questions.
- Do not create a separate thin page for every dashboard feature.

### AffilixWP

Repository inspected: `bhupindersb/affilixwp`. Current main-branch plugin header/version inspected: 0.3.82. The repository README is stale and still labels the plugin an MVP in active development; update it separately before relying on it as public product copy.

Code-backed capabilities found:
- WordPress plugin with custom database tables and a front-end affiliate dashboard shortcode `[affilixwp_dashboard]`.
- Referral-link capture through a `?ref=` parameter, stored in a 30-day cookie, and referral association on WordPress user registration.
- Level 1 and eligible Level 2 referral relationships.
- Commission records linked to purchase references, with duplicate-reference checks. The inspected commission engine currently uses 10% for Level 1 and 5% for Level 2; do not claim these are universally configurable until the current settings and release are checked.
- Affiliate dashboard displays total, pending and paid commissions, referral link and recent commission history.
- Admin-side commission and payout management/export code is present.
- Payout profile, Razorpay API/webhook and Stripe webhook modules are present in the plugin source. Do not claim a payment gateway is enabled or automatic payouts are available without checking the live configuration and supported flow.
- License validation and update functionality are present.

Existing guide routes:
- `/products/affilixwp/referral-tracking`
- `/products/affilixwp/commission-management`
- `/products/affilixwp/affiliate-dashboard`

Recommended architecture:
- Keep `/products/affilixwp` as the main product/conversion page.
- Expand `referral-tracking`, `commission-management` and `affiliate-dashboard` with workflow detail and appropriate caveats.
- Add `features` as an overview/index only if it links to genuinely distinct detail pages.
- Add `getting-started` for install, activation, initial setup and shortcode placement after validating exact steps against the current release.
- Add `payout-management` to explain affiliate payout profiles and administrator review/export workflows; clearly distinguish recorded/approved/paid states from automated disbursement.
- Add `licensing-and-updates` to explain activation, licence validation and update delivery without publishing implementation-sensitive details.
- Add `faq` covering compatibility, referral attribution, levels, commissions, dashboard placement and licensing.
- Do not publish gateway compatibility matrices, configurable rates, WooCommerce integrations or automated payout claims until verified in the current shipped release.

### Docs AI

Product URL: https://aidocs.beveeztech.com. Feature URL supplied by the product owner: https://aidocs.beveeztech.com/features. The feature URL could not be independently fetched during this audit.

Confirmed positioning supplied by the product owner: generate code documentation across 20+ programming languages. The existing Beveez Tech branch's guide content records the current product workflow as pasted code + language selection + documentation type selection, with Full Docs, README, API Reference and Inline Comments options, plus preview/export-oriented output. Reconfirm these details against the live application before treating them as a final feature inventory.

Existing guide routes:
- `/products/docs-ai/documentation-workflow`
- `/products/docs-ai/documentation-types`
- `/products/docs-ai/developer-workflows`

Recommended architecture:
- Keep `/products/docs-ai` as the main conversion page.
- Expand `documentation-workflow` with the actual input → options → generation → review/export flow.
- Expand `documentation-types` with separate examples for README, API reference, inline comments and full documentation.
- Keep `developer-workflows` focused on individual developers, teams and maintaining documentation as code changes.
- Add `supported-languages` only after obtaining the exact supported-language list from the live product.
- Add `use-cases` for code handover, onboarding, legacy code comprehension and project documentation, making clear that generated output should be reviewed.
- Add `faq` for code input, output, supported languages, privacy/data handling and limits—but only answer privacy/retention questions from approved product policy.
- Link to the live feature page and application. Do not claim repository scanning, IDE integrations, automatic sync, team collaboration or API access unless those are actually shipped.

### Beveez AI

Status: in development. No live production product was audited.

Existing guide routes:
- `/products/beveez-ai/ai-assistants`
- `/products/beveez-ai/customer-support`
- `/products/beveez-ai/workflow-automation`

Recommended architecture:
- Keep `/products/beveez-ai` as a roadmap/interest page.
- Retain the three supporting topics only as clearly labelled planned directions, or consolidate them into one `planned-capabilities` page if they remain too thin.
- Use a contact/discovery CTA, not a product trial CTA.
- Do not create feature, pricing, integrations or documentation pages until the product scope and working implementation exist.

## Shared product page template

Each available product overview should include:
1. Product-specific hero, concise promise, availability status and primary CTA.
2. The problem and who experiences it.
3. The product approach and how the workflow works.
4. A feature breakdown tied to shipped functionality.
5. A visual workflow or genuine product screenshots.
6. Who it is for and concrete use cases.
7. Important limitations, review steps or eligibility requirements where relevant.
8. Product-specific FAQs.
9. Related guides and resources.
10. Links to other Beveez Tech products and a final CTA.

Supporting pages should have one clear search intent each, a unique title/description, breadcrumb navigation, links back to the product overview, relevant sibling guides and a contextual CTA. Avoid thin pages and repeated generic copy.

## Shared information architecture

- `/products`: portfolio overview.
- `/products/[product]`: product landing page.
- `/products/[product]/[topic]`: supporting product guide.
- `/industries`: industry/use-case overview, linking to relevant products and services.
- `/blog` (labelled Insights in navigation): editorial content, with product categories/tags and contextual links.

Use the existing dynamic guide route and `productGuides` data structure rather than adding separate bespoke route components for every article. Keep the sitemap limited to complete, useful, indexable pages. Add redirects only when a live URL is intentionally replaced.

## Implementation order

1. Expand the UNLIVO and AffilixWP overview pages and existing guides using verified workflows.
2. Expand Docs AI after checking the live feature list and supported language list.
3. Keep Beveez AI roadmap content concise until launch.
4. Add only the additional pages that have distinct content and search intent.
5. Add contextual cross-links, breadcrumbs, product-specific metadata and sitemap entries.
6. Review desktop/mobile layout, broken links, metadata and the Vercel preview before merge.

## Open verification items

- Confirm UNLIVO live listing-verification wording, broker subscription limits/pricing and the current public matching explanation.
- Confirm AffilixWP current release parity, supported WordPress/PHP versions, supported ecommerce integrations, gateway configuration and payout behaviour.
- Confirm Docs AI exact language list, generation limits, output/download options, privacy/retention policy and any integrations.
- Confirm Beveez AI scope only when a working release is available.
