"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import ContactForm from "@/components/contact-Form";
import SmoothScrollLink from "./smooth-scroll-link";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const pathname = usePathname();

  // Detecta se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Atualiza o estado 'scrolled' conforme o usuário rola a página
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloqueia o scroll do body quando o menu mobile está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Função para fechar o menu
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Função para lidar com clique em links no menu mobile
  const handleMobileNavClick = useCallback(() => {
    // Fecha o menu após um pequeno delay para permitir a animação de clique
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 300);
  }, []);

  // Calcula o offset com base no dispositivo
  const getOffset = useCallback(() => {
    return isMobile ? 60 : 100;
  }, [isMobile]);

  return (
    <>
      <motion.header
        className={`sticky top-0 z-50 w-full ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo e link para a página inicial */}
            <SmoothScrollLink href="/" className="flex items-center space-x-2">
              <motion.div
                title="Fenix Telecom"
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/logo-fenix.webp"
                  alt="Logo Fênix Telecom"
                  className="object-cover md:w-48 w-36"
                  priority={true}
                  width={192}
                  height={48}
                />
              </motion.div>
            </SmoothScrollLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <SmoothScrollLink
                href="#inicio"
                className="text-md font-medium hover:text-green-500 transition-colors"
                offset={getOffset()}
              >
                Início
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#vantagens"
                className="text-md font-medium hover:text-green-500 transition-colors"
                offset={getOffset()}
              >
                Vantagens
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#fornecedor"
                className="text-md font-medium hover:text-green-500 transition-colors"
                offset={getOffset()}
              >
                Quem somos
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#orcamento"
                className="text-md font-medium hover:text-green-500 transition-colors"
                offset={getOffset()}
              >
                Orçamento
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#estoque"
                className="text-md font-medium hover:text-green-500 transition-colors"
                offset={getOffset()}
              >
                Pronta entrega
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#contato"
                className="text-md font-medium hover:text-green-500 transition-colors"
                offset={getOffset()}
              >
                Contato
              </SmoothScrollLink>
              <Button
                title="Fale com um consultor"
                className="bg-green-700 hover:bg-green-600"
                size="sm"
                onClick={() => setShowForm(true)}
              >
                Falar com consultor
              </Button>
            </nav>

            {/* Mobile Navigation Toggle */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X size={38} /> : <Menu size={38} />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden fixed inset-0 top-[72px] bg-white z-40 flex flex-col"
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="flex flex-col space-y-6 p-6 text-center text-lg">
                  <SmoothScrollLink
                    href="#inicio"
                    className="text-xl font-medium hover:text-green-500 transition-colors py-2"
                    offset={getOffset()}
                    onClick={handleMobileNavClick}
                  >
                    Início
                  </SmoothScrollLink>
                  <SmoothScrollLink
                    href="#fornecedor"
                    className="text-xl font-medium hover:text-green-500 transition-colors py-2"
                    offset={getOffset()}
                    onClick={handleMobileNavClick}
                  >
                    Quem somos
                  </SmoothScrollLink>
                  <SmoothScrollLink
                    href="#orcamento"
                    className="text-xl font-medium hover:text-green-500 transition-colors py-2"
                    offset={getOffset()}
                    onClick={handleMobileNavClick}
                  >
                    Orçamento
                  </SmoothScrollLink>
                  <SmoothScrollLink
                    href="#vantagens"
                    className="text-xl font-medium hover:text-green-500 transition-colors py-2"
                    offset={getOffset()}
                    onClick={handleMobileNavClick}
                  >
                    Vantagens
                  </SmoothScrollLink>
                  <SmoothScrollLink
                    href="#estoque"
                    className="text-xl font-medium hover:text-green-500 transition-colors py-2"
                    offset={getOffset()}
                    onClick={handleMobileNavClick}
                  >
                    Pronta entrega
                  </SmoothScrollLink>
                  <SmoothScrollLink
                    href="#contato"
                    className="text-xl font-medium hover:text-green-500 transition-colors py-2"
                    offset={getOffset()}
                    onClick={handleMobileNavClick}
                  >
                    Contato
                  </SmoothScrollLink>
                  <div className="pt-4">
                    <Button
                      title="Fale com um consultor"
                      variant="default"
                      size="lg"
                      className="w-full bg-green-700 hover:bg-green-600"
                      onClick={() => {
                        closeMenu();
                        setShowForm(true);
                      }}
                    >
                      Falar com consultor
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Contact Form Modal */}
      <ContactForm
        open={showForm}
        onOpenChange={setShowForm}
        onSubmitSuccess={(data) => {
          console.log("Form submitted from header:", data);
        }}
      />
    </>
  );
}
