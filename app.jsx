const { useState, useEffect, useRef, useMemo } = React;

// ---------- DATA ----------
const TIMELINE = [
  {
    id: "ipdemons",
    year: "2024 — 2026",
    kind: "Experience",
    title: "UX Designer / Frontend Developer",
    org: "IPDemons",
    location: "Freelance",
    summary: "Designed and shipped scalable UX/UI for complex web applications — document viewers, multi-panel layouts, dashboards.",
    bullets: [
      "Translated high-fidelity Figma designs into production frontend using JavaScript, Lit and Shoelace.",
      "Built a reusable component systems that improved development velocity and visual consistency.",
      "Shipped advanced UI interactions — collapsible panels, dynamic toolbars, selectable grids.",
      "Applied WCAG accessibility practices across every shipped component.",
      "Customized component theming via CSS variables and design tokens.",
      " Implemented responsive design patterns for seamless user experience across devices.",
    ],
    tags: ["Lit", "Shoelace", "Figma", "Design Systems", "WCAG", "TypeScript"],
    accent: 1.0,
  },
  {
    id: "jmu-fed",
    year: "Feb — Apr 2024",
    kind: "Experience",
    title: "Frontend Developer",
    org: "James Madison University",
    location: "Harrisonburg, VA",
    summary: "Partnered with the university's web team to build responsive, accessible interfaces and iterate within agile sprints.",
    bullets: [
      "Built responsive frontend interfaces using HTML, CSS, and JavaScript.",
      "Designed workflows and prototypes for a local-government collaboration & file-handling platform.",
      "Worked in agile sprint cycles to deliver iterative improvements.",
    ],
    tags: ["HTML", "CSS", "JS", "WordPress", "Figma"],
    accent: 0.75,
  },
  {
    id: "ba-interactive",
    year: "2020 — 2024",
    kind: "Education",
    title: "B.A. Interactive Design",
    org: "James Madison University",
    location: "Minor in Film Studies",
    summary: "Four years studying interaction design, visual systems, and user research — with a film-studies minor that quietly shapes how I think about pacing and narrative in product.",
    bullets: [
      "Coursework across UX research, interaction design, motion, and visual systems.",
      "Capstone projects spanning responsive web, product UI, and prototyping.",
      "Film Studies minor — visual storytelling, editing, narrative structure.",
    ],
    tags: ["UX Research", "Interaction Design", "Motion", "Narrative"],
    accent: 0.6,
  },
];

const SKILLS = [
  {
    group: "UX & UI",
    items: ["UX Design", "UI Design", "Interaction Design", "Wireframing", "Prototyping", "User Research"],
  },
  {
    group: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "Responsive Design", "Accessibility (WCAG)"],
  },
  {
    group: "Frameworks",
    items: ["Lit", "Shoelace", "Bootstrap"],
  },
  {
    group: "Tools",
    items: ["Figma", "Adobe Creative Cloud", "WordPress"],
  },
  {
    group: "Practice",
    items: ["Component Architecture", "Design Systems", "Agile"],
  },
];

// ---------- HOOKS ----------
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

// ---------- ICONS ----------
const Icon = {
  Arrow: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M2 7h10m0 0L8 3m4 4L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Dl: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M7 2v8m0 0l-3-3m3 3l3-3M2 12h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Plus: (p) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...p}>
      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  Mail: (p) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <rect x="1.5" y="3" width="11" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M2 4l5 3.5L12 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
};

