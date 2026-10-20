const path = require("node:path");
const { PrismaClient } = require("@prisma/client");

const envFile = process.argv[2];
if (envFile !== ".env" && envFile !== ".env.local") {
  throw new Error("Choose .env (local) or .env.local (Neon).");
}
require("dotenv").config({ path: path.resolve(envFile), override: true, quiet: true });

const prisma = new PrismaClient();
const youthMobileTitle = "Entrepreneuriat & développement d’applications mobiles";
const sesameTitle = "Année préparatoire SESAME";

async function main() {
  await prisma.$transaction(async tx => {
    const youthMobile = await tx.portfolioEntry.findUnique({
      where: { kind_title: { kind: "EDUCATION", title: youthMobileTitle } },
      select: { id: true },
    });
    if (!youthMobile) throw new Error("YouthMobile education entry not found; no changes were made.");

    await tx.portfolioEntry.update({
      where: { id: youthMobile.id },
      data: {
        titleEn: "Entrepreneurship and Mobile App Development",
        period: "Juin – nov. 2021",
        descriptionEn: "Six-month training in design thinking, mobile app development and entrepreneurship, with projects addressing local socio-economic challenges.",
        tagsEn: "Design thinking · mobile · entrepreneurship",
      },
    });

    const existingSesame = await tx.portfolioEntry.findUnique({
      where: { kind_title: { kind: "EDUCATION", title: sesameTitle } },
      select: { id: true },
    });
    if (!existingSesame) {
      const lastEducation = await tx.portfolioEntry.findFirst({
        where: { kind: "EDUCATION" },
        orderBy: { position: "desc" },
        select: { position: true },
      });
      await tx.portfolioEntry.create({
        data: {
          kind: "EDUCATION",
          title: sesameTitle,
          titleEn: "SESAME Preparatory Year",
          subtitle: "Plus haute mention",
          subtitleEn: "Highest honors",
          organization: "Programme SESAME",
          period: "Janv. – sept. 2020",
          location: "Antananarivo",
          description: "Programme préparatoire sélectif après le baccalauréat, avec approfondissement académique, esprit critique, leadership et engagement communautaire. Participation au club informatique.",
          descriptionEn: "Selective post-secondary preparatory program focused on academic foundations, critical thinking, leadership and community engagement. Participated in the IT club and graduated with highest honors.",
          tags: "Préparation universitaire · leadership · informatique",
          tagsEn: "University preparation · leadership · computing",
          position: (lastEducation?.position ?? 0) + 1,
          published: true,
        },
      });
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
