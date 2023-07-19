import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Providers } from "@/components/server";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickChat",
  description: "Real time chat app",
  icons: {
    shortcut: "/images/favicon/favicon.ico",
    icon: [
      {
        url: "/images/favicon/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        url: "/images/favicon/favicon-16x16.png",
        sizes: "16x16",
      },
    ],
    apple: {
      sizes: "180x180",
      url: "/images/favicon/apple-touch-icon.png",
    },
  },
  manifest: "/images/favicon/site.webmanifest",
  themeColor: "#ffffff",
  other: {
    "msapplication-TileColor": "#ffffff",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="mask-icon" href="/images/favicon/safari-pinned-tab.svg" color="#5bbad5" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
