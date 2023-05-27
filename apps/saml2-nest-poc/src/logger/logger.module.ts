import { Module } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';
import { LoggingMiddleware } from './logging.middleware';
import { MyLogger } from './my-logger.service';

@Module({
  providers: [LoggingInterceptor, LoggingMiddleware, MyLogger],
  exports: [LoggingInterceptor, LoggingMiddleware, MyLogger],
})
export class LoggerModule {}
