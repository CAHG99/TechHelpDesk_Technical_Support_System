import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, map } from "rxjs";
import { plainToInstance } from "class-transformer";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler();
    const responseDto = Reflect.getMetadata("responseDto", handler);

    return next.handle().pipe(
      map((data) => {
        if (!responseDto) return data;

        return plainToInstance(responseDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
