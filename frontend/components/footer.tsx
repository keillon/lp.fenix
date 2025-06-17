"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Facebook, Instagram } from "lucide-react"
import Logo from "../public//logo-fenix-branca.webp";

export default function Footer() {
  const footerLinks = [
    {
      title: "Serviços",
      links: [
        { name: "Internet", href: "#" },
        { name: "Energia", href: "#" },
        { name: "Celular", href: "#" },
        { name: "Seguros", href: "#" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { name: "Sobre nós", href: "#" },
        { name: "Carreiras", href: "#" },
        { name: "Imprensa", href: "#" },
        { name: "Blog", href: "#" },
      ],
    },
    {
      title: "Suporte",
      links: [
        { name: "Central de Ajuda", href: "#" },
        { name: "Contato", href: "#" },
        { name: "FAQ", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Termos de Uso", href: "#" },
        { name: "Privacidade", href: "#" },
        { name: "Cookies", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#", label: "Facebook" },
    { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Links de rodapé - comentados por enquanto
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-white font-medium mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div> */}

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 md:mb-0"
            >
              <Link href="/" className="text-2xl font-bold text-white">
                <div className="relative md:w-48 w-36 h-16">
                  <Image
                    src={Logo}
                    alt="Logo fênix telecom"
                    fill
                    priority
                    sizes="(max-width: 768px) 144px, 192px"
                    className="object-contain"
                  />
                </div>
              </Link>
              <p className="mt-4 text-sm text-gray-400">
                © {new Date().getFullYear()} Fenix telecom. Todos os direitos
                reservados.
              </p>
              <p className="mt-4 text-sm text-gray-400">
                CNPJ: 57.776.062/0001-07
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex space-x-4"
            >
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}