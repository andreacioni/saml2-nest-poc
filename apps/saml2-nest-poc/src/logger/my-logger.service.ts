import { Injectable, Scope } from '@nestjs/common';
import { WinstonLogger } from 'nest-winston';
import { LoggerOptions, createLogger, format, transports } from 'winston';

@Injectable({ scope: Scope.REQUEST })
export class MyLogger extends WinstonLogger {
  constructor() {
    const loggerOpts: LoggerOptions = {
      transports: new transports.Console(),
      format: format.combine(format.timestamp(), format.json()),
      level: 'info',
    };
    super(createLogger(loggerOpts));
  }
}
