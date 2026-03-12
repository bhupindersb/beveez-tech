import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const data = await req.formData()

  const name = data.get("name")
  const email = data.get("email")
  const website = data.get("website")
  const message = data.get("message")

  console.log("Free Audit Request:", {
    name,
    email,
    website,
    message,
  })

  return NextResponse.redirect(
    new URL("/thank-you", req.url)
  )
}