"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  UserCircle,
  RefreshCcw,
  Download,
  Search,
  Plus,
  MessageCircle,
  Trash2,
  LogOut,
  CheckCircle,
  AlertCircle
} from "lucide-react";

/**
 * Componente AddLeadForm
 * - Exibe um formulário para adicionar um novo lead
 * - Ao submeter, chama o endpoint unificado POST /api/admin/leads
 * - Inclui campo para CNPJ que estava faltando no formulário original
 * - Notifica o componente pai (dashboard) via onAddSuccess para atualizar a lista
 */
const AddLeadForm = ({ onAddSuccess }: { onAddSuccess: () => void }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [pedido, setPedido] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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
    setSuccess(false);

    try {
      // Prepara dados para envio - remove formatação do CNPJ e telefone
      const telefoneNumerico = telefone.replace(/\D/g, "");
      const cnpjNumerico = cnpj.replace(/\D/g, "");
      
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
          telefone: telefoneNumerico,
          cnpj: cnpjNumerico,
          mensagem,
          pedido,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao adicionar lead");
      }

      // Marca como sucesso e notifica
      setSuccess(true);
      
      // Limpa os campos do formulário após um tempo
      setTimeout(() => {
        setNome("");
        setEmail("");
        setTelefone("");
        setCnpj("");
        setMensagem("");
        setPedido("");
        setSuccess(false);
        onAddSuccess();
      }, 2000);
      
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
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 text-green-700 mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Lead adicionado com sucesso!
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
              } text-white rounded-md transition flex items-center`}
            >
              {isSubmitting ? (
                <>
                  <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                  Adicionando...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Lead
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Tipo Lead para tipagem dos dados
interface Lead {
  _id: string;
  nome: string;
  email: string;
  telefone: string;
  mensagem?: string;
  cnpj?: string;
  pedido?: string;
  atendido?: boolean;
  createdAt?: string;
}

/**
 * Componente AdminDashboard
 * - Exibe o dashboard administrativo com funcionalidades:
 *   - Listagem de leads com busca e exportação para CSV
 *   - Ação de enviar mensagem via WhatsApp
 *   - Exclusão de leads
 *   - Logout e exibição dos dados do administrador
 */
export default function AdminDashboard() {
  const { admin, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  // Estados principais
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteLead, setDeleteLead] = useState<Lead | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Para forçar o recarregamento
  const [detailsLead, setDetailsLead] = useState<Lead | null>(null); // Novo estado para o modal de detalhes

  // Redireciona para login se não estiver autenticado
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Função aprimorada de logout
  const handleLogout = () => {
    try {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminData");
      document.cookie =
        "adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      if (typeof logout === "function") {
        logout();
      }
      router.push("/admin/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      window.location.href = "/admin/login";
    }
  };

  // Filtra os leads com base na busca
  const filteredLeads = useMemo(() => {
    if (!searchTerm.trim()) return leads;
    const term = searchTerm.toLowerCase();
    return leads.filter(
      (lead) =>
        (lead.nome?.toLowerCase() || "").includes(term) ||
        (lead.email?.toLowerCase() || "").includes(term) ||
        (lead.telefone || "").includes(term) ||
        (lead.mensagem?.toLowerCase() || "").includes(term) ||
        (lead.cnpj || "").includes(term) ||
        (lead.pedido?.toLowerCase() || "").includes(term)
    );
  }, [leads, searchTerm]);

  // Busca os leads do backend pelo endpoint unificado
  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError("");
      
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }
      
      console.log("[Dashboard] Buscando leads...");
      const response = await fetch("/api/admin/leads", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token expirado ou inválido
          throw new Error("Sessão expirada. Faça login novamente.");
        }
        throw new Error(`Erro ao buscar leads. Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        console.log("[Dashboard] Leads recebidos:", data.length);
        setLeads(data);
      } else {
        console.warn("[Dashboard] Resposta não é um array:", data);
        setLeads([]);
      }
    } catch (err) {
      console.error("[Dashboard] Erro:", err);
      setError(
        err instanceof Error ? err.message : "Erro ao buscar leads"
      );
      
      // Se for erro de autenticação, redireciona para o login
      if (err instanceof Error && err.message.includes("Sessão expirada")) {
        setTimeout(() => {
          handleLogout();
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  // Carrega os leads ao montar o componente e quando refreshKey mudar
  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated, refreshKey]);

  // Abre o WhatsApp para enviar mensagem ao lead
  const handleSendWhatsApp = (lead: Lead) => {
    if (!lead.telefone) {
      alert("Este lead não possui telefone cadastrado.");
      return;
    }
    let telefone = lead.telefone.replace(/\D/g, "");
    if (!telefone.startsWith("55")) {
      telefone = "55" + telefone;
    }
    const message = `Olá ${lead.nome}, obrigado por seu contato com a Fênix Telecom!`;
    window.open(
      `https://wa.me/${telefone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // Prepara a exclusão de um lead
  const handleDeleteClick = (lead: Lead) => setDeleteLead(lead);

  // Confirma a exclusão do lead selecionado
  const confirmDelete = async () => {
    if (!deleteLead) return;
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/leads/${deleteLead._id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao excluir lead");
      }
      
      setLeads((prev) => prev.filter((l) => l._id !== deleteLead._id));
      alert(`Lead ${deleteLead.nome} excluído com sucesso!`);
    } catch (error) {
      console.error("Erro ao excluir:", error);
      setError(
        error instanceof Error ? error.message : "Erro ao excluir lead"
      );
    } finally {
      setDeleteLead(null);
    }
  };

  // Lida com o sucesso na adição de um novo lead
  const handleAddSuccess = () => {
    setShowAddForm(false);
    setRefreshKey(prev => prev + 1); // Força o recarregamento dos leads
  };

  // Exporta os leads para CSV
  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert("Sem leads para exportar!");
      return;
    }
    
    // Define os cabeçalhos do CSV
    const headers = "Nome,Email,Telefone,CNPJ,Mensagem,Pedido,Status,Data\n";
    
    // Cria as linhas do CSV
    const rows = leads.map((lead) => {
      // Formata a data se existir
      const date = lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('pt-BR') : "";
      
      // Garante que todos os valores são tratados como strings e escapados corretamente
      return [
        lead.nome || "",
        lead.email || "",
        lead.telefone || "",
        lead.cnpj || "",
        lead.mensagem || "",
        lead.pedido || "",
        lead.atendido ? "Atendido" : "Pendente",
        date
      ]
        .map((val) => `"${String(val).replace(/"/g, '""')}"`)
        .join(",");
    });
    
    // Concatena o cabeçalho e as linhas
    const csv = headers + rows.join("\n");
    
    // Cria um blob e um URL para download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    // Cria um link de download e simula um clique
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `leads-fenix-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Formata a data para exibição
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString('pt-BR');
    } catch (e) {
      return "";
    }
  };

  // Exibe um spinner se estiver carregando autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Fênix Telecom Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <UserCircle className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600 font-medium">
                  {admin?.name || admin?.email || "Administrador"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition flex items-center"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-4 sm:px-0">
          {/* Barra de ferramentas */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md flex items-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {showAddForm ? "Cancelar" : "Novo Lead"}
                </button>
                <button
                  onClick={() => {
                    setRefreshKey(prev => prev + 1);
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded-md flex items-center"
                >
                  <RefreshCcw className="h-4 w-4 mr-1" />
                  Atualizar
                </button>
                <button
                  onClick={handleExportCSV}
                  disabled={leads.length === 0}
                  className={`py-2 px-3 rounded-md flex items-center ${
                    leads.length === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  <Download className="h-4 w-4 mr-1" />
                  CSV
                </button>
              </div>
            </div>
          </div>

          {/* Exibição de mensagem de erro */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700 mb-6 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          {/* Formulário para adicionar leads */}
          {showAddForm && <AddLeadForm onAddSuccess={handleAddSuccess} />}

          {/* Contador de leads */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-blue-100 text-blue-700 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                  <span className="font-bold">{filteredLeads.length}</span>
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">Leads</p>
                  {searchTerm && (
                    <p className="text-sm text-gray-500">
                      Mostrando {filteredLeads.length} de {leads.length} leads
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabela de leads */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {loading ? (
                <div className="flex justify-center my-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    Nenhum lead encontrado
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm ? "Tente uma busca diferente ou" : ""} clique em "Novo Lead" para adicionar.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Nome
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Telefone
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          CNPJ
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Mensagem
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Data
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredLeads.map((lead) => (
                        <tr key={lead._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {lead.nome}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-blue-600">{lead.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {lead.telefone}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {lead.cnpj || "-"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {lead.mensagem || lead.pedido || "-"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {formatDate(lead.createdAt)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => setDetailsLead(lead)}
                              className="bg-blue-100 text-blue-700 py-1 px-3 rounded-md hover:bg-blue-200 transition inline-flex items-center mr-2"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                              Detalhes
                            </button>
                            <button
                              onClick={() => handleSendWhatsApp(lead)}
                              className="bg-green-100 text-green-700 py-1 px-3 rounded-md hover:bg-green-200 transition inline-flex items-center mr-2"
                            >
                              <MessageCircle className="w-4 h-4 mr-1" />
                              WhatsApp
                            </button>
                            <button
                              onClick={() => handleDeleteClick(lead)}
                              className="bg-red-100 text-red-700 py-1 px-3 rounded-md hover:bg-red-200 transition inline-flex items-center"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal de detalhes do lead */}
      {detailsLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex justify-between items-center">
              Detalhes do Lead
              <button
                onClick={() => setDetailsLead(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Nome</h4>
                <p className="mt-1 text-sm text-gray-900">{detailsLead.nome}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                <p className="mt-1 text-sm text-gray-900">{detailsLead.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Telefone</h4>
                <p className="mt-1 text-sm text-gray-900">{detailsLead.telefone}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">CNPJ</h4>
                <p className="mt-1 text-sm text-gray-900">{detailsLead.cnpj || "-"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Mensagem</h4>
                <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{detailsLead.mensagem || "-"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Pedido</h4>
                <p className="mt-1 text-sm text-gray-900">{detailsLead.pedido || "-"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Data de Criação</h4>
                <p className="mt-1 text-sm text-gray-900">{formatDate(detailsLead.createdAt)}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                onClick={() => setDetailsLead(null)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de confirmação de exclusão */}
      {deleteLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirmar exclusão
            </h3>
            <p className="text-gray-500 mb-6">
              Tem certeza que deseja excluir o lead{" "}
              <span className="font-semibold">{deleteLead.nome}</span>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                onClick={() => setDeleteLead(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center"
                onClick={confirmDelete}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}