import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export async function GET() {
  try {
    const [projects, entries] = await Promise.all([
      prisma.project.findMany({ where: { published: true }, orderBy: [{ position: "asc" }, { featured: "desc" }, { createdAt: "asc" }, { id: "asc" }] }),
      prisma.portfolioEntry.findMany({ where: { published: true }, orderBy: [{ kind: "asc" }, { position: "asc" }, { createdAt: "asc" }, { id: "asc" }] }),
    ]);
    return NextResponse.json({ projects, entries }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ projects: [], entries: [] });
  }
}
