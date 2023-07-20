import React, { ReactNode } from "react";
import { cookies } from "next/headers";
import { getUserFromCookie } from "@/lib/utils";
import {ReactQueryProvider} from "./ReactQueryProvider";
import { AuthProvider } from "./AuthProvider";
import { ThemeProvider } from "./ThemeProvider";

function Providers({ children }: { children: ReactNode }) {
  const serverFetchedUser = getUserFromCookie(cookies());

  return (
    <ReactQueryProvider>
      <AuthProvider serverFetchedUser={serverFetchedUser}>
        <ThemeProvider attribute="class" defaultTheme="dark">{children}</ThemeProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
}

export { Providers };
