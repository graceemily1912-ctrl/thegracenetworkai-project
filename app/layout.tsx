import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://thegracenetwork.ai"),
  title: "The Grace Network | A Private Day with Emily Grace",
  description:
    "One private working day with the solo operator behind multiple six-figure businesses. $15,000 USD · O'Rourke Winery · Lake Country, BC.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "The Grace Network — A Private Day with Emily Grace",
    description:
      "How to run more without life running you. One private day at O'Rourke Winery.",
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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-[#F8F7F4] text-[#0A1628]">
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
