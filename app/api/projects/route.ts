import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({ where: { published: true }, orderBy: [{ featured: "desc" }, { position: "asc" }, { createdAt: "desc" }] });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json([]);
  }
}
