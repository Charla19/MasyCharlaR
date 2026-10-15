import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import "./styles.css";

export const metadata: Metadata = {
  title: "M.Charla.R. | Développeuse Full-Stack & Cloud",
  description: "Portfolio de MASY Charla Rosalie, développeuse full-stack, data et cloud à Antananarivo.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [cookieStore, requestHeaders] = await Promise.all([cookies(), headers()]);
  const nonce = requestHeaders.get("x-nonce");
  const savedLanguage = cookieStore.get("portfolio-language")?.value;
  const browserLanguage = requestHeaders.get("accept-language")?.split(",")[0]?.toLowerCase() ?? "";
  const language = savedLanguage === "fr" || savedLanguage === "en" ? savedLanguage : browserLanguage.startsWith("fr") ? "fr" : "en";
  return <html lang={language}><body nonce={nonce ?? undefined}>{children}</body></html>;
}
