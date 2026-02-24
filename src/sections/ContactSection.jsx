import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const links = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/Devesh710', Icon: Github },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/devesh-patel-53744b31a/',
    Icon: Linkedin,
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="bg-slate-950 py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          variants={fadeUp}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Let's Connect</p>
          <h2 className="mt-4 text-3xl font-semibold uppercase tracking-[0.25em] text-white">Contact</h2>
          <div className="mx-auto mt-4 h-[2px] w-20 bg-cyan-300/70" />
          <p className="mt-6 text-base text-white/70">
            Feel free to reach out through any platform below or drop me an email.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {links.map(({ id, label, href, Icon }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white/80 transition hover:border-cyan-300/60 hover:text-white hover:shadow-glow"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>

          <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/70">
            <Mail className="h-4 w-4 text-cyan-300" />
            deveshpatel710@example.com
          </div>
        </motion.div>
      </div>
    </section>
  );
}
