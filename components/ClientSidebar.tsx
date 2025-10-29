"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, FileText, User, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

type MenuItem = {
  title: string;
  url: string;
  icon: React.ElementType;
};

const menuItems: MenuItem[] = [
  { title: "Dashboard", url: "/dashboard/client", icon: LayoutDashboard },
  { title: "My Projects", url: "/dashboard/client/projects", icon: FolderKanban },
  { title: "Applications", url: "/dashboard/client/applications", icon: FileText },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function ClientSidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Logo / Header */}
        <div className="p-4 border-b">
          <h2 className={`font-bold text-lg transition-opacity ${open ? "opacity-100" : "opacity-0"}`}>
            DevHire
          </h2>
          {!open && <div className="text-xl font-bold">DH</div>}
        </div>

        {/* Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Client Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url} className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
