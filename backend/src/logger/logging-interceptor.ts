/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { winstonLogger } from './winston-logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, ip } = request;
    const now = Date.now();

    winstonLogger.info('Incoming request', { method, url, ip });

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const delay = Date.now() - now;
        winstonLogger.info('Request completed', {
          method,
          url,
          status: response.statusCode,
          responseTime: `${delay}ms`,
        });
      }),
      catchError((error) => {
        const delay = Date.now() - now;
        winstonLogger.error('Request failed', {
          method,
          url,
          error: error.message,
          responseTime: `${delay}ms`,
        });
        throw error;
      }),
    );
  }
}
