/**
 * Página para adicionar um novo lead
 * 
 * Esta página exibe um formulário dedicado para adicionar um novo lead,
 * redirecionando para a listagem após sucesso.
 */
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

/**
 * Componente de página para adicionar um novo lead
 */
export default function NewLeadPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  
  // Estado para verificar se o usuário está autenticado
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);
  
  // Função chamada após adicionar lead com sucesso
  const handleSuccess = () => {
    // Exibe mensagem de sucesso
    alert("Lead adicionado com sucesso!");
    
    // Redireciona para a página de listagem de leads
    router.push("/admin/dashboard");
  };

  // Exibe spinner enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Adicionar Novo Lead</h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
        >
          Voltar
        </button>
      </div>
      
      {/* Formulário de novos leads */}
      <NewLeadForm onSuccess={handleSuccess} />
    </div>
  );
}

/**
 * Componente de formulário para adicionar leads
 */
interface NewLeadFormProps {
  onSuccess: () => void;
}

function NewLeadForm({ onSuccess }: NewLeadFormProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [pedido, setPedido] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Função para formatar o CNPJ enquanto o usuário digita
  const formatCnpj = (value: string) => {
    // Remove caracteres não numéricos
    const cnpjLimpo = value.replace(/\D/g, '');
    
    // Aplica a máscara do CNPJ: XX.XXX.XXX/XXXX-XX
    if (cnpjLimpo.length <= 2) {
      return cnpjLimpo;
    } else if (cnpjLimpo.length <= 5) {
      return `${cnpjLimpo.slice(0, 2)}.${cnpjLimpo.slice(2)}`;
    } else if (cnpjLimpo.length <= 8) {
      return `${cnpjLimpo.slice(0, 2)}.${cnpjLimpo.slice(2, 5)}.${cnpjLimpo.slice(5)}`;
    } else if (cnpjLimpo.length <= 12) {
      return `${cnpjLimpo.slice(0, 2)}.${cnpjLimpo.slice(2, 5)}.${cnpjLimpo.slice(5, 8)}/${cnpjLimpo.slice(8)}`;
    } else {
      return `${cnpjLimpo.slice(0, 2)}.${cnpjLimpo.slice(2, 5)}.${cnpjLimpo.slice(5, 8)}/${cnpjLimpo.slice(8, 12)}-${cnpjLimpo.slice(12, 14)}`;
    }
  };

  // Função para lidar com mudanças no campo de CNPJ
  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCnpj = formatCnpj(e.target.value);
    setCnpj(formattedCnpj);
  };

  // Função para formatar o telefone enquanto o usuário digita
  const formatTelefone = (value: string) => {
    // Remove caracteres não numéricos
    const telefoneLimpo = value.replace(/\D/g, '');
    
    // Aplica a máscara de telefone: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    if (telefoneLimpo.length <= 2) {
      return telefoneLimpo;
    } else if (telefoneLimpo.length <= 6) {
      return `(${telefoneLimpo.slice(0, 2)}) ${telefoneLimpo.slice(2)}`;
    } else if (telefoneLimpo.length <= 10) {
      return `(${telefoneLimpo.slice(0, 2)}) ${telefoneLimpo.slice(2, 6)}-${telefoneLimpo.slice(6)}`;
    } else {
      return `(${telefoneLimpo.slice(0, 2)}) ${telefoneLimpo.slice(2, 7)}-${telefoneLimpo.slice(7, 11)}`;
    }
  };

  // Função para lidar com mudanças no campo de telefone
  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedTelefone = formatTelefone(e.target.value);
    setTelefone(formattedTelefone);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");
      
      // MODIFICAÇÃO: Alterado o endpoint para a rota principal de leads
      const response = await fetch("/api/admin/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          email,
          telefone,
          cnpj,
          mensagem,
          pedido,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao adicionar lead");
      }

      // Limpa os campos e notifica sucesso
      setNome("");
      setEmail("");
      setTelefone("");
      setCnpj("");
      setMensagem("");
      setPedido("");
      
      // Chama a função de sucesso passada como prop
      onSuccess();
    } catch (error) {
      console.error("Erro ao adicionar lead:", error);
      setError(error instanceof Error ? error.message : "Erro desconhecido");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700 mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Nome */}
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          {/* Campo Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          {/* Campo Telefone */}
          <div>
            <label
              htmlFor="telefone"
              className="block text-sm font-medium text-gray-700"
            >
              Telefone
            </label>
            <input
              type="text"
              id="telefone"
              value={telefone}
              onChange={handleTelefoneChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="(XX) XXXXX-XXXX"
              required
            />
          </div>
          
          {/* Campo CNPJ */}
          <div>
            <label
              htmlFor="cnpj"
              className="block text-sm font-medium text-gray-700"
            >
              CNPJ
            </label>
            <input
              type="text"
              id="cnpj"
              value={cnpj}
              onChange={handleCnpjChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="XX.XXX.XXX/XXXX-XX"
            />
          </div>
          
          {/* Campo Mensagem */}
          <div>
            <label
              htmlFor="mensagem"
              className="block text-sm font-medium text-gray-700"
            >
              Mensagem
            </label>
            <textarea
              id="mensagem"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Mensagem do cliente"
            />
          </div>
          
          {/* Campo Pedido */}
          <div>
            <label
              htmlFor="pedido"
              className="block text-sm font-medium text-gray-700"
            >
              Pedido
            </label>
            <input
              type="text"
              id="pedido"
              value={pedido}
              onChange={(e) => setPedido(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Exemplo: Produto X"
            />
          </div>
          
          {/* Botões de ação */}
          <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 ${
                isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white rounded-md transition`}
            >
              {isSubmitting ? "Adicionando..." : "Adicionar Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}