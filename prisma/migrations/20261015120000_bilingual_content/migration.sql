ALTER TABLE "Project"
  ADD COLUMN "titleEn" TEXT,
  ADD COLUMN "summaryEn" TEXT,
  ADD COLUMN "outcomeEn" TEXT;

ALTER TABLE "PortfolioEntry"
  ADD COLUMN "titleEn" TEXT,
  ADD COLUMN "subtitleEn" TEXT,
  ADD COLUMN "descriptionEn" TEXT,
  ADD COLUMN "tagsEn" TEXT,
  ADD COLUMN "metricEn" TEXT;
