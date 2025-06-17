"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ContactForm from "@/components/contact-Form";
import { Button } from "@/components/ui/button";
import OrcamentoLogo from '../public/orcamento.webp'

// Variantes para animação dos blocos
const leftBlockVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const rightBlockVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } },
};

export default function Orcamento() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <section
        id="orcamento"
        className="relative flex overflow-hidden bg-gray-200 py-16 md:py-24"
      >
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
                O melhor preço do mercado
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#004765] leading-tight">
                Como funciona o orçamento?
              </h1>
              <p className="text-lg md:text-xl text-[#004765]">
                Preencha o formulário no botão{" "}
                <strong>"Falar com um consultor"</strong> e, assim que enviar,
                receberemos suas informações para dar sequência ao atendimento.
              </p>
              <p className="text-lg md:text-xl text-[#004765]">
                Consulte os valores e garanta as melhores condições.
              </p>
              <Button
                size="lg"
                className="mt-4 text-white bg-green-700 hover:bg-green-600"
                onClick={() => setShowForm(true)}
              >
                Falar com um consultor
              </Button>
            </motion.div>

            {/* Bloco com imagem */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={rightBlockVariants}
              className="relative h-full"
            >
              <Image
                src={OrcamentoLogo}
                alt="Pessoas conversando por telefone"
                width={500}
                height={600}
                priority={true}
                className="overflow-hidden z-0"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal de contato */}
      <ContactForm
        open={showForm}
        onOpenChange={setShowForm}
        title="Solicite uma cotação"
        description="Nossa equipe entrará em contato com as melhores condições para seu provedor."
        buttonText="Enviar solicitação"
        onSubmitSuccess={(data) => {
          console.log("Form submitted from CTA:", data);
          // Adicione a lógica específica para o orçamento, se necessário
        }}
      />
    </>
  );
}
