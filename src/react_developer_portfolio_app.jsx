/*
React single-file portfolio component (App.jsx)
Instructions:
1. Create a new React app (Vite recommended) and install TailwindCSS.
   npx create-vite@latest my-portfolio --template react
   cd my-portfolio
   Follow Tailwind install steps: https://tailwindcss.com/docs/guides/vite

2. Optional packages (used in this file):
   npm install framer-motion lucide-react

3. Replace src/App.jsx with this file content and ensure Tailwind is configured.
4. Run: npm run dev

Customize the `projects` array below with your project links, images, and descriptions.
*/

import React from 'react';
import { Mail, DownloadCloud, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Project One',
    description: 'A short description of project one — what it does and the tech used.',
    tech: ['React', 'Node', 'MongoDB'],
    link: '#',
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'A short description of project two — highlight the challenge solved.',
    tech: ['TypeScript', 'Tailwind'],
    link: '#',
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'A short description of project three — add measurable impact if possible.',
    tech: ['React Native', 'Expo'],
    link: '#',
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <header className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">YourName<span className="text-indigo-600">.</span></h1>
        <nav className="space-x-4 hidden sm:flex">
          <a href="#about" className="text-sm hover:underline">About</a>
          <a href="#projects" className="text-sm hover:underline">Projects</a>
          <a href="#skills" className="text-sm hover:underline">Skills</a>
          <a href="#contact" className="text-sm hover:underline">Contact</a>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* HERO */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <p className="text-sm uppercase text-indigo-600 font-medium">Hi, I'm</p>
            <h2 className="mt-2 text-4xl font-extrabold">Your Name — Frontend Developer</h2>
            <p className="mt-4 text-slate-600">I build fast, accessible, and beautiful web applications using React and modern web tooling. I love turning ideas into products.</p>

            <div className="mt-6 flex gap-3 items-center">
              <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow-sm hover:brightness-95">Contact me <Mail size={16} /></a>
              <a href="/resume.pdf" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm hover:bg-slate-50"><DownloadCloud size={16}/> Resume</a>
            </div>

            <div className="mt-6 flex gap-4 items-center">
              <a href="#" aria-label="github" className="hover:text-slate-700"><Github /></a>
              <a href="#" aria-label="linkedin" className="hover:text-slate-700"><Linkedin /></a>
            </div>
          </motion.div>

          <motion.div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4" initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.45 }}>
            <div className="h-48 bg-gradient-to-tr from-indigo-50 to-indigo-100 rounded-lg flex items-center justify-center text-indigo-700 font-semibold">Screenshot / Image</div>
            <div className="text-sm text-slate-600">Short blurb about your most important project or current work. Add a link to live demo or GitHub.</div>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 rounded-md border">React</span>
              <span className="text-xs px-2 py-1 rounded-md border">Tailwind</span>
              <span className="text-xs px-2 py-1 rounded-md border">Vite</span>
            </div>
          </motion.div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mt-16">
          <h3 className="text-2xl font-semibold">About me</h3>
          <p className="mt-4 text-slate-600 max-w-3xl">I'm a developer focused on building performant, maintainable frontend applications. I enjoy collaborating with designers and backend engineers to deliver polished user experiences. Currently open to freelance and full-time opportunities.</p>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mt-12">
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-semibold">Selected Projects</h3>
            <a href="#projects" className="text-sm text-indigo-600 hover:underline">View all</a>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <motion.a key={p.id} href={p.link} className="block bg-white rounded-2xl p-4 shadow-sm hover:shadow-md hover:translate-y-[-4px] transform transition" whileHover={{ scale: 1.02 }}>
                <h4 className="font-semibold">{p.title}</h4>
                <p className="mt-2 text-sm text-slate-600">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-md border">{t}</span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="mt-12">
          <h3 className="text-2xl font-semibold">Skills</h3>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Node.js', 'Tailwind', 'Git'].map((s) => (
              <div key={s} className="bg-white rounded-lg p-3 text-center text-sm shadow-sm">{s}</div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-12">
          <h3 className="text-2xl font-semibold">Contact</h3>
          <p className="mt-2 text-slate-600">Want to work together? Send a message — I'll reply as soon as I can.</p>

          <form className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <input placeholder="Your name" className="p-3 rounded-lg border" />
            <input placeholder="Email" className="p-3 rounded-lg border" />
            <input placeholder="Subject" className="p-3 rounded-lg border sm:col-span-2" />
            <textarea placeholder="Message" className="p-3 rounded-lg border sm:col-span-2 h-32" />
            <button type="submit" className="sm:col-span-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-indigo-600 text-white font-medium">Send message</button>
          </form>
        </section>

        <footer className="mt-16 border-t pt-6 text-sm text-slate-500">© {new Date().getFullYear()} Your Name — Built with React.</footer>
      </main>
    </div>
  );
}
