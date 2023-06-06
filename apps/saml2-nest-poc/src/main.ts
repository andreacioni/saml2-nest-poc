import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const configService = app.get<ConfigService>(ConfigService);

  app.useLogger(new MyLogger(configService?.get('logger')));

  await app.listen(3000);
}
bootstrap();
