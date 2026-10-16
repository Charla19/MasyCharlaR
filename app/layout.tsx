import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import "./styles.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.charlamasy.site"),
  title: "M.Charla.R. | Développeuse Full-Stack & Cloud",
  description: "Portfolio de MASY Charla Rosalie, développeuse full-stack, data et cloud à Antananarivo.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "M.Charla.R.",
    title: "M.Charla.R. | Développeuse Full-Stack & Cloud",
    description: "Portfolio de MASY Charla Rosalie, développeuse full-stack, data et cloud à Antananarivo.",
    locale: "fr_FR",
    images: [{ url: "/portfolio-share.png", width: 1885, height: 972, alt: "Capture du portfolio M.Charla.R. — Je construis des systèmes qui servent." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "M.Charla.R. | Développeuse Full-Stack & Cloud",
    description: "Portfolio de MASY Charla Rosalie, développeuse full-stack, data et cloud à Antananarivo.",
    images: ["/portfolio-share.png"],
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [cookieStore, requestHeaders] = await Promise.all([cookies(), headers()]);
  const nonce = requestHeaders.get("x-nonce");
  const savedLanguage = cookieStore.get("portfolio-language")?.value;
  const browserLanguage = requestHeaders.get("accept-language")?.split(",")[0]?.toLowerCase() ?? "";
  const language = savedLanguage === "fr" || savedLanguage === "en" ? savedLanguage : browserLanguage.startsWith("fr") ? "fr" : "en";
  return <html lang={language}><body nonce={nonce ?? undefined}>{children}</body></html>;
}
