"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Recupera a URL de callback, se houver
  const callbackUrl = searchParams?.get("callbackUrl") || "/admin/dashboard";

  // Se já estiver autenticado, redireciona para o dashboard ou URL de callback
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(callbackUrl);
    }
  }, [isAuthenticated, isLoading, router, callbackUrl]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      let data;
      
      try {
        // Certifique-se de que a resposta tem um corpo JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          throw new Error("Resposta não contém JSON válido");
        }
      } catch (parseError) {
        console.error("[AdminLogin] Erro ao fazer parse do JSON:", parseError);
        setError("Resposta inválida do servidor. Contate o suporte técnico.");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        // Mensagem de erro detalhada
        const errorMessage = data?.message || 
                          `Erro ${response.status}: ${response.statusText || 'Credenciais inválidas'}`;
        setError(errorMessage);
        setLoading(false);
        return;
      }

      if (!data.token || !data.admin) {
        setError("Resposta inválida do servidor: token ou dados do admin ausentes");
        setLoading(false);
        return;
      }

      // Define um cookie para o token (além do localStorage)
      document.cookie = `adminToken=${data.token}; path=/; max-age=86400; SameSite=Strict`;

      // Login bem-sucedido
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));
      
      // Atualiza o contexto de autenticação
      login(data.token, data.admin);

      // Redireciona para o dashboard ou URL de callback
      router.replace(callbackUrl);
    } catch (err) {
      console.error("[AdminLogin] Erro no login:", err);
      setError("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Painel Administrativo
        </h1>
        <h2 className="text-xl font-medium mb-4 text-center text-gray-700">
          Login
        </h2>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
              autoComplete="email"
              placeholder="email@fenixtelecom.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 px-4 rounded-md font-medium text-white ${
              loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } transition-colors flex items-center justify-center`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx={12}
                    cy={12}
                    r={10}
                    stroke="currentColor"
                    strokeWidth={4}
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}