import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { MyLogger } from './my-logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly HEADERS = ['X-Trace-Id'];
  constructor(private readonly log: MyLogger) {}
  use(req: Request, res: Response, next: NextFunction) {
    const startTs = new Date().getTime();
    const { method, originalUrl, headers, body, ip } = req;
    let traceId = headers['x-trace-id'];

    if (!traceId) {
      traceId = randomUUID();
      req.headers = { ...req.headers, ['x-trace-id']: traceId };
    }

    //this metadata get appended to all the logger instances
    this.appendMeta('trace_id', traceId);
    if (originalUrl) {
      const urlWithoutParams = originalUrl.split('?')[0];
      this.appendMeta('request_path', urlWithoutParams);
    }
    if (ip) {
      this.appendMeta('remote_ip', ip);
    }

    this.propagateHeaders(req, res);

    this.log
      .getWinstonLogger()
      .info(
        `${method} ${originalUrl}`,
        this.log.getOptions()?.printBody ? { request_body: body } : {},
      );

    //monkey patch the res.send function of express
    //to be able to log the response
    const originalSend = res.send.bind(res);
    let responseBody: any;
    res.send = (body: any) => {
      responseBody = body;
      return originalSend(body);
    };

    res.on('error', (err) => {
      this.log.getWinstonLogger().error('response error:' + err);
    });

    res.on('close', () => {
      this.log.getWinstonLogger().debug('response stream closed');
    });

    //attach a listener to finish callback
    res.on('finish', () => {
      const endTs = new Date().getTime();
      const { statusCode, statusMessage } = res;
      this.log.getWinstonLogger().info(`${statusCode} - ${statusMessage}`, {
        elapsed: endTs - startTs,
        ...(this.log.getOptions()?.printBody
          ? {
              response_body: responseBody,
            }
          : {}),
      });
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

  private propagateHeaders(req: Request, res: Response) {
    const reqHeaders = req.headers;

    this.HEADERS.forEach((h) => {
      const value = reqHeaders[h.toLocaleLowerCase()];
      if (value) {
        res.setHeader(h, value);
      }
    });
  }
}
