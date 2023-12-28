import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AppError } from 'src/common/errors/errors';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('secret_jwt'),
    });
  }

  async validate(payload: any) {
    const user ={ ...payload.publicUser};
    if (user.role === 'admin') {
      return { ...payload.user };
    } else {
      throw new UnauthorizedException(AppError.WRONG_ROLE);
    }
  }
}
