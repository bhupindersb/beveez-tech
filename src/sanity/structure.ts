import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      /* =====================
         GLOBAL
      ===================== */
      S.listItem()
        .title('Global Settings')
        .child(
          S.list()
            .title('Global Settings')
            .items([
              S.documentTypeListItem('siteSettings').title('Site Settings'),
              S.documentTypeListItem('footerSettings').title('Footer Settings'),
            ])
        ),

      S.divider(),

      /* =====================
         PAGES (STATIC)
      ===================== */
      S.documentTypeListItem('page').title('Pages'),

      S.divider(),

      /* =====================
         HOMEPAGE
      ===================== */
      S.listItem()
        .title('Homepage')
        .child(
          S.list()
            .title('Homepage')
            .items([
              S.documentListItem()
                .id('home')
                .schemaType('page')
                .title('Home Page'),

              S.divider(),

              S.documentTypeListItem('trustSection').title('Trust Section'),
              S.documentTypeListItem('servicesSection').title('Services Section'),
              S.documentTypeListItem('whyChooseUs').title('Why Choose Us'),
              S.documentTypeListItem('whoWeWorkWith').title('Who We Work With'),
              S.documentTypeListItem('pricingSection').title('Pricing Section'),
              S.documentTypeListItem('ctaSection').title('CTA Section'),
              S.documentTypeListItem('blogSection').title('Blog Section'),
            ])
        ),

      S.divider(),

      /* =====================
         SERVICES
      ===================== */
      S.listItem()
        .title('Services')
        .child(
          S.list()
            .title('Services')
            .items([
              S.documentTypeListItem('service').title('Services'),
            ])
        ),

      S.divider(),

      /* =====================
         PRICING
      ===================== */
      S.listItem()
        .title('Pricing')
        .child(
          S.list()
            .title('Pricing')
            .items([
              S.documentTypeListItem('pricingPlan').title('Pricing Plans'),
            ])
        ),

      S.divider(),

      /* =====================
         BLOG
      ===================== */
      S.listItem()
        .title('Blog')
        .child(
          S.documentTypeList('blog').title('Blog Posts')
        ),
    ])
