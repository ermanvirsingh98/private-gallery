// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { Role } from "@prisma/client"; 

declare module "next-auth" {
  interface User extends DefaultUser {
    role: Role; // Use Role enum here
  }

  interface Session extends DefaultSession {
    user: {
      role: Role; 
    } & DefaultSession["user"];
  }
}
