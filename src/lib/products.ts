import type { LucideIcon } from 'lucide-react'
import { Bot, Building2, Code2, Workflow } from 'lucide-react'

export type ProductSection = {
  heading: string
  body: string
  bullets?: string[]
}

export type Product = {
  slug: string
  name: string
  category: string
  tagline: string
  description: string
  audience: string
  status: 'available' | 'coming-soon'
  href: string
  ctaLabel: string
  icon: LucideIcon
  highlights: string[]
  overview: string
  contentSections: ProductSection[]
  workflow: string[]
  useCases: string[]
  faqs: { question: string; answer: string }[]
}

export const products: Product[] = [
  {
    slug: 'unlivo',
    name: 'UNLIVO',
    category: 'Real Estate Technology',
    tagline: 'Property discovery built around what buyers actually need.',
    description: 'UNLIVO brings property seekers and property providers together through requirement-led discovery and property matching.',
    audience: 'Property buyers, property owners and real-estate brokers',
    status: 'available',
    href: 'https://unlivo.com',
    ctaLabel: 'Explore UNLIVO',
    icon: Building2,
    highlights: [
      'Buyer-first property requirements',
      'Property matching and match inbox',
      'Tools for sellers and approved brokers',
    ],
    overview: 'Instead of making buyers sift through endless listings, UNLIVO starts with the buyer’s requirement and helps surface properties that may be a match. The platform also gives property owners and brokers tools to participate in the process.',
    contentSections: [
      {
        heading: 'Property search should start with the buyer',
        body: 'A broad property search can leave buyers comparing listings that do not fit their budget, preferred location or intended use. UNLIVO adds a requirement-led route: buyers describe what they need, then review available properties that appear relevant to those preferences.',
        bullets: ['Choose whether you want to buy or rent.', 'Specify property category, type and preferred locations.', 'Add budget, size and relevant property preferences.'],
      },
      {
        heading: 'Bring property supply and buyer demand closer',
        body: 'UNLIVO combines structured buyer requirements with property information submitted by owners and brokers. Its matching workflow helps surface potential matches for people to review, while conventional property browsing remains available as another discovery route.',
      },
      {
        heading: 'A connected journey for buyers and providers',
        body: 'The platform supports more than discovery. Buyers can review requirements and potential matches, property owners can submit listings for review, and approved brokers can use workspace tools for property management, enquiries, visits, offers and transaction progress.',
      },
      {
        heading: 'Matching is a starting point, not a guarantee',
        body: 'A surfaced match means the available property information appears relevant to a buyer’s stated preferences. Buyers should confirm availability, inspect the property and independently verify ownership, terms and other important details before making a decision.',
      },
    ],
    workflow: [
      'A buyer records the property type, purpose, preferred location, budget, size and relevant preferences.',
      'UNLIVO evaluates available property information against the requirement and surfaces potential matches.',
      'The buyer reviews property details and contacts the relevant owner or broker.',
      'The parties can discuss the property and arrange a visit; broker workspace tools support follow-up activity.',
      'Where the parties choose to proceed, offers and transaction-related workflows can help organise the next steps.',
    ],
    useCases: [
      'A family looking for a home in selected neighbourhoods and within a defined budget.',
      'A tenant who wants to specify rental preferences before reviewing suitable options.',
      'A property owner who wants to submit a listing for discovery by relevant seekers.',
      'A broker who wants to manage property information, enquiries, visits and offer-related follow-up.',
    ],
    faqs: [
      { question: 'Is UNLIVO only a property-listing portal?', answer: 'No. Buyers can browse published properties and submit a structured requirement so relevant available properties can be surfaced against their preferences.' },
      { question: 'Does a match guarantee that a property is suitable?', answer: 'No. A match is a discovery aid based on available property information. Buyers should verify details, availability, ownership, condition and terms independently.' },
      { question: 'Can property owners list their properties?', answer: 'Yes. Property owners can submit property information through the provider journey. Submitted listings may be reviewed before publication.' },
      { question: 'How do brokers get access?', answer: 'Brokers apply through the platform. Access to broker tools is enabled after the application has been reviewed and approved.' },
    ],
  },
  {
    slug: 'affilixwp',
    name: 'AffilixWP',
    category: 'WordPress Plugin',
    tagline: 'Affiliate management and commission tracking for WordPress.',
    description: 'AffilixWP helps WordPress businesses manage affiliate relationships and track commissions from their own website.',
    audience: 'WordPress store owners, membership businesses and digital product creators',
    status: 'available',
    href: 'https://affilixwp.beveez.tech',
    ctaLabel: 'Explore AffilixWP',
    icon: Workflow,
    highlights: [
      'Affiliate and referral management',
      'Commission tracking workflows',
      'A WordPress-native product experience',
    ],
    overview: 'AffilixWP is a WordPress-focused affiliate management plugin designed to help businesses operate their affiliate programmes from within their own WordPress environment.',
    contentSections: [
      {
        heading: 'Run your affiliate programme from WordPress',
        body: 'AffilixWP is built for businesses that want affiliate management to sit alongside their existing WordPress website. The plugin brings referral relationships, commission records and an affiliate-facing dashboard into the site’s own environment.',
      },
      {
        heading: 'Give referrals a trackable path',
        body: 'Affiliates can share referral links. The plugin captures referral codes and associates eligible registrations with the referring affiliate, using the attribution behaviour implemented in the plugin.',
        bullets: ['Referral-link capture from a referral URL parameter.', 'A 30-day browser-cookie attribution window in the inspected implementation.', 'Support for eligible first-level and second-level referral relationships.'],
      },
      {
        heading: 'Make commission activity easier to review',
        body: 'Commission records are associated with purchase references and referral relationships. The implementation includes duplicate-reference checks, commission status information and administrative review and export workflows.',
      },
      {
        heading: 'Give affiliates a place to see their activity',
        body: 'The front-end dashboard can be embedded in a WordPress page with the [affilixwp_dashboard] shortcode. Its current implementation displays a referral link, commission totals, pending and paid amounts, and recent commission history.',
      },
      {
        heading: 'Razorpay-based payment workflow',
        body: 'AffilixWP uses Razorpay as its payment provider. Commission recording, administrator approval and the actual payment process are distinct steps; the available payment actions depend on the deployed plugin release and the site’s Razorpay configuration. Do not treat a commission status as proof that a transfer has completed.',
      },
      {
        heading: 'Maintain the plugin and its licence',
        body: 'The plugin includes licence validation and update-related functionality. Keep WordPress and the plugin maintained, review release information and test referral and commission workflows after updates.',
      },
    ],
    workflow: [
      'Install and activate AffilixWP on the WordPress website.',
      'Configure affiliate eligibility, referral rules, commission terms and payout procedures.',
      'Publish the affiliate area using the [affilixwp_dashboard] shortcode.',
      'Affiliates share their referral links and eligible registrations are associated with referral records.',
      'Commission records are reviewed by the site administrator and payments are handled through the configured Razorpay process.',
    ],
    useCases: [
      'A digital product business building a referral programme around its own WordPress site.',
      'A membership website that wants to recognise affiliates who introduce new registrants.',
      'A small business that needs an affiliate-facing dashboard for referral links and commission activity.',
      'A programme administrator who wants commission records and payout review workflows in WordPress.',
    ],
    faqs: [
      { question: 'Does AffilixWP work with WordPress?', answer: 'Yes. AffilixWP is a WordPress plugin designed to manage affiliate workflows from a WordPress website.' },
      { question: 'How are referrals tracked?', answer: 'The inspected implementation reads a referral code from a URL parameter and stores it in a browser cookie for a 30-day attribution window.' },
      { question: 'Can affiliates view their commissions?', answer: 'The front-end dashboard includes commission totals, pending and paid amounts, a referral link and recent commission history.' },
      { question: 'Which payment provider does AffilixWP use?', answer: 'AffilixWP uses Razorpay. The payment steps and availability depend on the installed release and the website’s Razorpay configuration.' },
      { question: 'Are affiliate payments automatic?', answer: 'Do not assume a commission status means money has been transferred. The administrator should review commissions and follow the configured Razorpay payment process.' },
    ],
  },
  {
    slug: 'docs-ai',
    name: 'Docs AI',
    category: 'Developer Tool',
    tagline: 'Turn code into clear, useful documentation.',
    description: 'Docs AI generates documentation for code across more than 20 programming languages, helping developers make projects easier to understand and maintain.',
    audience: 'Software developers, engineering teams and technical project owners',
    status: 'available',
    href: 'https://aidocs.beveeztech.com',
    ctaLabel: 'Try Docs AI',
    icon: Code2,
    highlights: [
      'Code documentation generation',
      'Support for 20+ programming languages',
      'Documentation formats for different developer needs',
    ],
    overview: 'Docs AI is built for one focused job: helping developers turn source code into documentation. It supports more than 20 coding languages, making it useful across a range of software projects and technology stacks.',
    contentSections: [
      {
        heading: 'Spend less time starting documentation from scratch',
        body: 'Documentation helps developers understand, maintain and hand over software, but writing it can be postponed when teams are focused on delivery. Docs AI helps create a first documentation draft from supplied code so developers can spend more time reviewing and improving the result.',
      },
      {
        heading: 'Work across more than 20 programming languages',
        body: 'Docs AI is designed to generate code documentation across 20+ programming languages. Select the language that matches the supplied source so the generated explanation has the right context.',
      },
      {
        heading: 'Choose the output that fits the task',
        body: 'The current product content identifies Full Docs, README, API Reference and Inline Comments as documentation formats. These serve different needs, from introducing a project to explaining callable interfaces and code-level intent.',
      },
      {
        heading: 'Review generated documentation before relying on it',
        body: 'Generated documentation is a starting point, not a substitute for engineering review. Check technical details, examples, parameter descriptions and assumptions against the actual source code before sharing or publishing.',
      },
    ],
    workflow: [
      'Provide the source code you want to document.',
      'Select the programming language.',
      'Choose Full Docs, README, API Reference or Inline Comments.',
      'Generate and review the documentation preview.',
      'Refine the result and use the available output options in the application.',
    ],
    useCases: [
      'Creating a first README draft for a software project.',
      'Preparing API explanations for developers who will use or maintain a code module.',
      'Adding explanatory comments to complex or unfamiliar code.',
      'Preparing documentation drafts for code handovers and project onboarding.',
    ],
    faqs: [
      { question: 'What does Docs AI do?', answer: 'Docs AI generates documentation from code across more than 20 programming languages.' },
      { question: 'Which documentation formats are available?', answer: 'The current product content identifies Full Docs, README, API Reference and Inline Comments. Check the live application for the options currently enabled.' },
      { question: 'Can generated documentation be used without review?', answer: 'Generated output should be checked against the source code. Developers remain responsible for confirming technical accuracy and project-specific context.' },
    ],
  },
  {
    slug: 'beveez-ai',
    name: 'Beveez AI',
    category: 'Business AI & Automation',
    tagline: 'Practical AI assistants and automations for growing businesses.',
    description: 'Beveez AI is an upcoming platform for businesses that want to make useful knowledge and routine workflows easier to access through AI.',
    audience: 'Service businesses, professional firms and growing teams',
    status: 'coming-soon',
    href: '/contact',
    ctaLabel: 'Discuss an AI solution',
    icon: Bot,
    highlights: [
      'Business-specific AI assistants',
      'Knowledge-based customer support',
      'Lead handling and workflow automation',
    ],
    overview: 'Beveez AI is in development. The planned direction is a practical, business-focused AI assistant and automation platform. Capabilities and availability will be confirmed as the product takes shape.',
    contentSections: [
      {
        heading: 'AI should help with a real business task',
        body: 'Beveez AI is being explored as a practical set of AI-assisted experiences for businesses—not simply a generic chatbot. The direction is to help teams make approved information easier to access and reduce repetitive enquiry-handling work.',
      },
      {
        heading: 'Business knowledge and customer conversations',
        body: 'Potential applications include assistants grounded in business-provided information, support for recurring customer questions and structured lead enquiries. These are planned areas, not released capabilities.',
      },
      {
        heading: 'Designed around real workflows',
        body: 'Future automation concepts may connect an enquiry with follow-up steps such as collecting context or notifying a team member. Any eventual workflow will need clear permissions, review points and human handover.',
      },
    ],
    workflow: [
      'Understand the business process and information sources.',
      'Identify a focused assistant or workflow use case.',
      'Design and validate the experience with the business.',
      'Confirm integrations, safeguards and launch scope before release.',
    ],
    useCases: [
      'Business knowledge assistants.',
      'Customer-support information journeys.',
      'Lead capture and enquiry qualification.',
      'Routine follow-up and workflow coordination.',
    ],
    faqs: [
      { question: 'Is Beveez AI available now?', answer: 'No. Beveez AI is in development. The topics described here represent planned direction and may change before launch.' },
      { question: 'Can I discuss an AI project?', answer: 'Yes. Contact Beveez Tech to discuss a business use case or explore a possible custom AI solution.' },
    ],
  },
]
