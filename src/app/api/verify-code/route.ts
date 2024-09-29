import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { code } = await req.json()

  const accessCode = await prisma.accessCode.findUnique({
    where: { code },
  })

  if (!accessCode || accessCode.expiresAt < new Date()) {
    return NextResponse.json({ error: 'Invalid or expired code',success: false }, { status: 400 })
  }

  // Here you can return the protected content
  return NextResponse.json({success: true, status: 200})
}