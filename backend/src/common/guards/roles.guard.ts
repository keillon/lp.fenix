import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Obtém os perfis requeridos definidos no decorator @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se não houver perfis requeridos, permite acesso
    if (!requiredRoles) {
      return true;
    }

    // Obtém o usuário da solicitação (definido pelo JwtAuthGuard)
    const { user } = context.switchToHttp().getRequest();

    // Verifica se o usuário existe e tem o perfil requerido
    if (!user) {
      throw new ForbiddenException('Acesso não autorizado');
    }

    const hasRequiredRole = requiredRoles.includes(user.role);
    
    if (!hasRequiredRole) {
      throw new ForbiddenException('Você não tem permissão para acessar este recurso');
    }
    
    return true;
  }
} 