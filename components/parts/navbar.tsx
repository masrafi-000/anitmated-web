// components/ds/Navbar.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "@/public/logo.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Use Method 2 from before: Dynamic import to kill hydration errors
const ThemeToggle = dynamic(() => import("./themeToggle"), {
  ssr: false,
  loading: () => <div className="size-9" />,
});

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // GSAP Stagger animation for mobile links
  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(
        ".mobile-link",
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.2,
        },
      );
    }
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16  items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group z-50 text-2xl font-medium tracking-wide text-secondary-foreground">
          <Image
            src={Logo}
            alt="Logo"
            width={30}
            height={22}
            className="transition-all hover:opacity-75 dark:invert"
          ></Image>
          Ruby
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3 border-l pl-6 border-border/60">
            <ThemeToggle />
            <Button size="sm" className="rounded-full px-5 h-9 font-medium">
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            {/* 
                FIX: p-0 removes default shadcn padding. 
                w-full makes it feel more "editorial" on mobile.
            */}
            <SheetContent
              side="left"
              className="w-full sm:w-100 p-0 border-r-0"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>

              <div className="flex flex-col h-full px-8 py-6">
                {/* Mobile Logo Section (Aligned with header) */}
                <div className="h-16 flex items-center mb-12">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <div className="size-5 rounded-full bg-foreground" />
                    <span className="text-xl font-bold tracking-tighter italic">
                      BRAND
                    </span>
                  </Link>
                </div>

                {/* Nav Links */}
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="mobile-link text-4xl font-light tracking-tighter text-foreground/90 transition-all duration-300 hover:italic hover:translate-x-2"
                    >
                      {item.name}
                    </Link>
                  ))}
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
