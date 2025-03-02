"use client";

import { SessionProvider } from "next-auth/react";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <head>
        <title>Catering Elite | Sistema de Gestión</title>
        <meta name="description" content="Sistema premium de gestión de inventario y eventos para servicios de catering" />
      </head>
      <body className={`${montserrat.variable} font-sans h-full bg-gray-50`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
