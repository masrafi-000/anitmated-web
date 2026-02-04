"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const switchRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = async () => {
    const isDark = resolvedTheme === "dark";
    const nextTheme = isDark ? "light" : "dark";

    // Fallback for browsers without View Transitions support
    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(nextTheme);
      return;
    }

    const switchElement = switchRef.current;
    if (!switchElement) {
      setTheme(nextTheme);
      return;
    }

    const rect = switchElement.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 400,
          easing: "ease-in",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  if (!mounted) {
    return <div className="h-8 w-14 opacity-0" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <SwitchPrimitive.Root
      ref={switchRef}
      checked={isDark}
      onCheckedChange={toggleTheme}
      className={cn(
        "peer inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
      )}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-7 w-7 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0",
          "flex items-center justify-center"
        )}
      >
        {isDark ? (
          <Moon className="size-4 text-foreground" />
        ) : (
          <Sun className="size-4 text-foreground" />
        )}
      </SwitchPrimitive.Thumb>
      <span className="sr-only">Toggle theme</span>
    </SwitchPrimitive.Root>
  );
}
