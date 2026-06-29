import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.thegracenetwork.ai"),
  title: "KOLA AI | High-Leverage AI Implementation for Ambitious Leaders",
  description: "Kelowna-based AI education and implementation. Attend the Workshop to qualify for the $10,000 Accelerator. Build systems that save $60k+ annually.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "KOLA AI — Workshop & Accelerator",
    description: "Premium AI implementation training. Workshop (qualifier) → $10k Accelerator. Kelowna, BC.",
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
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
