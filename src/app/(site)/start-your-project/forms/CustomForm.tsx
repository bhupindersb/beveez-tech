import { FormWrapper, Input, Textarea, Submit } from './FormUI'

export default function CustomForm() {
  return (
    <FormWrapper title="Start a Custom Project">
      <Input label="Your name" />
      <Input label="Your email" />
      <Textarea label="Tell us about your project" />
      <Submit />
    </FormWrapper>
  )
}
