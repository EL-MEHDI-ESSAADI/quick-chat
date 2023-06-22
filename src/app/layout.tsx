import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Providers } from "@/components/server";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickChat",
  description: "Real time chat app",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
