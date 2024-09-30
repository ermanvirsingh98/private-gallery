import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { auth } from "@/auth"

const prisma = new PrismaClient()

export const DELETE = auth(async function DELETE(req, { params }: any) {
    if (!req.auth) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }


      const { id } = params

      await prisma.user.delete({
        where: { id },
      })    
      return NextResponse.json({ message: 'User deleted successfully' })
    
})