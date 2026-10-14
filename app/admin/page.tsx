import { cookies } from "next/headers";
import { createPortfolioEntry, createProject, deletePortfolioEntry, deleteProject, login, logout, updatePortfolioEntry, updateProject } from "./actions";
import { cookieName, verifyAdminSession } from "../../lib/auth";
import { prisma } from "../../lib/db";
import { ContentFields } from "./ContentFields";

const kinds = [
  ["EXPERIENCE", "Expérience"], ["COMMUNITY", "Communauté / engagement"], ["AWARD", "Prix / certification"], ["EDUCATION", "Formation"], ["SKILL", "Compétence"], ["TALK", "Talk / atelier"], ["INTEREST", "Intérêt personnel"],
] as const;

export default async function Admin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const authenticated = await verifyAdminSession((await cookies()).get(cookieName)?.value);
  const params = await searchParams;
  if (!authenticated) return <main className="admin"><p className="eyebrow">Private studio · M.Charla.R.</p><h1>Content room.</h1><p>Accès réservé à MASY Charla R.</p><form action={login}><label>Email<input name="email" type="email" required autoComplete="email" /></label><label>Mot de passe<input name="password" type="password" required autoComplete="current-password" /></label>{params.error && <p className="error">Identifiants incorrects.</p>}<button>Entrer</button></form></main>;

  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];
  let entries: Awaited<ReturnType<typeof prisma.portfolioEntry.findMany>> = [];
  let databaseReady = true;
  try {
    [projects, entries] = await Promise.all([
      prisma.project.findMany({ orderBy: [{ position: "asc" }, { createdAt: "asc" }, { id: "asc" }] }),
      prisma.portfolioEntry.findMany({ orderBy: [{ kind: "asc" }, { position: "asc" }, { createdAt: "asc" }, { id: "asc" }] }),
    ]);
    projects = projects.map((project, index) => ({ ...project, position: index + 1 }));
    const kindRanks = new Map<string, number>();
    entries = entries.map(entry => {
      const position = (kindRanks.get(entry.kind) ?? 0) + 1;
      kindRanks.set(entry.kind, position);
      return { ...entry, position };
    });
  } catch { databaseReady = false; }

  return <main className="admin admin-wide">
    <p className="eyebrow">Private studio · M.Charla.R.</p><h1>Content room.</h1>
    <p>Gère les projets, expériences, communautés, distinctions, formations, compétences, talks et centres d’intérêt. Les brouillons restent invisibles au public.</p>
    {!databaseReady && <p className="error">Base de données indisponible : vérifie Docker et applique la migration Prisma.</p>}
    {params.error && <p className="error">Vérifie les champs obligatoires avant d’enregistrer.</p>}
    <div className="admin-grid">
      <section className="admin-panel"><p className="eyebrow">01 · Projets</p><h2>Ajouter un projet</h2><form action={createProject}>
        <label>Titre<input name="title" required /></label><label>Résumé<textarea name="summary" required /></label><label>Technologies<input name="stack" required /></label><label>Résultat / impact<input name="outcome" /></label><label>Lien public<input name="href" type="url" /></label><label>Ordre d’affichage (1 = premier)<input name="position" type="number" min={1} defaultValue={projects.length + 1} /></label><label className="check"><input name="featured" type="checkbox" /> Mettre en avant</label><label className="check"><input name="published" type="checkbox" /> Publier</label><button disabled={!databaseReady}>Enregistrer le projet</button>
      </form></section>
      <section className="admin-panel"><p className="eyebrow">02 · Le reste du portfolio</p><h2>Ajouter un contenu</h2><form action={createPortfolioEntry}>
        <ContentFields /><button disabled={!databaseReady}>Enregistrer le contenu</button>
      </form></section>
    </div>
    <section className="content-manager"><div className="manager-heading"><div><p className="eyebrow">03 · Contenus enregistrés</p><h2>{projects.length + entries.length} entrées</h2></div><form action={logout}><button className="quiet-button">Se déconnecter</button></form></div>
      {projects.map(project => <details className="managed-entry" key={project.id}><summary><span>Projet</span><b>{project.title}</b><i>{project.published ? "Publié" : "Brouillon"}</i></summary><form action={updateProject} className="managed-form"><input type="hidden" name="id" value={project.id} /><label>Titre<input name="title" defaultValue={project.title} required /></label><label>Résumé<textarea name="summary" defaultValue={project.summary} required /></label><label>Technologies<input name="stack" defaultValue={project.stack} required /></label><label>Résultat / impact<input name="outcome" defaultValue={project.outcome ?? ""} /></label><label>Lien public<input name="href" type="url" defaultValue={project.href ?? ""} /></label><label>Ordre d’affichage (1 = premier)<input name="position" type="number" min={1} defaultValue={project.position} /></label><label className="check"><input name="featured" type="checkbox" defaultChecked={project.featured} /> Mettre en avant</label><label className="check"><input name="published" type="checkbox" defaultChecked={project.published} /> Publié</label><button>Mettre à jour</button></form><form action={deleteProject}><input type="hidden" name="id" value={project.id} /><button className="delete-button">Supprimer le projet</button></form></details>)}
      {entries.map(entry => <details className="managed-entry" key={entry.id}><summary><span>{kinds.find(([value]) => value === entry.kind)?.[1] ?? entry.kind}</span><b>{entry.title}</b><i>{entry.published ? "Publié" : "Brouillon"}</i></summary><form action={updatePortfolioEntry} className="managed-form"><input type="hidden" name="id" value={entry.id} /><ContentFields entry={entry} /><button>Mettre à jour</button></form><form action={deletePortfolioEntry}><input type="hidden" name="id" value={entry.id} /><button className="delete-button">Supprimer le contenu</button></form></details>)}
      {!projects.length && !entries.length && <p>Aucun contenu pour l’instant. Ajoute un projet ou une entrée ci-dessus.</p>}
    </section>
  </main>;
}
