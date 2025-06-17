"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CookieSettings {
  necessary: boolean; // Sempre true (LGPD)
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export default function CookieConsent() {
  // Estados principais
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: true,
    marketing: true,
    preferences: true,
  });
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  // Obtém o pathname atual para identificar páginas de privacidade
  const pathname = usePathname();
  const isPrivacyPage =
    pathname === "/politica-de-privacidade" || pathname === "/termos-de-uso";

  // Ao montar o componente, verifica se há consentimento salvo
  useEffect(() => {
    const storedConsent = localStorage.getItem("cookieConsent");
    if (storedConsent) {
      setCookieSettings(JSON.parse(storedConsent));
      setConsentGiven(true);
    } else {
      setConsentGiven(false);
    }
  }, []);

  // Atualiza a visibilidade do banner conforme o consentimento e a rota atual
  useEffect(() => {
    if (consentGiven === false && !isPrivacyPage) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  }, [consentGiven, isPrivacyPage, pathname]);

  // Função auxiliar para salvar e aplicar as configurações de consentimento
  const saveConsent = (settings: CookieSettings) => {
    localStorage.setItem("cookieConsent", JSON.stringify(settings));
    setCookieSettings(settings);
    setConsentGiven(true);
    setShowBanner(false);
  };

  // Ações para cada opção
  const acceptAllCookies = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
  };

  const acceptNecessaryCookies = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
  };

  const saveCustomSettings = () => {
    // Garante que cookies necessários (LGPD) permaneçam ativos
    saveConsent({ ...cookieSettings, necessary: true });
  };

  // Alterna o estado das configurações (exceto 'necessary')
  const handleToggle = (key: keyof CookieSettings) => {
    if (key === "necessary") return; // Não permite alteração
    setCookieSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200"
        >
          <div className="container mx-auto p-4 md:p-6">
            {!showSettings ? (
              // Visão padrão do banner
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2">
                    Privacidade e Cookies
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Utilizamos cookies para melhorar sua experiência em nosso
                    site, personalizar conteúdo e anúncios, fornecer recursos de
                    mídia social e analisar nosso tráfego. Ao clicar em "Aceitar
                    todos", você concorda com o uso de cookies. A aceitação da
                    LGPD é obrigatória para o funcionamento do site.
                  </p>
                  <div className="text-xs text-gray-500">
                    Ao utilizar nosso site, você concorda com nossa{" "}
                    <Link
                      href="/politica-de-privacidade"
                      className="text-primary underline"
                    >
                      Política de Privacidade
                    </Link>{" "}
                    e{" "}
                    <Link
                      href="/termos-de-uso"
                      className="text-primary underline"
                    >
                      Termos de Uso
                    </Link>
                    .
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-col gap-2 justify-end min-w-[200px]">
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600"
                    onClick={acceptAllCookies}
                  >
                    Aceitar todos
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={acceptNecessaryCookies}
                  >
                    Apenas necessários
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-green-700 text-white hover:bg-green-600 hover:text-white"
                    onClick={() => setShowSettings(true)}
                  >
                    Personalizar
                  </Button>
                </div>
              </div>
            ) : (
              // Visão de configurações personalizadas
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">
                    Configurações de Cookies
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Fechar configurações"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Seção: Cookies Necessários */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium">
                          Cookies necessários (LGPD)
                        </h4>
                        <p className="text-sm text-gray-600">
                          Essenciais para o funcionamento do site e para cumprir
                          a Lei Geral de Proteção de Dados.
                        </p>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={cookieSettings.necessary}
                          disabled
                          className="sr-only peer"
                          id="necessary-toggle"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 italic">
                      Estes cookies são obrigatórios e não podem ser desativados.
                    </p>
                  </div>

                  {/* Seção: Cookies Analíticos */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium">Cookies analíticos</h4>
                        <p className="text-sm text-gray-600">
                          Nos ajudam a entender como os visitantes interagem com
                          o site.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cookieSettings.analytics}
                          onChange={() => handleToggle("analytics")}
                          className="sr-only peer"
                          id="analytics-toggle"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500"></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                      </label>
                    </div>
                  </div>

                  {/* Seção: Cookies de Marketing */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium">Cookies de marketing</h4>
                        <p className="text-sm text-gray-600">
                          Usados para rastrear visitantes e exibir anúncios relevantes.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cookieSettings.marketing}
                          onChange={() => handleToggle("marketing")}
                          className="sr-only peer"
                          id="marketing-toggle"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500"></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                      </label>
                    </div>
                  </div>

                  {/* Seção: Cookies de Preferências */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium">Cookies de preferências</h4>
                        <p className="text-sm text-gray-600">
                          Permitem que o site lembre informações que alteram a aparência ou comportamento.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cookieSettings.preferences}
                          onChange={() => handleToggle("preferences")}
                          className="sr-only peer"
                          id="preferences-toggle"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500"></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowSettings(false)}>
                    Cancelar
                  </Button>
                  <Button
                    className="bg-green-500 hover:bg-green-600"
                    onClick={saveCustomSettings}
                  >
                    Salvar preferências
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
