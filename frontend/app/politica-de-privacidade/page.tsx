import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">
        Termo de Consentimento para Tratamento de Dados Pessoais Fênix Telecom –
        CNPJ: 57.776.062/0001-07
      </h1>

      <div className="prose max-w-none">
        <p>Última atualização: 26 de março de 2025</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introdução</h2>
        <p>
          1. Ao preencher o formulário disponível nesta página, você concorda e
          consente, de forma livre, informada e inequívoca, com a coleta e o
          tratamento de seus dados pessoais, conforme previsto na Lei Geral de
          Proteção de Dados (LGPD - Lei nº 13.709/2018).
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          2. Dados Coletados:
        </h2>
        <p>Os seguintes dados poderão ser coletados e armazenados:</p>
        <ul className="list-disc pl-6 mt-2 mb-4">
          <li>
            Informações que você nos fornece: nome, endereço de e-mail, número
            de telefone.
          </li>
          <li>
            Informações coletadas automaticamente: dados de uso, endereço IP,
            tipo de navegador, etc.
          </li>
          <li>Informações de cookies e tecnologias semelhantes.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          3. Finalidade do Tratamento dos Dados:
        </h2>
        <p>Os dados coletados serão utilizados para:</p>
        <ul className="list-disc pl-6 mt-2 mb-4">
          <li>
            Entrar em contato via WhatsApp, e-mail ou telefone para fornecer
            informações sobre produtos e serviços;
          </li>
          <li>
            Enviar materiais promocionais, novidades e campanhas de marketing;
          </li>
          <li>
            Melhorar a experiência do usuário em nossos serviços e comunicações;
          </li>
          <li>Cumprir obrigações legais e regulatórias.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          4. Armazenamento e Segurança dos Dados:
        </h2>
        <p>
          A Fênix Telecom adota medidas de segurança apropriadas para proteger
          seus dados contra acessos não autorizados, alterações, divulgações ou
          destruições indevidas
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          5. Compartilhamento de Dados:
        </h2>
        <p>
          seus dados não serão vendidos, trocados ou repassados a terceiros sem
          seu consentimento, exceto em casos exigidos por lei.
        </p>
        <ul className="list-disc pl-6 mt-2 mb-4">
          <li>Direito de acesso aos seus dados pessoais</li>
          <li>
            Direito de correção de dados incompletos, inexatos ou desatualizados
          </li>
          <li>Direito de eliminação dos dados</li>
          <li>Direito de portabilidade dos dados</li>
          <li>Direito de informação sobre compartilhamento de dados</li>
          <li>Direito de revogação do consentimento</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          6. Direitos do Titular dos Dados:
        </h2>
        <p>Você pode, a qualquer momento, solicitar:</p>
        <ul className="list-disc pl-6 mt-2 mb-4">
          <li>Acesso aos seus dados pessoais armazenados;</li>
          <li>Correção de informações incorretas ou desatualizadas;</li>
          <li>
            Exclusão dos dados, salvo obrigações legais que determinem sua
            manutenção;
          </li>
          <li>Revogação do consentimento.</li>
        </ul>
      </div>

      <h2 className="text-1xl font-semibold mt-8 mb-4">
        Para exercer seus direitos, entre em contato pelo e-mail:
        suporte@fenixtelecom.com.br.
      </h2>
      <div className="mt-12">
        <Link href="/">
          <Button className="bg-green-500 hover:bg-green-600">Voltar para a página inicial</Button>
        </Link>
      </div>
    </div>
  );
}
