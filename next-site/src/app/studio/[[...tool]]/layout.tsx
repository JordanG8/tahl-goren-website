export const metadata = {
  title: "Sanity Studio - Tahl Goren",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
