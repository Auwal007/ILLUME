import { NextResponse } from "next/server"
import { createInquiry } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, service, message } = body

    const inquiryData = {
      name,
      email,
      phone,
      service,
      message
    }

    await createInquiry(inquiryData)

    return NextResponse.json({ ...inquiryData, status: "NEW", createdAt: new Date().toISOString() }, { status: 201 })
  } catch (error) {
    console.error("Error creating inquiry:", error)
    return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 })
  }
}
