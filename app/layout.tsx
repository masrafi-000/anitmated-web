import { Nav } from "@/components/ds";
import Footer from "@/components/parts/footer";
import Navbar from "@/components/parts/navbar";
import ScrollToTop from "@/components/parts/scroll-to-top";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ruby Studio | Digital Agency",
  description: "We build exceptional digital experiences for ambitious brands. Web design, development, and digital strategy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav>
            <Navbar />
          </Nav>
          {children}
          <Footer/>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
