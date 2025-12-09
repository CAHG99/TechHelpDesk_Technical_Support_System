import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) return true;

    const user = context.switchToHttp().getRequest().user;

    if (!user) throw new ForbiddenException('Token inválido');
    if (!user.role) throw new ForbiddenException('Token sin rol');

    const userRole = (typeof user.role === 'string' ? user.role : user.role.name).toLowerCase();
    const normalizedRequired = requiredRoles.map(r => r.toLowerCase());

    if (!normalizedRequired.includes(userRole)) {
      throw new ForbiddenException('No tienes permisos');
    }

    return true;
  }
}
