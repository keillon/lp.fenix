"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ContactForm from "@/components/contact-Form";
import { Button } from "@/components/ui/button";
import HeroLogo from "../public/tecnico-hero.webp";

// Variantes de animação para os blocos de conteúdo
const leftBlockVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const rightBlockVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } },
};

const badgeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.8 } },
};

export default function Hero() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <section className="relative flex overflow-hidden bg-[#004765] py-16 md:py-24"
      id="inicio">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Bloco de texto */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={leftBlockVariants}
              className="space-y-6"
            >
              <p className="text-lg md:text-xl text-green-500">
                Produtos telecom
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Reduza seus custos com material de instalação.
              </h1>
              <p className="text-lg md:text-xl text-gray-300">
                Compre produtos telecom de qualidade com preços de fábrica. Na
                Fênix você garante produtos de fabricação própria, com o melhor
                preço do mercado.
              </p>
              <Button
                size="lg"
                className="mt-4 text-white bg-green-700 hover:bg-green-600"
                onClick={() => setShowForm(true)}
              >
                Falar com um consultor
              </Button>
            </motion.div>

            {/* Bloco com imagem e badge */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={rightBlockVariants}
              className="relative h-full"
            >
              <Image
                src={HeroLogo}
                alt="Técnico e produtos telecom"
                width={600}
                height={600}
                priority={true}
                className="overflow-hidden z-0"
              />
              {/* Elemento decorativo (sombra) */}
              <div className="absolute bottom-8 md:bottom-9 w-full h-10 shadow-xl rounded-md"></div>

              {/* Badge animada (visível apenas em desktop) */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={badgeVariants}
                className="absolute -bottom-8 left-3 hidden md:block bg-white p-4 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-3 z-20">
                  <div className="bg-green-100 p-2 rounded-full">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="green"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Queima de estoque</p>
                    <p className="text-lg font-bold text-green-600">
                      Consulte condições
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal de contato */}
      <ContactForm
        open={showForm}
        onOpenChange={setShowForm}
        title="Solicite uma cotação"
        description="Nossa equipe entrará em contato para oferecer as melhores opções para você."
        buttonText="Enviar solicitação"
        onSubmitSuccess={(data) => {
          console.log("Form submitted from CTA:", data);
          // Lógica específica do CTA pode ser adicionada aqui
        }}
      />
    </>
  );
}
