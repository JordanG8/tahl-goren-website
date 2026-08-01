// Filled SVG stars (Google-yellow) — the material-symbols "star" glyph is an
// outline by default, which reads as an *empty* rating, so never use it here.
export default function StarRating({
  rating,
  className = "w-4 h-4",
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`דירוג ${rating} מתוך 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={className}
          fill={i < rating ? "#FBBC04" : "#E8EAED"}
          aria-hidden="true"
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}
