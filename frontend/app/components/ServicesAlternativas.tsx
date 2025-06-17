"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Zap, Percent, MapPin, Check } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ServicesAlternativas() {
  // Estado para alternar entre diferentes opções de fundo
  const [backgroundOption, setBackgroundOption] = useState<string>("gradient1");

  // Array de serviços com ícones e títulos
  const services = [
    {
      icon: <Truck className="h-10 w-10 text-blue-500" />,
      title: "Entrega em todo o Brasil",
    },
    {
      icon: <Zap className="h-10 w-10 text-yellow-500" />,
      title: "Produtos à pronta entrega",
    },
    {
      icon: <Percent className="h-10 w-10 text-green-500" />,
      title: "5% OFF na sua primeira compra",
    },
    {
      icon: <MapPin className="h-10 w-10 text-red-500" />,
      title: "Produtos fabricados para as condições climáticas do Brasil",
    },
  ];

  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Opções de fundo - com tipagem explícita
  const backgroundOptions: Record<string, string> = {
    gradient1: "bg-gradient-to-b from-blue-900 to-blue-700",
    gradient2: "bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-800",
    gradient3: "bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800",
    solid: "bg-blue-800",
    pattern: "bg-blue-800 relative"
  };

  // Função para mudar a opção de fundo
  const toggleBackground = () => {
    const options = Object.keys(backgroundOptions);
    const currentIndex = options.indexOf(backgroundOption);
    const nextIndex = (currentIndex + 1) % options.length;
    setBackgroundOption(options[nextIndex]);
  };

  return (
    <section
      id="vantagens"
      className={`py-16 md:py-24 w-full ${backgroundOptions[backgroundOption]}`}
    >
      {/* Padrão de fundo (quando selecionado) */}
      {backgroundOption === "pattern" && (
        <div className="absolute inset-0 opacity-20" 
          style={{ 
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", 
            backgroundSize: "24px 24px" 
          }}
        />
      )}

      {/* Controles de desenvolvimento (remova na produção) */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleBackground}
          className="bg-white text-blue-800 px-3 py-1 rounded shadow text-sm flex items-center gap-2"
        >
          <Check className="h-4 w-4" />
          Alternar fundo
        </button>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xl text-green-400 max-w-4xl mx-auto mb-4 font-bold">
            Benefícios
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Seu fornecedor de confiança.
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-white">
            Produtos de qualidade, à pronta entrega, com preços de fábrica.
          </p>
          <p className="text-lg max-w-2xl mx-auto text-white">
            <span className="text-2xl">+ </span>Desconto na sua primeira compra
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg text-center transition-shadow bg-white/95 backdrop-blur">
                <CardHeader>
                  <div className="flex justify-center mb-3">{service.icon}</div>
                  <CardTitle className="text-lg md:text-xl">{service.title}</CardTitle>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}