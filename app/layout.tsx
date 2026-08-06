import type { Metadata } from "next";

import { IntroLoader } from "@/components/intro-loader";
import { siteMeta } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://makdevelopers.com"),
  title: siteMeta.title,
  description: siteMeta.description,
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    images: [
      {
        url: "/images/home/hero-desktop.webp",
        width: 3390,
        height: 1922,
        alt: "MĀK premium real estate homepage hero image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
    images: ["/images/home/hero-desktop.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <IntroLoader />
        {children}
      </body>
    </html>
  );
}
