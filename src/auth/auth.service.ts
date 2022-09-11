import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../model/user';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  getTokenForUser(user: User) {
    const payload = {
      sub: user.username,
      iss: user.issuer,
    };
    return this.jwtService.sign(payload);
  }
}
