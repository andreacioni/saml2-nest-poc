import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ModelModule } from './model/model.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [AuthModule, UsersModule, ModelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
