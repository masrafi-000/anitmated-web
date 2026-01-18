"use client";
import gsap from "gsap";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { Button } from "../ui/button";

export default function ThemeToggle() {
  //
  const { setTheme, resolvedTheme } = useTheme();
  const iconRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    if (!iconRef.current) return;
    const isDark = resolvedTheme === "dark";
    const newTheme = isDark ? "light" : "dark";

    const tl = gsap.timeline();
    tl.to(iconRef.current, {
      y: 10,
      opacity: 0,
      rotate: isDark ? -45 : 45,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => setTheme(newTheme),
    });
    tl.fromTo(
      iconRef.current,
      { y: -10, opacity: 0, rotate: isDark ? 45 : -45 },
      { y: 0, opacity: 1, rotate: 0, duration: 0.4, ease: "back.out(1.7)" }
    );
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-9 rounded-full"
      onClick={toggleTheme}
    >
      <div ref={iconRef} className="flex items-center justify-center">
        {resolvedTheme === "dark" ? (
          <Sun className="size-4" />
        ) : (
          <Moon className="size-4" />
        )}
      </div>
    </Button>
  );
}
