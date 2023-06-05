import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import { ApolloProviderWrapper, Header } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "QuickChat",
  description: "Real time chat app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <ApolloProviderWrapper>
            <Header />
            <main>{children}</main>
          </ApolloProviderWrapper>
        </NextAuthProvider>
      </body>
    </html>
  );
}
