import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecurityModule } from '@app/security/security.module';
import { CommonsModule } from '@app/commons/commons.module';
import { UserModule } from '../../../libs/security/src/user/user.module';

@Module({
  imports: [SecurityModule, CommonsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
