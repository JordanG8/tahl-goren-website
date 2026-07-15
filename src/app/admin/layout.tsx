import type { Metadata } from "next";

// Keep the admin area out of search indexes as defense-in-depth.
// (Access is already gated server-side by middleware Basic Auth.)
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
