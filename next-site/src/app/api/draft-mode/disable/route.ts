import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const url = new URL(request.url);
  (await draftMode()).disable();
  redirect(url.searchParams.get("redirect") || "/");
}
