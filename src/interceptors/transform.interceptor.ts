import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    return next.handle().pipe(
      catchError((error) =>
        throwError(() => {
          const { response } = error ?? {};

          if (!response) {
            error.response = {
              status: 'Internal server error',
              message: 'Internal server error',
            };
          }

          if (response.error) {
            response.status = response.error;
          }

          if (response.message instanceof Array) {
            response.message = response.message[0];
          }

          response.data = {};

          delete response.statusCode;
          delete response.error;

          return error;
        }),
      ),
      map((data) => ({
        status: 'Success',
        message: 'Success',
        data,
      })),
    );
  }
}
