import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AUTHORITIES } from '../constants/authority.constant';
import { AUTHORITIES_KEY } from '../decorators/authority.decorator';

@Injectable()
export class AuthorityGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredAuthorities = this.reflector.getAllAndOverride<AUTHORITIES[]>(AUTHORITIES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredAuthorities) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    if (requiredAuthorities.some((authority) => user.authorities?.includes(authority))) {
      return true;
    }

    throw new UnauthorizedException(
      `User with authorities ${user.authorities} does not have access to this route with roles ${requiredAuthorities}`,
    );
  }
}
