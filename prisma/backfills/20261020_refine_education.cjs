const path = require("node:path");
const { PrismaClient } = require("@prisma/client");

const envFile = process.argv[2];
if (envFile !== ".env" && envFile !== ".env.local") {
  throw new Error("Choose .env (local) or .env.local (Neon).");
}
require("dotenv").config({ path: path.resolve(envFile), override: true, quiet: true });

const prisma = new PrismaClient();
const revisions = [
  {
    previousTitle: "Licence en informatique — Intégration & Développement",
    title: "Licence en informatique, développement & intégration",
    titleEn: "Bachelor's Degree in Computer Science, Development & Integration",
    organization: "ESTI — École Supérieure des Technologies de l’Information",
    period: "Mars 2021 – sept. 2024",
    location: "Antananarivo",
    description: "Cursus universitaire en informatique, spécialisé dans le développement et l’intégration.",
    descriptionEn: "Computer science degree specializing in software development and systems integration.",
    tags: "Développement · intégration",
    tagsEn: "Development · integration",
  },
  {
    previousTitle: "Année préparatoire SESAME",
    title: "Orientation professionnelle & leadership",
    titleEn: "Professional Orientation and Leadership Development",
    organization: "Programme SESAME",
    period: "2021 – 2023",
    location: "Antananarivo",
    description: "Programme de développement professionnel axé sur le leadership et l’orientation vers les métiers du numérique.",
    descriptionEn: "Professional development focused on leadership and career orientation in technology.",
    tags: "Leadership · orientation",
    tagsEn: "Leadership · career guidance",
  },
  {
    previousTitle: "Entrepreneuriat & développement d’applications mobiles",
    title: "Développement mobile & entrepreneuriat",
    titleEn: "Mobile App Development & Entrepreneurship",
    subtitle: "Certificat de participation",
    subtitleEn: "Certificate of participation",
    organization: "YouthMobile Madagascar",
    period: "Juil. 2021 – déc. 2022",
    description: "Programme pour 150 jeunes filles : création d’une application mobile liée à un objectif de développement durable, puis présentation devant un jury.",
    descriptionEn: "Program for 150 young women: building a mobile app around a Sustainable Development Goal and presenting it to a jury.",
    tags: "Mobile · entrepreneuriat · ODD",
    tagsEn: "Mobile · entrepreneurship · SDGs",
  },
  {
    title: "Communication professionnelle & savoir-être",
    titleEn: "Professional Communication & Soft Skills",
    organization: "YouthFirst Madagascar",
    period: "Sept. 2020",
    description: "Formation aux compétences relationnelles et aux bonnes pratiques de communication en entreprise ou en freelance.",
    descriptionEn: "Training in interpersonal skills and professional communication for work in a company or as a freelancer.",
    tags: "Communication · relations humaines",
    tagsEn: "Communication · interpersonal skills",
  },
];

async function main() {
  await prisma.$transaction(async tx => {
    const existing = await tx.portfolioEntry.findMany({
      where: { kind: "EDUCATION" },
      select: { id: true, title: true, position: true },
    });
    const allowedTitles = new Set(revisions.flatMap(({ title, previousTitle }) => [title, previousTitle].filter(Boolean)));
    if (existing.some(entry => !allowedTitles.has(entry.title))) {
      throw new Error("Unexpected education entry; no changes were made.");
    }
    const firstPosition = Math.min(...existing.map(entry => entry.position));
    if (!Number.isFinite(firstPosition)) throw new Error("No education entries found.");

    for (const [index, { previousTitle, ...data }] of revisions.entries()) {
      const matches = existing.filter(entry => entry.title === previousTitle || entry.title === data.title);
      if (matches.length > 1) throw new Error(`Duplicate education entry: ${data.title}`);
      if (matches.length === 0 && (index === 0 || index === 2)) throw new Error(`Expected education entry missing: ${data.title}`);

      if (matches.length === 1) {
        await tx.portfolioEntry.update({
          where: { id: matches[0].id },
          data: { ...data, position: firstPosition + index },
        });
      } else {
        await tx.portfolioEntry.create({
          data: { kind: "EDUCATION", ...data, position: firstPosition + index, published: true },
        });
      }
    }
  });

  const entries = await prisma.portfolioEntry.findMany({
    where: { kind: "EDUCATION", published: true },
    select: { title: true, titleEn: true, period: true, position: true },
    orderBy: { position: "asc" },
  });
  console.log(`${envFile}: ${JSON.stringify(entries)}`);
}

main().catch(error => { console.error(error.message); process.exitCode = 1; }).finally(() => prisma.$disconnect());
