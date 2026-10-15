"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUp, ArrowUpRight, Award, BookOpenText, Cloud, Code2, Database, Gamepad2, Layers3, Linkedin, Menu, Mic2, Music2, Pencil, PenLine, UsersRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Language = "fr" | "en";
type Project = { title: string; titleEn?: string | null; summary: string; summaryEn?: string | null; stack: string; outcome?: string | null; outcomeEn?: string | null; href?: string | null; featured?: boolean };
type Entry = { kind: string; title: string; titleEn?: string | null; subtitle: string | null; subtitleEn?: string | null; description: string; descriptionEn?: string | null; organization: string | null; period: string | null; location: string | null; tags: string | null; tagsEn?: string | null; metric: string | null; metricEn?: string | null; href: string | null };
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

const translations = {
  fr: {
    language: "Langue", contact: "Me contacter", mobileMessage: "Écrire un message", close: "Fermer le menu", backTop: "Remonter en haut", navJourney: "Parcours", navProjects: "Projets", navCommunity: "Communauté", navMarkers: "Repères", explore: "Explorer le parcours", heroTitle: "Je construis", heroLine: "des systèmes", heroEnd: "qui servent.", heroIntro: "Je suis MASY Charla Rosalie, développeuse full-stack à Antananarivo. Je relie produits web, données et cloud pour rendre les outils plus utiles, fiables et humains.", heroScroll: "Défilement pour découvrir", journeyEyebrow: "01 — Parcours / 2022—aujourd’hui", journeyTitle: "Du code au service des", people: "gens.", journeyAside: "Production réelle. Équipes pluridisciplinaires. Des résultats qui se mesurent.", training: "FORMATION", certifiedCloud: "Cloud certifié", projectsEyebrow: "02 — Sélection de projets", projectTitle: "Du concret.", projectItalic: "Pas juste des démos.", projectAside: "Les chapitres défilent avec toi. Sur mobile, parcours les cartes au doigt.", horizontalScroll: "Défilement vertical → horizontal", swipeScroll: "Faites glisser / continuez à défiler", skillsEyebrow: "03 — Outils & pratique", skillsTitle: "La technique comme", craft: "un artisanat.", skillsIntro: "Du frontend aux données, de l’API au déploiement : choisir l’outil juste, comprendre le contexte, livrer quelque chose que l’équipe peut reprendre.", resume: "Reprendre", pause: "Pause", build: "Construire", organize: "Structurer", deploy: "Mettre en production", buildCopy: "Interfaces et APIs lisibles, accessibles et maintenables.", organizeCopy: "Des données brutes à des flux propres, traçables et fiables.", deployCopy: "Cloud, conteneurs, migration et qualité sans angle mort.", communityEyebrow: "04 — Partager, transmettre, faire grandir", communityTitle: "La tech devient plus forte quand elle est", collective: "collective.", talks: "Au micro & à l’atelier", seeMore: "Voir plus", seeLess: "Voir moins", distinctionsEyebrow: "05 — Repères", distinctionsTitle: "Quelques jalons", matter: "qui comptent.", passionsEyebrow: "En dehors des lignes de code", drawWrite: "Dessiner. Écrire.", musicPlay: "Faire de la musique.", playAlso: "Jouer aussi.", interest: "INTÉRÊT", humanNote: "Ces espaces nourrissent le regard, la curiosité et le goût des idées qui sortent des sentiers déjà tracés.", footerPrompt: "On construit la suite ?", closeDialog: "Fermer la fenêtre", contactEyebrow: "Un projet, une idée, une conversation", contactTitle: "Parlons de la", next: "suite.", yourName: "Votre nom", yourEmail: "Votre e-mail", subject: "Le sujet", message: "Votre message", verify: "Vérification…", sent: "Message envoyé", confirmSend: "Confirmer et envoyer", continue: "Continuer", verifySuccess: "Adresse confirmée, message envoyé à Charla. Merci !", codeSent: "Un code vient d’être envoyé. Consulte aussi tes courriers indésirables.", verifyNotice: "Nous vérifierons votre adresse avant de transmettre le message.", codeLabel: "Saisis le code à 4 chiffres envoyé à l’adresse indiquée. Il expire dans 10 minutes.", invalidEmail: "L’envoi a échoué. Réessaie dans un instant.", messageLabel: "Nouveau message depuis le portfolio", portfolio: "Portfolio", workScroll: "Défilement pour parcourir les projets", formationLabel: "FORMATION", latest: "aujourd’hui", linkedin: "LinkedIn de MASY Charla R.", brandHome: "Retour en haut de page", passionDraw: "Dessiner", passionMusic: "Musique", passionWrite: "Écriture", passionGame: "Jeux vidéo", contactDesc: "Consulte aussi tes courriers indésirables.", talkFallback: "IA responsable · Google I/O Extended 2024", talkFallback2: "Automatisation avec n8n · Women Techmakers 2025", talkFallback3: "Cloud pratique · GDG Get Certified 2025", talkFallback4: "Découverte de la tech · DevFest 2025", commonEvents: "Google I/O Extended · DevFest · WTM · GDG", scrollPrompt: "Faites glisser / continuez à défiler", loading: "", error: "L’envoi a échoué. Réessaie dans un instant."
  },
  en: {
    language: "Language", contact: "Contact me", mobileMessage: "Send a message", close: "Close menu", backTop: "Back to top", navJourney: "Journey", navProjects: "Projects", navCommunity: "Community", navMarkers: "Highlights", explore: "Explore my journey", heroTitle: "I build", heroLine: "systems", heroEnd: "that serve.", heroIntro: "I’m MASY Charla Rosalie, a full-stack developer based in Antananarivo. I connect web products, data and cloud to make tools more useful, reliable and human.", heroScroll: "Scroll to explore", journeyEyebrow: "01 — Journey / 2022—present", journeyTitle: "Code in service of", people: "people.", journeyAside: "Real production. Multidisciplinary teams. Measurable outcomes.", training: "EDUCATION", certifiedCloud: "Cloud certified", projectsEyebrow: "02 — Selected work", projectTitle: "Built for real.", projectItalic: "Not just demos.", projectAside: "The chapters move with you. On mobile, swipe through the cards.", horizontalScroll: "Vertical scroll → horizontal", swipeScroll: "Swipe or keep scrolling", skillsEyebrow: "03 — Tools & practice", skillsTitle: "Technology as", craft: "a craft.", skillsIntro: "From frontend to data, API to deployment: choose the right tool, understand the context and deliver work the team can build on.", resume: "Resume", pause: "Pause", build: "Build", organize: "Structure", deploy: "Ship to production", buildCopy: "Readable, accessible and maintainable interfaces and APIs.", organizeCopy: "Turn raw data into clean, traceable and reliable flows.", deployCopy: "Cloud, containers, migrations and quality with no blind spots.", communityEyebrow: "04 — Share, teach, help others grow", communityTitle: "Technology grows stronger when it is", collective: "collective.", talks: "On stage & in the workshop", seeMore: "Show more", seeLess: "Show less", distinctionsEyebrow: "05 — Highlights", distinctionsTitle: "A few milestones", matter: "that matter.", passionsEyebrow: "Beyond the lines of code", drawWrite: "Drawing. Writing.", musicPlay: "Making music.", playAlso: "Playing too.", interest: "INTEREST", humanNote: "These spaces nurture my perspective, curiosity and appetite for ideas that take a different path.", footerPrompt: "Shall we build what’s next?", closeDialog: "Close dialog", contactEyebrow: "A project, an idea, a conversation", contactTitle: "Let’s talk about", next: "what’s next.", yourName: "Your name", yourEmail: "Your email", subject: "Subject", message: "Your message", verify: "Checking…", sent: "Message sent", confirmSend: "Confirm and send", continue: "Continue", verifySuccess: "Address verified and message sent to Charla. Thank you!", codeSent: "A code has been sent. Check your spam folder too.", verifyNotice: "We’ll verify your address before forwarding the message.", codeLabel: "Enter the 4-digit code sent to the address above. It expires in 10 minutes.", invalidEmail: "Could not send. Please try again in a moment.", messageLabel: "New message from the portfolio", portfolio: "Portfolio", workScroll: "Scroll to explore the work", formationLabel: "EDUCATION", latest: "present", linkedin: "LinkedIn profile of MASY Charla R.", brandHome: "Back to top of page", passionDraw: "Drawing", passionMusic: "Music", passionWrite: "Writing", passionGame: "Video games", contactDesc: "Check your spam folder too.", talkFallback: "Responsible AI · Google I/O Extended 2024", talkFallback2: "Automation with n8n · Women Techmakers 2025", talkFallback3: "Hands-on cloud · GDG Get Certified 2025", talkFallback4: "Discovering tech · DevFest 2025", commonEvents: "Google I/O Extended · DevFest · WTM · GDG", scrollPrompt: "Swipe or keep scrolling", loading: "", error: "Could not send. Please try again in a moment."
  }
} as const;

