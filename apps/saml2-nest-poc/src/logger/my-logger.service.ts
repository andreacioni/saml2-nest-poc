import { WinstonLogger } from 'nest-winston';
import { LoggerOptions, createLogger, format, transports } from 'winston';
import { LoggerModuleOptions } from './logger.module';

export class MyLogger extends WinstonLogger {
  constructor(options?: LoggerModuleOptions) {
    const loggerOpts: LoggerOptions = {
      transports: new transports.Console(),
      format: format.combine(format.timestamp(), format.json()),
      level: 'info',
    };
    super(createLogger(loggerOpts));
  }
}
