// app/api/admin/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Criar resposta que limpa o cookie
    const response = NextResponse.json({ success: true, message: 'Logout realizado com sucesso' });
    
    // Limpar o cookie adminToken
    response.cookies.delete('adminToken');
    
    return response;
  } catch (error) {
    console.error('[API] Erro ao processar logout:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao processar logout' },
      { status: 500 }
    );
  }
}