"use client";

import {
  IconBriefcase,
  IconChartBar,
  IconDashboard,
  IconDatabaseDollar,
  IconFolder,
  IconInnerShadowTop,
  IconListDetails,
  IconMist,
  IconPackage,
  IconUsers
} from "@tabler/icons-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Inquiry",
      url: "/dashboard/inquiry",
      icon: IconListDetails,
    },
    {
      title: "Pricing Inquiry",
      url: "/dashboard/pricing-inquiry",
      icon: IconDatabaseDollar,
    },
    {
      title: "Packages",
      url: "/dashboard/packages",
      icon: IconPackage,
    },
    {
      title: "Support",
      url: "/dashboard/support",
      icon: IconMist,
    },
    {
      title: "Careers",
      url: "/dashboard/careers",
      icon: IconBriefcase,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "/dashboard/team",
      icon: IconUsers,
    },
  ],


};

import { useUser } from "@/hooks/use-user";

// ... existing imports

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUser();

  const user = {
    name: userData?.user?.name || "User",
    email: userData?.user?.email || "user@example.com",
    avatar: userData?.user?.avaterImage || "",
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/dashboard">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Ruby Co.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
