import { pb } from "@/lib/modules";
import { User } from "@/types";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { extractUserFromModel } from "@/lib/utils";

function getUserFromCookie(cookies: ReadonlyRequestCookies): User {
  const authCookie = cookies.get("pb_auth");

  if (!authCookie) return null;

  pb.authStore.loadFromCookie(`${authCookie.name}=${authCookie.value}`);

  const user = extractUserFromModel(pb.authStore.model);

  return user as User;
}

export { getUserFromCookie };
