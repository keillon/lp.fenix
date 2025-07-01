// app/api/admin/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Obtém os dados do corpo da requisição
    const body = await request.json();
    
    // Valida o corpo da requisição
    if (!body.email || !body.password) {
      return NextResponse.json(
        { success: false, message: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Faz a requisição para o backend
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    console.log('[LOGIN] Tentando conectar ao backend:', backendUrl);
    
    const response = await fetch(`${backendUrl}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Obtém a resposta do backend
    const data = await response.json();
    console.log('[LOGIN] Resposta do backend:', { success: data.success, hasToken: !!data.token });

    // Se o login falhou no backend
    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || 'Erro de autenticação' },
        { status: response.status }
      );
    }

    // Cria um cookie para o token
    const responseObj = NextResponse.json(data);
    
    // Adiciona o cookie ao objeto de resposta
    responseObj.cookies.set({
      name: 'adminToken',
      value: data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 dia
      path: '/',
      sameSite: 'strict',
    });

    return responseObj;
  } catch (error) {
    console.error('[LOGIN] Erro no login:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}