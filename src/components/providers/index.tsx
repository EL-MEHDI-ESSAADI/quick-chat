import React, { ReactNode } from "react";
import { cookies } from "next/headers";
import { getUserFromCookie } from "@/lib/utils";
import ReactQueryProvider from "./ReactQueryProvider";
import { AuthProvider } from "./AuthProvider";

function Providers({ children }: { children: ReactNode }) {
  const serverFetchedUser = getUserFromCookie(cookies());

  return (
    <ReactQueryProvider>
      <AuthProvider serverFetchedUser={serverFetchedUser}>{children}</AuthProvider>
    </ReactQueryProvider>
  );
}

export { Providers };
