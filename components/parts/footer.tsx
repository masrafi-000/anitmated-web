"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Facebook, Github, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Balancer from "react-wrap-balancer";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/public/logo.png";
import { Container, Section } from "../ds";
import { Button } from "../ui/button";

const formSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address.",
  }),
});

export default function Footer() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <footer className="border-t bg-background">
      <Section className="py-12 md:py-16">
        <Container className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link
              href="/"
              className="text-2xl font-medium flex gap-3 items-center tracking-wide text-secondary-foreground cursor-pointer"
            >
              <Image
                src={Logo}
                alt="Logo"
                width={30}
                height={22}
                className="transition-all hover:opacity-75 dark:invert"
              ></Image>
              Ruby Studio
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              <Balancer>
                Ruby Studio is a premier creative agency dedicated to crafting exceptional digital experiences that inspire and engage.
              </Balancer>
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Github size={16} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Twitter size={16} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Facebook size={16} />
              </Button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 lg:col-start-6 flex flex-col gap-6">
            <h3 className="font-serif text-lg font-medium text-foreground tracking-tight">Company</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground/80">
              <Link href="/" className="hover:text-foreground transition-all duration-300 hover:translate-x-1 w-fit">Home</Link>
              <Link href="/about" className="hover:text-foreground transition-all duration-300 hover:translate-x-1 w-fit">About Us</Link>
              <Link href="/services" className="hover:text-foreground transition-all duration-300 hover:translate-x-1 w-fit">Services</Link>
              <Link href="/blog" className="hover:text-foreground transition-all duration-300 hover:translate-x-1 w-fit">Blog</Link>
              <Link href="/contact" className="hover:text-foreground transition-all duration-300 hover:translate-x-1 w-fit">Contact</Link>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-4 flex flex-col gap-4">
             <h3 className="font-semibold text-foreground">Stay in the loop</h3>
             <p className="text-sm text-muted-foreground">
               Join our newsletter to get the latest insights and news.
             </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="not-prose space-y-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Subscribe</Button>
              </form>
            </Form>
          </div>
        </Container>

        <Container className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} <Link href="/" className="hover:underline">Ruby Studio</Link>. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
