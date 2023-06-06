import "./globals.css";
import { Inter } from "next/font/google";
import { ApolloProviderWrapper, Header, NextAuthProvider } from "@/components";
import { Metadata } from "next";
import { authOptions } from "@/constants";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const revalidate = 0;

export const metadata: Metadata = {
  title: "QuickChat",
  description: "Real time chat app",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          <ApolloProviderWrapper>
            <Header />
            {children}
          </ApolloProviderWrapper>
        </NextAuthProvider>
      </body>
    </html>
  );
}
