import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Valida um usuário com email e senha
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      return null;
    }
    
    if (!user.isActive) {
      throw new UnauthorizedException('Usuário inativo');
    }
    
    const isPasswordValid = await user.validatePassword(password);
    
    if (!isPasswordValid) {
      return null;
    }
    
    const { password: _, ...result } = user;
    return result;
  }

  /**
   * Realiza o login do usuário e retorna um token JWT
   */
  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await this.comparePasswords(password, user.password))) {
      return null;
    }

    // Gera o payload do token
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    // Retorna o token e o usuário (sem a senha)
    const { password: _, ...userWithoutPassword } = user;
    return {
      token,
      user: userWithoutPassword,
    };
  }

  /**
   * Verifica se o token JWT é válido
   */
  async verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findOne(payload.sub);

      if (!user || !user.isActive) {
        throw new UnauthorizedException('Usuário inativo ou não encontrado');
      }

      return { 
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        } 
      };
    } catch (error) {
      return { success: false, message: 'Token inválido' };
    }
  }

  /**
   * Compara a senha fornecida com o hash salvo
   */
  private async comparePasswords(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
} 