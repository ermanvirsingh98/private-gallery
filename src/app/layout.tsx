import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Lato } from "next/font/google";
import { auth } from "@/auth";
import "./globals.css";

interface LayoutProps {
  children: React.ReactNode;
}
const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700"] });

export const metadata: Metadata = {
  title: "Gallery - Baani",
  description: "This is private gallery",
};

export default async function RootLayout({ children }: LayoutProps) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={lato.className}>{children}</body>
      </html>
    </SessionProvider>
  );
}
