import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "M.Charla.R. | Développeuse Full-Stack & Cloud",
  description: "Portfolio de MASY Charla Rosalie, développeuse full-stack, data et cloud à Antananarivo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
