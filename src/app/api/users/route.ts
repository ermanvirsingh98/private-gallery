import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        createdBy: true
      },
  });

  return NextResponse.json(users);
});

// export const POST = auth(async function POST(req) {
//   if (!req.auth) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//   console.log(req.auth);
//   const { name, expiryDays } = await req.json();

//   const code = Math.random().toString(36).substring(2, 8).toUpperCase();
//   const expiresAt = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);

//   const newCode = await prisma.accessCode.create({
//     data: {
//       name,
//       code,
//       expiresAt,
//       createdBy: req.auth.user.id || "user",
//     },
//   });

//   return NextResponse.json(newCode);
// });
