import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EnLimpio · Tu negocio, en limpio",
  description:
    "Mandanos la info de un mes como la tengas y en 72 horas tenés el estado de resultados de tu negocio. Gratis, revisado por Pablo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR">
      <body>{children}</body>
    </html>
  );
}
