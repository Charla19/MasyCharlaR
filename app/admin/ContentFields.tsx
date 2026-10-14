"use client";

import { useState } from "react";

const kinds = [
  ["EXPERIENCE", "Expérience"], ["COMMUNITY", "Communauté / engagement"], ["AWARD", "Prix / certification"], ["EDUCATION", "Formation"], ["SKILL", "Compétence"], ["TALK", "Talk / atelier"], ["INTEREST", "Intérêt personnel"],
] as const;

type EntryValues = { kind: string; title: string; subtitle: string | null; description: string; organization: string | null; period: string | null; location: string | null; tags: string | null; metric: string | null; href: string | null; featured: boolean; published: boolean; position: number };

export function ContentFields({ entry }: { entry?: EntryValues }) {
  const [kind, setKind] = useState(entry?.kind ?? "EXPERIENCE");
  const has = (...values: string[]) => values.includes(kind);
  return <>
    <label>Type de contenu<select name="kind" value={kind} onChange={event => setKind(event.target.value)}>{kinds.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
    <label>Titre<input name="title" defaultValue={entry?.title} required /></label>
    <label>Description<textarea name="description" defaultValue={entry?.description} required /></label>
    {has("EXPERIENCE", "COMMUNITY", "AWARD", "EDUCATION", "TALK") && <label>{kind === "EXPERIENCE" ? "Fonction / rôle" : kind === "TALK" ? "Format / rôle" : "Sous-titre"}<input name="subtitle" defaultValue={entry?.subtitle ?? ""} /></label>}
    {has("EXPERIENCE", "COMMUNITY", "AWARD", "EDUCATION", "TALK") && <label>{kind === "EDUCATION" ? "Établissement" : "Organisation"}<input name="organization" defaultValue={entry?.organization ?? ""} /></label>}
    {has("EXPERIENCE", "COMMUNITY", "AWARD", "EDUCATION", "TALK") && <label>{kind === "AWARD" ? "Année / période" : "Période"}<input name="period" defaultValue={entry?.period ?? ""} placeholder="2024 — aujourd’hui" /></label>}
    {has("EXPERIENCE", "COMMUNITY", "EDUCATION", "TALK") && <label>Lieu<input name="location" defaultValue={entry?.location ?? ""} /></label>}
    {has("EXPERIENCE", "COMMUNITY", "AWARD", "SKILL", "TALK", "INTEREST") && <label>{kind === "SKILL" ? "Outils / spécialités" : kind === "INTEREST" ? "Mots-clés" : "Technologies / tags"}<input name="tags" defaultValue={entry?.tags ?? ""} placeholder="React · Python · Cloud" /></label>}
    {has("EXPERIENCE", "AWARD") && <label>{kind === "AWARD" ? "Distinction / résultat" : "Chiffre clé / résultat"}<input name="metric" defaultValue={entry?.metric ?? ""} /></label>}
    {has("EXPERIENCE", "COMMUNITY", "AWARD", "TALK") && <label>Lien public<input name="href" type="url" defaultValue={entry?.href ?? ""} /></label>}
    <label>Ordre dans cette catégorie (1 = premier)<input name="position" type="number" min={1} defaultValue={entry?.position ?? 1} /></label>
    {has("EXPERIENCE", "AWARD", "TALK") && <label className="check"><input name="featured" type="checkbox" defaultChecked={entry?.featured ?? false} /> Mettre en avant</label>}
    <label className="check"><input name="published" type="checkbox" defaultChecked={entry?.published ?? false} /> Publier</label>
  </>;
}
