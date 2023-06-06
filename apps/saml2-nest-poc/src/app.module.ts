import { CommonsModule } from '@andreacioni/saml2-nest-lib/commons/commons.module';
import { SecurityModule } from '@andreacioni/saml2-nest-lib/security/security.module';
import { UserModule } from '@andreacioni/saml2-nest-lib/security/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';

import loggerConfig from './logger/logger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [loggerConfig],
    }),
    SecurityModule,
    CommonsModule,
    UserModule,
    LoggerModule.forRoot(),
  ],
  controllers: [AppController],
})
export class AppModule {}
