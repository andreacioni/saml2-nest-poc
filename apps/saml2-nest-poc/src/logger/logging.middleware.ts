import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { MyLogger } from './my-logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly log: MyLogger) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, headers, body } = req;
    const traceId = headers['x-trace-id'];

    //this metadata get appended to all the
    if (originalUrl) {
      const urlWithoutParams = originalUrl.split('?')[0];
      this.appendMeta('requestPath', urlWithoutParams);
    }
    if (traceId) {
      this.appendMeta('traceId', traceId);
    }

    this.log
      .getWinstonLogger()
      .debug(`${method} ${originalUrl}`, { body: body });
    res.on('finish', (data: any) => {
      const { statusCode, statusMessage } = res;
      this.log
        .getWinstonLogger()
        .debug(`${statusCode} - ${statusMessage}`, { body: data });
    });
    next();
  }

  private appendMeta(name: string, value: any) {
    let defaultMeta = this.log.getWinstonLogger().defaultMeta ?? {};
    if (defaultMeta.traceId) {
      this.log.warn('traceId is already set, this is clearly an error');
    }
    defaultMeta = { ...defaultMeta, [name]: value };
    this.log.getWinstonLogger().defaultMeta = defaultMeta;
  }
}
