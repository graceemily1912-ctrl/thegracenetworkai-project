import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScroll } from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://thegracenetwork.ai"),
  title: "The Grace Network | Private day with Emily Grace — $15,000",
  description:
    "I run multiple six-figure businesses solo — plus a charity and parenting solo. One private day, $15,000 CAD, O'Rourke Winery.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "The Grace Network — $15,000 private day",
    description:
      "Multiple six-figure businesses. Solo. One day at O'Rourke Winery for people past the basics.",
    images: [{ url: "/og.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F7F4] text-[#0A1628]">
        <ConvexClientProvider>
          <SmoothScroll />
          {children}
        </ConvexClientProvider>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
