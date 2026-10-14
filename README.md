# M.Charla.R. — Portfolio

Portfolio Next.js éditorial, pensé pour présenter une pratique full-stack, data et cloud avec une place plus discrète pour les engagements créatifs et communautaires.

## Lancer en local

```bash
npm install
copy .env.example .env
docker compose up -d
npx prisma migrate dev
npm run db:seed
npm run dev
```

Le site est disponible sur `http://localhost:3000` et l’espace privé sur `http://localhost:3000/admin`.

### Créer le mot de passe admin

Dans PowerShell, générez un mot de passe admin, son hash et un secret de session. Gardez le mot de passe affiché pour vous. Mettez les deux valeurs techniques dans `.env` (`AUTH_SECRET` et `ADMIN_PASSWORD_HASH_B64`) ; ne publiez jamais ce fichier :

```bash
$adminPassword = node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"
$hashB64 = node -e "require('bcryptjs').hash(process.argv[1], 12).then(hash => console.log(Buffer.from(hash).toString('base64')))" $adminPassword
$authSecret = node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
Write-Host "Mot de passe admin (gardez-le): $adminPassword"
Write-Host "Valeur pour ADMIN_PASSWORD_HASH_B64: $hashB64"
Write-Host "Valeur pour AUTH_SECRET: $authSecret"
```

Dans `.env`, remplacez les valeurs d’exemple. Supprimez toute ancienne ligne `ADMIN_PASSWORD_HASH` ; le code utilise `ADMIN_PASSWORD_HASH_B64`.

Renseignez aussi `AUTH_SECRET` avec une valeur aléatoire longue et `ADMIN_EMAIL=masycharlar@gmail.com`.

La base locale est publiée uniquement sur `127.0.0.1:5433` pour éviter les conflits d’accès au port PostgreSQL standard `5432`.

## Données et déploiement

- **Local** : PostgreSQL tourne via Docker Compose.
- **Production Vercel** : créez une base Postgres managée (Neon ou Supabase, par exemple), puis ajoutez `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL` et `ADMIN_PASSWORD_HASH_B64` dans les variables d’environnement Vercel.
- Exécutez `npx prisma migrate deploy` pendant le déploiement (ou dans votre CI) avant d’activer la gestion de contenus.

Docker sert au développement local uniquement : Vercel héberge l’application Next.js, pas le conteneur Postgres.

## Structure

- `app/page.tsx` — site public et animation.
- `app/admin` — authentification par cookie HTTP-only et gestion de tous les types de contenu.
- `prisma/schema.prisma` — modèles projets et contenus éditoriaux.
- `lib/auth.ts` — sessions JWT signées, sans mot de passe en clair.
