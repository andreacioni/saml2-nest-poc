import { Module } from '@nestjs/common';
import { MyLogger } from './my-logger.service';
import { LoggingInterceptor } from './logging.interceptor';

@Module({
  providers: [MyLogger, LoggingInterceptor],
  exports: [MyLogger, LoggingInterceptor],
})
export class LoggerModule {}
