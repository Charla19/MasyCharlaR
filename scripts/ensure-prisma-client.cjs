const { existsSync, readFileSync } = require("node:fs");
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const clientTypesPath = path.join(__dirname, "..", "node_modules", ".prisma", "client", "index.d.ts");
const clientTypes = existsSync(clientTypesPath) ? readFileSync(clientTypesPath, "utf8") : "";

if (
  clientTypes.includes("get rateLimitBucket()") &&
  clientTypes.includes("get contactVerification()") &&
  clientTypes.includes('readonly titleEn: FieldRef<"Project"') &&
  clientTypes.includes('readonly descriptionEn: FieldRef<"PortfolioEntry"')
) {
  console.log("Prisma Client is up to date.");
  process.exit(0);
}

const prismaCommand = path.join(__dirname, "..", "node_modules", ".bin", process.platform === "win32" ? "prisma.cmd" : "prisma");
const result = spawnSync(prismaCommand, ["generate"], {
  cwd: path.join(__dirname, ".."),
  stdio: "inherit",
  shell: process.platform === "win32",
});

if (result.error) {
  console.error("Could not regenerate Prisma Client:", result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
