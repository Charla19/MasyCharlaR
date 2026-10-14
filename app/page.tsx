"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUp, ArrowUpRight, Award, BookOpenText, Cloud, Code2, Database, Gamepad2, Layers3, Linkedin, Menu, Mic2, Music2, Pencil, PenLine, UsersRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Project = { title: string; summary: string; stack: string; outcome?: string | null; href?: string | null; featured?: boolean };
type Entry = { kind: string; title: string; subtitle: string | null; description: string; organization: string | null; period: string | null; location: string | null; tags: string | null; metric: string | null; href: string | null };
type Interest = { title: string; description: string };
const defaultInterests: Interest[] = [
  { title: "Dessin", description: "Observer, esquisser, composer des formes et des idées." },
  { title: "Musique", description: "Chanter, écouter, jouer et faire vivre les projets collectifs." },
  { title: "Écriture", description: "Prendre le temps de trouver les mots justes et de raconter." },
  { title: "Jeux vidéo", description: "Explorer des univers, des mécaniques et des histoires interactives." },
];

const skills = ["Python", "React", "FastAPI", "Django REST", "JavaScript", "PHP", "Next.js", "PostgreSQL", "MySQL", "Docker", "Azure", "Google Cloud", "WordPress", "Freshworks"];
const career = [
  { number: "01", role: "Développeuse Web & Freshworks", place: "Humans4Help", period: "2024 — aujourd’hui", text: "Applications web et projets IA, maintenance de production, automatisation CRM et stabilité d’infrastructures pour des équipes distribuées.", facts: ["20+ sites et environnements maintenus", "React · Python · FastAPI · Azure · Docker"] },
  { number: "02", role: "Développeuse Web Full-Stack", place: "Step Up Agence / Digital", period: "2023", text: "Modules métier, réservation hôtelière et refontes mobile-first, avec un travail concret sur la vitesse et la navigation.", facts: ["Score de performance : 15 → 90", "Temps de chargement réduit de 50 %"] },
  { number: "03", role: "Développeuse Web & Data", place: "Tan’IT Technologie", period: "2022", text: "Des documents hétérogènes transformés en données structurées grâce à des scripts, une API interne et une base relationnelle.", facts: ["5 000+ PDF traités", "Python · Node.js · API REST · MySQL"] },
];
const featuredWork: Project[] = [
  { title: "Entraîner des modèles, clairement", summary: "Interface React et Material UI pour accompagner l’upload, l’annotation, la validation, l’entraînement et la restitution de résultats — construite avec une équipe data science.", stack: "React · Material UI · IA", outcome: "Du pipeline technique à une expérience guidée", featured: true },
  { title: "Un parc web qui tient la distance", summary: "Migration et suivi de plus de vingt sites. Refonte d’un site de Nuxt.js / WordPress headless vers WordPress monolithique pour simplifier la maintenance et améliorer les performances.", stack: "WordPress · Nuxt.js · Plesk · SEO", outcome: "20+ sites supervisés" },
  { title: "5 000 documents, une donnée exploitable", summary: "Extraction automatisée de PDF non structurés, nettoyage, structuration en base relationnelle et API interne pour fiabiliser le flux.", stack: "Python · Node.js · MySQL · API REST", outcome: "Plus de 5 000 PDF traités" },
  { title: "Des produits plus rapides, sur mobile", summary: "Refonte mobile-first, cache applicatif et fonctionnalités de filtrage. Un module de réservation complet a aussi été conçu pour un hôtel quatre étoiles à Antananarivo.", stack: "PHP · SQL · JavaScript · WordPress", outcome: "Score : 15 → 90 · chargement −50 %" },
  { title: "La paie, de l’interface au cloud", summary: "Application de gestion de paie conçue en full-stack, avec une interface React, une API FastAPI et un déploiement sur machine virtuelle Azure.", stack: "React · FastAPI · Azure", outcome: "Application déployée sur Azure" },
];
const communities = [
  { name: "GDG Antananarivo", meta: "DevFest Ambassador · talks · labs", copy: "Ateliers cloud, interventions autour de l’IA responsable et accompagnement de jeunes développeurs vers la certification Google Cloud." },
  { name: "Women Techmakers", meta: "Intervenante · mentorat", copy: "Labs pratiques autour des outils IA, de l’automatisation et des technologies Google, pour encourager les femmes à prendre leur place dans la tech." },
  { name: "AlgoMada", meta: "Mentorat · algorithmes · game jam", copy: "Pratique du problem-solving, sessions de code et événements qui font grandir les talents numériques malgaches." },
  { name: "Es’Tia Mozika", meta: "Responsable du club · 2021—2024", copy: "Coordination d’une équipe étudiante, des répétitions et des événements culturels — l’autre terrain où la technique rencontre le collectif." },
];
const distinctions = [
  { year: "2024", title: "Google Cloud Associate Cloud Engineer", note: "Certification obtenue en décembre 2024" },
  { year: "2023", title: "1er prix — Clean Code Hackathon", note: "DevFest · GDG Antananarivo & AlgoMada" },
  { year: "2023", title: "1er prix — Frontend Awards", note: "TechZara · expérience accessible avec commandes vocales et contrastes visuels" },
  { year: "2023", title: "Prix coup de cœur — Women’s Hackathon", note: "ESTI · projet Digital Divas, mentorat et visibilité des femmes dans la tech" },
];

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 390, damping: 34, mass: 0.42 });
  const springY = useSpring(y, { stiffness: 390, damping: 34, mass: 0.42 });
  const [mode, setMode] = useState("square");
  const [visible, setVisible] = useState(false);
  const [onPassions, setOnPassions] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let lastTarget: HTMLElement | null = null;
    let isVisible = false;
    let passionState = false;
    const move = (event: PointerEvent) => {
      x.set(event.clientX); y.set(event.clientY);
      if (!isVisible) { isVisible = true; setVisible(true); }
      const source = event.target as HTMLElement | null;
      const target = source?.closest<HTMLElement>("a, button, input, textarea, select, [data-cursor]") ?? null;
      const nextPassionState = Boolean(source?.closest(".human-section"));
      if (passionState !== nextPassionState) { passionState = nextPassionState; setOnPassions(nextPassionState); }
      if (target === lastTarget) return;
      lastTarget = target;
      const nextMode = target?.matches("a,button,input,textarea,select") ? "link" : target?.dataset.cursor ?? "square";
      setMode(value => value === nextMode ? value : nextMode);
    };
    const leave = () => { isVisible = false; passionState = false; setVisible(false); setOnPassions(false); lastTarget = null; };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointercancel", leave);
    document.addEventListener("pointerleave", leave);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointercancel", leave); document.removeEventListener("pointerleave", leave); };
  }, [x, y]);
  const cursorIcons: Record<string, typeof Pencil> = { pencil: Pencil, music: Music2, game: Gamepad2, write: PenLine, work: Code2, project: Layers3, community: UsersRound, award: Award, education: BookOpenText, talk: Mic2, build: Code2, data: Database, cloud: Cloud, hero: Layers3 };
  const Icon = cursorIcons[mode];
  const iconSize = ["pencil", "music", "game", "write"].includes(mode) ? 25 : 19;
  return <motion.div aria-hidden="true" className={`cursor-orbit mode-${mode}${visible ? " is-visible" : ""}${onPassions ? " is-passion" : ""}`} style={{ x: springX, y: springY }}><span>{Icon && <Icon size={iconSize} strokeWidth={1.7} />}</span></motion.div>;
}

