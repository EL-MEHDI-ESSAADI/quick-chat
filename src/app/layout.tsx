import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { getUserFromCookie } from "@/lib/utils";
import { cookies } from "next/headers";
import { AuthProvider } from "@/components";
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickChat",
  description: "Real time chat app",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const serverFetchedUser = getUserFromCookie(cookies());

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider serverFetchedUser={serverFetchedUser}>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
