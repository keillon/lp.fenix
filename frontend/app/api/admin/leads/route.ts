/**
 * API Route para gerenciamento de leads
 * 
 * Este arquivo implementa handlers para as operações HTTP em /api/admin/leads:
 * - GET: Lista todos os leads
 * - POST: Adiciona um novo lead
 * 
 * Os handlers atuam como proxy entre o frontend e o backend Express,
 * validando dados de entrada e formatando respostas.
 */
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handler para GET - listar leads
 * 
 * Busca todos os leads do backend e garante que todos tenham 
 * os campos CNPJ e mensagem definidos.
 */
export async function GET(request: NextRequest) {
  try {
    // Obtém o token do cabeçalho de autorização ou do cookie
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '') || 
                  request.cookies.get('adminToken')?.value;
    
    // Valida se o token está presente
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Token não fornecido' },
        { status: 401 }
      );
    }
    
    // Obtém a URL do backend do .env ou usa o padrão local
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    
    console.log('[API] Solicitando leads do backend...');
    
    // Faz a requisição para o backend
    const response = await fetch(`${backendUrl}/api/admin/leads`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      // 30 segundos de timeout para casos de lentidão na rede
    });
    
    // Obtém a resposta do backend
    const data = await response.json();
    
    // Se a requisição falhou no backend
    if (!response.ok) {
      console.error('[API] Erro na resposta do backend:', data);
      return NextResponse.json(
        { success: false, message: data.message || 'Erro ao buscar leads' },
        { status: response.status }
      );
    }
    
    // Processa os leads para garantir que todos tenham o campo CNPJ e formatá-lo
    const processedData = Array.isArray(data)
       ? data.map(lead => {
          // Formata o CNPJ para exibição se tiver 14 dígitos
          let cnpj = lead.cnpj || '';
          if (cnpj && cnpj.length === 14 && /^\d+$/.test(cnpj)) {
            cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
          }
          
          return {
            ...lead,
            cnpj,
            mensagem: lead.mensagem || lead.pedido || '' // Garante que mensagem exista
          };
        })
      : data;
    
    console.log(`[API] Retornando ${Array.isArray(processedData) ? processedData.length : 0} leads`);
    
    return NextResponse.json(processedData);
  } catch (error) {
    console.error('[API] Erro ao buscar leads:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

/**
 * Handler para POST - adicionar novo lead
 * 
 * Recebe dados de um novo lead, valida campos obrigatórios,
 * e encaminha para o backend.
 */
export async function POST(request: NextRequest) {
  try {
    // Obtém o token do cabeçalho de autorização ou do cookie
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '') || 
                  request.cookies.get('adminToken')?.value;
    
    // Valida se o token está presente
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Token não fornecido' },
        { status: 401 }
      );
    }
    
    // Obtém os dados do lead
    const leadData = await request.json();
    
    console.log('[API] Recebido pedido para criar lead:', {
      nome: leadData.nome,
      email: leadData.email,
      // Evita expor números de telefone completos nos logs
      telefone: leadData.telefone ? '******' + leadData.telefone.slice(-4) : undefined,
      cnpj: leadData.cnpj ? '******' + leadData.cnpj.slice(-4) : undefined
    });
    
    // Validações básicas
    if (!leadData.nome || !leadData.email || !leadData.telefone) {
      return NextResponse.json(
        { success: false, message: 'Dados incompletos. Nome, email e telefone são obrigatórios.' },
        { status: 400 }
      );
    }
    
    // Formata o CNPJ - remove todos os caracteres não numéricos
    let formattedCnpj = '';
    if (leadData.cnpj) {
      formattedCnpj = leadData.cnpj.replace(/[^\d]/g, '');
    }
    
    // Garante que CNPJ, mensagem e pedido estejam definidos mesmo que vazios
    const dataToSend = {
      ...leadData,
      cnpj: formattedCnpj,  // Envia o CNPJ apenas com números
      mensagem: leadData.mensagem || '',  // Garante que a mensagem esteja incluída mesmo que vazia
      pedido: leadData.pedido || ''  // Garante que o pedido esteja incluído mesmo que vazio
    };
    
    // Faz a requisição para o backend
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const response = await fetch(`${backendUrl}/api/admin/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    });
    
    // Obtém a resposta do backend
    const data = await response.json();
    
    // Se a requisição falhou no backend
    if (!response.ok) {
      console.error('[API] Erro ao criar lead:', data);
      return NextResponse.json(
        { success: false, message: data.message || 'Erro ao adicionar lead' },
        { status: response.status }
      );
    }
    
    console.log('[API] Lead criado com sucesso');
    
    return NextResponse.json({
      success: true,
      message: 'Lead adicionado com sucesso',
      whatsappURL: data.whatsappURL,
      leadId: data.leadId
    });
  } catch (error) {
    console.error('[API] Erro ao adicionar lead:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}