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
      eyebrow: 'UNLIVO property matching',
      intro: 'Most property portals begin with listings and ask people to search through them. UNLIVO adds another starting point: describe the property you need, then review available properties that align with those preferences.',
      sections: [
        { heading: 'Start with the property you have in mind', body: 'A buyer can set the purpose (buy or rent), property category and type, preferred cities and localities, budget and size range. Residential requirements can include bedroom preferences, while other categories use their relevant property details.' },
        { heading: 'Add preferences that make the requirement useful', body: 'Where relevant, buyers can add possession and furnishing preferences and include additional notes. Clear requirements give the matching process more context and make it easier to assess whether a property is worth exploring.' },
        { heading: 'Review relevant properties', body: 'UNLIVO compares requirement details with available property information and surfaces potential matches for review. Matching narrows discovery; it does not guarantee availability, suitability after inspection or a transaction.' },
        { heading: 'Keep browsing as well', body: 'Requirement-led discovery complements property search. Buyers can also browse published listings and refine results by purpose, category, location and budget.' },
      ],
    },
    {
      slug: 'for-buyers',
      title: 'A more focused property journey for buyers',
      eyebrow: 'UNLIVO for buyers',
      intro: 'Finding a property can involve comparing locations, budgets, sizes and many other details. UNLIVO gives buyers a structured way to record what they are looking for and review properties that may fit.',
      sections: [
        { heading: 'Describe your property needs', body: 'Choose whether you want to buy or rent, select the property category and type, and add preferred cities and localities. This creates a clearer starting point than a broad, open-ended search.' },
        { heading: 'Set budget and size preferences', body: 'Add the budget range and property size you have in mind. Depending on the property category, you may also provide bedroom, possession and furnishing preferences.' },
        { heading: 'Submit and manage your requirement', body: 'Once submitted, your requirement can be reviewed from your account. Keep the information accurate and update it if your budget, preferred location or needs change.' },
        { heading: 'Review matches and take the next step', body: 'Explore properties surfaced against your requirement, compare details and contact the relevant provider to ask questions or arrange a visit. Confirm availability, ownership, terms and property condition independently.' },
      ],
    },
    {
      slug: 'for-sellers-and-brokers',
      title: 'A clearer way for property providers to participate',
      eyebrow: 'UNLIVO for property providers',
      intro: 'UNLIVO is designed to connect property supply with buyer demand. Owners and brokers can contribute property information so buyers can discover listings and assess potential matches against their requirements.',
      sections: [
        { heading: 'Make property information discoverable', body: 'A useful listing gives prospective buyers the details they need: property type, location, price, size and relevant features. Keep descriptions accurate and add current photographs and details where requested.' },
        { heading: 'Connect supply with buyer demand', body: 'The requirement-led model can surface properties that appear relevant to what buyers have described. A match is an opportunity to review and start a conversation, not a guarantee of buyer interest or a transaction.' },
        { heading: 'Use the right provider journey', body: 'UNLIVO has separate experiences for property owners and brokers. Some broker tools require an application and administrator approval before access is enabled.' },
        { heading: 'Respond and keep details current', body: 'Timely responses and accurate listing information help buyers make informed decisions. Update a listing when its price, availability or other important details change.' },
      ],
    },
    {
      slug: 'how-it-works',
      title: 'How UNLIVO brings property requirements and listings together',
      eyebrow: 'The UNLIVO journey',
      intro: 'UNLIVO connects the buyer requirement journey with property listings and provider workflows. Each participant has a clear role, from describing a need to reviewing a property and arranging the next conversation.',
      sections: [
        { heading: '1. A buyer describes what they need', body: 'The buyer records whether they want to buy or rent, the property category and type, preferred locations, budget, size and relevant preferences.' },
        { heading: '2. Relevant properties are surfaced', body: 'The platform evaluates available property information against requirement details and presents potential matches. Buyers can also continue browsing published listings.' },
        { heading: '3. Providers contribute property information', body: 'Owners and brokers submit property details through the relevant provider journey. Submitted listings may be subject to review before publication.' },
        { heading: '4. People review details and connect', body: 'Buyers compare property information, ask questions and arrange visits with the relevant provider. Brokers have additional workspace tools for managing enquiries and subsequent steps.' },
        { heading: '5. Offers and transactions move forward', body: 'Where parties decide to proceed, broker workflows can support offers and transaction progress. Property decisions remain between the buyer, seller and their appointed professionals.' },
      ],
    },
    {
      slug: 'for-property-owners',
      title: 'A property-owner journey built around useful listing information',
      eyebrow: 'UNLIVO for property owners',
      intro: 'Property owners can use UNLIVO to submit property information for discovery by people looking to buy or rent. Clear, accurate details help prospective buyers assess whether a listing may suit their requirement.',
      sections: [
        { heading: 'Prepare the property details', body: 'Gather the location, property category and type, price expectations, size and relevant features before creating a listing. Include accurate descriptions and current images where requested.' },
        { heading: 'Submit the listing for review', body: 'Complete the listing form and provide the requested information. Submitted properties may go through a review process before becoming publicly discoverable.' },
        { heading: 'Be clear and responsive', body: 'Keep availability and pricing current. Respond to enquiries with the information a prospective buyer needs and arrange property visits directly with interested parties.' },
        { heading: 'Understand the role of matching', body: 'UNLIVO may surface your property to buyers whose stated preferences appear relevant. Matching does not guarantee an enquiry, viewing, offer or sale.' },
      ],
    },
    {
      slug: 'for-brokers',
      title: 'Property discovery and deal workflows for brokers',
      eyebrow: 'UNLIVO for brokers',
      intro: 'UNLIVO provides a broker-focused workspace for participating in property discovery and managing important steps after an enquiry. Broker access is subject to the platform’s application and approval process.',
      sections: [
        { heading: 'Apply for broker access', body: 'Create a broker application and provide the requested details. Broker tools become available after the application has been reviewed and approved by the platform administrator.' },
        { heading: 'Manage property information', body: 'Use the broker workspace to manage property records and participate in the listing and discovery process. Keep listing information accurate and update it when circumstances change.' },
        { heading: 'Handle enquiries and visits', body: 'The broker workflow includes tools for managing enquiries and site visits, helping keep follow-up activity connected to the relevant property and interested party.' },
        { heading: 'Track offers and transaction progress', body: 'The workspace includes offer and transaction-related workflows. These tools help organise progress; they do not replace legal, financial or professional checks required to complete a property transaction.' },
      ],
    },
    {
      slug: 'property-listing-and-review',
      title: 'Submitting property listings and understanding review',
      eyebrow: 'UNLIVO property listings',
      intro: 'Useful property discovery depends on accurate listing information. UNLIVO provides a submission journey for property providers, with review steps before submitted listings are published.',
      sections: [
        { heading: 'Provide complete and accurate details', body: 'Enter the property location, category, type, price and size information requested in the listing form. Describe the property honestly and avoid omitting important limitations or conditions.' },
        { heading: 'Submit supporting information', body: 'Provide the additional details and images requested by the platform. Information should be current and should represent the actual property being offered.' },
        { heading: 'Allow the listing to be reviewed', body: 'A submitted listing may be reviewed before it appears publicly. Submission does not mean automatic publication, and additional clarification may be needed.' },
        { heading: 'Maintain the listing after publication', body: 'Update price, availability and property details when they change. Remove or mark a listing appropriately when it is no longer available.' },
      ],
    },
    {
      slug: 'broker-tools',
      title: 'A connected workspace for broker follow-up',
      eyebrow: 'UNLIVO broker tools',
      intro: 'A property enquiry can lead to several follow-up steps. UNLIVO’s broker workspace brings key activities—property management, enquiries, site visits, offers and transaction progress—into a connected workflow.',
      sections: [
        { heading: 'Property management', body: 'Keep property records organised and maintain accurate details so buyers can assess relevant listings.' },
        { heading: 'Enquiry management', body: 'Review and follow up on enquiries associated with your property activity. Clear, timely communication helps keep prospective clients informed.' },
        { heading: 'Site visits', body: 'Coordinate visit-related activity and keep the next step visible to the people involved. Confirm schedules and property access directly with the relevant parties.' },
        { heading: 'Offers and transactions', body: 'Use the available offer and transaction workflows to organise progress after a buyer expresses interest. Complete required due diligence and formal documentation with the appropriate professionals.' },
      ],
    },
    {
      slug: 'faq',
      title: 'UNLIVO frequently asked questions',
      eyebrow: 'UNLIVO help and answers',
      intro: 'Answers to common questions about buyer requirements, property discovery, listings and broker participation on UNLIVO.',
      sections: [
        { heading: 'Is UNLIVO only a property-listing website?', body: 'No. Buyers can browse published properties and also submit a structured requirement describing the property they need. Requirement-led discovery is a central part of the platform.' },
        { heading: 'Does a match guarantee that a property is suitable?', body: 'No. A match indicates that available property details appear relevant to the information in a requirement. Buyers should review the listing, confirm current availability and independently verify all important details.' },
        { heading: 'Can property owners submit listings?', body: 'Yes. Property owners can use the provider listing journey. Submitted listings may be reviewed before publication.' },
        { heading: 'How do brokers access broker tools?', body: 'Brokers submit an application. Access to broker tools is enabled after the application is reviewed and approved.' },
        { heading: 'Does UNLIVO complete the property transaction?', body: 'UNLIVO provides discovery and workflow tools. Buyers, sellers and their appointed professionals remain responsible for inspections, verification, negotiation, legal documentation and completion.' },
      ],
    },
  ],
  affilixwp: [
    {
      slug: 'referral-tracking',
      title: 'Understand the affiliate referral journey',
      eyebrow: 'AffilixWP referral tracking',
      intro: 'A dependable affiliate programme needs a clear way to recognise who referred a visitor. AffilixWP captures referral codes from links and associates eligible registrations with the referring affiliate.',
      sections: [
        { heading: 'Give affiliates a referral link', body: 'Affiliates share a link containing their referral code. When a visitor arrives through that link, the plugin reads the code from the URL.' },
        { heading: 'Remember the referral visit', body: 'The inspected plugin stores the referral code in a browser cookie for a 30-day attribution window. This allows referral information to remain available when the visitor completes an eligible registration later.' },
        { heading: 'Associate an eligible registration', body: 'When a WordPress user registers, the plugin checks the referral code against an active affiliate and records the referral relationship. The tracker includes safeguards against self-referrals and duplicate first-level records.' },
        { heading: 'Support a two-level referral structure', body: 'The current referral tracker can also record an eligible parent referral relationship where one exists. Review the actual programme rules and commission configuration before launch.' },
      ],
    },
    {
      slug: 'commission-management',
      title: 'Commission tracking built around referral activity',
      eyebrow: 'AffilixWP commission management',
      intro: 'AffilixWP records commission entries against purchase references and the referral relationships associated with a buyer. This gives administrators a structured record to review and manage.',
      sections: [
        { heading: 'Record a purchase reference', body: 'The commission recorder checks the purchase reference before inserting records. This helps prevent the same reference from being recorded more than once.' },
        { heading: 'Calculate eligible referral levels', body: 'The inspected commission engine creates entries for the referral levels it finds and stores details such as purchase amount, affiliate, level and commission status. Rates and programme rules should be confirmed in the installed release and configuration.' },
        { heading: 'Review commission status', body: 'Affiliate-facing records distinguish total, pending and paid commission amounts. Administrators can review commission records and use the available management and export workflows.' },
        { heading: 'Keep programme rules transparent', body: 'Before launch, publish the approved commission rates, qualifying actions, review period and payment terms. Do not assume example or code-level rates apply to every installation.' },
      ],
    },
    {
      slug: 'affiliate-dashboard',
      title: 'An affiliate area inside your WordPress website',
      eyebrow: 'AffilixWP affiliate dashboard',
      intro: 'AffilixWP provides a front-end affiliate dashboard that can be placed on a WordPress page using a shortcode. Affiliates can access referral information and commission activity without needing a separate public-facing affiliate website.',
      sections: [
        { heading: 'Add the dashboard to a WordPress page', body: 'The plugin provides the [affilixwp_dashboard] shortcode. A site administrator can place it on the page intended for the affiliate area, subject to plugin setup and access requirements.' },
        { heading: 'Give affiliates a view of their activity', body: 'The dashboard code includes a referral link, commission totals, pending and paid amounts, and recent commission history.' },
        { heading: 'Keep affiliate information connected', body: 'The dashboard draws on affiliate records, referral tracking and commission data so participants can review activity associated with their account.' },
        { heading: 'Set expectations about payments', body: 'A dashboard status is a record of commission administration; it should not be interpreted as confirmation that money has been transferred. Payment handling follows the programme’s configured Razorpay-based process and administrator approval.' },
      ],
    },
    {
      slug: 'getting-started',
      title: 'Getting started with AffilixWP on WordPress',
      eyebrow: 'AffilixWP setup guide',
      intro: 'AffilixWP is a WordPress plugin designed to help a business operate an affiliate programme from its own website. Start by preparing the site, installing the plugin and configuring the programme before inviting affiliates.',
      sections: [
        { heading: 'Prepare your WordPress website', body: 'Use a maintained WordPress installation and take a current backup before installing or updating a plugin. Review the plugin’s release notes and compatibility information for the version you intend to use.' },
        { heading: 'Install and activate the plugin', body: 'Install the AffilixWP package through the WordPress administration area and activate it. Follow the instructions supplied with the current release if your distribution method requires a licence or download step.' },
        { heading: 'Configure the affiliate programme', body: 'Review the available affiliate, referral, commission and payout settings. Decide the programme rules, eligibility requirements and approval process before inviting participants.' },
        { heading: 'Publish the affiliate dashboard', body: 'Create the page where affiliates will sign in and place the [affilixwp_dashboard] shortcode. Check the page while logged in with an appropriate affiliate account.' },
        { heading: 'Test the complete journey', body: 'Before opening the programme, test a referral link, an eligible registration, commission recording, administrator review and the Razorpay-based payment process configured for your installation.' },
      ],
    },
    {
      slug: 'payout-management',
      title: 'Manage affiliate payouts with a clear review process',
      eyebrow: 'AffilixWP payout management',
      intro: 'Commission tracking and money movement are separate steps. AffilixWP includes payout-profile and administrative payout-management components, with Razorpay as the payment provider used for the product.',
      sections: [
        { heading: 'Collect payout details', body: 'The plugin includes payout-profile functionality so the programme can maintain the information required for its configured payment workflow. Collect only the details needed and protect access to them.' },
        { heading: 'Review commissions before payment', body: 'Administrators should review eligible commission records, resolve disputes or adjustments and approve the amount due according to the programme’s published terms.' },
        { heading: 'Use the configured Razorpay process', body: 'AffilixWP uses Razorpay for its payment-provider workflow. Exact processing steps depend on the deployed plugin version and the site’s Razorpay configuration. Confirm the live integration and operational permissions before promising automatic or instant payouts.' },
        { heading: 'Keep payment records clear', body: 'Update commission and payout statuses only when the corresponding administrative or payment step has actually occurred. Retain appropriate records for reconciliation and support.' },
      ],
    },
    {
      slug: 'licensing-and-updates',
      title: 'AffilixWP licensing and plugin updates',
      eyebrow: 'AffilixWP product maintenance',
      intro: 'A WordPress plugin needs a reliable way to receive updates and maintain access to licensed functionality. AffilixWP includes licence validation and update-related functionality.',
      sections: [
        { heading: 'Activate your licence', body: 'Follow the activation instructions supplied with your AffilixWP purchase or distribution. Keep licence credentials private and associate them only with websites you are authorised to manage.' },
        { heading: 'Keep WordPress and the plugin maintained', body: 'Review release information before updating, maintain backups and test important affiliate workflows after an update—especially referral capture, commission recording and dashboard access.' },
        { heading: 'Use the official update route', body: 'The plugin contains update functionality that checks licence status as part of its update workflow. Use the supported update mechanism and avoid installing packages from untrusted sources.' },
        { heading: 'Get help when something does not work', body: 'When contacting support, include the plugin version, WordPress version, a description of the issue and relevant error details. Never send passwords, licence secrets or payment credentials in an ordinary support message.' },
      ],
    },
    {
      slug: 'faq',
      title: 'AffilixWP frequently asked questions',
      eyebrow: 'AffilixWP help and answers',
      intro: 'Answers to common questions about WordPress setup, referral attribution, commission records, the affiliate dashboard, Razorpay and licensing.',
      sections: [
        { heading: 'Does AffilixWP run on WordPress?', body: 'Yes. AffilixWP is a WordPress plugin intended to manage affiliate workflows from a WordPress website.' },
        { heading: 'How are referral visits recognised?', body: 'The plugin reads a referral code from a ?ref= URL parameter and stores it in a browser cookie for the implemented 30-day attribution window.' },
        { heading: 'Can affiliates see their commissions?', body: 'The front-end dashboard includes commission totals, pending and paid amounts, a referral link and recent commission history.' },
        { heading: 'Which payment provider does AffilixWP use?', body: 'AffilixWP uses Razorpay as its payment provider. Payment processing availability and steps depend on the configured Razorpay integration and the installed plugin release.' },
        { heading: 'Are payouts automatic?', body: 'Do not assume that a commission status means a payment has been sent. The programme administrator should review commissions and follow the configured Razorpay payment process.' },
        { heading: 'How do I receive plugin updates?', body: 'AffilixWP includes licence validation and update functionality. Follow the official activation and update instructions supplied with your release.' },
      ],
    },
  ],
  'docs-ai': [
    {
      slug: 'documentation-workflow',
      title: 'From source code to useful documentation',
      eyebrow: 'How Docs AI works',
      intro: 'Docs AI helps developers turn source code into documentation. Its workflow is centred on supplying code, selecting the programming language and choosing the documentation format before reviewing the generated result.',
      sections: [
        { heading: 'Provide the code', body: 'The current product workflow accepts code as input and asks the user to select its programming language. This gives the documentation process context for interpreting the supplied source.' },
        { heading: 'Choose the documentation format', body: 'Select the output that best fits the task: Full Docs, README, API Reference or Inline Comments. Each format serves a different documentation need.' },
        { heading: 'Generate and review', body: 'Docs AI produces a documentation draft for review. Check names, parameters, behaviour and examples against the actual code before publishing or relying on it.' },
        { heading: 'Use the result in your project', body: 'The product provides a preview and export-oriented workflow. Check the live application for the currently enabled output and download options.' },
      ],
    },
    {
      slug: 'documentation-types',
      title: 'Choose the documentation your project needs',
      eyebrow: 'Docs AI documentation formats',
      intro: 'A project README, an API reference and inline code comments solve different communication problems. Docs AI offers distinct documentation choices so developers can focus on the output useful for their current task.',
      sections: [
        { heading: 'README', body: 'A README introduces a project to its readers. It can explain the purpose of the code, its main components and the information a developer needs to understand the project.' },
        { heading: 'API reference', body: 'An API reference focuses on callable interfaces: functions, parameters, return values and usage details. It helps developers understand how to interact with a piece of code.' },
        { heading: 'Inline comments', body: 'Inline comments place explanations close to the relevant code. They can help readers follow intent, understand non-obvious logic and navigate implementation details.' },
        { heading: 'Full documentation', body: 'The Full Docs option is intended for broader documentation, bringing together project-level explanation, API details and inline documentation in one workflow.' },
      ],
    },
    {
      slug: 'developer-workflows',
      title: 'Make documentation part of the developer workflow',
      eyebrow: 'Docs AI for developers',
      intro: 'Documentation is often delayed when a project is moving quickly. Docs AI is designed to make a first draft easier to produce, while leaving developers in control of technical accuracy and final wording.',
      sections: [
        { heading: 'For individual developers', body: 'Create a starting point for a README, API reference or inline explanations without beginning with a blank document. Review the result and adapt it to the project’s conventions.' },
        { heading: 'For code handovers', body: 'Documentation can help another developer understand the purpose and structure of code they did not write. Use generated material as a handover draft, then add project-specific context.' },
        { heading: 'For legacy code', body: 'When working with unfamiliar code, a generated explanation can provide a useful first pass. Validate the explanation against runtime behaviour and tests before treating it as authoritative.' },
        { heading: 'For evolving projects', body: 'Revise documentation as code changes. Human review remains important because generated documentation can miss context or describe behaviour inaccurately.' },
      ],
    },
  ],
  'beveez-ai': [
    {
      slug: 'ai-assistants',
      title: 'Business-specific AI assistants',
      eyebrow: 'Planned Beveez AI direction',
      intro: 'Beveez AI is in development. One area being explored is business-specific assistants that help people find information and navigate common customer or internal questions.',
      sections: [
        { heading: 'Designed around business knowledge', body: 'The intended direction is to ground assistant responses in information supplied or approved by the business, rather than presenting a generic chatbot as a source of truth.' },
        { heading: 'A useful customer experience', body: 'Potential use cases include helping visitors understand services, find relevant information and identify a suitable next step.' },
        { heading: 'Development status', body: 'These are planned concepts, not a statement that the capabilities are currently available. Product scope and availability will be confirmed as development progresses.' },
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
      intro: 'The planned Beveez AI direction includes exploring how assistants could help businesses connect conversations with routine follow-up workflows.',
      sections: [
        { heading: 'Reduce repetitive hand-offs', body: 'Potential workflows include capturing enquiries, collecting relevant context and notifying the appropriate team.' },
        { heading: 'Fit the way a business operates', body: 'Useful automation should reflect the business’s existing process, permissions and approval points.' },
        { heading: 'Development status', body: 'These concepts remain under development. Specific integrations, automation triggers and availability have not yet been finalised.' },
      ],
    },
  ],
}
