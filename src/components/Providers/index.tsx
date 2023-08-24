import React, { ReactNode } from "react";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { ThemeProvider } from "./ThemeProvider";

function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </ReactQueryProvider>
  );
}

export { Providers };
