import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';

@Catch()
export class WsFilter<T> extends BaseWsExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
