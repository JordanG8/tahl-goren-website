import type { SiteReviews, SiteReview } from "./reviews";

// Google Business Profile API — the listing owner's own data. Unlike the
// public Places API (hard-capped at 5 reviews), this returns every review on
// the listing, plus the true average rating and total count.
//
// Requires a one-time setup by the account that owns/manages the listing:
//   GBP_CLIENT_ID / GBP_CLIENT_SECRET  — OAuth client in the same GCP project
//   GBP_REFRESH_TOKEN                  — from a consent grant with the
//                                        business.manage scope
//   GBP_ACCOUNT_ID / GBP_LOCATION_ID   — optional ("accounts/123",
//                                        "locations/456"); auto-discovered
//                                        (and logged) when absent.
// Returns null when unconfigured or on any API failure so callers fall
// through to the Places tier.

const STAR_MAP: Record<string, number> = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

type GbpReview = {
  reviewer?: { displayName?: string; profilePhotoUrl?: string };
  starRating?: string;
  comment?: string;
  createTime?: string;
};

type GbpReviewsPage = {
  reviews?: GbpReview[];
  averageRating?: number;
  totalReviewCount?: number;
  nextPageToken?: string;
};

// Review dates render as Google-style relative text ("לפני 3 חודשים"),
// recomputed on each ISR regeneration (daily), matching Maps' own display.
function relativeTimeHe(iso: string): string {
  const rtf = new Intl.RelativeTimeFormat("he", { numeric: "auto" });
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days < 1) return rtf.format(0, "day");
  if (days < 7) return rtf.format(-days, "day");
  if (days < 31) return rtf.format(-Math.floor(days / 7), "week");
  if (days < 365) return rtf.format(-Math.floor(days / 30), "month");
  return rtf.format(-Math.floor(days / 365), "year");
}

async function getAccessToken(clientId: string, clientSecret: string, refreshToken: string) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error(`GBP token exchange failed: ${res.status} ${await res.text()}`);
  const data: { access_token?: string } = await res.json();
  if (!data.access_token) throw new Error("GBP token exchange returned no access_token");
  return data.access_token;
}

async function gbpGet<T>(url: string, token: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`GBP request failed: ${res.status} ${await res.text()} (${url})`);
  return res.json();
}

async function resolveIds(token: string): Promise<{ accountId: string; locationId: string }> {
  const envAccount = process.env.GBP_ACCOUNT_ID;
  const envLocation = process.env.GBP_LOCATION_ID;
  if (envAccount && envLocation) return { accountId: envAccount, locationId: envLocation };

  const accountsData = await gbpGet<{ accounts?: Array<{ name?: string }> }>(
    "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
    token
  );
  const accountId = accountsData.accounts?.[0]?.name;
  if (!accountId) throw new Error("GBP: no accounts visible to this OAuth grant");

  const locationsData = await gbpGet<{
    locations?: Array<{ name?: string; title?: string; metadata?: { placeId?: string } }>;
  }>(
    `https://mybusinessbusinessinformation.googleapis.com/v1/${accountId}/locations?readMask=name,title,metadata&pageSize=100`,
    token
  );
  const locations = locationsData.locations || [];
  const wanted = process.env.GOOGLE_PLACE_ID;
  const location =
    (wanted && locations.find((l) => l.metadata?.placeId === wanted)) || locations[0];
  if (!location?.name) throw new Error("GBP: no locations visible to this OAuth grant");

  // Surface the resolved IDs in build/function logs so they can be pinned as
  // env vars, skipping discovery (two API calls) on future builds.
  console.log(`GBP resolved ${accountId} / ${location.name} (${location.title ?? "?"})`);
  return { accountId, locationId: location.name };
}

export async function getBusinessProfileReviews(): Promise<SiteReviews | null> {
  const clientId = process.env.GBP_CLIENT_ID;
  const clientSecret = process.env.GBP_CLIENT_SECRET;
  const refreshToken = process.env.GBP_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return null;

  try {
    const token = await getAccessToken(clientId, clientSecret, refreshToken);
    const { accountId, locationId } = await resolveIds(token);

    const all: GbpReview[] = [];
    let averageRating = 0;
    let totalReviewCount = 0;
    let pageToken: string | undefined;

    // 50 per page is the v4 maximum; 200 total is plenty for display and
    // keeps build time bounded no matter how the listing grows.
    do {
      const url =
        `https://mybusiness.googleapis.com/v4/${accountId}/${locationId}/reviews?pageSize=50` +
        (pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : "");
      const page = await gbpGet<GbpReviewsPage>(url, token);
      all.push(...(page.reviews || []));
      averageRating = page.averageRating ?? averageRating;
      totalReviewCount = page.totalReviewCount ?? totalReviewCount;
      pageToken = page.nextPageToken;
    } while (pageToken && all.length < 200);

    // Star-only reviews (no text) count toward the total but aren't worth a
    // card; Maps hides them behind a filter too.
    const reviews: SiteReview[] = all
      .filter((r) => (r.comment || "").trim().length > 0)
      .map((r) => ({
        name: r.reviewer?.displayName || "לקוח/ה",
        photoUrl: r.reviewer?.profilePhotoUrl || null,
        rating: STAR_MAP[r.starRating || ""] || 5,
        text: (r.comment || "").trim(),
        relativeTime: r.createTime ? relativeTimeHe(r.createTime) : undefined,
        publishTime: r.createTime,
      }));

    return {
      source: "business-profile",
      rating: averageRating || 5,
      totalReviews: totalReviewCount || reviews.length,
      reviews,
    };
  } catch (err) {
    console.error("Business Profile API failed, falling back to Places:", err);
    return null;
  }
}
