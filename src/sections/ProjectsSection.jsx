import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const badgeStyles = [
  'bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-400/30',
  'bg-cyan-500/20 text-cyan-200 border-cyan-400/30',
  'bg-emerald-500/20 text-emerald-200 border-emerald-400/30',
  'bg-amber-500/20 text-amber-200 border-amber-400/30',
  'bg-indigo-500/20 text-indigo-200 border-indigo-400/30',
];

function getMediaType(src) {
  const lowered = (src || '').toLowerCase();
  if (lowered.endsWith('.mp4') || lowered.endsWith('.webm') || lowered.endsWith('.ogg')) {
    return 'video';
  }
  return 'image';
}

function normalizeGallery(project) {
  const raw = project.gallery && project.gallery.length ? project.gallery : [project.image].filter(Boolean);
  return raw.map((item) => {
    if (typeof item === 'string') {
      return { type: getMediaType(item), src: item };
    }
    return { type: item.type || getMediaType(item.src), src: item.src };
  });
}

function ProjectCard({ project, onOpenGallery }) {
  const hasLive = Boolean(project.live);
  const techs = project.tech || [];
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.45)] transition hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={project.image}
          alt={project.title}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        {hasLive ? (
          <a
            href={project.live || project.github || '#'}
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition duration-500 group-hover:opacity-100"
          >
            <span className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]">
              View Project
            </span>
          </a>
        ) : (
          <button
            type="button"
            onClick={() => onOpenGallery(project)}
            className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition duration-500 group-hover:opacity-100"
          >
            <span className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]">
              View Project
            </span>
          </button>
        )}
      </div>

      <div className="mt-5">
        <h4 className="text-lg font-semibold text-white">{project.title}</h4>
        <p className="mt-1 text-sm text-white/60">{project.desc}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {techs.map((tech, index) => (
            <span
              key={`${project.id}-${tech}`}
              className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                badgeStyles[index % badgeStyles.length]
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection({ projects }) {
  const [lightbox, setLightbox] = React.useState({
    open: false,
    items: [],
    index: 0,
    title: '',
  });

  const openGallery = (project) => {
    const items = normalizeGallery(project);
    if (!items.length) return;
    setLightbox({ open: true, items, index: 0, title: project.title });
  };

  const closeGallery = () => {
    setLightbox((prev) => ({ ...prev, open: false }));
  };

  const goPrev = () => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + prev.items.length) % prev.items.length,
    }));
  };

  const goNext = () => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.items.length,
    }));
  };

  React.useEffect(() => {
    if (!lightbox.open) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeGallery();
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightbox.open]);

  const activeItem = lightbox.items[lightbox.index];

  return (
    <section id="projects" className="bg-slate-950 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          variants={fadeUp}
          className="text-left"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Selected Work</p>
          <h2 className="mt-3 text-3xl font-semibold uppercase tracking-[0.25em] text-white">Projects</h2>
          <div className="mt-4 h-[2px] w-24 bg-fuchsia-400/70" />
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpenGallery={openGallery} />
          ))}
        </div>
      </div>

      {lightbox.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <button
            type="button"
            onClick={closeGallery}
            className="absolute right-6 top-6 text-2xl text-white/80 hover:text-white"
            aria-label="Close gallery"
          >
            &times;
          </button>

          <button
            type="button"
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/10 px-4 py-3 text-white"
            aria-label="Previous"
          >
            &lsaquo;
          </button>

          <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl">
            <div className="relative bg-black">
              {activeItem?.type === 'video' ? (
                <video src={activeItem.src} controls className="h-[70vh] w-full object-contain" />
              ) : (
                <img src={activeItem?.src} alt={lightbox.title} className="h-[70vh] w-full object-contain" />
              )}
              <div className="absolute bottom-3 right-4 text-xs text-white/80">
                {lightbox.index + 1} of {lightbox.items.length}
              </div>
            </div>
            <div className="px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
              {lightbox.title}
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/10 px-4 py-3 text-white"
            aria-label="Next"
          >
            &rsaquo;
          </button>
        </div>
      )}
    </section>
  );
}
