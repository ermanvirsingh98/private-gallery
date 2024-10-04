"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  Menu,
  ChevronDown,
  Images,
  Album,
  Heart,
  CornerDownRight,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { ROLES } from "@/const";

const SideMenu = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [albumsOpen, setAlbumsOpen] = useState(false);

  const session: any = useSession();
  const isAdmin = session?.data?.user?.role === ROLES.ADMIN;

  const publicMenuItems = [
    {
      label: "All Photos",
      href: "/gallery",
      icon: <Images size="16px" className="mr-2" />,
    },
    ...(isAdmin
      ? [
          {
            label: "Favorite",
            href: "/admin/favorites",
            icon: <Heart size="16px" className="mr-2" />,
          },
        ]
      : []),
    {
      label: "Albums",
      icon: <Album size="16px" className="mr-2" />,
      children: [
        {
          label: "Vacation",
          href: "/albums/vacation",
          icon: <CornerDownRight size="16px" className="mr-2" />,
        },
        {
          label: "Family",
          href: "/albums/family",
          icon: <CornerDownRight size="16px" className="mr-2" />,
        },
        {
          label: "Work",
          href: "/albums/work",
          icon: <CornerDownRight size="16px" className="mr-2" />,
        },
      ],
    },
  ];

  const toggleAlbums = () => setAlbumsOpen((prev) => !prev);

  return (
    <>
      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 border-r bg-background lg:block">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <LayoutDashboard className="h-6 w-6" />
              <span>Baani's Gallery</span>
            </Link>
          </div>
          <ScrollArea className="flex-1 py-4">
            <nav className="grid gap-1 px-2">
              {publicMenuItems.map((item: any, i: number) => (
                <div key={i}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={toggleAlbums}
                        className="group flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                      >
                        <span className="flex items-center">
                          {item.icon}
                          <span>{item.label}</span>
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            albumsOpen ? "rotate-180" : ""
                          )}
                        />
                      </button>
                      {albumsOpen && (
                        <div className="ml-6 mt-2">
                          {item.children.map((subItem: any, j: number) => (
                            <Link key={j} href={subItem.href}>
                              <span
                                className={cn(
                                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                  pathname === subItem.href
                                    ? "bg-accent"
                                    : "transparent"
                                )}
                              >
                                {subItem.icon}
                                {subItem.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link href={item.href}>
                      <span
                        className={cn(
                          "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                          pathname === item.href ? "bg-accent" : "transparent"
                        )}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b px-4">
              <Link className="flex items-center gap-2 font-semibold" href="/">
                <LayoutDashboard className="h-6 w-6" />
                <span>My Dashboard</span>
              </Link>
            </div>
            <ScrollArea className="flex-1">
              <nav className="grid gap-1 p-2">
                {publicMenuItems.map((item: any, i: number) => (
                  <div key={i}>
                    {item.children ? (
                      <div>
                        <button
                          onClick={toggleAlbums}
                          className="group flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                        >
                          <span className="flex items-center">
                            {item.icon}
                            <span>{item.label}</span>
                          </span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              albumsOpen ? "rotate-180" : ""
                            )}
                          />
                        </button>
                        {albumsOpen && (
                          <div className="ml-6 mt-2">
                            {item.children.map((subItem: any, j: number) => (
                              <Link key={j} href={subItem.href}>
                                <span
                                  className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                    pathname === subItem.href
                                      ? "bg-accent"
                                      : "transparent"
                                  )}
                                >
                                  {subItem.label}
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link href={item.href}>
                        <span
                          className={cn(
                            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                            pathname === item.href ? "bg-accent" : "transparent"
                          )}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </span>
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SideMenu;
