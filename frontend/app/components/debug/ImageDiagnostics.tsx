"use client";

import { useState, useEffect } from "react";

interface DiagnosticResults {
  [key: string]: boolean;
}

export default function ImageDiagnostics() {
  const [diagnosticResults, setDiagnosticResults] = useState<DiagnosticResults>({});
  const [isClient, setIsClient] = useState<boolean>(false);

  // Lista de imagens para testar
  const imagesToTest = [
    // Tenta encontrar na raiz
    "/tecnico-hero.webp",
    "/estoque.webp",
    "/orcamento.webp",
    "/logo-fenix-branca.webp",
    "/logo-fenix.webp",
    "/partners.webp",
    
    // Tenta variações de extensão
    "/tecnico-hero.jpg",
    "/logo-fenix.png",
    
    // Tenta variações de casing
    "/Tecnico-Hero.webp",
    "/Logo-Fenix.webp",
    
    // Tenta em subpastas
    "/images/tecnico-hero.webp",
    "/img/tecnico-hero.webp",
    "/assets/tecnico-hero.webp",
    
    // Tenta com caminhos relativos
    "tecnico-hero.webp",
    "./tecnico-hero.webp",
  ];

  useEffect(() => {
    setIsClient(true);
    
    // Função para testar se uma imagem existe
    const testImage = (url: string): Promise<{ exists: boolean; url: string }> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ exists: true, url });
        img.onerror = () => resolve({ exists: false, url });
        img.src = url;
      });
    };

    // Testar todas as imagens
    const runTests = async () => {
      const results: DiagnosticResults = {};
      
      for (const imgPath of imagesToTest) {
        const result = await testImage(imgPath);
        results[imgPath] = result.exists;
      }
      
      setDiagnosticResults(results);
    };

    runTests();
  }, []);

  if (!isClient) {
    return <div>Carregando diagnóstico...</div>;
  }

  // Contar resultados
  const foundImages = Object.values(diagnosticResults).filter(Boolean).length;
  
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Diagnóstico de Imagens</h1>
      
      <div className="mb-6 p-4 bg-blue-50 rounded">
        <p className="font-medium">
          Encontradas: {foundImages} de {imagesToTest.length} imagens testadas
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {imagesToTest.map((imgPath) => (
          <div 
            key={imgPath}
            className={`p-4 rounded-lg border ${
              diagnosticResults[imgPath] 
                ? "border-green-500 bg-green-50" 
                : "border-red-500 bg-red-50"
            }`}
          >
            <p className="font-mono text-sm mb-2">{imgPath}</p>
            <p className="font-medium">
              {diagnosticResults[imgPath] 
                ? "✅ Imagem encontrada" 
                : "❌ Imagem não encontrada"}
            </p>
            {diagnosticResults[imgPath] && (
              <div className="mt-4 bg-gray-100 p-2 rounded">
                <p className="mb-2 text-xs text-gray-500">Prévia:</p>
                <img
                  src={imgPath}
                  alt="Prévia"
                  className="max-h-20 object-contain mx-auto"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 rounded">
        <h2 className="font-bold mb-2">Dicas para resolver:</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Verifique se todas as imagens estão na pasta <code>/public</code> (e não em <code>/app/public</code>)</li>
          <li>Certifique-se de que os nomes dos arquivos correspondem exatamente (incluindo maiúsculas/minúsculas)</li>
          <li>Verifique as extensões dos arquivos (.webp, .jpg, .png)</li>
          <li>Confirme se as imagens estão na subpasta correta dentro de <code>/public</code></li>
          <li>Atualize o código para usar os caminhos corretos que funcionarem neste teste</li>
        </ul>
      </div>
    </div>
  );
}