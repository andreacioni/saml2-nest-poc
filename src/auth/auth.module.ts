import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalStrategy } from './local.strategy';
import { LoggedInGuard } from './logged-in.guard';
import { SamlAuthGuard } from './saml-auth.guard';
import { SamlSerializer } from './saml.serializer';
import { SamlStrategy } from './saml.strategy';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
    SamlAuthGuard,
    SamlStrategy,
    SamlSerializer,
    LoggedInGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
