"use client";

import { pb } from "@/lib/modules/pocketbase";
import { extractUserFromModel } from "@/lib/utils";
import type { User } from "@/types";
import React, { ReactNode, useEffect, useState } from "react";
import { userContext } from "@/lib/contexts";

function AuthProvider({ children, serverFetchedUser }: { children: ReactNode; serverFetchedUser: User }) {
  const [currentUser, setUser] = useState(serverFetchedUser);

  useEffect(() => {
    pb.authStore.onChange(() => {
      setUser(extractUserFromModel(pb.authStore.model));
    });
  }, []);

  return (
    <userContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export { AuthProvider };
