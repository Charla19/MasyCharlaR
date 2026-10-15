import { cookies, headers } from "next/headers";
import Home from "./home-client";
import { prisma } from "../lib/db";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [cookieStore, requestHeaders] = await Promise.all([cookies(), headers()]);
  const savedLanguage = cookieStore.get("portfolio-language")?.value;
  const browserLanguage = requestHeaders.get("accept-language")?.split(",")[0]?.toLowerCase() ?? "";
  const initialLanguage = savedLanguage === "fr" || savedLanguage === "en"
    ? savedLanguage
    : browserLanguage.startsWith("fr") ? "fr" : "en";

  const [initialProjects, initialEntries] = await Promise.all([
    prisma.project.findMany({
      where: { published: true },
      orderBy: [{ position: "asc" }, { featured: "desc" }, { createdAt: "asc" }, { id: "asc" }],
      select: { title: true, titleEn: true, summary: true, summaryEn: true, stack: true, outcome: true, outcomeEn: true, href: true, featured: true },
    }),
    prisma.portfolioEntry.findMany({
      where: { published: true },
      orderBy: [{ kind: "asc" }, { position: "asc" }, { createdAt: "asc" }, { id: "asc" }],
      select: { kind: true, title: true, titleEn: true, subtitle: true, subtitleEn: true, description: true, descriptionEn: true, organization: true, period: true, location: true, tags: true, tagsEn: true, metric: true, metricEn: true, href: true },
    }),
  ]);

  return <Home initialLanguage={initialLanguage} initialProjects={initialProjects} initialEntries={initialEntries} />;
}
