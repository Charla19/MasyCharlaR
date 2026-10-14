import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({ where: { published: true }, orderBy: [{ position: "asc" }, { featured: "desc" }, { createdAt: "asc" }, { id: "asc" }] });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json([]);
  }
}
