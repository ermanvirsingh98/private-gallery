import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Bell, User } from "lucide-react";
import { Lato } from "next/font/google";

import { Button } from "@/components/ui/button";
import SideMenu from "@/components/SideMenu";
import { auth } from "@/auth";
import { UserNav } from "@/components/UserNav";
import { ROLES } from "@/const";

interface LayoutProps {
  children: React.ReactNode;
}
const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700"] });

export default async function Layout({ children }: LayoutProps) {
  const session: any = await auth();

  return (
    <SessionProvider session={session}>
      <div className="flex h-screen overflow-hidden bg-background">
        <SideMenu />
        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-14 items-center justify-end border-b bg-background px-4 lg:px-8">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-4 pl-3">
              <UserNav />
            </div>
          </header>
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
