"use client";

import dynamic from "next/dynamic";

// Import dynamically to avoid SSR issues
const ServicesAlternativas = dynamic(
    () => import("../components/ServicesAlternativas"),
    { ssr: false }
  );
  
export default function DebugPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Página de Diagnóstico</h1>
      
      <div className="mb-8 p-4 bg-yellow-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Status das Imagens</h2>
        <p>
          Na terceira imagem que você compartilhou, posso ver que as imagens estão com erro 304, 
          o que significa que elas não existem no local esperado ou não foram modificadas.
        </p>
        <ul className="list-disc pl-5 mt-3">
          <li className="mb-1">tecnico-hero.webp - <span className="text-red-500">Não encontrada</span></li>
          <li className="mb-1">estoque.webp - <span className="text-red-500">Não encontrada</span></li>
          <li className="mb-1">orcamento.webp - <span className="text-red-500">Não encontrada</span></li>
          <li className="mb-1">logo-fenix-branca.webp - <span className="text-red-500">Não encontrada</span></li>
          <li className="mb-1">logo-fenix.webp - <span className="text-red-500">Não encontrada</span></li>
        </ul>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Alternativa para o componente Services</h2>
        <p className="mb-4">
          Abaixo está o componente ServicesAlternativas que funciona sem depender de imagens:
        </p>
        
        <ServicesAlternativas />
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Como resolver:</h2>
        <ol className="list-decimal pl-5">
          <li className="mb-2">
            <strong>Crie a pasta /public/images</strong> se ela não existir
          </li>
          <li className="mb-2">
            <strong>Adicione suas imagens na pasta /public/images</strong>
          </li>
          <li className="mb-2">
            <strong>Atualize os caminhos em seu código:</strong>
            <ul className="list-disc pl-5 mt-1">
              <li>De: <code>/tecnico-hero.webp</code></li>
              <li>Para: <code>/images/tecnico-hero.webp</code></li>
            </ul>
          </li>
          <li className="mb-2">
            <strong>Ou use o componente ServicesAlternativas</strong> enquanto resolve os problemas de imagem
          </li>
        </ol>
      </div>
    </div>
  );
}