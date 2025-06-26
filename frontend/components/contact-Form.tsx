"use client";

import { useState, ChangeEvent } from "react";
import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

// Tipagem dos dados do formulário
type FormData = {
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  message: string;
};

// Tipagem para o field do Controller
type FieldType = ControllerRenderProps<FormData, keyof FormData>;

// Propriedades do componente
interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  onSubmitSuccess?: (data: FormData) => void;
  buttonText?: string;
  whatsappNumber?: string;
}

// ---------------
// FUNÇÕES UTILS
// ---------------

// Aplica máscara no telefone: remove caracteres não-numéricos e formata conforme o tamanho
function applyPhoneMask(value: string): string {
  const numericValue = value.replace(/\D/g, "").slice(0, 11);

  if (numericValue.length <= 2) {
    return `(${numericValue}`;
  } else if (numericValue.length <= 6) {
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2)}`;
  } else if (numericValue.length <= 10) {
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 6)}-${numericValue.slice(6)}`;
  } else {
    return `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 7)}-${numericValue.slice(7)}`;
  }
}

// Aplica máscara no CNPJ
function applyCnpjMask(value: string): string {
  const numericValue = value.replace(/\D/g, "");
  if (numericValue.length <= 2) return numericValue;
  if (numericValue.length <= 5) return `${numericValue.slice(0, 2)}.${numericValue.slice(2)}`;
  if (numericValue.length <= 8) return `${numericValue.slice(0, 2)}.${numericValue.slice(2, 5)}.${numericValue.slice(5)}`;
  if (numericValue.length <= 12)
    return `${numericValue.slice(0, 2)}.${numericValue.slice(2, 5)}.${numericValue.slice(5, 8)}/${numericValue.slice(8)}`;
  return `${numericValue.slice(0, 2)}.${numericValue.slice(2, 5)}.${numericValue.slice(5, 8)}/${numericValue.slice(8, 12)}-${numericValue.slice(12, 14)}`;
}

// Validação simplificada do CNPJ - apenas verifica o formato
function validateCnpj(cnpj: string): boolean {
  const onlyNumbers = cnpj.replace(/\D/g, "");
  // Verifica apenas se tem o número correto de dígitos (14)
  return onlyNumbers.length === 14;
}

// Simulação de verificação de existência de CNPJ - sempre retorna válido
async function checkCnpjExists(cnpj: string): Promise<boolean> {
  // Reduzimos o tempo de espera para melhorar a experiência do usuário
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Sempre retorna verdadeiro para aceitar qualquer CNPJ com formato válido
  return validateCnpj(cnpj);
}

// Valida o telefone (verifica se tem 10 ou 11 dígitos)
function validatePhone(value: string): boolean | string {
  const numericValue = value.replace(/\D/g, "");
  return numericValue.length < 10 || numericValue.length > 11
    ? "O número tem que ter entre 10 a 11 dígitos"
    : true;
}

