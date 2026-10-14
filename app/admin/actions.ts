"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cookieName, signAdminSession, validAdminCredentials } from "../../lib/auth";
import { prisma } from "../../lib/db";
import { verifyAdminSession } from "../../lib/auth";
import { PortfolioKind } from "@prisma/client";

async function requireAdmin() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!await verifyAdminSession(token)) redirect("/admin");
}

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  if (!await validAdminCredentials(email, password)) redirect("/admin?error=invalid");
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
  const position = Number(formData.get("position") || 0);
  await prisma.project.create({ data: { title, summary, stack, outcome: String(formData.get("outcome") || "").trim() || null, href: String(formData.get("href") || "").trim() || null, featured: formData.get("featured") === "on", published: formData.get("published") === "on", position: Number.isInteger(position) ? position : 0 } });
  redirect("/admin");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (id) await prisma.project.delete({ where: { id } });
  redirect("/admin");
}

export async function updateProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const summary = String(formData.get("summary") || "").trim();
  const stack = String(formData.get("stack") || "").trim();
  if (!id || !title || !summary || !stack) redirect("/admin?error=required");
  const position = Number(formData.get("position") || 0);
  await prisma.project.update({ where: { id }, data: { title, summary, stack, outcome: String(formData.get("outcome") || "").trim() || null, href: String(formData.get("href") || "").trim() || null, featured: formData.get("featured") === "on", published: formData.get("published") === "on", position: Number.isInteger(position) ? position : 0 } });
  redirect("/admin");
}

function portfolioData(formData: FormData) {
  const kind = String(formData.get("kind") || "") as PortfolioKind;
  if (!Object.values(PortfolioKind).includes(kind)) redirect("/admin?error=kind");
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  if (!title || !description) redirect("/admin?error=required");
  const position = Number(formData.get("position") || 0);
  return { kind, title, description, subtitle: String(formData.get("subtitle") || "").trim() || null, organization: String(formData.get("organization") || "").trim() || null, period: String(formData.get("period") || "").trim() || null, location: String(formData.get("location") || "").trim() || null, tags: String(formData.get("tags") || "").trim() || null, metric: String(formData.get("metric") || "").trim() || null, href: String(formData.get("href") || "").trim() || null, featured: formData.get("featured") === "on", published: formData.get("published") === "on", position: Number.isInteger(position) ? position : 0 };
}

export async function createPortfolioEntry(formData: FormData) {
  await requireAdmin();
  await prisma.portfolioEntry.create({ data: portfolioData(formData) });
  redirect("/admin");
}

export async function updatePortfolioEntry(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) redirect("/admin?error=required");
  await prisma.portfolioEntry.update({ where: { id }, data: portfolioData(formData) });
  redirect("/admin");
}

export async function deletePortfolioEntry(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (id) await prisma.portfolioEntry.delete({ where: { id } });
  redirect("/admin");
}
