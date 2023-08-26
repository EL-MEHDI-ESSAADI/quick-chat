import {
  PAGES_RESTRICTED_FROM_LOGEDIN_USERS,
  PAGES_RESTRICTED_FROM_LOGGEDOUT_USERS,
} from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import { POCKETBASE_URL } from "@/constants";
import PocketBase from "pocketbase";

export default async function middleware(request: NextRequest) {
  const pb = new PocketBase(POCKETBASE_URL);
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  const authCookie = request.cookies.get("pb_auth");

  if (authCookie) {
    pb.authStore.loadFromCookie(`${authCookie.name}=${authCookie.value}`);

    try {
      if (!pb.authStore.isValid)
        throw new Error("Invalid or expired user token");

      await pb.collection("users").authRefresh();
      response?.headers.set(
        "set-cookie",
        pb.authStore.exportToCookie({ httpOnly: false }),
      );
    } catch (error) {
      pb.authStore.clear();
      response.cookies.delete("pb_auth");
      console.error(error);
    }
  }

  if (
    pb.authStore.model &&
    PAGES_RESTRICTED_FROM_LOGEDIN_USERS.includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (
    !pb.authStore.model &&
    PAGES_RESTRICTED_FROM_LOGGEDOUT_USERS.includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images/favicon).*)",
  ],
};
