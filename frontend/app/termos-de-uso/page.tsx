import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">
        Política de Cookies Fênix Telecom – CNPJ: 57.776.062/0001-07
        <p>
          A Fênix Telecom utiliza cookies para melhorar a navegação e
          experiência do usuário em nosso site. Ao continuar utilizando este
          site, você concorda com o uso de cookies conforme descrito nesta
          política.
        </p>
      </h1>

      <div className="prose max-w-none">
        <p>Última atualização: 26 de março de 2025</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          1. O que são Cookies?
        </h2>
        <p>
          Cookies são pequenos arquivos de texto armazenados em seu dispositivo
          quando você visita um site. Eles permitem o reconhecimento do usuário
          e ajudam a oferecer uma experiência mais eficiente.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          2. Tipos de Cookies Utilizados:
        </h2>
        <ul className="list-disc pl-6 mt-2 mb-4">
          <li>
            Cookies Essenciais: Necessários para o funcionamento correto do
            site.
          </li>
          <li>
            Cookies Analíticos: Coletam informações sobre a navegação para
            melhorias na experiência do usuário.
          </li>
          <li>
            Cookies de Marketing: Utilizados para personalizar anúncios e
            ofertas conforme suas preferências.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          3. Gerenciamento de Cookies:
        </h2>
        <p>
          Você pode configurar seu navegador para bloquear ou excluir cookies a
          qualquer momento. No entanto, isso pode impactar sua experiência de
          navegação no site.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contato</h2>
        <p>
          Para mais informações, entre em contato pelo e-mail:
          suporte@fenixtelecom.com.br
        </p>
      </div>

      <div className="mt-12">
        <Link href="/">
          <Button className="bg-green-500 hover:bg-green-600">
            Voltar para a página inicial
          </Button>
        </Link>
      </div>
    </div>
  );
}
