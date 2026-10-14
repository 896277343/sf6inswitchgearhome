// Proxy for lightweight auth checks on protected admin routes
import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n/config";

const protectedRoutes = ["/admin"];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const authCookie = request.cookies.get("admin_auth");

    if (!authCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const firstSegment = pathname.split("/")[1];
  if (!isLocale(firstSegment)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

    // Behind a TLS-terminating reverse proxy, Next can see an internal
    // localhost URL combined with the public HTTPS protocol. Rewriting that
    // URL would make the standalone server try TLS against its plain HTTP
    // listener and fail with EPROTO. Keep localhost rewrites internal HTTP.
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      url.protocol = "http:";
    }
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!api|admin|_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
