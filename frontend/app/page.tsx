"use client";

import dynamic from "next/dynamic";
import Head from "next/head";

// Importações dinâmicas com priorização para componentes com imagens
const Header = dynamic(() => import("@/components/header"), { 
  ssr: true,
  loading: () => <div className="h-20 bg-gray-100"></div> // Placeholder enquanto carrega
});

// Componentes com imagens críticas (LCP) devem ter priority na opção
const Hero = dynamic(() => import("@/components/hero"), { 
  ssr: true, // Renderiza no servidor para melhor SEO e LCP
  loading: () => <div className="h-[600px] bg-slate-100"></div> // Reserva espaço
});

// Outros componentes podem ser carregados sob demanda
const SectionTwo = dynamic(() => import("@/components/SectionTwo"));
const Orcamento = dynamic(() => import("@/components/orcamento"));
const Services = dynamic(() => import("@/components/services"));
const SectionEstoque = dynamic(() => import("@/components/SectionEstoque"));
const CallToAction = dynamic(() => import("@/components/call-to-action"));
const Footer = dynamic(() => import("@/components/footer"));
const WhatsappButton = dynamic(() => import("@/components/WhatsappButton"));

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Adiciona preload para imagens críticas */}
      <Head>
        <link rel="preload" href="/tecnico-hero.webp" as="image" type="image/webp" />
        <link rel="preload" href="/estoque.webp" as="image" type="image/webp" />
        <link rel="preload" href="/orcamento.webp" as="image" type="image/webp" />
        <link rel="preload" href="/logo-fenix-branca.webp" as="image" type="image/webp" />
      </Head>
      
      <Header />
      <main className="flex-1 min-h-[800px] md:min-h-[1200px] relative">
        <Hero />
        <Services />
        <SectionTwo />
        <Orcamento />
        <SectionEstoque />
        <CallToAction />
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  );
}