// Configuração do backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// ---------------
// COMPONENTE
// ---------------
export default function ContactForm({
  open,
  onOpenChange,
  title = "Falar com um consultor",
  description = "Preencha o formulário e em breve nossa equipe entrará em contato com você.",
  onSubmitSuccess,
  buttonText = "Enviar",
  whatsappNumber = "5511999999999",
}: ContactFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cnpjValidating, setCnpjValidating] = useState(false);
  const [cnpjValid, setCnpjValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    getValues,
  } = useForm<FormData>();

  // Salva o lead no banco
  const saveLead = async (data: FormData): Promise<boolean> => {
    try {
      // Extrai apenas os números do CNPJ para salvar no backend
      const cnpjNumerico = data.cnpj.replace(/\D/g, "");
      
      const payload = {
        nome: data.name,
        email: data.email,
        telefone: data.phone.replace(/\D/g, ""),
        cnpj: cnpjNumerico,
        mensagem: data.message,
        pedido: `Via formulário de contato - CNPJ: ${data.cnpj}`,
      };

      console.log("Enviando lead:", payload);

      const response = await fetch(`${API_BASE_URL}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error(`Erro ao salvar lead: ${response.status} ${response.statusText}`);
        return false;
      }

      try {
        const json = await response.json();
        console.log("Lead salvo com sucesso!", json);
      } catch {
        console.log("Lead salvo com sucesso! (Sem resposta JSON)");
      }
      return true;
    } catch (err) {
      console.error("Erro ao tentar salvar lead:", err);
      return false;
    }
  };

  // Envia a mensagem via WhatsApp usando a API interna
  const sendWhatsAppMessage = async (data: FormData): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/whatsapp/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          cnpj: data.cnpj,
          message: data.message,
        }),
      });

      if (!response.ok) {
        console.error("Erro na resposta da API do WhatsApp:", response.statusText);
        throw new Error(response.statusText || "Falha ao enviar mensagem do WhatsApp");
      }

      try {
        const json = await response.json();
        console.log("Mensagem WhatsApp enviada com sucesso:", json);
      } catch {
        console.log("Mensagem WhatsApp enviada com sucesso! (Sem resposta JSON)");
      }
      return true;
    } catch (err) {
      console.error("Erro ao enviar mensagem WhatsApp:", err);
      throw err;
    }
  };

  // Função para enviar cotação
  const sendQuotation = async (data: FormData): Promise<boolean> => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone.replace(/\D/g, ""),
        cnpj: data.cnpj.replace(/\D/g, ""),
        message: data.message,
      };
      const response = await fetch(`${API_BASE_URL}/quotations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        console.error(`Erro ao enviar cotação: ${response.status} ${response.statusText}`);
        return false;
      }
      try {
        const json = await response.json();
        console.log("Cotação enviada com sucesso!", json);
      } catch {
        console.log("Cotação enviada com sucesso! (Sem resposta JSON)");
      }
      return true;
    } catch (err) {
      console.error("Erro ao tentar enviar cotação:", err);
      return false;
    }
  };

  // Função de submissão do formulário
  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    let leadOk = true;
    let quotationOk = true;
    try {
      if (title?.toLowerCase().includes("cotaç") || title?.toLowerCase().includes("orcament")) {
        quotationOk = await sendQuotation(data);
      } else {
        leadOk = await saveLead(data);
      }
      const whatsOk = await sendWhatsAppMessage(data);
      if ((leadOk || quotationOk) && whatsOk) {
        setSuccess(true);
        if (onSubmitSuccess) onSubmitSuccess(data);
        reset();
      } else {
        setError("Erro ao enviar o formulário. Tente novamente.");
      }
    } catch (err) {
      setError("Erro ao enviar o formulário. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  // Validação do CNPJ ao sair do campo
  const handleCnpjBlur = async () => {
    const cnpj = getValues("cnpj");
    const onlyNumbers = cnpj.replace(/\D/g, "");
    if (onlyNumbers.length === 14) {
      setCnpjValidating(true);
      try {
        const exists = await checkCnpjExists(cnpj);
        setCnpjValid(exists);
      } finally {
        setCnpjValidating(false);
      }
    } else {
      setCnpjValid(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[425px] bg-[#004765] text-white overflow-y-auto max-h-[90vh] md:max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
          <DialogDescription className="text-gray-300">
            {description}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Nome: <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Digite seu nome completo"
              className={`bg-[#003a52] border-[#005c82] text-white placeholder:text-gray-400 ${
                errors.name ? "border-red-500" : ""
              }`}
              {...register("name", { required: "Nome é obrigatório!" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email: <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Seu@email.com"
              className={`bg-[#003a52] border-[#005c82] text-white placeholder:text-gray-400 ${
                errors.email ? "border-red-500" : ""
              }`}
              {...register("email", {
                required: "Email é obrigatório!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "E-mail inválido",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">
              Telefone: <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Número de telefone é obrigatório!",
                validate: validatePhone,
              }}
              render={({ field }: { field: FieldType }) => (
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  className={`bg-[#003a52] border-[#005c82] text-white placeholder:text-gray-400 ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                  value={field.value || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    field.onChange(applyPhoneMask(e.target.value))
                  }
                />
              )}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* CNPJ */}
          <div className="space-y-2">
            <Label htmlFor="cnpj" className="text-white">
              CNPJ: <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Controller
                name="cnpj"
                control={control}
                rules={{
                  required: "CNPJ é obrigatório!",
                  validate: {
                    validFormat: (value) => {
                      // Validação básica - apenas verifica se tem 14 dígitos
                      const onlyNumbers = value.replace(/\D/g, "");
                      return onlyNumbers.length === 14 || "CNPJ precisa ter 14 dígitos!";
                    }
                  }
                }}
                render={({ field }: { field: FieldType }) => (
                  <Input
                    id="cnpj"
                    placeholder="00.000.000/0000-00"
                    className={`bg-[#003a52] border-[#005c82] text-white placeholder:text-gray-400 pr-10 ${
                      errors.cnpj
                        ? "border-red-500"
                        : cnpjValid === true
                        ? "border-green-500"
                        : ""
                    }`}
                    value={field.value || ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      field.onChange(applyCnpjMask(e.target.value));
                      if (cnpjValid !== null) setCnpjValid(null);
                    }}
                    onBlur={() => {
                      field.onBlur();
                      handleCnpjBlur();
                    }}
                  />
                )}
              />

              {cnpjValidating && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                </div>
              )}
              {!cnpjValidating && cnpjValid === true && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              )}
              {!cnpjValidating && cnpjValid === false && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </div>
              )}
            </div>
            {errors.cnpj && (
              <p className="text-red-500 text-sm">{errors.cnpj.message}</p>
            )}
            {!errors.cnpj && cnpjValid === false && (
              <p className="text-red-500 text-sm">CNPJ precisa ter 14 dígitos!</p>
            )}
          </div>

          {/* Message (opcional) */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-white">
              O que deseja? <span className="text-gray-400">(opcional)</span>
            </Label>
            <Textarea
              id="message"
              rows={4}
              placeholder="Descreva o que deseja.."
              className="resize-none bg-[#003a52] border-[#005c82] text-white placeholder:text-gray-400"
              {...register("message")}
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 p-3 rounded-md">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Botão de envio */}
          <DialogFooter className="pt-4 sm:justify-center">
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#00a3ff] hover:bg-[#0084d1] text-white"
            >
              {submitting ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center"
                >
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enviando..
                </motion.div>
              ) : success ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center text-white"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Enviado com sucesso!
                </motion.div>
              ) : (
                buttonText
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}