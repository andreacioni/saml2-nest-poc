import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { SamlAuthGuard } from './saml-auth.guard';
import { SamlStrategy } from './saml.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
  ],
  providers: [
    SecurityService,
    JwtStrategy,
    JwtAuthGuard,
    SamlAuthGuard,
    SamlStrategy,
  ],
  exports: [SecurityService, SamlStrategy],
})
export class SecurityModule {}
