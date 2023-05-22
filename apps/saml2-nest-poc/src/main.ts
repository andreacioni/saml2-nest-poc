import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { WinstonModule } from 'nest-winston';
import { transports } from 'winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(
    WinstonModule.createLogger({
      transports: [new transports.Console()],
    }),
  );
  await app.listen(3000);
}
bootstrap();
