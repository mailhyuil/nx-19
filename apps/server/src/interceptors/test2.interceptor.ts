/*
https://docs.nestjs.com/interceptors#interceptors
*/

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class Test2Interceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('test2');
    return next.handle().pipe(tap(() => console.log(`After...`)));
  }
}
