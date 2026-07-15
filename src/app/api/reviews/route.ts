import { NextResponse } from "next/server";
import { getGoogleReviews } from "@/lib/googleReviews";

export const revalidate = 86400; // cache for 24 hours

export async function GET() {
  const result = await getGoogleReviews();
  if (!result) {
    return NextResponse.json({ reviews: [], error: "API key not configured" }, { status: 200 });
  }
  return NextResponse.json(result);
}
