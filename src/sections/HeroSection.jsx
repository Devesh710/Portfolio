import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-slate-950 pb-24 pt-28 text-white sm:pb-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-fuchsia-500/30 blur-[120px] animate-blob" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-400/30 blur-[130px] animate-blob [animation-delay:4s]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo-500/20 blur-[140px] animate-blob [animation-delay:8s]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          variants={fadeUp}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Welcome to my space</p>
          <h1 className="mt-6 text-4xl font-semibold uppercase tracking-[0.15em] sm:text-6xl">
            Hi, I am
          </h1>
          <h2 className="mt-3 text-5xl font-bold sm:text-7xl">
            <span className="gradient-text">Devesh Patel</span>
          </h2>
          <p className="mt-6 text-sm uppercase tracking-[0.35em] text-slate-200 sm:text-base">
            <span className="typing">Beginner Flutter &amp; Web Developer</span>
          </p>
          <a
            className="mt-12 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:shadow-glow"
            href="/download/Devesh_Patel-Resume.pdf"
            download
          >
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
