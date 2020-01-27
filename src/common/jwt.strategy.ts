import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './environment';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  public async validate(payload: string): Promise<User> {
    const user = await this.authService.getUserById(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
