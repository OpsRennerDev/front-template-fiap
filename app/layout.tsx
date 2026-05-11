import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loja FIAP",
  description: "Demo de deploy — Next.js + API Node",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <header>
          <h1>🛒 Loja FIAP</h1>
          <p>Demo de deploy multi-plataforma</p>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
