import { DynamicModule, Module, Provider, Scope } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';
import { LoggingMiddleware } from './logging.middleware';
import { MyLogger } from './my-logger.service';

@Module({})
export class LoggerModule {
  static forRoot(options?: LoggerModuleOptions): DynamicModule {
    const providers = createLoggerProviders(options);
    return {
      module: LoggerModule,
      providers: providers,
      exports: providers,
    };
  }
}

export interface LoggerModuleOptions {
  mode: 'JSON' | 'CLI';
}

function createLoggerProviders(options?: LoggerModuleOptions): Provider[] {
  return [
    LoggingInterceptor,
    LoggingMiddleware,
    {
      provide: MyLogger,
      scope: Scope.REQUEST,
      useFactory: () => {
        return new MyLogger();
      },
    },
  ];
}
