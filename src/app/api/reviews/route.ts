import { NextResponse } from "next/server";

export const revalidate = 86400; // cache for 24 hours

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json({ reviews: [], error: "API key not configured" }, { status: 200 });
  }

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
      const text = await res.text();
      console.error("Google Places API error:", res.status, text);
      return NextResponse.json({ reviews: [], error: "API request failed" }, { status: 200 });
    }

    const data = await res.json();

    const reviews = (data.reviews || []).map((r: any) => ({
      name: r.authorAttribution?.displayName || "לקוח/ה",
      photoUrl: r.authorAttribution?.photoUri || null,
      rating: r.rating || 5,
      text: r.text?.text || "",
      relativeTime: r.relativePublishTimeDescription || "",
      publishTime: r.publishTime || "",
    }));

    return NextResponse.json({
      reviews,
      rating: data.rating || 5,
      totalReviews: data.userRatingCount || reviews.length,
      businessName: data.displayName?.text || "טל גורן אדריכלות",
    });
  } catch (err) {
    console.error("Failed to fetch Google reviews:", err);
    return NextResponse.json({ reviews: [], error: "fetch failed" }, { status: 200 });
  }
}
