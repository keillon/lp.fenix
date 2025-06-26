"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ContactForm from "@/components/contact-Form";
import { Button } from "@/components/ui/button";
// Variantes de animação para os blocos
const imageVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } },
};

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

export default function SectionTwo() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <section
        id="fornecedor"
        className="relative flex overflow-hidden bg-white py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Bloco com imagem */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={imageVariants}
              className="relative h-full"
            >
              <Image
                src="/fornecedor.webp"
                priority={true}
                alt="Pessoa e caixas"
                width={600}
                height={600}
                className="md:flex overflow-hidden z-0"
              />
              <div className="w-full h-10 absolute bottom-9" />
            </motion.div>

            {/* Bloco com conteúdo textual */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={textVariants}
              className="space-y-6"
            >
              <p className="text-lg md:text-xl text-green-500">
                Mantenha seu custo baixo
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#004765] leading-tight">
                O fornecedor que faz a sua empresa crescer.
              </h1>
              <p className="text-lg md:text-xl text-[#004765]">
                Provedores que crescem, estão sempre buscando o{" "}
                <strong>menor custo, pela maior qualidade.</strong> Na Fênix
                você encontra o equilíbrio entre essas duas variáveis e essa é a
                chave para o crescimento sustentável de qualquer provedor.
                Mantenha seu custo de instalação baixo, sem perder a qualidade
                do sinal que você entrega.
              </p>
              <Button
                size="lg"
                className="mt-4 font-medium bg-green-700 text-white hover:bg-green-600"
                onClick={() => setShowForm(true)}
              >
                Falar com um consultor
              </Button>
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
