import type { LucideIcon } from 'lucide-react'
import { Bot, Building2, Code2, Workflow } from 'lucide-react'

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
}

export const products: Product[] = [
  {
    slug: 'unlivo',
    name: 'UNLIVO',
    category: 'Real Estate Technology',
    tagline: 'Property discovery built around what buyers actually need.',
    description:
      'UNLIVO brings property seekers and property providers together through requirement-led discovery and property matching.',
    audience: 'Property buyers, sellers and real-estate brokers',
    status: 'available',
    href: 'https://unlivo.com',
    ctaLabel: 'Explore UNLIVO',
    icon: Building2,
    highlights: [
      'Buyer-first property requirements',
      'Property matching and match inbox',
      'Tools for sellers and approved brokers',
    ],
    overview:
      'Instead of making buyers sift through endless listings, UNLIVO starts with the buyer’s requirement and helps surface properties that may be a match. The platform also gives property owners and brokers tools to participate in the process.',
  },
  {
    slug: 'affilixwp',
    name: 'AffilixWP',
    category: 'WordPress Plugin',
    tagline: 'Affiliate management and commission tracking for WordPress.',
    description:
      'AffilixWP helps WordPress businesses manage affiliate relationships and track commissions from their own website.',
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
    overview:
      'AffilixWP is a WordPress-focused affiliate management plugin designed to help businesses operate their affiliate programmes from within their own WordPress environment.',
  },
  {
    slug: 'docs-ai',
    name: 'Docs AI',
    category: 'Developer Tool',
    tagline: 'Turn code into clear, useful documentation.',
    description:
      'Docs AI generates documentation for code across more than 20 programming languages, helping developers make projects easier to understand and maintain.',
    audience: 'Software developers, engineering teams and technical project owners',
    status: 'available',
    href: 'https://aidocs.beveeztech.com',
    ctaLabel: 'Try Docs AI',
    icon: Code2,
    highlights: [
      'Code documentation generation',
      'Support for 20+ programming languages',
      'Designed for developer documentation workflows',
    ],
    overview:
      'Docs AI is built for one focused job: helping developers turn source code into documentation. It supports more than 20 coding languages, making it useful across a range of software projects and technology stacks.',
  },
  {
    slug: 'beveez-ai',
    name: 'Beveez AI',
    category: 'Business AI & Automation',
    tagline: 'Practical AI assistants and automations for growing businesses.',
    description:
      'Beveez AI is an upcoming platform for businesses that want to make useful knowledge and routine workflows easier to access through AI.',
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
    overview:
      'Beveez AI is in development. The planned direction is a practical, business-focused AI assistant and automation platform. Capabilities and availability will be confirmed as the product takes shape.',
  },
]
