import Link from 'next/link';
import Image from 'next/image';
import { projectsBySlug } from '@/data/projectsContent';
import { ArrowIcon } from '@/components/ui/Icon';

type Project = { id: string; title: string; location: string; image: string; originalLink?: string };

/**
 * Portfolio card.
 *
 * The caption used to sit *on* the photograph as an opaque navy bar, which
 * covered the bottom third of every image — the worst place to put a slab on
 * architectural photography, where the ground plane lives. It now sits below
 * the frame, separated by a hairline, so the work is never obscured and the
 * grid reads like a plate section in a monograph.
 */
export default function ProjectCard({
  project,
  size = 'md',
  priority = false,
  showTeaser = true,
}: {
  project: Project;
  /** `lg` is the lead plate in an editorial row; `sm` suits stacked columns. */
  size?: 'sm' | 'md' | 'lg';
  priority?: boolean;
  showTeaser?: boolean;
}) {
  const teaser = projectsBySlug[project.id]?.description;

  const aspect = {
    sm: 'aspect-[4/3]',
    md: 'aspect-[4/3]',
    lg: 'aspect-[16/11]',
  }[size];

  const titleSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl sm:text-2xl',
  }[size];

  const sizes = {
    sm: '(max-width: 768px) 100vw, 30vw',
    md: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    lg: '(max-width: 1024px) 100vw, 58vw',
  }[size];

  return (
    <Link href={`/projects/${project.id}`} className="group block">
      <div className={`${aspect} overflow-hidden relative bg-surface-container`}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes={sizes}
          className="object-cover img-grayscale"
          loading={priority ? undefined : 'lazy'}
          priority={priority}
        />
      </div>

      <div className="pt-4 mt-4 border-t border-hairline flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3
            className={`font-headline font-bold ${titleSize} text-primary leading-snug transition-colors duration-300 group-hover:text-clay`}
          >
            {project.title}
          </h3>
          <span className="font-label font-medium text-[13px] uppercase tracking-[0.15em] text-ink-mute mt-1.5 block">
            {project.location}
          </span>
          {showTeaser && teaser && size !== 'sm' && (
            <p className="font-body text-base text-secondary leading-relaxed mt-3 line-clamp-2 measure">
              {teaser}
            </p>
          )}
        </div>
        <ArrowIcon
          size={size === 'lg' ? 22 : 18}
          className="text-ink-mute mt-1 transition-all duration-500 group-hover:text-clay group-hover:-translate-x-1.5"
        />
      </div>
    </Link>
  );
}
