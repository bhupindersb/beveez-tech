export type ProductGuide = {
  slug: string
  title: string
  eyebrow: string
  intro: string
  sections: { heading: string; body: string; bullets?: string[] }[]
}

export const productGuides: Record<string, ProductGuide[]> = {
  unlivo: [
    {
      slug: 'property-matching',
      title: 'Property discovery that starts with the requirement',
      eyebrow: 'How UNLIVO approaches property matching',
      intro: 'Traditional property search often asks buyers to browse listing after listing. UNLIVO also gives buyers a way to describe what they need so relevant available properties can be surfaced against those preferences.',
      sections: [
        { heading: 'Start with what matters to you', body: 'A buyer can describe the purpose, property category and type, preferred cities and localities, budget and size range. Residential requirements can include bedroom preferences, while other categories have their own property-type choices.' },
        { heading: 'Keep the requirement specific', body: 'More useful preferences help make the search more focused. Buyers can include possession and furnishing preferences where relevant, along with additional notes.' },
        { heading: 'Explore available properties too', body: 'Requirement-led discovery complements property browsing. Buyers can also explore published properties and refine their search by purpose, category, location and budget.' },
      ],
    },
    {
      slug: 'for-buyers',
      title: 'A more focused property journey for buyers',
      eyebrow: 'UNLIVO for buyers',
      intro: 'When you know the kind of property you want but do not want to spend your time searching through unrelated listings, a structured requirement can make the process more focused.',
      sections: [
        { heading: 'Describe your property needs', body: 'Choose whether you want to buy or rent, select the property category and type, and add your preferred cities and localities.' },
        { heading: 'Set your budget and size preferences', body: 'Add a budget range and the size you are looking for. Depending on the category, you can also provide bedroom, possession and furnishing preferences.' },
        { heading: 'Review your next steps', body: 'After posting, you can review your active requirements and relevant matches from your account. You can also continue browsing published properties.' },
      ],
    },
    {
      slug: 'for-sellers-and-brokers',
      title: 'A clearer way to participate in property discovery',
      eyebrow: 'UNLIVO for property providers',
      intro: 'Property owners and brokers are part of the UNLIVO marketplace. The platform is designed to connect property supply with buyer demand rather than treating listings as the only starting point.',
      sections: [
        { heading: 'Make property information discoverable', body: 'Published property listings can be explored by buyers using location, purpose, category and budget filters.' },
        { heading: 'Connect supply with buyer demand', body: 'The requirement-led model is intended to help surface properties that may fit what buyers have described. A match is a starting point for review, not a guarantee of a transaction.' },
        { heading: 'Use the right account journey', body: 'UNLIVO has distinct experiences for buyers, sellers and brokers. Account permissions and approval requirements apply to some provider workflows.' },
      ],
    },
  ],
  affilixwp: [
    {
      slug: 'referral-tracking',
      title: 'Understand the referral journey',
      eyebrow: 'AffilixWP referral tracking',
      intro: 'AffilixWP includes referral-link capture and registration tracking so a WordPress business can associate a new user with the affiliate who referred them.',
      sections: [
        { heading: 'Capture a referral visit', body: 'The plugin reads a referral code from the incoming URL and stores it in a browser cookie for the referral attribution window implemented in the plugin.' },
        { heading: 'Associate the registration', body: 'When a new WordPress user registers, the plugin checks the referral code against an active affiliate and records the referral relationship, while preventing self-referrals and duplicate first-level records.' },
        { heading: 'Support a two-level structure', body: 'The current referral tracker can also record an eligible parent referral relationship, creating a second level where one exists.' },
      ],
    },
    {
      slug: 'commission-management',
      title: 'Commission tracking built around referral activity',
      eyebrow: 'AffilixWP commission management',
      intro: 'AffilixWP includes a commission engine that records commission entries against a purchase reference and the referral relationships associated with the buyer.',
      sections: [
        { heading: 'Record purchase references', body: 'The commission recorder checks the purchase reference before inserting records, helping prevent the same reference from being recorded more than once.' },
        { heading: 'Support referral levels', body: 'The current engine calculates commission entries for the referral levels it finds and stores them with the purchase amount, affiliate, level and status.' },
        { heading: 'Review and administer commissions', body: 'The plugin includes commission reporting and administrative export workflows. Exact rates, payout rules and payment availability should be confirmed against the installed configuration before a business launches its programme.' },
      ],
    },
    {
      slug: 'affiliate-dashboard',
      title: 'An affiliate area within your WordPress site',
      eyebrow: 'AffilixWP affiliate dashboard',
      intro: 'AffilixWP provides a front-end affiliate dashboard through a WordPress shortcode, allowing logged-in users to access the affiliate area on the site.',
      sections: [
        { heading: 'Keep the experience on your website', body: 'The affiliate dashboard is rendered through a WordPress shortcode, so site owners can place the experience within a WordPress page.' },
        { heading: 'Connect the dashboard to affiliate workflows', body: 'The plugin code includes affiliate records, referral tracking, commission data and payout-profile components that support the broader affiliate workflow.' },
        { heading: 'Check your configuration', body: 'Available actions and payment options depend on the plugin version and the site administrator’s configuration. Review the current product documentation and settings before enabling a programme.' },
      ],
    },
  ],
  'docs-ai': [
    {
      slug: 'documentation-workflow',
      title: 'From source code to useful documentation',
      eyebrow: 'How Docs AI works',
      intro: 'Docs AI is designed to help developers turn source code into documentation. The product interface presents a workflow built around supplying code, choosing a documentation type and reviewing the generated result.',
      sections: [
        { heading: 'Provide the code', body: 'The current interface accepts pasted code and a selected programming language. The workflow is focused on code input rather than asking users to write the documentation themselves.' },
        { heading: 'Choose the documentation format', body: 'The interface offers Full Docs, README, API Reference and Inline Comments as documentation-type choices.' },
        { heading: 'Review and use the result', body: 'The product includes a document preview and export-oriented workflow. Check the live application for the currently enabled download and integration options.' },
      ],
    },
    {
      slug: 'documentation-types',
      title: 'Choose the documentation your project needs',
      eyebrow: 'Docs AI documentation formats',
      intro: 'Different projects need different documentation. Docs AI presents several documentation formats to help developers focus on the output that is most useful for their work.',
      sections: [
        { heading: 'README', body: 'A project introduction can explain what the codebase is for and help readers understand how to get started.' },
        { heading: 'API reference', body: 'An API reference focuses on functions, parameters, return values and usage examples so developers can understand how code is intended to be called.' },
        { heading: 'Inline comments', body: 'Inline documentation adds explanations alongside code, helping make functions, parameters and complex logic easier to follow.' },
        { heading: 'Full documentation', body: 'The Full Docs option combines the README, API and inline documentation choices in one workflow.' },
      ],
    },
    {
      slug: 'developer-workflows',
      title: 'Documentation as part of a developer workflow',
      eyebrow: 'Docs AI for developers',
      intro: 'Documentation is easier to maintain when it is considered alongside the code being written and changed. Docs AI is positioned around making the first documentation draft less manual.',
      sections: [
        { heading: 'For individual developers', body: 'Generate a starting point for a project README, API reference or inline explanations without beginning with a blank document.' },
        { heading: 'For teams', body: 'Consistent documentation can help teammates understand project structure, interfaces and implementation details. Review generated output before treating it as authoritative.' },
        { heading: 'For evolving codebases', body: 'Use generated documentation as a draft that can be reviewed and updated as code changes. Human review remains important for correctness and context.' },
      ],
    },
  ],
  'beveez-ai': [
    {
      slug: 'ai-assistants',
      title: 'Business-specific AI assistants',
      eyebrow: 'Planned Beveez AI direction',
      intro: 'Beveez AI is in development. One area being explored is business-specific assistants that can help people find information and navigate common customer or internal questions.',
      sections: [
        { heading: 'Designed around business knowledge', body: 'The intended direction is to ground assistant responses in information supplied or approved by the business, rather than presenting a generic chatbot as a source of truth.' },
        { heading: 'A useful customer experience', body: 'Potential use cases include helping visitors understand services, find relevant information and identify the next step.' },
        { heading: 'Development status', body: 'These are planned concepts, not a statement that the capabilities are currently available. Product scope and availability will be confirmed before launch.' },
      ],
    },
    {
      slug: 'customer-support',
      title: 'AI-assisted customer support',
      eyebrow: 'Planned Beveez AI direction',
      intro: 'Beveez AI is exploring ways to help businesses respond to recurring customer questions using business-approved information.',
      sections: [
        { heading: 'Make useful information easier to find', body: 'A future assistant could help visitors navigate answers drawn from a business knowledge base.' },
        { heading: 'Keep people in control', body: 'Escalation to a human team member is an important consideration for questions that need judgement, account access or personal attention.' },
        { heading: 'Development status', body: 'Customer-support functionality is part of the planned direction and is not being represented as a launched feature.' },
      ],
    },
    {
      slug: 'workflow-automation',
      title: 'Practical workflow automation',
      eyebrow: 'Planned Beveez AI direction',
      intro: 'The planned Beveez AI direction includes exploring how AI assistants could help businesses connect conversations with routine follow-up workflows.',
      sections: [
        { heading: 'Reduce repetitive hand-offs', body: 'Potential workflows include capturing enquiries, collecting relevant context and notifying the appropriate team.' },
        { heading: 'Fit the way a business operates', body: 'Useful automation should reflect the business’s existing process, permissions and approval points.' },
        { heading: 'Development status', body: 'These concepts remain under development. Specific integrations, automation triggers and availability have not yet been finalised.' },
      ],
    },
  ],
}
