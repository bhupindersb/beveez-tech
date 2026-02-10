import { PlanType } from '@/types/plan'

export interface FormField {
  name: string
  label: string
  type: 'text' | 'textarea' | 'select'
  options?: string[]
  required?: boolean
}

export const PROJECT_FORM_CONFIG: Record<PlanType, FormField[]> = {
  starter: [
    {
      name: 'businessName',
      label: 'Business / Brand Name',
      type: 'text',
      required: true,
    },
    {
      name: 'websiteGoal',
      label: 'What is the primary goal of the website?',
      type: 'textarea',
      required: true,
    },
  ],

  growth: [
    {
      name: 'businessName',
      label: 'Business / Brand Name',
      type: 'text',
      required: true,
    },
    {
      name: 'targetAudience',
      label: 'Who is your target audience?',
      type: 'textarea',
      required: true,
    },
    {
      name: 'features',
      label: 'Key features you need',
      type: 'textarea',
    },
  ],

  performance: [
    {
      name: 'businessName',
      label: 'Business / Brand Name',
      type: 'text',
      required: true,
    },
    {
      name: 'trafficVolume',
      label: 'Expected monthly traffic',
      type: 'select',
      options: ['< 10k', '10k – 50k', '50k – 100k', '100k+'],
    },
    {
      name: 'scalingGoals',
      label: 'Scaling & performance goals',
      type: 'textarea',
    },
  ],
}
