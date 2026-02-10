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
function FormWrapper({ title, children }: any) {
  return (
    <div className="max-w-3xl mx-auto px-6 mt-10">
      <h3 className="text-2xl font-heading font-semibold mb-6">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Input({ label }: { label: string }) {
  return (
    <input
      placeholder={label}
      className="w-full rounded-xl border border-gray-300 px-4 py-3"
    />
  )
}

function Textarea({ label }: { label: string }) {
  return (
    <textarea
      placeholder={label}
      className="w-full rounded-xl border border-gray-300 px-4 py-3 h-32"
    />
  )
}

function Submit() {
  return (
    <button className="mt-6 rounded-full bg-darkOrange px-8 py-4 text-white font-semibold">
      Submit Request
    </button>
  )
}
