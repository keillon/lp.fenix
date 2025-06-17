// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas que requerem autenticação
const PROTECTED_ROUTES = ['/admin/dashboard', '/admin/users', '/admin/products'];
// Rota de login
const LOGIN_ROUTE = '/admin/login';

export function middleware(request: NextRequest) {
  // Obtém o token do cookie ou do localStorage (via JavaScript)
  const token = request.cookies.get('adminToken')?.value;
  const { pathname } = request.nextUrl;

  // Verificar se está tentando acessar uma rota protegida sem autenticação
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname.startsWith(route) || pathname === route
  );

  // Redirecionar para login se tentar acessar rota protegida sem token
  if (isProtectedRoute && !token) {
    const url = new URL(LOGIN_ROUTE, request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // Redirecionar para dashboard se já estiver autenticado e tentar acessar login
  if (pathname === LOGIN_ROUTE && token) {
    const url = new URL('/admin/dashboard', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configurar em quais caminhos o middleware deve ser executado
export const config = {
  matcher: [
    '/admin/:path*', // Todas as rotas que começam com /admin
  ],
};