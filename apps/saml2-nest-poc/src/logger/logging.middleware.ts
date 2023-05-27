import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { MyLogger } from './my-logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly log: MyLogger) {}
  use(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;
    const traceId = headers['x-trace-id'];
    const method = req.method;
    const url = req.baseUrl;

    if (url) {
      this.appendMeta('requestPath', url);
    }
    if (traceId) {
      this.appendMeta('traceId', traceId);
    }
    this.log.debug!(`${method} ${url}`);
    res.on('finish', () => {
      const statusCode = res.statusCode;
      this.log.debug!(`${statusCode}`);
    });
    next();
  }

  private appendMeta(name: string, value: any) {
    let defaultMeta = this.log.getWinstonLogger().defaultMeta ?? {};
    if (defaultMeta.traceId) {
      throw new Error(
        'traceId already set on logger defaultMeta, did you set "scope: Scope.REQUEST" ',
      );
    }
    defaultMeta = { ...defaultMeta, [name]: value };
    this.log.getWinstonLogger().defaultMeta = defaultMeta;
  }
}
