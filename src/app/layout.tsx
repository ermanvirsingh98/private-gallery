import { Button } from "@/components/ui/button";
import SideMenu from "@/components/side-menu";
import { UserNav } from "@/components/user-nav";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="border">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5 h-[100vh]">
              <SideMenu />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <UserNav />
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
