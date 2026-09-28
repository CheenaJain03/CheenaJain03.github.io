import { useEffect, useState } from 'react'
import { profile, skills, experience, featured, otherProjects } from './data.js'

const links = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Featured', '#featured'],
  ['Experience', '#experience'],
  ['Contact', '#contact'],
]

function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved) return saved === 'dark'
    } catch {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {}
  }, [dark])
  return [dark, () => setDark((d) => !d)]
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-5xl scroll-mt-20 px-5 py-16">
      <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
        <span className="mr-2 text-teal-600 dark:text-teal-400">/</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function Tag({ children }) {
  return (
    <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 dark:bg-teal-950 dark:text-teal-300">
      {children}
    </span>
  )
}

function Button({ href, children, primary }) {
  const isPlaceholder = href === '#'
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      aria-disabled={isPlaceholder}
      className={
        'inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold transition ' +
        (primary
          ? 'bg-teal-600 text-white hover:bg-teal-700'
          : 'border border-slate-300 text-slate-700 hover:border-teal-600 hover:text-teal-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:text-teal-300')
      }
    >
      {children}
    </a>
  )
}

export default function App() {
  const [dark, toggle] = useTheme()

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <a href="#top" className="font-bold text-slate-900 dark:text-white">
            {profile.name}
          </a>
          <div className="flex items-center gap-5">
            <ul className="hidden gap-5 text-sm sm:flex">
              {links.map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="hover:text-teal-600 dark:hover:text-teal-400">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="rounded-md border border-slate-300 px-2.5 py-1 text-sm dark:border-slate-700"
            >
              {dark ? 'Light' : 'Dark'}
            </button>
          </div>
        </nav>
      </header>

      <main id="top">
        <div className="mx-auto max-w-5xl px-5 pb-8 pt-20 sm:pt-28">
          <p className="mb-3 text-sm font-medium text-teal-600 dark:text-teal-400">Hi, I am</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
            {profile.name}
          </h1>
          <p className="mt-2 text-xl text-slate-500 sm:text-2xl dark:text-slate-400">
            {profile.role} · {profile.location}
          </p>
          <p className="mt-6 max-w-2xl text-lg">{profile.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#featured" primary>
              See my work
            </Button>
            <Button href={profile.github}>GitHub</Button>
            <Button href={profile.resume}>Resume</Button>
          </div>
        </div>

        <Section id="about" title="About">
          <div className="max-w-3xl space-y-4">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="grid gap-6 sm:grid-cols-2">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {group}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="featured" title="Featured project">
          <article className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex h-44 items-center justify-center bg-gradient-to-br from-sky-400 via-cyan-500 to-teal-500 sm:h-56">
              {/* Replace with a screenshot: <img src="/aquadrop.png" ... /> */}
              <span className="text-4xl font-extrabold tracking-tight text-white drop-shadow sm:text-5xl">
                {featured.name}
              </span>
            </div>
            <div className="space-y-5 p-6 sm:p-8">
              <p className="text-lg text-slate-900 dark:text-white">{featured.summary}</p>
              <div>
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  The problem
                </h3>
                <p>{featured.problem}</p>
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  What I built
                </h3>
                <ul className="list-disc space-y-1 pl-5">
                  {featured.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-2">
                {featured.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-1">
                <Button href={featured.live} primary>
                  Live site
                </Button>
                <Button href={featured.code}>Source code</Button>
              </div>
            </div>
          </article>

          <h3 className="mb-4 mt-12 text-lg font-semibold text-slate-900 dark:text-white">
            Other work
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {otherProjects.map((p) => (
              <div
                key={p.name}
                className="rounded-xl border border-slate-200 p-5 dark:border-slate-800"
              >
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  {p.link ? (
                    <a href={p.link} target="_blank" rel="noreferrer" className="hover:text-teal-600">
                      {p.name}
                    </a>
                  ) : (
                    p.name
                  )}
                </h4>
                <p className="mb-3 mt-1 text-sm">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          {experience.map((e) => (
            <div key={e.company} className="border-l-2 border-teal-600 pl-5">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {e.title} · {e.company}
              </h3>
              <p className="mb-2 text-sm text-slate-500">{e.period}</p>
              <ul className="list-disc space-y-1 pl-5">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        <Section id="contact" title="Contact">
          <p className="mb-6 max-w-xl">
            Open to interesting projects and conversations. The best way to reach me is by email or
            LinkedIn.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={profile.email} primary>
              Email me
            </Button>
            <Button href={profile.linkedin}>LinkedIn</Button>
            <Button href={profile.github}>GitHub</Button>
          </div>
        </Section>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500 dark:border-slate-800">
        © {new Date().getFullYear()} {profile.name}. Built with React, Vite and Tailwind CSS.
      </footer>
    </>
  )
}
