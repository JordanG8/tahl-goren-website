import Link from 'next/link';
import Image from 'next/image';

export default function ProjectCard({ project }: { project: { id: string; title: string; location: string; image: string; originalLink?: string } }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block relative overflow-hidden card-hover"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover img-grayscale"
          loading="lazy"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-primary px-4 py-3 flex justify-between items-center">
        <div className="flex flex-col text-right">
          <h3 className="font-headline font-light text-[10px] sm:text-[11px] text-white uppercase tracking-[0.15em] leading-tight">{project.title}</h3>
          <span className="font-label text-white/50 text-[8px] sm:text-[9px] uppercase tracking-[0.2em] mt-0.5">{project.location}</span>
        </div>
        <span className="material-symbols-outlined text-white text-sm translate-x-0 group-hover:-translate-x-1 transition-transform duration-300">arrow_back</span>
      </div>
    </Link>
  );
}
