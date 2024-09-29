import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { z } from "zod";
 
const prisma = new PrismaClient();

// Define the validation schema using Zod
const credentialsSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and verification code are required")
        }

          const validatedCredentials = credentialsSchema.parse(credentials)
        const user = await prisma.user.findUnique({
          where: { email: validatedCredentials.email },
        })

        if (!user) {
          throw new Error("User not found")
        }

        const isPasswordValid = await bcrypt.compare(
          validatedCredentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error("Invalid Password!")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.name
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
  secret: process.env.AUTH_SECRET,
   callbacks: {
    async jwt({ token, user }) {
        if (user) {
            token.id = user.id as string
        }
        return token;
    },
    async session({ session, token }) {
        if (token) {
            session.user = {
                ...session.user,
                id: token.id as string,
            };
        }
        return session;
    },
},
  pages: {
    signIn: "/login",
  },
})
