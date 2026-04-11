import { client } from "../client";
import { token } from "../env";

export async function sanityFetch<T>({
  query,
  params = {},
}: {
  query: string;
  params?: Record<string, unknown>;
}): Promise<T> {
  return client.fetch<T>(query, params, {
    ...(token ? { token } : {}),
    next: { revalidate: 60 },
  });
}
