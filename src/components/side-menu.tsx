import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { Photo } from "./icons/photo";
import { Favorite } from "./icons/favorite";
import { User } from "./icons/user";
import { auth, signOut } from "@/auth";
import { ROLES } from "@/const";
import SignOut from "./sign-out";
import { UserNav } from "./user-nav";

const menuItems = [
  {
    title: "Baani's Gallery",
    items: [
      {
        label: "All Photos",
        href: "/gallery",
        icon: <Photo />,
        isAdminOnly: false,
      },
      {
        label: "Favorite",
        href: "/admin/favorites",
        icon: <Favorite />,
        isAdminOnly: true,
      },
    ],
  },
  {
    title: "Manage",
    items: [
      {
        label: "Users",
        href: "/admin/users",
        icon: <User />,
        isAdminOnly: true,
      },
    ],
  },
];

const SideMenu = async () => {
  const user: any = await auth();
  const isAdmin = user?.user?.role === ROLES.ADMIN;

  return (
    <div className="pb-12 hidden lg:block relative">
      <div className="space-y-4 py-4">
        Welcome {user?.user?.role}
        {menuItems.map((menu, i) => {
          // Check if there are accessible items in the current menu
          const hasAccessibleItems = menu.items.some(
            (item) => !item.isAdminOnly || isAdmin
          );

          return (
            hasAccessibleItems && (
              <div key={i} className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                  {menu.title}
                </h2>
                <div className="space-y-1">
                  {menu.items.map((item, j) => {
                    // Render item if it's not admin-only or the user is an admin
                    if (!item.isAdminOnly || isAdmin) {
                      return (
                        <Link
                          key={`${item.label}=${j}`}
                          href={item.href}
                          className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 w-full justify-start"
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )
          );
        })}
      </div>

      <div className="px-3 py-2 w-full">
        <SignOut />
      </div>
    </div>
  );
};

export default SideMenu;