const careerEn = [
  { ...career[0], role: "Web & Freshworks Developer", period: "2024 — present", text: "Web applications and AI projects, production maintenance, CRM automation and infrastructure reliability for distributed teams.", facts: ["20+ websites and environments maintained", "React · Python · FastAPI · Azure · Docker"] },
  { ...career[1], role: "Full-Stack Web Developer", place: "Step Up Agency / Digital", period: "2023", text: "Business modules, hotel booking and mobile-first redesigns, with a practical focus on speed and navigation.", facts: ["Performance score: 15 → 90", "Loading time reduced by 50%"] },
  { ...career[2], role: "Web & Data Developer", period: "2022", text: "Turned heterogeneous documents into structured data with scripts, an internal API and a relational database.", facts: ["5,000+ PDFs processed", "Python · Node.js · REST API · MySQL"] },
];
const featuredWorkEn: Project[] = [
  { ...featuredWork[0], title: "Train models, clearly", summary: "A React and Material UI interface guiding uploads, annotation, validation, training and result delivery — built with a data science team.", outcome: "From technical pipeline to guided experience" },
  { ...featuredWork[1], title: "A web portfolio built to last", summary: "Migrated and monitored more than twenty websites. Rebuilt a Nuxt.js / headless WordPress site as monolithic WordPress to simplify maintenance and improve performance.", outcome: "20+ websites monitored" },
  { ...featuredWork[2], title: "5,000 documents, usable data", summary: "Automated extraction from unstructured PDFs, cleanup, relational storage and an internal API to make the pipeline reliable.", outcome: "More than 5,000 PDFs processed" },
  { ...featuredWork[3], title: "Faster products, built for mobile", summary: "Mobile-first redesign, application caching and filtering features. Also designed a full booking module for a four-star hotel in Antananarivo.", outcome: "Score: 15 → 90 · loading −50%" },
  { ...featuredWork[4], title: "Payroll, from interface to cloud", summary: "A full-stack payroll management app with a React interface, FastAPI backend and deployment on an Azure virtual machine.", outcome: "Application deployed on Azure" },
];
const communitiesEn = [
  { ...communities[0], meta: "DevFest Ambassador · talks · labs", copy: "Cloud workshops, talks on responsible AI and guidance for young developers pursuing Google Cloud certifications." },
  { ...communities[1], meta: "Speaker · mentoring", copy: "Hands-on labs on AI tools, automation and Google technologies, encouraging women to take their place in tech." },
  { ...communities[2], meta: "Mentoring · algorithms · game jams", copy: "Problem-solving practice, coding sessions and events that help Madagascar’s digital talent grow." },
  { ...communities[3], meta: "Club lead · 2021—2024", copy: "Coordinated a student team, rehearsals and cultural events — another place where technology meets collaboration." },
];
const distinctionsEn = [
  { ...distinctions[0], title: "Google Cloud Associate Cloud Engineer", note: "Certification earned in December 2024" },
  { ...distinctions[1], title: "1st prize — Clean Code Hackathon", note: "DevFest · GDG Antananarivo & AlgoMada" },
  { ...distinctions[2], title: "1st prize — Frontend Awards", note: "TechZara · accessible experience with voice commands and visual contrast" },
  { ...distinctions[3], title: "Audience award — Women’s Hackathon", note: "ESTI · Digital Divas, mentoring and visibility for women in tech" },
];
const defaultInterestsEn: Interest[] = [
  { title: "Drawing", description: "Observing, sketching and composing shapes and ideas." },
  { title: "Music", description: "Singing, listening, playing and bringing collaborative projects to life." },
  { title: "Writing", description: "Taking time to find the right words and tell a story." },
  { title: "Video games", description: "Exploring worlds, mechanics and interactive stories." },
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

function ContactDialog({ open, onClose, language }: { open: boolean; onClose: () => void; language: Language }) {
  const t = (key: keyof typeof translations.fr) => translations[language][key];
  const dialogRef = useRef<HTMLDivElement>(null);
  const [sendState, setSendState] = useState<"idle" | "sending" | "verify" | "sent" | "error">("idle");
  const [verificationId, setVerificationId] = useState("");
  const [formError, setFormError] = useState("");
  useEffect(() => {
    if (!open) return;
    setSendState("idle");
    setVerificationId("");
    setFormError("");
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
    dialogRef.current?.querySelector<HTMLElement>('input[name="name"]')?.focus();
    return () => { document.body.classList.remove("dialog-open"); window.removeEventListener("keydown", onKey); previous?.focus(); };
  }, [open, onClose]);
  return <AnimatePresence>{open && <motion.div className="contact-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <motion.div ref={dialogRef} className="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-title" initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: .99 }} transition={{ duration: .28 }}>
      <button className="dialog-close" type="button" onClick={onClose} aria-label={t("closeDialog")}><X /></button>
      <p className="eyebrow">{t("contactEyebrow")}</p><h2 id="contact-title">{t("contactTitle")} <i>{t("next")}</i></h2>
      <form onSubmit={async event => {
        event.preventDefault();
        if (sendState === "sending" || sendState === "sent") return;
        const form = event.currentTarget;
        const values = Object.fromEntries(new FormData(form).entries());
        if (verificationId) values.verificationId = verificationId;
        setFormError("");
        setSendState("sending");
        try {
          const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
          const result = await response.json() as { error?: string; verificationRequired?: boolean; verificationId?: string };
          if (!response.ok) throw new Error(result.error || t("error"));
          if (result.verificationRequired && result.verificationId) {
            setVerificationId(result.verificationId);
            setSendState("verify");
          } else {
            form.reset();
            setVerificationId("");
            setSendState("sent");
          }
        } catch (error) {
          setFormError(error instanceof Error ? error.message : t("error"));
          setSendState("error");
        }
      }}>
        <div className="contact-honeypot" aria-hidden="true"><label>Ne pas remplir<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <label>{t("yourName")}<input name="name" autoComplete="name" required /></label><label>{t("yourEmail")}<input name="replyTo" type="email" autoComplete="email" required /></label><label>{t("subject")}<input name="subject" required /></label><label>{t("message")}<textarea name="message" rows={4} required /></label>
        {verificationId && <label>{language === "fr" ? "Code reçu par e-mail" : "Email verification code"}<input name="code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{4}" minLength={4} maxLength={4} required aria-describedby="contact-verification-note" /><small id="contact-verification-note">{t("codeLabel")}</small></label>}
        <div className="dialog-actions"><button type="submit" disabled={sendState === "sending" || sendState === "sent"}>{sendState === "sending" ? t("verify") : sendState === "sent" ? t("sent") : verificationId ? t("confirmSend") : t("continue")} <ArrowUpRight size={16} /></button><span aria-live="polite">{sendState === "sent" ? t("verifySuccess") : sendState === "verify" ? t("codeSent") : sendState === "error" ? formError : t("verifyNotice")}</span></div>
      </form>
    </motion.div>
  </motion.div>}</AnimatePresence>;
}

function BackToTop({ language }: { language: Language }) {
  const [lightBackdrop, setLightBackdrop] = useState(false);

  useEffect(() => {
    let frame = 0;
    const updateColor = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const button = document.querySelector<HTMLElement>(".back-to-top");
        if (!button) return;
        const bounds = button.getBoundingClientRect();
        const underButton = document.elementsFromPoint(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2)
          .find(element => !element.closest(".back-to-top, .cursor-orbit"));

        let element: Element | null = underButton ?? null;
        let usePlum = false;
        while (element) {
          const channels = getComputedStyle(element).backgroundColor.match(/[\d.]+/g)?.map(Number);
          if (channels && channels.length >= 3 && (channels[3] ?? 1) > 0.05) {
            const linear = channels.slice(0, 3).map(channel => {
              const value = channel / 255;
              return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
            });
            usePlum = linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722 > 0.48;
            break;
          }
          element = element.parentElement;
        }
        setLightBackdrop(current => current === usePlum ? current : usePlum);
      });
    };

    updateColor();
    window.addEventListener("scroll", updateColor, { passive: true });
    window.addEventListener("resize", updateColor);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateColor);
      window.removeEventListener("resize", updateColor);
    };
  }, []);

  return <a className={`back-to-top${lightBackdrop ? " is-plum" : ""}`} href="#top" aria-label={translations[language].backTop}><ArrowUp size={17} /></a>;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("fr");
  const t = (key: keyof typeof translations.fr) => translations[language][key];
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [tickerPaused, setTickerPaused] = useState(false);
  const [projects, setProjects] = useState(featuredWork);
  const [careerItems, setCareerItems] = useState(career);
  const [communityItems, setCommunityItems] = useState(communities);
  const [awardItems, setAwardItems] = useState(distinctions);
  const [talkItems, setTalkItems] = useState<string[]>([]);
  const [showAllTalks, setShowAllTalks] = useState(false);
  const [skillItems, setSkillItems] = useState(skills);
  const [educationItems, setEducationItems] = useState([{ title: "Licence en informatique — Intégration & Développement", organization: "ESTI", period: "2021—2024" }]);
  const [interestItems, setInterestItems] = useState(defaultInterests);
  const [heroNavVisible, setHeroNavVisible] = useState(true);
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
    const saved = window.localStorage.getItem("portfolio-language");
    const detected: Language = navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
    const next = saved === "fr" || saved === "en" ? saved : detected;
    setLanguage(next);
    document.documentElement.lang = next;
  }, []);

  useEffect(() => {
    let active = true;
    document.documentElement.lang = language;
    setProjects(language === "en" ? featuredWorkEn : featuredWork);
    setCareerItems(language === "en" ? careerEn : career);
    setCommunityItems(language === "en" ? communitiesEn : communities);
    setAwardItems(language === "en" ? distinctionsEn : distinctions);
    setTalkItems([]);
    setEducationItems([{ title: language === "en" ? "Bachelor’s degree in Computer Science — Integration & Development" : "Licence en informatique — Intégration & Développement", organization: "ESTI", period: "2021—2024" }]);
    setInterestItems(language === "en" ? defaultInterestsEn : defaultInterests);
    fetch("/api/projects").then(response => response.ok ? response.json() : []).then((items: Project[]) => { if (active && items.length) setProjects(items.map(item => language === "en" ? { ...item, title: item.titleEn || item.title, summary: item.summaryEn || item.summary, outcome: item.outcomeEn || item.outcome } : item)); }).catch(() => undefined);
    fetch("/api/portfolio").then(response => response.ok ? response.json() : null).then((data: { entries?: Entry[] } | null) => {
      if (!active) return;
      const entries = data?.entries ?? [];
      const byKind = (kind: string) => entries.filter(entry => entry.kind === kind);
      const title = (entry: Entry) => language === "en" ? entry.titleEn || entry.title : entry.title;
      const subtitle = (entry: Entry) => language === "en" ? entry.subtitleEn || entry.subtitle : entry.subtitle;
      const description = (entry: Entry) => language === "en" ? entry.descriptionEn || entry.description : entry.description;
      const tags = (entry: Entry) => language === "en" ? entry.tagsEn || entry.tags : entry.tags;
      const metric = (entry: Entry) => language === "en" ? entry.metricEn || entry.metric : entry.metric;
      const experienceEntries = byKind("EXPERIENCE");
      if (experienceEntries.length) setCareerItems(experienceEntries.map((entry, index) => ({ number: String(index + 1).padStart(2, "0"), role: title(entry), place: entry.organization ?? "", period: entry.period?.replace("aujourd’hui", t("latest")) ?? "", text: description(entry), facts: [metric(entry), tags(entry)].filter(Boolean) as string[] })));
      const communityEntries = byKind("COMMUNITY");
      if (communityEntries.length) setCommunityItems(communityEntries.map(entry => ({ name: title(entry), meta: [subtitle(entry), entry.period].filter(Boolean).join(" · "), copy: description(entry) })));
      const awards = byKind("AWARD");
      if (awards.length) setAwardItems(awards.map(entry => ({ year: entry.period ?? "", title: title(entry), note: [entry.organization, description(entry)].filter(Boolean).join(" · ") })));
      const talks = byKind("TALK");
      if (talks.length) setTalkItems(talks.map(entry => `${title(entry)}${entry.organization ? ` — ${entry.organization}` : ""}${entry.period ? ` · ${entry.period}` : ""}`));
      const skillEntries = byKind("SKILL");
      if (skillEntries.length) setSkillItems(skillEntries.map(entry => tags(entry) ? `${title(entry)} · ${tags(entry)}` : title(entry)));
      const education = byKind("EDUCATION");
      if (education.length) setEducationItems(education.map(entry => ({ title: title(entry), organization: entry.organization ?? "", period: entry.period ?? "" })));
      const interests = byKind("INTEREST");
      if (interests.length) setInterestItems(interests.map(entry => ({ title: title(entry), description: description(entry) })));
    }).catch(() => undefined);
    return () => { active = false; };
  }, [language]);

  useEffect(() => {
    const updateVisibility = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const visible = window.scrollY < 1 || hero.getBoundingClientRect().bottom > window.innerHeight + 2;
      setHeroNavVisible(current => current === visible ? current : visible);
    };
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
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
      <header className={`topbar${heroNavVisible ? "" : " is-away"}`} aria-hidden={!heroNavVisible} inert={!heroNavVisible}>
        <a className="brand" href="#top" aria-label={t("brandHome")}>M<span>.</span>Charla<span>.</span>R.</a>
        <nav className="desktop-nav" aria-label={language === "fr" ? "Navigation principale" : "Main navigation"}><a href="#parcours">{t("navJourney")}</a><a href="#projets">{t("navProjects")}</a><a href="#communaute">{t("navCommunity")}</a><a href="#distinctions">{t("navMarkers")}</a></nav>
        <div className="topbar-actions"><div className="language-switch" role="group" aria-label={t("language")}><button type="button" aria-pressed={language === "fr"} onClick={() => { localStorage.setItem("portfolio-language", "fr"); setLanguage("fr"); }}>FR</button><span aria-hidden="true">/</span><button type="button" aria-pressed={language === "en"} onClick={() => { localStorage.setItem("portfolio-language", "en"); setLanguage("en"); }}>EN</button></div><button className="contact-link" type="button" onClick={() => setContactOpen(true)}>{t("contact")} <ArrowUpRight size={16} /></button></div>
        <button className="menu-button" aria-label={language === "fr" ? "Ouvrir le menu" : "Open menu"} onClick={() => setMenuOpen(true)}><Menu /></button>
      </header>

      <AnimatePresence>{menuOpen && <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <button aria-label={t("close")} onClick={() => setMenuOpen(false)}><X /></button>
        <a onClick={() => setMenuOpen(false)} href="#parcours">{t("navJourney")}</a><a onClick={() => setMenuOpen(false)} href="#projets">{t("navProjects")}</a><a onClick={() => setMenuOpen(false)} href="#communaute">{t("navCommunity")}</a><div className="mobile-menu-bottom"><div className="language-switch language-switch-mobile" role="group" aria-label={t("language")}><button type="button" aria-pressed={language === "fr"} onClick={() => { localStorage.setItem("portfolio-language", "fr"); setLanguage("fr"); }}>FR</button><span aria-hidden="true">/</span><button type="button" aria-pressed={language === "en"} onClick={() => { localStorage.setItem("portfolio-language", "en"); setLanguage("en"); }}>EN</button></div><button className="mobile-contact-link" type="button" onClick={() => { setMenuOpen(false); setContactOpen(true); }}>{t("mobileMessage")} <ArrowUpRight size={20} /></button></div>
      </motion.div>}</AnimatePresence>

      <section id="top" className="hero" ref={heroRef}>
        <div className="hero-frame">
        <div className="grain" aria-hidden="true" />
        <HeroObject progress={heroProgress} reduceMotion={Boolean(reduceMotion)} />
        <motion.p className="eyebrow" {...reveal}>Antananarivo, Madagascar <span className="live-dot" /> Full-stack · Cloud · {language === "fr" ? "Communautés" : "Community"}</motion.p>
        <motion.h1 {...reveal} transition={{ duration: .9, delay: .08, ease: [0.22, 1, 0.36, 1] }}>{t("heroTitle")}<br /><i>{t("heroLine")}</i><br />{t("heroEnd")}</motion.h1>
        <motion.div className="hero-bottom" {...reveal} transition={{ duration: .7, delay: .18 }}>
          <p>{language === "fr" ? <>Je suis <strong>MASY Charla Rosalie</strong>, développeuse full-stack à Antananarivo. Je relie produits web, données et cloud pour rendre les outils plus utiles, fiables et humains.</> : <>I’m <strong>MASY Charla Rosalie</strong>, a full-stack developer in Antananarivo. I connect web products, data and cloud to make tools more useful, reliable and human.</>}</p>
          <a className="scroll-cue" href="#parcours"><span>{t("explore")}</span><ArrowDownRight size={20} /></a>
        </motion.div>
        <div className="hero-side-note" aria-hidden="true"><span>01 / 05</span><span>{t("workScroll")}</span></div>
        <div className="hero-coordinates" aria-hidden="true">18°54′S&nbsp;&nbsp; 47°31′E</div>
        </div>
      </section>

      <section id="parcours" className="section career-section">
        <motion.div className="section-intro" {...reveal}><p className="eyebrow">{t("journeyEyebrow")}</p><h2>{t("journeyTitle")} <i>{t("people")}</i></h2><p className="intro-aside">{t("journeyAside")}</p></motion.div>
        <div className="work-list">{careerItems.map((item, index) => <motion.article className="work-item" data-cursor="work" key={`${item.number}-${item.role}`} {...reveal} transition={{ duration: .65, delay: index * .08 }}>
          <span className="work-number">{item.number}</span><div><p className="work-meta">{item.period} · {item.place}</p><h3>{item.role}</h3><p className="work-text">{item.text}</p></div><ul>{item.facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
        </motion.article>)}</div>
        <div className="education-ribbon" data-cursor="education"><span>{t("training")}</span><p>{educationItems.map(item => <span className="education-item" key={item.title}>{item.title} <b>{item.organization} · {item.period}</b></span>)}</p><span>{t("certifiedCloud")}</span></div>
      </section>

      <section id="projets" className={`projects-story${reduceMotion ? " reduce-motion" : ""}`} ref={railRef}>
        <div className="projects-sticky">
          <div className="horizontal-intro"><p className="eyebrow">{t("projectsEyebrow")}</p><h2>{t("projectTitle")}<br /><i>{t("projectItalic")}</i></h2><p>{t("projectAside")}</p></div>
          <motion.div className="project-rail" ref={trackRef} style={wide && !reduceMotion ? { x: railX } : undefined}>
            {projects.map((project, index) => <article className={`project-card card-${index % 4}`} data-cursor="project" key={project.title}>
              <span className="project-index">{String(index + 1).padStart(2, "0")} <i>/</i> {project.stack}</span>
              <div className="project-art" aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span><i /><b /></div>
              <div className="project-copy"><h3>{project.title}</h3><p>{project.summary}</p>{project.outcome && <strong>{project.outcome}</strong>}</div>
              {project.href ? <a className="project-arrow" href={project.href} target="_blank" rel="noreferrer" aria-label={`Voir ${project.title}`}><ArrowUpRight size={24} /></a> : <ArrowUpRight className="project-arrow" size={24} aria-hidden="true" />}
            </article>)}
          </motion.div>
          <div className="rail-caption"><span>{t("horizontalScroll")}</span><span>{t("swipeScroll")}</span></div>
        </div>
      </section>

      <section className="skills-section">
        <motion.p className="eyebrow" {...reveal}>{t("skillsEyebrow")}</motion.p>
        <motion.div className="skills-layout" {...reveal}><h2>{t("skillsTitle")}<br /><i>{t("craft")}</i></h2><p>{t("skillsIntro")}</p></motion.div>
        <div className={`skills-marquee${tickerPaused ? " is-paused" : ""}`} aria-label={language === "fr" ? "Technologies pratiquées" : "Technologies in practice"}><div className="skills-marquee-track">{[...skillItems, ...skillItems].map((skill, i) => <span aria-hidden={i >= skillItems.length} key={`${skill}-${i}`}>{skill}<i>+</i></span>)}</div><button className="marquee-control" type="button" onClick={() => setTickerPaused(value => !value)}>{tickerPaused ? t("resume") : t("pause")}</button></div>
        <div className="pillars"><div data-cursor="build"><Code2 /><b>{t("build")}</b><p>{t("buildCopy")}</p></div><div data-cursor="data"><Database /><b>{t("organize")}</b><p>{t("organizeCopy")}</p></div><div data-cursor="cloud"><Cloud /><b>{t("deploy")}</b><p>{t("deployCopy")}</p></div></div>
      </section>

      <section id="communaute" className="community-section">
        <motion.div className="community-heading" {...reveal}><p className="eyebrow">{t("communityEyebrow")}</p><h2>{t("communityTitle")} <i>{t("collective")}</i></h2></motion.div>
        <div className="community-grid">{communityItems.map((item, index) => <motion.article className="community-card" data-cursor="community" key={item.name} {...reveal} transition={{ duration: .6, delay: index * .06 }}><span className="community-number">{String(index + 1).padStart(2, "0")}</span><div><p className="work-meta">{item.meta}</p><h3>{item.name}</h3><p>{item.copy}</p></div><ArrowUpRight size={18} aria-hidden="true" /></motion.article>)}</div>
        <motion.div className="talk-strip" data-cursor="talk" {...reveal}><p className="eyebrow">{t("talks")}</p><div className="talk-content"><div className="talk-items">{(talkItems.length ? (showAllTalks ? talkItems : talkItems.slice(0, 6)) : [t("talkFallback"), t("talkFallback2"), t("talkFallback3"), t("talkFallback4")]).map((talk, index) => <span key={`${talk}-${index}`}>{talk}</span>)}</div>{talkItems.length > 6 && <button className="talk-more" type="button" aria-expanded={showAllTalks} onClick={() => setShowAllTalks(value => !value)}>{showAllTalks ? t("seeLess") : `${t("seeMore")} (+${talkItems.length - 6})`}</button>}</div><span>{t("commonEvents")}</span></motion.div>
      </section>

      <section id="distinctions" className="distinctions-section">
        <motion.div {...reveal}><p className="eyebrow">{t("distinctionsEyebrow")}</p><h2>{t("distinctionsTitle")}<br /><i>{t("matter")}</i></h2></motion.div>
        <div className="distinctions-list">{awardItems.map((item, index) => <motion.article data-cursor="award" key={item.title} {...reveal} transition={{ duration: .55, delay: index * .05 }}><span>{item.year}</span><div><h3>{item.title}</h3><p>{item.note}</p></div><ArrowUpRight size={17} aria-hidden="true" /></motion.article>)}</div>
      </section>

      <section className="human-section">
        <motion.div className="human-orbit" aria-hidden="true" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }}><span /><b /></motion.div>
        <motion.p className="eyebrow" {...reveal}>{t("passionsEyebrow")}</motion.p>
        <motion.h2 {...reveal}>{t("drawWrite")}<br /><i>{t("musicPlay")}</i><br />{t("playAlso")}</motion.h2>
        <div className="passion-grid">{interestItems.map((item, index) => {
          const title = item.title.toLocaleLowerCase();
          const mode = title.includes("dessin") ? "pencil" : title.includes("musique") ? "music" : title.includes("jeu") ? "game" : title.includes("écri") || title.includes("ecri") ? "write" : "square";
          const Icon = mode === "pencil" ? Pencil : mode === "music" ? Music2 : mode === "game" ? Gamepad2 : PenLine;
          return <motion.article key={item.title} className={`passion-card passion-${mode}`} data-cursor={mode} data-cursor-glow tabIndex={0} {...reveal} transition={{ duration: .6, delay: index * .06 }}><span className="passion-index">0{index + 1} / {t("interest")}</span><Icon size={26} strokeWidth={1.5} /><h3>{item.title}</h3><p>{item.description}</p><span className="passion-mark" aria-hidden="true">↗</span></motion.article>;
        })}</div>
        <motion.p className="human-note" {...reveal}>{t("humanNote")}</motion.p>
      </section>

      <footer><p>{t("footerPrompt")}</p><button className="footer-contact" type="button" onClick={() => setContactOpen(true)}>masycharlar@gmail.com <ArrowUpRight size={18} /></button><div><a aria-label={t("linkedin")} href="https://www.linkedin.com/in/charla-masy-r/" target="_blank" rel="noreferrer"><Linkedin size={18} /></a><span>© {new Date().getFullYear()} M.Charla.R. · Antananarivo</span></div></footer>
      <BackToTop language={language} />
      <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} language={language} />
    </main>
  );
}
