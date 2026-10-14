const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const entries = [
  { kind: "EXPERIENCE", title: "Développeuse Web & Freshworks", subtitle: "Full-stack · CRM · IA", organization: "Humans4Help", period: "2024 — aujourd’hui", location: "Antananarivo · équipes distribuées", description: "Applications web et projets IA, maintenance de production, automatisation CRM et stabilité d’infrastructures. Collaboration avec des équipes web, data et marketing, et accompagnement de stagiaires.", tags: "React · Python · FastAPI · Azure · Docker · Freshworks", metric: "20+ sites et environnements maintenus", featured: true },
  { kind: "EXPERIENCE", title: "Développeuse Web Full-Stack", subtitle: "Mobile-first · performance", organization: "Step Up Agence / Step Up Digital", period: "2023", location: "Antananarivo", description: "Modules métier, réservation hôtelière, refontes mobile-first et stratégies de cache pour améliorer les performances et la navigation.", tags: "PHP · SQL · JavaScript · WordPress", metric: "Score de performance 15 → 90 · chargement −50 %" },
  { kind: "EXPERIENCE", title: "Développeuse Web & Data", subtitle: "API · automatisation de données", organization: "Tan’IT Technologie", period: "2022", location: "Antananarivo", description: "Extraction et structuration de documents PDF non structurés, API REST interne et stockage des données dans une base relationnelle.", tags: "Python · Node.js · MySQL · API REST", metric: "Plus de 5 000 PDF traités" },
  { kind: "COMMUNITY", title: "GDG Antananarivo", subtitle: "DevFest Ambassador · talks · labs", period: "2023 — aujourd’hui", description: "Ateliers cloud, interventions autour de l’IA responsable et accompagnement de jeunes développeurs vers la certification Google Cloud. Ambassadrice DevFest en 2024 et 2025.", tags: "Google Cloud · DevFest · mentorat" },
  { kind: "COMMUNITY", title: "Women Techmakers Antananarivo", subtitle: "Intervenante · mentorat", period: "2023 — aujourd’hui", description: "Labs pratiques autour des outils IA, de l’automatisation et des technologies Google, pour encourager la représentation des femmes dans la tech.", tags: "IA · automatisation · Women in Tech" },
  { kind: "COMMUNITY", title: "AlgoMada", subtitle: "Mentorat · algorithmes · game jam", period: "2025 — aujourd’hui", description: "Pratique du problem-solving, sessions de code et événements qui valorisent les talents numériques malgaches, dont MAT et AlgoGames.", tags: "Algorithmes · programmation · jeux" },
  { kind: "COMMUNITY", title: "Es’Tia Mozika", subtitle: "Responsable du club étudiant", organization: "ESTI", period: "2021 — 2024", description: "Coordination du bureau étudiant, des équipes, répétitions et événements culturels — un terrain où la musique rencontre l’organisation collective.", tags: "Musique · coordination · événements" },
  { kind: "COMMUNITY", title: "Creative Minds", subtitle: "Bénévole · créativité locale", period: "2026 — aujourd’hui", description: "Soutien à l’organisation d’événements et à la valorisation de jeunes talents créatifs et innovants à Madagascar.", tags: "Créativité · engagement local" },
  { kind: "COMMUNITY", title: "iTeam-$ Community", subtitle: "Membre active · organisation d’événements", period: "2022 — 2024", description: "Contribution à des projets open source et co-organisation de deux éditions de l’événement Why Not Linux.", tags: "Open source · Linux" },
  { kind: "AWARD", title: "Google Cloud Associate Cloud Engineer", subtitle: "Certification professionnelle", organization: "Google Cloud", period: "2024", description: "Certification obtenue le 19 décembre 2024, après une préparation et un accompagnement communautaire autour du cloud.", tags: "GCP · cloud · infrastructure", featured: true },
  { kind: "AWARD", title: "1er prix — Clean Code Hackathon", organization: "DevFest · GDG Antananarivo & AlgoMada", period: "2023", description: "Prix remporté en équipe lors du hackathon DevFest, après conception, modélisation, développement et présentation devant un jury.", tags: "Code · algorithmes · équipe" },
  { kind: "AWARD", title: "1er prix — Frontend Awards", organization: "TechZara", period: "2023", description: "Expérience frontend avec commandes vocales et contrastes visuels pour faciliter la recherche d’objets aux personnes malvoyantes.", tags: "Frontend · accessibilité · design" },
  { kind: "AWARD", title: "Prix coup de cœur — Women’s Hackathon", organization: "ESTI · projet Digital Divas", period: "2023", description: "Plateforme imaginée en équipe pour rendre visibles les réalisations de femmes dans la tech et encourager le mentorat entre générations.", tags: "Mentorat · femmes dans la tech" },
  { kind: "AWARD", title: "3e place — Orange Digital Center Champions", organization: "Orange Digital Center Madagascar", period: "2023", description: "Compétition nationale de programmation en équipe avec des étudiants sélectionnés.", tags: "Programmation compétitive · collaboration" },
  { kind: "AWARD", title: "2e place — Hackathon inter-universitaire", organization: "TechZara", period: "2022", description: "Développement rapide d’une solution avec une équipe universitaire, principalement sur la conception et le frontend.", tags: "Design thinking · frontend" },
  { kind: "AWARD", title: "3e place — Novembre Numérique", organization: "IFM · Passion4Humanity", period: "2021", description: "Arti’Zone, une plateforme de mise en relation avec des artisans et leurs créations, pensée pour soutenir leur visibilité et leurs ventes en ligne.", tags: "Entrepreneuriat · impact local" },
  { kind: "EDUCATION", title: "Licence en informatique — Intégration & Développement", subtitle: "Mention première classe", organization: "ESTI — École Supérieure des Technologies de l’Information", period: "2021 — 2024", location: "Antananarivo", description: "Formation en génie logiciel, développement full-stack, bases de données, administration serveur, algorithmes et cloud. Mémoire et soutenance autour d’une plateforme hôtelière.", tags: "Génie logiciel · intégration · développement" },
  { kind: "EDUCATION", title: "Entrepreneuriat & développement d’applications mobiles", organization: "YouthMobile Madagascar", period: "2021", description: "Formation intensive en design thinking, développement mobile et entrepreneuriat pour répondre à des enjeux socio-économiques locaux.", tags: "Design thinking · mobile · entrepreneuriat" },
  { kind: "SKILL", title: "Python", description: "Backend, automatisation et traitement de données.", tags: "Scripts · pipelines · data" },
  { kind: "SKILL", title: "React & interfaces", description: "Interfaces web métier et parcours adaptés aux usages réels.", tags: "React · Material UI · Next.js" },
  { kind: "SKILL", title: "APIs & bases de données", description: "Conception d’API, modélisation relationnelle et contrôle d’intégrité.", tags: "FastAPI · Django REST · MySQL · PostgreSQL" },
  { kind: "SKILL", title: "Cloud & production", description: "Déploiement, maintenance et stabilité des applications.", tags: "Google Cloud · Azure · Docker · Linux · Nginx" },
  { kind: "SKILL", title: "CMS & intégration", description: "Intégration sur mesure et maintenance de sites et CRM.", tags: "WordPress · PHP · Freshworks CRM" },
  { kind: "TALK", title: "Atelier Jeunes Explorateurs", subtitle: "Introduction à la tech pour les 7–17 ans", organization: "DevFest Antananarivo", period: "2025", description: "Atelier interactif pour faire découvrir les métiers et les possibilités de la technologie aux jeunes.", tags: "Jeunesse · découverte" },
  { kind: "TALK", title: "Métiers des TIC pour les boursiers SESAME", subtitle: "Conférence d’orientation", organization: "Programme SESAME", period: "2025", description: "Présentation des parcours et opportunités dans les métiers du numérique.", tags: "Orientation · transmission" },
  { kind: "TALK", title: "Hands-On Cloud Build", subtitle: "Atelier pratique de certification Google Cloud", organization: "GDG Antananarivo · Get Certified", period: "2025", description: "Session pratique pour aider la communauté à se préparer à la certification Google Cloud Associate Cloud Engineer.", tags: "Cloud · mentorat" },
  { kind: "TALK", title: "AI Agents & Intelligent Automation with n8n", subtitle: "Atelier technique", organization: "Women Techmakers IWD", period: "2025", description: "Exploration de l’automatisation intelligente et des agents IA à l’aide de n8n.", tags: "n8n · IA · automatisation" },
  { kind: "TALK", title: "Creating Responsible AI Products", subtitle: "Conférence technique", organization: "Google I/O Extended Antananarivo", period: "2024", description: "Échanges sur la création de produits IA attentifs à leurs usages, impacts et responsabilités.", tags: "IA responsable · produit" },
  { kind: "TALK", title: "Balancing Generative AI Power with User Responsibility", subtitle: "Keynote", organization: "DevFest Antananarivo", period: "2024", description: "Réflexion sur les capacités de l’IA générative et la responsabilité de ses utilisateurs.", tags: "IA générative · responsabilité" },
  { kind: "INTEREST", title: "Dessin", description: "Observer, esquisser, composer des formes et des idées." },
  { kind: "INTEREST", title: "Musique", description: "Chanter, écouter, jouer et faire vivre les projets collectifs." },
  { kind: "INTEREST", title: "Écriture", description: "Prendre le temps de trouver les mots justes et de raconter." },
  { kind: "INTEREST", title: "Jeux vidéo", description: "Explorer des univers, des mécaniques et des histoires interactives." },
];

async function main() {
  for (const [position, entry] of entries.entries()) {
    const { kind, title, ...data } = entry;
    await prisma.portfolioEntry.upsert({
      where: { kind_title: { kind, title } },
      create: { kind, title, ...data, position, published: true },
      update: { ...data, position, published: true },
    });
  }
  console.log(`Seeded ${entries.length} portfolio entries.`);
}

main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
