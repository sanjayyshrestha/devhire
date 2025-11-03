'use client'
import { LayoutDashboard, Search, FileText, User, Settings } from "lucide-react";

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
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { title: "Dashboard", url: "/dashboard/developer", icon: LayoutDashboard },
  { title: "Browse Projects", url: "/dashboard/developer/browse", icon: Search },
  { title: "My Applications", url: "/dashboard/developer/applications", icon: FileText },
  { title: "Profile", url: "/dashboard/developer/profile", icon: User },
];

export default function DeveloperSidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="p-4 border-b">
          <Link href='/' className={`font-bold text-lg transition-opacity ${open ? "opacity-100" : "opacity-0"} cursor-pointer`}>
            DevHire
          </Link>
          {!open && <div className="text-xl font-bold">DH</div>}
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Developer Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive =pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <item.icon />
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
