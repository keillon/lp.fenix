// app/api/admin/leads/add/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Obtém o token do cabeçalho de autorização ou do cookie
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '') || request.cookies.get('adminToken')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Token não fornecido' },
        { status: 401 }
      );
    }

    // Obtém os dados do lead
    const leadData = await request.json();

    // Validações básicas
    if (!leadData.nome || !leadData.email || !leadData.telefone) {
      return NextResponse.json(
        { success: false, message: 'Dados incompletos. Nome, email e telefone são obrigatórios.' },
        { status: 400 }
      );
    }

    // Faz a requisição para o backend
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const response = await fetch(`${backendUrl}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(leadData),
    });

    // Obtém a resposta do backend
    const data = await response.json();

    // Se a requisição falhou no backend
    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || 'Erro ao adicionar lead' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[API] Erro ao adicionar lead:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}