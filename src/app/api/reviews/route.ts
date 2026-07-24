import { NextResponse } from "next/server";
import { getReviews } from "@/lib/reviews";

export const revalidate = 86400; // cache for 24 hours

export async function GET() {
  const result = await getReviews();
  return NextResponse.json(result);
}
