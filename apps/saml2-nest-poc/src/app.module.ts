import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecurityModule } from '@andreacioni/saml2-nest-lib/lib/security/security.module';
import { CommonsModule } from '@andreacioni/saml2-nest-lib/lib/commons/commons.module';
import { UserModule } from '@andreacioni/saml2-nest-lib/lib/security/user/user.module';

@Module({
  imports: [SecurityModule, CommonsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
