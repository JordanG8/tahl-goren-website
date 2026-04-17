export type GoogleReview = {
  name: string;
  photoUrl: string | null;
  rating: number;
  text: string;
  relativeTime: string;
};

export async function getGoogleReviews(): Promise<{
  reviews: GoogleReview[];
  rating: number;
  totalReviews: number;
} | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount&languageCode=he`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "reviews,rating,userRatingCount",
        },
        cache: 'no-store',
      }
    );
    if (!res.ok) {
      console.error("Google API failed:", res.status, await res.text());
      return null;
    }
    const data = await res.json();
    return {
      reviews: (data.reviews || []).map((r: any) => ({
        name: r.authorAttribution?.displayName || "לקוח/ה",
        photoUrl: r.authorAttribution?.photoUri || null,
        rating: r.rating || 5,
        text: r.text?.text || "",
        relativeTime: r.relativePublishTimeDescription || "",
      })),
      rating: data.rating || 5,
      totalReviews: data.userRatingCount || 0,
    };
  } catch {
    return null;
  }
}
