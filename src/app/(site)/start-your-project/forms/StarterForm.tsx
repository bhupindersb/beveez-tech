import { FormWrapper, Input, Submit } from './FormUI'

export default function StarterForm() {
  return (
    <FormWrapper title="Start your Starter Website">
      <Input label="Your name" />
      <Input label="Your email" />
      <Input label="Website type (Business, Portfolio, etc.)" />
      <Input label="Number of pages" />
      <Submit />
    </FormWrapper>
  )
}
