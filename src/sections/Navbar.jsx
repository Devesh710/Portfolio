import { useEffect, useMemo, useState } from 'react';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const sectionIds = useMemo(() => navLinks.map((link) => link.href.replace('#', '')), []);
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const onScroll = () => {
      let current = activeId;
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          current = id;
          break;
        }
      }
      if (current !== activeId) setActiveId(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeId, sectionIds]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <h1 className="text-base font-semibold tracking-[0.35em] text-white/90">DEVESH PATEL</h1>
        <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.3em] md:flex">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '');
            const isActive = id === activeId;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`transition ${
                  isActive
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`mt-2 block h-[2px] w-full rounded-full transition ${
                    isActive ? 'bg-cyan-300' : 'bg-transparent'
                  }`}
                />
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