// ---------- COMPONENTS ----------
function Nav({ progress }) {
  return (
    <nav className="nav" style={navStyles.nav}>
      <div style={navStyles.progress}>
        <div style={{ ...navStyles.progressFill, transform: `scaleX(${progress})` }} />
      </div>
      <div style={navStyles.inner}>
        <a href="index.html" style={navStyles.mark}>
          <img src="links/slwhite.png" width="50" height="50" alt="logo" />
        </a>
        <div style={navStyles.links}>
          <a href="mywork.html" style={navStyles.link}>Work</a>
          <a href="#top" style={{...navStyles.link, color: "var(--accent)"}}>Resume</a>
          <a href="contact.html" style={navStyles.link}>Contact</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const ref = useReveal();
  return (
    <header id="top" ref={ref} className="reveal" style={heroStyles.wrap}>
      <div style={heroStyles.grid}>
        <div style={heroStyles.left}>
          <div className="mono" style={heroStyles.kicker}>
            <span style={heroStyles.dot} /> Résumé · 2026
          </div>
          <h1 style={heroStyles.h1}>
            A record of the work,<br/>
            <span style={heroStyles.h1Italic}>in order</span>
          </h1>
          <p style={heroStyles.lede}>
            Hi, I'm <span style={{color: "var(--ink)"}}>Sarah Lockard</span> — a UX designer and frontend developer
            based in Annapolis. I design and build responsive, accessible web
            applications, and I like keeping the distance between a Figma file
            and production code short.
          </p>
          <div style={heroStyles.ctaRow}>
            <a href="#timeline" className="btn btn-primary">
              Walk the timeline <Icon.Arrow />
            </a>
            <a
              href="26Resume.pdf"
              target="_blank"
              rel="noopener"
              className="btn btn-ghost"
            >
              <Icon.Dl /> Download PDF
            </a>
          </div>
        </div>
        <aside style={heroStyles.right}>
          <HeroMeta label="Based in" value="Annapolis, MD" />
          <HeroMeta label="Available" value={<span><span style={heroStyles.live}/> Freelance &amp; full-time</span>} />
          <HeroMeta label="Focus" value="UX · UI · Front-end" />
          <HeroMeta label="Years shipping" value="4+" />
        </aside>
      </div>
      <div className="mono scroll-hint" style={heroStyles.scroll}>
        <span>Scroll</span>
        <span style={heroStyles.scrollLine}/>
      </div>
    </header>
  );
}

function HeroMeta({ label, value }) {
  return (
    <div style={heroStyles.meta}>
      <div className="mono" style={heroStyles.metaLabel}>{label}</div>
      <div style={heroStyles.metaValue}>{value}</div>
    </div>
  );
}

function TimelineSection({ items, density }) {
  const pad = density === "compact" ? 28 : 48;
  return (
    <section id="timeline" style={{...timelineStyles.section, "--row-gap": pad + "px"}}>
      <SectionHeader eyebrow="01 / Timeline" title="Design & Development Journey" />
      <div style={{ padding: `0 ${PAGE_PAD}`, marginBottom: pad }}>
        <a href="26Resume.pdf" target="_blank" rel="noopener" className="btn btn-ghost">
          <Icon.Dl /> Download PDF
        </a>
      </div>
      <div style={timelineStyles.trackWrap}>
        <div style={timelineStyles.rail} />
        <RailGlow />
        <ol style={{...timelineStyles.list, gap: pad}}>
          {items.map((it, i) => (
            <TimelineRow key={it.id} item={it} index={i} />
          ))}
          <TimelineEndCap />
        </ol>
      </div>
    </section>
  );
}

function RailGlow() {
  // The glowing head follows scroll; rendered fixed in container via ref
  const ref = useRef(null);
  const wrapRef = useRef(null);
  useEffect(() => {
    const wrap = ref.current?.parentElement;
    if (!wrap) return;
    const onScroll = () => {
      const r = wrap.getBoundingClientRect();
      const viewMid = window.innerHeight * 0.5;
      const y = Math.max(0, Math.min(r.height, viewMid - r.top));
      if (ref.current) ref.current.style.transform = `translateY(${y}px)`;
      if (ref.current) {
        const fade = r.top > window.innerHeight || r.bottom < 0 ? 0 : 1;
        ref.current.style.opacity = fade;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return <div ref={ref} style={timelineStyles.railGlow} />;
}

function TimelineRow({ item, index }) {
  const [open, setOpen] = useState(index === 0);
  const ref = useReveal();
  return (
    <li ref={ref} className="reveal" style={{ ...timelineStyles.row, transitionDelay: `${index * 80}ms` }}>
      <div style={timelineStyles.rowYear} className="mono">
        <span>{item.year}</span>
      </div>
      <div style={timelineStyles.rowNode}>
        <span style={{ ...timelineStyles.node, opacity: 0.3 + 0.7 * item.accent }} />
        <span style={timelineStyles.nodeRing} />
      </div>
      <div style={timelineStyles.rowBody}>
        <button
          onClick={() => setOpen(o => !o)}
          style={{ ...timelineStyles.card, ...(open ? timelineStyles.cardOpen : null) }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(167,163,255,0.35)")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = open ? "rgba(167,163,255,0.35)" : "var(--line)")}
        >
          <div style={timelineStyles.cardHead}>
            <div>
              <div className="mono" style={timelineStyles.cardKind}>{item.kind}</div>
              <h3 style={timelineStyles.cardTitle}>{item.title}</h3>
              <div style={timelineStyles.cardOrg}>
                <span>{item.org}</span>
                <span style={timelineStyles.dotSep}>·</span>
                <span style={{color:"var(--ink-mute)"}}>{item.location}</span>
              </div>
            </div>
            <span style={{ ...timelineStyles.toggle, transform: open ? "rotate(45deg)" : "none" }} aria-label={open ? "Collapse" : "Expand"}>
              <Icon.Plus />
            </span>
          </div>
          <p style={timelineStyles.cardSummary}>{item.summary}</p>
          <div
            style={{
              ...timelineStyles.expand,
              gridTemplateRows: open ? "1fr" : "0fr",
              marginTop: open ? 18 : 0,
            }}
          >
            <div style={timelineStyles.expandInner}>
              <ul style={timelineStyles.bullets}>
                {item.bullets.map((b, i) => (
                  <li key={i} style={timelineStyles.bullet}>
                    <span style={timelineStyles.bulletDash}>—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div style={timelineStyles.tags}>
                {item.tags.map((t) => (
                  <span key={t} className="mono" style={timelineStyles.tag}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </button>
      </div>
    </li>
  );
}

function TimelineEndCap() {
  return (
    <li style={{ ...timelineStyles.row, ...timelineStyles.endCap }}>
      <div style={timelineStyles.rowYear} className="mono">
        <span style={{color: "var(--accent)"}}>Now</span>
      </div>
      <div style={timelineStyles.rowNode}>
        <span style={timelineStyles.nodeNow} />
      </div>
      <div style={timelineStyles.rowBody}>
        <div style={timelineStyles.nowCard}>
          <div className="mono" style={{color: "var(--accent)", fontSize: 11, letterSpacing: "0.14em"}}>■ CURRENTLY</div>
          <div style={{marginTop: 8, fontSize: 18, color: "var(--ink)"}}>
            Looking for a full-time UX/UI or frontend role. Also open to freelance UX &amp; frontend work!
          </div>
          <a href="contact.html" className="btn btn-ghost" style={{marginTop: 18}}>
            <Icon.Mail /> Say hello
          </a>
        </div>
      </div>
    </li>
  );
}

function SectionHeader({ eyebrow, title, aside }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={sectionStyles.head}>
      <div className="mono" style={sectionStyles.eyebrow}>{eyebrow}</div>
      <h2 style={sectionStyles.h2}>{title}</h2>
      {aside && <div style={sectionStyles.aside}>{aside}</div>}
    </div>
  );
}

function SkillsSection() {
  return (
    <section style={skillsStyles.section}>
      <SectionHeader eyebrow="02 / Toolkit" title="What's in the belt" />
      <div style={skillsStyles.grid}>
        {SKILLS.map((g, i) => <SkillGroup key={g.group} group={g} idx={i} />)}
      </div>
    </section>
  );
}

function SkillGroup({ group, idx }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ ...skillsStyles.group, transitionDelay: `${idx * 70}ms` }}>
      <div className="mono" style={skillsStyles.groupLabel}>
        <span style={skillsStyles.groupNum}>{String(idx + 1).padStart(2, "0")}</span>
        {group.group}
      </div>
      <ul style={skillsStyles.items}>
        {group.items.map((x) => (
          <li key={x} style={skillsStyles.item}>
            <span style={skillsStyles.itemBullet} />
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SummarySection() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal" style={summaryStyles.section}>
      <div className="mono" style={summaryStyles.label}>About the work</div>
      <p style={summaryStyles.text}>
        I'm a <em style={summaryStyles.em}>designer who builds</em> — specializing in
        responsive, user-centered web applications. My work lives at the seam between
        high-fidelity UX/UI and scalable, accessible frontend code, written in
        JavaScript, Lit, and component-based architectures.
      </p>
      <div style={summaryStyles.sigRow}>
        <div style={summaryStyles.sigCol}>
          <div className="mono" style={summaryStyles.sigLabel}>Portfolio</div>
          <a href="https://www.sarahlockard.org/" target="_blank" rel="noopener" style={summaryStyles.sigLink}>
            sarahlockard.org <Icon.Arrow />
          </a>
        </div>
        <div style={summaryStyles.sigCol}>
          <div className="mono" style={summaryStyles.sigLabel}>Location</div>
          <div>Annapolis, MD</div>
        </div>
        <div style={summaryStyles.sigCol}>
          <div className="mono" style={summaryStyles.sigLabel}>Status</div>
          <div><span style={{...heroStyles.live, marginRight: 8}}/> Available</div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useReveal();
  return (
    <section id="contact" ref={ref} className="reveal footer-cta" style={contactStyles.section}>
      <div className="mono" style={contactStyles.eyebrow}>03 / Contact</div>
      <h2 style={contactStyles.h2}>
        Let's make <span style={contactStyles.italic}>something</span> good.
      </h2>
      <div style={contactStyles.links}>
        <a href="mailto:sarahlockard44@gmail.com" style={contactStyles.bigLink}>
          <span>sarahlockard44@gmail.com</span>
          <Icon.Arrow />
        </a>
        <a href="tel:+14439057844" style={contactStyles.bigLink}>
          <span>443 · 905 · 7844</span>
          <Icon.Arrow />
        </a>
        <a href="https://www.sarahlockard.org/" target="_blank" rel="noopener" style={contactStyles.bigLink}>
          <span>sarahlockard.org</span>
          <Icon.Arrow />
        </a>
      </div>
      <div style={contactStyles.foot}>
        <span className="mono">© 2026 Sarah Lockard</span>
        <span className="mono">Designed &amp; built in HTML, CSS, JS</span>
      </div>
    </section>
  );
}

// ---------- APP ----------
const DEFAULTS = window.__TWEAK_DEFAULTS;

function App() {
  const tweaks = window.useTweaks ? window.useTweaks(DEFAULTS) : [DEFAULTS, () => {}];
  const [t, setT] = tweaks;

  // Apply accent hue via CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", `oklch(0.78 0.12 ${t.accentHue})`);
    document.documentElement.style.setProperty("--accent-2", `oklch(0.93 0.04 ${(t.accentHue + 40) % 360})`);
  }, [t.accentHue]);

  return (
    <>
      <Shell tweaks={t} />
      {window.TweaksPanel && <TweaksUI t={t} setT={setT} />}
    </>
  );
}

function HeroAside() {
  return (
    <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `clamp(40px, 6vw, 80px) ${PAGE_PAD} clamp(20px, 3vw, 40px)` }}>
      <aside style={heroStyles.right}>
        <HeroMeta label="Based in" value="Annapolis, MD" />
        <HeroMeta label="Available" value={<span><span style={heroStyles.live}/> Freelance &amp; full-time</span>} />
        <HeroMeta label="Focus" value="UX · UI · Front-end" />
        <HeroMeta label="Years shipping" value="4+" />
      </aside>
    </div>
  );
}

function Shell({ tweaks }) {
  const progress = useScrollProgress();
  return (
    <div style={shellStyles.shell}>
      <Nav progress={progress} />
      <main style={shellStyles.main}>
        <TimelineSection items={TIMELINE} density={tweaks.density} />
        <SkillsSection />
      </main>
    </div>
  );
}

function TweaksUI({ t, setT }) {
  const { TweaksPanel, TweakSection, TweakSlider, TweakRadio, TweakToggle } = window;
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Accent">
        <TweakSlider label="Hue" value={t.accentHue} min={0} max={360} step={1}
          onChange={(v) => setT({ accentHue: v })} />
      </TweakSection>
      <TweakSection title="Timeline">
        <TweakRadio label="Density" value={t.density}
          options={[{value:"compact",label:"Compact"},{value:"comfortable",label:"Comfortable"}]}
          onChange={(v) => setT({ density: v })} />
      </TweakSection>
      <TweakSection title="Typography">
        <TweakToggle label="Monospace labels" value={t.monoLabels}
          onChange={(v) => setT({ monoLabels: v })} />
      </TweakSection>
    </TweaksPanel>
  );
}

// ---------- STYLES ----------
const PAGE_PAD = "clamp(24px, 5vw, 80px)";
const MAX_W = 1180;
const MAX_W_WIDE = 1380;

const shellStyles = {
  shell: { minHeight: "100vh", position: "relative" },
  main: { paddingBottom: 0 },
};

const navStyles = {
  nav: {
    position: "sticky", top: 0, zIndex: 10,
    backdropFilter: "blur(14px) saturate(1.1)",
    WebkitBackdropFilter: "blur(14px) saturate(1.1)",
    background: "linear-gradient(to bottom, rgba(11,10,18,0.75), rgba(11,10,18,0.35))",
    borderBottom: "1px solid var(--line)",
  },
  progress: {
    position: "absolute", top: 0, left: 0, right: 0, height: 2,
    background: "rgba(255,255,255,0.04)",
  },
  progressFill: {
    position: "absolute", inset: 0,
    background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
    transformOrigin: "0 50%",
    transform: "scaleX(0)",
    transition: "transform .1s linear",
  },
  inner: {
    maxWidth: MAX_W_WIDE, margin: "0 auto",
    padding: `18px ${PAGE_PAD}`,
    display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  mark: { textDecoration: "none", color: "var(--ink)", display: "inline-flex", alignItems: "center", gap: 10 },
 markGlyph: {
  fontFamily: "'DM Serif Display', serif",
  fontSize: 20, fontWeight: 400, letterSpacing: "-0.5px",
  color: "#fff",
},
  links: { display: "flex", gap: 28, alignItems: "center" },
link: {
  color: "rgba(255,255,255,0.45)", textDecoration: "none",
  fontSize: 18, fontWeight: 400, letterSpacing: "0.5px",
  transition: "color .2s",
},
};

const heroStyles = {
  wrap: {
    maxWidth: MAX_W, margin: "0 auto",
    padding: `clamp(64px, 10vw, 140px) ${PAGE_PAD} clamp(100px, 14vw, 180px)`,
    position: "relative",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
    gap: "clamp(40px, 6vw, 80px)",
    alignItems: "start",
  },
  left: {},
  kicker: {
    display: "inline-flex", alignItems: "center", gap: 10,
    fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
    color: "var(--accent)",
    padding: "6px 12px", border: "1px solid rgba(167,163,255,0.25)",
    borderRadius: 999, marginBottom: 28,
  },
  dot: {
    display: "inline-block", width: 6, height: 6, borderRadius: "50%",
    background: "var(--accent)",
    boxShadow: "0 0 0 4px rgba(167,163,255,0.18)",
  },
  h1: {
    margin: 0,
    fontFamily: "'Manrope', sans-serif",
    fontSize: "clamp(46px, 8vw, 104px)",
    lineHeight: 0.98, letterSpacing: "-0.03em",
    fontWeight: 600,
  },
  h1Italic: {
    fontFamily: "'Newsreader', serif", fontStyle: "italic",
    fontWeight: 300, letterSpacing: "-0.01em",
    color: "var(--accent)",
  },
  lede: {
    marginTop: 28, maxWidth: 560,
    fontSize: "clamp(16px, 1.3vw, 18px)",
    color: "var(--ink-dim)", lineHeight: 1.6,
  },
  ctaRow: { display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" },
  right: {
    display: "grid", gap: 24,
    padding: "28px 28px",
    border: "1px solid var(--line)", borderRadius: 16,
    background: "linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))",
    alignSelf: "start",
    marginTop: 12,
  },
  meta: { display: "grid", gap: 4 },
  metaLabel: { fontSize: 10.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-mute)" },
  metaValue: { fontSize: 16, color: "var(--ink)", display: "flex", alignItems: "center" },
  live: {
    display: "inline-block", width: 8, height: 8, borderRadius: "50%",
    background: "#7cdfa4",
    boxShadow: "0 0 0 4px rgba(124,223,164,0.18)",
    marginRight: 10,
  },
  scroll: {
    position: "absolute", left: PAGE_PAD, bottom: "clamp(30px, 5vw, 50px)",
    display: "flex", alignItems: "center", gap: 14,
    fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase",
    color: "var(--ink-mute)",
  },
  scrollLine: {
    display: "inline-block", width: 60, height: 1,
    background: "linear-gradient(90deg, var(--ink-mute), transparent)",
  },
};

const sectionStyles = {
  head: {
    maxWidth: MAX_W, margin: "0 auto",
    padding: `clamp(40px, 6vw, 80px) ${PAGE_PAD} clamp(28px, 4vw, 40px)`,
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "end", gap: 24,
  },
  eyebrow: {
    fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase",
    color: "var(--accent)", gridColumn: "1 / -1", marginBottom: 8,
  },
  h2: {
    margin: 0,
    fontSize: "clamp(30px, 4.5vw, 56px)",
    lineHeight: 1.02, letterSpacing: "-0.025em",
    fontWeight: 500,
  },
  aside: { color: "var(--ink-dim)", fontSize: 14 },
};

const timelineStyles = {
  section: {
    maxWidth: MAX_W, margin: "0 auto",
    padding: `0 ${PAGE_PAD} clamp(60px, 9vw, 120px)`,
  },
  trackWrap: { position: "relative", paddingTop: 8 },
  rail: {
    position: "absolute",
    left: "clamp(90px, 14vw, 180px)",
    top: 24, bottom: 24, width: 1,
    background: "linear-gradient(to bottom, transparent, var(--line-strong) 8%, var(--line-strong) 92%, transparent)",
    zIndex: 0,
  },
  railGlow: {
    position: "absolute",
    left: "calc(clamp(90px, 14vw, 180px) - 6px)",
    top: 0, width: 13, height: 13, borderRadius: "50%",
    background: "var(--accent)",
    boxShadow: "0 0 0 5px rgba(167,163,255,0.14), 0 0 40px 8px rgba(167,163,255,0.55)",
    pointerEvents: "none",
    transition: "opacity .4s",
    opacity: 0,
    zIndex: 2,
  },
  list: {
    listStyle: "none", padding: 0, margin: 0,
    display: "flex", flexDirection: "column",
    position: "relative", zIndex: 1,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "clamp(80px, 14vw, 160px) 40px 1fr",
    gap: 0,
    alignItems: "flex-start",
  },
  rowYear: {
    fontSize: 12, letterSpacing: "0.14em",
    color: "var(--ink-mute)", paddingTop: 22,
  },
  rowNode: {
    position: "relative", width: 40, height: 40,
    display: "flex", alignItems: "flex-start", justifyContent: "center",
    paddingTop: 20,
  },
  node: {
    width: 10, height: 10, borderRadius: "50%",
    background: "var(--accent)",
    boxShadow: "0 0 0 4px rgba(167,163,255,0.12)",
    position: "relative", zIndex: 2,
  },
  nodeRing: {
    position: "absolute", top: 14, left: "50%", marginLeft: -11,
    width: 22, height: 22, borderRadius: "50%",
    border: "1px solid rgba(167,163,255,0.25)",
  },
  nodeNow: {
    width: 14, height: 14, borderRadius: "50%",
    background: "var(--accent-2)",
    boxShadow: "0 0 0 6px rgba(244,233,216,0.12), 0 0 30px rgba(244,233,216,0.4)",
  },
  rowBody: { paddingLeft: "clamp(20px, 2vw, 32px)", minWidth: 0 },
  card: {
    display: "block", width: "100%", textAlign: "left",
    padding: "22px 26px",
    background: "var(--card)",
    border: "1px solid var(--line)",
    borderRadius: 14,
    color: "var(--ink)", cursor: "pointer",
    transition: "border-color .3s, background .3s, transform .3s",
    font: "inherit",
  },
  cardOpen: {
    background: "var(--card-hi)",
    borderColor: "rgba(167,163,255,0.35)",
  },
  cardHead: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 },
  cardKind: {
    fontSize: 10.5, letterSpacing: "0.22em", textTransform: "uppercase",
    color: "var(--accent)", marginBottom: 10,
  },
  cardTitle: { margin: 0, fontSize: "clamp(20px, 2.3vw, 26px)", fontWeight: 500, letterSpacing: "-0.015em", lineHeight: 1.15 },
  cardOrg: { marginTop: 6, color: "var(--ink-dim)", fontSize: 14, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" },
  dotSep: { color: "var(--ink-mute)" },
  toggle: {
    width: 32, height: 32, borderRadius: "50%",
    border: "1px solid var(--line-strong)", flexShrink: 0,
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    color: "var(--ink-dim)",
    transition: "transform .4s cubic-bezier(.2,.7,.2,1), color .2s, border-color .2s",
  },
  cardSummary: { margin: "16px 0 0", color: "var(--ink-dim)", fontSize: 15, lineHeight: 1.6, maxWidth: 680 },
  expand: {
    display: "grid", gridTemplateRows: "0fr",
    transition: "grid-template-rows .45s cubic-bezier(.2,.7,.2,1), margin-top .35s",
    overflow: "hidden",
  },
  expandInner: { minHeight: 0, overflow: "hidden" },
  bullets: { listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10, borderTop: "1px dashed var(--line)", paddingTop: 16 },
  bullet: { display: "grid", gridTemplateColumns: "18px 1fr", gap: 8, color: "var(--ink-dim)", fontSize: 14.5, lineHeight: 1.55 },
  bulletDash: { color: "var(--accent)", fontFamily: "'Geist Mono', monospace", fontSize: 13, paddingTop: 2 },
  tags: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 },
  tag: {
    fontSize: 11, padding: "5px 10px",
    border: "1px solid var(--line-strong)", borderRadius: 999,
    color: "var(--ink-dim)", letterSpacing: "0.05em",
  },
  endCap: { marginTop: 24 },
  nowCard: {
    padding: "22px 26px",
    background: "linear-gradient(180deg, rgba(167,163,255,0.07), rgba(167,163,255,0.01))",
    border: "1px solid rgba(167,163,255,0.22)",
    borderRadius: 14,
  },
};

const summaryStyles = {
  section: {
    maxWidth: MAX_W, margin: "0 auto",
    padding: `clamp(40px, 6vw, 80px) ${PAGE_PAD}`,
    borderTop: "1px solid var(--line)",
    display: "grid", gap: 32,
  },
  label: {
    fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase",
    color: "var(--ink-mute)",
  },
  text: {
    margin: 0,
    fontSize: "clamp(22px, 2.6vw, 32px)",
    lineHeight: 1.35, letterSpacing: "-0.01em",
    color: "var(--ink)",
    maxWidth: 880,
    textWrap: "pretty",
  },
  em: { fontFamily: "'Newsreader', serif", fontStyle: "italic", fontWeight: 300, color: "var(--accent)" },
  sigRow: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 28, paddingTop: 24,
    borderTop: "1px dashed var(--line)",
  },
  sigCol: { display: "grid", gap: 6, fontSize: 15, color: "var(--ink)" },
  sigLabel: { fontSize: 10.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-mute)" },
  sigLink: { color: "var(--ink)", textDecoration: "none", display: "inline-flex", gap: 8, alignItems: "center", width: "fit-content", borderBottom: "1px solid var(--line-strong)", paddingBottom: 2 },
};

const skillsStyles = {
  section: {
    maxWidth: MAX_W, margin: "0 auto",
    padding: `0 ${PAGE_PAD} clamp(60px, 9vw, 120px)`,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 0,
    border: "1px solid var(--line)",
    borderRadius: 16,
    overflow: "hidden",
  },
  group: {
    padding: "28px 28px 32px",
    borderRight: "1px solid var(--line)",
    borderBottom: "1px solid var(--line)",
    background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))",
  },
  groupLabel: {
    fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
    color: "var(--ink-dim)", display: "flex", gap: 14, alignItems: "baseline",
    marginBottom: 18,
  },
  groupNum: { color: "var(--accent)", fontSize: 10 },
  items: { listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 },
  item: { display: "flex", alignItems: "center", gap: 10, color: "var(--ink)", fontSize: 15 },
  itemBullet: {
    width: 4, height: 4, borderRadius: "50%",
    background: "var(--ink-mute)", flexShrink: 0,
  },
};

const contactStyles = {
  section: {
    maxWidth: MAX_W, margin: "0 auto",
    padding: `clamp(80px, 12vw, 160px) ${PAGE_PAD} clamp(40px, 6vw, 80px)`,
    borderTop: "1px solid var(--line)",
  },
  eyebrow: {
    fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase",
    color: "var(--accent)", marginBottom: 24,
  },
  h2: {
    margin: 0,
    fontSize: "clamp(44px, 7vw, 96px)",
    lineHeight: 1, letterSpacing: "-0.03em",
    fontWeight: 500, maxWidth: 900,
  },
  italic: { fontFamily: "'Newsreader', serif", fontStyle: "italic", fontWeight: 300, color: "var(--accent)" },
  links: { display: "grid", gap: 0, marginTop: 60, borderTop: "1px solid var(--line)" },
  bigLink: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "26px 4px",
    borderBottom: "1px solid var(--line)",
    color: "var(--ink)", textDecoration: "none",
    fontSize: "clamp(18px, 2.2vw, 28px)",
    letterSpacing: "-0.01em", fontWeight: 400,
    transition: "padding .3s ease, color .3s",
  },
  foot: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginTop: 50,
    fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
    color: "var(--ink-mute)", flexWrap: "wrap", gap: 16,
  },
};

// hover polish on contact links — pure JS once to avoid global CSS noise
document.addEventListener("mouseover", (e) => {
  const a = e.target.closest?.('[data-hover="biglink"]');
}, { passive: true });

// Kick it off
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
