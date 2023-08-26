import { User } from "@/types";
import { extractUserFromModel } from "@/lib/utils";
import { cookies } from "next/headers";
import { POCKETBASE_URL } from "@/constants";
import PocketBase from "pocketbase";

async function getCurrentUser(): Promise<User | null> {
  const pb = new PocketBase(POCKETBASE_URL);

  const authCookie = cookies().get("pb_auth");

  if (authCookie)
    pb.authStore.loadFromCookie(`${authCookie.name}=${authCookie.value}`);

  try {
    if (pb.authStore.isValid) await pb.collection("users").authRefresh();
  } catch (error) {
    pb.authStore.clear();
  }

  return extractUserFromModel(pb.authStore.model);
}

export { getCurrentUser };
