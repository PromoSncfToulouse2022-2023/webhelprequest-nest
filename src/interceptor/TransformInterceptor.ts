import
    {
        Injectable,
        NestInterceptor,
        ExecutionContext,
        CallHandler,
    } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum STATUS {
    OK = 'OK',
    FAILED = 'FAILED',
}

export interface Response<T>
{
    statusCode: number;
    status: STATUS;
    data: T;
}

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<Response<T>>
    {
        return next.handle().pipe(
            map((data) => ({
                statusCode: context.switchToHttp().getResponse().statusCode,
                reqId: context.switchToHttp().getRequest().reqId,
                status: context.switchToHttp().getResponse().statusCode < 300 ? STATUS.OK : STATUS.FAILED,
                data: data,
            }))
        );
    }
}