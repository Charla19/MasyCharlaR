import { cookies, headers } from "next/headers";

export default async function Loading() {
  const [cookieStore, requestHeaders] = await Promise.all([cookies(), headers()]);
  const savedLanguage = cookieStore.get("portfolio-language")?.value;
  const browserLanguage = requestHeaders.get("accept-language")?.split(",")[0]?.toLowerCase() ?? "";
  const isFrench = savedLanguage === "fr" || (savedLanguage !== "en" && browserLanguage.startsWith("fr"));

  return (
    <main className="portfolio-loading" aria-busy="true" aria-live="polite">
      <span className="portfolio-loading-brand">M<span>.</span>Charla<span>.</span>R.</span>
      <span className="portfolio-loading-line" aria-hidden="true"><i /></span>
      <span className="portfolio-loading-label">{isFrench ? "Chargement du portfolio" : "Loading portfolio"}</span>
    </main>
  );
}
