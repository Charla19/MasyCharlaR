-- CreateEnum
CREATE TYPE "PortfolioKind" AS ENUM ('EXPERIENCE', 'COMMUNITY', 'AWARD', 'EDUCATION', 'SKILL', 'TALK', 'INTEREST');

-- CreateTable
CREATE TABLE "PortfolioEntry" (
    "id" TEXT NOT NULL,
    "kind" "PortfolioKind" NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    "organization" TEXT,
    "period" TEXT,
    "location" TEXT,
    "tags" TEXT,
    "metric" TEXT,
    "href" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PortfolioEntry_kind_published_position_idx" ON "PortfolioEntry"("kind", "published", "position");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioEntry_kind_title_key" ON "PortfolioEntry"("kind", "title");
