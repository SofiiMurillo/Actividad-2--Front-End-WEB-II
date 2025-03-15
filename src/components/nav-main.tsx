"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (url: string) => {
    console.log("pathname", pathname);
    console.log("url", url);
    if (pathname !== url) {
      router.push(url);
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              tooltip={item.title}
              onClick={() => handleNavigation(item.url)}
              className={`rounded-lg hover:bg-background ${
                pathname === item.url
                  ? "bg-background"
                  : "hover:bg-background/50"
              } group-data-[state=collapsed]:!w-8`}
            >
              <div className="flex items-center gap-2 w-full cursor-pointer relative">
                <div>
                  {item.icon && (
                    <item.icon
                      className={`${
                        pathname === item.url
                          ? "stroke-var--primary-100 hover:stroke-var--brand"
                          : "stroke-var--light_blue"
                      } w-4 h-4`}
                    />
                  )}
                </div>
                <p className="group-data-[state=collapsed]:hidden">
                  {item.title}
                </p>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
