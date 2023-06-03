import { WinstonLogger } from 'nest-winston';
import {
  Logform,
  LoggerOptions,
  createLogger,
  format,
  transports,
} from 'winston';
import { LoggerModuleOptions } from './logger.options';

export class MyLogger extends WinstonLogger {
  constructor(options?: LoggerModuleOptions) {
    const fmt = MyLogger.buildFormat(options);

    const loggerOpts: LoggerOptions = {
      transports: new transports.Console(),
      format: fmt,
      level: 'info',
      defaultMeta: options?.serviceName
        ? { service_name: options?.serviceName }
        : {},
    };

    super(createLogger(loggerOpts));
  }

  private static buildFormat(options?: LoggerModuleOptions): Logform.Format {
    if (options?.mode === 'SIMPLE_COLORIZED') {
      return format.combine(
        format.timestamp(),
        format.colorize({ all: true }),
        format.simple(),
      );
    }

    return format.combine(format.timestamp(), format.json());
  }
}
