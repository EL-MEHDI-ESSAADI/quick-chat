import { userContext } from "@/lib/contexts";
import { useContext } from "react";

export const useUser = () => useContext(userContext);
