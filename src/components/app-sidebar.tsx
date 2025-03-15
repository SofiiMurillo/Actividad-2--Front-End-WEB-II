"use client";

import * as React from "react";
import { Drama, FastForward, Popcorn, Speaker, Video } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Peliculas y Series",
      url: "/peliculas-series",
      icon: Popcorn,
      isActive: true,
    },
    {
      title: "Directores",
      url: "/directores",
      icon: Video,
      isActive: true,
    },
    {
      title: "Generos",
      url: "/generos",
      icon: Drama,
      isActive: true,
    },
    {
      title: "Productoras",
      url: "/productoras",
      icon: Speaker,
      isActive: true,
    },
    {
      title: "Tipos de multimedia",
      url: "/multimedia",
      icon: FastForward,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
