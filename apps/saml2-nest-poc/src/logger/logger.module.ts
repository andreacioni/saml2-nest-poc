import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  Provider,
  Scope,
} from '@nestjs/common';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from './exception.filter';
import { LoggerModuleOptions } from './logger.options';
import { LoggingInterceptor } from './logging.interceptor';
import { LoggingMiddleware } from './logging.middleware';
import { MyLogger } from './my-logger.service';

@Module({})
export class LoggerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }

  static forRoot(options?: LoggerModuleOptions): DynamicModule {
    const providers = createLoggerProviders(options);
    return {
      module: LoggerModule,
      providers: [
        ...providers,
        {
          provide: APP_FILTER,
          scope: Scope.REQUEST,
          useFactory(httpAdapterHost: HttpAdapterHost, log: MyLogger) {
            return new AllExceptionsFilter(httpAdapterHost, log);
          },
          inject: [HttpAdapterHost, MyLogger],
        },
      ],
      exports: providers,
    };
  }
}

function createLoggerProviders(options?: LoggerModuleOptions): Provider[] {
  return [
    LoggingInterceptor,
    LoggingMiddleware,

    {
      provide: MyLogger,
      scope: Scope.REQUEST,
      useFactory: () => {
        return new MyLogger(options);
      },
    },
  ];
}
