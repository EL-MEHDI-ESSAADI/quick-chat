import {
  PAGES_RESTRICTED_FROM_LOGEDIN_USERS,
  PAGES_RESTRICTED_FROM_LOGGEDOUT_USERS,
} from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import { pb } from "./lib/modules";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  const authCookie = request.cookies.get("pb_auth");

  pb.authStore.onChange(() => {
    response?.headers.set("set-cookie", pb.authStore.exportToCookie());
  });

  if (authCookie)
    pb.authStore.loadFromCookie(`${authCookie.name}=${authCookie.value}`);

  try {
    if (pb.authStore.isValid) await pb.collection("users").authRefresh();
  } catch (error) {
    pb.authStore.clear();
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
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
