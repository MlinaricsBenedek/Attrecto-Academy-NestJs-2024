import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      paswordField: 'password',
    });
  }
  async validate(email: string, password: string, done: CallableFunction) {
    const user = await this.authService.validateUser({ email, password });
    return user ? done(null, user) : done(null, null);
  }
}
