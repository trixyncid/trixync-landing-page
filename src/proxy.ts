import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/** The single host that canonical + hreflang URLs are built from. */
const CANONICAL_HOST = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://trixync.id").host;
  } catch {
    return "trixync.id";
  }
})();

/** The www/apex counterpart of the canonical host (the only host we redirect). */
const ALTERNATE_HOST = CANONICAL_HOST.startsWith("www.")
  ? CANONICAL_HOST.slice(4)
  : `www.${CANONICAL_HOST}`;

export default function middleware(request: NextRequest) {
  const host = request.headers.get("host");

  // Keep canonical + hreflang honest: send the www/apex variant to the one host
  // the canonical tags point at, so a page's URL always matches its canonical.
  // Localhost and preview (*.vercel.app) hosts are left untouched.
  if (host === ALTERNATE_HOST) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(en|id|zh)/:path*"],
};
