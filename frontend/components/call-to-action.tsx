"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/contact-Form";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.5 },
  },
};

export default function CallToAction() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <section className="py-16 md:py-24 bg-[#004765]" id="contato">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Bloco de texto animado */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={textVariants}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Pronto para começar a economizar?
              </h2>
              <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mt-4">
                Consulte valores e encontre as melhores ofertas para o seu provedor
              </p>
            </motion.div>

            {/* Botão animado */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={buttonVariants}
            >
              <Button
                size="lg"
                className="mt-4 text-white font-medium bg-green-500 hover:bg-green-600"
                onClick={() => setShowForm(true)}
              >
                Falar com um consultor
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formulário de contato (modal) */}
      <ContactForm
        open={showForm}
        onOpenChange={setShowForm}
        title="Solicite uma cotação"
        description="Nossa equipe entrará em contato com as melhores condições para o seu negócio"
        buttonText="Enviar solicitação"
        onSubmitSuccess={(data) => {
          console.log("Form submitted from CTA:", data);
          // Lógica adicional após envio bem-sucedido
        }}
      />
    </>
  );
}
