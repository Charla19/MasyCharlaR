"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { cookieName, signAdminSession, validAdminCredentials } from "../../lib/auth";
import { prisma } from "../../lib/db";
import { verifyAdminSession } from "../../lib/auth";
import { clearRateLimit, consumeRateLimit } from "../../lib/rate-limit";
import { PortfolioKind, Prisma } from "@prisma/client";

const temporaryPosition = 2_147_483_647;

function displayPosition(value: FormDataEntryValue | null) {
  const position = Number(value);
  return Number.isInteger(position) && position > 0 ? position : 1;
}

async function placeProject(tx: Prisma.TransactionClient, id: string, position: number) {
  const rows = await tx.project.findMany({ orderBy: [{ position: "asc" }, { createdAt: "asc" }, { id: "asc" }], select: { id: true } });
  const ids = rows.filter(row => row.id !== id).map(row => row.id);
  ids.splice(Math.min(position - 1, ids.length), 0, id);
  for (const [index, projectId] of ids.entries()) await tx.project.update({ where: { id: projectId }, data: { position: index + 1 } });
}

async function normalizeProjects(tx: Prisma.TransactionClient) {
  const rows = await tx.project.findMany({ orderBy: [{ position: "asc" }, { createdAt: "asc" }, { id: "asc" }], select: { id: true } });
  for (const [index, row] of rows.entries()) await tx.project.update({ where: { id: row.id }, data: { position: index + 1 } });
}

async function placePortfolioEntry(tx: Prisma.TransactionClient, kind: PortfolioKind, id: string, position: number) {
  const rows = await tx.portfolioEntry.findMany({ where: { kind }, orderBy: [{ position: "asc" }, { createdAt: "asc" }, { id: "asc" }], select: { id: true } });
  const ids = rows.filter(row => row.id !== id).map(row => row.id);
  ids.splice(Math.min(position - 1, ids.length), 0, id);
  for (const [index, entryId] of ids.entries()) await tx.portfolioEntry.update({ where: { id: entryId }, data: { position: index + 1 } });
}

async function normalizePortfolioKind(tx: Prisma.TransactionClient, kind: PortfolioKind) {
  const rows = await tx.portfolioEntry.findMany({ where: { kind }, orderBy: [{ position: "asc" }, { createdAt: "asc" }, { id: "asc" }], select: { id: true } });
  for (const [index, row] of rows.entries()) await tx.portfolioEntry.update({ where: { id: row.id }, data: { position: index + 1 } });
}

async function requireAdmin() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!await verifyAdminSession(token)) redirect("/admin");
}

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const clientIp = (await headers()).get("x-real-ip")?.trim() || "unknown";
  let rateLimitAllowed = false;
  try {
    rateLimitAllowed = (await consumeRateLimit("admin-login", clientIp, 10, 15 * 60)).allowed;
  } catch {
    redirect("/admin?error=invalid");
  }
  if (!rateLimitAllowed || !await validAdminCredentials(email, password)) redirect("/admin?error=invalid");
  try {
    await clearRateLimit("admin-login", clientIp);
  } catch {
    redirect("/admin?error=invalid");
  }
  const jar = await cookies();
  jar.set(cookieName, await signAdminSession(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 60 * 60 * 8, path: "/" });
  redirect("/admin");
}

export async function logout() { const jar = await cookies(); jar.delete(cookieName); redirect("/admin"); }

export async function createProject(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const stack = String(formData.get("stack") || "").trim();
  if (!title || !summary || !stack) redirect("/admin?error=required");
  const position = displayPosition(formData.get("position"));
  await prisma.$transaction(async tx => {
    const project = await tx.project.create({ data: { title, titleEn: String(formData.get("titleEn") || "").trim() || null, summary, summaryEn: String(formData.get("summaryEn") || "").trim() || null, stack, outcome: String(formData.get("outcome") || "").trim() || null, outcomeEn: String(formData.get("outcomeEn") || "").trim() || null, href: String(formData.get("href") || "").trim() || null, featured: formData.get("featured") === "on", published: formData.get("published") === "on", position: temporaryPosition } });
    await placeProject(tx, project.id, position);
  });
  redirect("/admin");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (id) await prisma.$transaction(async tx => { await tx.project.delete({ where: { id } }); await normalizeProjects(tx); });
  redirect("/admin");
}

export async function updateProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const stack = String(formData.get("stack") || "").trim();
  if (!id || !title || !summary || !stack) redirect("/admin?error=required");
  const position = displayPosition(formData.get("position"));
  await prisma.$transaction(async tx => {
    await tx.project.update({ where: { id }, data: { title, titleEn: String(formData.get("titleEn") || "").trim() || null, summary, summaryEn: String(formData.get("summaryEn") || "").trim() || null, stack, outcome: String(formData.get("outcome") || "").trim() || null, outcomeEn: String(formData.get("outcomeEn") || "").trim() || null, href: String(formData.get("href") || "").trim() || null, featured: formData.get("featured") === "on", published: formData.get("published") === "on", position: temporaryPosition } });
    await placeProject(tx, id, position);
  });
  redirect("/admin");
}

function portfolioData(formData: FormData) {
  const kind = String(formData.get("kind") || "") as PortfolioKind;
  if (!Object.values(PortfolioKind).includes(kind)) redirect("/admin?error=kind");
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  if (!title || !description) redirect("/admin?error=required");
  const position = displayPosition(formData.get("position"));
  return { kind, title, titleEn: String(formData.get("titleEn") || "").trim() || null, description, descriptionEn: String(formData.get("descriptionEn") || "").trim() || null, subtitle: String(formData.get("subtitle") || "").trim() || null, subtitleEn: String(formData.get("subtitleEn") || "").trim() || null, organization: String(formData.get("organization") || "").trim() || null, period: String(formData.get("period") || "").trim() || null, tags: String(formData.get("tags") || "").trim() || null, tagsEn: String(formData.get("tagsEn") || "").trim() || null, location: String(formData.get("location") || "").trim() || null, metric: String(formData.get("metric") || "").trim() || null, metricEn: String(formData.get("metricEn") || "").trim() || null, href: String(formData.get("href") || "").trim() || null, featured: formData.get("featured") === "on", published: formData.get("published") === "on", position };
}

export async function createPortfolioEntry(formData: FormData) {
  await requireAdmin();
  const data = portfolioData(formData);
  await prisma.$transaction(async tx => {
    const entry = await tx.portfolioEntry.create({ data: { ...data, position: temporaryPosition } });
    await placePortfolioEntry(tx, data.kind, entry.id, data.position);
  });
  redirect("/admin");
}

export async function updatePortfolioEntry(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) redirect("/admin?error=required");
  const data = portfolioData(formData);
  await prisma.$transaction(async tx => {
    const current = await tx.portfolioEntry.findUniqueOrThrow({ where: { id }, select: { kind: true } });
    await tx.portfolioEntry.update({ where: { id }, data: { ...data, position: temporaryPosition } });
    if (current.kind !== data.kind) await normalizePortfolioKind(tx, current.kind);
    await placePortfolioEntry(tx, data.kind, id, data.position);
  });
  redirect("/admin");
}

export async function deletePortfolioEntry(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (id) await prisma.$transaction(async tx => {
    const current = await tx.portfolioEntry.findUnique({ where: { id }, select: { kind: true } });
    if (current) { await tx.portfolioEntry.delete({ where: { id } }); await normalizePortfolioKind(tx, current.kind); }
  });
  redirect("/admin");
}
