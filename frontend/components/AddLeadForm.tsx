/**
 * Componente AddLeadForm
 * - Exibe um formulário para adicionar um novo lead.
 * - Inclui campo para CNPJ e integra com o dashboard.
 * - Adiciona formatação para os campos de CNPJ e telefone.
 */
import React, { useState } from "react";

const AddLeadForm = ({ onAddSuccess }: { onAddSuccess: () => void }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [mensagem, setMensagem] = useState(""); // Adicionado campo mensagem
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");
      
      // Chama o endpoint unificado para criar um lead
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
          cnpj,      // Garantindo que o CNPJ seja enviado
          mensagem,  // Garantindo que a mensagem seja enviada
          pedido,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao adicionar lead");
      }

      // Limpa os campos do formulário e notifica o sucesso
      setNome("");
      setEmail("");
      setTelefone("");
      setCnpj("");
      setMensagem("");
      setPedido("");
      onAddSuccess();
      
      // Exibe mensagem de sucesso
      alert("Lead adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar lead:", error);
      setError(error instanceof Error ? error.message : "Erro desconhecido");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Adicionar Novo Lead
        </h3>
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
          
          {/* Botão de envio */}
          <div className="flex justify-end space-x-3 pt-4">
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
};

export default AddLeadForm;