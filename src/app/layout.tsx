import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import { SectionProvider } from "@/components/SectionProvider";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marvin — Portfolio 2026",
  description: "Portfolio of Marvin.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${openSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col md:h-full md:overflow-hidden">
        <SectionProvider>
          <Navbar />
          {children}
        </SectionProvider>
      </body>
    </html>
  );
}
