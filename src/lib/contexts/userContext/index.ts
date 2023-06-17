import { User } from "@/types";
import React from "react";

export const userContext = React.createContext<{ currentUser: User }>({ currentUser: null });
