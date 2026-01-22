import Footer from "@/components/parts/footer";
import Navbar from "@/components/parts/navbar";
import ScrollToTop from "@/components/parts/scroll-to-top";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
