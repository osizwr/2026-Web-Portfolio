import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import AnimatedCursor from "@/components/AnimatedCursor";
import ImageProtection from "@/components/ImageProtection";
import Navbar from "@/components/Navbar";
import { SectionProvider } from "@/components/SectionProvider";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — Portfolio 2026`,
  description: `Portfolio of ${siteConfig.name}.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${openSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <AnimatedCursor />
        <ImageProtection />
        <SectionProvider>
          <Navbar />
          {children}
        </SectionProvider>
      </body>
    </html>
  );
}
