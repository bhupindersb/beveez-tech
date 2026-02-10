export type PlanType =
  | 'starter'
  | 'growth'
  | 'performance'
  | 'custom'

export interface StartProjectData {
  selectedPlan: PlanType | null
}
