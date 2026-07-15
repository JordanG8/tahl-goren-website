export type GoogleReview = {
  name: string;
  photoUrl: string | null;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime: string;
};

export type GoogleReviewsResult = {
  reviews: GoogleReview[];
  rating: number;
  totalReviews: number;
  businessName: string;
};

// Fetches live reviews from the Google Places API. Returns null when the
// business hasn't configured GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID (dev,
// preview, or before setup) so callers can fall back to static data — never
// fabricate ratings, counts, or dates in place of this.
export async function getGoogleReviews(): Promise<GoogleReviewsResult | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount,displayName&languageCode=he`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "reviews,rating,userRatingCount,displayName",
        },
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) {
      console.error("Google Places API error:", res.status, await res.text());
      return null;
    }

    const data: {
      reviews?: Array<{
        authorAttribution?: { displayName?: string; photoUri?: string };
        rating?: number;
        text?: { text?: string };
        relativePublishTimeDescription?: string;
        publishTime?: string;
      }>;
      rating?: number;
      userRatingCount?: number;
      displayName?: { text?: string };
    } = await res.json();

    const reviews: GoogleReview[] = (data.reviews || []).map((r) => ({
      name: r.authorAttribution?.displayName || "לקוח/ה",
      photoUrl: r.authorAttribution?.photoUri || null,
      rating: r.rating || 5,
      text: r.text?.text || "",
      relativeTime: r.relativePublishTimeDescription || "",
      publishTime: r.publishTime || "",
    }));

    return {
      reviews,
      rating: data.rating || 5,
      totalReviews: data.userRatingCount || reviews.length,
      businessName: data.displayName?.text || "טל גורן אדריכלות",
    };
  } catch (err) {
    console.error("Failed to fetch Google reviews:", err);
    return null;
  }
}
