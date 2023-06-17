import { PAGES_RESTRICTED_FROM_LOGEDIN_USERS, PAGES_RESTRICTED_FROM_LOGGEDOUT_USERS } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import { pb } from "./lib/modules";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let isUserLoggedIn = false;

  const authCookie = request.cookies.get("pb_auth");

  if (authCookie) {
    pb.authStore.loadFromCookie(`${authCookie.name}=${authCookie.value}`);

    if (pb.authStore.isValid) isUserLoggedIn = true;
  }

  if (isUserLoggedIn && PAGES_RESTRICTED_FROM_LOGEDIN_USERS.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isUserLoggedIn && PAGES_RESTRICTED_FROM_LOGGEDOUT_USERS.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
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
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
