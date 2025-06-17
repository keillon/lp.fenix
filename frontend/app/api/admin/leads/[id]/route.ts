/**
 * API Route para operações em um lead específico
 * 
 * Este arquivo implementa handlers para as operações HTTP em /api/admin/leads/[id]:
 * - DELETE: Exclui um lead específico
 * - PUT: Atualiza um lead específico
 * 
 * Os handlers atuam como proxy entre o frontend e o backend Express,
 * validando dados de entrada e formatando respostas.
 */
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handler para DELETE - excluir um lead pelo ID
 * 
 * Recebe o ID do lead via parâmetro de rota e solicita a exclusão no backend.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Obtém o ID do lead dos parâmetros de rota
    const leadId = params.id;

    // Validação básica do ID
    if (!leadId) {
      return NextResponse.json(
        { success: false, message: 'ID do lead não fornecido' },
        { status: 400 }
      );
    }

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

    console.log(`[API] Tentando excluir lead ID: ${leadId}`);

    // Faz a requisição para o backend
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const response = await fetch(`${backendUrl}/api/admin/leads/${leadId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    // Tenta obter a resposta como JSON, mas lida com possíveis erros
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = { message: 'Erro desconhecido' };
    }

    // Se a requisição falhou no backend
    if (!response.ok) {
      console.error(`[API] Erro ao excluir lead ID ${leadId}:`, data);
      return NextResponse.json(
        { success: false, message: data.message || 'Erro ao deletar lead' },
        { status: response.status }
      );
    }

    console.log(`[API] Lead ID ${leadId} excluído com sucesso`);
    
    // Notifica o frontend que a operação foi bem-sucedida
    return NextResponse.json({ 
      success: true, 
      message: 'Lead deletado com sucesso',
      id: leadId // Retorna o ID do lead excluído para facilitar atualização no frontend
    });
  } catch (error) {
    console.error('[API] Erro ao deletar lead:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

/**
 * Handler para PUT - atualizar um lead pelo ID
 * 
 * Recebe o ID do lead via parâmetro de rota e os dados atualizados via corpo da requisição,
 * e solicita a atualização no backend.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Obtém o ID do lead dos parâmetros de rota
    const leadId = params.id;

    // Validação básica do ID
    if (!leadId) {
      return NextResponse.json(
        { success: false, message: 'ID do lead não fornecido' },
        { status: 400 }
      );
    }

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

    // Obtém os dados atualizados do lead
    const leadData = await request.json();
    
    // Formata o CNPJ - remove caracteres não numéricos
    if (leadData.cnpj) {
      leadData.cnpj = leadData.cnpj.replace(/[^\d]/g, '');
    }

    console.log(`[API] Tentando atualizar lead ID: ${leadId}`);

    // Faz a requisição para o backend
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const response = await fetch(`${backendUrl}/api/admin/leads/${leadId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(leadData),
    });

    // Tenta obter a resposta como JSON, mas lida com possíveis erros
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = { message: 'Erro desconhecido' };
    }

    // Se a requisição falhou no backend
    if (!response.ok) {
      console.error(`[API] Erro ao atualizar lead ID ${leadId}:`, data);
      return NextResponse.json(
        { success: false, message: data.message || 'Erro ao atualizar lead' },
        { status: response.status }
      );
    }

    console.log(`[API] Lead ID ${leadId} atualizado com sucesso`);
    
    // Formata o CNPJ para exibição, se existir e tiver 14 dígitos
    if (data.lead && data.lead.cnpj && data.lead.cnpj.length === 14 && /^\d+$/.test(data.lead.cnpj)) {
      data.lead.cnpj = data.lead.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    }
    
    // Notifica o frontend que a operação foi bem-sucedida
    return NextResponse.json({ 
      success: true, 
      message: 'Lead atualizado com sucesso',
      lead: data.lead
    });
  } catch (error) {
    console.error('[API] Erro ao atualizar lead:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}