import { NextRequest, NextResponse } from "next/server";

// Protect the admin panel and its API with server-side HTTP Basic Auth.
// Credentials travel in the Authorization header (never a URL query string,
// so they are not logged by the edge/CDN, browser history, or referrers).
// There is intentionally NO password fallback: if ADMIN_PASSWORD is unset the
// panel is unavailable rather than open with a well-known default.
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

function decodeBase64Utf8(input: string): string {
  const bytes = Uint8Array.from(atob(input), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

// Length-aware constant-time-ish comparison to avoid trivial timing leaks.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

const UNAUTHORIZED = () =>
  new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });

export function middleware(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;

  // No credential configured → deny access entirely (no insecure default).
  if (!expected) {
    return new NextResponse("Admin access is not configured.", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const header = req.headers.get("authorization");
  if (header) {
    const [scheme, encoded] = header.split(" ");
    if (scheme === "Basic" && encoded) {
      try {
        const decoded = decodeBase64Utf8(encoded);
        const sep = decoded.indexOf(":");
        const password = sep === -1 ? decoded : decoded.slice(sep + 1);
        if (safeEqual(password, expected)) {
          return NextResponse.next();
        }
      } catch {
        // fall through to challenge
      }
    }
  }

  return UNAUTHORIZED();
}
