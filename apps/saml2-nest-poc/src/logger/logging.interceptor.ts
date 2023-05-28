import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MyLogger } from './my-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly log: MyLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.appendMeta('context', context.getClass().name);
    /* 
    const req = context.switchToHttp().getRequest<Request>();

    const headers = req.headers;
    const traceId = headers['x-trace-id'];
    const method = req.method;
    const url = req.url;

    if (typeof traceId == 'string') {
      this.setTraceId(traceId);
    }

    const reqBody = req.body;

    if (reqBody) {
      this.log.getWinstonLogger().debug(`${method} ${url}`, {
        body: reqBody,
        headers: headers,
      });
    } else {
      this.log.getWinstonLogger().debug(`${method} ${url}`);
    } */

    return next.handle() /* .pipe(
      tap((resBody: unknown) => {
        const res = context.switchToHttp().getResponse<Response>();
        const statusCode = res.statusCode;

        if (resBody) {
          this.log.getWinstonLogger().debug(`${statusCode}`, {
            body: resBody,
            headers: res.getHeaders(),
          });
        } else {
          this.log.getWinstonLogger().debug(`${statusCode}`, {
            headers: res.getHeaders(),
          });
        }
      }),
    ) */;
  }

  private appendMeta(name: string, value: any) {
    let defaultMeta = this.log.getWinstonLogger().defaultMeta ?? {};
    defaultMeta = { ...defaultMeta, [name]: value };
    this.log.getWinstonLogger().defaultMeta = defaultMeta;
  }
}
