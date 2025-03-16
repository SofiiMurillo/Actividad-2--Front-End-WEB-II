import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asesores - Phonix Contact",
  description: "Panel de asesores de Phonix Contact",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <SidebarTrigger className="group-data-[collapsible=offcanvas]:fixed fixed text-var--primary-50" />
        <AppSidebar />
        <main className="flex-1 md:px-4 overflow-y-scroll">{children}</main>
        <Toaster position="top-right" />
      </div>
    </SidebarProvider>
  );
}
