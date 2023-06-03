import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LOGGER_OPTS } from './config';
import { MyLogger } from './logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(LOGGER_OPTS),
  });

  await app.listen(3000);
}
bootstrap();
export { LOGGER_OPTS };
