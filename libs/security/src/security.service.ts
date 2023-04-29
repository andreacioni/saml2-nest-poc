import { User } from '@app/commons/user';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SecurityService {
  constructor(private jwtService: JwtService) {}

  getTokenForUser(user: User) {
    const payload = {
      sub: user.username,
      iss: user.issuer,
    };
    return this.jwtService.sign(payload);
  }
}
