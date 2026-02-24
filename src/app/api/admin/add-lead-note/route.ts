import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { leadId, text } = await req.json()

    if (!leadId || !text) {
      return NextResponse.json(
        { error: 'Missing data' },
        { status: 400 }
      )
    }

    const note = await prisma.leadNote.create({
      data: {
        leadId,
        text,
      },
    })

    return NextResponse.json(note)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add note' },
      { status: 500 }
    )
  }
}