import { createHash, randomInt } from "node:crypto";
import { prisma } from "./db";

function bucketId(scope: string, identifier: string) {
  return createHash("sha256").update(`${scope}:${identifier}`).digest("hex");
}

export async function consumeRateLimit(scope: string, identifier: string, limit: number, windowSeconds: number) {
  const id = bucketId(scope, identifier);
  const rows = await prisma.$queryRaw<{ count: number }[]>`
    INSERT INTO "RateLimitBucket" ("id", "count", "windowStartedAt", "expiresAt")
    VALUES (${id}, 1, NOW(), NOW() + (${windowSeconds} * INTERVAL '1 second'))
    ON CONFLICT ("id") DO UPDATE SET
      "count" = CASE
        WHEN "RateLimitBucket"."windowStartedAt" <= NOW() - (${windowSeconds} * INTERVAL '1 second') THEN 1
        ELSE "RateLimitBucket"."count" + 1
      END,
      "windowStartedAt" = CASE
        WHEN "RateLimitBucket"."windowStartedAt" <= NOW() - (${windowSeconds} * INTERVAL '1 second') THEN NOW()
        ELSE "RateLimitBucket"."windowStartedAt"
      END,
      "expiresAt" = CASE
        WHEN "RateLimitBucket"."windowStartedAt" <= NOW() - (${windowSeconds} * INTERVAL '1 second') THEN NOW() + (${windowSeconds} * INTERVAL '1 second')
        ELSE "RateLimitBucket"."expiresAt"
      END
    RETURNING "count"
  `;

  if (randomInt(100) === 0) {
    await prisma.rateLimitBucket.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  }

  return { allowed: rows[0].count <= limit, remaining: Math.max(0, limit - rows[0].count) };
}

export async function clearRateLimit(scope: string, identifier: string) {
  await prisma.rateLimitBucket.deleteMany({ where: { id: bucketId(scope, identifier) } });
}
