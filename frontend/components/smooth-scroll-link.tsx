"use client";

import type React from "react";

import type { ReactNode } from "react";
import Link from "next/link";

interface SmoothScrollLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  offset?: number;
  onClick?: () => void;
}

export default function SmoothScrollLink({
  href,
  children,
  className = "",
  offset = 80, // Valor padrão para compensar a altura do cabeçalho
  onClick,
}: SmoothScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Se o link for para uma âncora na mesma página
    if (href.startsWith("#")) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Atualiza a URL sem recarregar a página
        window.history.pushState(null, "", href);
      }
    } else {
      // Para links externos ou outras páginas
      window.location.href = href;
    }

    // Executa o callback onClick se fornecido
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
