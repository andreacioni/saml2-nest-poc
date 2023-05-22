import { Injectable, Scope } from '@nestjs/common';
import { WinstonLogger } from 'nest-winston';
import { LoggerOptions, createLogger, format, transports } from 'winston';

@Injectable({ scope: Scope.REQUEST })
export class MyLogger extends WinstonLogger {
  private traceId: string;
  constructor() {
    const loggerOpts: LoggerOptions = {
      transports: new transports.Console(),
      format: format.combine(format.timestamp(), format.json()),
    };
    super(createLogger(loggerOpts));
  }

  setTraceId(traceId: string) {
    if (this.traceId) {
      this.warn(
        `traceId is already set (was ${this.traceId}, incoming: ${traceId})`,
      );
    } else {
      this.traceId = traceId;
      this.appendMeta('traceId', traceId);
    }
  }

  private appendMeta(name: string, value: any) {
    let defaultMeta = this.getWinstonLogger().defaultMeta ?? {};
    defaultMeta = { ...defaultMeta, name: value };
    this.getWinstonLogger().defaultMeta = defaultMeta;
  }
}