function HeroObject({ progress, reduceMotion }: { progress: ReturnType<typeof useScroll>["scrollYProgress"]; reduceMotion: boolean | null }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(pointerX, { stiffness: 80, damping: 18 });
  const rotateX = useSpring(pointerY, { stiffness: 80, damping: 18 });
  const x = useTransform(progress, [0, .72, 1], [0, 10, 210]);
  const y = useTransform(progress, [0, .72, 1], [0, -24, -150]);
  const scale = useTransform(progress, [0, .28, .7, 1], [1, .9, .62, .28]);
  const opacity = useTransform(progress, [0, .66, 1], [1, 1, 0]);
  const exitRotate = useTransform(progress, [0, .7, 1], [0, 0, -18]);
  return <motion.div className="hero-object" aria-hidden="true" data-cursor="hero" style={{ x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : y, scale: reduceMotion ? 1 : scale, opacity: reduceMotion ? 1 : opacity, rotate: reduceMotion ? 0 : exitRotate }} onPointerMove={event => {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - .5) * 14);
    pointerY.set(-((event.clientY - bounds.top) / bounds.height - .5) * 12);
  }} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
    <div className="hero-object-float"><motion.div className="hero-object-tilt" style={{ rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY }}>
      <div className="hero-cube">
        <div className="cube-face cube-front"><span className="cube-overline">FULL-STACK / CLOUD</span><strong>M<span>.</span><br />Charla.R</strong><span className="cube-rule" /><span className="cube-index">01 — 04</span></div>
        <div className="cube-face cube-right"><span>DATA<br />SYSTEMS</span></div>
        <div className="cube-face cube-top"><span>BUILD / SHARE / SHIP</span></div>
        <div className="cube-face cube-back" /><div className="cube-face cube-left" /><div className="cube-face cube-bottom" />
      </div>
    </motion.div></div>
    <span className="object-caption">Un même regard.<br />Plusieurs dimensions.</span>
  </motion.div>;
}

function ContactDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab" && dialogRef.current) {
        const controls = [...dialogRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,textarea')];
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.body.classList.add("dialog-open");
    window.addEventListener("keydown", onKey);
    dialogRef.current?.querySelector<HTMLElement>("input")?.focus();
    return () => { document.body.classList.remove("dialog-open"); window.removeEventListener("keydown", onKey); previous?.focus(); };
  }, [open, onClose]);
  return <AnimatePresence>{open && <motion.div className="contact-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <motion.div ref={dialogRef} className="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-title" initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: .99 }} transition={{ duration: .28 }}>
      <button className="dialog-close" type="button" onClick={onClose} aria-label="Fermer la fenêtre"><X /></button>
      <p className="eyebrow">Un projet, une idée, une conversation</p><h2 id="contact-title">Parlons de la <i>suite.</i></h2>
      <form onSubmit={event => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const subject = encodeURIComponent(`Portfolio — ${String(form.get("subject"))}`);
        const body = encodeURIComponent(`Bonjour Charla,\n\n${String(form.get("message"))}\n\n${String(form.get("name"))} · ${String(form.get("replyTo"))}`);
        window.location.href = `mailto:masycharlar@gmail.com?subject=${subject}&body=${body}`;
      }}>
        <label>Votre nom<input name="name" autoComplete="name" required /></label><label>Votre e-mail<input name="replyTo" type="email" autoComplete="email" required /></label><label>Le sujet<input name="subject" required /></label><label>Votre message<textarea name="message" rows={4} required /></label>
        <div className="dialog-actions"><button type="submit">Préparer le message <ArrowUpRight size={16} /></button><span>Votre application e-mail s’ouvrira pour l’envoi.</span></div>
      </form>
    </motion.div>
  </motion.div>}</AnimatePresence>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [tickerPaused, setTickerPaused] = useState(false);
  const [projects, setProjects] = useState(featuredWork);
  const [careerItems, setCareerItems] = useState(career);
  const [communityItems, setCommunityItems] = useState(communities);
  const [awardItems, setAwardItems] = useState(distinctions);
  const [talkItems, setTalkItems] = useState<string[]>([]);
  const [skillItems, setSkillItems] = useState(skills);
  const [educationItems, setEducationItems] = useState([{ title: "Licence en informatique — Intégration & Développement", organization: "ESTI", period: "2021—2024" }]);
  const [interestItems, setInterestItems] = useState(defaultInterests);
  const [wide, setWide] = useState(false);
  const [railDistance, setRailDistance] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.25 });
  const { scrollYProgress: railProgress } = useScroll({ target: railRef, offset: ["start start", "end end"] });
  const railX = useTransform(railProgress, [0, 1], [0, -railDistance]);
  const reveal = reduceMotion ? {} : { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.16 }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } };

  useEffect(() => {
    fetch("/api/projects").then(response => response.ok ? response.json() : []).then((items: Project[]) => { if (items.length) setProjects(items); }).catch(() => undefined);
    fetch("/api/portfolio").then(response => response.ok ? response.json() : null).then((data: { entries?: Entry[] } | null) => {
      const entries = data?.entries ?? [];
      const byKind = (kind: string) => entries.filter(entry => entry.kind === kind);
      const experienceEntries = byKind("EXPERIENCE");
      if (experienceEntries.length) setCareerItems(experienceEntries.map((entry, index) => ({ number: String(index + 1).padStart(2, "0"), role: entry.title, place: entry.organization ?? "", period: entry.period ?? "", text: entry.description, facts: [entry.metric, entry.tags].filter(Boolean) as string[] })));
      const communityEntries = byKind("COMMUNITY");
      if (communityEntries.length) setCommunityItems(communityEntries.map(entry => ({ name: entry.title, meta: [entry.subtitle, entry.period].filter(Boolean).join(" · "), copy: entry.description })));
      const awards = byKind("AWARD");
      if (awards.length) setAwardItems(awards.map(entry => ({ year: entry.period ?? "", title: entry.title, note: [entry.organization, entry.description].filter(Boolean).join(" · ") })));
      const talks = byKind("TALK");
      if (talks.length) setTalkItems(talks.map(entry => `${entry.title}${entry.organization ? ` — ${entry.organization}` : ""}${entry.period ? ` · ${entry.period}` : ""}`));
      const skillEntries = byKind("SKILL");
      if (skillEntries.length) setSkillItems(skillEntries.map(entry => entry.tags ? `${entry.title} · ${entry.tags}` : entry.title));
      const education = byKind("EDUCATION");
      if (education.length) setEducationItems(education.map(entry => ({ title: entry.title, organization: entry.organization ?? "", period: entry.period ?? "" })));
      const interests = byKind("INTEREST");
      if (interests.length) setInterestItems(interests.map(entry => ({ title: entry.title, description: entry.description })));
    }).catch(() => undefined);
  }, []);

  useEffect(() => {
    const measure = () => {
      setWide(window.innerWidth >= 900);
      if (trackRef.current) setRailDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, [projects.length]);

  return (
    <main>
      <motion.div className="reading-progress" style={{ scaleX: progress }} />
      <Cursor />
      <div className="ambient-grid" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Retour en haut">M<span>.</span>Charla<span>.</span>R.</a>
        <nav className="desktop-nav" aria-label="Navigation principale"><a href="#parcours">Parcours</a><a href="#projets">Projets</a><a href="#communaute">Communauté</a><a href="#distinctions">Repères</a></nav>
        <button className="contact-link" type="button" onClick={() => setContactOpen(true)}>Me contacter <ArrowUpRight size={16} /></button>
        <button className="menu-button" aria-label="Ouvrir le menu" onClick={() => setMenuOpen(true)}><Menu /></button>
      </header>

      <AnimatePresence>{menuOpen && <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <button aria-label="Fermer le menu" onClick={() => setMenuOpen(false)}><X /></button>
        <a onClick={() => setMenuOpen(false)} href="#parcours">Parcours</a><a onClick={() => setMenuOpen(false)} href="#projets">Projets</a><a onClick={() => setMenuOpen(false)} href="#communaute">Communauté</a><a onClick={() => setMenuOpen(false)} href="mailto:masycharlar@gmail.com">Écrire un message</a>
      </motion.div>}</AnimatePresence>

      <section id="top" className="hero" ref={heroRef}>
        <div className="hero-frame">
        <div className="grain" aria-hidden="true" />
        <HeroObject progress={heroProgress} reduceMotion={Boolean(reduceMotion)} />
        <motion.p className="eyebrow" {...reveal}>Antananarivo, Madagascar <span className="live-dot" /> Full-stack · Cloud · Communautés</motion.p>
        <motion.h1 {...reveal} transition={{ duration: .9, delay: .08, ease: [0.22, 1, 0.36, 1] }}>Je construis<br /><i>des systèmes</i><br />qui servent.</motion.h1>
        <motion.div className="hero-bottom" {...reveal} transition={{ duration: .7, delay: .18 }}>
          <p>Je suis <strong>MASY Charla Rosalie</strong>, développeuse full-stack à Antananarivo. Je relie produits web, données et cloud pour rendre les outils plus utiles, fiables et humains.</p>
          <a className="scroll-cue" href="#parcours"><span>Explorer le parcours</span><ArrowDownRight size={20} /></a>
        </motion.div>
        <div className="hero-side-note" aria-hidden="true"><span>01 / 05</span><span>Scroll to move through the work</span></div>
        <div className="hero-coordinates" aria-hidden="true">18°54′S&nbsp;&nbsp; 47°31′E</div>
        </div>
      </section>

      <section id="parcours" className="section career-section">
        <motion.div className="section-intro" {...reveal}><p className="eyebrow">01 — Parcours / 2022—aujourd’hui</p><h2>Du code au service des <i>gens.</i></h2><p className="intro-aside">Production réelle. Équipes pluridisciplinaires. Des résultats qui se mesurent.</p></motion.div>
        <div className="work-list">{careerItems.map((item, index) => <motion.article className="work-item" data-cursor="work" key={`${item.number}-${item.role}`} {...reveal} transition={{ duration: .65, delay: index * .08 }}>
          <span className="work-number">{item.number}</span><div><p className="work-meta">{item.period} · {item.place}</p><h3>{item.role}</h3><p className="work-text">{item.text}</p></div><ul>{item.facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
        </motion.article>)}</div>
        <div className="education-ribbon" data-cursor="education"><span>FORMATION</span><p>{educationItems.map(item => <span className="education-item" key={item.title}>{item.title} <b>{item.organization} · {item.period}</b></span>)}</p><span>Cloud certifié</span></div>
      </section>

      <section id="projets" className={`projects-story${reduceMotion ? " reduce-motion" : ""}`} ref={railRef}>
        <div className="projects-sticky">
          <div className="horizontal-intro"><p className="eyebrow">02 — Sélection de projets</p><h2>Du concret.<br /><i>Pas juste des démos.</i></h2><p>Les chapitres défilent avec toi. Sur mobile, parcours les cartes au doigt.</p></div>
          <motion.div className="project-rail" ref={trackRef} style={wide && !reduceMotion ? { x: railX } : undefined}>
            {projects.map((project, index) => <article className={`project-card card-${index % 4}`} data-cursor="project" key={project.title}>
              <span className="project-index">{String(index + 1).padStart(2, "0")} <i>/</i> {project.stack}</span>
              <div className="project-art" aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span><i /><b /></div>
              <div className="project-copy"><h3>{project.title}</h3><p>{project.summary}</p>{project.outcome && <strong>{project.outcome}</strong>}</div>
              {project.href ? <a className="project-arrow" href={project.href} target="_blank" rel="noreferrer" aria-label={`Voir ${project.title}`}><ArrowUpRight size={24} /></a> : <ArrowUpRight className="project-arrow" size={24} aria-hidden="true" />}
            </article>)}
          </motion.div>
          <div className="rail-caption"><span>Défilement vertical → horizontal</span><span>Faites glisser / continuez à défiler</span></div>
        </div>
      </section>

      <section className="skills-section">
        <motion.p className="eyebrow" {...reveal}>03 — Outils & pratique</motion.p>
        <motion.div className="skills-layout" {...reveal}><h2>La technique comme<br />un <i>artisanat.</i></h2><p>Du frontend aux données, de l’API au déploiement : choisir l’outil juste, comprendre le contexte, livrer quelque chose que l’équipe peut reprendre.</p></motion.div>
        <div className={`skills-marquee${tickerPaused ? " is-paused" : ""}`} aria-label="Technologies pratiquées"><div className="skills-marquee-track">{[...skillItems, ...skillItems].map((skill, i) => <span aria-hidden={i >= skillItems.length} key={`${skill}-${i}`}>{skill}<i>+</i></span>)}</div><button className="marquee-control" type="button" onClick={() => setTickerPaused(value => !value)}>{tickerPaused ? "Reprendre" : "Pause"}</button></div>
        <div className="pillars"><div data-cursor="build"><Code2 /><b>Construire</b><p>Interfaces et APIs lisibles, accessibles et maintenables.</p></div><div data-cursor="data"><Database /><b>Structurer</b><p>Des données brutes à des flux propres, traçables et fiables.</p></div><div data-cursor="cloud"><Cloud /><b>Mettre en production</b><p>Cloud, conteneurs, migration et qualité sans angle mort.</p></div></div>
      </section>

      <section id="communaute" className="community-section">
        <motion.div className="community-heading" {...reveal}><p className="eyebrow">04 — Partager, transmettre, faire grandir</p><h2>La tech devient plus forte quand elle est <i>collective.</i></h2></motion.div>
        <div className="community-grid">{communityItems.map((item, index) => <motion.article className="community-card" data-cursor="community" key={item.name} {...reveal} transition={{ duration: .6, delay: index * .06 }}><span className="community-number">{String(index + 1).padStart(2, "0")}</span><div><p className="work-meta">{item.meta}</p><h3>{item.name}</h3><p>{item.copy}</p></div><ArrowUpRight size={18} aria-hidden="true" /></motion.article>)}</div>
        <motion.div className="talk-strip" data-cursor="talk" {...reveal}><p className="eyebrow">Au micro & à l’atelier</p><div className="talk-items">{(talkItems.length ? talkItems.slice(0, 4) : ["IA responsable · Google I/O Extended 2024", "Automatisation avec n8n · Women Techmakers 2025", "Cloud pratique · GDG Get Certified 2025", "Découverte de la tech · DevFest 2025"]).map(talk => <span key={talk}>{talk}</span>)}</div><span>Google I/O Extended · DevFest · WTM · GDG</span></motion.div>
      </section>

      <section id="distinctions" className="distinctions-section">
        <motion.div {...reveal}><p className="eyebrow">05 — Repères</p><h2>Quelques jalons<br /><i>qui comptent.</i></h2></motion.div>
        <div className="distinctions-list">{awardItems.map((item, index) => <motion.article data-cursor="award" key={item.title} {...reveal} transition={{ duration: .55, delay: index * .05 }}><span>{item.year}</span><div><h3>{item.title}</h3><p>{item.note}</p></div><ArrowUpRight size={17} aria-hidden="true" /></motion.article>)}</div>
      </section>

      <section className="human-section">
        <motion.div className="human-orbit" aria-hidden="true" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }}><span /><b /></motion.div>
        <motion.p className="eyebrow" {...reveal}>En dehors des lignes de code</motion.p>
        <motion.h2 {...reveal}>Dessiner. Écrire.<br /><i>Faire de la musique.</i><br />Jouer aussi.</motion.h2>
        <div className="passion-grid">{interestItems.map((item, index) => {
          const title = item.title.toLocaleLowerCase();
          const mode = title.includes("dessin") ? "pencil" : title.includes("musique") ? "music" : title.includes("jeu") ? "game" : title.includes("écri") || title.includes("ecri") ? "write" : "square";
          const Icon = mode === "pencil" ? Pencil : mode === "music" ? Music2 : mode === "game" ? Gamepad2 : PenLine;
          return <motion.article key={item.title} className={`passion-card passion-${mode}`} data-cursor={mode} data-cursor-glow tabIndex={0} {...reveal} transition={{ duration: .6, delay: index * .06 }}><span className="passion-index">0{index + 1} / INTÉRÊT</span><Icon size={26} strokeWidth={1.5} /><h3>{item.title}</h3><p>{item.description}</p><span className="passion-mark" aria-hidden="true">↗</span></motion.article>;
        })}</div>
        <motion.p className="human-note" {...reveal}>Ces espaces nourrissent le regard, la curiosité et le goût des idées qui sortent des sentiers déjà tracés.</motion.p>
      </section>

      <footer><p>On construit la suite ?</p><button className="footer-contact" type="button" onClick={() => setContactOpen(true)}>masycharlar@gmail.com <ArrowUpRight size={18} /></button><div><a aria-label="LinkedIn de MASY Charla R." href="https://www.linkedin.com/in/charla-masy-r/" target="_blank" rel="noreferrer"><Linkedin size={18} /></a><span>© {new Date().getFullYear()} M.Charla.R. · Antananarivo</span></div></footer>
      <a className="back-to-top" href="#top" aria-label="Remonter en haut de page"><ArrowUp size={17} /></a>
      <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}
