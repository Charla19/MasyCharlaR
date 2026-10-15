const fs = require("node:fs");
const { spawn } = require("node:child_process");
const { parse } = require("dotenv");

const localEnv = parse(fs.readFileSync(".env"));

if (!localEnv.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing from .env. Local development expects the local database URL here.");
}

process.env.DATABASE_URL = localEnv.DATABASE_URL;

const next = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "dev"], {
  env: process.env,
  stdio: "inherit",
});

next.on("exit", code => process.exit(code ?? 1));
