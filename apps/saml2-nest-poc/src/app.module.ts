import { CommonsModule } from '@andreacioni/saml2-nest-lib/commons/commons.module';
import { SecurityModule } from '@andreacioni/saml2-nest-lib/security/security.module';
import { UserModule } from '@andreacioni/saml2-nest-lib/security/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [SecurityModule, CommonsModule, UserModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
