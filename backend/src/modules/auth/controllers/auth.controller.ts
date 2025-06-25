import { Controller, Post, Body, Get, Headers, UseGuards, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Response } from 'express';
import { UnauthorizedException } from '@nestjs/common';

@ApiTags('autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realizar login e obter token JWT' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(loginDto);
    if (!result || !result.token || !result.user) {
      return res.status(401).json({ success: false, message: 'Falha no login' });
    }
    res.cookie('adminToken', result.token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
    });
    return res.status(201).json({ success: true, user: result.user });
  }

  @Get('verify')
  @ApiOperation({ summary: 'Verificar se o token JWT é válido' })
  @ApiResponse({ status: 200, description: 'Verificação de token concluída' })
  verifyToken(
    @Headers('authorization') authorization: string,
    @Headers('cookie') cookie: string
  ) {
    let token = authorization?.replace('Bearer ', '');
    if (!token && cookie) {
      // Extrai o token do cookie adminToken
      const match = cookie.match(/adminToken=([^;]+)/);
      if (match) token = match[1];
    }
    if (!token) return { valid: false };
    return this.authService.verifyToken(token);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter perfil do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil obtido com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  getProfile(@Headers('user') user: any) {
    return user;
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout do usuário (invalida o token no backend)' })
  @ApiResponse({ status: 200, description: 'Logout realizado com sucesso' })
  logout(@Headers('authorization') authorization: string) {
    // Aqui você pode implementar blacklist de tokens, se necessário
    return { success: true, message: 'Logout realizado com sucesso' };
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'Backend saudável' })
  health() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
} 