"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import dynamic from "next/dynamic"

const ThemeToggle = dynamic(() => import("@/components/parts/themeToggle"), {
  ssr: false,
  loading: () => <div className="size-9" />,
});

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-(--header-height) w-full items-center gap-2 border-b bg-background/80 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
