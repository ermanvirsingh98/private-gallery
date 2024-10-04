// actions.js
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

export const fetchUsers = async () => {
  const prisma = new PrismaClient();

  const session = await auth();


  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      createdBy: true,
      expiresAt: true
    },
  });

 return users
};
