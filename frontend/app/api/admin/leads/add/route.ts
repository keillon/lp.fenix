/**
 * API Route para adicionar leads de forma explícita
 * 
 * Este arquivo implementa um handler para a operação POST em /api/admin/leads/add
 * que serve como um endpoint alternativo para adicionar leads.
 * 
 * Esta rota proporciona mais flexibilidade para implementações frontend que 
 * preferem usar rotas específicas para operações distintas.
 */
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handler para POST - adicionar novo lead
 * 
 * Recebe dados de um novo lead, valida campos obrigatórios,
 * e encaminha para o backend.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Obtém o token de autorização do cabeçalho ou do cookie
    const authHeader = request.headers.get('Authorization');
    const token =
      authHeader?.replace('Bearer ', '') ||
      request.cookies.get('adminToken')?.value;
    
    // Se não houver token, retorna 401 (não autorizado)
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Token não fornecido' },
        { status: 401 }
      );
    }
    
    // 2. Extrai os dados do lead do corpo da requisição
    const leadData = await request.json();
    
    // 3. Validações básicas (nome, email e telefone são obrigatórios)
    if (!leadData.nome || !leadData.email || !leadData.telefone) {
      return NextResponse.json(
        {
          success: false,
          message: 'Dados incompletos. Nome, email e telefone são obrigatórios.'
        },
        { status: 400 }
      );
    }
    
    // 4. Monta a URL do backend. Ajuste a variável BACKEND_URL no seu .env
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    
    // 5. Formata o CNPJ - remove caracteres não numéricos
    let formattedCnpj = '';
    if (leadData.cnpj) {
      formattedCnpj = leadData.cnpj.replace(/[^\d]/g, '');
    }
    
    // 6. Prepara os dados a serem enviados
    const dataToSend = {
      ...leadData,
      cnpj: formattedCnpj, // Envia o CNPJ apenas com números
      mensagem: leadData.mensagem || '', // Garante que a mensagem seja enviada mesmo que vazia
      pedido: leadData.pedido || '' // Garante que o pedido seja enviado mesmo que vazio
    };
    
    // Log para depuração (opcional)
    console.log('[API/ADD] Enviando lead para backend:', {
      nome: dataToSend.nome,
      email: dataToSend.email,
      // Mascara o telefone por segurança nos logs
      telefone: dataToSend.telefone ? '******' + dataToSend.telefone.slice(-4) : undefined,
      cnpj: dataToSend.cnpj ? '******' + dataToSend.cnpj.slice(-4) : undefined
    });
    
    // 7. Encaminha a requisição para o backend
    const response = await fetch(`${backendUrl}/api/admin/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(dataToSend)
    });
    
    // 8. Lê a resposta do backend em formato JSON
    let data;
    try {
      data = await response.json();
    } catch (e) {
      // Lida com respostas não-JSON
      console.error('[API/ADD] Erro ao processar resposta do backend:', e);
      data = { message: 'Erro ao processar resposta do servidor' };
    }
    
    // Se a requisição não foi bem-sucedida, repassa o erro
    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || 'Erro ao adicionar lead' },
        { status: response.status }
      );
    }
    
    // 9. Retorna a resposta bem-sucedida
    console.log('[API/ADD] Lead criado com sucesso');
    
    return NextResponse.json({
      success: true,
      message: 'Lead adicionado com sucesso',
      whatsappURL: data.whatsappURL,
      leadId: data.leadId
    });
   
  } catch (error) {
    console.error('[API/ADD] Erro ao adicionar lead:', error);
    // Em caso de erro inesperado, retorna 500
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}