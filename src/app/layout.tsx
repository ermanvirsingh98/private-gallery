import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

import "./globals.css";

const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700"] });

export const metadata: Metadata = {
  title: "Gallery - Baani",
  description: "This is private gallery",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={lato.className}>{children}</body>
      </html>
    </SessionProvider>
  );
}
