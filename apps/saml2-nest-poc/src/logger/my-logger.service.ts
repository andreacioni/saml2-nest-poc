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
  constructor(private readonly options?: LoggerModuleOptions) {
    const fmt = MyLogger.buildFormat(options);

    const loggerOpts: LoggerOptions = {
      transports: new transports.Console(),
      format: fmt,
      level: options?.level,
      defaultMeta: options?.serviceName
        ? { service_name: options?.serviceName }
        : {},
    };

    super(createLogger(loggerOpts));
  }

  getOptions(): LoggerModuleOptions | undefined {
    if (this.options) {
      return { ...this?.options };
    }
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
