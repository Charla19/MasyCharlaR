import type { Metadata } from "next";
import { headers } from "next/headers";
import "./styles.css";

export const metadata: Metadata = {
  title: "M.Charla.R. | Développeuse Full-Stack & Cloud",
  description: "Portfolio de MASY Charla Rosalie, développeuse full-stack, data et cloud à Antananarivo.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const nonce = (await headers()).get("x-nonce");
  return <html lang="fr"><body nonce={nonce ?? undefined}>{children}</body></html>;
}
