"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import ContactForm from "@/components/contact-Form";

// Se no seu ContactForm houver um tipo específico para os dados de envio, importe aqui.
// Exemplo: import { FormData } from "@/components/contact-Form";

interface ContactButtonProps {
  buttonText?: string;
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  formTitle?: string;
  formDescription?: string;
}

export default function ContactButton({
  buttonText = "Enviar solicitação",
  variant = "default",
  size = "default",
  className = "",
  formTitle,
  formDescription,
}: ContactButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para abrir/fechar o modal
  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
  };

  // Lida com o envio bem-sucedido do formulário
  // Substitua "any" pelo tipo correto, caso o ContactForm exporte algo como `FormData`.
  const handleSubmitSuccess = (data: any) => {
    console.log("Form submitted successfully:", data);
    // Você pode adicionar lógica adicional aqui (por exemplo, redirecionar, exibir toast, etc.)
  };

  return (
    <>
      {/* Botão que abre o modal */}
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setIsModalOpen(true)}
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        {buttonText}
      </Button>

      {/* Modal com o formulário de contato */}
      <ContactForm
        open={isModalOpen}
        onOpenChange={handleOpenChange}
        title={formTitle}
        description={formDescription}
        onSubmitSuccess={handleSubmitSuccess}
      />
    </>
  );
}
