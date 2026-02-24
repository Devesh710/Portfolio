import { useState } from 'react';

const emptySkill = { name: '', src: '', alt: '' };
const emptyProject = { title: '', desc: '', tech: '', image: '', live: '', github: '' };

function SkillsManager({ skills, onSave }) {
  const [form, setForm] = useState(emptySkill);
  const [editingId, setEditingId] = useState(null);

  const submit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.src.trim()) return;

    if (editingId) {
      onSave(
        skills.map((skill) =>
          skill.id === editingId
            ? {
                ...skill,
                name: form.name.trim(),
                src: form.src.trim(),
                alt: form.alt.trim() || `${form.name.trim()} logo`,
              }
            : skill,
        ),
      );
    } else {
      onSave([
        ...skills,
        {
          id: Date.now(),
          name: form.name.trim(),
          src: form.src.trim(),
          alt: form.alt.trim() || `${form.name.trim()} logo`,
        },
      ]);
    }

    setForm(emptySkill);
    setEditingId(null);
  };

  const edit = (skill) => {
    setForm({ name: skill.name || '', src: skill.src || '', alt: skill.alt || '' });
    setEditingId(skill.id);
  };

  const remove = (id) => {
    onSave(skills.filter((skill) => skill.id !== id));
    if (editingId === id) {
      setForm(emptySkill);
      setEditingId(null);
    }
  };

  return (
    <section className="rounded-lg border p-4">
      <h2 className="text-xl font-semibold">Skills</h2>

      <form onSubmit={submit} className="mt-4 grid gap-3 md:grid-cols-3">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Skill name"
          className="rounded-md border px-3 py-2"
        />
        <input
          value={form.src}
          onChange={(e) => setForm({ ...form, src: e.target.value })}
          placeholder="Image path (/images/react.png)"
          className="rounded-md border px-3 py-2"
        />
        <input
          value={form.alt}
          onChange={(e) => setForm({ ...form, alt: e.target.value })}
          placeholder="Alt text"
          className="rounded-md border px-3 py-2"
        />

        <button type="submit" className="rounded-md bg-black px-4 py-2 text-white md:col-span-1">
          {editingId ? 'Update Skill' : 'Add Skill'}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setForm(emptySkill);
              setEditingId(null);
            }}
            className="rounded-md border px-4 py-2"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="mt-4 space-y-2">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center justify-between rounded-md border px-3 py-2">
            <p className="text-sm">
              <span className="font-medium">{skill.name || skill.alt}</span> - {skill.src}
            </p>
            <div className="flex gap-2">
              <button onClick={() => edit(skill)} className="rounded border px-2 py-1 text-sm">
                Edit
              </button>
              <button onClick={() => remove(skill.id)} className="rounded border px-2 py-1 text-sm text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsManager({ projects, onSave }) {
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);

  const submit = (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.desc.trim()) return;

    const nextProject = {
      title: form.title.trim(),
      desc: form.desc.trim(),
      tech: form.tech
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      image: form.image.trim(),
      live: form.live.trim(),
      github: form.github.trim(),
    };

    if (editingId) {
      onSave(projects.map((project) => (project.id === editingId ? { ...project, ...nextProject } : project)));
    } else {
      onSave([...projects, { id: Date.now(), ...nextProject }]);
    }

    setForm(emptyProject);
    setEditingId(null);
  };

  const edit = (project) => {
    setForm({
      title: project.title || '',
      desc: project.desc || '',
      tech: Array.isArray(project.tech) ? project.tech.join(', ') : '',
      image: project.image || '',
      live: project.live || '',
      github: project.github || '',
    });
    setEditingId(project.id);
  };

  const remove = (id) => {
    onSave(projects.filter((project) => project.id !== id));
    if (editingId === id) {
      setForm(emptyProject);
      setEditingId(null);
    }
  };

  return (
    <section className="rounded-lg border p-4">
      <h2 className="text-xl font-semibold">Projects</h2>

      <form onSubmit={submit} className="mt-4 grid gap-3 md:grid-cols-2">
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Project title"
          className="rounded-md border px-3 py-2"
        />
        <input
          value={form.tech}
          onChange={(e) => setForm({ ...form, tech: e.target.value })}
          placeholder="Tech stack (comma separated)"
          className="rounded-md border px-3 py-2"
        />
        <textarea
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
          placeholder="Description"
          className="rounded-md border px-3 py-2 md:col-span-2"
        />
        <input
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          placeholder="Image path"
          className="rounded-md border px-3 py-2"
        />
        <input
          value={form.live}
          onChange={(e) => setForm({ ...form, live: e.target.value })}
          placeholder="Live URL"
          className="rounded-md border px-3 py-2"
        />
        <input
          value={form.github}
          onChange={(e) => setForm({ ...form, github: e.target.value })}
          placeholder="GitHub URL"
          className="rounded-md border px-3 py-2 md:col-span-2"
        />

        <button type="submit" className="rounded-md bg-black px-4 py-2 text-white">
          {editingId ? 'Update Project' : 'Add Project'}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setForm(emptyProject);
              setEditingId(null);
            }}
            className="rounded-md border px-4 py-2"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="mt-4 space-y-2">
        {projects.map((project) => (
          <div key={project.id} className="flex items-start justify-between rounded-md border px-3 py-2">
            <div>
              <p className="font-medium">{project.title}</p>
              <p className="text-sm text-gray-600">{project.desc}</p>
            </div>
            <div className="ml-4 flex gap-2">
              <button onClick={() => edit(project)} className="rounded border px-2 py-1 text-sm">
                Edit
              </button>
              <button onClick={() => remove(project.id)} className="rounded border px-2 py-1 text-sm text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function AdminDashboard({ skills, projects, onSaveSkills, onSaveProjects, onLogout }) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <div className="flex gap-3">
          <a href="/" className="rounded-md border px-4 py-2">
            View Site
          </a>
          <button onClick={onLogout} className="rounded-md bg-black px-4 py-2 text-white">
            Logout
          </button>
        </div>
      </header>

      <div className="grid gap-6">
        <SkillsManager skills={skills} onSave={onSaveSkills} />
        <ProjectsManager projects={projects} onSave={onSaveProjects} />
      </div>
    </main>
  );
}