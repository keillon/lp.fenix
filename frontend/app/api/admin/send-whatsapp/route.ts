// File: app/api/admin/send-whatsapp/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, cnpj, message } = body;
    
    // Formata o CNPJ para exibição se tiver 14 dígitos numéricos
    let formattedCnpj = cnpj || "Não informado";
    if (cnpj && cnpj.replace(/\D/g, '').length === 14) {
      const numericCnpj = cnpj.replace(/\D/g, '');
      formattedCnpj = numericCnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    }
    
    // Formata a mensagem para o WhatsApp
    const formattedMessage = `
*Novo contato via site*
*Nome:* ${name}
*Email:* ${email}
*Telefone:* ${phone}
*CNPJ:* ${formattedCnpj}
*Mensagem:* ${message || "Não informada"}
    `.trim();
    
    // Obtém as variáveis de ambiente
    const apiPhone = process.env.WHATSAPP_NUMBER || "5511999999999";
    const apiKey = process.env.CALLMEBOT_API_KEY || "";
    
    // Log de depuração (sem incluir a chave API)
    console.log(`[API/WHATSAPP] Enviando mensagem para ${apiPhone}`);
    
    // Constrói a URL
    const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=${apiPhone}&text=${encodeURIComponent(
      formattedMessage
    )}&apikey=${apiKey}`;
    
    // Envia a requisição do lado do servidor
    const response = await fetch(callMeBotUrl);
    
    if (!response.ok) {
      const responseText = await response.text();
      console.error(`[API/WHATSAPP] Erro na resposta da API:`, responseText);
      throw new Error(`Falha ao enviar mensagem WhatsApp: ${response.statusText}`);
    }
    
    const responseData = await response.text();
    console.log(`[API/WHATSAPP] Mensagem enviada com sucesso`);
    
    return NextResponse.json({ 
      success: true, 
      message: "Mensagem WhatsApp enviada com sucesso" 
    });
  } catch (error) {
    console.error("[API/WHATSAPP] Erro ao enviar mensagem:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : "Erro desconhecido" 
      },
      { status: 500 }
    );
  }
}