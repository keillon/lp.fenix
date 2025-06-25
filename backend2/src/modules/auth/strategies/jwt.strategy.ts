import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/services/users.service';

// Função personalizada para extrair o token de várias fontes
const customExtractor = (req) => {
  // Verificar no cabeçalho Authorization
  let token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  
  // Verificar nos cookies, se não encontrado no cabeçalho
  if (!token && req.cookies) {
    token = req.cookies.adminToken;
    console.log('[JwtStrategy] Token extraído do cookie:', token ? 'Encontrado' : 'Não encontrado');
  }
  
  // Verificar no cabeçalho personalizado
  if (!token && req.headers['x-auth-token']) {
    token = req.headers['x-auth-token'];
    console.log('[JwtStrategy] Token extraído do cabeçalho x-auth-token:', token ? 'Encontrado' : 'Não encontrado');
  }
  
  // Log para depuração
  console.log('[JwtStrategy] Token final:', token ? `${token.substring(0, 10)}...` : 'Não encontrado');
  
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: customExtractor,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'br9x7supERseCr3tKey2024'),
    });
    
    console.log('[JwtStrategy] Inicializado com secret:', 
      configService.get<string>('JWT_SECRET') ? 'Configurado' : 'Usando padrão');
  }

  /**
   * Valida o payload do token JWT
   */
  async validate(payload: any) {
    try {
      console.log('[JwtStrategy] Validando payload:', { sub: payload.sub, email: payload.email });
      
      const user = await this.usersService.findOne(payload.sub);
      
      if (!user) {
        console.log('[JwtStrategy] Usuário não encontrado:', payload.sub);
        throw new UnauthorizedException('Usuário não encontrado');
      }
      
      if (!user.isActive) {
        console.log('[JwtStrategy] Usuário inativo:', payload.sub);
        throw new UnauthorizedException('Usuário inativo');
      }
      
      console.log('[JwtStrategy] Usuário validado com sucesso:', user.email);
      
      return { 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        role: user.role 
      };
    } catch (error) {
      console.error('[JwtStrategy] Erro na validação:', error.message);
      throw new UnauthorizedException('Token inválido');
    }
  }
} 