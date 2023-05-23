import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MyLogger } from './my-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly log: MyLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.log.setContext(context.getClass().name);

    const req = context.switchToHttp().getRequest<Request>();

    const headers = req.headers;
    const traceId = headers['x-trace-id'];
    const method = req.method;
    const url = req.url;

    if (typeof traceId == 'string') {
      this.log.setTraceId(traceId);
    }

    const reqBody = req.body;

    if (reqBody) {
      this.log
        .getWinstonLogger()
        .log('info', `${method} ${url}`, { body: reqBody, headers: headers });
    } else {
      this.log.log(`${method} ${url}`);
    }

    return next.handle().pipe(
      tap((resBody: unknown) => {
        const res = context.switchToHttp().getResponse<Response>();
        const statusCode = res.statusCode;

        if (resBody) {
          this.log.log(`${statusCode} | ${resBody}`);
        } else {
          this.log.log(`${statusCode}`);
        }
      }),
    );
  }
}
