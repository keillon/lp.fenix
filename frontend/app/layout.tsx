// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import CookieConsent from "@/components/cookie-consent";
import { AuthProvider } from "@/context/AuthContext";
import { Inter } from "next/font/google";
import Script from "next/script";

// Opcional: Fontes otimizadas
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fenix Telecom",
  description: "Compare e economize em serviços essenciais",
  applicationName: 'Fênix telecom',
  viewport: 'url(../public/partners.webp)',
  authors: [{name : 'keillon, mariana, ricardo'}],
  icons: {
    icon: [
      {
        url: "/favicon/favicon-96x96.png",
        sizes: "32x32",
      },
      {
        url: "/favicon/web-app-manifest-192x192.png",
        sizes: "192x192",
      },
    ],
    apple: {
      url: "/favicon/apple-touch-icon.png",
      sizes: "180x180",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Adiciona preload para imagens críticas */}
        <link rel="preload" href="/tecnico-hero.webp" as="image" type="image/webp" />
        <link rel="preload" href="/estoque.webp" as="image" type="image/webp" />
        <link rel="preload" href="/orcamento.webp" as="image" type="image/webp" />
        <link rel="preload" href="/logo-fenix-branca.webp" as="image" type="image/webp" />
        <link rel="preload" href="/logo-fenix.webp" as="image" type="image/webp" />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager - Script no HEAD */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5LKG2GLC');
            `
          }}
        />
        
        {/* Google Tag Manager - noscript (body) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-5LKGXGC"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        {/* AuthProvider para fornecer contexto de autenticação a toda a aplicação */}
        <AuthProvider>
          {/* Conteúdo principal (rotas e páginas) */}
          {children}
          {/* CookieConsent para exibir o banner de consentimento de cookies */}
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}