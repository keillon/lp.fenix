"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageSolutions() {
  const [activeTab, setActiveTab] = useState("nextImage");
  
  // Exemplos de caminhos de imagem para testar (substitua pelos caminhos que funcionarem)
  const imagePath = "/placeholder-image.jpg"; // Substitua pelo caminho que funcionar
  const bgImagePath = "/placeholder-bg.jpg"; // Substitua pelo caminho que funcionar

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Soluções para Carregar Imagens</h1>

      {/* Tabs para alternar entre diferentes soluções */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab("nextImage")}
          className={`py-2 px-4 ${
            activeTab === "nextImage"
              ? "border-b-2 border-blue-500 font-medium"
              : "text-gray-500"
          }`}
        >
          Next.js Image
        </button>
        <button
          onClick={() => setActiveTab("htmlImg")}
          className={`py-2 px-4 ${
            activeTab === "htmlImg"
              ? "border-b-2 border-blue-500 font-medium"
              : "text-gray-500"
          }`}
        >
          HTML img
        </button>
        <button
          onClick={() => setActiveTab("cssBackground")}
          className={`py-2 px-4 ${
            activeTab === "cssBackground"
              ? "border-b-2 border-blue-500 font-medium"
              : "text-gray-500"
          }`}
        >
          CSS Background
        </button>
        <button
          onClick={() => setActiveTab("bgFallbacks")}
          className={`py-2 px-4 ${
            activeTab === "bgFallbacks"
              ? "border-b-2 border-blue-500 font-medium"
              : "text-gray-500"
          }`}
        >
          Alternativas
        </button>
      </div>

      {/* Conteúdo da aba selecionada */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {activeTab === "nextImage" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Next.js Image Component</h2>
            <p className="mb-4">
              Recomendado: Otimização automática, carregamento lazy, evita layout shifts.
            </p>
            <div className="mb-4 bg-gray-100 p-4 rounded">
              <code className="text-sm">
                {`import Image from "next/image";
                
<Image
  src="${imagePath}"
  alt="Descrição da imagem"
  width={500}
  height={300}
  priority
/>`}
              </code>
            </div>
            <div className="border p-4 rounded flex justify-center">
              <Image
                src="/api/placeholder/500/300"
                alt="Exemplo usando Next.js Image"
                width={500}
                height={300}
                priority
                className="rounded"
              />
            </div>
          </div>
        )}

        {activeTab === "htmlImg" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">HTML img tag</h2>
            <p className="mb-4">
              Use quando precisar de simplicidade, mas perde otimizações.
            </p>
            <div className="mb-4 bg-gray-100 p-4 rounded">
              <code className="text-sm">{`<img src="${imagePath}" alt="Descrição da imagem" />`}</code>
            </div>
            <div className="border p-4 rounded flex justify-center">
              <img
                src="/api/placeholder/500/300"
                alt="Exemplo usando HTML img"
                className="rounded max-w-full h-auto"
              />
            </div>
          </div>
        )}

        {activeTab === "cssBackground" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">CSS Background Image</h2>
            <p className="mb-4">
              Útil para imagens de fundo que preenchem seções.
            </p>
            <div className="mb-4 bg-gray-100 p-4 rounded">
              <code className="text-sm">{`<div 
  className="h-64 bg-cover bg-center rounded" 
  style={{ backgroundImage: "url(${bgImagePath})" }}
/>`}</code>
            </div>
            <div
              className="h-64 bg-cover bg-center rounded border"
              style={{ backgroundImage: "url(/api/placeholder/800/400)" }}
            ></div>
          </div>
        )}

        {activeTab === "bgFallbacks" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Alternativas (quando imagens não funcionam)</h2>
            <p className="mb-4">
              Use gradientes, cores sólidas ou padrões CSS como alternativa temporária.
            </p>
            
            <h3 className="font-medium mt-6 mb-2">Gradiente Linear</h3>
            <div className="mb-4 bg-gray-100 p-4 rounded">
              <code className="text-sm">{`<div className="bg-gradient-to-r from-blue-500 to-purple-600 h-40 rounded" />`}</code>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-40 rounded mb-6"></div>
            
            <h3 className="font-medium mt-6 mb-2">Gradiente Radial (CSS inline)</h3>
            <div className="mb-4 bg-gray-100 p-4 rounded">
              <code className="text-sm">{`<div 
  className="h-40 rounded" 
  style={{ background: "radial-gradient(circle, #3b82f6, #1e3a8a)" }}
/>`}</code>
            </div>
            <div 
              className="h-40 rounded mb-6" 
              style={{ background: "radial-gradient(circle, #3b82f6, #1e3a8a)" }}
            ></div>
            
            <h3 className="font-medium mt-6 mb-2">Padrão CSS (estilo xadrez)</h3>
            <div className="mb-4 bg-gray-100 p-4 rounded">
              <code className="text-sm">{`<div className="h-40 rounded bg-gray-200" 
  style={{ 
    backgroundImage: "linear-gradient(45deg, #cbd5e1 25%, transparent 25%), linear-gradient(-45deg, #cbd5e1 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #cbd5e1 75%), linear-gradient(-45deg, transparent 75%, #cbd5e1 75%)",
    backgroundSize: "20px 20px",
    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px"
  }} 
/>`}</code>
            </div>
            <div className="h-40 rounded" 
              style={{ 
                backgroundImage: "linear-gradient(45deg, #cbd5e1 25%, transparent 25%), linear-gradient(-45deg, #cbd5e1 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #cbd5e1 75%), linear-gradient(-45deg, transparent 75%, #cbd5e1 75%)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px"
              }} 
            ></div>
          </div>
        )}
      </div>

      {/* Instruções adicionais */}
      <div className="mt-6 p-4 bg-yellow-50 rounded">
        <h2 className="font-bold mb-2">Como corrigir suas imagens:</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Verifique o local das imagens:</strong> As imagens devem estar na pasta <code>/public</code> do seu projeto Next.js.
          </li>
          <li>
            <strong>Método 1 (recomendado):</strong> Use o componente Image do Next.js:<br />
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">
              import Image from "next/image"
            </code>
          </li>
          <li>
            <strong>Método 2:</strong> Como solução temporária, use gradientes CSS em vez de imagens.
          </li>
          <li>
            <strong>Depuração:</strong> Use o componente de diagnóstico para encontrar quais caminhos de imagem funcionam.
          </li>
        </ol>
      </div>
    </div>
  );
}