"use client";

import { useCallback } from "react";
import Link from "next/link";
import type { ReactNode, MouseEvent } from "react";

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
  offset = 80,
  onClick,
}: SmoothScrollLinkProps) {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      if (href.startsWith("#")) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      } else {
        window.location.href = href;
      }

      if (onClick) {
        onClick();
      }
    },
    [href, offset, onClick]
  );

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
