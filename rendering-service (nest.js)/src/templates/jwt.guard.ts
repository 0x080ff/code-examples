import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as errors from '../errors';

@Injectable()
export class JWTGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization
      ? request.headers.authorization.split(' ')[1]
      : '';

    if (token) {
      const data = JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString('ascii'),
      );

      if (!data.roles.includes(4))
        throw new UnauthorizedException(errors.UnauthorizedError);
      return true;
    } else {
      throw new UnauthorizedException(errors.UnauthorizedError);
    }
  }
}
