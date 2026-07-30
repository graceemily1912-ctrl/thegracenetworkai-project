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
  title: "The Grace Network | AI Accelerator — $15,000 Private Day",
  description:
    "One private day with Emily Grace at O'Rourke Winery. Transfer the autonomous AI systems running her live products onto your businesses. $15,000 CAD.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "The Grace Network — AI Accelerator",
    description:
      "Systems that run without you. Private in-person day · $15,000 CAD · O'Rourke Winery, Lake Country BC.",
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
