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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
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
    <footer>
      <Section>
        <Container className="grid gap-6">
          <div className="not-prose flex flex-col gap-6">
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
            <p>
              <Balancer>
                Ruby Studio is a premier creative agency dedicated to crafting exceptional digital experiences that inspire and engage.
              </Balancer>
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Github />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter />
              </Button>
              <Button variant="outline" size="icon">
                <Facebook />
              </Button>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="not-prose space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stay in the Loop</FormLabel>
                    <FormControl>
                      <Input
                        className="md:w-96"
                        placeholder="example@rubystudio.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Get the latest insights on design trends and agency news.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </Container>
        <Container className="not-prose items-center justify-between border-t text-sm md:flex">
          <div className="mb-6 flex flex-col gap-4 underline decoration-muted underline-offset-4 md:mb-0 md:flex-row">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </div>
          <p className="text-muted-foreground">
            © <a href="/">Ruby Studio</a>
            . All rights reserved. 2024-present.
          </p>
        </Container>
      </Section>
    </footer>
  );
}
