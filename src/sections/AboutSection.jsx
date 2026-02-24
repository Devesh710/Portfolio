import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

const socialLinks = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/Devesh710', Icon: Github },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/devesh-patel-53744b31a/', Icon: Linkedin },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const tools = [
  { src: '/images/tools logo/VsCode_logo.png', alt: 'VS Code' },
  { src: '/images/tools logo/android_studio-logo.svg', alt: 'Android Studio' },
  { src: '/images/tools logo/MongoDB.webp', alt: 'MongoDB' },
  { src: '/images/tools logo/Git-logo.png', alt: 'Git' },
  { src: '/images/tools logo/Github-logo.svg', alt: 'GitHub' },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-slate-950 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          variants={fadeUp}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold uppercase tracking-[0.3em] text-white">About Me</h2>
          <div className="mx-auto mt-3 h-[2px] w-20 bg-cyan-300/60" />
        </motion.div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            variants={fadeUp}
          >
            <h3 className="text-xl font-semibold text-white">
              I'm a frontend-focused web developer building and managing the front end of websites and web applications that drive product success.
            </h3>
            <h3 className="mt-4 text-xl font-semibold text-white">
              As a fresher in app development, I'm expanding my skills into creating mobile and utility apps with modern frameworks.
            </h3>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="glass-panel p-5 shadow-[0_12px_40px_rgba(15,23,42,0.35)] transition hover:-translate-y-1">
                <h4 className="text-sm font-semibold text-white">Languages</h4>
                <p className="mt-3 text-sm text-white/70">
                  HTML, CSS, JavaScript, Flutter, React JS, Node JS, Python, Java, C++.
                </p>
              </div>
              <div className="glass-panel p-5 shadow-[0_12px_40px_rgba(15,23,42,0.35)] transition hover:-translate-y-1">
                <h4 className="text-sm font-semibold text-white">Education</h4>
                <p className="mt-3 text-sm text-white/70">BCA from Win Informative Network.</p>
              </div>
              <div className="glass-panel p-5 shadow-[0_12px_40px_rgba(15,23,42,0.35)] transition hover:-translate-y-1">
                <h4 className="text-sm font-semibold text-white">Projects</h4>
                <p className="mt-3 text-sm text-white/70">Built more than 5 projects.</p>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Tools I Use</p>
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-5">
                {tools.map((tool) => (
                  <div
                    key={tool.alt}
                    className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/60 p-3 transition hover:-translate-y-1 hover:shadow-glow"
                  >
                    <img src={tool.src} alt={tool.alt} className="h-8 w-8 object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            variants={fadeUp}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 shadow-[0_25px_60px_rgba(56,189,248,0.25)]">
              <img
                src="/images/LinkedDP_Devesh.jpg"
                alt="profile"
                className="h-96 w-full object-contain animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 gap-3 rounded-full border border-white/10 bg-slate-900/70 px-5 py-3 shadow-lg backdrop-blur-xl">
              {socialLinks.map(({ id, href, label, Icon }) => (
                <a
                  key={id}
                  href={href}
                  aria-label={label}
                  className="rounded-full bg-white/10 p-2 text-white/70 transition hover:text-white hover:shadow-glow"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
