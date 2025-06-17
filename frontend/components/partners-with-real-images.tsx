"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Slider from "@/components/slider";

type Partner = {
  id: number;
  name: string;
  imageUrl: string;
};

const partners: Partner[] = [
  { id: 1, name: "Parceiro 1", imageUrl: "/abracadeira.png" },
  { id: 2, name: "Parceiro 2", imageUrl: "/alca.png" },
  { id: 3, name: "Parceiro 3", imageUrl: "/alca-preformada.png" },
  { id: 4, name: "Parceiro 4", imageUrl: "/arame.png" },
  { id: 5, name: "Parceiro 5", imageUrl: "/bap.png" },
  { id: 6, name: "Parceiro 6", imageUrl: "/conico.png" },
  { id: 7, name: "Parceiro 7", imageUrl: "/esticador.png" },
  { id: 8, name: "Parceiro 8", imageUrl: "/olhal.png" },
  { id: 9, name: "Parceiro 9", imageUrl: "/plaqueta.png" },
  { id: 10, name: "Parceiro 10", imageUrl: "/splitter.png" },
  { id: 11, name: "Parceiro 11", imageUrl: "/supa.png" },
];

// Função auxiliar para agrupar os parceiros em conjuntos de 3
function groupPartners(partners: Partner[], groupSize: number): Partner[][] {
  const groups: Partner[][] = [];
  for (let i = 0; i < partners.length; i += groupSize) {
    groups.push(partners.slice(i, i + groupSize));
  }
  return groups;
}

const partnerGroups = groupPartners(partners, 3);

const textContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Partners() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textContainerVariants}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Seu fornecedor de confiança</h2>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
            Produtos de qualidade, à pronta entrega, com preços de fábrica.
          </p>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto mt-4">
            + desconto na sua primeira compra.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <Slider autoPlay interval={7000}>
            {partnerGroups.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8"
              >
                {group.map((partner) => (
                  <motion.div
                    key={partner.id}
                    whileHover={{
                      y: -5,
                      boxShadow:
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    className="flex items-center justify-center"
                  >
                    <div className="bg-white shadow-md rounded-lg p-6 w-full h-40 flex items-center justify-center transition-all duration-300">
                      <Image
                        src={partner.imageUrl}
                        alt={partner.name}
                        width={300}
                        height={300}
                        className="max-h-24 object-contain"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
