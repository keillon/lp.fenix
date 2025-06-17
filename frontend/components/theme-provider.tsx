'use client';

import * as React from 'react';
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes';

/**
 * Componente que encapsula o provedor de temas da biblioteca "next-themes".
 * Permite gerenciar o tema (light/dark ou outros) de forma dinâmica na aplicação.
 *
 * @param {ThemeProviderProps} props - Propriedades do NextThemesProvider.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
