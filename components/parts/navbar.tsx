// components/ds/Navbar.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Logo from "@/public/logo.png";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
import { Menu } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Use Method 2 from before: Dynamic import to kill hydration errors
const ThemeToggle = dynamic(() => import("./themeToggle"), {
  ssr: false,
  loading: () => <div className="size-9" />,
});

const navItems = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Pricing", href: "/pricing" },
  { name: "Team", href: "/team" },
  { name: "Careers", href: "/careers" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // GSAP Stagger animation for mobile links


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16  items-center justify-between px-6 md:px-12 lg:px-18">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group z-50 text-xl xl:text-2xl font-medium tracking-wide text-secondary-foreground"
        >
          <Image
            src={Logo}
            alt="Logo"
            width={30}
            loading="eager"
            height={22}
            className="transition-all hover:opacity-75 dark:invert"
          ></Image>
          Ruby Studio
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex gap-4 xl:gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground relative",
                    isActive
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground",
                  )}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-5.25 left-0 h-0.5 w-full bg-primary" />
                  )}
                </Link>
              </li>
            );})}
          </ul>
          <div className="flex items-center gap-3 border-l pl-6 border-border/60">
            <ThemeToggle />
            <Link href="/lets-talk">
              <Button size="sm" className="rounded-full px-5 h-9 font-medium">
                Let&apos;s Talk
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            {/* 
                FIX: p-0 removes default shadcn padding. 
                Optimized width for mobile devices.
            */}
            <SheetContent
              side="left"
              className="w-75 sm:w-100 p-0 border-r-0"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>

              <div className="flex flex-col h-full px-4 xl:px-6 py-6">
                {/* Mobile Logo Section (Aligned with header) */}
                <div className="h-16 flex items-center mb-12">
                  <Link
                    href="/"
                    className="flex items-center gap-2 group z-50 text-xl xl:text-2xl font-medium tracking-wide text-secondary-foreground"
                  >
                    <Image
                      src={Logo}
                      alt="Logo"
                      width={30}
                      height={22}
                      loading="eager"
                      className="transition-all hover:opacity-75 dark:invert"
                    ></Image>
                    Ruby Studio
                  </Link>
                </div>

                {/* Nav Links */}
                <div className="mobile-link flex flex-col space-y-4">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "mobile-link text-4xl font-light tracking-tighter transition-all duration-300 hover:italic hover:translate-x-2",
                          isActive
                            ? "text-primary font-normal translate-x-2 italic"
                            : "text-foreground/90",
                        )}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>

                {/* Footer Info */}
                <div className="mt-auto pb-10 pt-8">
                  <div className="h-px w-full bg-border/50 mb-8" />
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-4">
                    Connect
                  </p>
                  <div className="flex flex-col gap-3">
                    {["Twitter", "Instagram", "GitHub"].map((s) => (
                      <span
                        key={s}
                        className="text-sm font-medium cursor-pointer hover:underline underline-offset-4"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
