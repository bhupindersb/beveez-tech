export interface PricingPlan {
  title: string
  highlighted?: boolean

  includes?: {
    uiux?: boolean
    responsive?: boolean
    seo?: boolean
    performance?: boolean
    cms?: boolean
    training?: boolean
    support?: boolean
  }
}
