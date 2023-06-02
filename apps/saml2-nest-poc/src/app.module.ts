import { CommonsModule } from '@andreacioni/saml2-nest-lib/commons/commons.module';
import { SecurityModule } from '@andreacioni/saml2-nest-lib/security/security.module';
import { UserModule } from '@andreacioni/saml2-nest-lib/security/user/user.module';
import { MiddlewareConsumer, Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';

import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from './logger/exception.filter';
import { LoggerModule } from './logger/logger.module';
import { LoggingMiddleware } from './logger/logging.middleware';
import { MyLogger } from './logger/my-logger.service';

@Module({
  imports: [SecurityModule, CommonsModule, UserModule, LoggerModule.forRoot()],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      scope: Scope.REQUEST,
      useFactory(httpAdapterHost: HttpAdapterHost, log: MyLogger) {
        return new AllExceptionsFilter(httpAdapterHost, log);
      },
      inject: [HttpAdapterHost, MyLogger],
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
