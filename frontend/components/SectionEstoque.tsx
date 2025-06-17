"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import ContactForm from "@/components/contact-Form";
import { useState } from "react";
import EstoqueLogo from "../public/estoque.webp";

export default function SectionTwo() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <section
        className="flex relative overflow-hidden bg-white py-16 md:py-24"
        id="estoque"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-full"
            >
              <Image
                src={EstoqueLogo}
                priority={true}
                alt="Pessoa e caixas"
                width={600}
                height={600}
                className=" md:flex overflow-hidden z-0"
              />
              <div className="w-full h-10 absolute bottom-9 "></div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg md:text-xl text-green-500">
                Queima de estoque!
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#004765] leading-tight">
                Consulte condições especiais de produtos em estoque.
              </h1>
              <p className="text-lg md:text-xl text-[#004765]">
                <strong>Reduza ainda mais seu custo</strong> com preços e
                condições exclusivas do estoque Fênix. Consulte os produtos
                disponíveis e preços no nosso WhatsApp.
              </p>

              <Button
                size="lg"
                className="mt-4 text-primary font-medium bg-green-700 text-white] text-white hover:bg-green-600"
                onClick={() => setShowForm(true)}
              >
                Falar com um consultor
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Background elements */}
        {/* <div className="absolute top-20 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div> */}
      </section>
      <ContactForm
        open={showForm}
        onOpenChange={setShowForm}
        title="Solicite uma cotação"
        description="Nossa equipe entrará em contato para oferecer as melhores opções para você."
        buttonText="Enviar solicitação"
        onSubmitSuccess={(data) => {
          console.log("Form submitted from CTA:", data);
          // Lógica específica do CTA aqui
        }}
      />
    </>
  );
}
