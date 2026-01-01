import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Pages
      S.documentTypeListItem('page').title('Pages'),

      // Site Settings (singleton)
      S.documentTypeListItem('siteSettings')
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),

      // Services
      S.documentTypeListItem('service').title('Services'),

      // Pricing
      S.documentTypeListItem('pricing').title('Pricing Plans'),

      // Trust Section
      S.documentTypeListItem('trust').title('Trust Section'),

      // Divider
      S.divider(),

      // Fallback (important)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['page', 'siteSettings', 'service', 'pricing', 'trust'].includes(
            listItem.getId() as string
          )
      ),
    ])
