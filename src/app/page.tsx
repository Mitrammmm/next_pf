"use client"

import React, { useEffect, useRef, useState } from "react";

export default function Page() {
  // ----- sample data -----
  const projects = [
    {
      id: 1,
      title: "Social Gauge",
      desc: "Social Gauge leverages AI to revolutionize social media engagement with smart analytics and content optimization.",
      img: "/mnt/data/1110429e-0e88-44cd-a509-978a07b7ab52.png",
      live: "https://example.com",
      github: "https://github.com/you/social-gauge",
      tags: ["React.js", "Node.js", "LLM", "OpenAI API"],
    },
    {
      id: 2,
      title: "DevProcon",
      desc: "A cutting-edge real estate and portfolio website designed to empower businesses.",
      img: "/bg1.jpg",
      live: "https://example.com",
      github: "https://github.com/you/devprocon",
      tags: ["Tailwind CSS", "React.js", "TypeScript"],
    },
    {
      id: 3,
      title: "GMIU e-Learning",
      desc: "E-learning platform for university using the Moodle framework.",
      img: "/mnt/data/8fac9a98-33e7-4351-8757-c919f7441f1a.png",
      live: "https://example.com",
      github: "https://github.com/you/gmiu-e-learning",
      tags: ["PHP", "Moodle"],
    },
  ];

  // ----- timeline logic -----
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll(".timeline-item"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          if (entry.isIntersecting) setActiveIndex(idx);
        });
      },
      { root: null, threshold: 0.5 }
    );
    items.forEach((it) => obs.observe(it));
    return () => obs.disconnect();
  }, []);

  // ----- skills logic -----
  const [skillOpen, setSkillOpen] = useState<string | null>(null);

  // ----- project scroll - autoplay -----
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;
    const speed = 0.3; // px per frame
    function loop() {
      if (!el) return;
      el.scrollLeft += speed;
      // wrap-around logic for infinite feel
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ----- contact form handler - opens mailto -----
  function handleContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLInputElement).value;
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0A%0A${message}`);
    // replace EMAIL_HERE with your email address
    window.location.href = `mailto:EMAIL_HERE?subject=${subject}&body=${body}`;
  }

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center text-gray-900"
      style={{
        backgroundImage:
          "url('/dragon.jpg')",
      }}
    >
      <div className=" bg-white/20 min-h-screen">
        {/* NAV */}
        <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="text-3xl font-extrabold">Saumitra</div>
          <nav className="space-x-6">
            <a className="cursor-pointer" href="#home">
              Home
            </a>
            <a className="cursor-pointer" href="#projects">
              Projects
            </a>
            <a className="cursor-pointer" href="#experience">
              Experience
            </a>
            <a className="cursor-pointer" href="#skills">
              Skills
            </a>
            <a className="cursor-pointer" href="#contact">
              Contact
            </a>
          </nav>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12 space-y-28">
          {/* HOME */}
          <section id="home" className="pt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-6xl font-black">Hi, I am Saumitra</h1>
                <p className="mt-6 max-w-xl">
                  I am a full-stack developer building delightful web experiences.
                  This single-page portfolio is built with Next.js + Tailwind.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/dragon.jpg"
                  alt="hero"
                  className="w-full h-72 object-cover"
                />
              </div>
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects">
            <h2 className="text-4xl font-extrabold mb-6">My Projects</h2>

            <div
              ref={scrollRef}
              className="overflow-x-auto whitespace-nowrap py-6 hide-scrollbar scroll-smooth"
              style={{
                display: "flex",
                gap: 24,
                alignItems: "stretch",
                scrollbarWidth: "none",
              }}
            >
              {/* To create a seamless scroll, duplicate the items */}
              {[...projects, ...projects].map((p, idx) => (
                <div
                  key={idx}
                  className="inline-block w-80 bg-white/90 rounded-lg shadow-md p-6 mr-2 border-4 border-black/10"
                >
                  <div className="h-36 overflow-hidden rounded-md mb-4">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold">{p.title}</h3>
                  <p className="text-sm mt-2">{p.desc}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1 rounded-full bg-red-200/90"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-3">
                    <a
                      className="px-3 py-2 rounded-md bg-black text-white text-sm inline-block"
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live
                    </a>
                    <a
                      className="px-3 py-2 rounded-md bg-gray-800 text-white text-sm inline-block"
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-700">Tip: hover to pause scroll.</p>
          </section>

          {/* EXPERIENCE */}
          <section id="experience" className="relative">
            <h2 className="text-4xl font-extrabold mb-6">My Experience</h2>
            <div className="flex gap-12 items-start">
              <div className="w-1/3 space-y-12">
                <div className="timeline-item" data-idx={0}>
                  <h4 className="font-bold">Prishusoft</h4>
                  <p className="text-sm">Role: Software Engineer</p>
                  <p className="mt-2 text-sm max-w-xs">
                    Developing and maintaining web applications using the PEAN
                    stack.
                  </p>
                </div>

                <div className="timeline-item" data-idx={1}>
                  <h4 className="font-bold">Prishusoft (Intern)</h4>
                  <p className="text-sm">Role: MERN Stack Developer Intern</p>
                  <p className="mt-2 text-sm max-w-xs">
                    Developed multiple minor projects and one major project.
                  </p>
                </div>

                <div className="timeline-item" data-idx={2}>
                  <h4 className="font-bold">Cantech Networks Pvt Ltd</h4>
                  <p className="text-sm">Role: Cloud Intern</p>
                  <p className="mt-2 text-sm max-w-xs">
                    Learnt about cloud computing and basic DevOps.
                  </p>
                </div>
              </div>

              <div className="w-1/6 flex justify-center">
                {/* vertical line */}
                <div className="relative h-full flex flex-col items-center">
                  <div
                    className="w-1 bg-black h-full relative"
                    style={{
                      background:
                        "linear-gradient(to bottom, #ff4d4f 0%, #ff4d4f " +
                        ((activeIndex ?? 0) / 3) * 100 +
                        "%, #eee " +
                        ((activeIndex ?? 0) / 3) * 100 +
                        "% 100)",
                    }}
                  ></div>

                  {/* circles positioned near items - static for demo */}
                  <div className="absolute top-12 -left-4 w-3 h-3 rounded-full bg-white border-2 border-red-500"></div>
                  <div className="absolute top-1/2 -left-4 w-3 h-3 rounded-full bg-white border-2 border-red-500"></div>
                  <div className="absolute bottom-24 -left-4 w-3 h-3 rounded-full bg-white border-2 border-red-500"></div>
                </div>
              </div>

              <div className="w-1/3 space-y-12">
                <div className="timeline-item" data-idx={0}></div>

                <div className="timeline-item" data-idx={1}></div>

                <div className="timeline-item" data-idx={2}></div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-700">As you scroll the timeline updates color.</p>
          </section>

          {/* SKILLS */}
          <section id="skills">
            <h2 className="text-4xl font-extrabold mb-6">Tech Stack</h2>
            <div className="flex gap-6 items-start">
              <div className="flex flex-col gap-3">
                {[
                  { key: "frontend", label: "Frontend" },
                  { key: "backend", label: "Backend" },
                  { key: "db", label: "Database" },
                  { key: "devops", label: "DevOps" },
                ].map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSkillOpen(skillOpen === s.key ? null : s.key)}
                    className={`px-4 py-2 rounded-full text-sm border ${
                      skillOpen === s.key ? "bg-black text-white" : "bg-white"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 grid grid-cols-2 gap-6">
                {skillOpen === "frontend" && (
                  <div className="p-6 bg-white rounded-lg shadow">React, Next.js, Tailwind, TypeScript</div>
                )}
                {skillOpen === "backend" && (
                  <div className="p-6 bg-white rounded-lg shadow">Node.js, Express, PHP</div>
                )}
                {skillOpen === "db" && (
                  <div className="p-6 bg-white rounded-lg shadow">Postgres, MySQL, MongoDB, Vector DB</div>
                )}
                {skillOpen === "devops" && (
                  <div className="p-6 bg-white rounded-lg shadow">Docker, CI/CD, AWS</div>
                )}

                {/* empty placeholders to keep layout consistent */}
                <div className="p-6 bg-white/60 rounded-lg" />
                <div className="p-6 bg-white/60 rounded-lg" />
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact">
            <h2 className="text-4xl font-extrabold mb-6">Contact</h2>
            <form onSubmit={handleContact} className="max-w-xl space-y-4">
              <div>
                <label className="block text-sm">Name</label>
                <input name="name" required className="w-full rounded-md p-2" />
              </div>
              <div>
                <label className="block text-sm">Email</label>
                <input name="email" type="email" required className="w-full rounded-md p-2" />
              </div>
              <div>
                <label className="block text-sm">Message</label>
                <textarea name="message" required className="w-full rounded-md p-2 h-36" />
              </div>
              <div>
                <button className="px-4 py-2 rounded-md bg-black text-white">Send</button>
              </div>
            </form>
          </section>
        </main>

        <footer className="text-center py-8">© {new Date().getFullYear()} Saumitra</footer>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }

        /* small helper to make auto-scroll feel seamless */
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
